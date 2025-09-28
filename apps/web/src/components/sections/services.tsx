// components/sections/services-section.jsx
"use client";

import Link from "next/link";

const Services = () => {
	// Apenas 4 serviços principais com destaque visual
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
			badgeColor: "bg-green-500",
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
			badgeColor: "bg-blue-500",
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
			badgeColor: "bg-purple-500",
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
			badgeColor: "bg-red-500",
		},
	];

	return (
		<section className="py-20 container-px reveal" id="servicos">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/20 mb-6">
						<span className="text-brand-gold-400 text-sm font-medium">
							✨ Nossos Serviços Principais
						</span>
					</div>
					<h3 className="mb-4 font-bold text-3xl md:text-4xl text-white">
						Soluções Tecnológicas Completas
					</h3>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						Serviços especializados para atender todas as necessidades da sua
						infraestrutura de TI
					</p>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
					{featuredServices.map((service) => (
						<Link
							key={service.title}
							href={service.link}
							className="group relative bg-card rounded-xl p-6 border border-white/10 hover:border-brand-gold-500/30 transition-all duration-300 hover:-translate-y-2 shadow-soft"
						>
							{/* Badge */}
							<div
								className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-medium text-black ${service.badgeColor}`}
							>
								{service.badge}
							</div>

							{/* Icon */}
							<div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-brand-gold-500 border border-white/20 bg-brand-green-700/30 group-hover:bg-brand-gold-500/20 transition-colors">
								{service.icon}
							</div>

							{/* Title and Subtitle */}
							<h4 className="text-lg font-bold text-white mb-2 group-hover:text-brand-gold-500 transition-colors">
								{service.title}
							</h4>
							<div className="text-xs text-brand-gold-500 mb-3 font-medium">
								{service.subtitle}
							</div>

							{/* Description */}
							<p className="text-brand-gray-300 text-sm mb-4">
								{service.description}
							</p>

							{/* Features */}
							<ul className="text-xs text-brand-gray-400 space-y-1">
								{service.features.map((feature) => (
									<li key={feature} className="flex items-center">
										<svg
											className="w-4 h-4 mr-2 text-brand-gold-500"
											fill="currentColor"
											viewBox="0 0 20 20"
											aria-hidden="true"
											focusable="false"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										{feature}
									</li>
								))}
							</ul>
						</Link>
					))}
				</div>

				{/* CTA Section */}
				<div className="text-center bg-gradient-to-r from-brand-green-800/50 via-brand-gold-500/10 to-brand-green-800/50 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
					<h4 className="text-2xl font-bold text-white mb-4">
						Precisa de uma solução personalizada?
					</h4>
					<p className="text-brand-gray-300 mb-8 max-w-2xl mx-auto">
						Explore nosso catálogo completo de serviços ou converse com nossos
						especialistas para encontrar a solução ideal para sua empresa.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/services"
							className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-black bg-brand-gold-500 hover:bg-brand-gold-600 transition-all duration-300 shadow-lg hover:shadow-brand-gold-500/25 hover:-translate-y-1"
						>
							<span>Ver Todos os Serviços</span>
							<svg
								className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<title>Seta para direita</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</Link>
						<Link
							href="/contact"
							className="inline-flex items-center justify-center px-8 py-4 border border-brand-gold-500 text-base font-medium rounded-xl text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300 hover:-translate-y-1"
						>
							Falar com Especialista
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Services;
