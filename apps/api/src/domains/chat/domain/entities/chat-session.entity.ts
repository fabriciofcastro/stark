/**
 * Entidade ChatSession - Domain Layer
 * Representa uma sessão de chat no domínio de negócio
 */

import { Entity } from '../../../shared/domain/entity.base';
import { ChatSessionId } from '../value-objects/chat-session-id.vo';
import { UserId } from '../value-objects/user-id.vo';
import { SessionStatus } from '../enums/session-status.enum';
import { Priority } from '../enums/priority.enum';

export interface ChatSessionProps {
  id: ChatSessionId;
  userId: UserId;
  status: SessionStatus;
  priority: Priority;
  context?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
  escalatedAt?: Date;
  assignedAgentId?: string;
}

export class ChatSession extends Entity<ChatSessionProps> {
  private constructor(props: ChatSessionProps) {
    super(props);
  }

  public static create(props: Omit<ChatSessionProps, 'id' | 'createdAt' | 'updatedAt'>): ChatSession {
    const now = new Date();
    return new ChatSession({
      ...props,
      id: ChatSessionId.generate(),
      createdAt: now,
      updatedAt: now,
    });
  }

  public static restore(props: ChatSessionProps): ChatSession {
    return new ChatSession(props);
  }

  // Getters
  get id(): ChatSessionId {
    return this.props.id;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get status(): SessionStatus {
    return this.props.status;
  }

  get priority(): Priority {
    return this.props.priority;
  }

  get context(): string | undefined {
    return this.props.context;
  }

  get metadata(): Record<string, any> | undefined {
    return this.props.metadata;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get closedAt(): Date | undefined {
    return this.props.closedAt;
  }

  get escalatedAt(): Date | undefined {
    return this.props.escalatedAt;
  }

  get assignedAgentId(): string | undefined {
    return this.props.assignedAgentId;
  }

  // Business Methods
  public pause(): void {
    if (this.props.status === SessionStatus.ACTIVE) {
      this.props.status = SessionStatus.PAUSED;
      this.props.updatedAt = new Date();
    }
  }

  public resume(): void {
    if (this.props.status === SessionStatus.PAUSED) {
      this.props.status = SessionStatus.ACTIVE;
      this.props.updatedAt = new Date();
    }
  }

  public close(): void {
    if (this.props.status !== SessionStatus.CLOSED) {
      this.props.status = SessionStatus.CLOSED;
      this.props.closedAt = new Date();
      this.props.updatedAt = new Date();
    }
  }

  public escalate(agentId: string): void {
    if (this.props.status === SessionStatus.ACTIVE || this.props.status === SessionStatus.PAUSED) {
      this.props.status = SessionStatus.ESCALATED;
      this.props.assignedAgentId = agentId;
      this.props.escalatedAt = new Date();
      this.props.updatedAt = new Date();
    }
  }

  public updateContext(context: string): void {
    this.props.context = context;
    this.props.updatedAt = new Date();
  }

  public updateMetadata(metadata: Record<string, any>): void {
    this.props.metadata = { ...this.props.metadata, ...metadata };
    this.props.updatedAt = new Date();
  }

  public changePriority(priority: Priority): void {
    this.props.priority = priority;
    this.props.updatedAt = new Date();
  }

  // Business Rules
  public canReceiveMessages(): boolean {
    return this.props.status === SessionStatus.ACTIVE;
  }

  public isEscalated(): boolean {
    return this.props.status === SessionStatus.ESCALATED;
  }

  public isClosed(): boolean {
    return this.props.status === SessionStatus.CLOSED;
  }

  public getDuration(): number {
    const endTime = this.props.closedAt || new Date();
    return endTime.getTime() - this.props.createdAt.getTime();
  }
}
