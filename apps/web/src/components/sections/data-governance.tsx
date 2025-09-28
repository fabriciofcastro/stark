"use client";

import { MinimalistSection } from "@/components/ui/minimalist-section";
import { MinimalistCard } from "@/components/ui/minimalist-card";

const DataGovernance = () => {
	const governanceAreas = [
		{
			title: "Proteção de Dados",
			description:
				"Políticas rigorosas de proteção de dados pessoais e sensíveis conforme LGPD, GDPR e normas setoriais.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Proteção de Dados</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
					/>
				</svg>
			),
			features: [
				"Conformidade LGPD/GDPR",
				"Classificação de dados",
				"Políticas de retenção",
				"Consentimento e transparência",
			],
		},
		{
			title: "Segurança da Informação",
			description:
				"Estruturas de segurança baseadas nos frameworks ISO 27001, NIST e COBIT para proteção de ativos críticos.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Segurança</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
					/>
				</svg>
			),
			features: [
				"ISO 27001 e NIST CSF",
				"Controles de acesso",
				"Criptografia end-to-end",
				"Monitoramento contínuo",
			],
		},
		{
			title: "Auditoria e Compliance",
			description:
				"Relatórios de auditoria trimestrais, testes de penetração e conformidade contínua com normas regulatórias.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Auditoria</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
					/>
				</svg>
			),
			features: [
				"Auditorias trimestrais",
				"Testes de penetração",
				"Relatórios de conformidade",
				"Certificações internacionais",
			],
		},
		{
			title: "Continuidade de Negócios",
			description:
				"Planos de continuidade com RTO e RPO definidos, testados regularmente com simulações de desastre.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Continuidade</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
			),
			features: [
				"RTO e RPO definidos",
				"Backup automatizado",
				"Simulações de desastre",
				"Recuperação rápida",
			],
		},
	];

	const complianceFrameworks = [
		{ name: "LGPD", status: "Compliant", level: "Brasil" },
		{ name: "GDPR", status: "Compliant", level: "Europa" },
		{ name: "ISO 27001", status: "Certified", level: "Internacional" },
		{ name: "SOC 2", status: "Type II", level: "EUA" },
		{ name: "PCI DSS", status: "Compliant", level: "Global" },
		{ name: "COBIT 5", status: "Aligned", level: "Global" },
	];

	return (
		<MinimalistSection
			subtitle="Governança & Compliance"
			title="Proteção e Conformidade Total"
			description="Implementamos práticas rigorosas de governança de dados alinhadas às principais normas internacionais"
		>
			<div className="space-y-12">
				{/* Áreas de Governança */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{governanceAreas.map((area, index) => (
						<MinimalistCard
							key={index}
							title={area.title}
							description={area.description}
							icon={area.icon}
							features={area.features}
							variant="minimal"
							className="h-full"
						/>
					))}
				</div>

				{/* Frameworks de Compliance */}
				<div className="bg-gradient-to-r from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
					<h3 className="text-xl font-bold text-white mb-6 text-center">
						Frameworks de Compliance
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
						{complianceFrameworks.map((framework, index) => (
							<div
								key={index}
								className="text-center p-4 bg-neutral-800/50 rounded-lg border border-white/5"
							>
								<div className="text-sm font-semibold text-white mb-1">
									{framework.name}
								</div>
								<div className="text-xs text-success-400 mb-1">
									{framework.status}
								</div>
								<div className="text-xs text-neutral-400">
									{framework.level}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</MinimalistSection>
	);
};

export default DataGovernance;
