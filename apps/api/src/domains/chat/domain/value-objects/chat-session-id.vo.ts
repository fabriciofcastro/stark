/**
 * Value Object ChatSessionId
 * Representa um identificador único para sessões de chat
 */

import { ValueObject } from '../../../shared/domain/value-object.base';
import { v4 as uuidv4 } from 'uuid';

export class ChatSessionId extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): ChatSessionId {
    if (!value || typeof value !== 'string') {
      throw new Error('ChatSessionId must be a non-empty string');
    }
    
    // Validar formato UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error('ChatSessionId must be a valid UUID');
    }

    return new ChatSessionId(value);
  }

  public static generate(): ChatSessionId {
    return new ChatSessionId(uuidv4());
  }

  public equals(other: ChatSessionId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
