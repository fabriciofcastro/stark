/**
 * Sistema de Validação de Dados do Cliente
 * Implementa validação rigorosa no servidor para prevenir ataques
 */

import { z } from 'zod';

// Schemas de validação para diferentes tipos de dados
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  
  email: z.string()
    .email('Email inválido')
    .max(255, 'Email muito longo')
    .toLowerCase(),
  
  phone: z.string()
    .regex(/^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/, 'Telefone inválido')
    .optional(),
  
  company: z.string()
    .max(200, 'Nome da empresa muito longo')
    .optional(),
  
  subject: z.string()
    .min(5, 'Assunto deve ter pelo menos 5 caracteres')
    .max(200, 'Assunto muito longo'),
  
  message: z.string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(2000, 'Mensagem muito longa')
    .refine((msg) => {
      // Verificar se não contém conteúdo suspeito
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /eval\s*\(/i,
        /document\./i,
        /window\./i
      ];
      return !suspiciousPatterns.some(pattern => pattern.test(msg));
    }, 'Mensagem contém conteúdo suspeito'),
  
  recaptchaToken: z.string()
    .min(1, 'Token reCAPTCHA obrigatório'),
  
  source: z.string()
    .max(100, 'Fonte muito longa')
    .optional(),
  
  utm_source: z.string()
    .max(100, 'UTM source muito longa')
    .optional(),
  
  utm_medium: z.string()
    .max(100, 'UTM medium muito longa')
    .optional(),
  
  utm_campaign: z.string()
    .max(100, 'UTM campaign muito longa')
    .optional()
});

export const chatMessageSchema = z.object({
  message: z.string()
    .min(1, 'Mensagem não pode estar vazia')
    .max(1000, 'Mensagem muito longa')
    .refine((msg) => {
      // Verificar se não contém conteúdo suspeito
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /eval\s*\(/i,
        /document\./i,
        /window\./i,
        /alert\s*\(/i,
        /confirm\s*\(/i,
        /prompt\s*\(/i
      ];
      return !suspiciousPatterns.some(pattern => pattern.test(msg));
    }, 'Mensagem contém conteúdo suspeito'),
  
  sessionId: z.string()
    .uuid('ID de sessão inválido')
    .optional(),
  
  userId: z.string()
    .min(1, 'ID do usuário obrigatório')
    .max(100, 'ID do usuário muito longo')
    .optional(),
  
  context: z.object({
    page: z.string().max(200).optional(),
    referrer: z.string().max(500).optional(),
    userAgent: z.string().max(500).optional(),
    ip: z.string().optional()
  }).optional()
});

export const userDataSchema = z.object({
  id: z.string()
    .min(1, 'ID obrigatório')
    .max(100, 'ID muito longo'),
  
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  
  email: z.string()
    .email('Email inválido')
    .max(255, 'Email muito longo')
    .toLowerCase(),
  
  role: z.enum(['user', 'admin', 'moderator'])
    .default('user'),
  
  permissions: z.array(z.string())
    .max(50, 'Muitas permissões')
    .optional(),
  
  metadata: z.record(z.string(), z.any())
    .optional()
});

// Funções de validação
export function validateContactForm(data: unknown) {
  try {
    return {
      success: true,
      data: contactFormSchema.parse(data),
      errors: null
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }))
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ field: 'unknown', message: 'Erro de validação desconhecido', code: 'unknown' }]
    };
  }
}

export function validateChatMessage(data: unknown) {
  try {
    return {
      success: true,
      data: chatMessageSchema.parse(data),
      errors: null
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }))
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ field: 'unknown', message: 'Erro de validação desconhecido', code: 'unknown' }]
    };
  }
}

export function validateUserData(data: unknown) {
  try {
    return {
      success: true,
      data: userDataSchema.parse(data),
      errors: null
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }))
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ field: 'unknown', message: 'Erro de validação desconhecido', code: 'unknown' }]
    };
  }
}

// Função para sanitizar dados
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove caracteres perigosos
    .replace(/\s+/g, ' ') // Normaliza espaços
    .substring(0, 2000); // Limita tamanho
}

// Função para detectar tentativas de ataque
export function detectAttackPatterns(input: string): {
  isAttack: boolean;
  patterns: string[];
  riskLevel: 'low' | 'medium' | 'high';
} {
  const attackPatterns = [
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

  const detectedPatterns: string[] = [];
  let maxRisk: 'low' | 'medium' | 'high' = 'low';

  for (const { pattern, name, risk } of attackPatterns) {
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

// Rate limiting por IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  ip: string, 
  maxRequests: number = 10, 
  windowMs: number = 15 * 60 * 1000 // 15 minutos
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = `rate_limit_${ip}`;
  
  const current = rateLimitMap.get(key);
  
  if (!current || now > current.resetTime) {
    // Reset ou primeira requisição
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
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

// Limpeza periódica do rate limiting
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000); // Limpa a cada 5 minutos
