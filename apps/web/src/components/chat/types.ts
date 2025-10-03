/**
 * Tipos TypeScript para o Sistema de Chat Inteligente
 * 
 * Define todas as interfaces, tipos e enums necessários para o funcionamento
 * completo do sistema de chat profissional.
 */

import { ChatTheme } from './design-system';

// ===== TIPOS BÁSICOS =====

export type MessageId = string;
export type SessionId = string;
export type UserId = string;
export type Timestamp = string;

// ===== ENUMS =====

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  SYSTEM = 'system',
  TYPING = 'typing',
  READ = 'read',
  DELIVERED = 'delivered',
}

export enum MessageStatus {
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

export enum SessionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
  ESCALATED = 'escalated',
}

export enum UserRole {
  VISITOR = 'visitor',
  CUSTOMER = 'customer',
  AGENT = 'agent',
  ADMIN = 'admin',
  BOT = 'bot',
}

export enum ChatMode {
  AUTO = 'auto',
  HUMAN = 'human',
  HYBRID = 'hybrid',
}

export enum Priority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

// ===== INTERFACES DE USUÁRIO =====

export interface User {
  id: UserId;
  name: string;
  email?: string;
  avatar?: string;
  role: UserRole;
  isOnline: boolean;
  lastSeen?: Timestamp;
  metadata?: Record<string, any>;
}

export interface UserProfile {
  id: UserId;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  avatar?: string;
  preferences: UserPreferences;
  metadata: Record<string, any>;
}

export interface UserPreferences {
  theme: ChatTheme;
  language: string;
  notifications: boolean;
  soundEnabled: boolean;
  autoEscalate: boolean;
  workingHours: {
    start: string;
    end: string;
    timezone: string;
  };
}

// ===== INTERFACES DE MENSAGEM =====

export interface Message {
  id: MessageId;
  sessionId: SessionId;
  senderId: UserId;
  content: string;
  type: MessageType;
  status: MessageStatus;
  timestamp: Timestamp;
  metadata?: MessageMetadata;
  replyTo?: MessageId;
  reactions?: Reaction[];
  attachments?: Attachment[];
}

export interface MessageMetadata {
  source?: string;
  intent?: string;
  confidence?: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
  entities?: Record<string, any>;
  processingTime?: number;
  aiGenerated?: boolean;
  escalated?: boolean;
}

export interface Reaction {
  emoji: string;
  userId: UserId;
  timestamp: Timestamp;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnail?: string;
  metadata?: Record<string, any>;
}

// ===== INTERFACES DE SESSÃO =====

export interface ChatSession {
  id: SessionId;
  userId: UserId;
  status: SessionStatus;
  mode: ChatMode;
  priority: Priority;
  title?: string;
  description?: string;
  tags: string[];
  context: SessionContext;
  metadata: Record<string, any>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActivity: Timestamp;
  assignedAgent?: UserId;
  escalatedAt?: Timestamp;
  resolvedAt?: Timestamp;
}

export interface SessionContext {
  pageUrl?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  location?: {
    country?: string;
    city?: string;
    timezone?: string;
  };
  device?: {
    type: 'desktop' | 'mobile' | 'tablet';
    os?: string;
    browser?: string;
  };
  customData?: Record<string, any>;
  conversationHistory?: MessageSummary[];
}

export interface MessageSummary {
  id: MessageId;
  content: string;
  timestamp: Timestamp;
  type: MessageType;
}

// ===== INTERFACES DE IA E BOT =====

export interface AIResponse {
  content: string;
  confidence: number;
  intent: string;
  entities: Record<string, any>;
  suggestions: Suggestion[];
  escalate: boolean;
  processingTime: number;
}

export interface Suggestion {
  id: string;
  text: string;
  action: 'reply' | 'action' | 'link';
  data?: any;
  icon?: string;
}

export interface BotConfig {
  name: string;
  avatar: string;
  personality: string;
  capabilities: string[];
  fallbackMessage: string;
  escalationThreshold: number;
  workingHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
}

// ===== INTERFACES DE ESCALAÇÃO =====

export interface EscalationTicket {
  id: string;
  sessionId: SessionId;
  reason: string;
  priority: Priority;
  assignedTo?: UserId;
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  resolvedAt?: Timestamp;
  notes?: string;
}

export interface EscalationReason {
  id: string;
  label: string;
  description: string;
  priority: Priority;
  autoAssign: boolean;
  department?: string;
}

// ===== INTERFACES DE NOTIFICAÇÃO =====

export interface Notification {
  id: string;
  userId: UserId;
  type: 'message' | 'escalation' | 'system' | 'reminder';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  timestamp: Timestamp;
  expiresAt?: Timestamp;
}

export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  email: boolean;
  sms: boolean;
  types: {
    messages: boolean;
    escalations: boolean;
    system: boolean;
    reminders: boolean;
  };
}

// ===== INTERFACES DE ESTATÍSTICAS =====

export interface ChatAnalytics {
  sessionId: SessionId;
  duration: number;
  messageCount: number;
  userSatisfaction?: number;
  escalationCount: number;
  resolutionTime?: number;
  botAccuracy?: number;
  popularTopics: string[];
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface DashboardStats {
  totalSessions: number;
  activeSessions: number;
  averageResponseTime: number;
  escalationRate: number;
  satisfactionScore: number;
  botAccuracy: number;
  popularIntents: Array<{
    intent: string;
    count: number;
    percentage: number;
  }>;
}

// ===== INTERFACES DE CONFIGURAÇÃO =====

export interface ChatConfig {
  theme: ChatTheme;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size: 'sm' | 'md' | 'lg' | 'xl';
  autoOpen: boolean;
  showAvatar: boolean;
  showTyping: boolean;
  showStatus: boolean;
  enableSounds: boolean;
  enableNotifications: boolean;
  maxMessages: number;
  messageTimeout: number;
  typingTimeout: number;
  retryAttempts: number;
  apiEndpoint: string;
  websocketEndpoint: string;
}

export interface WidgetConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  offlineMessage: string;
  workingHours: {
    enabled: boolean;
    message: string;
    start: string;
    end: string;
    timezone: string;
  };
  appearance: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    borderRadius: string;
    fontFamily: string;
  };
}

// ===== INTERFACES DE EVENTOS =====

export interface ChatEvent {
  type: string;
  timestamp: Timestamp;
  sessionId: SessionId;
  data: Record<string, any>;
}

export interface MessageEvent extends ChatEvent {
  type: 'message';
  data: {
    message: Message;
    sender: User;
  };
}

export interface TypingEvent extends ChatEvent {
  type: 'typing';
  data: {
    userId: UserId;
    isTyping: boolean;
  };
}

export interface StatusEvent extends ChatEvent {
  type: 'status';
  data: {
    status: SessionStatus;
    message?: string;
  };
}

// ===== INTERFACES DE API =====

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Timestamp;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CreateSessionRequest {
  userId?: UserId;
  context?: Partial<SessionContext>;
  metadata?: Record<string, any>;
}

export interface SendMessageRequest {
  sessionId: SessionId;
  content: string;
  type?: MessageType;
  replyTo?: MessageId;
  attachments?: Attachment[];
}

export interface UpdateSessionRequest {
  status?: SessionStatus;
  priority?: Priority;
  assignedAgent?: UserId;
  tags?: string[];
  metadata?: Record<string, any>;
}

// ===== INTERFACES DE HOOKS =====

export interface UseChatReturn {
  session: ChatSession | null;
  messages: Message[];
  users: Record<UserId, User>;
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;
  sendMessage: (content: string, type?: MessageType) => Promise<void>;
  updateSession: (updates: UpdateSessionRequest) => Promise<void>;
  escalateToHuman: (reason: string) => Promise<void>;
  clearMessages: () => void;
  reconnect: () => void;
}

export interface UseTypingReturn {
  isTyping: boolean;
  startTyping: () => void;
  stopTyping: () => void;
  typingUsers: UserId[];
}

// ===== INTERFACES DE COMPONENTES =====

export interface ChatWidgetProps {
  config?: Partial<ChatConfig>;
  onMessage?: (message: Message) => void;
  onSessionStart?: (session: ChatSession) => void;
  onSessionEnd?: (session: ChatSession) => void;
  onEscalation?: (ticket: EscalationTicket) => void;
  className?: string;
}

export interface MessageBubbleProps {
  message: Message;
  sender: User;
  showAvatar: boolean;
  showTimestamp: boolean;
  showStatus: boolean;
  isOwn: boolean;
  onReply?: (message: Message) => void;
  onReact?: (message: Message, emoji: string) => void;
  className?: string;
}

export interface ChatHeaderProps {
  session: ChatSession;
  user: User;
  onMinimize?: () => void;
  onClose?: () => void;
  onEscalate?: () => void;
  className?: string;
}

export interface ChatInputProps {
  onSend: (content: string) => void;
  onTyping?: (isTyping: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  showAttachments?: boolean;
  className?: string;
}

// ===== TIPOS UTILITÁRIOS =====

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type ChatState = {
  session: ChatSession | null;
  messages: Message[];
  users: Record<UserId, User>;
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;
  typingUsers: UserId[];
  notifications: Notification[];
};
