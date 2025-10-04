/**
 * Value Object UserId
 * Representa um identificador único para usuários
 */

import { ValueObject } from '../../../shared/domain/value-object.base';

export class UserId extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): UserId {
    if (!value || typeof value !== 'string') {
      throw new Error('UserId must be a non-empty string');
    }
    
    if (value.length < 1 || value.length > 100) {
      throw new Error('UserId must be between 1 and 100 characters');
    }

    // Validar caracteres permitidos
    const validCharsRegex = /^[a-zA-Z0-9_-]+$/;
    if (!validCharsRegex.test(value)) {
      throw new Error('UserId can only contain letters, numbers, hyphens and underscores');
    }

    return new UserId(value);
  }

  public equals(other: UserId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
