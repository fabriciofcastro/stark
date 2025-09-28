// Design Tokens - Sistema de Cores Avançado 2024
// Baseado em melhores práticas para empresas de tecnologia

export const designTokens = {
  // Cores Primárias - Baseadas em tecnologia e confiança
  primary: {
    50: 'hsl(210, 100%, 98%)',   // Azul muito claro
    100: 'hsl(210, 100%, 95%)',  // Azul claro
    200: 'hsl(210, 100%, 90%)',  // Azul médio claro
    300: 'hsl(210, 100%, 80%)',  // Azul médio
    400: 'hsl(210, 100%, 70%)',  // Azul médio escuro
    500: 'hsl(210, 100%, 60%)',  // Azul principal
    600: 'hsl(210, 100%, 50%)',  // Azul escuro
    700: 'hsl(210, 100%, 40%)',  // Azul muito escuro
    800: 'hsl(210, 100%, 30%)',  // Azul ultra escuro
    900: 'hsl(210, 100%, 20%)',  // Azul preto
  },

  // Cores Secundárias - Dourado para destaque
  secondary: {
    50: 'hsl(45, 100%, 95%)',    // Dourado muito claro
    100: 'hsl(45, 100%, 90%)',   // Dourado claro
    200: 'hsl(45, 100%, 80%)',   // Dourado médio claro
    300: 'hsl(45, 100%, 70%)',   // Dourado médio
    400: 'hsl(45, 100%, 60%)',   // Dourado médio escuro
    500: 'hsl(45, 100%, 50%)',   // Dourado principal
    600: 'hsl(45, 100%, 40%)',   // Dourado escuro
    700: 'hsl(45, 100%, 30%)',   // Dourado muito escuro
    800: 'hsl(45, 100%, 20%)',   // Dourado ultra escuro
    900: 'hsl(45, 100%, 10%)',   // Dourado preto
  },

  // Cores de Apoio - Verde para tecnologia
  accent: {
    50: 'hsl(160, 100%, 95%)',   // Verde muito claro
    100: 'hsl(160, 100%, 90%)',  // Verde claro
    200: 'hsl(160, 100%, 80%)',  // Verde médio claro
    300: 'hsl(160, 100%, 70%)',  // Verde médio
    400: 'hsl(160, 100%, 60%)',  // Verde médio escuro
    500: 'hsl(160, 100%, 50%)',  // Verde principal
    600: 'hsl(160, 100%, 40%)',  // Verde escuro
    700: 'hsl(160, 100%, 30%)',  // Verde muito escuro
    800: 'hsl(160, 100%, 20%)',  // Verde ultra escuro
    900: 'hsl(160, 100%, 10%)',  // Verde preto
  },

  // Cores Neutras - Escala de cinza moderna
  neutral: {
    0: 'hsl(0, 0%, 100%)',       // Branco puro
    50: 'hsl(0, 0%, 98%)',       // Cinza muito claro
    100: 'hsl(0, 0%, 95%)',      // Cinza claro
    200: 'hsl(0, 0%, 90%)',      // Cinza médio claro
    300: 'hsl(0, 0%, 80%)',      // Cinza médio
    400: 'hsl(0, 0%, 70%)',      // Cinza médio escuro
    500: 'hsl(0, 0%, 60%)',      // Cinza médio
    600: 'hsl(0, 0%, 50%)',      // Cinza escuro
    700: 'hsl(0, 0%, 40%)',      // Cinza muito escuro
    800: 'hsl(0, 0%, 30%)',      // Cinza ultra escuro
    900: 'hsl(0, 0%, 20%)',      // Cinza preto
    950: 'hsl(0, 0%, 10%)',      // Preto suave
    1000: 'hsl(0, 0%, 0%)',      // Preto puro
  },

  // Cores Semânticas - Para feedback e estados
  semantic: {
    success: {
      50: 'hsl(120, 100%, 95%)',
      100: 'hsl(120, 100%, 90%)',
      500: 'hsl(120, 100%, 50%)',
      600: 'hsl(120, 100%, 40%)',
      700: 'hsl(120, 100%, 30%)',
    },
    warning: {
      50: 'hsl(45, 100%, 95%)',
      100: 'hsl(45, 100%, 90%)',
      500: 'hsl(45, 100%, 50%)',
      600: 'hsl(45, 100%, 40%)',
      700: 'hsl(45, 100%, 30%)',
    },
    error: {
      50: 'hsl(0, 100%, 95%)',
      100: 'hsl(0, 100%, 90%)',
      500: 'hsl(0, 100%, 50%)',
      600: 'hsl(0, 100%, 40%)',
      700: 'hsl(0, 100%, 30%)',
    },
    info: {
      50: 'hsl(210, 100%, 95%)',
      100: 'hsl(210, 100%, 90%)',
      500: 'hsl(210, 100%, 50%)',
      600: 'hsl(210, 100%, 40%)',
      700: 'hsl(210, 100%, 30%)',
    },
  },

  // Gradientes Modernos
  gradients: {
    primary: 'linear-gradient(135deg, hsl(210, 100%, 60%) 0%, hsl(210, 100%, 40%) 100%)',
    secondary: 'linear-gradient(135deg, hsl(45, 100%, 50%) 0%, hsl(45, 100%, 30%) 100%)',
    accent: 'linear-gradient(135deg, hsl(160, 100%, 50%) 0%, hsl(160, 100%, 30%) 100%)',
    neutral: 'linear-gradient(135deg, hsl(0, 0%, 90%) 0%, hsl(0, 0%, 70%) 100%)',
    dark: 'linear-gradient(135deg, hsl(0, 0%, 20%) 0%, hsl(0, 0%, 10%) 100%)',
    hero: 'linear-gradient(135deg, hsl(210, 100%, 20%) 0%, hsl(210, 100%, 10%) 50%, hsl(45, 100%, 10%) 100%)',
  },

  // Sombras Modernas
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glow: '0 0 20px rgba(59, 130, 246, 0.5)',
    glowSecondary: '0 0 20px rgba(251, 191, 36, 0.5)',
  },

  // Espaçamentos Consistentes
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
  },

  // Tipografia
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
  },

  // Bordas e Raios
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Animações
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
} as const;

// Tipos TypeScript para os tokens
export type DesignTokens = typeof designTokens;
export type ColorScale = keyof typeof designTokens.primary;
export type SemanticColor = keyof typeof designTokens.semantic;
