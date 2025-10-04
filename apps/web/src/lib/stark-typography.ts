// STARK Solutions - Tipografia inspirada no Stark Industries (Iron Man)

export const STARK_TYPOGRAPHY = {
  // Fonte principal - estilo Stark Industries
  fontFamily: {
    primary: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    monospace: '"JetBrains Mono", "Fira Code", "SF Mono", Monaco, Consolas, monospace',
    display: '"Orbitron", "Exo 2", "Rajdhani", sans-serif', // Para títulos futuristas
  },

  // Cores inspiradas no tema Stark
  colors: {
    primary: {
      light: "#00d4ff", // Azul ciano brilhante
      main: "#0099cc", // Azul principal
      dark: "#006699", // Azul escuro
      glow: "rgba(0, 212, 255, 0.3)", // Brilho
    },
    accent: {
      gold: "#ffd700", // Dourado Stark
      silver: "#c0c0c0", // Prata
      white: "#ffffff", // Branco puro
      black: "#000000", // Preto
    },
    tech: {
      cyan: "#00ffff", // Ciano tecnológico
      purple: "#8b5cf6", // Roxo futurista
      green: "#00ff88", // Verde matrix
      red: "#ff3366", // Vermelho alerta
    }
  },

  // Efeitos visuais
  effects: {
    glow: {
      primary: "0 0 20px rgba(0, 212, 255, 0.5)",
      secondary: "0 0 15px rgba(255, 215, 0, 0.4)",
      tech: "0 0 25px rgba(139, 92, 246, 0.6)",
    },
    shadow: {
      stark: "0 4px 20px rgba(0, 0, 0, 0.3)",
      deep: "0 8px 32px rgba(0, 0, 0, 0.4)",
    },
    gradient: {
      primary: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
      tech: "linear-gradient(135deg, #8b5cf6 0%, #00ffff 100%)",
      gold: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
    }
  },

  // Animações
  animations: {
    pulse: "pulse 2s infinite",
    glow: "glow 3s ease-in-out infinite alternate",
    float: "float 6s ease-in-out infinite",
    matrix: "matrix 10s linear infinite",
  }
};

// Classes CSS para tipografia Stark
export const STARK_CLASSES = {
  // Títulos principais
  h1: "font-display font-black text-6xl md:text-8xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl",
  h2: "font-display font-bold text-4xl md:text-6xl bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent",
  h3: "font-display font-semibold text-2xl md:text-4xl text-cyan-200",
  
  // Texto corporativo
  body: "font-primary text-base md:text-lg text-gray-200 leading-relaxed",
  caption: "font-primary text-sm text-gray-400",
  
  // Elementos tecnológicos
  tech: "font-mono text-sm text-cyan-300 bg-black/30 px-2 py-1 rounded border border-cyan-500/30",
  code: "font-mono text-xs text-green-400 bg-black/50 px-2 py-1 rounded",
  
  // Botões e CTAs
  button: {
    primary: "font-semibold text-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105",
    secondary: "font-medium text-base bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300",
    ghost: "font-medium text-base text-cyan-300 hover:text-white transition-colors duration-300",
  },
  
  // Efeitos especiais
  glow: {
    primary: "shadow-[0_0_20px_rgba(0,212,255,0.5)]",
    gold: "shadow-[0_0_15px_rgba(255,215,0,0.4)]",
    tech: "shadow-[0_0_25px_rgba(139,92,246,0.6)]",
  },
  
  // Layouts
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-16 md:py-24",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
};

// Função para gerar texto com efeito Stark
export function generateStarkText(text: string, variant: 'title' | 'subtitle' | 'body' = 'body') {
  const variants = {
    title: `font-display font-black text-6xl md:text-8xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl`,
    subtitle: `font-display font-bold text-2xl md:text-4xl text-cyan-200`,
    body: `font-primary text-base md:text-lg text-gray-200 leading-relaxed`
  };

  return variants[variant];
}

// Função para gerar botão com estilo Stark
export function generateStarkButton(text: string, type: 'primary' | 'secondary' | 'ghost' = 'primary') {
  const types = {
    primary: `font-semibold text-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105`,
    secondary: `font-medium text-base bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300`,
    ghost: `font-medium text-base text-cyan-300 hover:text-white transition-colors duration-300`
  };

  return types[type];
}

// Componente de texto animado (Stark style)
export const STARK_ANIMATIONS = {
  // Keyframes CSS para animações
  keyframes: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes glow {
      0% { 
        box-shadow: 0 0 5px rgba(0, 212, 255, 0.5);
        text-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
      }
      100% { 
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
        text-shadow: 0 0 20px rgba(0, 212, 255, 1);
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes matrix {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    @keyframes stark-glow {
      0%, 100% { 
        filter: brightness(1) drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
      }
      50% { 
        filter: brightness(1.2) drop-shadow(0 0 20px rgba(0, 212, 255, 0.8));
      }
    }
  `,
  
  // Classes para animações
  classes: {
    pulse: "animate-pulse",
    glow: "animate-[glow_3s_ease-in-out_infinite_alternate]",
    float: "animate-[float_6s_ease-in-out_infinite]",
    matrix: "animate-[matrix_10s_linear_infinite]",
    starkGlow: "animate-[stark-glow_2s_ease-in-out_infinite]",
  }
};

// Exportar configurações completas
export default {
  typography: STARK_TYPOGRAPHY,
  classes: STARK_CLASSES,
  animations: STARK_ANIMATIONS,
  generateStarkText,
  generateStarkButton,
};
