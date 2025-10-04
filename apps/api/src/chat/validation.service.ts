/**
 * Serviço de Validação de Dados do Cliente - Backend
 * Implementa validação rigorosa no servidor para prevenir ataques
 */

import { Injectable, BadRequestException, Logger } from '@nestjs/common';

@Injectable()
export class ValidationService {
  private readonly logger = new Logger(ValidationService.name);

  // Padrões de ataque para detecção
  private readonly attackPatterns = [
    { pattern: /<script/i, name: 'XSS Script Tag', risk: 'high' as const },
    { pattern: /javascript:/i, name: 'JavaScript Protocol', risk: 'high' as const },
    { pattern: /on\w+\s*=/i, name: 'Event Handler', risk: 'high' as const },
    { pattern: /eval\s*\(/i, name: 'Eval Function', risk: 'high' as const },
    { pattern: /document\./i, name: 'DOM Access', risk: 'medium' as const },
    { pattern: /window\./i, name: 'Window Object', risk: 'medium' as const },
    { pattern: /alert\s*\(/i, name: 'Alert Function', risk: 'low' as const },
    { pattern: /confirm\s*\(/i, name: 'Confirm Function', risk: 'low' as const },
    { pattern: /prompt\s*\(/i, name: 'Prompt Function', risk: 'low' as const },
    { pattern: /union\s+select/i, name: 'SQL Injection', risk: 'high' as const },
    { pattern: /drop\s+table/i, name: 'SQL Drop Table', risk: 'high' as const },
    { pattern: /insert\s+into/i, name: 'SQL Insert', risk: 'medium' as const },
    { pattern: /delete\s+from/i, name: 'SQL Delete', risk: 'high' as const },
    { pattern: /update\s+set/i, name: 'SQL Update', risk: 'high' as const },
    { pattern: /or\s+1\s*=\s*1/i, name: 'SQL Always True', risk: 'high' as const },
    { pattern: /admin/i, name: 'Admin Reference', risk: 'low' as const },
    { pattern: /password/i, name: 'Password Reference', risk: 'low' as const },
    { pattern: /login/i, name: 'Login Reference', risk: 'low' as const }
  ];

  // Rate limiting por IP
  private readonly rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  /**
   * Valida dados de entrada básicos
   */
  validateInput(input: any, fieldName: string, rules: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    type?: 'string' | 'number' | 'email' | 'uuid';
  }): void {
    // Verificar se é obrigatório
    if (rules.required && (!input || input === '')) {
      throw new BadRequestException(`${fieldName} é obrigatório`);
    }

    // Se não é obrigatório e está vazio, pular validações
    if (!rules.required && (!input || input === '')) {
      return;
    }

    // Verificar tipo
    if (rules.type === 'string' && typeof input !== 'string') {
      throw new BadRequestException(`${fieldName} deve ser uma string`);
    }

    if (rules.type === 'number' && typeof input !== 'number') {
      throw new BadRequestException(`${fieldName} deve ser um número`);
    }

    if (rules.type === 'email') {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(input)) {
        throw new BadRequestException(`${fieldName} deve ser um email válido`);
      }
    }

    if (rules.type === 'uuid') {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(input)) {
        throw new BadRequestException(`${fieldName} deve ser um UUID válido`);
      }
    }

    // Verificar comprimento
    if (rules.minLength && input.length < rules.minLength) {
      throw new BadRequestException(`${fieldName} deve ter pelo menos ${rules.minLength} caracteres`);
    }

    if (rules.maxLength && input.length > rules.maxLength) {
      throw new BadRequestException(`${fieldName} deve ter no máximo ${rules.maxLength} caracteres`);
    }

    // Verificar padrão
    if (rules.pattern && !rules.pattern.test(input)) {
      throw new BadRequestException(`${fieldName} tem formato inválido`);
    }
  }

  /**
   * Valida mensagem de chat
   */
  validateChatMessage(message: string): void {
    this.validateInput(message, 'Mensagem', {
      required: true,
      minLength: 1,
      maxLength: 1000,
      type: 'string'
    });

    // Detectar padrões de ataque
    const attackDetection = this.detectAttackPatterns(message);
    if (attackDetection.isAttack) {
      this.logger.warn(`Tentativa de ataque detectada:`, {
        patterns: attackDetection.patterns,
        riskLevel: attackDetection.riskLevel,
        message: message.substring(0, 100)
      });

      if (attackDetection.riskLevel === 'high') {
        throw new BadRequestException('Conteúdo suspeito detectado');
      }
    }
  }

  /**
   * Valida dados de usuário
   */
  validateUserData(userData: any): void {
    this.validateInput(userData.name, 'Nome', {
      required: true,
      minLength: 2,
      maxLength: 100,
      type: 'string',
      pattern: /^[a-zA-ZÀ-ÿ\s]+$/
    });

    this.validateInput(userData.email, 'Email', {
      required: true,
      type: 'email',
      maxLength: 255
    });

    if (userData.phone) {
      this.validateInput(userData.phone, 'Telefone', {
        type: 'string',
        pattern: /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/
      });
    }
  }

  /**
   * Valida dados de sessão de chat
   */
  validateChatSession(sessionData: any): void {
    if (sessionData.userId) {
      this.validateInput(sessionData.userId, 'User ID', {
        required: true,
        minLength: 1,
        maxLength: 100,
        type: 'string'
      });
    }

    if (sessionData.sessionId) {
      this.validateInput(sessionData.sessionId, 'Session ID', {
        type: 'uuid'
      });
    }

    if (sessionData.context) {
      this.validateInput(sessionData.context, 'Contexto', {
        type: 'string',
        maxLength: 1000
      });
    }
  }

  /**
   * Detecta padrões de ataque em texto
   */
  detectAttackPatterns(input: string): {
    isAttack: boolean;
    patterns: string[];
    riskLevel: 'low' | 'medium' | 'high';
  } {
    const detectedPatterns: string[] = [];
    let maxRisk: 'low' | 'medium' | 'high' = 'low';

    for (const { pattern, name, risk } of this.attackPatterns) {
      if (pattern.test(input)) {
        detectedPatterns.push(name);
        if (risk === 'high' || (risk === 'medium' && maxRisk === 'low')) {
          maxRisk = risk;
        }
      }
    }

    return {
      isAttack: detectedPatterns.length > 0,
      patterns: detectedPatterns,
      riskLevel: maxRisk
    };
  }

  /**
   * Sanitiza entrada de dados
   */
  sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove caracteres perigosos
      .replace(/\s+/g, ' ') // Normaliza espaços
      .substring(0, 2000); // Limita tamanho
  }

  /**
   * Verifica rate limiting por IP
   */
  checkRateLimit(
    ip: string, 
    maxRequests: number = 10, 
    windowMs: number = 15 * 60 * 1000 // 15 minutos
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const key = `rate_limit_${ip}`;
    
    const current = this.rateLimitMap.get(key);
    
    if (!current || now > current.resetTime) {
      // Reset ou primeira requisição
      this.rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
    }
    
    if (current.count >= maxRequests) {
      return { allowed: false, remaining: 0, resetTime: current.resetTime };
    }
    
    current.count++;
    return { 
      allowed: true, 
      remaining: maxRequests - current.count, 
      resetTime: current.resetTime 
    };
  }

  /**
   * Limpa dados de rate limiting expirados
   */
  cleanupRateLimit(): void {
    const now = Date.now();
    for (const [key, value] of this.rateLimitMap.entries()) {
      if (now > value.resetTime) {
        this.rateLimitMap.delete(key);
      }
    }
  }

  /**
   * Valida configuração do sistema
   */
  validateSystemConfig(key: string, value: any): void {
    // Lista de chaves permitidas (já implementada no chat.service.ts)
    const allowedKeys = [
      'ai_model',
      'ai_temperature',
      'ai_max_tokens',
      'ai_system_prompt',
      'chat_timeout',
      'escalation_threshold',
      'notification_enabled',
      'analytics_enabled',
      'rate_limit_requests',
      'rate_limit_window',
      'security_level',
      'log_level'
    ];

    if (!allowedKeys.includes(key)) {
      throw new BadRequestException(`Chave de configuração '${key}' não é permitida`);
    }

    // Validações específicas por tipo
    switch (key) {
      case 'ai_temperature':
        if (typeof value !== 'number' || value < 0 || value > 2) {
          throw new BadRequestException('Temperatura deve ser um número entre 0 e 2');
        }
        break;
      
      case 'ai_max_tokens':
        if (typeof value !== 'number' || value < 1 || value > 4000) {
          throw new BadRequestException('Max tokens deve ser um número entre 1 e 4000');
        }
        break;
      
      case 'chat_timeout':
        if (typeof value !== 'number' || value < 1000 || value > 300000) {
          throw new BadRequestException('Timeout deve ser um número entre 1000 e 300000 ms');
        }
        break;
      
      case 'escalation_threshold':
        if (typeof value !== 'number' || value < 1 || value > 100) {
          throw new BadRequestException('Threshold de escalação deve ser um número entre 1 e 100');
        }
        break;
      
      case 'notification_enabled':
      case 'analytics_enabled':
        if (typeof value !== 'boolean') {
          throw new BadRequestException(`${key} deve ser um booleano`);
        }
        break;
      
      case 'rate_limit_requests':
        if (typeof value !== 'number' || value < 1 || value > 1000) {
          throw new BadRequestException('Rate limit requests deve ser um número entre 1 e 1000');
        }
        break;
      
      case 'rate_limit_window':
        if (typeof value !== 'number' || value < 60000 || value > 3600000) {
          throw new BadRequestException('Rate limit window deve ser um número entre 60000 e 3600000 ms');
        }
        break;
      
      case 'security_level':
        if (!['low', 'medium', 'high'].includes(value)) {
          throw new BadRequestException('Security level deve ser low, medium ou high');
        }
        break;
      
      case 'log_level':
        if (!['error', 'warn', 'info', 'debug'].includes(value)) {
          throw new BadRequestException('Log level deve ser error, warn, info ou debug');
        }
        break;
      
      default:
        // Para strings genéricas
        if (typeof value === 'string' && value.length > 1000) {
          throw new BadRequestException(`${key} não pode ter mais de 1000 caracteres`);
        }
        break;
    }
  }
}
