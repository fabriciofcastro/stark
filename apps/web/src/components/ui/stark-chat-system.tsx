"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Mic,
  MicOff,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Loader2,
  CheckCircle,
  Sparkles,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  VolumeX,
  Settings,
  Minimize2,
  Maximize2,
  MoreHorizontal,
  Clock,
  UserPlus,
  Building,
  Zap,
  Shield,
  Target,
  ChevronDown,
  ChevronUp,
  Minimize,
  Plus,
  Download,
  Copy,
  RotateCcw,
  Star
} from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user' | 'system';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  options?: ChatOption[];
  typing?: boolean;
  metadata?: {
    confidence?: number;
    sentiment?: 'positive' | 'neutral' | 'negative';
    intent?: string;
    processingTime?: number;
  };
  reactions?: {
    thumbsUp?: number;
    thumbsDown?: number;
    heart?: number;
    star?: number;
  };
  suggestions?: string[];
}

interface ChatOption {
  id: string;
  text: string;
  icon?: string;
  action: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'glass';
  metadata?: any;
}

interface UserProfile {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  role?: string;
  avatar?: string;
}

interface ConversationHistory {
  id: string;
  title: string;
  timestamp: Date;
  unread: boolean;
  preview: string;
}

interface StarkChatSystemProps {
  onContactRequest: (data: any) => void;
  onWhatsAppRedirect: (message: string) => void;
  onEscalateToHuman: (data: any) => void;
}

const StarkChatSystem: React.FC<StarkChatSystemProps> = ({
  onContactRequest,
  onWhatsAppRedirect,
  onEscalateToHuman
}) => {
  // Estados principais
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showConversationHistory, setShowConversationHistory] = useState(false);
  const [conversations, setConversations] = useState<ConversationHistory[]>([]);
  const [currentSatisfaction, setCurrentSatisfaction] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Contexto da conversa
  const [chatContext, setChatContext] = useState({
    userProfile: {} as UserProfile,
    conversationFlow: 'welcome',
    currentIntent: '',
    collectedData: {} as Record<string, any>,
    satisfaction: 0
  });

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Configuração inicial
  useEffect(() => {
    // Configurar reconhecimento de voz
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'pt-BR';
    }

    // Mensagem inicial
    if (isChatOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'bot',
        content: `👋 **Olá! Sou a assistente IA da STARK**

Estou aqui para te ajudar a encontrar a **solução tecnológica perfeita** para seu negócio.

**Como posso te auxiliar hoje?**`,
        timestamp: new Date(),
        status: 'read',
        options: [
          {
            id: 'consultoria',
            text: 'Consultoria Estratégica',
            icon: '🎯',
            action: 'consultoria',
            variant: 'primary'
          },
          {
            id: 'suporte',
            text: 'Suporte Técnico',
            icon: '🔧',
            action: 'suporte',
            variant: 'secondary'
          },
          {
            id: 'nuvem',
            text: 'Soluções em Nuvem',
            icon: '☁️',
            action: 'nuvem',
            variant: 'glass'
          },
          {
            id: 'seguranca',
            text: 'Cibersegurança',
            icon: '🔒',
            action: 'seguranca',
            variant: 'warning'
          }
        ],
        metadata: {
          confidence: 0.98,
          sentiment: 'positive',
          intent: 'greeting'
        }
      };

      setMessages([welcomeMessage]);
      setShowRating(true);
    }
  }, [isChatOpen, messages.length]);

  // Auto-scroll suave
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Adicionar mensagem
  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      status: message.type === 'user' ? 'sending' : 'sent'
    };

    setMessages(prev => [...prev, newMessage]);

    // Simular status de entrega
    if (message.type === 'user') {
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'delivered' as const }
              : msg
          )
        );
      }, 1000);
    }
  }, []);

  // Simular digitação
  const simulateTyping = useCallback((content: string, callback: () => void) => {
    setIsTyping(true);
    const typingTime = Math.max(1000, content.length * 30);
    
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, typingTime);
  }, []);

  // Processar opção selecionada
  const handleOptionSelect = useCallback((option: ChatOption) => {
    addMessage({
      type: 'user',
      content: option.text,
      status: 'sending'
    });

    setChatContext(prev => ({
      ...prev,
      currentIntent: option.action,
      conversationFlow: option.action
    }));

    simulateTyping('Processando sua solicitação...', () => {
      const response = generateContextualResponse(option);
      addMessage(response);
    });
  }, [addMessage, simulateTyping]);

  // Gerar resposta contextual
  const generateContextualResponse = (option: ChatOption): Message => {
    const responses: Record<string, Message> = {
      consultoria: {
        id: `bot-${Date.now()}-${Math.random()}`,
        type: 'bot',
        content: `🎯 **Consultoria Estratégica STARK**

Excelente escolha! Nossa consultoria é focada em **transformação digital** e **otimização de processos**.

**O que podemos fazer por você:**
• Análise estratégica da sua infraestrutura
• Roadmap de transformação digital  
• Otimização de custos e processos
• Implementação de melhores práticas

**Para começarmos, preciso conhecer melhor sua empresa.**`,
        timestamp: new Date(),
        status: 'sent',
        options: [
          {
            id: 'coletar_dados',
            text: 'Contar sobre minha empresa',
            icon: '🏢',
            action: 'coletar_dados',
            variant: 'primary'
          },
          {
            id: 'agendar_reuniao',
            text: 'Agendar reunião estratégica',
            icon: '📅',
            action: 'agendar_reuniao',
            variant: 'secondary'
          }
        ],
        metadata: {
          confidence: 0.95,
          sentiment: 'positive',
          intent: 'consultoria'
        }
      },
      suporte: {
        id: `bot-${Date.now()}-${Math.random()}`,
        type: 'bot',
        content: `🔧 **Suporte Técnico Especializado**

Entendi! Nossa equipe de suporte está pronta para resolver seu problema.

**Nossa equipe oferece:**
• Suporte 24/7 com SLA garantido
• Especialistas certificados
• Resolução remota e presencial
• Monitoramento proativo

**Qual é a urgência do seu problema?**`,
        timestamp: new Date(),
        status: 'sent',
        options: [
          {
            id: 'urgente',
            text: '🚨 Urgente - Sistema parado',
            icon: '🚨',
            action: 'urgente',
            variant: 'warning'
          },
          {
            id: 'alta',
            text: '⚡ Alta - Problemas críticos',
            icon: '⚡',
            action: 'alta',
            variant: 'warning'
          },
          {
            id: 'media',
            text: '📋 Média - Melhorias',
            icon: '📋',
            action: 'media',
            variant: 'glass'
          }
        ],
        metadata: {
          confidence: 0.92,
          sentiment: 'neutral',
          intent: 'suporte'
        }
      },
      nuvem: {
        id: `bot-${Date.now()}-${Math.random()}`,
        type: 'bot',
        content: `☁️ **Soluções em Nuvem STARK**

Perfeito! Migração para nuvem é uma estratégia essencial para o crescimento.

**Nossas especialidades:**
• Migração sem downtime
• Otimização de custos (até 70% de redução)
• Arquitetura cloud-native
• Segurança enterprise

**Qual é sua situação atual?**`,
        timestamp: new Date(),
        status: 'sent',
        options: [
          {
            id: 'avaliar_migracao',
            text: 'Avaliar migração para nuvem',
            icon: '📊',
            action: 'avaliar_migracao',
            variant: 'primary'
          },
          {
            id: 'otimizar_nuvem',
            text: 'Otimizar infraestrutura atual',
            icon: '⚡',
            action: 'otimizar_nuvem',
            variant: 'glass'
          }
        ],
        metadata: {
          confidence: 0.94,
          sentiment: 'positive',
          intent: 'nuvem'
        }
      },
      seguranca: {
        id: `bot-${Date.now()}-${Math.random()}`,
        type: 'bot',
        content: `🔒 **Cibersegurança & Compliance**

Segurança é fundamental! Vamos proteger seu negócio com as melhores práticas.

**Nossos serviços:**
• Pentest completo (web, infra, Wi-Fi)
• SOC/MDR 24/7
• Compliance LGPD/GDPR
• Auditoria de segurança

**Como posso ajudar com sua segurança?**`,
        timestamp: new Date(),
        status: 'sent',
        options: [
          {
            id: 'auditoria_seguranca',
            text: 'Auditoria de segurança',
            icon: '🔍',
            action: 'auditoria_seguranca',
            variant: 'warning'
          },
          {
            id: 'implementar_soc',
            text: 'Implementar SOC/MDR',
            icon: '🛡️',
            action: 'implementar_soc',
            variant: 'primary'
          }
        ],
        metadata: {
          confidence: 0.96,
          sentiment: 'positive',
          intent: 'seguranca'
        }
      }
    };

    return responses[option.action] || {
      id: `bot-${Date.now()}-${Math.random()}`,
      type: 'bot',
      content: 'Entendi sua solicitação. Vou te conectar com um especialista.',
      timestamp: new Date(),
      status: 'sent',
      metadata: {
        confidence: 0.8,
        sentiment: 'neutral',
        intent: 'escalate'
      }
    };
  };

  // Enviar mensagem
  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    addMessage({
      type: 'user',
      content: userMessage,
      status: 'sending'
    });

    simulateTyping('Analisando sua mensagem...', () => {
      const response: Message = {
        id: `bot-${Date.now()}-${Math.random()}`,
        type: 'bot',
        content: `Entendi! "${userMessage}"

Para te ajudar melhor, preciso conhecer alguns detalhes sobre sua empresa e necessidades.

Podemos continuar nossa conversa ou prefere agendar uma reunião estratégica?`,
        timestamp: new Date(),
        status: 'sent',
        options: [
          {
            id: 'continuar',
            text: 'Continuar conversa',
            icon: '💬',
            action: 'continuar',
            variant: 'primary'
          },
          {
            id: 'agendar',
            text: 'Agendar reunião',
            icon: '📅',
            action: 'agendar',
            variant: 'secondary'
          },
          {
            id: 'whatsapp',
            text: 'WhatsApp direto',
            icon: '📱',
            action: 'whatsapp',
            variant: 'success'
          }
        ],
        metadata: {
          confidence: 0.85,
          sentiment: 'positive',
          intent: 'custom'
        }
      };

      addMessage(response);
    });
  }, [inputValue, addMessage, simulateTyping]);

  // Reconhecimento de voz
  const startVoiceRecognition = useCallback(() => {
    if (!recognitionRef.current) return;

    setIsListening(true);
    recognitionRef.current.start();

    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      
      setInputValue(transcript);
      setIsListening(false);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    };
  }, []);

  // Tratar reações
  const handleReaction = (messageId: string, reaction: keyof NonNullable<Message['reactions']>) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              reactions: {
                ...msg.reactions,
                [reaction]: (msg.reactions?.[reaction] || 0) + 1
              } 
            }
          : msg
      )
    );
  };

  // Avaliar conversa
  const rateConversation = (rating: number) => {
    setCurrentSatisfaction(rating);
    setShowRating(false);
    setChatContext(prev => ({ ...prev, satisfaction: rating }));
    
    // Adicionar mensagem de agradecimento
    addMessage({
      type: 'system',
      content: `Obrigada pelo seu feedback! Sua avaliação é muito importante para melhorar nosso atendimento.`,
      status: 'sent'
    });
  };

  // Baixar transcrição da conversa
  const downloadTranscript = () => {
    const transcript = messages.map(msg => `[${msg.timestamp.toLocaleTimeString()}] ${msg.type.toUpperCase()}: ${msg.content}`).join('\n');
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcricao-chat-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copiar mensagem
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    // Feedback visual opcional
  };

  // Renderizar opções de chat
  const renderChatOptions = (options: ChatOption[]) => (
    <div className="space-y-2 mt-4">
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleOptionSelect(option)}
          className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
            option.variant === 'primary' 
              ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-transparent hover:shadow-lg hover:shadow-purple-500/25 relative overflow-hidden group' :
            option.variant === 'secondary'
              ? 'bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm' :
            option.variant === 'warning'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent hover:shadow-lg hover:shadow-orange-500/25 relative overflow-hidden group' :
            option.variant === 'success'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-transparent hover:shadow-lg hover:shadow-green-500/25 relative overflow-hidden group' :
            option.variant === 'glass'
              ? 'bg-white/5 text-white border-white/10 hover:bg-white/10 backdrop-blur-md' :
            'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3 z-10 relative">
            {option.icon && <span className="text-lg">{option.icon}</span>}
            <span className="font-medium">{option.text}</span>
          </div>
          
          {/* Efeito de brilho no hover */}
          {['primary', 'warning', 'success'].includes(option.variant || '') && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
          )}
        </motion.button>
      ))}
    </div>
  );

  // Renderizar reações
  const renderReactions = (messageId: string, reactions: Message['reactions'] = {}) => (
    <div className="flex space-x-2 mt-2">
      <button
        onClick={() => handleReaction(messageId, 'thumbsUp')}
        className="text-xs flex items-center space-x-1 p-1 rounded hover:bg-white/10 transition-colors"
      >
        <ThumbsUp className="w-3 h-3" />
        <span>{reactions.thumbsUp || 0}</span>
      </button>
      <button
        onClick={() => handleReaction(messageId, 'thumbsDown')}
        className="text-xs flex items-center space-x-1 p-1 rounded hover:bg-white/10 transition-colors"
      >
        <ThumbsDown className="w-3 h-3" />
        <span>{reactions.thumbsDown || 0}</span>
      </button>
      <button
        onClick={() => handleReaction(messageId, 'heart')}
        className="text-xs flex items-center space-x-1 p-1 rounded hover:bg-white/10 transition-colors"
      >
        <Heart className="w-3 h-3" />
        <span>{reactions.heart || 0}</span>
      </button>
      <button
        onClick={() => handleReaction(messageId, 'star')}
        className="text-xs flex items-center space-x-1 p-1 rounded hover:bg-white/10 transition-colors"
      >
        <Star className="w-3 h-3" />
        <span>{reactions.star || 0}</span>
      </button>
    </div>
  );

  // Renderizar mensagem
  const renderMessage = (message: Message) => {
    const isUser = message.type === 'user';
    const isBot = message.type === 'bot';
    const isSystem = message.type === 'system';

    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
      >
        <div className={`flex items-start space-x-3 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {/* Avatar */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser 
              ? 'bg-gradient-to-br from-purple-500 to-cyan-500' 
              : isBot
              ? 'bg-gradient-to-br from-green-500 to-emerald-600'
              : 'bg-gradient-to-br from-yellow-500 to-orange-500'
          }`}>
            {isUser ? (
              <User className="w-5 h-5 text-white" />
            ) : isBot ? (
              <Bot className="w-5 h-5 text-white" />
            ) : (
              <Settings className="w-5 h-5 text-white" />
            )}
          </div>

          {/* Conteúdo da mensagem */}
          <div className={`rounded-2xl px-4 py-3 relative group ${
            isUser 
              ? 'bg-gradient-to-br from-purple-600 to-cyan-500 text-white' 
              : isSystem
              ? 'bg-gradient-to-br from-yellow-600 to-amber-500 text-white'
              : 'bg-white/10 text-white border border-white/20 backdrop-blur-md'
          }`}>
            {/* Menu de ações */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
              <button 
                onClick={() => copyMessage(message.content)}
                className="p-1 rounded hover:bg-white/20"
                aria-label="Copiar mensagem"
              >
                <Copy className="w-3 h-3" />
              </button>
              {!isSystem && (
                <button 
                  onClick={() => copyMessage(message.content)}
                  className="p-1 rounded hover:bg-white/20"
                  aria-label="Adicionar feedback"
                >
                  <Settings className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Conteúdo */}
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {message.content}
              </div>
            </div>

            {/* Opções */}
            {message.options && renderChatOptions(message.options)}

            {/* Reações */}
            {!isSystem && renderReactions(message.id, message.reactions)}

            {/* Status da mensagem */}
            {isUser && message.status && (
              <div className="flex items-center justify-end mt-2 space-x-1">
                {message.status === 'sending' && <Loader2 className="w-3 h-3 animate-spin opacity-50" />}
                {message.status === 'sent' && <CheckCircle className="w-3 h-3 opacity-50" />}
                {message.status === 'delivered' && <CheckCircle className="w-3 h-3 text-purple-300" />}
                {message.status === 'read' && <CheckCircle className="w-3 h-3 text-green-400" />}
              </div>
            )}

            {/* Timestamp */}
            <div className={`text-xs mt-2 ${isUser ? 'text-purple-100' : isSystem ? 'text-amber-100' : 'text-white/60'}`}>
              {message.timestamp.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Renderizar estrelas para avaliação
  const renderRatingStars = () => (
    <div className="flex justify-center items-center space-x-2 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
      <span className="text-white text-sm">Como foi sua experiência?</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => rateConversation(star)}
          className={`text-xl ${star <= currentSatisfaction ? 'text-yellow-400' : 'text-gray-400'}`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Botão flutuante do chat */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 via-cyan-500 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white z-50 hover:shadow-purple-500/25 transition-all duration-300 backdrop-blur-sm border border-white/20"
        style={{
          boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
        aria-label="Abrir assistente de chat"
      >
        <MessageCircle className="w-8 h-8" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </motion.button>

      {/* Interface do chat */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setIsChatOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`bg-gradient-to-br from-primary-900/95 via-neutral-950/98 to-accent-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 w-full max-w-md ${
                isMinimized ? 'h-16' : 'h-[600px]'
              } overflow-hidden`}
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(17, 24, 39, 0.98) 50%, rgba(139, 69, 19, 0.95) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              {isMinimized ? (
                /* Header minimizado */
                <div className="flex items-center justify-between p-4 h-full">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Assistente STARK</p>
                      <p className="text-sm text-white/60">Online • {messages.length} mensagens</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMinimized(false)}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Expandir chat"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="bg-gradient-to-r from-purple-600 via-cyan-500 to-indigo-600 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Assistente STARK</h3>
                        <p className="text-white/80 text-sm">IA Especializada • Online</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={downloadTranscript}
                        className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                        aria-label="Baixar transcrição"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setIsMinimized(true)}
                        className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                        aria-label="Minimizar chat"
                      >
                        <Minimize2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setIsChatOpen(false)}
                        className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                        aria-label="Fechar chat"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Mensagens */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                      {messages.map(renderMessage)}
                    </AnimatePresence>

                    {/* Avaliação da conversa */}
                    {showRating && renderRatingStars()}

                    {/* Indicador de digitação */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                          <div className="bg-white/10 rounded-2xl px-4 py-3 border border-white/20 backdrop-blur-md">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-4 h-4 animate-spin text-green-400" />
                              <span className="text-white text-sm">Digitando...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Mensagem de erro */}
                    {showError && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                            <Settings className="w-5 h-5 text-white" />
                          </div>
                          <div className="bg-red-500/20 rounded-2xl px-4 py-3 border border-red-500/30 backdrop-blur-md">
                            <div className="flex items-center space-x-2">
                              <span className="text-white text-sm">Erro ao reconhecer voz. Tente novamente.</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border-t border-white/10">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={startVoiceRecognition}
                        disabled={isListening}
                        className={`p-2 rounded-lg transition-colors ${
                          isListening 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                        aria-label={isListening ? "Parar gravação" : "Iniciar gravação de voz"}
                      >
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>

                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Digite sua mensagem..."
                          className="w-full bg-white/10 text-white rounded-xl px-4 py-3 pr-12 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all backdrop-blur-sm placeholder-white/50"
                          aria-label="Campo de entrada de mensagem"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim()}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg hover:from-purple-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          aria-label="Enviar mensagem"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Dica */}
                    <div className="mt-2 text-xs text-white/50 text-center">
                      💡 Use a voz para digitar mais rápido ou clique nas opções sugeridas
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StarkChatSystem;
