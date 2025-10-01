/**
 * 🎨 Sistema de Temas Centralizado
 * Gerencia cores, animações e configurações visuais para todas as páginas
 */

export interface AnimationConfig {
  type: "particles" | "waves" | "grid" | "icons" | "lines" | "shapes";
  count: number;
  speed: number;
  intensity: "low" | "medium" | "high";
  duration: number;
  delay?: number;
}

export interface BackgroundConfig {
  gradient: string;
  particles: string;
  overlay: string;
  effects: AnimationConfig[];
}

export interface ThemeConfig {
  name: string;
  primary: string;
  accent: string;
  particles: string;
  lines: string;
  icons: string[];
  animations: AnimationConfig[];
  background: BackgroundConfig;
  position: "left" | "center" | "right";
}

export const themes: Record<string, ThemeConfig> = {
  // 🏠 PÁGINA PRINCIPAL
  home: {
    name: "Principal",
    primary: "from-purple-600 via-cyan-500 to-indigo-600",
    accent: "from-purple-400 to-cyan-400",
    particles: "from-purple-400/30 to-cyan-400/30",
    lines: "from-purple-400/20 to-cyan-400/20",
    icons: ["⚡", "🌟", "🚀", "💎"],
    animations: [
      {
        type: "particles",
        count: 15,
        speed: 6,
        intensity: "medium",
        duration: 6,
      },
      { type: "waves", count: 6, speed: 8, intensity: "high", duration: 8 },
      { type: "grid", count: 12, speed: 4, intensity: "low", duration: 4 },
    ],
    background: {
      gradient: "from-purple-600 via-cyan-500 to-indigo-600",
      particles: "from-purple-400/30 to-cyan-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "center",
  },

  // 🔧 SUPORTE TÉCNICO
  support: {
    name: "Suporte Técnico",
    primary: "from-blue-600 via-cyan-500 to-teal-600",
    accent: "from-blue-400 to-cyan-400",
    particles: "from-blue-400/30 to-cyan-400/30",
    lines: "from-blue-400/20 to-cyan-400/20",
    icons: ["🔧", "⚙️", "🛠️", "🔩", "💻", "📞"],
    animations: [
      { type: "icons", count: 20, speed: 8, intensity: "medium", duration: 8 },
      { type: "waves", count: 15, speed: 10, intensity: "high", duration: 10 },
    ],
    background: {
      gradient: "from-blue-600 via-cyan-500 to-teal-600",
      particles: "from-blue-400/30 to-cyan-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "left",
  },

  // ☁️ SOLUÇÕES EM NUVEM
  cloud: {
    name: "Soluções em Nuvem",
    primary: "from-indigo-600 via-purple-500 to-violet-600",
    accent: "from-indigo-400 to-purple-400",
    particles: "from-indigo-400/30 to-purple-400/30",
    lines: "from-indigo-400/20 to-purple-400/20",
    icons: ["☁️", "🌩️", "⚡", "💾", "🔄", "📊"],
    animations: [
      {
        type: "particles",
        count: 25,
        speed: 12,
        intensity: "high",
        duration: 12,
      },
      { type: "waves", count: 8, speed: 15, intensity: "medium", duration: 15 },
    ],
    background: {
      gradient: "from-indigo-600 via-purple-500 to-violet-600",
      particles: "from-indigo-400/30 to-purple-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "center",
  },

  // 🌐 CONSULTORIA
  consulting: {
    name: "Consultoria Estratégica",
    primary: "from-emerald-600 via-teal-500 to-cyan-600",
    accent: "from-emerald-400 to-teal-400",
    particles: "from-emerald-400/30 to-teal-400/30",
    lines: "from-emerald-400/20 to-teal-400/20",
    icons: ["🤝", "📈", "💡", "🎯", "📋", "✅"],
    animations: [
      { type: "grid", count: 12, speed: 3, intensity: "medium", duration: 3 },
      { type: "lines", count: 20, speed: 4, intensity: "high", duration: 4 },
    ],
    background: {
      gradient: "from-emerald-600 via-teal-500 to-cyan-600",
      particles: "from-emerald-400/30 to-teal-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "right",
  },

  // 🛡️ CIBERSEGURANÇA
  cybersecurity: {
    name: "Cibersegurança",
    primary: "from-red-600 via-pink-500 to-rose-600",
    accent: "from-red-400 to-pink-400",
    particles: "from-red-400/30 to-pink-400/30",
    lines: "from-red-400/20 to-pink-400/20",
    icons: ["🛡️", "🔒", "🔐", "🚨", "⚡", "🛡️"],
    animations: [
      { type: "icons", count: 18, speed: 6, intensity: "high", duration: 6 },
      { type: "waves", count: 10, speed: 2, intensity: "high", duration: 2 },
    ],
    background: {
      gradient: "from-red-600 via-pink-500 to-rose-600",
      particles: "from-red-400/30 to-pink-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "left",
  },

  // 💻 DESENVOLVIMENTO
  development: {
    name: "Desenvolvimento Web",
    primary: "from-orange-600 via-amber-500 to-yellow-600",
    accent: "from-orange-400 to-amber-400",
    particles: "from-orange-400/30 to-amber-400/30",
    lines: "from-orange-400/20 to-amber-400/20",
    icons: ["💻", "⌨️", "🚀", "⚡", "🔧", "🎨"],
    animations: [
      { type: "lines", count: 30, speed: 5, intensity: "medium", duration: 5 },
      { type: "icons", count: 15, speed: 8, intensity: "high", duration: 8 },
    ],
    background: {
      gradient: "from-orange-600 via-amber-500 to-yellow-600",
      particles: "from-orange-400/30 to-amber-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "center",
  },

  // 📊 GOVERNANÇA
  governance: {
    name: "Governança de TI",
    primary: "from-slate-600 via-gray-500 to-zinc-600",
    accent: "from-slate-400 to-gray-400",
    particles: "from-slate-400/30 to-gray-400/30",
    lines: "from-slate-400/20 to-gray-400/20",
    icons: ["📋", "✅", "📊", "🔒", "📈", "🎯"],
    animations: [
      { type: "grid", count: 15, speed: 4, intensity: "low", duration: 4 },
      { type: "icons", count: 12, speed: 3, intensity: "medium", duration: 3 },
    ],
    background: {
      gradient: "from-slate-600 via-gray-500 to-zinc-600",
      particles: "from-slate-400/30 to-gray-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "right",
  },

  // 📝 BLOG
  blog: {
    name: "Blog",
    primary: "from-purple-600 via-fuchsia-500 to-pink-600",
    accent: "from-purple-400 to-fuchsia-400",
    particles: "from-purple-400/30 to-fuchsia-400/30",
    lines: "from-purple-400/20 to-fuchsia-400/20",
    icons: ["📝", "✍️", "📚", "💡", "🎯", "📖"],
    animations: [
      { type: "shapes", count: 12, speed: 6, intensity: "medium", duration: 6 },
      { type: "particles", count: 18, speed: 8, intensity: "low", duration: 8 },
    ],
    background: {
      gradient: "from-purple-600 via-fuchsia-500 to-pink-600",
      particles: "from-purple-400/30 to-fuchsia-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "center",
  },

  // 📞 CONTATO
  contact: {
    name: "Contato",
    primary: "from-green-600 via-lime-500 to-yellow-600",
    accent: "from-green-400 to-lime-400",
    particles: "from-green-400/30 to-lime-400/30",
    lines: "from-green-400/20 to-lime-400/20",
    icons: ["📞", "📧", "💬", "🌐", "📍", "📱"],
    animations: [
      { type: "waves", count: 12, speed: 4, intensity: "high", duration: 4 },
      {
        type: "particles",
        count: 20,
        speed: 6,
        intensity: "medium",
        duration: 6,
      },
    ],
    background: {
      gradient: "from-green-600 via-lime-500 to-yellow-600",
      particles: "from-green-400/30 to-lime-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "center",
  },

  // 🎨 PORTFÓLIO
  portfolio: {
    name: "Portfólio",
    primary: "from-blue-600 via-indigo-500 to-purple-600",
    accent: "from-blue-400 to-indigo-400",
    particles: "from-blue-400/30 to-indigo-400/30",
    lines: "from-blue-400/20 to-indigo-400/20",
    icons: ["🎨", "🖼️", "⭐", "🚀", "💎", "🎯"],
    animations: [
      { type: "shapes", count: 15, speed: 8, intensity: "high", duration: 8 },
      {
        type: "particles",
        count: 25,
        speed: 10,
        intensity: "medium",
        duration: 10,
      },
    ],
    background: {
      gradient: "from-blue-600 via-indigo-500 to-purple-600",
      particles: "from-blue-400/30 to-indigo-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "center",
  },

  // ❓ FAQ
  faq: {
    name: "FAQ",
    primary: "from-amber-600 via-yellow-500 to-orange-600",
    accent: "from-amber-400 to-yellow-400",
    particles: "from-amber-400/30 to-yellow-400/30",
    lines: "from-amber-400/20 to-yellow-400/20",
    icons: ["❓", "💡", "📝", "✅", "🎯", "📚"],
    animations: [
      { type: "icons", count: 16, speed: 5, intensity: "medium", duration: 5 },
      { type: "waves", count: 8, speed: 6, intensity: "low", duration: 6 },
    ],
    background: {
      gradient: "from-amber-600 via-yellow-500 to-orange-600",
      particles: "from-amber-400/30 to-yellow-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "center",
  },

  // 🏆 CASES DE SUCESSO
  cases: {
    name: "Cases de Sucesso",
    primary: "from-green-600 via-emerald-500 to-teal-600",
    accent: "from-green-400 to-emerald-400",
    particles: "from-green-400/30 to-emerald-400/30",
    lines: "from-green-400/20 to-emerald-400/20",
    icons: ["🏆", "📈", "💼", "🎯", "✅", "🚀"],
    animations: [
      { type: "shapes", count: 18, speed: 7, intensity: "high", duration: 7 },
      {
        type: "particles",
        count: 22,
        speed: 9,
        intensity: "medium",
        duration: 9,
      },
    ],
    background: {
      gradient: "from-green-600 via-emerald-500 to-teal-600",
      particles: "from-green-400/30 to-emerald-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "center",
  },

  // 🎫 HELP DESK
  helpdesk: {
    name: "Help Desk",
    primary: "from-cyan-600 via-blue-500 to-indigo-600",
    accent: "from-cyan-400 to-blue-400",
    particles: "from-cyan-400/30 to-blue-400/30",
    lines: "from-cyan-400/20 to-blue-400/20",
    icons: ["🎫", "📞", "💻", "🔧", "⚙️", "✅"],
    animations: [
      { type: "icons", count: 14, speed: 4, intensity: "medium", duration: 4 },
      { type: "grid", count: 10, speed: 5, intensity: "low", duration: 5 },
    ],
    background: {
      gradient: "from-cyan-600 via-blue-500 to-indigo-600",
      particles: "from-cyan-400/30 to-blue-400/30",
      overlay: "from-black/60 via-black/40 to-transparent",
      effects: [],
    },
    position: "left",
  },
};

/**
 * Obtém configuração de tema por nome
 */
export function getTheme(themeName: string): ThemeConfig {
  return themes[themeName] || themes.home;
}

/**
 * Obtém tema baseado na rota da página
 */
export function getThemeByRoute(pathname: string): ThemeConfig {
  const routeThemes: Record<string, string> = {
    "/": "home",
    "/services": "home",
    "/sobre": "consulting",
    "/contact": "contact",
    "/blog": "blog",
    "/portfolio": "portfolio",
    "/suporte-tecnico": "support",
    "/cloud-vps-linux": "cloud",
    "/consultoria-tecnologica": "consulting",
    "/cyberseguranca": "cybersecurity",
    "/create-site": "development",
    "/governance": "governance",
    "/faq": "faq",
    "/cases-de-sucesso": "cases",
    "/helpdesk": "helpdesk",
    "/suporte-tecnico-empresarial": "support",
  };

  const themeName = routeThemes[pathname] || "home";
  return getTheme(themeName);
}

/**
 * Gera classes CSS dinâmicas baseadas no tema
 */
export function generateThemeClasses(theme: ThemeConfig) {
  return {
    background: `bg-gradient-to-br ${theme.primary}`,
    accent: `bg-gradient-to-r ${theme.accent}`,
    particles: `bg-gradient-to-r ${theme.particles}`,
    lines: `bg-gradient-to-r ${theme.lines}`,
    text: `text-transparent bg-gradient-to-r ${theme.accent} bg-clip-text`,
    border: `border-gradient-to-r ${theme.accent}`,
    shadow: `shadow-2xl shadow-${theme.accent.split("-")[1]}-500/20`,
  };
}

/**
 * Configurações de performance para animações
 */
export const performanceConfig = {
  reducedMotion: {
    particles: { count: 5, speed: 2, intensity: "low" },
    waves: { count: 2, speed: 1, intensity: "low" },
    grid: { count: 3, speed: 1, intensity: "low" },
  },
  mobile: {
    particles: { count: 8, speed: 3, intensity: "low" },
    waves: { count: 3, speed: 2, intensity: "low" },
    grid: { count: 5, speed: 2, intensity: "low" },
  },
  desktop: {
    particles: { count: 20, speed: 6, intensity: "high" },
    waves: { count: 8, speed: 8, intensity: "high" },
    grid: { count: 15, speed: 4, intensity: "medium" },
  },
};

export default themes;
