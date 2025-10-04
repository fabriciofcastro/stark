/**
 * Prisma ChatSession Repository Implementation
 * Implementa o repositório usando Prisma ORM
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ChatSession } from '../../domain/entities/chat-session.entity';
import { ChatSessionRepository } from '../../domain/repositories/chat-session.repository.interface';
import { ChatSessionId } from '../../domain/value-objects/chat-session-id.vo';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { SessionStatus } from '../../domain/enums/session-status.enum';
import { Priority } from '../../domain/enums/priority.enum';

@Injectable()
export class PrismaChatSessionRepository implements ChatSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(session: ChatSession): Promise<void> {
    await this.prisma.chatSession.create({
      data: {
        id: session.id.value,
        userId: session.userId.value,
        status: session.status,
        priority: session.priority,
        context: session.context,
        metadata: session.metadata,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        closedAt: session.closedAt,
        escalatedAt: session.escalatedAt,
        assignedAgentId: session.assignedAgentId,
      },
    });
  }

  async findById(id: ChatSessionId): Promise<ChatSession | null> {
    const session = await this.prisma.chatSession.findUnique({
      where: { id: id.value },
    });

    if (!session) {
      return null;
    }

    return this.mapToDomain(session);
  }

  async findByUserId(userId: UserId): Promise<ChatSession[]> {
    const sessions = await this.prisma.chatSession.findMany({
      where: { userId: userId.value },
      orderBy: { createdAt: 'desc' },
    });

    return sessions.map(session => this.mapToDomain(session));
  }

  async findByStatus(status: SessionStatus): Promise<ChatSession[]> {
    const sessions = await this.prisma.chatSession.findMany({
      where: { status },
      orderBy: { createdAt: 'desc' },
    });

    return sessions.map(session => this.mapToDomain(session));
  }

  async findByUserIdAndStatus(userId: UserId, status: SessionStatus): Promise<ChatSession[]> {
    const sessions = await this.prisma.chatSession.findMany({
      where: { 
        userId: userId.value,
        status 
      },
      orderBy: { createdAt: 'desc' },
    });

    return sessions.map(session => this.mapToDomain(session));
  }

  async findActiveSessions(): Promise<ChatSession[]> {
    return this.findByStatus(SessionStatus.ACTIVE);
  }

  async findEscalatedSessions(): Promise<ChatSession[]> {
    return this.findByStatus(SessionStatus.ESCALATED);
  }

  async findAll(): Promise<ChatSession[]> {
    const sessions = await this.prisma.chatSession.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return sessions.map(session => this.mapToDomain(session));
  }

  async update(session: ChatSession): Promise<void> {
    await this.prisma.chatSession.update({
      where: { id: session.id.value },
      data: {
        status: session.status,
        priority: session.priority,
        context: session.context,
        metadata: session.metadata,
        updatedAt: session.updatedAt,
        closedAt: session.closedAt,
        escalatedAt: session.escalatedAt,
        assignedAgentId: session.assignedAgentId,
      },
    });
  }

  async delete(id: ChatSessionId): Promise<void> {
    await this.prisma.chatSession.delete({
      where: { id: id.value },
    });
  }

  async countByUserId(userId: UserId): Promise<number> {
    return this.prisma.chatSession.count({
      where: { userId: userId.value },
    });
  }

  async countByStatus(status: SessionStatus): Promise<number> {
    return this.prisma.chatSession.count({
      where: { status },
    });
  }

  async findSessionsByDateRange(startDate: Date, endDate: Date): Promise<ChatSession[]> {
    const sessions = await this.prisma.chatSession.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return sessions.map(session => this.mapToDomain(session));
  }

  async findSessionsByAgent(agentId: string): Promise<ChatSession[]> {
    const sessions = await this.prisma.chatSession.findMany({
      where: { assignedAgentId: agentId },
      orderBy: { createdAt: 'desc' },
    });

    return sessions.map(session => this.mapToDomain(session));
  }

  private mapToDomain(session: any): ChatSession {
    return ChatSession.restore({
      id: ChatSessionId.create(session.id),
      userId: UserId.create(session.userId),
      status: session.status as SessionStatus,
      priority: session.priority as Priority,
      context: session.context,
      metadata: session.metadata,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      closedAt: session.closedAt,
      escalatedAt: session.escalatedAt,
      assignedAgentId: session.assignedAgentId,
    });
  }
}
