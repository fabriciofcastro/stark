// components/sections/about-section.jsx
"use client";

import { useState, useEffect, useId } from "react";
import Link from "next/link";

const About = () => {
	const [activeStat, setActiveStat] = useState(0);
	const sectionId = useId();

	useEffect(() => {
		const timer = setInterval(() => {
			setActiveStat((prev) => (prev + 1) % 4);
		}, 3000);

		return () => clearInterval(timer);
	}, []);

	const impactStats = [
		{
			number: "35%",
			label: "Redução Média de Custos de TI",
			icon: "💰",
			description:
				"Empresas parceiras economizam em média 35% com nossa gestão proativa",
			color: "from-green-500 to-emerald-500",
			value: "R$ 2.1M economizados anualmente",
		},
		{
			number: "99.9%",
			label: "Disponibilidade Garantida",
			icon: "⚡",
			description: "Uptime que mantém seu negócio funcionando sem interrupções",
			color: "from-blue-500 to-cyan-500",
			value: "99.9% uptime SLA com penalidades contratuais",
		},
		{
			number: "<15min",
			label: "Tempo de Resposta Emergencial",
			icon: "🎯",
			description: "Suporte imediato para críticos que afetam sua operação",
			color: "from-yellow-500 to-orange-500",
			value: "Resposta garantida em <15 minutos para emergências",
		},
		{
			number: "150+",
			label: "Empresas Transformadas",
			icon: "🚀",
			description:
				"Parcerias que geraram crescimento real e segurança comprovada",
			color: "from-purple-500 to-pink-500",
			value: "150+ empresas com ROI comprovado",
		},
	];

	const clientFocusedValues = [
		{
			id: 1,
			icon: "🚀",
			title: "Resultados Medidos",
			description: "Cada projeto entrega ROI comprovado e KPIs mensuráveis",
		},
		{
			id: 2,
			icon: "🛡️",
			title: "Proteção Empresarial",
			description:
				"Segurança que previne perdas financeiras e danos à reputação",
		},
		{
			id: 3,
			icon: "⏱️",
			title: "Tempo Que Vale Ouro",
			description: "Soluções que aumentam produtividade e eliminam downtime",
		},
	];

	const transformations = [
		{
			id: 1,
			icon: "📉➡️📈",
			title: "Da Crise à Estabilidade",
			description:
				"Empresa X estava perdendo R$50k/mês com downtime. Hoje economiza R$120k/ano com nosso monitoring proativo.",
		},
		{
			id: 2,
			icon: "🛡️",
			title: "Segurança que Protege",
			description:
				"Comércio Y evitou multa de R$200k com nossa implementação LGPD completa em 3 semanas.",
		},
		{
			id: 3,
			icon: "🚀",
			title: "Crescimento Sem Interrupções",
			description:
				"Startup Z cresceu de 10 para 150 funcionários sem um minuto de downtime em 3 anos.",
		},
	];

	return (
		<section
			id={sectionId}
			className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
		>
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-brand-green-900/20 via-transparent to-brand-gold-500/10" />
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl animate-pulse" />
			<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

			<div className="mx-auto max-w-7xl relative z-10">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/20 mb-6">
						<span className="text-brand-gold-400 text-sm font-medium">
							✨ Mais que Tecnologia
						</span>
					</div>
					<h3 className="mb-6 font-bold text-4xl md:text-5xl bg-gradient-to-r from-white via-brand-gold-400 to-white bg-clip-text text-transparent">
						Parceria que Transforma Seu Negócio
					</h3>
					<p className="text-xl text-brand-gray-300 max-w-3xl mx-auto leading-relaxed">
						Há 13+ anos ajudando empresas como a sua a crescerem com segurança e
						eficiência tecnológica.
					</p>
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
					{/* Left Content */}
					<div className="space-y-8">
						{/* Transformation Focus */}
						<div className="bg-gradient-to-r from-brand-green-800/30 to-brand-green-700/30 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
							<h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
								<span className="text-3xl">🎯</span>
								Como Transformamos Seu Negócio
							</h4>
							<p className="text-brand-gray-300 leading-relaxed mb-4">
								A STARK não apenas fornece tecnologia - criamos parcerias
								estratégicas que:
							</p>
							<ul className="space-y-3 text-brand-gray-300">
								<li className="flex items-start">
									<span className="text-brand-gold-500 mr-2">✓</span>
									<span>
										<strong className="text-brand-gold-400">
											Eliminam custos ocultos
										</strong>{" "}
										de manutenção e downtime
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-brand-gold-500 mr-2">✓</span>
									<span>
										<strong className="text-brand-gold-400">
											Previne perdas financeiras
										</strong>{" "}
										com segurança proativa
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-brand-gold-500 mr-2">✓</span>
									<span>
										<strong className="text-brand-gold-400">
											Aceleram decisões
										</strong>{" "}
										com dados e insights acionáveis
									</span>
								</li>
							</ul>
						</div>

						{/* Client-Focused Values */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{clientFocusedValues.map((value) => (
								<div
									key={value.title}
									className="bg-card/50 rounded-xl p-6 border border-white/10 hover:border-brand-gold-500/30 transition-all duration-300 hover:-translate-y-1 group"
								>
									<div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
										{value.icon}
									</div>
									<h5 className="font-bold text-white mb-2">{value.title}</h5>
									<p className="text-xs text-brand-gray-400">
										{value.description}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Right Content - Impact Stats */}
					<div className="relative">
						{/* Main Image Container */}
						<div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-brand-green-800/20 to-brand-gold-500/10 p-2">
							<div className="relative h-80 bg-gradient-to-br from-brand-green-900 to-brand-green-800 rounded-xl overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="text-center text-white">
										<div className="text-6xl mb-4">🚀</div>
										<h4 className="text-2xl font-bold mb-2">
											Transformação Real
										</h4>
										<p className="text-brand-gray-300">
											Resultados que impactam seu negócio
										</p>
									</div>
								</div>

								{/* Floating Elements */}
								<div className="absolute top-4 left-4 bg-brand-gold-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-brand-gold-500/30">
									<span className="text-brand-gold-400 text-sm font-medium">
										💰 ROI Comprovado
									</span>
								</div>
								<div className="absolute top-4 right-4 bg-brand-cyan-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-brand-cyan-500/30">
									<span className="text-brand-cyan-400 text-sm font-medium">
										🔒 Segurança Garantida
									</span>
								</div>
								<div className="absolute bottom-4 left-4 bg-green-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-500/30">
									<span className="text-green-400 text-sm font-medium">
										⚡ Crescimento Real
									</span>
								</div>
								<div className="absolute bottom-4 right-4 bg-purple-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-purple-500/30">
									<span className="text-purple-400 text-sm font-medium">
										🎯 Suporte Proativo
									</span>
								</div>
							</div>
						</div>

						{/* Interactive Impact Stats */}
						<div className="absolute -bottom-8 left-0 right-0">
							<div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
								<div className="grid grid-cols-2 gap-4">
									{impactStats.map((stat, index) => (
										<button
											key={stat.number}
											className={`text-center p-4 rounded-xl transition-all duration-500 cursor-pointer ${
												activeStat === index
													? `bg-gradient-to-r ${stat.color} text-white transform scale-105 shadow-lg`
													: "bg-brand-green-800/30 hover:bg-brand-green-700/50"
											}`}
											onClick={() => setActiveStat(index)}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													setActiveStat(index);
												}
											}}
											type="button"
										>
											<div className="text-2xl mb-2">{stat.icon}</div>
											<div
												className={`text-2xl font-bold mb-1 ${
													activeStat === index
														? "text-white"
														: "text-brand-gold-400"
												}`}
											>
												{stat.number}
											</div>
											<div
												className={`text-xs ${
													activeStat === index
														? "text-white/90"
														: "text-brand-gray-400"
												}`}
											>
												{stat.label}
											</div>
											{activeStat === index && (
												<div className="text-xs mt-2 text-white/80 animate-fade-in">
													{stat.description}
												</div>
											)}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Transformations Showcase */}
				<div className="mb-16">
					<h4 className="text-2xl font-bold text-center text-white mb-12">
						Transformações Reais de Empresas Como a Sua
					</h4>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{transformations.map((transformation, index) => (
							<div
								key={transformation.id}
								className="bg-gradient-to-br from-brand-green-800/30 to-brand-gold-500/10 rounded-xl p-6 border border-white/10 hover:border-brand-gold-500/30 transition-all duration-300 group hover:-translate-y-2"
							>
								<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
									{transformation.icon}
								</div>
								<h5 className="text-lg font-bold text-brand-gold-400 mb-3">
									{transformation.title}
								</h5>
								<p className="text-brand-gray-300 text-sm">
									{transformation.description}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* CTA Section with Value Proposition */}
				<div className="text-center bg-gradient-to-r from-brand-green-800/50 via-brand-gold-500/10 to-brand-green-800/50 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
					<h4 className="text-2xl font-bold text-white mb-4">
						Pronto para Transformar seu Negócio?
					</h4>
					<p className="text-brand-gray-300 mb-8 max-w-3xl mx-auto">
						Descubra como a STARK pode aumentar a segurança, reduzir custos e
						acelerar o crescimento da sua empresa com soluções tecnológicas
						inovadoras e suporte especializado.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/sobre"
							className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-black bg-brand-gold-500 hover:bg-brand-gold-600 transition-all duration-300 shadow-lg hover:shadow-brand-gold-500/25 hover:-translate-y-1"
						>
							<span>Verificar Qualificação Gratuita</span>
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
							href="/servicos"
							className="inline-flex items-center justify-center px-8 py-4 border border-brand-gold-500 text-base font-medium rounded-xl text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300 hover:-translate-y-1"
						>
							Cases de Sucesso do Meu Setor
						</Link>
					</div>
				</div>
			</div>

			{/* Custom Animations */}
			<style jsx>{`
				@keyframes fade-in {
					from { opacity: 0; transform: translateY(10px); }
					to { opacity: 1; transform: translateY(0); }
				}
				.animate-fade-in {
					animation: fade-in 0.5s ease-out;
				}
			`}</style>
		</section>
	);
};

export default About;
