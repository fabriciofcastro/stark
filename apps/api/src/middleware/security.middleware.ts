/**
 * Security Middleware
 * Middleware de segurança para produção
 */

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { createSecurityConfig, SecurityConfig } from '../config/security.config';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  private readonly logger = new Logger(SecurityMiddleware.name);
  private readonly securityConfig: SecurityConfig;

  constructor(private readonly configService: ConfigService) {
    this.securityConfig = createSecurityConfig(configService);
  }

  use(req: Request, res: Response, next: NextFunction): void {
    // Rate Limiting por IP
    this.applyRateLimit(req, res);
    
    // Security Headers
    this.applySecurityHeaders(req, res);
    
    // Request Validation
    this.validateRequest(req, res);
    
    // Logging de segurança
    this.logSecurityEvent(req);
    
    next();
  }

  private applyRateLimit(req: Request, res: Response): void {
    // Implementação básica de rate limiting
    // Em produção, usar Redis ou similar
    const clientIP = this.getClientIP(req);
    const key = `rate_limit_${clientIP}`;
    
    // Verificar se excedeu o limite
    // Esta é uma implementação simplificada
    // Em produção, usar uma solução mais robusta
  }

  private applySecurityHeaders(req: Request, res: Response): void {
    // Aplicar headers de segurança
    Object.entries(this.securityConfig.securityHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Content Security Policy
    if (this.securityConfig.helmetCSP) {
      const csp = this.buildCSP();
      res.setHeader('Content-Security-Policy', csp);
    }

    // CORS Headers
    const origin = req.headers.origin;
    if (origin && this.securityConfig.corsOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
  }

  private validateRequest(req: Request, res: Response): void {
    // Validar tamanho da requisição
    const contentLength = parseInt(req.headers['content-length'] || '0');
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (contentLength > maxSize) {
      this.logger.warn(`Request too large: ${contentLength} bytes from ${this.getClientIP(req)}`);
      res.status(413).json({ error: 'Request too large' });
      return;
    }

    // Validar User-Agent
    const userAgent = req.headers['user-agent'];
    if (!userAgent || userAgent.length < 10) {
      this.logger.warn(`Suspicious User-Agent: ${userAgent} from ${this.getClientIP(req)}`);
      res.status(400).json({ error: 'Invalid User-Agent' });
      return;
    }

    // Validar Content-Type para POST/PUT
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const contentType = req.headers['content-type'];
      if (!contentType || !contentType.includes('application/json')) {
        this.logger.warn(`Invalid Content-Type: ${contentType} from ${this.getClientIP(req)}`);
        res.status(400).json({ error: 'Invalid Content-Type' });
        return;
      }
    }
  }

  private buildCSP(): string {
    const directives = Object.entries(this.securityConfig.cspDirectives)
      .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
      .join('; ');
    
    return directives;
  }

  private getClientIP(req: Request): string {
    return (
      req.headers['x-forwarded-for'] as string ||
      req.headers['x-real-ip'] as string ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      'unknown'
    );
  }

  private logSecurityEvent(req: Request): void {
    const clientIP = this.getClientIP(req);
    const userAgent = req.headers['user-agent'];
    const method = req.method;
    const url = req.url;
    
    // Log apenas eventos suspeitos em produção
    if (this.securityConfig.logLevel === 'debug' || this.isSuspiciousRequest(req)) {
      this.logger.log(`Security Event: ${method} ${url} from ${clientIP} - ${userAgent}`);
    }
  }

  private isSuspiciousRequest(req: Request): boolean {
    const url = req.url.toLowerCase();
    const userAgent = (req.headers['user-agent'] || '').toLowerCase();
    
    // Padrões suspeitos
    const suspiciousPatterns = [
      'admin', 'login', 'password', 'sql', 'script', 'eval',
      'union', 'select', 'drop', 'insert', 'update', 'delete',
      'javascript:', 'vbscript:', 'onload', 'onerror'
    ];
    
    return suspiciousPatterns.some(pattern => 
      url.includes(pattern) || userAgent.includes(pattern)
    );
  }
}
