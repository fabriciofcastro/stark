/**
 * ChatSession Domain Service
 * Contém lógica de negócio complexa que não pertence a uma entidade específica
 */

import { Injectable } from '@nestjs/common';
import { ChatSession } from '../entities/chat-session.entity';
import { ChatSessionRepository } from '../repositories/chat-session.repository.interface';
import { UserId } from '../value-objects/user-id.vo';
import { SessionStatus } from '../enums/session-status.enum';
import { Priority } from '../enums/priority.enum';

@Injectable()
export class ChatSessionService {
  constructor(
    private readonly chatSessionRepository: ChatSessionRepository,
  ) {}

  /**
   * Cria uma nova sessão de chat com validações de negócio
   */
  async createSession(
    userId: UserId,
    context?: string,
    metadata?: Record<string, any>
  ): Promise<ChatSession> {
    // Verificar se o usuário já tem uma sessão ativa
    const activeSessions = await this.chatSessionRepository.findByUserIdAndStatus(
      userId,
      SessionStatus.ACTIVE
    );

    if (activeSessions.length > 0) {
      // Pausar sessões ativas existentes
      for (const session of activeSessions) {
        session.pause();
        await this.chatSessionRepository.update(session);
      }
    }

    // Determinar prioridade baseada no contexto
    const priority = this.determinePriority(context, metadata);

    // Criar nova sessão
    const session = ChatSession.create({
      userId,
      status: SessionStatus.ACTIVE,
      priority,
      context,
      metadata,
    });

    await this.chatSessionRepository.save(session);
    return session;
  }

  /**
   * Determina a prioridade da sessão baseada no contexto
   */
  private determinePriority(
    context?: string,
    metadata?: Record<string, any>
  ): Priority {
    if (!context && !metadata) {
      return Priority.NORMAL;
    }

    // Palavras-chave que indicam alta prioridade
    const highPriorityKeywords = [
      'urgente', 'emergência', 'crítico', 'problema', 'erro',
      'urgent', 'emergency', 'critical', 'problem', 'error'
    ];

    // Palavras-chave que indicam baixa prioridade
    const lowPriorityKeywords = [
      'consulta', 'dúvida', 'informação', 'question',
      'inquiry', 'information', 'doubt'
    ];

    const contextText = (context || '').toLowerCase();
    const metadataText = JSON.stringify(metadata || {}).toLowerCase();

    const combinedText = `${contextText} ${metadataText}`;

    // Verificar palavras-chave de alta prioridade
    if (highPriorityKeywords.some(keyword => combinedText.includes(keyword))) {
      return Priority.HIGH;
    }

    // Verificar palavras-chave de baixa prioridade
    if (lowPriorityKeywords.some(keyword => combinedText.includes(keyword))) {
      return Priority.LOW;
    }

    // Verificar se é um retorno de cliente (metadata específico)
    if (metadata?.isReturningCustomer) {
      return Priority.HIGH;
    }

    // Verificar se é um cliente VIP
    if (metadata?.isVip) {
      return Priority.URGENT;
    }

    return Priority.NORMAL;
  }

  /**
   * Escala uma sessão para atendimento humano
   */
  async escalateSession(
    sessionId: string,
    agentId: string,
    reason?: string
  ): Promise<void> {
    const session = await this.chatSessionRepository.findById(
      ChatSessionId.create(sessionId)
    );

    if (!session) {
      throw new Error('Sessão não encontrada');
    }

    if (session.isClosed()) {
      throw new Error('Não é possível escalar uma sessão fechada');
    }

    // Atualizar metadata com motivo da escalação
    const updatedMetadata = {
      ...session.metadata,
      escalationReason: reason,
      escalatedBy: 'system',
      escalatedAt: new Date().toISOString(),
    };

    session.updateMetadata(updatedMetadata);
    session.escalate(agentId);

    await this.chatSessionRepository.update(session);
  }

  /**
   * Fecha uma sessão com validações de negócio
   */
  async closeSession(sessionId: string, reason?: string): Promise<void> {
    const session = await this.chatSessionRepository.findById(
      ChatSessionId.create(sessionId)
    );

    if (!session) {
      throw new Error('Sessão não encontrada');
    }

    if (session.isClosed()) {
      throw new Error('Sessão já está fechada');
    }

    // Atualizar metadata com motivo do fechamento
    const updatedMetadata = {
      ...session.metadata,
      closeReason: reason,
      closedBy: 'system',
    };

    session.updateMetadata(updatedMetadata);
    session.close();

    await this.chatSessionRepository.update(session);
  }

  /**
   * Obtém estatísticas de sessões
   */
  async getSessionStatistics(userId?: UserId): Promise<{
    total: number;
    active: number;
    closed: number;
    escalated: number;
    averageDuration: number;
  }> {
    const sessions = userId
      ? await this.chatSessionRepository.findByUserId(userId)
      : await this.chatSessionRepository.findAll();

    const total = sessions.length;
    const active = sessions.filter(s => s.status === SessionStatus.ACTIVE).length;
    const closed = sessions.filter(s => s.status === SessionStatus.CLOSED).length;
    const escalated = sessions.filter(s => s.status === SessionStatus.ESCALATED).length;

    const closedSessions = sessions.filter(s => s.isClosed());
    const averageDuration = closedSessions.length > 0
      ? closedSessions.reduce((sum, s) => sum + s.getDuration(), 0) / closedSessions.length
      : 0;

    return {
      total,
      active,
      closed,
      escalated,
      averageDuration,
    };
  }

  /**
   * Verifica se um usuário pode criar uma nova sessão
   */
  async canCreateSession(userId: UserId): Promise<boolean> {
    const activeSessions = await this.chatSessionRepository.findByUserIdAndStatus(
      userId,
      SessionStatus.ACTIVE
    );

    // Limite de 3 sessões ativas por usuário
    return activeSessions.length < 3;
  }
}
