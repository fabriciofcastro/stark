"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { MinimalistSection } from "@/components/ui/minimalist-section";
import { MinimalistCard } from "@/components/ui/minimalist-card";

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
			label: "Resolution < 4h",
			id: "sla-resolution",
			icon: "🚀",
			value: "<4h",
			target: 90,
		},
		{
			label: "Security 24/7",
			id: "sla-security",
			icon: "🛡️",
			value: "24/7",
			target: 100,
		},
	];

	// Animações dos números
	useEffect(() => {
		if (isInView) {
			const duration = 2000;
			const steps = 60;
			const stepDuration = duration / steps;

			const targets = {
				clients: 500,
				certifications: 7,
				uptime: 99.99,
				response: 15,
			};

			let step = 0;
			const interval = setInterval(() => {
				step++;
				const progress = step / steps;
				const easeOut = 1 - Math.pow(1 - progress, 3);

				setAnimatedNumbers({
					clients: Math.floor(targets.clients * easeOut),
					certifications: Math.floor(targets.certifications * easeOut),
					uptime: Number((targets.uptime * easeOut).toFixed(2)),
					response: Math.floor(targets.response * easeOut),
				});

				if (step >= steps) {
					clearInterval(interval);
					setAnimatedNumbers(targets);
				}
			}, stepDuration);

			return () => clearInterval(interval);
		}
	}, [isInView]);

	const tabs = [
		{
			id: "certifications",
			label: "Certificações",
			count: certifications.length,
		},
		{ id: "standards", label: "Padrões", count: securityStandards.length },
		{ id: "slas", label: "SLAs", count: slas.length },
	];

	return (
		<MinimalistSection
			subtitle="Confiança & Credibilidade"
			title="Números que Comprovam Nossa Excelência"
			description="Certificações internacionais, padrões de segurança e SLAs que garantem a qualidade dos nossos serviços"
		>
			<div ref={ref} className="space-y-12">
				{/* Estatísticas Principais */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<div className="text-3xl md:text-4xl font-bold text-secondary-400 mb-2">
							{animatedNumbers.clients}+
						</div>
						<div className="text-sm text-neutral-400">Clientes Atendidos</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-center"
					>
						<div className="text-3xl md:text-4xl font-bold text-accent-400 mb-2">
							{animatedNumbers.certifications}
						</div>
						<div className="text-sm text-neutral-400">Certificações</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-center"
					>
						<div className="text-3xl md:text-4xl font-bold text-success-400 mb-2">
							{animatedNumbers.uptime}%
						</div>
						<div className="text-sm text-neutral-400">Uptime</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="text-center"
					>
						<div className="text-3xl md:text-4xl font-bold text-info-400 mb-2">
							{animatedNumbers.response}min
						</div>
						<div className="text-sm text-neutral-400">Tempo de Resposta</div>
					</motion.div>
				</div>

				{/* Tabs */}
				<div className="flex flex-wrap justify-center gap-2">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
								activeTab === tab.id
									? "bg-secondary-500 text-white"
									: "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
							}`}
						>
							{tab.label} ({tab.count})
						</button>
					))}
				</div>

				{/* Conteúdo das Tabs */}
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{activeTab === "certifications" &&
						certifications.map((cert, index) => (
							<MinimalistCard
								key={index}
								title={cert.label}
								subtitle={cert.level}
								description={cert.description}
								badge={cert.verified ? "Verificado" : "Pendente"}
								badgeColor={cert.verified ? "bg-success-500" : "bg-warning-500"}
								variant="minimal"
							/>
						))}

					{activeTab === "standards" &&
						securityStandards.map((standard, index) => (
							<MinimalistCard
								key={index}
								title={standard.label}
								subtitle={standard.compliance}
								description={`Padrão de segurança ${standard.compliance}`}
								variant="minimal"
							/>
						))}

					{activeTab === "slas" &&
						slas.map((sla, index) => (
							<MinimalistCard
								key={index}
								title={sla.label}
								subtitle={sla.value}
								description={`SLA garantido de ${sla.target}%`}
								variant="minimal"
							/>
						))}
				</motion.div>
			</div>
		</MinimalistSection>
	);
}
