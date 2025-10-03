export interface AIResponse {
  content: string;
  confidence: number;
  intent: string;
  entities: Record<string, any>;
  suggestions: Suggestion[];
  escalate: boolean;
  processingTime: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface Suggestion {
  id: string;
  text: string;
  action: 'reply' | 'action' | 'link' | 'escalate';
  data?: any;
  icon?: string;
  priority?: number;
}

export interface BotConfig {
  name: string;
  avatar: string;
  personality: string;
  capabilities: string[];
  welcomeMessage: string;
  fallbackMessage: string;
  escalationThreshold: number;
  workingHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
  responses: {
    greeting: string[];
    service: string[];
    escalation: string[];
    goodbye: string[];
  };
}

export interface ProcessMessageRequest {
  sessionId: string;
  message: string;
  context: any;
  userHistory: any[];
  metadata?: any;
}

export interface UserPreferences {
  theme: string;
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
  conversationHistory?: any[];
}

export interface ChatAnalytics {
  sessionId: string;
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
  performance: {
    averageResponseTime: number;
    totalResponseTime: number;
    messagesPerMinute: number;
  };
}

export interface NotificationConfig {
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
  channels: {
    slack?: {
      webhook: string;
      channel: string;
    };
    discord?: {
      webhook: string;
      channel: string;
    };
    email?: {
      smtp: any;
      from: string;
    };
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
  hourlyStats: Array<{
    hour: number;
    sessions: number;
    messages: number;
  }>;
  dailyStats: Array<{
    date: string;
    sessions: number;
    messages: number;
    escalations: number;
  }>;
}

export interface WebSocketMessage {
  type: 'message' | 'typing' | 'status' | 'notification' | 'escalation';
  sessionId: string;
  userId: string;
  data: any;
  timestamp: string;
}

export interface ChatEvent {
  type: string;
  timestamp: string;
  sessionId: string;
  userId?: string;
  data: Record<string, any>;
}

export interface MessageEvent extends ChatEvent {
  type: 'message';
  data: {
    message: any;
    sender: any;
  };
}

export interface TypingEvent extends ChatEvent {
  type: 'typing';
  data: {
    userId: string;
    isTyping: boolean;
  };
}

export interface StatusEvent extends ChatEvent {
  type: 'status';
  data: {
    status: string;
    message?: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
