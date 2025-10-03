import { IsString, IsOptional, IsObject, IsArray, IsEnum, IsBoolean, IsNumber, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// ===== DTOs para Sessões =====
export class CreateChatSessionDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsObject()
  context?: any;

  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class UpdateChatSessionDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  mode?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  assignedAgent?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsObject()
  metadata?: any;
}

// ===== DTOs para Mensagens =====
export class SendMessageDto {
  @IsString()
  sessionId: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  replyTo?: string;

  @IsOptional()
  @IsArray()
  attachments?: any[];

  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class MessageReactionDto {
  @IsString()
  messageId: string;

  @IsString()
  emoji: string;
}

// ===== DTOs para Escalação =====
export class EscalateToHumanDto {
  @IsString()
  sessionId: string;

  @IsString()
  reason: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateEscalationDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

// ===== DTOs para Usuários =====
export class CreateUserDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsObject()
  metadata?: any;

  @IsOptional()
  @IsObject()
  preferences?: any;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsBoolean()
  isOnline?: boolean;

  @IsOptional()
  @IsObject()
  metadata?: any;

  @IsOptional()
  @IsObject()
  preferences?: any;
}

// ===== DTOs para Notificações =====
export class CreateNotificationDto {
  @IsString()
  userId: string;

  @IsString()
  type: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsObject()
  data?: any;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

export class UpdateNotificationDto {
  @IsOptional()
  @IsBoolean()
  read?: boolean;
}

// ===== DTOs para Análises =====
export class CreateAnalyticsDto {
  @IsString()
  sessionId: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  messageCount: number;

  @IsOptional()
  @IsNumber()
  userSatisfaction?: number;

  @IsNumber()
  escalationCount: number;

  @IsOptional()
  @IsNumber()
  resolutionTime?: number;

  @IsOptional()
  @IsNumber()
  botAccuracy?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  popularTopics?: string[];

  @IsOptional()
  @IsObject()
  sentiment?: any;
}

// ===== DTOs para Configurações =====
export class UpdateSystemConfigDto {
  @IsString()
  key: string;

  @IsObject()
  value: any;

  @IsOptional()
  @IsString()
  category?: string;
}

// ===== DTOs para Formulários de Contato =====
export class CreateContactFormDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsString()
  service: string;

  @IsOptional()
  @IsString()
  urgency?: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class UpdateContactFormDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsObject()
  metadata?: any;
}

// ===== DTOs para Logs de Atividade =====
export class CreateActivityLogDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  sessionId?: string;

  @IsString()
  action: string;

  @IsOptional()
  @IsObject()
  details?: any;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;
}

// ===== DTOs para Respostas da API =====
export class ApiResponseDto<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export class PaginatedResponseDto<T = any> extends ApiResponseDto<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}