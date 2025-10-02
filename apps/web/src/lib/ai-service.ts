// Serviço de IA avançado para o chatbot revolucionário
export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: {
    timestamp: Date;
    sentiment?: 'positive' | 'neutral' | 'negative';
    confidence?: number;
    intent?: string;
    entities?: any[];
    processingTime?: number;
    model?: string;
    tokens?: number;
  };
}

export interface ConversationContext {
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

export interface AIResponse {
  content: string;
  confidence: number;
  sentiment: {
    label: 'positive' | 'neutral' | 'negative';
    score: number;
    confidence: number;
  };
  intent: {
    name: string;
    confidence: number;
  };
  entities: any[];
  suggestions: string[];
  metadata: {
    model: string;
    processingTime: number;
    tokens: number;
    context: any;
  };
}

class AIService {
  private apiKey: string;
  private baseURL: string;
  private models: {
    gpt4: string;
    gpt35: string;
    claude: string;
    gemini: string;
  };

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
    this.baseURL = 'https://api.openai.com/v1';
    this.models = {
      gpt4: 'gpt-4-turbo-preview',
      gpt35: 'gpt-3.5-turbo',
      claude: 'claude-3-sonnet-20240229',
      gemini: 'gemini-pro'
    };
  }

  // Análise de sentimento avançada com ML
  async analyzeSentiment(text: string): Promise<{
    label: 'positive' | 'neutral' | 'negative';
    score: number;
    confidence: number;
  }> {
    try {
      // Usar modelo especializado em análise de sentimento
      const response = await this.callOpenAI([
        {
          role: 'system',
          content: `Você é um especialista em análise de sentimento. Analise o texto e retorne apenas um JSON com:
          {
            "label": "positive|neutral|negative",
            "score": número_de_-1_a_1,
            "confidence": número_de_0_a_1
          }`
        },
        {
          role: 'user',
          content: text
        }
      ], this.models.gpt35);

      const result = JSON.parse(response.choices[0].message.content);
      return result;
    } catch (error) {
      console.error('Erro na análise de sentimento:', error);
      // Fallback para análise simples
      return this.fallbackSentimentAnalysis(text);
    }
  }

  // Análise de sentimento fallback
  private fallbackSentimentAnalysis(text: string) {
    const positiveWords = [
      'ótimo', 'excelente', 'perfeito', 'fantástico', 'incrível', 'maravilhoso',
      'bom', 'legal', 'show', 'top', 'demais', 'sensacional', 'impressionante',
      'satisfeito', 'feliz', 'contente', 'animado', 'empolgado'
    ];
    
    const negativeWords = [
      'ruim', 'terrível', 'péssimo', 'horrível', 'problema', 'erro', 'falha',
      'decepcionado', 'frustrado', 'irritado', 'chateado', 'preocupado',
      'difícil', 'complicado', 'confuso', 'lento', 'caro', 'caro'
    ];
    
    const words = text.toLowerCase().split(/\s+/);
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
  }

  // Reconhecimento de intenção avançado
  async recognizeIntent(text: string): Promise<{
    name: string;
    confidence: number;
  }> {
    const intents = [
      { 
        name: 'consultoria', 
        keywords: ['consultoria', 'estratégia', 'planejamento', 'roadmap', 'consultor', 'estratégico'],
        description: 'Solicitação de consultoria estratégica ou tecnológica'
      },
      { 
        name: 'suporte', 
        keywords: ['suporte', 'problema', 'erro', 'bug', 'ajuda', 'dificuldade', 'não funciona'],
        description: 'Necessidade de suporte técnico ou resolução de problemas'
      },
      { 
        name: 'segurança', 
        keywords: ['segurança', 'cibersegurança', 'vulnerabilidade', 'ataque', 'hacker', 'malware', 'firewall'],
        description: 'Questões relacionadas à segurança da informação'
      },
      { 
        name: 'nuvem', 
        keywords: ['nuvem', 'cloud', 'migração', 'aws', 'azure', 'gcp', 'servidor'],
        description: 'Serviços de nuvem e migração'
      },
      { 
        name: 'orcamento', 
        keywords: ['preço', 'custo', 'valor', 'orçamento', 'quanto', 'investimento', 'pagamento'],
        description: 'Solicitação de orçamento ou informações de preço'
      },
      { 
        name: 'contato', 
        keywords: ['contato', 'telefone', 'email', 'falar', 'reunião', 'agendar', 'ligar'],
        description: 'Solicitação de contato ou agendamento'
      },
      { 
        name: 'portfolio', 
        keywords: ['portfolio', 'cases', 'projetos', 'trabalhos', 'exemplos', 'referências'],
        description: 'Interesse em ver portfolio ou cases de sucesso'
      },
      { 
        name: 'tecnologia', 
        keywords: ['tecnologia', 'sistema', 'software', 'aplicação', 'desenvolvimento', 'programação'],
        description: 'Questões sobre tecnologias e desenvolvimento'
      }
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
  }

  // Extração de entidades nomeadas
  async extractEntities(text: string): Promise<any[]> {
    const entities = [];
    
    // Regex para emails
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailRegex);
    if (emails) {
      entities.push(...emails.map(email => ({ 
        type: 'email', 
        value: email,
        confidence: 0.95,
        position: text.indexOf(email)
      })));
    }
    
    // Regex para telefones (formato brasileiro)
    const phoneRegex = /\(?(\d{2})\)?\s?(\d{4,5})-?(\d{4})/g;
    const phones = text.match(phoneRegex);
    if (phones) {
      entities.push(...phones.map(phone => ({ 
        type: 'phone', 
        value: phone,
        confidence: 0.9,
        position: text.indexOf(phone)
      })));
    }
    
    // Regex para valores monetários
    const moneyRegex = /R\$\s?(\d+(?:,\d{3})*(?:\.\d{2})?)/g;
    const money = text.match(moneyRegex);
    if (money) {
      entities.push(...money.map(m => ({ 
        type: 'money', 
        value: m,
        confidence: 0.95,
        position: text.indexOf(m)
      })));
    }
    
    // Regex para CNPJ
    const cnpjRegex = /\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}/g;
    const cnpjs = text.match(cnpjRegex);
    if (cnpjs) {
      entities.push(...cnpjs.map(cnpj => ({ 
        type: 'cnpj', 
        value: cnpj,
        confidence: 0.95,
        position: text.indexOf(cnpj)
      })));
    }
    
    // Regex para CPF
    const cpfRegex = /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/g;
    const cpfs = text.match(cpfRegex);
    if (cpfs) {
      entities.push(...cpfs.map(cpf => ({ 
        type: 'cpf', 
        value: cpf,
        confidence: 0.95,
        position: text.indexOf(cpf)
      })));
    }
    
    return entities;
  }

  // Geração de resposta contextual com GPT-4
  async generateResponse(
    userMessage: string, 
    context: ConversationContext,
    analysis: {
      sentiment: any;
      intent: any;
      entities: any[];
    }
  ): Promise<AIResponse> {
    const startTime = Date.now();
    
    try {
      const systemPrompt = this.buildSystemPrompt(context);
      const userPrompt = this.buildUserPrompt(userMessage, analysis);
      
      const response = await this.callOpenAI([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], this.models.gpt4);
      
      const content = response.choices[0].message.content;
      const processingTime = Date.now() - startTime;
      
      return {
        content,
        confidence: 0.95,
        sentiment: analysis.sentiment,
        intent: analysis.intent,
        entities: analysis.entities,
        suggestions: this.generateSuggestions(analysis.intent.name),
        metadata: {
          model: this.models.gpt4,
          processingTime,
          tokens: response.usage?.total_tokens || 0,
          context: context.businessContext
        }
      };
    } catch (error) {
      console.error('Erro na geração de resposta:', error);
      return this.generateFallbackResponse(analysis);
    }
  }

  // Construção do prompt do sistema
  private buildSystemPrompt(context: ConversationContext): string {
    return `Você é um assistente IA revolucionário da STARK Gestão em Tecnologia, especializado em:

🎯 CONSULTORIA TECNOLÓGICA AVANÇADA
🤖 ANÁLISE DE DADOS E INSIGHTS
🚀 ESTRATÉGIAS DE TRANSFORMAÇÃO DIGITAL
🔒 CIBERSEGURANÇA E COMPLIANCE
☁️ ARQUITETURAS EM NUVEM

PERFIL DO USUÁRIO:
- Nome: ${context.userProfile.name || 'Não informado'}
- Empresa: ${context.userProfile.company || 'Não informada'}
- Função: ${context.userProfile.role || 'Não informada'}

CONTEXTO DA SESSÃO:
- Duração: ${Math.round((Date.now() - context.sessionData.startTime.getTime()) / 60000)} minutos
- Mensagens: ${context.sessionData.messageCount}
- Tópicos discutidos: ${context.sessionData.topics.join(', ') || 'Nenhum'}
- Sentimento geral: ${context.sessionData.sentiment > 0.5 ? 'Positivo' : context.sessionData.sentiment < -0.5 ? 'Negativo' : 'Neutro'}

CONTEXTO DE NEGÓCIO:
- Serviço: ${context.businessContext.service || 'Não definido'}
- Urgência: ${context.businessContext.urgency || 'Não definida'}
- Orçamento: ${context.businessContext.budget || 'Não informado'}
- Prazo: ${context.businessContext.timeline || 'Não definido'}

DIRETRIZES:
1. Seja proativo e estratégico
2. Ofereça soluções personalizadas
3. Use dados e métricas quando possível
4. Sugira próximos passos concretos
5. Mantenha tom profissional mas acessível
6. Foque em ROI e resultados mensuráveis
7. Sempre ofereça agendar uma reunião estratégica

FORMATO DE RESPOSTA:
- Use markdown para formatação
- Inclua emojis relevantes
- Estruture com títulos e listas
- Destaque benefícios e métricas
- Termine com call-to-action claro`;
  }

  // Construção do prompt do usuário
  private buildUserPrompt(userMessage: string, analysis: any): string {
    return `MENSAGEM DO USUÁRIO: "${userMessage}"

ANÁLISE AUTOMÁTICA:
- Sentimento: ${analysis.sentiment.label} (${Math.round(analysis.sentiment.score * 100)}%)
- Intenção: ${analysis.intent.name} (${Math.round(analysis.intent.confidence * 100)}%)
- Entidades encontradas: ${analysis.entities.map(e => `${e.type}: ${e.value}`).join(', ') || 'Nenhuma'}

Gere uma resposta contextual, estratégica e personalizada que:
1. Reconheça a intenção do usuário
2. Ofereça valor imediato
3. Sugira próximos passos
4. Demonstre expertise da STARK
5. Convide para uma conversa mais profunda`;
  }

  // Geração de sugestões baseadas na intenção
  private generateSuggestions(intent: string): string[] {
    const suggestions = {
      consultoria: [
        'Agendar reunião estratégica',
        'Ver cases de transformação digital',
        'Entender metodologia STARK',
        'Calcular ROI da consultoria'
      ],
      suporte: [
        'Abrir chamado urgente',
        'Falar com especialista técnico',
        'Verificar status do sistema',
        'Agendar manutenção preventiva'
      ],
      seguranca: [
        'Avaliação de segurança gratuita',
        'Pentest completo',
        'Implementar SOC/MDR',
        'Auditoria de compliance'
      ],
      nuvem: [
        'Avaliação de migração',
        'Ver casos de sucesso cloud',
        'Calcular ROI da nuvem',
        'Workshop arquitetura cloud'
      ],
      orcamento: [
        'Solicitar proposta personalizada',
        'Agendar reunião comercial',
        'Ver tabela de preços',
        'Calcular investimento'
      ],
      contato: [
        'WhatsApp direto',
        'Agendar reunião',
        'Ligar agora',
        'Enviar email'
      ]
    };
    
    return suggestions[intent as keyof typeof suggestions] || [
      'Falar com especialista',
      'Ver mais informações',
      'Agendar reunião',
      'Solicitar proposta'
    ];
  }

  // Resposta de fallback
  private generateFallbackResponse(analysis: any): AIResponse {
    const responses = {
      consultoria: {
        content: `🎯 **Consultoria Estratégica STARK**

Entendi que você precisa de consultoria tecnológica! Nossa equipe de especialistas pode ajudar com:

**📊 Serviços Disponíveis:**
• Análise estratégica de TI
• Roadmap de transformação digital
• Auditoria de processos
• Otimização de custos

**🚀 Próximos Passos:**
1. Reunião de descoberta (30 min)
2. Análise técnica detalhada
3. Proposta personalizada

Gostaria de agendar uma conversa estratégica?`,
        suggestions: ['Agendar reunião estratégica', 'Ver cases de sucesso', 'Entender metodologia']
      },
      suporte: {
        content: `🔧 **Suporte Técnico Especializado**

Vamos resolver seu problema técnico rapidamente!

**⚡ Canais de Suporte:**
• WhatsApp: Resposta imediata
• Telefone: Suporte prioritário
• Email: Documentação completa

**🛠️ Nossa Equipe:**
• Especialistas certificados
• SLA garantido
• Monitoramento 24/7

Qual é a urgência do problema?`,
        suggestions: ['Problema urgente', 'Agendar manutenção', 'Falar com técnico']
      },
      general: {
        content: `🚀 **STARK Gestão em Tecnologia**

Olá! Como posso ajudar você hoje?

**🎯 Nossos Serviços:**
• Consultoria estratégica
• Suporte técnico 24/7
• Cibersegurança
• Soluções em nuvem
• Desenvolvimento

**💡 Próximos Passos:**
Conte-me mais sobre sua necessidade para te dar a melhor orientação!`,
        suggestions: ['Consultoria', 'Suporte técnico', 'Cibersegurança', 'Nuvem']
      }
    };
    
    const response = responses[analysis.intent.name as keyof typeof responses] || responses.general;
    
    return {
      content: response.content,
      confidence: 0.8,
      sentiment: analysis.sentiment,
      intent: analysis.intent,
      entities: analysis.entities,
      suggestions: response.suggestions,
      metadata: {
        model: 'fallback',
        processingTime: 50,
        tokens: 0,
        context: {}
      }
    };
  }

  // Chamada para OpenAI API
  private async callOpenAI(messages: any[], model: string) {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }
    
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    return await response.json();
  }
}

export const aiService = new AIService();
