"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export function TrustSection() {
	const [activeTab, setActiveTab] = useState("certifications");
	const [animatedNumbers, setAnimatedNumbers] = useState({
		clients: 0,
		certifications: 0,
		uptime: 0,
		response: 0,
	});

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const controls = useAnimation();

	// Dados atualizados para criar uma experiência mais impressionante
	const certifications = [
		{
			label: "ISO 27001",
			id: "iso",
			icon: "🔒",
			description: "Gestão de Segurança da Informação",
			level: "Internacional",
			verified: true,
		},
		{
			label: "SOC 2 Type II",
			id: "soc2",
			icon: "🛡️",
			description: "Controles de Segurança e Privacidade",
			level: "EUA",
			verified: true,
		},
		{
			label: "PCI DSS",
			id: "pci",
			icon: "💳",
			description: "Segurança em Pagamentos",
			level: "Global",
			verified: true,
		},
		{
			label: "LGPD Compliant",
			id: "lgpd",
			icon: "📋",
			description: "Proteção de Dados Pessoais",
			level: "Brasil",
			verified: true,
		},
		{
			label: "COBIT 5",
			id: "cobit",
			icon: "⚙️",
			description: "Governança de TI",
			level: "Global",
			verified: true,
		},
		{
			label: "ITIL v4",
			id: "itil",
			icon: "🔄",
			description: "Melhores Práticas de TI",
			level: "Global",
			verified: true,
		},
		{
			label: "NIST CSF",
			id: "nist",
			icon: "🔬",
			description: "Framework de Cibersegurança",
			level: "Global",
			verified: true,
		},
	];

	const securityStandards = [
		{ label: "SSL/TLS 1.3", id: "ssl", icon: "🔐", compliance: "PCI" },
		{ label: "2FA/MFA", id: "mfa", icon: "🔑", compliance: "ISO" },
		{ label: "GDPR Aligned", id: "gdpr", icon: "🌍", compliance: "EU" },
		{ label: "HIPAA Ready", id: "hipaa", icon: "🏥", compliance: "EUA" },
	];

	const slas = [
		{
			label: "99.99% Uptime",
			id: "sla-uptime",
			icon: "⚡",
			value: "99.99",
			target: 99.99,
		},
		{
			label: "Response < 15min",
			id: "sla-response",
			icon: "⏱️",
			value: "<15min",
			target: 95,
		},
		{
			label: "24/7 Support",
			id: "sla-monitoring",
			icon: "📡",
			value: "24/7",
			target: 100,
		},
		{ label: "RTO 2h", id: "sla-rto", icon: "🔄", value: "2h", target: 98 },
	];

	const testimonials = [
		{
			author: "CIO — Empresa Fortune 1000",
			text: "A implementação de governança de TI reduziu nossos incidentes em 70% e aumentou a previsibilidade dos nossos investimentos em 40%, gerando economia de mais de R$2M anualmente.",
			id: "testimonial-1",
			company: "Fortune 1000",
			investment: "R$2M+",
			impact: "70% redução em incidentes",
		},
		{
			author: "Diretor de Infra — Grupo Industrial",
			text: "Após a implementação de segurança proativa, não tivemos nenhum incidente crítico por mais de 18 meses. O sistema de monitoramento e resposta automatizado superou nossas expectativas.",
			id: "testimonial-2",
			company: "Grupo Industrial",
			period: "18 meses",
			impact: "Zero incidentes críticos",
		},
	];

	const stats = [
		{
			value: 500,
			label: "Empresas Atendidas",
			suffix: "+",
			icon: "🏢",
			description: "Diversas indústrias e setores",
		},
		{
			value: 99.99,
			label: "Uptime Médio",
			suffix: "%",
			icon: "⚡",
			description: "Disponibilidade garantida",
		},
		{
			value: 15,
			label: "Minutos de Resposta",
			suffix: "avg",
			icon: "⏱️",
			description: "Resposta rápida a incidentes",
		},
		{
			value: 24,
			label: "Suporte 24/7",
			suffix: "/7",
			icon: "📡",
			description: "Suporte contínuo",
		},
	];

	// Animação dos números - agora com efeito de contagem mais refinado
	useEffect(() => {
		if (!isInView) return;

		const duration = 2000; // 2 segundos
		const frameDuration = 1000 / 60; // ~60fps
		const steps = Math.ceil(duration / frameDuration);
		let currentStep = 0;

		const timer = setInterval(() => {
			currentStep++;

			if (currentStep > steps) {
				setAnimatedNumbers({
					clients: 500,
					certifications: 25,
					uptime: 99.99,
					response: 15,
				});
				clearInterval(timer);
				return;
			}

			const progress = currentStep / steps;
			setAnimatedNumbers({
				clients: Math.floor(500 * progress),
				certifications: Math.floor(25 * progress),
				uptime: Math.round(99.99 * progress * 100) / 100,
				response: Math.floor(15 * progress),
			});
		}, frameDuration);
	}, [isInView]);

	// Efeitos de animação para quando a seção entra na viewport
	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [isInView, controls]);

	const tabContent = {
		certifications: certifications,
		standards: securityStandards,
		slas: slas,
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 200,
			},
		},
	};

	return (
		<section ref={ref} className="container-px py-16 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 -z-10">
				<div
					className="absolute top-1/4 left-1/5 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "0s" }}
				></div>
				<div
					className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "2s" }}
				></div>
				<div
					className="absolute top-1/3 right-1/4 w-64 h-64 bg-brand-gold-500/3 rounded-full blur-2xl animate-pulse"
					style={{ animationDelay: "1s" }}
				></div>
				<div
					className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-brand-gold-500/3 rounded-full blur-2xl animate-pulse"
					style={{ animationDelay: "3s" }}
				></div>
			</div>

			<div className="mx-auto max-w-7xl">
				{/* Header com animação melhorada */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="mb-16 text-center relative"
				>
					<div className="absolute inset-x-0 -top-20 h-px bg-gradient-to-r from-transparent via-brand-gold-500/30 to-transparent"></div>
					<div className="absolute inset-x-0 -bottom-20 h-px bg-gradient-to-r from-transparent via-brand-gold-500/30 to-transparent"></div>
					<motion.h3
						className="mb-4 text-4xl md:text-5xl font-bold text-white relative z-10"
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Confiável por{" "}
						<span className="text-brand-gold-500 relative">
							Grandes Corporações
							<motion.span
								className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold-500 rounded-full"
								animate={{ scale: [1, 1.5, 1] }}
								transition={{ duration: 2, repeat: Infinity }}
							/>
						</span>
					</motion.h3>
					<motion.p
						className="mx-auto max-w-3xl text-lg text-gray-300 relative z-10"
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						Certificações internacionais, práticas de segurança avançadas e SLAs
						rigorosos que garantem a proteção dos seus ativos mais valiosos.
					</motion.p>
				</motion.div>

				{/* Stats Section com animações avançadas */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
				>
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							whileHover={{
								y: -10,
								scale: 1.03,
								boxShadow:
									"0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
							}}
							className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10 hover:border-brand-gold-500/30 transition-all duration-500 group overflow-hidden"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-brand-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-500/5 rounded-full -mr-16 -mt-16 group-hover:animate-pulse-slow"></div>
							<div className="relative z-10">
								<div className="flex items-center justify-center mb-3">
									<motion.span
										className="text-2xl text-brand-gold-500"
										whileHover={{ rotate: 360 }}
										transition={{ duration: 0.5 }}
									>
										{stat.icon}
									</motion.span>
								</div>
								<motion.div
									className="text-3xl md:text-4xl font-bold text-brand-gold-500 mb-2 text-center"
									initial={{ opacity: 0 }}
									animate={isInView ? { opacity: 1 } : {}}
									transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
								>
									{index === 0 && animatedNumbers.clients}
									{index === 1 && animatedNumbers.uptime}
									{index === 2 && animatedNumbers.response}
									{index === 3 && stat.value}
									{stat.suffix}
								</motion.div>
								<div className="text-center text-white font-medium mb-1">
									{stat.label}
								</div>
								<div className="text-center text-gray-400 text-sm">
									{stat.description}
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Tabs Navigation com efeito especial */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="relative mb-12"
				>
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold-500/10 to-transparent h-12 transform -skew-x-12"></div>
					<div className="relative flex justify-center">
						<div className="inline-flex p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
							{[
								{ id: "certifications", label: "Certificações", icon: "🔒" },
								{ id: "standards", label: "Padrões", icon: "✅" },
								{ id: "slas", label: "SLAs", icon: "📈" },
							].map((tab) => (
								<motion.button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative ${
										activeTab === tab.id
											? "bg-brand-gold-500 text-black z-10"
											: "text-gray-300 hover:text-white z-0"
									}`}
								>
									{activeTab === tab.id && (
										<motion.div
											layoutId="tabIndicator"
											className="absolute inset-0 bg-brand-gold-500 -z-10 rounded-xl"
											initial={false}
											transition={{
												type: "spring",
												bounce: 0.2,
												duration: 0.6,
											}}
										/>
									)}
									<span className="mr-2">{tab.icon}</span>
									{tab.label}
								</motion.button>
							))}
						</div>
					</div>
				</motion.div>

				{/* Tab Content com efeitos avançados */}
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-16"
				>
					{activeTab === "certifications" && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{tabContent.certifications.map((cert, index) => (
								<motion.div
									key={cert.id}
									initial={{ opacity: 0, y: 30 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									whileHover={{
										y: -10,
										scale: 1.02,
										boxShadow:
											"0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
									}}
									className="relative p-8 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/10 hover:border-brand-gold-500/50 transition-all duration-500 group overflow-hidden"
								>
									<div className="absolute inset-0 bg-gradient-to-br from-brand-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
									<div className="relative z-10">
										<div className="flex items-center mb-4">
											<motion.span
												className="text-3xl mr-3"
												whileHover={{ rotate: 360 }}
												transition={{ duration: 0.5 }}
											>
												{cert.icon}
											</motion.span>
											<div>
												<h4 className="text-white font-semibold text-lg">
													{cert.label}
												</h4>
												<span className="text-xs text-brand-gold-400">
													{cert.level}
												</span>
											</div>
										</div>
										<p className="text-gray-400 text-sm mb-4">
											{cert.description}
										</p>
										<div className="flex items-center justify-between">
											<span className="text-xs text-brand-gold-500">
												Auditoria anual
											</span>
											{cert.verified && (
												<motion.div
													className="w-8 h-8 rounded-full bg-brand-gold-500/20 flex items-center justify-center group-hover:bg-brand-gold-500 transition-colors"
													whileHover={{ scale: 1.2 }}
													whileTap={{ scale: 0.9 }}
												>
													<svg
														className="w-4 h-4 text-brand-gold-500 group-hover:text-black"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M5 13l4 4L19 7"
														/>
													</svg>
												</motion.div>
											)}
										</div>
									</div>
									<div className="absolute top-0 right-0 w-20 h-20 bg-brand-gold-500/10 rounded-full -mr-10 -mt-10 group-hover:animate-pulse-slow"></div>
								</motion.div>
							))}
						</div>
					)}

					{activeTab === "standards" && (
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							{tabContent.standards.map((standard, index) => (
								<motion.div
									key={standard.id}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={isInView ? { opacity: 1, scale: 1 } : {}}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									whileHover={{
										scale: 1.1,
										rotate: 5,
										boxShadow:
											"0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
									}}
									className="relative p-8 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/10 hover:border-brand-gold-500/50 text-center transition-all duration-500 group overflow-hidden"
								>
									<div className="absolute inset-0 bg-gradient-to-br from-brand-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
									<div className="relative z-10">
										<motion.div
											className="text-4xl mb-3"
											whileHover={{ scale: 1.2 }}
										>
											{standard.icon}
										</motion.div>
										<h5 className="text-white font-semibold">
											{standard.label}
										</h5>
										<div className="text-xs mt-2 text-brand-gold-400">
											{standard.compliance}
										</div>
									</div>
									<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold-500/0 via-brand-gold-500/5 to-brand-gold-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								</motion.div>
							))}
						</div>
					)}

					{activeTab === "slas" && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{tabContent.slas.map((sla, index) => (
								<motion.div
									key={sla.id}
									initial={{ opacity: 0, y: 30 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									whileHover={{
										y: -10,
										scale: 1.02,
										boxShadow:
											"0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
									}}
									className="relative p-8 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/10 hover:border-brand-gold-500/50 text-center transition-all duration-500 group overflow-hidden"
								>
									<div className="absolute inset-0 bg-gradient-to-br from-brand-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
									<div className="relative z-10">
										<motion.div
											className="text-4xl mb-4"
											whileHover={{ scale: 1.2, rotate: 15 }}
										>
											{sla.icon}
										</motion.div>
										<div className="text-3xl font-bold text-brand-gold-500 mb-3">
											{sla.value}
										</div>
										<h5 className="text-white font-semibold mb-4">
											{sla.label}
										</h5>
										<div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
											<motion.div
												className="h-full bg-gradient-to-r from-brand-gold-500 to-brand-gold-400 rounded-full"
												initial={{ width: 0 }}
												animate={isInView ? { width: `${sla.target}%` } : {}}
												transition={{
													duration: 1.5,
													delay: 0.5 + index * 0.2,
													ease: "easeOut",
												}}
											></motion.div>
										</div>
										<div className="mt-2 text-xs text-gray-400">
											{sla.target}% atingido
										</div>
									</div>
									<div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-transparent via-brand-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
								</motion.div>
							))}
						</div>
					)}
				</motion.div>

				{/* Client Logos - Carrossel interativo com efeito especial */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="mb-16"
				>
					<motion.h4
						className="text-center text-xl font-semibold text-white mb-12"
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1 } : {}}
						transition={{ duration: 0.8, delay: 0.5 }}
					>
						Empresas que confiam em nosso trabalho
					</motion.h4>
					<div className="relative overflow-hidden py-8 px-4 rounded-3xl bg-gradient-to-r from-brand-green-900/20 to-brand-gold-900/20 border border-white/10">
						<div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0c1916] to-transparent z-10"></div>
						<div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0c1916] to-transparent z-10"></div>
						<div className="flex animate-scroll whitespace-nowrap justify-around">
							{[...Array(3)].map((_, arrayIndex) => (
								<div key={arrayIndex} className="flex items-center">
									{[
										"Fortune 500",
										"Indústria Líder",
										"Grupo Financeiro",
										"Varejo Nacional",
										"StartUp Unicorn",
										"Empresa Estatal",
									].map((company, index) => (
										<motion.div
											key={`${arrayIndex}-${index}`}
											whileHover={{ scale: 1.1, rotate: 5 }}
											className="mx-8 flex items-center group"
										>
											<div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-gold-500/20 to-brand-gold-600/20 flex items-center justify-center mr-4 group-hover:shadow-lg group-hover:shadow-brand-gold-500/30 transition-all duration-300">
												<span className="text-brand-gold-500 font-bold text-lg">
													{company[0]}
												</span>
											</div>
											<span className="text-white font-medium text-lg group-hover:text-brand-gold-500 transition-colors">
												{company}
											</span>
										</motion.div>
									))}
								</div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Testimonials com efeitos especiais */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					<motion.h4
						className="text-center text-xl font-semibold text-white mb-12"
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1 } : {}}
						transition={{ duration: 0.8, delay: 0.7 }}
					>
						Cases de Sucesso Corporativo
					</motion.h4>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={testimonial.id}
								initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{ duration: 0.8, delay: 0.2 * index }}
								whileHover={{
									y: -10,
									scale: 1.02,
									boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
								}}
								className="relative p-10 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/10 hover:border-brand-gold-500/50 transition-all duration-500 group overflow-hidden"
							>
								<div className="absolute inset-0 bg-gradient-to-br from-brand-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								<div className="absolute top-4 right-4 w-24 h-24 bg-brand-gold-500/5 rounded-full blur-xl group-hover:animate-pulse-slow"></div>
								<div className="relative z-10">
									<div className="flex items-start mb-6">
										<div className="text-4xl mr-3 text-brand-gold-500">"</div>
										<p className="text-gray-300 text-lg flex-1">
											{testimonial.text}
										</p>
									</div>
									<div className="flex justify-between items-center pt-6 border-t border-white/20">
										<div>
											<div className="font-bold text-white text-lg">
												{testimonial.author}
											</div>
											<div className="text-sm text-brand-gold-500 mt-1">
												{testimonial.impact}
											</div>
											{testimonial.investment && (
												<div className="text-sm text-brand-gold-400 mt-1">
													{testimonial.investment} economizados
												</div>
											)}
											{testimonial.period && (
												<div className="text-sm text-brand-gold-400 mt-1">
													{testimonial.period} sem incidentes
												</div>
											)}
										</div>
										<motion.div
											className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-gold-500/20 to-brand-gold-600/20 flex items-center justify-center"
											whileHover={{ scale: 1.1, rotate: 360 }}
											transition={{ duration: 0.5 }}
										>
											<span className="text-brand-gold-500 font-bold text-lg">
												{testimonial.company[0]}
											</span>
										</motion.div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Call to Action com efeito especial */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.8 }}
					className="mt-20 text-center"
				>
					<div className="relative inline-flex items-center gap-6 p-8 rounded-3xl bg-gradient-to-r from-brand-gold-500/10 via-brand-green-500/10 to-brand-gold-500/10 border border-brand-gold-500/30 backdrop-blur-sm">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold-500/10 to-transparent animate-pulse"></div>
						<div className="relative z-10 text-center">
							<div className="text-5xl mb-4">🏆</div>
							<motion.h4
								className="text-2xl font-bold text-white mb-2"
								initial={{ opacity: 0 }}
								animate={isInView ? { opacity: 1 } : {}}
								transition={{ duration: 0.8, delay: 0.9 }}
							>
								Nossa Garantia de Excelência
							</motion.h4>
							<motion.p
								className="text-gray-300 max-w-md mx-auto"
								initial={{ opacity: 0 }}
								animate={isInView ? { opacity: 1 } : {}}
								transition={{ duration: 0.8, delay: 1.0 }}
							>
								SLAs rigorosos com penalidades contratuais por descumprimento
							</motion.p>
						</div>
						<motion.button
							whileHover={{
								scale: 1.05,
								boxShadow:
									"0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
							}}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-4 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-black font-bold rounded-xl transition-all duration-300 relative overflow-hidden"
						>
							<span className="relative z-10">Ver todos os SLAs</span>
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
						</motion.button>
					</div>
				</motion.div>
			</div>

			<style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
		</section>
	);
}
