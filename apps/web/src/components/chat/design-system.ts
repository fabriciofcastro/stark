/**
 * Design System Profissional para Chat Inteligente
 * 
 * Este arquivo define todas as constantes de design, tipografia, cores e espaçamentos
 * para garantir consistência e profissionalismo em todo o sistema de chat.
 */

// ===== CORES PROFISSIONAIS =====
export const CHAT_COLORS = {
  // Cores primárias - baseadas no tema STARK
  primary: {
    50: '#fefdf8',
    100: '#fdf9e8',
    200: '#faf1c7',
    300: '#f6e7a1',
    400: '#f0d971',
    500: '#e9c949', // Cor principal dourada
    600: '#d4a017', // Dourado STARK
    700: '#b8860b',
    800: '#9c6b08',
    900: '#7d5206',
  },
  
  // Cores neutras para interface
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Cores de estado
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
} as const;

// ===== TIPOGRAFIA PROFISSIONAL =====
export const CHAT_TYPOGRAPHY = {
  // Famílias de fonte
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    display: ['Inter', 'system-ui', 'sans-serif'],
  },
  
  // Tamanhos de fonte otimizados para legibilidade
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px - Texto auxiliar
    base: '1rem',     // 16px - Texto padrão
    lg: '1.125rem',   // 18px - Texto importante
    xl: '1.25rem',    // 20px - Títulos pequenos
    '2xl': '1.5rem',  // 24px - Títulos médios
    '3xl': '1.875rem', // 30px - Títulos grandes
    '4xl': '2.25rem', // 36px - Títulos principais
  },
  
  // Pesos de fonte
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Alturas de linha otimizadas para leitura
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

// ===== ESPAÇAMENTOS E DIMENSÕES =====
export const CHAT_SPACING = {
  // Espaçamentos em rem
  space: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
  },
  
  // Tamanhos de componentes
  sizes: {
    chat: {
      width: {
        sm: '320px',
        md: '380px',
        lg: '420px',
        xl: '480px',
      },
      height: {
        sm: '500px',
        md: '600px',
        lg: '700px',
        xl: '800px',
      },
    },
    
    avatar: {
      sm: '32px',
      md: '40px',
      lg: '48px',
      xl: '56px',
    },
    
    button: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
  },
} as const;

// ===== BORDAS E SOMBRAS =====
export const CHAT_EFFECTS = {
  // Raios de borda
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  // Sombras profissionais
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glow: '0 0 20px rgb(212 160 23 / 0.3)',
  },
  
  // Animações suaves
  transition: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
} as const;

// ===== BREAKPOINTS RESPONSIVOS =====
export const CHAT_BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ===== TEMAS DE CHAT =====
export const CHAT_THEMES = {
  light: {
    background: CHAT_COLORS.neutral[50],
    surface: CHAT_COLORS.neutral[100],
    text: CHAT_COLORS.neutral[900],
    textSecondary: CHAT_COLORS.neutral[600],
    border: CHAT_COLORS.neutral[200],
    accent: CHAT_COLORS.primary[600],
  },
  
  dark: {
    background: CHAT_COLORS.neutral[950],
    surface: CHAT_COLORS.neutral[900],
    text: CHAT_COLORS.neutral[50],
    textSecondary: CHAT_COLORS.neutral[400],
    border: CHAT_COLORS.neutral[800],
    accent: CHAT_COLORS.primary[500],
  },
  
  stark: {
    background: 'linear-gradient(135deg, #0c1916 0%, #1a1a1a 100%)',
    surface: 'rgba(26, 26, 26, 0.95)',
    text: '#ffffff',
    textSecondary: '#a3a3a3',
    border: 'rgba(212, 160, 23, 0.2)',
    accent: CHAT_COLORS.primary[600],
  },
} as const;

// ===== CONFIGURAÇÕES DE CHAT =====
export const CHAT_CONFIG = {
  // Limites de mensagens
  limits: {
    maxMessagesPerPage: 50,
    maxMessageLength: 2000,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
  
  // Timeouts
  timeouts: {
    typingIndicator: 1000,
    messageDelivery: 5000,
    connectionRetry: 3000,
  },
  
  // Animações
  animations: {
    messageSlideIn: 'slideInUp 0.3s ease-out',
    typingDots: 'typing 1.4s infinite ease-in-out',
    fadeIn: 'fadeIn 0.2s ease-out',
  },
} as const;

// ===== CONFIGURAÇÕES DE ACESSIBILIDADE =====
export const CHAT_ACCESSIBILITY = {
  // Contraste mínimo WCAG AA
  contrast: {
    normal: 4.5,
    large: 3,
  },
  
  // Foco visível
  focus: {
    ring: '2px solid rgb(212 160 23)',
    offset: '2px',
  },
  
  // Z-index layers
  zIndex: {
    chat: 1000,
    overlay: 1050,
    modal: 1100,
    toast: 1200,
  },
} as const;

// ===== TIPOS TYPESCRIPT =====
export type ChatTheme = keyof typeof CHAT_THEMES;
export type ChatSize = keyof typeof CHAT_SPACING.sizes.chat.width;
export type ChatColor = keyof typeof CHAT_COLORS;