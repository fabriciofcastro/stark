import { useState, useCallback, useRef, useEffect } from 'react';
import { aiService, type AIMessage, type ConversationContext, type AIResponse } from '@/lib/ai-service';

interface UseRevolutionaryChatOptions {
  initialContext?: Partial<ConversationContext>;
  autoSave?: boolean;
  voiceEnabled?: boolean;
  analyticsEnabled?: boolean;
}

export const useRevolutionaryChat = (options: UseRevolutionaryChatOptions = {}) => {
  const {
    initialContext = {},
    autoSave = true,
    voiceEnabled = true,
    analyticsEnabled = true
  } = options;

  // Estados principais
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    userProfile: {},
    sessionData: {
      startTime: new Date(),
      messageCount: 0,
      topics: [],
      sentiment: 0,
      satisfaction: 0
    },
    businessContext: {},
    ...initialContext
  });

  // Estados de funcionalidades avançadas
  const [voiceSettings, setVoiceSettings] = useState({
    enabled: voiceEnabled,
    voice: 'pt-BR-FabianaNeural',
    speed: 1.0,
    pitch: 1.0,
    volume: 0.8
  });

  const [analytics, setAnalytics] = useState({
    totalMessages: 0,
    averageResponseTime: 0,
    satisfactionScore: 0,
    topIntents: [] as string[],
    sessionDuration: 0
  });

  // Refs para funcionalidades de voz
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<any>(null);

  // Inicialização
  useEffect(() => {
    // Configurar reconhecimento de voz
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'pt-BR';
    }

    // Configurar síntese de voz
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    // Carregar contexto salvo
    if (autoSave) {
      loadSavedContext();
    }
  }, [autoSave]);

  // Salvar contexto automaticamente
  useEffect(() => {
    if (autoSave && messages.length > 0) {
      saveContext();
    }
  }, [messages, conversationContext, autoSave]);

  // Carregar contexto salvo
  const loadSavedContext = useCallback(() => {
    try {
      const saved = localStorage.getItem('revolutionary-chat-context');
      if (saved) {
        const parsed = JSON.parse(saved);
        setConversationContext(prev => ({
          ...prev,
          ...parsed,
          sessionData: {
            ...prev.sessionData,
            startTime: new Date(parsed.sessionData?.startTime || Date.now())
          }
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar contexto salvo:', error);
    }
  }, []);

  // Salvar contexto
  const saveContext = useCallback(() => {
    try {
      localStorage.setItem('revolutionary-chat-context', JSON.stringify(conversationContext));
    } catch (error) {
      console.error('Erro ao salvar contexto:', error);
    }
  }, [conversationContext]);

  // Adicionar mensagem
  const addMessage = useCallback((message: Omit<AIMessage, 'timestamp'>) => {
    const newMessage: AIMessage = {
      ...message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Atualizar contexto
    setConversationContext(prev => ({
      ...prev,
      sessionData: {
        ...prev.sessionData,
        messageCount: prev.sessionData.messageCount + 1,
        topics: message.metadata?.intent ? 
          [...prev.sessionData.topics, message.metadata.intent] : 
          prev.sessionData.topics,
        sentiment: message.metadata?.sentiment ? 
          (prev.sessionData.sentiment + (message.metadata.sentiment === 'positive' ? 1 : message.metadata.sentiment === 'negative' ? -1 : 0)) / 2 :
          prev.sessionData.sentiment
      }
    }));

    // Atualizar analytics
    if (analyticsEnabled) {
      setAnalytics(prev => ({
        ...prev,
        totalMessages: prev.totalMessages + 1,
        topIntents: message.metadata?.intent ? 
          [...prev.topIntents, message.metadata.intent] : 
          prev.topIntents,
        sessionDuration: Date.now() - conversationContext.sessionData.startTime.getTime()
      }));
    }
  }, [analyticsEnabled, conversationContext.sessionData.startTime]);

  // Processar mensagem com IA
  const processMessage = useCallback(async (userMessage: string, attachments?: any[]) => {
    setIsProcessing(true);
    setIsTyping(true);
    
    try {
      const startTime = Date.now();
      
      // Análise de sentimento
      const sentiment = await aiService.analyzeSentiment(userMessage);
      
      // Reconhecimento de intenção
      const intent = await aiService.recognizeIntent(userMessage);
      
      // Extração de entidades
      const entities = await aiService.extractEntities(userMessage);
      
      // Geração de resposta contextual
      const response = await aiService.generateResponse(userMessage, conversationContext, {
        sentiment,
        intent,
        entities,
        attachments
      });
      
      const processingTime = Date.now() - startTime;
      
      // Adicionar resposta da IA
      addMessage({
        role: 'assistant',
        content: response.content,
        metadata: {
          timestamp: new Date(),
          sentiment: response.sentiment.label,
          confidence: response.confidence,
          intent: response.intent.name,
          entities: response.entities,
          processingTime,
          model: response.metadata.model,
          tokens: response.metadata.tokens
        }
      });
      
      // Atualizar analytics
      if (analyticsEnabled) {
        setAnalytics(prev => ({
          ...prev,
          averageResponseTime: (prev.averageResponseTime + processingTime) / 2
        }));
      }
      
      return response;
      
    } catch (error) {
      console.error('Erro no processamento da mensagem:', error);
      
      addMessage({
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro no processamento. Tente novamente ou entre em contato conosco diretamente.',
        metadata: {
          timestamp: new Date(),
          sentiment: 'neutral',
          confidence: 0.1,
          intent: 'error',
          processingTime: 100
        }
      });
      
      return null;
    } finally {
      setIsProcessing(false);
      setIsTyping(false);
    }
  }, [conversationContext, addMessage, analyticsEnabled]);

  // Síntese de voz
  const speakText = useCallback((text: string) => {
    if (!voiceSettings.enabled || !synthesisRef.current) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = synthesisRef.current.getVoices().find((voice: any) => 
      voice.lang === 'pt-BR' && voice.name.includes('Fabiana')
    );
    utterance.rate = voiceSettings.speed;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = voiceSettings.volume;
    
    synthesisRef.current.speak(utterance);
  }, [voiceSettings]);

  // Reconhecimento de voz
  const startVoiceRecognition = useCallback(() => {
    if (!recognitionRef.current) return Promise.reject('Reconhecimento de voz não disponível');
    
    return new Promise<string>((resolve, reject) => {
      recognitionRef.current.start();
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        resolve(transcript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        reject(event.error);
      };
    });
  }, []);

  // Atualizar perfil do usuário
  const updateUserProfile = useCallback((profile: Partial<ConversationContext['userProfile']>) => {
    setConversationContext(prev => ({
      ...prev,
      userProfile: {
        ...prev.userProfile,
        ...profile
      }
    }));
  }, []);

  // Atualizar contexto de negócio
  const updateBusinessContext = useCallback((context: Partial<ConversationContext['businessContext']>) => {
    setConversationContext(prev => ({
      ...prev,
      businessContext: {
        ...prev.businessContext,
        ...context
      }
    }));
  }, []);

  // Limpar conversa
  const clearConversation = useCallback(() => {
    setMessages([]);
    setConversationContext(prev => ({
      ...prev,
      sessionData: {
        startTime: new Date(),
        messageCount: 0,
        topics: [],
        sentiment: 0,
        satisfaction: 0
      }
    }));
    
    if (autoSave) {
      localStorage.removeItem('revolutionary-chat-context');
    }
  }, [autoSave]);

  // Exportar conversa
  const exportConversation = useCallback(() => {
    const exportData = {
      messages,
      conversationContext,
      analytics,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-stark-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [messages, conversationContext, analytics]);

  // Obter insights da conversa
  const getConversationInsights = useCallback(() => {
    const insights = {
      totalMessages: messages.length,
      userMessages: messages.filter(m => m.role === 'user').length,
      aiMessages: messages.filter(m => m.role === 'assistant').length,
      averageConfidence: messages
        .filter(m => m.metadata?.confidence)
        .reduce((acc, m) => acc + (m.metadata?.confidence || 0), 0) / messages.length || 0,
      topIntents: Object.entries(
        messages
          .filter(m => m.metadata?.intent)
          .reduce((acc, m) => {
            const intent = m.metadata?.intent || 'unknown';
            acc[intent] = (acc[intent] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
      )
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
      sentimentDistribution: {
        positive: messages.filter(m => m.metadata?.sentiment === 'positive').length,
        neutral: messages.filter(m => m.metadata?.sentiment === 'neutral').length,
        negative: messages.filter(m => m.metadata?.sentiment === 'negative').length
      },
      sessionDuration: Date.now() - conversationContext.sessionData.startTime.getTime()
    };
    
    return insights;
  }, [messages, conversationContext.sessionData.startTime]);

  return {
    // Estados
    messages,
    isTyping,
    isProcessing,
    conversationContext,
    voiceSettings,
    analytics,
    
    // Ações
    addMessage,
    processMessage,
    speakText,
    startVoiceRecognition,
    updateUserProfile,
    updateBusinessContext,
    clearConversation,
    exportConversation,
    getConversationInsights,
    
    // Configurações
    setVoiceSettings,
    
    // Utilitários
    saveContext,
    loadSavedContext
  };
};
