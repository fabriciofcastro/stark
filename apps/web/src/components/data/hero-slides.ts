import type { Slide } from "@/components/ui/hero-embla";
import { logEvent } from "@/lib/gtag";

export const heroSlides: Slide[] = [
	{
		// Governança de TI
		image:
			"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&sat=-10",
		title: "Governança de TI",
		subtitle:
			"Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST. Garantimos conformidade, eficiência e segurança em seus ativos de tecnologia.",
		ctaPrimary: {
			label: "Consultar Governança",
			onClick: () => logEvent("cta", "governanca_click", "hero_governanca"),
		},
		impactPhrase: "Onde a excelência tecnológica encontra a disciplina operacional",
		theme: "governance"
	},
	{
		// Criação de Sites
		image:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&sat=-10",
		title: "Criação de Sites Profissionais",
		subtitle: "Sites otimizados para conversão com performance, SEO técnico e integrações personalizadas. Resultados mensuráveis em 30 dias.",
		ctaPrimary: {
			label: "Ver Portfólio",
			onClick: () => logEvent("cta", "portfolio_click", "hero_sites"),
		},
		ctaSecondary: {
			label: "Planejar Projeto",
			onClick: () => logEvent("cta", "orcamento_click", "hero_sites"),
		},
		impactPhrase: "Transformamos ideias em experiências digitais extraordinárias",
		theme: "development"
	},
	{
		// Suporte / Help Desk
		image:
			"https://images.unsplash.com/photo-1551650975-9880bc9b6b9f?q=80&w=2070&auto=format&fit=crop&sat=-10",
		title: "Suporte que resolve",
		subtitle: "SLA garantido com equipe especializada 24/7. Help Desk, monitoramento e automação para manter sua operação funcionando com 99.99% de uptime.",
		ctaPrimary: {
			label: "Abrir chamado",
			onClick: () => logEvent("cta", "abrir_chamado_click", "hero_suporte"),
		},
		ctaSecondary: {
			label: "WhatsApp",
			onClick: () => logEvent("cta", "whatsapp_click", "hero_suporte"),
		},
		impactPhrase: "Sua operação nunca para, nossa dedicação também não",
		theme: "support"
	},
	{
		// Segurança / Cibersegurança
		image:
			"https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop&sat=-10",
		title: "Segurança em primeiro lugar",
		subtitle: "Protegemos sua empresa com pentest, SOC/MDR, LGPD e resposta a incidentes. Conformidade NIST e ISO com relatórios em tempo real.",
		ctaPrimary: {
			label: "Falar com especialista",
			onClick: () => logEvent("cta", "especialista_click", "hero_security"),
		},
		impactPhrase: "Proteção inteligente para um mundo digital complexo",
		theme: "security"
	},
	{
		// Engajamento Digital
		image:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&sat=-10",
		title: "Engajamento Digital",
		subtitle:
			"Aumentamos conversão com estratégias de engajamento, analytics avançado e automação. Melhoramos métricas e retemos mais visitantes.",
		ctaPrimary: {
			label: "Analisar Site",
			onClick: () => logEvent("cta", "engajamento_click", "hero_engajamento"),
		},
		impactPhrase: "Conectamos pessoas e tecnologia para resultados excepcionais",
		theme: "engagement"
	},
];
