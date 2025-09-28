"use client";

import { MinimalistSection } from "@/components/ui/minimalist-section";
import { MinimalistCard } from "@/components/ui/minimalist-card";

const TechnicalExpertise = () => {
	const expertiseAreas = [
		{
			title: "Governança de TI",
			description:
				"Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST. Auditoria, gestão de riscos, LGPD e DPA.",
			services: [
				"COBIT 5 e ITIL v4 (processos e serviços)",
				"ISO 27001 (SGSI) e NIST CSF (segurança)",
				"Gestão de riscos e continuidade (BIA/DRP)",
				"Inventário, CMDB e gestão de mudanças",
				"Políticas de segurança, backup e acesso",
				"Conformidade LGPD: DPA, registro de tratamento",
			],
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Governança</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
					/>
				</svg>
			),
		},
		{
			title: "Criação de Sites",
			description:
				"Sites otimizados para performance, SEO e conversão. Landing pages, e-commerces e sistemas web personalizados.",
			services: [
				"SEO técnico e performance (Core Web Vitals)",
				"Landing pages de alta conversão",
				"E-commerces integrados",
				"Sistemas web sob medida",
				"Sites responsivos e PWA",
				"Análise e otimização de conversão",
			],
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Desenvolvimento Web</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
					/>
				</svg>
			),
		},
		{
			title: "Engajamento Digital",
			description:
				"Estratégias completas para aumentar o engajamento e conversão dos visitantes.",
			services: [
				"Google Analytics 4 e Tag Manager",
				"A/B testing e otimização",
				"Funnels de conversão",
				"Chatbots e automação",
				"Relatórios e métricas personalizadas",
			],
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Engajamento</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
					/>
				</svg>
			),
		},
		{
			title: "E-mail Profissional",
			description:
				"Soluções completas de e-mail corporativo com segurança e confiabilidade.",
			services: [
				"E-mail Exchange e G Suite",
				"Configuração e migração de domínios",
				"Proteção contra SPAM e phishing",
				"Arquivamento e backup de e-mails",
				"Políticas de retenção e compliance",
			],
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de E-mail</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
					/>
				</svg>
			),
		},
	];

	return (
		<MinimalistSection
			subtitle="Expertise Técnica"
			title="Áreas de Especialização"
			description="Conhecimento profundo em tecnologias e metodologias para entregar soluções de excelência"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{expertiseAreas.map((area, index) => (
					<MinimalistCard
						key={index}
						title={area.title}
						description={area.description}
						icon={area.icon}
						features={area.services}
						variant="minimal"
						className="h-full"
					/>
				))}
			</div>
		</MinimalistSection>
	);
};

export default TechnicalExpertise;
