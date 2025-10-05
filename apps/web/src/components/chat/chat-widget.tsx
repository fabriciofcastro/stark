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
  Sparkles,
  Zap,
  Brain,
  Shield,
  FileText,
  Hash,
  Star,
  ArrowUpRight,
  Copy,
  Download,
  Share2,
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
  const [protocol, setProtocol] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    duration: number;
    delay: number;
  }>>([]);
  
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

  // Gerar partículas animadas para o background
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5,
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Gerar protocolo único para o atendimento
  const generateProtocol = useCallback(() => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `STARK-${timestamp}-${random}`.toUpperCase();
  }, []);

  // Inicializar protocolo quando abrir o chat
  useEffect(() => {
    if (isOpen && !protocol) {
      setProtocol(generateProtocol());
    }
  }, [isOpen, protocol, generateProtocol]);

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
          updatedAt: new Date().toISOString(),
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
        {/* Botão flutuante moderno */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleWidget}
          className={cn(
            "fixed bottom-6 right-6 z-[100]",
            "w-16 h-16 rounded-2xl",
            "bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500",
            "backdrop-blur-xl border border-white/20",
            "shadow-2xl hover:shadow-cyan-500/25",
            "transition-all duration-300",
            "flex items-center justify-center",
            "group relative overflow-hidden",
            (finalConfig.position as any) === 'bottom-left' && "left-6 right-auto",
            (finalConfig.position as any) === 'top-right' && "top-6 bottom-auto",
            (finalConfig.position as any) === 'top-left' && "top-6 left-6 right-auto bottom-auto",
          )}
          aria-label="Abrir chat de suporte"
        >
          {/* Background animado */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-400/20 animate-pulse" />
          
          {/* Ícone principal */}
            <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            >
            <MessageCircle className="w-7 h-7 text-white relative z-10" />
            </motion.div>
          
          {/* Efeito de brilho */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Indicador de status */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
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
              "fixed bottom-6 right-6 z-[100]",
              "w-96 h-[600px] rounded-3xl",
              "bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95",
              "backdrop-blur-xl border border-white/10",
              "shadow-2xl overflow-hidden",
              "flex flex-col",
              className
            )}
          >
            {/* Background animado com partículas */}
            <div className="absolute inset-0 overflow-hidden">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [particle.opacity, 0, particle.opacity],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: particle.duration,
                    delay: particle.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
              
              {/* Gradiente animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"
                animate={{
                  background: [
                    "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)",
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%)",
                    "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(139, 92, 246, 0.1) 100%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            {/* Header moderno com STARK AI */}
            <div className="relative z-10 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                {/* Avatar e info do robô */}
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Avatar do STARK AI */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Indicador de status */}
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-white font-bold text-lg">STARK AI</h3>
                    <p className="text-cyan-400 text-sm flex items-center">
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Online
                      </motion.span>
                      <span className="ml-2 text-xs">• Assistente Virtual</span>
                    </p>
                  </div>
                </div>
                
                {/* Protocolo do atendimento */}
                {protocol && (
                  <div className="flex items-center space-x-2 text-xs text-white/60">
                    <Hash className="w-3 h-3" />
                    <span className="font-mono">{protocol}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigator.clipboard.writeText(protocol)}
                      className="p-1 hover:bg-white/10 rounded"
                    >
                      <Copy className="w-3 h-3" />
                    </motion.button>
                  </div>
                )}
                
                {/* Controles */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={minimizeWidget}
                    className="p-2 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeWidget}
                    className="p-2 hover:bg-red-500/20 rounded-xl text-white/60 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Área de mensagens moderna */}
            <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  {/* Mensagem de boas-vindas animada */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-sm"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center"
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-white font-bold text-xl mb-3">Olá! 👋</h3>
                    <p className="text-white/80 text-sm mb-4">
                      Sou o <span className="text-cyan-400 font-semibold">STARK AI</span>, seu assistente virtual.
                    </p>
                    <p className="text-white/60 text-xs mb-6">
                      Como posso ajudá-lo hoje?
                    </p>
                    
                    {/* Botões de ação rápida */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: Shield, text: "Suporte", color: "from-blue-500 to-cyan-500" },
                        { icon: Zap, text: "Consultoria", color: "from-purple-500 to-pink-500" },
                        { icon: FileText, text: "Orçamento", color: "from-green-500 to-emerald-500" },
                        { icon: Phone, text: "Contato", color: "from-orange-500 to-red-500" },
                      ].map((action, index) => (
                        <motion.button
                          key={action.text}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSendMessage(`Quero ${action.text.toLowerCase()}`)}
                          className={`p-3 rounded-xl bg-gradient-to-r ${action.color} text-white text-xs font-medium hover:shadow-lg transition-all duration-300`}
                        >
                          <action.icon className="w-4 h-4 mx-auto mb-1" />
                          {action.text}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
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

            {/* Input moderno */}
            <div className="relative z-10 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border-t border-white/10 p-4">
              {/* Input principal */}
              <div className="relative">
                <div className="flex items-end space-x-3">
                  {/* Campo de texto */}
                  <div className="flex-1 relative">
                    <textarea
                      ref={useRef<HTMLTextAreaElement>(null)}
                placeholder="Digite sua mensagem..."
                disabled={isLoading || !isConnected}
                maxLength={finalConfig.maxMessages}
                      className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 pr-12 text-white placeholder-white/50 resize-none focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      rows={1}
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          const value = e.currentTarget.value.trim();
                          if (value) {
                            handleSendMessage(value);
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                    
                    {/* Botão de envio */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                        const value = textarea?.value.trim();
                        if (value) {
                          handleSendMessage(value);
                          textarea.value = '';
                        }
                      }}
                      disabled={isLoading || !isConnected}
                      className="absolute right-3 bottom-3 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Status e ações */}
              <div className="flex items-center justify-between mt-3 text-xs">
                <div className="flex items-center space-x-4">
              {/* Status de conexão */}
                  <div className="flex items-center space-x-2 text-white/60">
                    <motion.div
                      className={cn(
                    "w-2 h-2 rounded-full",
                    isConnected ? "bg-green-500" : "bg-red-500"
                      )}
                      animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
                  </div>
                  
                  {/* Contador de caracteres */}
                  <span className="text-white/40">
                    {messages.length}/{finalConfig.maxMessages}
                  </span>
                </div>
                
                {/* Ações rápidas */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
                    title="Anexar arquivo"
                  >
                    <FileText className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
                    title="Compartilhar conversa"
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                
                {error && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-1 text-red-400"
                    >
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                    </motion.div>
                  )}
                  </div>
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
            "fixed bottom-6 right-6 z-[100]",
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
