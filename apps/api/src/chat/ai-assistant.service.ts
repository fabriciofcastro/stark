import { Injectable, Logger } from '@nestjs/common';
import { AIResponse, ProcessMessageRequest, BotConfig, Suggestion } from './interfaces';
import { MessageType } from './enums';

@Injectable()
export class AIAssistantService {
  private readonly logger = new Logger(AIAssistantService.name);
  private readonly botUserId = 'stark-ai-assistant';

  // Configuração do bot
  private readonly botConfig: BotConfig = {
    name: 'STARK AI',
    avatar: '/images/bot-avatar.png',
    personality: 'profissional, prestativo e inteligente',
    capabilities: ['suporte técnico', 'consultoria', 'vendas', 'desenvolvimento', 'cybersegurança'],
    welcomeMessage: 'Olá! 👋 Sou o STARK AI, seu assistente virtual inteligente. Como posso ajudá-lo hoje?',
    fallbackMessage: 'Desculpe, não entendi sua pergunta. Poderia reformular ou escolher uma das opções abaixo?',
    escalationThreshold: 0.7,
    workingHours: {
      enabled: true,
      start: '08:00',
      end: '18:00',
      timezone: 'America/Sao_Paulo',
    },
    responses: {
      greeting: [
        'Olá! Como posso te ajudar hoje?',
        'Oi! Estou aqui para te auxiliar.',
        'Olá! Que bom te ver por aqui!',
        'Bem-vindo! Em que posso ajudar?',
      ],
      service: [
        'Entendi! Vou te ajudar com isso.',
        'Perfeito! Vamos resolver isso juntos.',
        'Ótimo! Deixe-me te orientar.',
        'Claro! Posso te auxiliar com isso.',
      ],
      escalation: [
        'Vou te conectar com um especialista.',
        'Deixe-me transferir você para nossa equipe técnica.',
        'Vou escalar sua solicitação para um especialista.',
        'Vou te conectar com um de nossos especialistas.',
      ],
      goodbye: [
        'Foi um prazer te ajudar!',
        'Até logo! Qualquer dúvida, estou aqui.',
        'Tenha um ótimo dia!',
        'Obrigado por escolher a STARK!',
      ],
    },
  };

  // Base de conhecimento da STARK
  private readonly knowledgeBase = {
    services: {
      'suporte técnico': {
        description: 'Oferecemos suporte técnico completo para sua empresa',
        keywords: ['suporte', 'técnico', 'problema', 'erro', 'ajuda'],
        response: 'Nosso suporte técnico é especializado em resolver problemas de TI. Podemos ajudar com infraestrutura, software, hardware e muito mais.',
      },
      'consultoria': {
        description: 'Consultoria estratégica em tecnologia',
        keywords: ['consultoria', 'estratégia', 'planejamento', 'projeto'],
        response: 'Nossa consultoria tecnológica ajuda empresas a otimizar processos e implementar soluções inovadoras.',
      },
      'cibersegurança': {
        description: 'Proteção completa contra ameaças digitais',
        keywords: ['segurança', 'cibersegurança', 'proteção', 'vulnerabilidade'],
        response: 'Oferecemos soluções completas de cibersegurança para proteger sua empresa contra ameaças digitais.',
      },
      'cloud': {
        description: 'Soluções em nuvem para sua empresa',
        keywords: ['nuvem', 'cloud', 'aws', 'azure', 'gcp'],
        response: 'Implementamos e gerenciamos soluções em nuvem para otimizar sua infraestrutura e reduzir custos.',
      },
      'lgpd': {
        description: 'Conformidade com a LGPD',
        keywords: ['lgpd', 'privacidade', 'dados', 'conformidade'],
        response: 'Ajudamos sua empresa a estar em conformidade com a LGPD, protegendo dados pessoais e evitando multas.',
      },
    },
    company: {
      name: 'STARK Gestão em Tecnologia',
      description: 'Empresa especializada em tecnologia da informação',
      location: 'Itaquaquecetuba - SP',
      specialties: ['Infraestrutura', 'Segurança', 'Cloud', 'Consultoria'],
    },
  };

  async processMessage(request: ProcessMessageRequest): Promise<AIResponse> {
    const startTime = Date.now();
    
    try {
      // Análise de sentimento básica
      const sentiment = this.analyzeSentiment(request.message);
      
      // Detecção de intenção
      const intent = this.detectIntent(request.message, request.userHistory);
      
      // Extração de entidades
      const entities = this.extractEntities(request.message);
      
      // Geração de resposta
      const response = await this.generateResponse(intent, request.message, entities);
      
      // Sugestões baseadas no contexto
      const suggestions = this.generateSuggestions(intent, entities);
      
      // Verificar se precisa escalar
      const escalate = this.shouldEscalate(intent, entities, sentiment);
      
      const processingTime = Date.now() - startTime;
      
      this.logger.log(`AI processed message in ${processingTime}ms - Intent: ${intent}, Escalate: ${escalate}`);
      
      return {
        content: response,
        confidence: this.calculateConfidence(intent, entities),
        intent,
        entities,
        suggestions,
        escalate,
        processingTime,
        sentiment,
      };
    } catch (error) {
      this.logger.error('Error processing message with AI:', error);
      return this.getFallbackResponse(startTime);
    }
  }

  private detectIntent(message: string, history: any[]): string {
    const content = message.toLowerCase();
    
    // Intenções principais com fluxos inteligentes
    const intents = {
      greeting: ['olá', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hi', 'e aí', 'eae'],
      service_inquiry: ['serviço', 'serviços', 'oferece', 'fazem', 'trabalham', 'quero', 'preciso'],
      support: ['suporte', 'problema', 'erro', 'ajuda', 'não funciona', 'quebrou', 'bug', 'falha'],
      consultation: ['consultoria', 'consultar', 'aconselhar', 'recomendar', 'estratégia', 'planejamento'],
      security: ['segurança', 'cibersegurança', 'proteção', 'vulnerabilidade', 'hack', 'ataque'],
      cloud: ['nuvem', 'cloud', 'aws', 'azure', 'gcp', 'servidor', 'hosting'],
      lgpd: ['lgpd', 'privacidade', 'dados pessoais', 'conformidade', 'gdpr'],
      pricing: ['preço', 'custo', 'valor', 'quanto custa', 'orçamento', 'quanto', 'valor'],
      contact: ['contato', 'telefone', 'email', 'endereço', 'localização', 'onde', 'como falar'],
      escalation: ['humano', 'especialista', 'agente', 'pessoa', 'falar com alguém', 'atendente'],
      goodbye: ['tchau', 'até logo', 'obrigado', 'valeu', 'bye', 'até mais', 'falou'],
      development: ['desenvolvimento', 'app', 'aplicativo', 'site', 'sistema', 'programação', 'código'],
      maintenance: ['manutenção', 'atualização', 'upgrade', 'melhoria', 'otimização'],
      training: ['treinamento', 'curso', 'capacitação', 'aprender', 'ensinar'],
    };

    // Verificar cada intenção
    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => content.includes(keyword))) {
        return intent;
      }
    }

    // Análise de contexto baseada no histórico
    if (history.length > 0) {
      const lastMessage = history[history.length - 1];
      if (lastMessage.content.toLowerCase().includes('serviço')) {
        return 'service_details';
      }
    }

    return 'general_inquiry';
  }

  private extractEntities(message: string): Record<string, any> {
    const entities: Record<string, any> = {};
    const content = message.toLowerCase();

    // Extrair serviços mencionados
    const services = Object.keys(this.knowledgeBase.services);
    const mentionedServices = services.filter(service => 
      this.knowledgeBase.services[service].keywords.some(keyword => 
        content.includes(keyword)
      )
    );
    
    if (mentionedServices.length > 0) {
      entities.services = mentionedServices;
    }

    // Extrair informações de contato
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const phoneRegex = /(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}/g;
    
    const emails = message.match(emailRegex);
    const phones = message.match(phoneRegex);
    
    if (emails) entities.emails = emails;
    if (phones) entities.phones = phones;

    // Extrair urgência
    const urgentKeywords = ['urgente', 'emergência', 'crítico', 'importante'];
    if (urgentKeywords.some(keyword => content.includes(keyword))) {
      entities.urgency = 'high';
    }

    return entities;
  }

  private async generateResponse(intent: string, message: string, entities: Record<string, any>): Promise<string> {
    switch (intent) {
      case 'greeting':
        return `👋 ${this.getRandomResponse(this.botConfig.responses.greeting)} 

Sou o **STARK AI** e estou aqui para te ajudar com:
• 🛠️ Suporte Técnico
• 💡 Consultoria Tecnológica  
• 🔒 Cibersegurança
• ☁️ Soluções em Nuvem
• 📋 Conformidade LGPD
• 💻 Desenvolvimento de Sistemas

Como posso te auxiliar hoje?`;
      
      case 'service_inquiry':
        if (entities.services && entities.services.length > 0) {
          const service = entities.services[0];
          return `🎯 **${service.toUpperCase()}**

${this.knowledgeBase.services[service].response}

Posso te ajudar com mais detalhes sobre este serviço ou você gostaria de conhecer outros?`;
        }
        return `🚀 **Nossos Serviços**

Oferecemos soluções completas em tecnologia:

🛠️ **Suporte Técnico** - Resolução de problemas e manutenção
💡 **Consultoria** - Estratégias tecnológicas para sua empresa  
🔒 **Cibersegurança** - Proteção contra ameaças digitais
☁️ **Cloud Computing** - AWS, Azure, Google Cloud
📋 **LGPD** - Conformidade com proteção de dados
💻 **Desenvolvimento** - Apps, sites e sistemas personalizados

Qual desses serviços te interessa mais?`;
      
      case 'support':
        return `🛠️ **Suporte Técnico STARK**

${this.knowledgeBase.services['suporte técnico'].response}

Para te ajudar melhor, me conte:
• Qual é o problema específico?
• Quando começou a acontecer?
• Já tentou alguma solução?

Ou prefere que eu te conecte com um especialista?`;
      
      case 'consultation':
        return `💡 **Consultoria Tecnológica**

${this.knowledgeBase.services['consultoria'].response}

**O que posso fazer por você:**
• Análise da infraestrutura atual
• Planejamento de migração para nuvem
• Estratégias de segurança
• Otimização de processos

Gostaria de agendar uma **consultoria gratuita** de 30 minutos?`;
      
      case 'security':
        return `🔒 **Cibersegurança STARK**

${this.knowledgeBase.services['cibersegurança'].response}

**Nossas soluções:**
• Auditoria de segurança completa
• Implementação de firewalls e antivírus
• Treinamento da equipe
• Monitoramento 24/7
• Conformidade com LGPD

Sua empresa está protegida contra ameaças digitais?`;
      
      case 'cloud':
        return `☁️ **Soluções em Nuvem**

${this.knowledgeBase.services['cloud'].response}

**Trabalhamos com:**
• AWS (Amazon Web Services)
• Microsoft Azure  
• Google Cloud Platform
• Migração e otimização
• Backup e disaster recovery

Qual provedor de nuvem você usa atualmente?`;
      
      case 'lgpd':
        return `📋 **Conformidade LGPD**

${this.knowledgeBase.services['lgpd'].response}

**Nossos serviços:**
• Análise de conformidade
• Implementação de políticas
• Treinamento da equipe
• Auditoria de dados
• Suporte jurídico

Sua empresa já está em conformidade com a LGPD?`;
      
      case 'development':
        return `💻 **Desenvolvimento de Sistemas**

Desenvolvemos soluções personalizadas para sua empresa:

**O que criamos:**
• Aplicativos mobile (iOS/Android)
• Sites e portais corporativos
• Sistemas de gestão
• Integrações entre sistemas
• APIs e microserviços

Qual tipo de sistema você precisa?`;
      
      case 'pricing':
        return `💰 **Orçamento Personalizado**

Nossos preços são baseados na complexidade e escopo do projeto.

**Para receber um orçamento preciso, preciso saber:**
• Qual serviço te interessa?
• Tamanho da sua empresa?
• Prazo desejado?
• Orçamento aproximado?

Posso te enviar um orçamento detalhado por email!`;
      
      case 'contact':
        return `📞 **Contato STARK**

**Como nos encontrar:**
• 📱 WhatsApp: (11) 99439-6469
• 📧 Email: contato@starksolutions.com.br
• 📍 Endereço: Av. Paulista, 1000 - Itaquaquecetuba/SP
• ⏰ Horário: Seg-Sex, 9h às 18h

Prefere falar por WhatsApp ou agendar uma reunião?`;
      
      case 'escalation':
        return `👨‍💼 **Conectando com Especialista**

${this.getRandomResponse(this.botConfig.responses.escalation)}

Um de nossos especialistas irá te atender em breve. Enquanto isso, posso te ajudar com mais alguma coisa?`;
      
      case 'goodbye':
        return `👋 ${this.getRandomResponse(this.botConfig.responses.goodbye)}

Foi um prazer te ajudar! Se precisar de mais alguma coisa, estarei aqui. 

**Lembre-se:** Você pode me encontrar a qualquer momento! 😊`;
      
      default:
        return `🤔 ${this.botConfig.fallbackMessage}

**Tente uma dessas opções:**
• "Preciso de suporte técnico"
• "Quero uma consultoria"  
• "Falar sobre preços"
• "Como entrar em contato"

Ou escolha uma das opções abaixo! 👇`;
    }
  }

  private generateSuggestions(intent: string, entities: Record<string, any>): Suggestion[] {
    const suggestions: Suggestion[] = [];

    switch (intent) {
      case 'greeting':
        suggestions.push(
          { id: 'support', text: '🛠️ Preciso de suporte técnico', action: 'reply' },
          { id: 'consultation', text: '💡 Quero uma consultoria', action: 'reply' },
          { id: 'services', text: '🚀 Quais serviços vocês oferecem?', action: 'reply' },
          { id: 'pricing', text: '💰 Falar sobre preços', action: 'reply' },
          { id: 'contact', text: '📞 Como entrar em contato?', action: 'reply' }
        );
        break;
      
      case 'service_inquiry':
        suggestions.push(
          { id: 'support', text: '🛠️ Suporte técnico', action: 'reply' },
          { id: 'consultation', text: '💡 Consultoria tecnológica', action: 'reply' },
          { id: 'security', text: '🔒 Cibersegurança', action: 'reply' },
          { id: 'cloud', text: '☁️ Soluções em nuvem', action: 'reply' },
          { id: 'development', text: '💻 Desenvolvimento', action: 'reply' }
        );
        break;
      
      case 'support':
        suggestions.push(
          { id: 'escalate', text: '👨‍💼 Falar com especialista', action: 'escalate' },
          { id: 'schedule', text: '📅 Agendar visita técnica', action: 'action' },
          { id: 'remote', text: '💻 Suporte remoto', action: 'reply' },
          { id: 'urgent', text: '🚨 Problema urgente', action: 'escalate' }
        );
        break;
      
      case 'consultation':
        suggestions.push(
          { id: 'schedule', text: '📅 Agendar consultoria gratuita', action: 'action' },
          { id: 'pricing', text: '💰 Ver preços', action: 'reply' },
          { id: 'portfolio', text: '📋 Ver portfólio', action: 'link' },
          { id: 'contact', text: '📞 Falar por telefone', action: 'reply' }
        );
        break;
      
      case 'pricing':
        suggestions.push(
          { id: 'budget', text: '📊 Solicitar orçamento', action: 'action' },
          { id: 'consultation', text: '💡 Consultoria gratuita', action: 'reply' },
          { id: 'contact', text: '📞 Falar com vendas', action: 'reply' },
          { id: 'whatsapp', text: '📱 WhatsApp', action: 'link' }
        );
        break;
      
      case 'contact':
        suggestions.push(
          { id: 'whatsapp', text: '📱 WhatsApp', action: 'link' },
          { id: 'email', text: '📧 Enviar email', action: 'action' },
          { id: 'schedule', text: '📅 Agendar reunião', action: 'action' },
          { id: 'address', text: '📍 Ver endereço', action: 'link' }
        );
        break;
      
      default:
        suggestions.push(
          { id: 'escalate', text: '👨‍💼 Falar com especialista', action: 'escalate' },
          { id: 'whatsapp', text: '📱 WhatsApp', action: 'link' },
          { id: 'schedule', text: '📅 Agendar reunião', action: 'action' },
          { id: 'services', text: '🚀 Ver serviços', action: 'reply' }
        );
    }

    return suggestions;
  }

  private shouldEscalate(intent: string, entities: Record<string, any>, sentiment: string): boolean {
    // Escalar se mencionar desejo de falar com humano
    if (intent === 'escalation') return true;
    
    // Escalar se for muito urgente
    if (entities.urgency === 'high') return true;
    
    // Escalar se sentimento for negativo
    if (sentiment === 'negative') return true;
    
    // Escalar se for pedido de orçamento complexo
    if (intent === 'pricing' && entities.services && entities.services.length > 2) return true;
    
    return false;
  }

  private analyzeSentiment(message: string): 'positive' | 'neutral' | 'negative' {
    const content = message.toLowerCase();
    
    const positiveWords = ['obrigado', 'obrigada', 'ótimo', 'excelente', 'perfeito', 'muito bom'];
    const negativeWords = ['ruim', 'péssimo', 'problema', 'erro', 'não funciona', 'quebrado'];
    
    const positiveCount = positiveWords.filter(word => content.includes(word)).length;
    const negativeCount = negativeWords.filter(word => content.includes(word)).length;
    
    if (negativeCount > positiveCount) return 'negative';
    if (positiveCount > negativeCount) return 'positive';
    return 'neutral';
  }

  private calculateConfidence(intent: string, entities: Record<string, any>): number {
    let confidence = 0.5; // Base confidence
    
    // Aumentar confiança se entidades foram extraídas
    if (Object.keys(entities).length > 0) confidence += 0.2;
    
    // Aumentar confiança para intenções específicas
    const highConfidenceIntents = ['greeting', 'escalation', 'goodbye'];
    if (highConfidenceIntents.includes(intent)) confidence += 0.3;
    
    return Math.min(confidence, 1.0);
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getFallbackResponse(startTime: number): AIResponse {
    return {
      content: this.botConfig.fallbackMessage,
      confidence: 0.3,
      intent: 'fallback',
      entities: {},
      suggestions: [
        { id: 'escalate', text: 'Falar com especialista', action: 'escalate' },
        { id: 'contact', text: 'Informações de contato', action: 'reply' },
      ],
      escalate: false,
      processingTime: Date.now() - startTime,
      sentiment: 'neutral',
    };
  }

  getBotConfig(): BotConfig {
    return this.botConfig;
  }

  getBotUserId(): string {
    return this.botUserId;
  }
}
