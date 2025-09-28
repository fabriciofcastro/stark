"use client";

import { MinimalistSection } from "@/components/ui/minimalist-section";
import { MinimalistCard } from "@/components/ui/minimalist-card";

const Services = () => {
	const featuredServices = [
		{
			title: "Suporte Técnico Empresarial",
			subtitle: "24/7 • SLA Garantido",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Suporte Técnico</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
					/>
				</svg>
			),
			description:
				"Suporte técnico especializado 24/7 com SLA garantido para garantir a continuidade da sua operação.",
			features: ["Monitoramento 24/7", "SLA garantido", "Equipe especializada"],
			link: "/suporte-tecnico-empresarial",
			badge: "Popular",
			badgeColor: "bg-success-500",
		},
		{
			title: "Consultoria Tecnológica",
			subtitle: "Estratégica • Transformação Digital",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Consultoria Estratégica</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
			),
			description:
				"Transformação digital e planejamento estratégico para otimizar processos e reduzir custos.",
			features: [
				"Auditoria tecnológica",
				"Roadmap estratégico",
				"ROI comprovado",
			],
			link: "/consultoria-tecnologica",
			badge: "Recomendado",
			badgeColor: "bg-info-500",
		},
		{
			title: "Cloud & Infraestrutura",
			subtitle: "VPS • Linux • Alta Disponibilidade",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Soluções em Nuvem</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-4.477-5.001A4 4 0 003 15z"
					/>
				</svg>
			),
			description:
				"Provisionamento, hardening e observabilidade em servidores Linux com alta disponibilidade.",
			features: [
				"99.9% disponibilidade",
				"Backups automatizados",
				"Escalabilidade",
			],
			link: "/cloud-vps-linux",
			badge: "Novo",
			badgeColor: "bg-accent-500",
		},
		{
			title: "Cibersegurança",
			subtitle: "Pentest • SOC • LGPD",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Cibersegurança</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
					/>
				</svg>
			),
			description:
				"Pentest, SOC/MDR, LGPD e resposta a incidentes alinhada a NIST.",
			features: [
				"Pentest (web, infra, Wi‑Fi)",
				"SOC/MDR (monitoramento 24/7)",
				"LGPD/DPA e conformidade",
			],
			link: "/cyberseguranca",
			badge: "Essencial",
			badgeColor: "bg-error-500",
		},
	];

	return (
		<MinimalistSection
			subtitle="Nossos Serviços"
			title="Soluções Tecnológicas Completas"
			description="Serviços especializados para atender todas as necessidades da sua infraestrutura de TI"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{featuredServices.map((service, index) => (
					<MinimalistCard
						key={index}
						title={service.title}
						subtitle={service.subtitle}
						description={service.description}
						icon={service.icon}
						badge={service.badge}
						badgeColor={service.badgeColor}
						features={service.features}
						link={service.link}
						variant={index === 0 ? "featured" : "default"}
					/>
				))}
			</div>
		</MinimalistSection>
	);
};

export default Services;
