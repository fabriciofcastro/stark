/**
 * Security Monitor Service
 * Monitora e detecta atividades suspeitas em tempo real
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface SecurityEvent {
  id: string;
  type: 'suspicious_request' | 'rate_limit_exceeded' | 'attack_detected' | 'unauthorized_access';
  severity: 'low' | 'medium' | 'high' | 'critical';
  clientIP: string;
  userAgent: string;
  url: string;
  method: string;
  timestamp: Date;
  details: Record<string, any>;
  blocked: boolean;
}

export interface AttackPattern {
  name: string;
  pattern: RegExp;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

@Injectable()
export class SecurityMonitorService {
  private readonly logger = new Logger(SecurityMonitorService.name);
  private readonly events: SecurityEvent[] = [];
  private readonly maxEvents = 1000; // Limite de eventos em memória
  
  // Padrões de ataque conhecidos
  private readonly attackPatterns: AttackPattern[] = [
    {
      name: 'SQL Injection',
      pattern: /(\bunion\b|\bselect\b|\bdrop\b|\binsert\b|\bupdate\b|\bdelete\b|\bor\s+1\s*=\s*1)/i,
      severity: 'high',
      description: 'Tentativa de SQL Injection detectada'
    },
    {
      name: 'XSS Attack',
      pattern: /<script|javascript:|on\w+\s*=|eval\s*\(/i,
      severity: 'high',
      description: 'Tentativa de XSS detectada'
    },
    {
      name: 'Path Traversal',
      pattern: /\.\.\/|\.\.\\|%2e%2e%2f|%2e%2e%5c/i,
      severity: 'medium',
      description: 'Tentativa de Path Traversal detectada'
    },
    {
      name: 'Command Injection',
      pattern: /[;&|`$(){}[\]]/,
      severity: 'high',
      description: 'Tentativa de Command Injection detectada'
    },
    {
      name: 'Suspicious User Agent',
      pattern: /bot|crawler|spider|scraper|curl|wget/i,
      severity: 'low',
      description: 'User-Agent suspeito detectado'
    }
  ];

  constructor(private readonly configService: ConfigService) {}

  /**
   * Analisa uma requisição em busca de padrões suspeitos
   */
  analyzeRequest(req: any): SecurityEvent | null {
    const clientIP = this.getClientIP(req);
    const userAgent = req.headers['user-agent'] || '';
    const url = req.url;
    const method = req.method;
    const body = req.body ? JSON.stringify(req.body) : '';
    
    // Verificar padrões de ataque
    for (const attackPattern of this.attackPatterns) {
      if (attackPattern.pattern.test(url) || 
          attackPattern.pattern.test(body) || 
          attackPattern.pattern.test(userAgent)) {
        
        const event: SecurityEvent = {
          id: this.generateEventId(),
          type: 'attack_detected',
          severity: attackPattern.severity,
          clientIP,
          userAgent,
          url,
          method,
          timestamp: new Date(),
          details: {
            pattern: attackPattern.name,
            description: attackPattern.description,
            matchedContent: this.extractMatchedContent(url, body, userAgent, attackPattern.pattern)
          },
          blocked: this.shouldBlock(attackPattern.severity)
        };

        this.recordEvent(event);
        return event;
      }
    }

    // Verificar outras atividades suspeitas
    if (this.isSuspiciousActivity(req)) {
      const event: SecurityEvent = {
        id: this.generateEventId(),
        type: 'suspicious_request',
        severity: 'medium',
        clientIP,
        userAgent,
        url,
        method,
        timestamp: new Date(),
        details: {
          reason: 'Atividade suspeita detectada',
          headers: this.sanitizeHeaders(req.headers)
        },
        blocked: false
      };

      this.recordEvent(event);
      return event;
    }

    return null;
  }

  /**
   * Registra um evento de segurança
   */
  recordEvent(event: SecurityEvent): void {
    this.events.push(event);
    
    // Manter apenas os eventos mais recentes
    if (this.events.length > this.maxEvents) {
      this.events.splice(0, this.events.length - this.maxEvents);
    }

    // Log do evento
    this.logSecurityEvent(event);
    
    // Em produção, enviar para sistema de monitoramento externo
    if (this.configService.get('NODE_ENV') === 'production') {
      this.sendToExternalMonitoring(event);
    }
  }

  /**
   * Obtém estatísticas de segurança
   */
  getSecurityStats(): {
    totalEvents: number;
    eventsByType: Record<string, number>;
    eventsBySeverity: Record<string, number>;
    recentEvents: SecurityEvent[];
    topAttackers: Array<{ ip: string; count: number }>;
  } {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const recentEvents = this.events.filter(e => e.timestamp > last24Hours);
    
    const eventsByType = recentEvents.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const eventsBySeverity = recentEvents.reduce((acc, event) => {
      acc[event.severity] = (acc[event.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topAttackers = recentEvents
      .reduce((acc, event) => {
        acc[event.clientIP] = (acc[event.clientIP] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
      .entries()
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalEvents: this.events.length,
      eventsByType,
      eventsBySeverity,
      recentEvents: recentEvents.slice(-10),
      topAttackers
    };
  }

  /**
   * Verifica se uma requisição deve ser bloqueada
   */
  shouldBlock(severity: string): boolean {
    const securityLevel = this.configService.get('SECURITY_LEVEL', 'medium');
    
    switch (securityLevel) {
      case 'low':
        return severity === 'critical';
      case 'medium':
        return ['high', 'critical'].includes(severity);
      case 'high':
        return ['medium', 'high', 'critical'].includes(severity);
      default:
        return ['medium', 'high', 'critical'].includes(severity);
    }
  }

  private isSuspiciousActivity(req: any): boolean {
    const url = req.url.toLowerCase();
    const userAgent = (req.headers['user-agent'] || '').toLowerCase();
    
    // Muitas requisições em sequência
    const clientIP = this.getClientIP(req);
    const recentRequests = this.events.filter(e => 
      e.clientIP === clientIP && 
      e.timestamp > new Date(Date.now() - 60000) // Último minuto
    );
    
    if (recentRequests.length > 50) {
      return true;
    }

    // URLs suspeitas
    const suspiciousUrls = [
      '/admin', '/wp-admin', '/phpmyadmin', '/.env', '/config',
      '/backup', '/test', '/debug', '/api/v1/admin'
    ];
    
    if (suspiciousUrls.some(suspicious => url.includes(suspicious))) {
      return true;
    }

    // User-Agent vazio ou muito curto
    if (!userAgent || userAgent.length < 10) {
      return true;
    }

    return false;
  }

  private extractMatchedContent(url: string, body: string, userAgent: string, pattern: RegExp): string {
    const content = `${url} ${body} ${userAgent}`;
    const match = content.match(pattern);
    return match ? match[0] : '';
  }

  private sanitizeHeaders(headers: any): Record<string, string> {
    const sanitized: Record<string, string> = {};
    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
    
    Object.entries(headers).forEach(([key, value]) => {
      if (sensitiveHeaders.includes(key.toLowerCase())) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = String(value);
      }
    });
    
    return sanitized;
  }

  private getClientIP(req: any): string {
    return (
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      'unknown'
    );
  }

  private generateEventId(): string {
    return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private logSecurityEvent(event: SecurityEvent): void {
    const logMessage = `Security Event [${event.severity.toUpperCase()}]: ${event.type} from ${event.clientIP} - ${event.details.pattern || event.details.reason}`;
    
    switch (event.severity) {
      case 'critical':
      case 'high':
        this.logger.error(logMessage, event.details);
        break;
      case 'medium':
        this.logger.warn(logMessage, event.details);
        break;
      case 'low':
        this.logger.log(logMessage);
        break;
    }
  }

  private sendToExternalMonitoring(event: SecurityEvent): void {
    // Implementar integração com sistemas de monitoramento externos
    // como Sentry, DataDog, New Relic, etc.
    this.logger.debug('Sending security event to external monitoring', { eventId: event.id });
  }
}
