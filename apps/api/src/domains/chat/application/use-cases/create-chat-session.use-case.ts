/**
 * Create Chat Session Use Case
 * Implementa o padrão Command para criação de sessões de chat
 */

import { Injectable } from '@nestjs/common';
import { ChatSessionService } from '../../domain/services/chat-session.service';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { ChatSession } from '../../domain/entities/chat-session.entity';

export interface CreateChatSessionCommand {
  userId: string;
  context?: string;
  metadata?: Record<string, any>;
}

export interface CreateChatSessionResult {
  success: boolean;
  session?: ChatSession;
  error?: string;
}

@Injectable()
export class CreateChatSessionUseCase {
  constructor(
    private readonly chatSessionService: ChatSessionService,
  ) {}

  async execute(command: CreateChatSessionCommand): Promise<CreateChatSessionResult> {
    try {
      // Validar entrada
      if (!command.userId) {
        return {
          success: false,
          error: 'User ID é obrigatório'
        };
      }

      // Verificar se o usuário pode criar uma sessão
      const userId = UserId.create(command.userId);
      const canCreate = await this.chatSessionService.canCreateSession(userId);
      
      if (!canCreate) {
        return {
          success: false,
          error: 'Usuário atingiu o limite de sessões ativas'
        };
      }

      // Criar sessão
      const session = await this.chatSessionService.createSession(
        userId,
        command.context,
        command.metadata
      );

      return {
        success: true,
        session
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno'
      };
    }
  }
}
