"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import type { 
  UseChatReturn, 
  ChatConfig, 
  Message, 
  ChatSession, 
  User,
  UpdateSessionRequest,
  CreateSessionRequest,
  SendMessageRequest,
} from '../types';

interface UseChatOptions {
  config: ChatConfig;
  onSessionStart?: (session: ChatSession) => void;
  onSessionEnd?: (session: ChatSession) => void;
  onEscalation?: (ticket: any) => void;
}

/**
 * Hook personalizado para gerenciar estado e funcionalidades do chat
 * 
 * Funcionalidades:
 * - Gerenciamento de sessões
 * - Envio e recebimento de mensagens
 * - Conexão WebSocket em tempo real
 * - Reconexão automática
 * - Cache de mensagens
 * - Gestão de usuários
 */
export function useChat({
  config,
  onSessionStart,
  onSessionEnd,
  onEscalation,
}: UseChatOptions): UseChatReturn {
  // Estados principais
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageQueueRef = useRef<Message[]>([]);
  const retryCountRef = useRef(0);

  // ===== FUNÇÕES DE API =====

  const apiCall = useCallback(async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const url = `${config.apiEndpoint}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erro na API');
      }

      return data.data;
    } catch (err) {
      console.error('API call failed:', err);
      throw err;
    }
  }, [config.apiEndpoint]);

  // ===== GESTÃO DE SESSÕES =====

  const createSession = useCallback(async (userData?: Partial<User>): Promise<ChatSession> => {
    setIsLoading(true);
    setError(null);

    try {
      // Criar usuário se necessário
      let userId = session?.userId;
      if (!userId && userData) {
        const user = await apiCall<User>('/users', {
          method: 'POST',
          body: JSON.stringify({
            name: userData.name || 'Usuário',
            email: userData.email,
            metadata: userData.metadata,
          }),
        });
        userId = user.id;
        setUsers(prev => ({ ...prev, [user.id]: user }));
      }

      // Criar sessão
      const newSession = await apiCall<ChatSession>('/sessions', {
        method: 'POST',
        body: JSON.stringify({
          userId: userId || 'anonymous',
          context: {
            pageUrl: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            device: {
              type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
            },
          },
        }),
      });

      setSession(newSession);
      
      // Conectar WebSocket
      connectWebSocket(newSession.id);

      if (onSessionStart) {
        onSessionStart(newSession);
      }

      return newSession;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar sessão';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [session?.userId, apiCall, onSessionStart]);

  const updateSession = useCallback(async (updates: UpdateSessionRequest): Promise<void> => {
    if (!session) return;

    try {
      const updatedSession = await apiCall<ChatSession>(`/sessions/${session.id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      setSession(updatedSession);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar sessão';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [session, apiCall]);

  // ===== GESTÃO DE MENSAGENS =====

  const sendMessage = useCallback(async (content: string, type = 'text'): Promise<void> => {
    if (!session || !content.trim()) return;

    setIsLoading(true);
    setError(null);

    // Criar mensagem otimista
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      sessionId: session.id,
      senderId: session.userId,
      content,
      type: type as any,
      status: 'sending' as any,
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    setMessages(prev => [...prev, optimisticMessage]);

    try {
      const response = await apiCall<{
        userMessage: Message;
        botMessage: Message;
        suggestions: any[];
        escalate: boolean;
      }>('/messages', {
        method: 'POST',
        body: JSON.stringify({
          sessionId: session.id,
          content,
          type,
        } as SendMessageRequest),
      });

      // Atualizar mensagens
      setMessages(prev => 
        prev.map(msg => 
          msg.id === optimisticMessage.id ? response.userMessage : msg
        ).concat(response.botMessage)
      );

      // Processar sugestões se houver
      if (response.suggestions && response.suggestions.length > 0) {
        // TODO: Implementar sugestões na UI
        console.log('Sugestões:', response.suggestions);
      }

      // Verificar escalação
      if (response.escalate && onEscalation) {
        onEscalation({
          id: Date.now().toString(),
          sessionId: session.id,
          reason: 'AI detected need for human assistance',
          priority: 'high',
          status: 'pending',
          createdAt: new Date().toISOString(),
        });
      }

    } catch (err) {
      // Reverter mensagem otimista
      setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
      
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar mensagem';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [session, apiCall, onEscalation]);

  const loadMessages = useCallback(async (sessionId: string, page = 1, limit = 50): Promise<void> => {
    try {
      const response = await apiCall<{
        messages: Message[];
        pagination: any;
      }>(`/sessions/${sessionId}/messages?page=${page}&limit=${limit}`);

      setMessages(response.messages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar mensagens';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [apiCall]);

  // ===== WEBSOCKET =====

  const connectWebSocket = useCallback((sessionId: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close();
    }

    const wsUrl = `${config.websocketEndpoint}?sessionId=${sessionId}`;
    
    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
        retryCountRef.current = 0;
        
        // Processar mensagens em fila
        if (messageQueueRef.current.length > 0) {
          messageQueueRef.current.forEach(msg => {
            ws.send(JSON.stringify(msg));
          });
          messageQueueRef.current = [];
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onclose = (event) => {
        setIsConnected(false);
        
        if (!event.wasClean && retryCountRef.current < config.retryAttempts) {
          // Tentar reconectar
          retryCountRef.current++;
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket(sessionId);
          }, config.retryAttempts * 1000);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Erro de conexão WebSocket');
      };

    } catch (err) {
      console.error('Error creating WebSocket:', err);
      setError('Erro ao conectar WebSocket');
    }
  }, [config.websocketEndpoint, config.retryAttempts]);

  const handleWebSocketMessage = useCallback((data: any) => {
    switch (data.type) {
      case 'message':
        setMessages(prev => [...prev, data.data.message]);
        break;
      
      case 'typing':
        // TODO: Implementar indicador de digitação
        break;
      
      case 'status':
        if (data.data.status === 'escalated' && onEscalation) {
          onEscalation(data.data.ticket);
        }
        break;
      
      case 'notification':
        // TODO: Implementar notificações
        break;
      
      default:
        console.log('Unknown WebSocket message type:', data.type);
    }
  }, [onEscalation]);

  // ===== ESCALAÇÃO =====

  const escalateToHuman = useCallback(async (reason: string): Promise<void> => {
    if (!session) return;

    try {
      const ticket = await apiCall('/escalations', {
        method: 'POST',
        body: JSON.stringify({
          sessionId: session.id,
          reason,
          priority: 'normal',
        }),
      });

      // Atualizar sessão
      await updateSession({ 
        status: 'escalated',
        mode: 'human',
      });

      if (onEscalation) {
        onEscalation(ticket);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao escalar para humano';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [session, apiCall, updateSession, onEscalation]);

  // ===== UTILITÁRIOS =====

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const reconnect = useCallback(() => {
    if (session) {
      connectWebSocket(session.id);
    }
  }, [session, connectWebSocket]);

  // ===== EFEITOS =====

  // Inicialização
  useEffect(() => {
    // Criar sessão automaticamente se configurado
    if (config.autoOpen && !session) {
      createSession();
    }

    // Cleanup
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [config.autoOpen, session, createSession]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return {
    session,
    messages,
    users,
    isLoading,
    isConnected,
    error,
    sendMessage,
    updateSession,
    escalateToHuman,
    clearMessages,
    reconnect,
  };
}
