/**
 * ChatSession Repository Interface
 * Define o contrato para persistência de sessões de chat
 */

import { ChatSession } from '../entities/chat-session.entity';
import { ChatSessionId } from '../value-objects/chat-session-id.vo';
import { UserId } from '../value-objects/user-id.vo';
import { SessionStatus } from '../enums/session-status.enum';

export interface ChatSessionRepository {
  // Create
  save(session: ChatSession): Promise<void>;

  // Read
  findById(id: ChatSessionId): Promise<ChatSession | null>;
  findByUserId(userId: UserId): Promise<ChatSession[]>;
  findByStatus(status: SessionStatus): Promise<ChatSession[]>;
  findByUserIdAndStatus(userId: UserId, status: SessionStatus): Promise<ChatSession[]>;
  findActiveSessions(): Promise<ChatSession[]>;
  findEscalatedSessions(): Promise<ChatSession[]>;
  findAll(): Promise<ChatSession[]>;

  // Update
  update(session: ChatSession): Promise<void>;

  // Delete
  delete(id: ChatSessionId): Promise<void>;

  // Business Queries
  countByUserId(userId: UserId): Promise<number>;
  countByStatus(status: SessionStatus): Promise<number>;
  findSessionsByDateRange(startDate: Date, endDate: Date): Promise<ChatSession[]>;
  findSessionsByAgent(agentId: string): Promise<ChatSession[]>;
}
