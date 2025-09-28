import type { Slide } from "@/components/ui/hero-embla";
import { logEvent } from "@/lib/gtag";

export const heroSlides: Slide[] = [
  {
    // Governança de TI
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop&sat=-20",
    title: "Governança de TI",
    subtitle:
      "Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST.",
    ctaPrimary: {
      label: "Consultar Governança",
      onClick: () => logEvent("cta", "governanca_click", "hero_governanca"),
    },
  },
  {
    // Criação de Sites
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop&sat=-15",
    title: "Criação de Sites Profissionais",
    subtitle: "Performance, SEO técnico e conversão orientados a resultados.",
    ctaPrimary: {
      label: "Ver Portfólio",
      onClick: () => logEvent("cta", "portfolio_click", "hero_sites"),
    },
    ctaSecondary: {
      label: "Planejar Projeto",
      onClick: () => logEvent("cta", "orcamento_click", "hero_sites"),
    },
  },
  {
    // Suporte / Help Desk
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2000&auto=format&fit=crop&sat=-20",
    title: "Suporte que resolve",
    subtitle: "Help Desk, governança, automação e SLAs claros para seu time.",
    ctaPrimary: {
      label: "Abrir chamado",
      onClick: () => logEvent("cta", "abrir_chamado_click", "hero_suporte"),
    },
    ctaSecondary: {
      label: "WhatsApp",
      onClick: () => logEvent("cta", "whatsapp_click", "hero_suporte"),
    },
  },
  {
    // Segurança / Cibersegurança
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop&sat=-25",
    title: "Segurança em primeiro lugar",
    subtitle: "LGPD, NIST/ISO, backup, DR e resposta a incidentes.",
    ctaPrimary: {
      label: "Falar com especialista",
      onClick: () => logEvent("cta", "especialista_click", "hero_security"),
    },
  },
  {
    // Engajamento Digital
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop&sat=-15",
    title: "Engajamento Digital",
    subtitle: "Estratégias completas para aumentar conversão e retenção dos visitantes.",
    ctaPrimary: {
      label: "Analisar Site",
      onClick: () => logEvent("cta", "engajamento_click", "hero_engajamento"),
    },
  },
];
