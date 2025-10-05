export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  phone?: boolean;
  custom?: (value: any) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateField = (value: any, rules: ValidationRule): string | null => {
  // Required validation
  if (rules.required && (!value || value.toString().trim() === '')) {
    return 'Este campo é obrigatório';
  }

  // Skip other validations if value is empty and not required
  if (!value || value.toString().trim() === '') {
    return null;
  }

  const stringValue = value.toString().trim();

  // Min length validation
  if (rules.minLength && stringValue.length < rules.minLength) {
    return `Mínimo de ${rules.minLength} caracteres`;
  }

  // Max length validation
  if (rules.maxLength && stringValue.length > rules.maxLength) {
    return `Máximo de ${rules.maxLength} caracteres`;
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    return 'Formato inválido';
  }

  // Email validation
  if (rules.email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(stringValue)) {
      return 'Email inválido';
    }
  }

  // Phone validation
  if (rules.phone) {
    const phonePattern = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!phonePattern.test(stringValue)) {
      return 'Telefone inválido (formato: (11) 99999-9999)';
    }
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      return customError;
    }
  }

  return null;
};

export const validateForm = (data: any, schema: ValidationSchema): ValidationResult => {
  const errors: { [key: string]: string } = {};

  Object.keys(schema).forEach(field => {
    const value = data[field];
    const rules = schema[field];
    const error = validateField(value, rules);
    
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Common validation schemas
export const candidateValidationSchema: ValidationSchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
    custom: (value) => {
      if (value && value.trim().split(' ').length < 2) {
        return 'Digite o nome completo';
      }
      return null;
    }
  },
  email: {
    required: true,
    email: true,
    maxLength: 255
  },
  phone: {
    required: true,
    phone: true
  },
  linkedin: {
    required: false,
    pattern: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
    custom: (value) => {
      if (value && !value.includes('linkedin.com/in/')) {
        return 'URL do LinkedIn inválida';
      }
      return null;
    }
  },
  experience: {
    required: true,
    minLength: 10,
    maxLength: 500
  },
  skills: {
    required: true,
    custom: (value) => {
      if (!value || value.length < 1) {
        return 'Selecione pelo menos uma habilidade';
      }
      return null;
    }
  },
  preferredDepartments: {
    required: true,
    custom: (value) => {
      if (!value || value.length < 1) {
        return 'Selecione pelo menos um departamento de interesse';
      }
      return null;
    }
  },
  coverLetter: {
    required: false,
    maxLength: 1000
  }
};

export const loginValidationSchema: ValidationSchema = {
  email: {
    required: true,
    email: true
  }
};

// Contact form validation
export const contactValidationSchema: ValidationSchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  email: {
    required: true,
    email: true
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
};

export const validateContactForm = (data: any) => {
  return validateForm(data, contactValidationSchema);
};

// Security functions
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

export const detectAttackPatterns = (input: string): boolean => {
  const attackPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /union\s+select/i,
    /drop\s+table/i,
    /delete\s+from/i,
    /insert\s+into/i,
    /update\s+set/i
  ];
  
  return attackPatterns.some(pattern => pattern.test(input));
};

export const checkRateLimit = (ip: string, maxRequests: number, windowMs: number): { allowed: boolean; resetTime: number } => {
  // Implementação básica de rate limiting
  // Em produção, usar Redis ou similar
  return {
    allowed: true,
    resetTime: Date.now() + windowMs
  };
};