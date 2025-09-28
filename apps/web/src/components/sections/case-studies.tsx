"use client";

import { MinimalistSection } from "@/components/ui/minimalist-section";
import { MinimalistCard } from "@/components/ui/minimalist-card";

const CaseStudies = () => {
	const cases = [
		{
			id: 1,
			title: "Transformação Digital em Indústria",
			company: "Indústria Metalúrgica",
			description: "Implementação de infraestrutura cloud com automação e monitoramento",
			results: [
				"Redução de 40% nos custos operacionais",
				"Aumento de 99.95% de uptime",
				"Redução de 60% no tempo de resposta a incidentes"
			],
			industry: "Manufatura",
			timeframe: "6 meses",
			investment: "R$ 1.2M",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Indústria</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
					/>
				</svg>
			),
		},
		{
			id: 2,
			title: "Governança e Segurança para Finanças",
			company: "Instituição Financeira",
			description: "Estruturação de governança de TI e segurança da informação",
			results: [
				"Conformidade com normas do BACEN",
				"100% de compliance com LGPD",
				"Redução de 85% nos riscos de segurança"
			],
			industry: "Finanças",
			timeframe: "8 meses",
			investment: "R$ 2.5M",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Finanças</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
					/>
				</svg>
			),
		},
		{
			id: 3,
			title: "Migração para Nuvem Segura",
			company: "Rede de Varejo",
			description: "Migração de infraestrutura legada para cloud com segurança",
			results: [
				"99.99% de disponibilidade",
				"Redução de 50% nos custos de infra",
				"Melhoria de 70% na performance"
			],
			industry: "Varejo",
			timeframe: "4 meses",
			investment: "R$ 800K",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Varejo</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
					/>
				</svg>
			),
		},
		{
			id: 4,
			title: "E-commerce de Alto Tráfego",
			company: "E-commerce Nacional",
			description: "Otimização de performance e segurança para plataforma de e-commerce",
			results: [
				"Aumento de 300% na velocidade de carregamento",
				"Redução de 90% no tempo de checkout",
				"Aumento de 150% nas conversões"
			],
			industry: "E-commerce",
			timeframe: "3 meses",
			investment: "R$ 600K",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de E-commerce</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
					/>
				</svg>
			),
		},
	];

	return (
		<MinimalistSection
			subtitle="Cases de Sucesso"
			title="Resultados Reais, Impacto Mensurável"
			description="Projetos que transformaram negócios e geraram resultados excepcionais para nossos clientes"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{cases.map((caseStudy, index) => (
					<MinimalistCard
						key={caseStudy.id}
						title={caseStudy.title}
						subtitle={`${caseStudy.company} • ${caseStudy.industry}`}
						description={caseStudy.description}
						icon={caseStudy.icon}
						features={caseStudy.results}
						badge={`${caseStudy.timeframe} • ${caseStudy.investment}`}
						badgeColor="bg-primary-500"
						variant={index === 0 ? "featured" : "default"}
						className="h-full"
					/>
				))}
			</div>
		</MinimalistSection>
	);
};

export default CaseStudies;