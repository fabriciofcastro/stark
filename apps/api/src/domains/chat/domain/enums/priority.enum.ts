/**
 * Enum Priority
 * Representa os níveis de prioridade para sessões de chat
 */

export enum Priority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

export const PRIORITY_LABELS = {
  [Priority.LOW]: 'Baixa',
  [Priority.NORMAL]: 'Normal',
  [Priority.HIGH]: 'Alta',
  [Priority.URGENT]: 'Urgente'
} as const;

export const PRIORITY_DESCRIPTIONS = {
  [Priority.LOW]: 'Prioridade baixa - pode aguardar',
  [Priority.NORMAL]: 'Prioridade normal - atendimento padrão',
  [Priority.HIGH]: 'Prioridade alta - atendimento prioritário',
  [Priority.URGENT]: 'Prioridade urgente - atendimento imediato'
} as const;

export const PRIORITY_WEIGHTS = {
  [Priority.LOW]: 1,
  [Priority.NORMAL]: 2,
  [Priority.HIGH]: 3,
  [Priority.URGENT]: 4
} as const;
