/**
 * Sistema de Validação de Respostas
 * Implementa validação de schema nas respostas para garantir consistência
 */

import { z } from 'zod';

// Schemas de validação para diferentes tipos de respostas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  timestamp: z.string().optional(),
  code: z.string().optional(),
  details: z.record(z.string(), z.any()).optional()
});

export const chatResponseSchema = z.object({
  success: z.boolean(),
  message: z.object({
    id: z.string(),
    content: z.string(),
    type: z.enum(['text', 'image', 'file', 'system']),
    timestamp: z.string(),
    sender: z.object({
      id: z.string(),
      name: z.string(),
      type: z.enum(['user', 'bot', 'human'])
    }),
    metadata: z.record(z.string(), z.any()).optional(),
    status: z.enum(['sent', 'delivered', 'read', 'failed']).optional()
  }).optional(),
  session: z.object({
    id: z.string(),
    status: z.enum(['active', 'paused', 'closed', 'escalated']),
    userId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
  }).optional(),
  error: z.string().optional(),
  timestamp: z.string()
});

export const contactFormResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    id: z.string().optional(),
    status: z.enum(['pending', 'processing', 'completed', 'failed']),
    estimatedResponseTime: z.string().optional()
  }).optional(),
  error: z.string().optional(),
  timestamp: z.string()
});

export const userDataResponseSchema = z.object({
  success: z.boolean(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['user', 'admin', 'moderator']),
    permissions: z.array(z.string()).optional(),
    metadata: z.record(z.string(), z.any()).optional(),
    createdAt: z.string(),
    updatedAt: z.string()
  }).optional(),
  error: z.string().optional(),
  timestamp: z.string()
});

export const analyticsResponseSchema = z.object({
  success: z.boolean(),
  analytics: z.object({
    totalMessages: z.number(),
    activeSessions: z.number(),
    responseTime: z.number(),
    satisfaction: z.number().optional(),
    metrics: z.record(z.string(), z.any()).optional()
  }).optional(),
  error: z.string().optional(),
  timestamp: z.string()
});

// Funções de validação
export function validateApiResponse(data: unknown) {
  try {
    return {
      success: true,
      data: apiResponseSchema.parse(data),
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

export function validateChatResponse(data: unknown) {
  try {
    return {
      success: true,
      data: chatResponseSchema.parse(data),
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

export function validateContactFormResponse(data: unknown) {
  try {
    return {
      success: true,
      data: contactFormResponseSchema.parse(data),
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

export function validateUserDataResponse(data: unknown) {
  try {
    return {
      success: true,
      data: userDataResponseSchema.parse(data),
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

export function validateAnalyticsResponse(data: unknown) {
  try {
    return {
      success: true,
      data: analyticsResponseSchema.parse(data),
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

// Função para criar respostas padronizadas
export function createStandardResponse(
  success: boolean,
  data?: any,
  error?: string,
  message?: string,
  code?: string,
  details?: Record<string, any>
) {
  const response = {
    success,
    timestamp: new Date().toISOString(),
    ...(data && { data }),
    ...(error && { error }),
    ...(message && { message }),
    ...(code && { code }),
    ...(details && { details })
  };

  // Validar a resposta antes de retornar
  const validation = validateApiResponse(response);
  if (!validation.success) {
    console.error('Resposta inválida gerada:', validation.errors);
    // Retornar resposta de erro padrão
    return {
      success: false,
      error: 'Erro interno de validação',
      timestamp: new Date().toISOString()
    };
  }

  return response;
}

// Função para validar e sanitizar dados antes de enviar
export function sanitizeResponseData(data: any): any {
  if (typeof data === 'string') {
    return data
      .replace(/[<>]/g, '') // Remove caracteres perigosos
      .substring(0, 10000); // Limita tamanho
  }

  if (Array.isArray(data)) {
    return data.map(item => sanitizeResponseData(item));
  }

  if (data && typeof data === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      // Limitar profundidade de objetos aninhados
      if (key.length > 100) continue;
      sanitized[key] = sanitizeResponseData(value);
    }
    return sanitized;
  }

  return data;
}

// Middleware para validação automática de respostas
export function withResponseValidation<T extends (...args: any[]) => any>(
  fn: T,
  schema: z.ZodSchema
): T {
  return ((...args: any[]) => {
    const result = fn(...args);
    
    // Se for uma Promise, validar quando resolver
    if (result instanceof Promise) {
      return result.then((data) => {
        const validation = schema.safeParse(data);
        if (!validation.success) {
          console.error('Resposta de API inválida:', validation.error);
          return createStandardResponse(false, null, 'Resposta inválida');
        }
        return data;
      });
    }
    
    // Se não for Promise, validar imediatamente
    const validation = schema.safeParse(result);
    if (!validation.success) {
      console.error('Resposta de API inválida:', validation.error);
      return createStandardResponse(false, null, 'Resposta inválida');
    }
    
    return result;
  }) as T;
}
