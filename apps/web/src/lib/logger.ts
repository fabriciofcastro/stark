/**
 * Sistema de Logger Profissional
 * 
 * Características:
 * - Logs apenas em desenvolvimento
 * - Níveis de log (info, warn, error, debug)
 * - Formatação consistente
 * - Sanitização de dados sensíveis
 * - Integração com serviços de monitoramento
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogOptions {
  context?: string;
  metadata?: Record<string, any>;
  sanitize?: boolean;
}

class Logger {
  private isDevelopment: boolean;
  private isProduction: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  /**
   * Sanitiza dados sensíveis antes de logar
   */
  private sanitize(data: any): any {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    const sensitiveKeys = [
      'password',
      'token',
      'secret',
      'apiKey',
      'authorization',
      'cookie',
      'creditCard',
      'ssn',
      'cpf',
    ];

    const sanitized = { ...data };

    for (const key in sanitized) {
      const lowerKey = key.toLowerCase();
      
      if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
        sanitized[key] = '***REDACTED***';
      } else if (typeof sanitized[key] === 'object') {
        sanitized[key] = this.sanitize(sanitized[key]);
      }
    }

    return sanitized;
  }

  /**
   * Formata a mensagem de log
   */
  private formatMessage(
    level: LogLevel,
    message: string,
    options?: LogOptions
  ): string {
    const timestamp = new Date().toISOString();
    const context = options?.context ? `[${options.context}]` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${context} ${message}`;
  }

  /**
   * Envia logs para serviços externos em produção
   */
  private sendToExternalService(
    level: LogLevel,
    message: string,
    options?: LogOptions
  ): void {
    if (!this.isProduction) return;

    // Integração com Sentry, LogRocket, etc.
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      const Sentry = (window as any).Sentry;
      
      if (level === 'error') {
        Sentry.captureException(new Error(message), {
          contexts: {
            custom: options?.metadata,
          },
        });
      } else {
        Sentry.captureMessage(message, {
          level: level === 'warn' ? 'warning' : level,
          contexts: {
            custom: options?.metadata,
          },
        });
      }
    }
  }

  /**
   * Log de informação (apenas em desenvolvimento)
   */
  info(message: string, options?: LogOptions): void {
    if (!this.isDevelopment) return;

    const formattedMessage = this.formatMessage('info', message, options);
    console.log(formattedMessage);

    if (options?.metadata) {
      const data = options.sanitize !== false 
        ? this.sanitize(options.metadata)
        : options.metadata;
      console.log('Metadata:', data);
    }
  }

  /**
   * Log de aviso (desenvolvimento e produção)
   */
  warn(message: string, options?: LogOptions): void {
    const formattedMessage = this.formatMessage('warn', message, options);
    
    if (this.isDevelopment) {
      console.warn(formattedMessage);
      if (options?.metadata) {
        const data = options.sanitize !== false 
          ? this.sanitize(options.metadata)
          : options.metadata;
        console.warn('Metadata:', data);
      }
    }

    this.sendToExternalService('warn', message, options);
  }

  /**
   * Log de erro (sempre ativo)
   */
  error(message: string, error?: Error, options?: LogOptions): void {
    const formattedMessage = this.formatMessage('error', message, options);
    
    console.error(formattedMessage);
    
    if (error) {
      console.error('Error details:', error);
      if (error.stack) {
        console.error('Stack trace:', error.stack);
      }
    }

    if (options?.metadata) {
      const data = options.sanitize !== false 
        ? this.sanitize(options.metadata)
        : options.metadata;
      console.error('Metadata:', data);
    }

    this.sendToExternalService('error', message, {
      ...options,
      metadata: {
        ...options?.metadata,
        error: error?.message,
        stack: error?.stack,
      },
    });
  }

  /**
   * Log de debug (apenas em desenvolvimento)
   */
  debug(message: string, options?: LogOptions): void {
    if (!this.isDevelopment) return;

    const formattedMessage = this.formatMessage('debug', message, options);
    console.debug(formattedMessage);

    if (options?.metadata) {
      const data = options.sanitize !== false 
        ? this.sanitize(options.metadata)
        : options.metadata;
      console.debug('Metadata:', data);
    }
  }

  /**
   * Log de performance (apenas em desenvolvimento)
   */
  performance(label: string, startTime: number): void {
    if (!this.isDevelopment) return;

    const duration = performance.now() - startTime;
    const formattedMessage = this.formatMessage('info', `Performance: ${label}`, {
      metadata: { duration: `${duration.toFixed(2)}ms` },
    });
    console.log(formattedMessage);
  }

  /**
   * Agrupa logs relacionados
   */
  group(label: string, callback: () => void): void {
    if (!this.isDevelopment) return;

    console.group(label);
    callback();
    console.groupEnd();
  }

  /**
   * Cria uma tabela de dados
   */
  table(data: any[]): void {
    if (!this.isDevelopment) return;
    console.table(data);
  }
}

// Exportar instância singleton
export const logger = new Logger();

// Exportar tipos para uso em outros arquivos
export type { LogLevel, LogOptions };
