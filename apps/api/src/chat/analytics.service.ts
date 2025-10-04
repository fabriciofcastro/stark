import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardStats, ChatAnalytics } from './interfaces';
import { CreateAnalyticsDto } from './dto';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createAnalytics(createAnalyticsDto: CreateAnalyticsDto) {
    try {
      const analytics = await this.prisma.chatAnalytics.create({
        data: createAnalyticsDto,
      });

      this.logger.log(`Analytics created for session ${createAnalyticsDto.sessionId}`);
      
      return analytics;
    } catch (error) {
      this.logger.error('Error creating analytics:', error);
      throw error;
    }
  }

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const [
        totalSessions,
        activeSessions,
        totalMessages,
        totalEscalations,
        averageResponseTime,
        satisfactionStats,
        hourlyStats,
        dailyStats,
        popularIntents,
      ] = await Promise.all([
        this.getTotalSessions(),
        this.getActiveSessions(),
        this.getTotalMessages(),
        this.getTotalEscalations(),
        this.getAverageResponseTime(),
        this.getSatisfactionStats(),
        this.getHourlyStats(),
        this.getDailyStats(),
        this.getPopularIntents(),
      ]);

      const escalationRate = totalSessions > 0 ? (totalEscalations / totalSessions) * 100 : 0;
      const botAccuracy = await this.getBotAccuracy();

      return {
        totalSessions,
        activeSessions,
        averageResponseTime,
        escalationRate,
        satisfactionScore: satisfactionStats.average,
        botAccuracy,
        popularIntents: popularIntents.map(intent => ({
          intent: intent.intent,
          count: Number(intent.count),
          percentage: intent.percentage
        })),
        hourlyStats,
        dailyStats,
      };
    } catch (error) {
      this.logger.error('Error getting dashboard stats:', error);
      throw error;
    }
  }

  async getSessionAnalytics(sessionId: string): Promise<ChatAnalytics | null> {
    try {
      const analytics = await this.prisma.chatAnalytics.findUnique({
        where: { sessionId },
      });

      return analytics;
    } catch (error) {
      this.logger.error('Error getting session analytics:', error);
      throw error;
    }
  }

  async updateSessionAnalytics(sessionId: string, updates: Partial<CreateAnalyticsDto>) {
    try {
      const analytics = await this.prisma.chatAnalytics.upsert({
        where: { sessionId },
        update: updates,
        create: {
          sessionId,
          ...updates,
          duration: updates.duration || 0,
          messageCount: updates.messageCount || 0,
          escalationCount: updates.escalationCount || 0,
          popularTopics: updates.popularTopics || [],
          sentiment: updates.sentiment || { positive: 0, neutral: 0, negative: 0 },
        },
      });

      return analytics;
    } catch (error) {
      this.logger.error('Error updating session analytics:', error);
      throw error;
    }
  }

  async getPerformanceMetrics(timeframe: 'hour' | 'day' | 'week' | 'month' = 'day') {
    try {
      const now = new Date();
      const startDate = this.getStartDate(now, timeframe);

      const [sessions, messages, escalations, responseTimes] = await Promise.all([
        this.getSessionsInTimeframe(startDate, now),
        this.getMessagesInTimeframe(startDate, now),
        this.getEscalationsInTimeframe(startDate, now),
        this.getResponseTimesInTimeframe(startDate, now),
      ]);

      const averageResponseTime = responseTimes.length > 0 
        ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
        : 0;

      return {
        timeframe,
        sessions: sessions.length,
        messages: messages.length,
        escalations: escalations.length,
        averageResponseTime,
        messagesPerSession: sessions.length > 0 ? messages.length / sessions.length : 0,
        escalationRate: sessions.length > 0 ? (escalations.length / sessions.length) * 100 : 0,
      };
    } catch (error) {
      this.logger.error('Error getting performance metrics:', error);
      throw error;
    }
  }

  async getUserSatisfactionTrend(timeframe: 'day' | 'week' | 'month' = 'week') {
    try {
      const now = new Date();
      const startDate = this.getStartDate(now, timeframe);

      const satisfactionData = await this.prisma.chatAnalytics.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: now,
          },
          userSatisfaction: {
            not: null,
          },
        },
        select: {
          userSatisfaction: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      // Agrupar por período
      const groupedData = this.groupSatisfactionByTimeframe(satisfactionData, timeframe);

      return groupedData;
    } catch (error) {
      this.logger.error('Error getting user satisfaction trend:', error);
      throw error;
    }
  }

  async getTopPerformingAgents(limit = 10) {
    try {
      const agents = await this.prisma.user.findMany({
        where: {
          role: 'agent',
        },
        include: {
          assignedTickets: {
            where: {
              status: 'resolved',
              resolvedAt: {
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Últimos 30 dias
              },
            },
          },
          sessions: {
            where: {
              assignedAgent: {
                not: null,
              },
            },
            include: {
              analytics: true,
            },
          },
        },
      });

      const agentStats = agents.map(agent => {
        const resolvedTickets = agent.assignedTickets.length;
        const sessions = agent.sessions.length;
        const totalSatisfaction = agent.sessions
          .filter(session => session.analytics?.userSatisfaction)
          .reduce((sum, session) => sum + (session.analytics.userSatisfaction || 0), 0);
        const avgSatisfaction = sessions > 0 ? totalSatisfaction / sessions : 0;

        return {
          agentId: agent.id,
          name: agent.name,
          resolvedTickets,
          sessions,
          averageSatisfaction: avgSatisfaction,
          performanceScore: (resolvedTickets * 0.4) + (sessions * 0.3) + (avgSatisfaction * 0.3),
        };
      });

      return agentStats
        .sort((a, b) => b.performanceScore - a.performanceScore)
        .slice(0, limit);
    } catch (error) {
      this.logger.error('Error getting top performing agents:', error);
      throw error;
    }
  }

  private async getTotalSessions(): Promise<number> {
    return this.prisma.chatSession.count();
  }

  private async getActiveSessions(): Promise<number> {
    return this.prisma.chatSession.count({
      where: { status: 'active' },
    });
  }

  private async getTotalMessages(): Promise<number> {
    return this.prisma.chatMessage.count();
  }

  private async getTotalEscalations(): Promise<number> {
    return this.prisma.escalationTicket.count();
  }

  private async getAverageResponseTime(): Promise<number> {
    const responseTimes = await this.prisma.chatMessage.findMany({
      where: {
        metadata: {
          path: ['processingTime'],
          not: null,
        },
      },
      select: {
        metadata: true,
      },
    });

    if (responseTimes.length === 0) return 0;

    const totalTime = responseTimes.reduce((sum, message) => {
      const processingTime = message.metadata?.processingTime;
      return sum + (processingTime || 0);
    }, 0);

    return totalTime / responseTimes.length;
  }

  private async getSatisfactionStats() {
    const stats = await this.prisma.chatAnalytics.aggregate({
      where: {
        userSatisfaction: {
          not: null,
        },
      },
      _avg: {
        userSatisfaction: true,
      },
      _count: {
        userSatisfaction: true,
      },
    });

    return {
      average: stats._avg.userSatisfaction || 0,
      count: stats._count.userSatisfaction,
    };
  }

  private async getHourlyStats() {
    const hourlyData = await this.prisma.chatSession.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
    });

    // Agrupar por hora do dia
    const hourlyStats = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      sessions: 0,
      messages: 0,
    }));

    // TODO: Implementar agrupamento por hora
    return hourlyStats;
  }

  private async getDailyStats() {
    const dailyData = await this.prisma.chatSession.findMany({
      select: {
        createdAt: true,
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 30,
    });

    // Agrupar por dia
    const dailyStats = dailyData.map(session => ({
      date: session.createdAt.toISOString().split('T')[0],
      sessions: 1,
      messages: session._count.messages,
      escalations: 0, // TODO: Calcular escalações por dia
    }));

    return dailyStats;
  }

  private async getPopularIntents() {
    const intents = await this.prisma.chatMessage.findMany({
      where: {
        metadata: {
          path: ['intent'],
          not: null,
        },
      },
      select: {
        metadata: true,
      },
    });

    const intentCounts = intents.reduce((acc, message) => {
      const intent = message.metadata?.intent;
      if (intent) {
        acc[intent] = (acc[intent] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(intentCounts).reduce((sum: number, count: number) => sum + count, 0);

    return Object.entries(intentCounts)
      .map(([intent, count]) => ({
        intent,
        count,
        percentage: (total as number) > 0 ? (count as number / (total as number)) * 100 : 0,
      }))
      .sort((a, b) => Number(b.count) - Number(a.count))
      .slice(0, 10);
  }

  private async getBotAccuracy(): Promise<number> {
    const messages = await this.prisma.chatMessage.findMany({
      where: {
        metadata: {
          path: ['confidence'],
          not: null,
        },
      },
      select: {
        metadata: true,
      },
    });

    if (messages.length === 0) return 0;

    const totalConfidence = messages.reduce((sum, message) => {
      const confidence = message.metadata?.confidence;
      return sum + (confidence || 0);
    }, 0);

    return totalConfidence / messages.length;
  }

  private async getSessionsInTimeframe(startDate: Date, endDate: Date) {
    return this.prisma.chatSession.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }

  private async getMessagesInTimeframe(startDate: Date, endDate: Date) {
    return this.prisma.chatMessage.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }

  private async getEscalationsInTimeframe(startDate: Date, endDate: Date) {
    return this.prisma.escalationTicket.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }

  private async getResponseTimesInTimeframe(startDate: Date, endDate: Date): Promise<number[]> {
    const messages = await this.prisma.chatMessage.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        metadata: {
          path: ['processingTime'],
          not: null,
        },
      },
      select: {
        metadata: true,
      },
    });

    return messages
      .map(message => message.metadata?.processingTime)
      .filter((time): time is number => typeof time === 'number');
  }

  private getStartDate(now: Date, timeframe: string): Date {
    const start = new Date(now);
    
    switch (timeframe) {
      case 'hour':
        start.setHours(start.getHours() - 1);
        break;
      case 'day':
        start.setDate(start.getDate() - 1);
        break;
      case 'week':
        start.setDate(start.getDate() - 7);
        break;
      case 'month':
        start.setMonth(start.getMonth() - 1);
        break;
      default:
        start.setDate(start.getDate() - 1);
    }
    
    return start;
  }

  private groupSatisfactionByTimeframe(
    data: Array<{ userSatisfaction: number; createdAt: Date }>,
    timeframe: string
  ) {
    // TODO: Implementar agrupamento por período
    return data.map(item => ({
      date: item.createdAt.toISOString().split('T')[0],
      satisfaction: item.userSatisfaction,
    }));
  }
}
