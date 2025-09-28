"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Sobre() {
	const [activeTimeline, setActiveTimeline] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setActiveTimeline((prev) => (prev + 1) % 4);
		}, 4000);

		return () => clearInterval(timer);
	}, []);

	const valueMilestones = [
		{
			year: "2010",
			title: "Início da Jornada",
			description:
				"Primeira empresa economizou R$35k/ano com nosso suporte proativo",
			icon: "🚀",
			color: "from-blue-500 to-cyan-500",
			impact: "R$35k economizados anualmente",
		},
		{
			year: "2015",
			title: "Expansão com Valor",
			description:
				"50+ empresas passaram a economizar 30% com nossas soluções em nuvem",
			icon: "☁️",
			color: "from-green-500 to-emerald-500",
			impact: "30% de redução de custos de TI",
		},
		{
			year: "2018",
			title: "Proteção que Previne",
			description:
				"Cliente evitou multa de R$200k com nossa implementação LGPD completa",
			icon: "🔒",
			color: "from-red-500 to-pink-500",
			impact: "R$200k de multas evitadas",
		},
		{
			year: "2024",
			title: "Liderança Transformadora",
			description: "150+ empresas com ROI comprovado e crescimento acelerado",
			icon: "🏆",
			color: "from-yellow-500 to-orange-500",
			impact: "150+ empresas transformadas",
		},
	];

	const realTransformations = [
		{
			title: "Da Crise à Estabilidade",
			description:
				"Empresa X estava perdendo R$50k/mês com downtime. Hoje economiza R$120k/ano com nosso monitoring proativo.",
			metric: "R$120k/ano economizados",
			icon: "📉➡️📈",
			category: "Redução de Custos",
		},
		{
			title: "Segurança que Protege",
			description:
				"Comércio Y evitou multa de R$200k com nossa implementação LGPD completa em 3 semanas.",
			metric: "R$200k de multas evitadas",
			icon: "🛡️",
			category: "Proteção Empresarial",
		},
		{
			title: "Crescimento Sem Interrupções",
			description:
				"Startup Z cresceu de 10 para 150 funcionários sem um minuto de downtime em 3 anos.",
			metric: "15x crescimento sem interrupções",
			icon: "🚀",
			category: "Escala com Segurança",
		},
	];

	const uniqueAdvantages = [
		{
			icon: "🔍",
			title: "Ferramenta de Autodiagnóstico Única",
			description:
				"Cliente pode medir saúde tecnológica em 2 minutos com relatório personalizado",
		},
		{
			icon: "💸",
			title: "Garantia de ROI ou Reembolso",
			description:
				"Compromisso com resultados mensuráveis - se não entregarmos valor, devolvemos seu investimento",
		},
		{
			icon: "👥",
			title: "Time Especializado por Segmento",
			description:
				"Expertise específica para diferentes tipos de negócio com cases reais do seu setor",
		},
		{
			icon: "📊",
			title: "Dashboard de Valor em Tempo Real",
			description:
				"Acompanhamento contínuo de economias, segurança e performance com métricas específicas do seu negócio",
		},
	];

	return (
		<div className="relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-brand-green-900/30 via-transparent to-brand-gold-500/10" />
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl animate-pulse" />
			<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

			<div className="container mx-auto px-4 py-16 relative z-10">
				{/* Hero Section */}
				<section className="text-center mb-20">
					<div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/20 mb-8">
						<span className="text-brand-gold-400 text-sm font-medium">
							✨ Nossa História É Feita de Histórias de Sucesso
						</span>
					</div>
					<h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-brand-gold-400 to-white bg-clip-text text-transparent">
						Sobre a STARK
					</h1>
					<p className="text-xl text-brand-gray-300 max-w-4xl mx-auto leading-relaxed">
						Há 13+ anos criando parcerias estratégicas que transformam negócios
						através da tecnologia. Nossa história é escrita pelos resultados
						reais que entregamos a empresas como a sua.
					</p>
				</section>

				{/* Timeline Transformada - Valor Entregue ao Longo do Tempo */}
				<section className="mb-20">
					<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
						Marcos de Valor Entregue aos Nossos Clientes
					</h2>
					<div className="relative">
						{/* Timeline Line */}
						<div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-gold-500 via-brand-cyan-500 to-brand-gold-500 rounded-full" />

						<div className="space-y-12">
							{valueMilestones.map((item, index) => (
								<div
									key={item.year}
									className={`flex items-center ${
										index % 2 === 0 ? "flex-row" : "flex-row-reverse"
									}`}
								>
									<div
										className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
									>
										<button
											className={`w-full p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
												activeTimeline === index
													? `bg-gradient-to-r ${item.color} text-white border-transparent shadow-lg transform scale-105`
													: "bg-brand-green-800/30 border-white/10 hover:bg-brand-green-700/50"
											}`}
											onClick={() => setActiveTimeline(index)}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													setActiveTimeline(index);
												}
											}}
											type="button"
										>
											<div className="text-2xl mb-2">{item.icon}</div>
											<h3
												className={`text-xl font-bold mb-2 ${
													activeTimeline === index
														? "text-white"
														: "text-brand-gold-400"
												}`}
											>
												{item.title}
											</h3>
											<p
												className={`text-sm ${
													activeTimeline === index
														? "text-white/90"
														: "text-brand-gray-300"
												}`}
											>
												{item.description}
											</p>
											{activeTimeline === index && (
												<div className="mt-3 text-sm font-bold text-white animate-fade-in">
													{item.impact}
												</div>
											)}
										</button>
									</div>

									{/* Timeline Node */}
									<div className="relative z-10 flex-shrink-0">
										<div
											className={`w-4 h-4 rounded-full border-4 transition-all duration-500 ${
												activeTimeline === index
													? `bg-gradient-to-r ${item.color} border-white shadow-lg scale-125`
													: "bg-brand-gold-500 border-brand-gold-500"
											}`}
										/>
									</div>

									<div
										className={`w-1/2 ${index % 2 === 0 ? "pl-8 text-left" : "pr-8 text-right"}`}
									>
										<div
											className={`text-4xl font-bold ${
												activeTimeline === index
													? "text-white"
													: "text-brand-gold-500"
											} transition-colors duration-500`}
										>
											{item.year}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Transformações Reais de Clientes */}
				<section className="mb-20">
					<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
						Transformações Reais de Empresas Como a Sua
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{realTransformations.map((transformation, index) => (
							<div
								key={index}
								className="group bg-gradient-to-br from-brand-green-800/30 to-brand-gold-500/10 p-8 rounded-2xl border border-white/10 hover:border-brand-gold-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
							>
								<div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
									{transformation.icon}
								</div>
								<span className="inline-block px-3 py-1 text-xs rounded-full bg-brand-gold-500/20 text-brand-gold-400 mb-3">
									{transformation.category}
								</span>
								<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
									{transformation.title}
								</h3>
								<p className="text-brand-gray-300 mb-4 leading-relaxed">
									{transformation.description}
								</p>
								<div className="text-lg font-bold text-brand-cyan-400">
									{transformation.metric}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Como Ajudamos Realmente */}
				<section className="mb-20">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl font-bold mb-6 text-brand-gray-200">
								Como Ajudamos Sua Empresa Realmente
							</h2>
							<div className="space-y-6 text-brand-gray-300">
								<div className="bg-gradient-to-r from-brand-green-800/30 to-brand-green-700/30 rounded-xl p-6 border border-white/10">
									<h3 className="text-xl font-bold mb-3 text-brand-gold-400 flex items-center gap-2">
										<span>🔍</span> Diagnóstico Personalizado
									</h3>
									<p className="leading-relaxed">
										Análise gratuita e detalhada do seu ambiente tecnológico,
										identificando riscos ocultos, custos desnecessários e
										oportunidades de crescimento.
									</p>
								</div>
								<div className="bg-gradient-to-r from-brand-gold-500/10 to-brand-cyan-500/10 rounded-xl p-6 border border-brand-gold-500/20">
									<h3 className="text-xl font-bold mb-3 text-brand-cyan-400 flex items-center gap-2">
										<span>🎯</span> Plano de Ação com ROI Garantido
									</h3>
									<p className="leading-relaxed">
										Plano específico com projeção de economia, prazos claros e
										KPIs mensuráveis. Se não entregarmos o prometido, devolvemos
										seu investimento.
									</p>
								</div>
								<div className="bg-gradient-to-r from-brand-cyan-500/10 to-brand-gold-500/10 rounded-xl p-6 border border-brand-cyan-500/20">
									<h3 className="text-xl font-bold mb-3 text-brand-gold-400 flex items-center gap-2">
										<span>📊</span> Acompanhamento em Tempo Real
									</h3>
									<p className="leading-relaxed">
										Dashboard exclusivo mostrando economias geradas, performance
										do sistema e segurança em tempo real, para você ver
										exatamente o valor que está recebendo.
									</p>
								</div>
							</div>
						</div>
						<div className="bg-gradient-to-br from-brand-green-800/50 to-brand-gold-500/10 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
							<h3 className="text-2xl font-bold mb-6 text-white text-center">
								Impacto Real Medido
							</h3>
							<div className="grid grid-cols-1 gap-6 text-center">
								<div className="bg-brand-green-700/30 rounded-xl p-6 hover:bg-brand-green-600/30 transition-colors">
									<div className="text-4xl font-bold text-brand-gold-500 mb-3">
										R$5M+
									</div>
									<div className="text-brand-gray-300 text-sm">
										Economizados para Clientes em 13 Anos
									</div>
								</div>
								<div className="bg-brand-green-700/30 rounded-xl p-6 hover:bg-brand-green-600/30 transition-colors">
									<div className="text-4xl font-bold text-brand-gold-500 mb-3">
										35%
									</div>
									<div className="text-brand-gray-300 text-sm">
										Redução Média de Custos de TI
									</div>
								</div>
								<div className="bg-brand-green-700/30 rounded-xl p-6 hover:bg-brand-green-600/30 transition-colors">
									<div className="text-4xl font-bold text-brand-gold-500 mb-3">
										99.9%
									</div>
									<div className="text-brand-gray-300 text-sm">
										Disponibilidade Garantida
									</div>
								</div>
								<div className="bg-brand-green-700/30 rounded-xl p-6 hover:bg-brand-green-600/30 transition-colors">
									<div className="text-4xl font-bold text-brand-gold-500 mb-3">
										&lt;15min
									</div>
									<div className="text-brand-gray-300 text-sm">
										Tempo Médio de Resposta a Emergências
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Nossos Diferenciais Únicos */}
				<section className="mb-20">
					<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
						O Que Nos Torna Verdadeiramente Diferentes
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{uniqueAdvantages.map((advantage, index) => (
							<div
								key={index}
								className="group bg-gradient-to-br from-brand-green-800/30 to-brand-gold-500/10 p-8 rounded-2xl border border-white/10 hover:border-brand-gold-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
							>
								<div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
									{advantage.icon}
								</div>
								<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
									{advantage.title}
								</h3>
								<p className="text-brand-gray-300 leading-relaxed">
									{advantage.description}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Depoimentos Autênticos */}
				<section className="mb-20">
					<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
						Vozes Reais de Clientes que Transformaram seus Negócios
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-gradient-to-br from-brand-green-800/50 to-brand-cyan-500/10 p-8 rounded-2xl border border-white/10">
							<div className="text-3xl mb-4">❝</div>
							<p className="text-brand-gray-300 mb-6 leading-relaxed italic">
								"A STARK não apenas resolveu nosso problema de downtime - eles
								nos ajudaram a economizar R$120k/ano e criar um ambiente
								tecnológico que escala com nosso crescimento. A parceria
								transformou nosso negócio."
							</p>
							<div className="flex items-center">
								<div className="w-12 h-12 rounded-full bg-brand-gold-500/20 flex items-center justify-center mr-4">
									<span className="text-brand-gold-500 font-bold">JD</span>
								</div>
								<div>
									<div className="font-bold text-white">João Silva</div>
									<div className="text-sm text-brand-gold-400">
										Diretor de TI, Empresa X
									</div>
								</div>
							</div>
						</div>
						<div className="bg-gradient-to-br from-brand-green-800/50 to-brand-gold-500/10 p-8 rounded-2xl border border-white/10">
							<div className="text-3xl mb-4">❝</div>
							<p className="text-brand-gray-300 mb-6 leading-relaxed italic">
								"Com a implementação da STARK, evitamos uma multa de R$200k com
								a LGPD e criamos uma cultura de segurança que nossos clientes
								reconhecem. O ROI foi imediato e mensurável."
							</p>
							<div className="flex items-center">
								<div className="w-12 h-12 rounded-full bg-brand-cyan-500/20 flex items-center justify-center mr-4">
									<span className="text-brand-cyan-500 font-bold">MR</span>
								</div>
								<div>
									<div className="font-bold text-white">Maria Rosa</div>
									<div className="text-sm text-brand-cyan-400">
										CIO, Comércio Y
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Final com Valor */}
				<section className="text-center bg-gradient-to-r from-brand-green-800/50 via-brand-gold-500/10 to-brand-green-800/50 p-12 rounded-2xl border border-white/10 backdrop-blur-sm">
					<h2 className="text-4xl font-bold mb-6 text-white">
						Pronto para Transformar seu Negócio?
					</h2>
					<p className="text-xl text-brand-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
						Descubra exatamente como a STARK pode aumentar a segurança, reduzir
						custos e acelerar o crescimento da sua empresa com soluções
						tecnológicas inovadoras e suporte especializado.
					</p>
					<div className="flex flex-col sm:flex-row gap-6 justify-center">
						<Link
							href="/diagnostico-gratuito"
							className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-black bg-brand-gold-500 hover:bg-brand-gold-600 transition-all duration-300 shadow-lg hover:shadow-brand-gold-500/25 hover:-translate-y-1"
						>
							<span>Fazer Diagnóstico Grátis Agora</span>
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
							href="/cases-sucesso"
							className="inline-flex items-center justify-center px-8 py-4 border border-brand-gold-500 text-base font-medium rounded-xl text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300 hover:-translate-y-1"
						>
							Ver Cases do Meu Setor
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
}
