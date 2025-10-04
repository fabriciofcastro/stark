"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Minimize2, 
  Maximize2, 
  Send,
  Phone,
  Mail,
  Clock,
  User,
  Bot,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CHAT_COLORS, CHAT_TYPOGRAPHY, CHAT_EFFECTS, CHAT_CONFIG, CHAT_SPACING, CHAT_ACCESSIBILITY } from './design-system';
import { MessageBubble } from './message-bubble';
import { ChatInput } from './chat-input';
import { ChatHeader } from './chat-header';
import { TypingIndicator } from './typing-indicator';
import { SuggestionsBar } from './suggestions-bar';
import { useChat } from './hooks/use-chat';
import type { 
  ChatWidgetProps, 
  Message, 
  ChatSession, 
  User as ChatUser,
  Suggestion,
} from './types';

/**
 * ChatWidget - Componente principal do sistema de chat profissional
 * 
 * Características:
 * - Design moderno e responsivo
 * - Animações suaves com Framer Motion
 * - Tipografia otimizada para legibilidade
 * - Integração completa com backend
 * - Suporte a diferentes temas
 * - Acessibilidade WCAG AA
 */
export const ChatWidget: React.FC<ChatWidgetProps> = ({
  config = {},
  onMessage,
  onSessionStart,
  onSessionEnd,
  onEscalation,
  className,
}) => {
  // Estados principais
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Configuração final mesclada com defaults
  const finalConfig = {
    theme: 'stark' as const,
    position: 'bottom-right' as const,
    size: 'md' as const,
    autoOpen: false,
    showAvatar: true,
    showTyping: true,
    showStatus: true,
    enableSounds: true,
    enableNotifications: true,
    maxMessages: 50,
    messageTimeout: 5000,
    typingTimeout: 1000,
    retryAttempts: 3,
    apiEndpoint: '/api/v1/chat',
    websocketEndpoint: '/api/v1/chat/ws',
    ...config,
  };

  // Hook personalizado para gerenciar o chat
  const {
    session,
    messages,
    users,
    isConnected,
    isLoading: chatLoading,
    error: chatError,
    sendMessage,
    updateSession,
    escalateToHuman,
    clearMessages,
    reconnect,
  } = useChat({
    config: finalConfig,
    onSessionStart,
    onSessionEnd,
  });

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLAudioElement>(null);

  // Auto-scroll para novas mensagens
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, []);

  // Efeito de scroll automático
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);

  // Efeito de som para novas mensagens
  useEffect(() => {
    if (finalConfig.enableSounds && soundRef.current) {
      soundRef.current.play().catch(() => {
        // Ignorar erros de autoplay
      });
    }
  }, [messages.length, finalConfig.enableSounds]);

  // Callback para envio de mensagens
  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      await sendMessage(content);
      
      // Callback personalizado
      if (onMessage && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        onMessage(lastMessage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar mensagem');
    } finally {
      setIsLoading(false);
    }
  }, [sendMessage, onMessage, messages, isLoading]);

  // Callback para sugestões
  const handleSuggestionClick = useCallback(async (suggestion: Suggestion) => {
    if (suggestion.action === 'reply') {
      await handleSendMessage(suggestion.text);
    } else if (suggestion.action === 'escalate') {
      await escalateToHuman('Usuário solicitou falar com especialista');
      if (onEscalation) {
        onEscalation({
          id: Date.now().toString(),
          sessionId: session?.id || '',
          reason: 'Usuário solicitou falar com especialista',
          priority: 'normal' as any,
          status: 'pending',
          createdAt: new Date().toISOString(),
        });
      }
    }
    // TODO: Implementar outras ações (link, action)
  }, [handleSendMessage, escalateToHuman, session, onEscalation]);

  // Toggle do widget
  const toggleWidget = useCallback(() => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  }, [isOpen, isMinimized]);

  // Minimizar widget
  const minimizeWidget = useCallback(() => {
    setIsMinimized(true);
  }, []);

  // Fechar widget
  const closeWidget = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  // Estilos dinâmicos baseados no tema e posição
  const getWidgetStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      zIndex: CHAT_ACCESSIBILITY.zIndex.chat,
      fontFamily: CHAT_TYPOGRAPHY.fontFamily.sans.join(', '),
      fontSize: CHAT_TYPOGRAPHY.fontSize.base,
      lineHeight: CHAT_TYPOGRAPHY.lineHeight.normal,
    };

    const positionStyles = {
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' },
    };

    const sizeStyles = {
      sm: { width: CHAT_SPACING.sizes.chat.width.sm, height: CHAT_SPACING.sizes.chat.height.sm },
      md: { width: CHAT_SPACING.sizes.chat.width.md, height: CHAT_SPACING.sizes.chat.height.md },
      lg: { width: CHAT_SPACING.sizes.chat.width.lg, height: CHAT_SPACING.sizes.chat.height.lg },
      xl: { width: CHAT_SPACING.sizes.chat.width.xl, height: CHAT_SPACING.sizes.chat.height.xl },
    };

    return {
      ...baseStyles,
      ...positionStyles[finalConfig.position],
      ...sizeStyles[finalConfig.size],
    };
  };

  // Renderizar botão flutuante
  if (!isOpen && !isMinimized) {
    return (
      <>
        {/* Botão flutuante */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleWidget}
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "bg-gradient-to-r from-primary-600 to-primary-700",
            "text-white rounded-full p-4 shadow-2xl",
            "hover:shadow-glow transition-all duration-300",
            "focus:outline-none focus:ring-4 focus:ring-primary-500/50",
            "flex items-center justify-center",
            (finalConfig.position as any) === 'bottom-left' && "left-6 right-auto",
            (finalConfig.position as any) === 'top-right' && "top-6 bottom-auto",
            (finalConfig.position as any) === 'top-left' && "top-6 left-6 right-auto bottom-auto",
          )}
          aria-label="Abrir chat"
        >
          <MessageCircle className="w-6 h-6" />
          
          {/* Indicador de notificação */}
          {session && messages.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
            >
              {messages.length}
            </motion.div>
          )}
        </motion.button>

        {/* Áudio para notificações */}
        <audio ref={soundRef} preload="auto">
          <source src="/sounds/notification.mp3" type="audio/mpeg" />
        </audio>
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={widgetRef}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn(
              "bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700",
              "flex flex-col overflow-hidden",
              className
            )}
            style={getWidgetStyles()}
          >
            {/* Header */}
            {session && (
              <ChatHeader
                session={session}
                user={users[session.userId]}
                onMinimize={minimizeWidget}
                onClose={closeWidget}
                onEscalate={() => handleSuggestionClick({ 
                  id: 'escalate', 
                  text: 'Falar com especialista', 
                  action: 'escalate' 
                })}
                showAvatar={finalConfig.showAvatar}
                showStatus={finalConfig.showStatus}
              />
            )}

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                  <Bot className="w-12 h-12 mb-4 text-primary-500" />
                  <p className="text-lg font-medium mb-2">Olá! Como posso ajudar?</p>
                  <p className="text-sm">Estou aqui para responder suas dúvidas sobre nossos serviços.</p>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      sender={users[message.senderId]}
                      showAvatar={finalConfig.showAvatar}
                      showTimestamp={true}
                      showStatus={finalConfig.showStatus}
                      isOwn={message.senderId === session?.userId}
                      onReply={(msg) => console.log('Reply to:', msg.id)}
                      onReact={(msg, emoji) => console.log('React to:', msg.id, emoji)}
                    />
                  ))}
                  
                  {/* Indicador de digitação */}
                  {finalConfig.showTyping && session && (
                    <TypingIndicator users={Object.values(users)} />
                  )}
                  
                  {/* Barra de sugestões */}
                  {session && messages.length > 0 && (
                    <SuggestionsBar
                      suggestions={[
                        { id: 'support', text: 'Preciso de suporte', action: 'reply' },
                        { id: 'consultation', text: 'Quero uma consultoria', action: 'reply' },
                        { id: 'escalate', text: 'Falar com especialista', action: 'escalate' },
                      ]}
                      onSuggestionClick={handleSuggestionClick}
                    />
                  )}
                  
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <ChatInput
                onSend={handleSendMessage}
                onTyping={(isTyping) => {
                  // TODO: Implementar indicador de digitação
                }}
                placeholder="Digite sua mensagem..."
                disabled={isLoading || !isConnected}
                maxLength={finalConfig.maxMessages}
                showAttachments={true}
              />
              
              {/* Status de conexão */}
              <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    isConnected ? "bg-green-500" : "bg-red-500"
                  )} />
                  <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
                </div>
                
                {error && (
                  <div className="flex items-center space-x-1 text-red-500">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget minimizado */}
      {isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700",
            "p-3 cursor-pointer",
            (finalConfig.position as any) === 'bottom-left' && "left-6 right-auto",
            (finalConfig.position as any) === 'top-right' && "top-6 bottom-auto",
            (finalConfig.position as any) === 'top-left' && "top-6 left-6 right-auto bottom-auto",
          )}
          onClick={toggleWidget}
        >
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium">Chat</span>
            <Maximize2 className="w-4 h-4 text-gray-400" />
          </div>
        </motion.div>
      )}

      {/* Áudio para notificações */}
      <audio ref={soundRef} preload="auto">
        <source src="/sounds/notification.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};
