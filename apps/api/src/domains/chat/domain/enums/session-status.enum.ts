/**
 * Enum SessionStatus
 * Representa os possíveis status de uma sessão de chat
 */

export enum SessionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CLOSED = 'closed',
  ESCALATED = 'escalated'
}

export const SESSION_STATUS_LABELS = {
  [SessionStatus.ACTIVE]: 'Ativa',
  [SessionStatus.PAUSED]: 'Pausada',
  [SessionStatus.CLOSED]: 'Fechada',
  [SessionStatus.ESCALATED]: 'Escalada'
} as const;

export const SESSION_STATUS_DESCRIPTIONS = {
  [SessionStatus.ACTIVE]: 'Sessão ativa e recebendo mensagens',
  [SessionStatus.PAUSED]: 'Sessão pausada temporariamente',
  [SessionStatus.CLOSED]: 'Sessão finalizada',
  [SessionStatus.ESCALATED]: 'Sessão escalada para atendimento humano'
} as const;
