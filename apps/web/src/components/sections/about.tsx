"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MinimalistSection } from "@/components/ui/minimalist-section";
import { MinimalistCard } from "@/components/ui/minimalist-card";

const About = () => {
	const [activeStat, setActiveStat] = useState(0);

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
			value: "R$ 2.1M economizados anualmente",
		},
		{
			number: "99.9%",
			label: "Disponibilidade Garantida",
			icon: "⚡",
			description: "Uptime que mantém seu negócio funcionando sem interrupções",
			value: "99.9% uptime SLA com penalidades contratuais",
		},
		{
			number: "<15min",
			label: "Tempo de Resposta Emergencial",
			icon: "🎯",
			description: "Suporte imediato para críticos que afetam sua operação",
			value: "Resposta garantida em <15 minutos para emergências",
		},
		{
			number: "150+",
			label: "Empresas Transformadas",
			icon: "🚀",
			description:
				"Parcerias que geraram crescimento real e segurança comprovada",
			value: "Empresas de todos os portes e segmentos",
		},
	];

	const values = [
		{
			title: "Excelência Técnica",
			description:
				"Conhecimento profundo em tecnologias emergentes e melhores práticas do mercado",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Excelência</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			),
		},
		{
			title: "Inovação Contínua",
			description:
				"Sempre buscando novas soluções e tecnologias para otimizar seus processos",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Inovação</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
				</svg>
			),
		},
		{
			title: "Parceria Estratégica",
			description:
				"Relacionamento de longo prazo baseado em confiança e resultados mensuráveis",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Ícone de Parceria</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
			),
		},
		{
			title: "Segurança Total",
			description:
				"Proteção completa dos seus dados e infraestrutura com conformidade total",
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
		},
	];

	return (
		<MinimalistSection
			subtitle="Sobre Nós"
			title="Transformando Negócios Através da Tecnologia"
			description="Somos especialistas em soluções tecnológicas que impulsionam o crescimento e garantem a segurança do seu negócio"
		>
			<div className="space-y-16">
				{/* Estatísticas de Impacto */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{impactStats.map((stat, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className={`text-center p-6 rounded-xl border transition-all duration-300 ${
								activeStat === index
									? "border-secondary-500/50 bg-secondary-500/10"
									: "border-white/10 bg-neutral-900/30"
							}`}
						>
							<div className="text-3xl mb-2">{stat.icon}</div>
							<div className="text-2xl font-bold text-white mb-2">
								{stat.number}
							</div>
							<div className="text-sm font-medium text-neutral-300 mb-2">
								{stat.label}
							</div>
							<div className="text-xs text-neutral-400">{stat.value}</div>
						</motion.div>
					))}
				</div>

				{/* Nossos Valores */}
				<div>
					<h3 className="text-2xl font-bold text-white text-center mb-8">
						Nossos Valores
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{values.map((value, index) => (
							<MinimalistCard
								key={index}
								title={value.title}
								description={value.description}
								icon={value.icon}
								variant="minimal"
								className="h-full"
							/>
						))}
					</div>
				</div>

				{/* Nossa História */}
				<div className="mt-16">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<h3 className="text-3xl font-bold text-white mb-6">
								Nossa História de <span className="text-secondary-400">Sucesso</span>
							</h3>
							<div className="space-y-4 text-neutral-300">
								<p className="text-lg leading-relaxed">
									Fundada em 2018, a STARK nasceu da visão de democratizar o acesso à tecnologia de ponta para empresas de todos os portes. Nossa missão é transformar ideias em realidade digital.
								</p>
								<p className="text-lg leading-relaxed">
									Com mais de 5 anos de experiência, já atendemos mais de 150 empresas, desde startups inovadoras até grandes corporações, sempre com foco em resultados mensuráveis e parcerias duradouras.
								</p>
								<div className="flex items-center space-x-4 mt-6">
									<div className="flex items-center space-x-2">
										<div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
										<span className="text-sm font-medium text-white">5+ Anos de Experiência</span>
									</div>
									<div className="flex items-center space-x-2">
										<div className="w-3 h-3 bg-accent-500 rounded-full"></div>
										<span className="text-sm font-medium text-white">150+ Empresas Atendidas</span>
									</div>
								</div>
							</div>
						</div>
						<div className="relative">
							<div className="bg-gradient-to-br from-primary-800/30 to-accent-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
								<h4 className="text-xl font-bold text-white mb-4">Nossa Missão</h4>
								<p className="text-neutral-300 mb-6">
									Democratizar o acesso à tecnologia de ponta, oferecendo soluções inovadoras que impulsionam o crescimento e a transformação digital das empresas.
								</p>
								<h4 className="text-xl font-bold text-white mb-4">Nossa Visão</h4>
								<p className="text-neutral-300">
									Ser a referência em tecnologia e inovação, reconhecida pela excelência técnica e pelo impacto positivo na transformação digital do Brasil.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Call to Action */}
				<div className="text-center mt-16">
					<div className="bg-gradient-to-r from-primary-900/50 to-accent-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
						<h3 className="text-2xl font-bold text-white mb-4">
							Pronto para Transformar Seu Negócio?
						</h3>
						<p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
							Entre em contato conosco e descubra como podemos ajudar sua
							empresa a alcançar novos patamares de eficiência e segurança.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="/sobre"
								className="inline-flex items-center justify-center px-6 py-3 bg-secondary-500 text-white font-medium rounded-lg hover:bg-secondary-600 transition-colors duration-300"
							>
								Conheça Nossa História
							</a>
							<a
								href="/contact"
								className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300"
							>
								Fale Conosco
							</a>
							<a
								href="/services"
								className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300"
							>
								Ver Serviços
							</a>
						</div>
					</div>
				</div>
			</div>
		</MinimalistSection>
	);
};

export default About;
