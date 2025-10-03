import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto';
import { NotificationType } from './enums';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createNotification(createNotificationDto: CreateNotificationDto) {
    try {
      const notification = await this.prisma.notification.create({
        data: {
          ...createNotificationDto,
          expiresAt: createNotificationDto.expiresAt ? new Date(createNotificationDto.expiresAt) : null,
        },
        include: {
          user: true,
        },
      });

      // Enviar notificação em tempo real via WebSocket
      await this.sendRealtimeNotification(notification);

      this.logger.log(`Notification created for user ${createNotificationDto.userId}: ${createNotificationDto.title}`);
      
      return notification;
    } catch (error) {
      this.logger.error('Error creating notification:', error);
      throw error;
    }
  }

  async notifyAgents(ticket: any) {
    try {
      // Buscar agentes online
      const agents = await this.prisma.user.findMany({
        where: {
          role: 'agent',
          isOnline: true,
        },
      });

      // Criar notificação para cada agente
      const notifications = await Promise.all(
        agents.map(agent =>
          this.createNotification({
            userId: agent.id,
            type: NotificationType.ESCALATION,
            title: 'Nova Escalação',
            message: `Nova conversa escalada - Prioridade: ${ticket.priority}`,
            data: {
              ticketId: ticket.id,
              sessionId: ticket.sessionId,
              priority: ticket.priority,
              reason: ticket.reason,
            },
          })
        )
      );

      this.logger.log(`Notified ${agents.length} agents about escalation ${ticket.id}`);
      
      return notifications;
    } catch (error) {
      this.logger.error('Error notifying agents:', error);
      throw error;
    }
  }

  async notifyNewLead(contactForm: any) {
    try {
      // Buscar administradores
      const admins = await this.prisma.user.findMany({
        where: {
          role: 'admin',
        },
      });

      // Criar notificação para cada admin
      const notifications = await Promise.all(
        admins.map(admin =>
          this.createNotification({
            userId: admin.id,
            type: NotificationType.SYSTEM,
            title: 'Novo Lead',
            message: `Novo formulário de contato de ${contactForm.name} - ${contactForm.service}`,
            data: {
              formId: contactForm.id,
              name: contactForm.name,
              email: contactForm.email,
              service: contactForm.service,
              urgency: contactForm.urgency,
            },
          })
        )
      );

      this.logger.log(`Notified ${admins.length} admins about new lead ${contactForm.id}`);
      
      return notifications;
    } catch (error) {
      this.logger.error('Error notifying about new lead:', error);
      throw error;
    }
  }

  async notifyMessage(sessionId: string, message: any, targetUserId: string) {
    try {
      // Verificar se o usuário tem notificações habilitadas
      const user = await this.prisma.user.findUnique({
        where: { id: targetUserId },
        select: { preferences: true },
      });

      if (!user?.preferences?.notifications) {
        return;
      }

      const notification = await this.createNotification({
        userId: targetUserId,
        type: NotificationType.MESSAGE,
        title: 'Nova Mensagem',
        message: `Nova mensagem na sessão ${sessionId}`,
        data: {
          sessionId,
          messageId: message.id,
          content: message.content,
          senderId: message.senderId,
        },
      });

      return notification;
    } catch (error) {
      this.logger.error('Error notifying about message:', error);
      throw error;
    }
  }

  async notifySystemUpdate(updateType: string, details: any) {
    try {
      // Buscar usuários que devem receber notificações do sistema
      const users = await this.prisma.user.findMany({
        where: {
          role: {
            in: ['admin', 'agent'],
          },
        },
      });

      const notifications = await Promise.all(
        users.map(user =>
          this.createNotification({
            userId: user.id,
            type: NotificationType.SYSTEM,
            title: 'Atualização do Sistema',
            message: `Sistema atualizado: ${updateType}`,
            data: {
              updateType,
              details,
              timestamp: new Date().toISOString(),
            },
          })
        )
      );

      this.logger.log(`Notified ${users.length} users about system update: ${updateType}`);
      
      return notifications;
    } catch (error) {
      this.logger.error('Error notifying about system update:', error);
      throw error;
    }
  }

  async getUserNotifications(userId: string, limit = 20) {
    try {
      const notifications = await this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });

      return notifications;
    } catch (error) {
      this.logger.error('Error getting user notifications:', error);
      throw error;
    }
  }

  async markAsRead(notificationId: string, userId: string) {
    try {
      const notification = await this.prisma.notification.updateMany({
        where: {
          id: notificationId,
          userId,
        },
        data: {
          read: true,
        },
      });

      return notification;
    } catch (error) {
      this.logger.error('Error marking notification as read:', error);
      throw error;
    }
  }

  async markAllAsRead(userId: string) {
    try {
      const result = await this.prisma.notification.updateMany({
        where: {
          userId,
          read: false,
        },
        data: {
          read: true,
        },
      });

      this.logger.log(`Marked ${result.count} notifications as read for user ${userId}`);
      
      return result;
    } catch (error) {
      this.logger.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  async deleteExpiredNotifications() {
    try {
      const result = await this.prisma.notification.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      if (result.count > 0) {
        this.logger.log(`Deleted ${result.count} expired notifications`);
      }

      return result;
    } catch (error) {
      this.logger.error('Error deleting expired notifications:', error);
      throw error;
    }
  }

  private async sendRealtimeNotification(notification: any) {
    try {
      // Aqui você implementaria o envio via WebSocket
      // Por exemplo, usando Socket.IO ou WebSocket nativo
      
      // Exemplo de estrutura para WebSocket:
      const websocketMessage = {
        type: 'notification',
        userId: notification.userId,
        data: {
          id: notification.id,
          type: notification.type,
          title: notification.title,
          message: notification.message,
          read: notification.read,
          timestamp: notification.createdAt,
        },
      };

      // TODO: Implementar envio via WebSocket
      // this.websocketService.sendToUser(notification.userId, websocketMessage);
      
      this.logger.debug(`Realtime notification prepared for user ${notification.userId}`);
    } catch (error) {
      this.logger.error('Error sending realtime notification:', error);
    }
  }

  async getNotificationStats(userId: string) {
    try {
      const [total, unread, byType] = await Promise.all([
        this.prisma.notification.count({
          where: { userId },
        }),
        this.prisma.notification.count({
          where: { userId, read: false },
        }),
        this.prisma.notification.groupBy({
          by: ['type'],
          where: { userId },
          _count: { type: true },
        }),
      ]);

      return {
        total,
        unread,
        byType: byType.reduce((acc, item) => {
          acc[item.type] = item._count.type;
          return acc;
        }, {} as Record<string, number>),
      };
    } catch (error) {
      this.logger.error('Error getting notification stats:', error);
      throw error;
    }
  }
}
