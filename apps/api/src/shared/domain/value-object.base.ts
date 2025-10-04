/**
 * Base Value Object Class
 * Classe base para todos os value objects do domínio
 */

export abstract class ValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  public get value(): T {
    return this._value;
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (this._value !== vo._value) {
      return false;
    }
    return true;
  }

  public toString(): string {
    if (this._value === null || this._value === undefined) {
      return '';
    }
    return String(this._value);
  }
}
