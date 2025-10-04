/**
 * Security Configuration for Production
 * Configurações de segurança para ambiente de produção
 */

import { ConfigService } from '@nestjs/config';

export interface SecurityConfig {
  // Rate Limiting
  rateLimitRequests: number;
  rateLimitWindow: number;
  
  // CORS
  corsOrigins: string[];
  corsCredentials: boolean;
  
  // Helmet
  helmetEnabled: boolean;
  helmetCSP: boolean;
  
  // JWT
  jwtSecret: string;
  jwtExpiresIn: string;
  
  // Database
  databaseUrl: string;
  databaseSSL: boolean;
  
  // Redis
  redisUrl?: string;
  redisPassword?: string;
  
  // Logging
  logLevel: string;
  logSensitiveData: boolean;
  
  // Security Headers
  securityHeaders: {
    'X-Content-Type-Options': string;
    'X-Frame-Options': string;
    'X-XSS-Protection': string;
    'Referrer-Policy': string;
    'Permissions-Policy': string;
  };
  
  // Content Security Policy
  cspDirectives: {
    'default-src': string[];
    'script-src': string[];
    'style-src': string[];
    'img-src': string[];
    'connect-src': string[];
    'font-src': string[];
    'object-src': string[];
    'media-src': string[];
    'frame-src': string[];
  };
}

export const createSecurityConfig = (configService: ConfigService): SecurityConfig => {
  const isProduction = configService.get('NODE_ENV') === 'production';
  const isDevelopment = configService.get('NODE_ENV') === 'development';
  
  return {
    // Rate Limiting
    rateLimitRequests: parseInt(configService.get('RATE_LIMIT_REQUESTS', '100')),
    rateLimitWindow: parseInt(configService.get('RATE_LIMIT_WINDOW', '900000')), // 15 minutos
    
    // CORS
    corsOrigins: isProduction 
      ? [configService.get('FRONTEND_URL', 'https://starksolutions.com.br')]
      : ['http://localhost:3000', 'http://localhost:3001'],
    corsCredentials: true,
    
    // Helmet
    helmetEnabled: true,
    helmetCSP: isProduction,
    
    // JWT
    jwtSecret: configService.get('JWT_SECRET', ''),
    jwtExpiresIn: configService.get('JWT_EXPIRES_IN', '24h'),
    
    // Database
    databaseUrl: configService.get('DATABASE_URL', ''),
    databaseSSL: isProduction,
    
    // Redis
    redisUrl: configService.get('REDIS_URL'),
    redisPassword: configService.get('REDIS_PASSWORD'),
    
    // Logging
    logLevel: configService.get('LOG_LEVEL', isProduction ? 'warn' : 'debug'),
    logSensitiveData: isDevelopment,
    
    // Security Headers
    securityHeaders: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    },
    
    // Content Security Policy
    cspDirectives: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'", // Necessário para alguns frameworks
        'https://www.google.com',
        'https://www.gstatic.com',
        'https://www.googletagmanager.com',
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'https://fonts.googleapis.com',
      ],
      'img-src': [
        "'self'",
        'data:',
        'https:',
        'blob:',
      ],
      'connect-src': [
        "'self'",
        'https://api.starksolutions.com.br',
        'https://app.chatwoot.com',
        'https://www.google-analytics.com',
      ],
      'font-src': [
        "'self'",
        'https://fonts.gstatic.com',
      ],
      'object-src': ["'none'"],
      'media-src': ["'self'"],
      'frame-src': [
        "'self'",
        'https://www.google.com',
      ],
    },
  };
};

// Configurações específicas para Render.com
export const renderSecurityConfig = {
  // Configurações de produção otimizadas para Render
  production: {
    rateLimitRequests: 50, // Mais restritivo em produção
    rateLimitWindow: 600000, // 10 minutos
    logLevel: 'warn',
    databaseSSL: true,
    helmetCSP: true,
  },
  
  // Configurações de desenvolvimento
  development: {
    rateLimitRequests: 1000,
    rateLimitWindow: 60000, // 1 minuto
    logLevel: 'debug',
    databaseSSL: false,
    helmetCSP: false,
  },
};
