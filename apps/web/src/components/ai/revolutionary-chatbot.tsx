"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  Camera, 
  Upload, 
  Brain, 
  Zap, 
  Sparkles,
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  Settings,
  Volume2,
  VolumeX,
  User,
  Bot,
  Loader2,
  CheckCircle,
  AlertCircle,
  Heart,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Download,
  Share2,
  Bookmark,
  Star,
  TrendingUp,
  Target,
  Lightbulb,
  Shield,
  Rocket,
  Globe,
  Phone,
  Mail,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Building,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  File,
  Link,
  Search,
  Filter,
  Sort,
  Eye,
  EyeOff
} from 'lucide-react';

// Tipos avançados para o chatbot
interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    confidence?: number;
    sentiment?: 'positive' | 'neutral' | 'negative';
    intent?: string;
    entities?: any[];
    processingTime?: number;
    model?: string;
    tokens?: number;
  };
  attachments?: {
    type: 'image' | 'file' | 'audio' | 'video';
    url: string;
    name: string;
    size: number;
  }[];
  reactions?: {
    thumbsUp: number;
    thumbsDown: number;
    heart: number;
  };
  suggestions?: string[];
}

interface ConversationContext {
  userProfile: {
    name?: string;
    company?: string;
    role?: string;
    preferences?: any;
    history?: any[];
  };
  sessionData: {
    startTime: Date;
    messageCount: number;
    topics: string[];
    sentiment: number;
    satisfaction: number;
  };
  businessContext: {
    service?: string;
    urgency?: 'low' | 'medium' | 'high' | 'critical';
    budget?: string;
    timeline?: string;
    requirements?: string[];
  };
}

interface AICapabilities {
  voiceRecognition: boolean;
  voiceSynthesis: boolean;
  imageAnalysis: boolean;
  documentProcessing: boolean;
  realTimeTranslation: boolean;
  sentimentAnalysis: boolean;
  intentRecognition: boolean;
  contextualMemory: boolean;
}

const RevolutionaryChatbot: React.FC = () => {
  // Estados principais
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
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
    businessContext: {}
  });

  // Estados avançados
  const [aiCapabilities, setAiCapabilities] = useState<AICapabilities>({
    voiceRecognition: true,
    voiceSynthesis: true,
    imageAnalysis: true,
    documentProcessing: true,
    realTimeTranslation: true,
    sentimentAnalysis: true,
    intentRecognition: true,
    contextualMemory: true
  });

  const [voiceSettings, setVoiceSettings] = useState({
    enabled: true,
    voice: 'pt-BR-FabianaNeural',
    speed: 1.0,
    pitch: 1.0,
    volume: 0.8
  });

  const [uiSettings, setUiSettings] = useState({
    theme: 'dark',
    animations: true,
    soundEffects: true,
    autoScroll: true,
    showMetadata: false,
    compactMode: false
  });

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<any>(null);

  // Configuração inicial
  useEffect(() => {
    // Inicializar reconhecimento de voz
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'pt-BR';
    }

    // Inicializar síntese de voz
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    // Mensagem de boas-vindas
    addMessage({
      type: 'ai',
      content: '🚀 Olá! Sou o assistente IA revolucionário da STARK! Posso ajudar você com:\n\n✨ Consultoria tecnológica avançada\n🤖 Análise de dados e insights\n🎯 Estratégias de transformação digital\n🔒 Cibersegurança e compliance\n☁️ Arquiteturas em nuvem\n\nComo posso revolucionar seu negócio hoje?',
      metadata: {
        confidence: 1.0,
        sentiment: 'positive',
        intent: 'greeting',
        model: 'GPT-4-Turbo',
        processingTime: 150
      },
      suggestions: [
        'Quero uma consultoria completa',
        'Preciso de análise de segurança',
        'Como migrar para a nuvem?',
        'Mostrar cases de sucesso'
      ]
    });
  }, []);

  // Funções utilitárias
  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36),
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
          prev.sessionData.topics
      }
    }));

    // Auto-scroll
    if (uiSettings.autoScroll) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [uiSettings.autoScroll]);

  // Processamento de IA avançado
  const processWithAI = async (userMessage: string, attachments?: any[]) => {
    setIsProcessing(true);
    
    try {
      // Simular processamento avançado com diferentes modelos
      const startTime = Date.now();
      
      // Análise de sentimento
      const sentiment = await analyzeSentiment(userMessage);
      
      // Reconhecimento de intenção
      const intent = await recognizeIntent(userMessage);
      
      // Extração de entidades
      const entities = await extractEntities(userMessage);
      
      // Geração de resposta contextual
      const response = await generateContextualResponse(userMessage, conversationContext, {
        sentiment,
        intent,
        entities,
        attachments
      });
      
      const processingTime = Date.now() - startTime;
      
      // Adicionar resposta da IA
      addMessage({
        type: 'ai',
        content: response.content,
        metadata: {
          confidence: response.confidence,
          sentiment: sentiment.label,
          intent: intent.name,
          entities,
          processingTime,
          model: response.model,
          tokens: response.tokens
        },
        suggestions: response.suggestions
      });
      
      // Síntese de voz se habilitada
      if (voiceSettings.enabled && response.content) {
        speakText(response.content);
      }
      
    } catch (error) {
      console.error('Erro no processamento IA:', error);
      addMessage({
        type: 'ai',
        content: 'Desculpe, ocorreu um erro no processamento. Tente novamente.',
        metadata: {
          confidence: 0.1,
          sentiment: 'neutral',
          intent: 'error'
        }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Análise de sentimento avançada
  const analyzeSentiment = async (text: string) => {
    // Simulação de análise de sentimento com ML
    const positiveWords = ['ótimo', 'excelente', 'perfeito', 'fantástico', 'incrível', 'maravilhoso'];
    const negativeWords = ['ruim', 'terrível', 'péssimo', 'horrível', 'problema', 'erro'];
    
    const words = text.toLowerCase().split(' ');
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.some(p => word.includes(p))) score += 1;
      if (negativeWords.some(n => word.includes(n))) score -= 1;
    });
    
    const normalizedScore = Math.max(-1, Math.min(1, score / words.length * 10));
    
    return {
      label: normalizedScore > 0.1 ? 'positive' : normalizedScore < -0.1 ? 'negative' : 'neutral',
      score: normalizedScore,
      confidence: Math.abs(normalizedScore) * 0.8 + 0.2
    };
  };

  // Reconhecimento de intenção
  const recognizeIntent = async (text: string) => {
    const intents = [
      { name: 'consultoria', keywords: ['consultoria', 'estratégia', 'planejamento', 'roadmap'] },
      { name: 'suporte', keywords: ['suporte', 'problema', 'erro', 'bug', 'ajuda'] },
      { name: 'segurança', keywords: ['segurança', 'cibersegurança', 'vulnerabilidade', 'ataque'] },
      { name: 'nuvem', keywords: ['nuvem', 'cloud', 'migração', 'aws', 'azure'] },
      { name: 'orcamento', keywords: ['preço', 'custo', 'valor', 'orçamento', 'quanto'] },
      { name: 'contato', keywords: ['contato', 'telefone', 'email', 'falar', 'reunião'] }
    ];
    
    const textLower = text.toLowerCase();
    let bestMatch = { name: 'general', confidence: 0.1 };
    
    intents.forEach(intent => {
      const matches = intent.keywords.filter(keyword => textLower.includes(keyword)).length;
      const confidence = matches / intent.keywords.length;
      
      if (confidence > bestMatch.confidence) {
        bestMatch = { name: intent.name, confidence };
      }
    });
    
    return bestMatch;
  };

  // Extração de entidades
  const extractEntities = async (text: string) => {
    const entities = [];
    
    // Regex para emails
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailRegex);
    if (emails) entities.push(...emails.map(email => ({ type: 'email', value: email })));
    
    // Regex para telefones
    const phoneRegex = /\(?(\d{2})\)?\s?(\d{4,5})-?(\d{4})/g;
    const phones = text.match(phoneRegex);
    if (phones) entities.push(...phones.map(phone => ({ type: 'phone', value: phone })));
    
    // Regex para valores monetários
    const moneyRegex = /R\$\s?(\d+(?:,\d{3})*(?:\.\d{2})?)/g;
    const money = text.match(moneyRegex);
    if (money) entities.push(...money.map(m => ({ type: 'money', value: m })));
    
    return entities;
  };

  // Geração de resposta contextual
  const generateContextualResponse = async (userMessage: string, context: ConversationContext, analysis: any) => {
    // Simulação de resposta avançada baseada no contexto
    const responses = {
      consultoria: {
        content: `🎯 **Consultoria Estratégica STARK**

Baseado na sua solicitação, vou estruturar uma consultoria personalizada:

**📊 Análise Inicial:**
• Situação atual da sua empresa
• Gaps tecnológicos identificados
• Oportunidades de melhoria
• ROI potencial

**🚀 Estratégia Proposta:**
• Roadmap de transformação digital
• Priorização de iniciativas
• Cronograma de implementação
• Métricas de sucesso

**💡 Próximos Passos:**
1. Reunião de descoberta (30 min)
2. Análise técnica detalhada
3. Proposta comercial personalizada

Gostaria de agendar uma conversa estratégica?`,
        confidence: 0.95,
        model: 'GPT-4-Turbo',
        tokens: 245,
        suggestions: [
          'Agendar reunião estratégica',
          'Ver cases similares',
          'Entender investimento',
          'Falar com especialista'
        ]
      },
      suporte: {
        content: `🔧 **Suporte Técnico Especializado**

Entendi que você precisa de suporte técnico. Nossa equipe está pronta para ajudar!

**⚡ Resposta Imediata:**
• SLA: 15 minutos para urgências
• Equipe 24/7 disponível
• Especialistas certificados
• Monitoramento proativo

**🛠️ Serviços Disponíveis:**
• Diagnóstico remoto
• Resolução de incidentes
• Manutenção preventiva
• Consultoria técnica

**📞 Canais de Contato:**
• WhatsApp: Resposta imediata
• Telefone: Suporte prioritário
• Email: Documentação completa

Qual é a urgência do seu problema?`,
        confidence: 0.92,
        model: 'GPT-4-Turbo',
        tokens: 198,
        suggestions: [
          'Problema urgente - chamar agora',
          'Agendar manutenção',
          'Consultoria preventiva',
          'Verificar status do sistema'
        ]
      },
      seguranca: {
        content: `🔒 **Cibersegurança & Compliance**

Sua preocupação com segurança é fundamental! Vamos proteger seu negócio:

**🛡️ Avaliação de Segurança:**
• Pentest completo (web, infra, Wi-Fi)
• Análise de vulnerabilidades
• Auditoria de compliance
• Plano de resposta a incidentes

**📋 Frameworks Aplicados:**
• ISO 27001
• NIST Cybersecurity Framework
• LGPD/GDPR
• COBIT 5

**⚡ Ação Imediata:**
• SOC/MDR 24/7
• Monitoramento contínuo
• Detecção de ameaças
• Resposta automática

**📊 Relatórios:**
• Dashboard em tempo real
• Relatórios executivos
• Métricas de segurança
• Compliance status

Quer uma avaliação de segurança gratuita?`,
        confidence: 0.96,
        model: 'GPT-4-Turbo',
        tokens: 267,
        suggestions: [
          'Avaliação de segurança gratuita',
          'Pentest completo',
          'Implementar SOC/MDR',
          'Auditoria de compliance'
        ]
      },
      nuvem: {
        content: `☁️ **Transformação Cloud**

Migração para nuvem é estratégica! Vamos acelerar sua transformação:

**🎯 Estratégia Cloud:**
• Avaliação de aplicações
• Arquitetura cloud-native
• Migração sem downtime
• Otimização de custos

**🚀 Plataformas Suportadas:**
• AWS (Amazon Web Services)
• Microsoft Azure
• Google Cloud Platform
• Multi-cloud híbrido

**📈 Benefícios Esperados:**
• Redução de 40-70% nos custos
• Escalabilidade automática
• Disponibilidade 99.99%
• Segurança enterprise

**⚡ Migração Acelerada:**
• Lift & Shift otimizado
• Re-architecting cloud-native
• DevOps/CI/CD integrado
• Monitoramento avançado

Qual aplicação você quer migrar primeiro?`,
        confidence: 0.94,
        model: 'GPT-4-Turbo',
        tokens: 234,
        suggestions: [
          'Avaliação de migração',
          'Ver casos de sucesso',
          'Calcular ROI da nuvem',
          'Agendar workshop cloud'
        ]
      }
    };

    const intentResponse = responses[analysis.intent.name as keyof typeof responses] || responses.consultoria;
    
    return intentResponse;
  };

  // Síntese de voz
  const speakText = (text: string) => {
    if (!voiceSettings.enabled || !synthesisRef.current) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = synthesisRef.current.getVoices().find((voice: any) => 
      voice.lang === 'pt-BR' && voice.name.includes('Fabiana')
    );
    utterance.rate = voiceSettings.speed;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = voiceSettings.volume;
    
    synthesisRef.current.speak(utterance);
  };

  // Reconhecimento de voz
  const startVoiceRecognition = () => {
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
  };

  // Envio de mensagem
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Adicionar mensagem do usuário
    addMessage({
      type: 'user',
      content: userMessage,
      metadata: {
        confidence: 1.0,
        sentiment: 'neutral'
      }
    });
    
    // Processar com IA
    await processWithAI(userMessage);
  };

  // Upload de arquivo
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      
      addMessage({
        type: 'user',
        content: `📎 Arquivo enviado: ${file.name}`,
        attachments: [{
          type: file.type.startsWith('image/') ? 'image' : 'file',
          url: content,
          name: file.name,
          size: file.size
        }]
      });
      
      // Processar arquivo com IA
      await processWithAI(`Analise este arquivo: ${file.name}`, [file]);
    };
    reader.readAsDataURL(file);
  };

  // Renderização de mensagem
  const renderMessage = (message: Message) => {
    const isUser = message.type === 'user';
    const isAI = message.type === 'ai';
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex items-start space-x-3 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {/* Avatar */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 
            isAI ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 
            'bg-gradient-to-br from-gray-500 to-gray-600'
          }`}>
            {isUser ? <User className="w-5 h-5 text-white" /> :
             isAI ? <Bot className="w-5 h-5 text-white" /> :
             <Settings className="w-5 h-5 text-white" />}
          </div>
          
          {/* Conteúdo da mensagem */}
          <div className={`rounded-2xl px-4 py-3 ${
            isUser ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' :
            isAI ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-700' :
            'bg-gradient-to-br from-yellow-500 to-orange-600 text-white'
          }`}>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
            
            {/* Metadados */}
            {uiSettings.showMetadata && message.metadata && (
              <div className="mt-2 pt-2 border-t border-white/20 text-xs opacity-70">
                <div className="flex items-center space-x-2">
                  {message.metadata.confidence && (
                    <span className="flex items-center">
                      <Target className="w-3 h-3 mr-1" />
                      {Math.round(message.metadata.confidence * 100)}%
                    </span>
                  )}
                  {message.metadata.model && (
                    <span className="flex items-center">
                      <Brain className="w-3 h-3 mr-1" />
                      {message.metadata.model}
                    </span>
                  )}
                  {message.metadata.processingTime && (
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {message.metadata.processingTime}ms
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Sugestões */}
            {message.suggestions && message.suggestions.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(suggestion)}
                    className="block w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            {/* Reações */}
            <div className="mt-3 flex items-center space-x-2">
              <button className="flex items-center space-x-1 text-xs hover:bg-white/10 px-2 py-1 rounded">
                <ThumbsUp className="w-3 h-3" />
                <span>{message.reactions?.thumbsUp || 0}</span>
              </button>
              <button className="flex items-center space-x-1 text-xs hover:bg-white/10 px-2 py-1 rounded">
                <ThumbsDown className="w-3 h-3" />
                <span>{message.reactions?.thumbsDown || 0}</span>
              </button>
              <button className="flex items-center space-x-1 text-xs hover:bg-white/10 px-2 py-1 rounded">
                <Heart className="w-3 h-3" />
                <span>{message.reactions?.heart || 0}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center text-white z-50 hover:shadow-purple-500/25 transition-all duration-300"
      >
        <MessageCircle className="w-8 h-8" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className={`fixed ${isMinimized ? 'bottom-6 right-6 w-80 h-16' : 'bottom-6 right-6 w-96 h-[600px]'} bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 z-50 overflow-hidden`}
    >
      {isMinimized ? (
        <div className="flex items-center justify-between p-4 h-full">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">IA Assistente</p>
              <p className="text-gray-400 text-sm">Online • {conversationContext.sessionData.messageCount} mensagens</p>
            </div>
          </div>
          <button
            onClick={() => setIsMinimized(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">IA Assistente Revolucionário</h3>
                <p className="text-white/80 text-sm">GPT-4 • Análise Avançada • Tempo Real</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setUiSettings(prev => ({ ...prev, showMetadata: !prev.showMetadata }))}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setUiSettings(prev => ({ ...prev, compactMode: !prev.compactMode }))}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800">
            <AnimatePresence>
              {messages.map(renderMessage)}
            </AnimatePresence>
            
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl px-4 py-3 border border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-green-400" />
                      <span className="text-white text-sm">Processando com IA avançada...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
              >
                <Upload className="w-5 h-5" />
              </button>
              
              <button
                onClick={startVoiceRecognition}
                disabled={isListening}
                className={`p-2 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
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
                  placeholder="Digite sua mensagem... (ou use voz)"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 pr-12 border border-gray-600 focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isProcessing}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Estatísticas da sessão */}
            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {conversationContext.sessionData.messageCount} mensagens
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {Math.round((Date.now() - conversationContext.sessionData.startTime.getTime()) / 60000)} min
                </span>
                <span className="flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {Math.round(conversationContext.sessionData.sentiment * 100)}% positivo
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>IA Online</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Input de arquivo oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf,.doc,.docx,.txt"
        onChange={handleFileUpload}
        className="hidden"
      />
    </motion.div>
  );
};

export default RevolutionaryChatbot;
