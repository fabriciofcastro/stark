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

export enum EscalationStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum NotificationType {
  MESSAGE = 'message',
  ESCALATION = 'escalation',
  SYSTEM = 'system',
  REMINDER = 'reminder',
}

export enum ContactFormStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  CONVERTED = 'converted',
  CLOSED = 'closed',
}
