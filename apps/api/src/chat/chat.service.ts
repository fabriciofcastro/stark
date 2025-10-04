import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
	CreateChatSessionDto,
  UpdateChatSessionDto,
	SendMessageDto,
	EscalateToHumanDto,
  UpdateEscalationDto,
  CreateUserDto,
  UpdateUserDto,
  CreateNotificationDto,
  UpdateNotificationDto,
  CreateAnalyticsDto,
  CreateContactFormDto,
  UpdateContactFormDto,
  CreateActivityLogDto,
} from './dto';
import { MessageType, MessageStatus, SessionStatus, UserRole, Priority } from './enums';
import { AIResponse, BotConfig } from './interfaces';
import { AIAssistantService } from './ai-assistant.service';
import { NotificationService } from './notification.service';
import { AnalyticsService } from './analytics.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiAssistant: AIAssistantService,
    private readonly notificationService: NotificationService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  // ===== GESTÃO DE USUÁRIOS =====

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          role: createUserDto.role || UserRole.VISITOR,
          preferences: createUserDto.preferences || this.getDefaultUserPreferences(),
        },
      });

      await this.logActivity({
        userId: user.id,
        action: 'user_created',
        details: { userId: user.id, role: user.role },
      });

      return user;
    } catch (error) {
      this.logger.error('Error creating user:', error);
      throw new BadRequestException('Failed to create user');
    }
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: updateUserDto,
      });

      await this.logActivity({
        userId: user.id,
        action: 'user_updated',
        details: { userId: user.id, updates: updateUserDto },
      });

      return user;
    } catch (error) {
      this.logger.error('Error updating user:', error);
      throw new NotFoundException('User not found');
    }
  }

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        sessions: {
          where: { status: SessionStatus.ACTIVE },
          orderBy: { lastActivity: 'desc' },
          take: 5,
        },
        notifications: {
          where: { read: false },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // ===== GESTÃO DE SESSÕES =====

  async createSession(createSessionDto: CreateChatSessionDto) {
    try {
      const session = await this.prisma.chatSession.create({
        data: {
          ...createSessionDto,
          status: SessionStatus.ACTIVE,
          context: createSessionDto.context || this.getDefaultSessionContext(),
          tags: createSessionDto.tags || [],
        },
        include: {
          user: true,
          messages: {
            orderBy: { createdAt: 'asc' },
            take: 10,
          },
        },
      });

      // Enviar mensagem de boas-vindas
      await this.sendWelcomeMessage(session.id);

      await this.logActivity({
        userId: createSessionDto.userId,
        sessionId: session.id,
        action: 'session_created',
        details: { sessionId: session.id },
      });

      return session;
    } catch (error) {
      this.logger.error('Error creating session:', error);
      throw new BadRequestException('Failed to create session');
    }
  }

  async updateSession(sessionId: string, updateSessionDto: UpdateChatSessionDto) {
    try {
      const session = await this.prisma.chatSession.update({
        where: { id: sessionId },
			data: {
          ...updateSessionDto,
          updatedAt: new Date(),
        },
        include: {
          user: true,
        },
      });

      await this.logActivity({
        userId: session.userId,
        sessionId: session.id,
        action: 'session_updated',
        details: { sessionId: session.id, updates: updateSessionDto },
      });

      return session;
    } catch (error) {
      this.logger.error('Error updating session:', error);
      throw new NotFoundException('Session not found');
    }
  }

  async getSession(sessionId: string) {
    const session = await this.prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: {
        user: true,
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            sender: true,
          },
        },
        escalationTickets: {
          orderBy: { createdAt: 'desc' },
        },
        analytics: true,
			},
		});

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async getActiveSessions(userId?: string) {
    const where = {
      status: SessionStatus.ACTIVE,
      ...(userId && { userId }),
    };

    return this.prisma.chatSession.findMany({
      where,
      include: {
        user: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: { lastActivity: 'desc' },
    });
  }

  // ===== GESTÃO DE MENSAGENS =====

  async sendMessage(sendMessageDto: SendMessageDto) {
    try {
      // Verificar se a sessão existe
      const session = await this.prisma.chatSession.findUnique({
        where: { id: sendMessageDto.sessionId },
        include: { user: true },
      });

      if (!session) {
        throw new NotFoundException('Session not found');
      }

      // Criar mensagem do usuário
      const userMessage = await this.prisma.chatMessage.create({
        data: {
          sessionId: sendMessageDto.sessionId,
          senderId: session.userId,
          content: sendMessageDto.content,
          type: sendMessageDto.type || MessageType.TEXT,
          status: MessageStatus.SENT,
          metadata: sendMessageDto.metadata,
          replyTo: sendMessageDto.replyTo,
          attachments: sendMessageDto.attachments,
        },
        include: {
          sender: true,
        },
      });

      // Atualizar atividade da sessão
      await this.prisma.chatSession.update({
        where: { id: sendMessageDto.sessionId },
        data: { lastActivity: new Date() },
      });

      // Processar resposta com IA
      const aiResponse = await this.aiAssistant.processMessage({
        sessionId: sendMessageDto.sessionId,
        message: sendMessageDto.content,
        context: session.context,
        userHistory: await this.getUserMessageHistory(sendMessageDto.sessionId),
      });

      // Criar resposta do bot
      const botMessage = await this.prisma.chatMessage.create({
			data: {
          sessionId: sendMessageDto.sessionId,
          senderId: aiResponse.botUserId,
          content: aiResponse.content,
          type: MessageType.TEXT,
          status: MessageStatus.SENT,
          metadata: {
            intent: aiResponse.intent,
            confidence: aiResponse.confidence,
            entities: aiResponse.entities,
            suggestions: aiResponse.suggestions,
            aiGenerated: true,
          },
        },
        include: {
          sender: true,
        },
      });

      // Verificar se precisa escalar para humano
      if (aiResponse.escalate) {
        await this.escalateToHuman({
          sessionId: sendMessageDto.sessionId,
          reason: 'AI detected need for human assistance',
          priority: Priority.HIGH,
        });
      }

      await this.logActivity({
        userId: session.userId,
        sessionId: sendMessageDto.sessionId,
        action: 'message_sent',
        details: { 
          messageId: userMessage.id,
          content: sendMessageDto.content,
          aiResponse: !!aiResponse,
			},
		});

		return {
        userMessage,
        botMessage,
        suggestions: aiResponse.suggestions,
        escalate: aiResponse.escalate,
      };
    } catch (error) {
      this.logger.error('Error sending message:', error);
      throw new BadRequestException('Failed to send message');
    }
  }

  async getMessages(sessionId: string, page = 1, limit = 50) {
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      this.prisma.chatMessage.findMany({
        where: { sessionId },
        include: {
          sender: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.chatMessage.count({
        where: { sessionId },
      }),
    ]);

    return {
      messages: messages.reverse(), // Ordenar por data crescente
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // ===== ESCALAÇÃO PARA HUMANO =====

  async escalateToHuman(escalateDto: EscalateToHumanDto) {
    try {
      const session = await this.prisma.chatSession.findUnique({
        where: { id: escalateDto.sessionId },
        include: { user: true },
      });

      if (!session) {
        throw new NotFoundException('Session not found');
      }

		// Criar ticket de escalação
		const ticket = await this.prisma.escalationTicket.create({
			data: {
          sessionId: escalateDto.sessionId,
          reason: escalateDto.reason,
          priority: escalateDto.priority || Priority.NORMAL,
          assignedTo: escalateDto.assignedTo,
          notes: escalateDto.notes,
        },
      });

      // Atualizar sessão para modo humano
      await this.prisma.chatSession.update({
        where: { id: escalateDto.sessionId },
        data: {
          mode: 'human',
          status: SessionStatus.ESCALATED,
          assignedAgent: escalateDto.assignedTo,
          escalatedAt: new Date(),
        },
      });

      // Notificar agentes disponíveis
      await this.notificationService.notifyAgents(ticket);

      // Criar mensagem do sistema
      await this.prisma.chatMessage.create({
        data: {
          sessionId: escalateDto.sessionId,
          senderId: 'system',
          content: 'Sua conversa foi transferida para um de nossos especialistas. Em breve você será atendido por um agente humano.',
          type: MessageType.SYSTEM,
          status: MessageStatus.SENT,
        },
      });

      await this.logActivity({
        userId: session.userId,
        sessionId: escalateDto.sessionId,
        action: 'escalated_to_human',
        details: { 
          ticketId: ticket.id,
          reason: escalateDto.reason,
          priority: escalateDto.priority,
        },
      });

      return ticket;
    } catch (error) {
      this.logger.error('Error escalating to human:', error);
      throw new BadRequestException('Failed to escalate to human');
    }
  }

  async updateEscalation(ticketId: string, updateEscalationDto: UpdateEscalationDto) {
    try {
      const ticket = await this.prisma.escalationTicket.update({
        where: { id: ticketId },
        data: updateEscalationDto,
        include: {
          session: {
            include: { user: true },
          },
			},
		});

      await this.logActivity({
        userId: ticket.session.userId,
        sessionId: ticket.sessionId,
        action: 'escalation_updated',
        details: { 
          ticketId: ticket.id,
          updates: updateEscalationDto,
        },
      });

		return ticket;
    } catch (error) {
      this.logger.error('Error updating escalation:', error);
      throw new NotFoundException('Escalation ticket not found');
    }
  }

  // ===== ANÁLISES E ESTATÍSTICAS =====

  async createAnalytics(createAnalyticsDto: CreateAnalyticsDto) {
    try {
      const analytics = await this.prisma.chatAnalytics.create({
        data: createAnalyticsDto,
			include: {
          session: {
            include: { user: true },
          },
        },
      });

      return analytics;
    } catch (error) {
      this.logger.error('Error creating analytics:', error);
      throw new BadRequestException('Failed to create analytics');
    }
  }

  async getDashboardStats() {
    const [
      totalSessions,
      activeSessions,
      totalMessages,
      escalations,
      satisfaction,
    ] = await Promise.all([
      this.prisma.chatSession.count(),
      this.prisma.chatSession.count({
        where: { status: SessionStatus.ACTIVE },
      }),
      this.prisma.chatMessage.count(),
      this.prisma.escalationTicket.count(),
      this.prisma.chatAnalytics.aggregate({
        _avg: { userSatisfaction: true },
      }),
    ]);

    return {
      totalSessions,
      activeSessions,
      totalMessages,
      escalationRate: totalSessions > 0 ? (escalations / totalSessions) * 100 : 0,
      averageSatisfaction: satisfaction._avg.userSatisfaction || 0,
    };
  }

  // ===== FORMULÁRIOS DE CONTATO =====

  async createContactForm(createContactFormDto: CreateContactFormDto) {
    try {
      const contactForm = await this.prisma.contactForm.create({
        data: createContactFormDto,
      });

      // Notificar equipe sobre novo lead
      await this.notificationService.notifyNewLead(contactForm);

      await this.logActivity({
        action: 'contact_form_submitted',
        details: { 
          formId: contactForm.id,
          service: contactForm.service,
        },
      });

      return contactForm;
    } catch (error) {
      this.logger.error('Error creating contact form:', error);
      throw new BadRequestException('Failed to create contact form');
    }
  }

  async updateContactForm(formId: string, updateContactFormDto: UpdateContactFormDto) {
    try {
      const contactForm = await this.prisma.contactForm.update({
        where: { id: formId },
        data: updateContactFormDto,
      });

      return contactForm;
    } catch (error) {
      this.logger.error('Error updating contact form:', error);
      throw new NotFoundException('Contact form not found');
    }
  }

  // ===== MÉTODOS PRIVADOS =====

  private async sendWelcomeMessage(sessionId: string) {
    const botConfig = await this.getBotConfig();
    
    await this.prisma.chatMessage.create({
      data: {
        sessionId,
        senderId: 'bot',
        content: botConfig.welcomeMessage,
        type: MessageType.TEXT,
        status: MessageStatus.SENT,
        metadata: {
          aiGenerated: true,
          intent: 'greeting',
        },
      },
    });
  }

  private async getUserMessageHistory(sessionId: string, limit = 10) {
    const messages = await this.prisma.chatMessage.findMany({
      where: { 
        sessionId,
        type: MessageType.TEXT,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        content: true,
        senderId: true,
        createdAt: true,
      },
    });

    return messages.reverse();
  }

  private getDefaultUserPreferences() {
    return {
      theme: 'stark',
      language: 'pt-BR',
      notifications: true,
      soundEnabled: true,
      autoEscalate: false,
    };
  }

  private getDefaultSessionContext() {
		return {
      pageUrl: '',
      referrer: '',
      userAgent: '',
      timestamp: new Date().toISOString(),
      device: {
        type: 'desktop',
      },
    };
  }

  private async getBotConfig(): Promise<BotConfig> {
    return {
      name: 'STARK Assistant',
      avatar: '/images/bot-avatar.png',
      personality: 'profissional e prestativo',
      capabilities: ['suporte técnico', 'consultoria', 'vendas'],
      welcomeMessage: 'Olá! Sou o assistente virtual da STARK. Como posso te ajudar hoje?',
      fallbackMessage: 'Desculpe, não entendi sua pergunta. Poderia reformular?',
      escalationThreshold: 0.7,
      workingHours: {
        enabled: true,
        start: '08:00',
        end: '18:00',
        timezone: 'America/Sao_Paulo',
      },
    };
  }

  private async logActivity(createActivityLogDto: CreateActivityLogDto) {
    try {
      await this.prisma.activityLog.create({
        data: createActivityLogDto,
      });
    } catch (error) {
      this.logger.warn('Failed to log activity:', error);
    }
  }

  // ===== MÉTODOS ADICIONAIS PARA O CONTROLLER =====

  async createNotification(createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  async getUserNotifications(userId: string, limit = 20) {
    return this.notificationService.getUserNotifications(userId, limit);
  }

  async markNotificationAsRead(notificationId: string, userId: string) {
    return this.notificationService.markAsRead(notificationId, userId);
  }

  async markAllNotificationsAsRead(userId: string) {
    return this.notificationService.markAllAsRead(userId);
  }

  async getSessionAnalytics(sessionId: string) {
    return this.analyticsService.getSessionAnalytics(sessionId);
  }

  async getBotConfig() {
    return this.aiAssistant.getBotConfig();
  }

  async getSystemConfig() {
    try {
      const configs = await this.prisma.systemConfig.findMany();
      return configs.reduce((acc, config) => {
        acc[config.key] = config.value;
        return acc;
      }, {} as Record<string, any>);
    } catch (error) {
      this.logger.error('Error getting system config:', error);
      return {};
    }
  }

  async updateSystemConfig(config: Record<string, any>) {
    try {
      const updates = await Promise.all(
        Object.entries(config).map(([key, value]) =>
          this.prisma.systemConfig.upsert({
            where: { key },
            update: { value, updatedAt: new Date() },
            create: { key, value, category: 'general' },
          })
        )
      );

      this.logger.log(`Updated ${updates.length} system configurations`);
      return updates;
    } catch (error) {
      this.logger.error('Error updating system config:', error);
      throw new BadRequestException('Failed to update system configuration');
    }
  }
}