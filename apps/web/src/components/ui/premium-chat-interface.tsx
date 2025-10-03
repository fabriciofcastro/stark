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
  Target
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
    thumbsUp: number;
    thumbsDown: number;
    heart: number;
  };
  suggestions?: string[];
  attachments?: {
    type: 'image' | 'file' | 'contact' | 'calendar';
    url?: string;
    name?: string;
    data?: any;
  }[];
}

interface ChatOption {
  id: string;
  text: string;
  icon?: string;
  action: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
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

interface ChatContext {
  userProfile: UserProfile;
  conversationFlow: string;
  currentIntent: string;
  collectedData: Record<string, any>;
  satisfaction: number;
}

interface PremiumChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onContactRequest: (data: any) => void;
  onWhatsAppRedirect: (message: string) => void;
  onEscalateToHuman: (data: any) => void;
}

const PremiumChatInterface: React.FC<PremiumChatInterfaceProps> = ({
  isOpen,
  onClose,
  onContactRequest,
  onWhatsAppRedirect,
  onEscalateToHuman
}) => {
  // Estados principais
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [chatContext, setChatContext] = useState<ChatContext>({
    userProfile: {},
    conversationFlow: 'welcome',
    currentIntent: '',
    collectedData: {},
    satisfaction: 0
  });

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Configurações de voz
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'pt-BR';
    }
  }, []);

  // Mensagem inicial elegante
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'bot',
        content: `Olá! 👋 Sou a assistente virtual da **STARK**. 

Estou aqui para te ajudar a encontrar a solução tecnológica perfeita para seu negócio.

Como posso te auxiliar hoje?`,
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
            variant: 'primary'
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
    }
  }, [isOpen, messages.length]);

  // Auto-scroll suave
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Adicionar mensagem com animação
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

  // Simular digitação realista
  const simulateTyping = useCallback((content: string, callback: () => void) => {
    setIsTyping(true);
    const typingTime = Math.max(1000, content.length * 50);
    
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, typingTime);
  }, []);

  // Processar opção selecionada
  const handleOptionSelect = useCallback((option: ChatOption) => {
    // Adicionar mensagem do usuário
    addMessage({
      type: 'user',
      content: option.text,
      status: 'sending'
    });

    // Atualizar contexto
    setChatContext(prev => ({
      ...prev,
      currentIntent: option.action,
      conversationFlow: option.action
    }));

    // Simular processamento
    simulateTyping('Processando sua solicitação...', () => {
      const response = generateContextualResponse(option);
      addMessage(response);
    });
  }, [addMessage, simulateTyping]);

  // Gerar resposta contextual
  const generateContextualResponse = (option: ChatOption): Message => {
    const responses: Record<string, Message> = {
      consultoria: {
        type: 'bot',
        content: `🎯 **Consultoria Estratégica STARK**

Excelente escolha! Nossa consultoria é focada em **transformação digital** e **otimização de processos**.

**O que podemos fazer por você:**
• Análise estratégica da sua infraestrutura
• Roadmap de transformação digital
• Otimização de custos e processos
• Implementação de melhores práticas

**Para começarmos, preciso conhecer melhor sua empresa.**`,
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
        type: 'bot',
        content: `🔧 **Suporte Técnico Especializado**

Entendi! Nossa equipe de suporte está pronta para resolver seu problema.

**Nossa equipe oferece:**
• Suporte 24/7 com SLA garantido
• Especialistas certificados
• Resolução remota e presencial
• Monitoramento proativo

**Qual é a urgência do seu problema?**`,
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
            variant: 'secondary'
          }
        ],
        metadata: {
          confidence: 0.92,
          sentiment: 'neutral',
          intent: 'suporte'
        }
      },
      nuvem: {
        type: 'bot',
        content: `☁️ **Soluções em Nuvem STARK**

Perfeito! Migração para nuvem é uma estratégia essencial para o crescimento.

**Nossas especialidades:**
• Migração sem downtime
• Otimização de custos (até 70% de redução)
• Arquitetura cloud-native
• Segurança enterprise

**Qual é sua situação atual?**`,
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
            variant: 'secondary'
          }
        ],
        metadata: {
          confidence: 0.94,
          sentiment: 'positive',
          intent: 'nuvem'
        }
      },
      seguranca: {
        type: 'bot',
        content: `🔒 **Cibersegurança & Compliance**

Segurança é fundamental! Vamos proteger seu negócio com as melhores práticas.

**Nossos serviços:**
• Pentest completo (web, infra, Wi-Fi)
• SOC/MDR 24/7
• Compliance LGPD/GDPR
• Auditoria de segurança

**Como posso ajudar com sua segurança?**`,
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
      type: 'bot',
      content: 'Entendi sua solicitação. Vou te conectar com um especialista.',
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

    // Adicionar mensagem do usuário
    addMessage({
      type: 'user',
      content: userMessage,
      status: 'sending'
    });

    // Simular resposta
    simulateTyping('Analisando sua mensagem...', () => {
      const response: Message = {
        type: 'bot',
        content: `Entendi! "${userMessage}"

Para te ajudar melhor, preciso conhecer alguns detalhes sobre sua empresa e necessidades.

Podemos continuar nossa conversa ou prefere agendar uma reunião estratégica?`,
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
    };
  }, []);

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
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent hover:shadow-lg' :
            option.variant === 'secondary'
              ? 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200' :
            option.variant === 'warning'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent hover:shadow-lg' :
            option.variant === 'success'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-transparent hover:shadow-lg' :
            'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            {option.icon && <span className="text-lg">{option.icon}</span>}
            <span className="font-medium">{option.text}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );

  // Renderizar mensagem
  const renderMessage = (message: Message) => {
    const isUser = message.type === 'user';
    const isBot = message.type === 'bot';

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
              ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
              : isBot
              ? 'bg-gradient-to-br from-green-500 to-emerald-600'
              : 'bg-gradient-to-br from-gray-500 to-gray-600'
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
          <div className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
              : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
          }`}>
            {/* Conteúdo */}
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {message.content}
              </div>
            </div>

            {/* Opções */}
            {message.options && renderChatOptions(message.options)}

            {/* Status da mensagem */}
            {isUser && message.status && (
              <div className="flex items-center justify-end mt-2 space-x-1">
                {message.status === 'sending' && <Loader2 className="w-3 h-3 animate-spin opacity-50" />}
                {message.status === 'sent' && <CheckCircle className="w-3 h-3 opacity-50" />}
                {message.status === 'delivered' && <CheckCircle className="w-3 h-3 text-blue-400" />}
                {message.status === 'read' && <CheckCircle className="w-3 h-3 text-green-400" />}
              </div>
            )}

            {/* Timestamp */}
            <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
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

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md ${
          isMinimized ? 'h-16' : 'h-[600px]'
        } overflow-hidden`}
      >
        {isMinimized ? (
          /* Header minimizado */
          <div className="flex items-center justify-between p-4 h-full">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Assistente STARK</p>
                <p className="text-sm text-gray-500">Online • {messages.length} mensagens</p>
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-green-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Assistente STARK</h3>
                  <p className="text-white/80 text-sm">Online • IA Especializada</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              <AnimatePresence>
                {messages.map(renderMessage)}
              </AnimatePresence>

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
                    <div className="bg-white rounded-2xl px-4 py-3 border border-gray-200 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                        <span className="text-gray-600 text-sm">Digitando...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={startVoiceRecognition}
                  disabled={isListening}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
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
                    className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-3 pr-12 border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dica */}
              <div className="mt-2 text-xs text-gray-500 text-center">
                💡 Use a voz para digitar mais rápido ou clique nas opções sugeridas
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PremiumChatInterface;
