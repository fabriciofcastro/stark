"use client";

import { useState } from "react";
import Link from "next/link";

const ServicesHub = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedCompanySize, setSelectedCompanySize] = useState("all");

	// Todos os 8 serviços organizados por categoria
	const allServices = [
		// Suporte
		{
			id: "suporte-tecnico",
			title: "Suporte Técnico",
			category: "suporte",
			companySize: ["micro", "pequena", "media", "grande"],
			icon: "🛠️",
			description:
				"Atendimento presencial ou remoto para garantir que sistemas, equipamentos e redes funcionem corretamente.",
			features: [
				"Manutenção preventiva",
				"Atendimento remoto/presencial",
				"SLA claro",
			],
			link: "/suporte-tecnico",
			sla: "24h",
			price: "Sob consulta",
			badge: "Essencial",
			badgeColor: "bg-blue-500",
		},
		{
			id: "suporte-empresarial",
			title: "Suporte Empresarial",
			category: "suporte",
			companySize: ["media", "grande"],
			icon: "🏢",
			description:
				"Suporte técnico especializado 24/7 com SLA garantido e monitoramento proativo.",
			features: ["24/7 disponível", "SLA garantido", "Monitoramento proativo"],
			link: "/suporte-tecnico-empresarial",
			sla: "1h",
			price: "Sob consulta",
			badge: "Popular",
			badgeColor: "bg-green-500",
		},
		// Infraestrutura
		{
			id: "cloud-vps",
			title: "Cloud & VPS Linux",
			category: "infraestrutura",
			companySize: ["pequena", "media", "grande"],
			icon: "☁️",
			description:
				"Provisionamento, hardening e observabilidade em servidores Linux com alta disponibilidade.",
			features: [
				"99.9% disponibilidade",
				"Backups automatizados",
				"Escalabilidade",
			],
			link: "/cloud-vps-linux",
			sla: "4h",
			price: "Sob consulta",
			badge: "Novo",
			badgeColor: "bg-purple-500",
		},
		{
			id: "create-site",
			title: "Criação de Sites",
			category: "desenvolvimento",
			companySize: ["micro", "pequena", "media"],
			icon: "🌐",
			description:
				"Sites rápidos, seguros e prontos para ranquear com foco em conversão e SEO.",
			features: ["SEO otimizado", "Performance", "Responsivo"],
			link: "/create-site",
			sla: "72h",
			price: "A partir de R$ 2.500",
			badge: "Recomendado",
			badgeColor: "bg-orange-500",
		},
		// Segurança
		{
			id: "cyberseguranca",
			title: "Cibersegurança",
			category: "seguranca",
			companySize: ["pequena", "media", "grande"],
			icon: "🔒",
			description:
				"Testes de intrusão, monitoramento SOC/MDR e conformidade com LGPD.",
			features: ["Pentest completo", "Monitoramento 24/7", "Conformidade LGPD"],
			link: "/cyberseguranca",
			sla: "24h",
			price: "Sob consulta",
			badge: "Essencial",
			badgeColor: "bg-red-500",
		},
		{
			id: "governance",
			title: "Governança de TI",
			category: "governanca",
			companySize: ["media", "grande"],
			icon: "📋",
			description:
				"Estruturação de processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001.",
			features: ["COBIT & ITIL", "ISO 27001", "Gestão de riscos"],
			link: "/governance",
			sla: "48h",
			price: "Sob consulta",
			badge: "Premium",
			badgeColor: "bg-indigo-500",
		},
		// Consultoria
		{
			id: "consultoria",
			title: "Consultoria Tecnológica",
			category: "consultoria",
			companySize: ["pequena", "media", "grande"],
			icon: "💡",
			description:
				"Transformação digital e planejamento estratégico para otimizar processos e reduzir custos.",
			features: [
				"Auditoria tecnológica",
				"Roadmap estratégico",
				"ROI comprovado",
			],
			link: "/consultoria-tecnologica",
			sla: "72h",
			price: "Sob consulta",
			badge: "Recomendado",
			badgeColor: "bg-teal-500",
		},
		{
			id: "helpdesk",
			title: "Help Desk",
			category: "suporte",
			companySize: ["micro", "pequena", "media", "grande"],
			icon: "🎧",
			description:
				"Sistema de tickets, base de conhecimento e ferramentas de suporte remoto.",
			features: [
				"Sistema de tickets",
				"Base de conhecimento",
				"Suporte remoto",
			],
			link: "/helpdesk",
			sla: "4h",
			price: "Gratuito",
			badge: "Gratuito",
			badgeColor: "bg-gray-500",
		},
	];

	const categories = [
		{ id: "all", label: "Todos", count: allServices.length },
		{
			id: "suporte",
			label: "Suporte",
			count: allServices.filter((s) => s.category === "suporte").length,
		},
		{
			id: "infraestrutura",
			label: "Infraestrutura",
			count: allServices.filter((s) => s.category === "infraestrutura").length,
		},
		{
			id: "seguranca",
			label: "Segurança",
			count: allServices.filter((s) => s.category === "seguranca").length,
		},
		{
			id: "desenvolvimento",
			label: "Desenvolvimento",
			count: allServices.filter((s) => s.category === "desenvolvimento").length,
		},
		{
			id: "consultoria",
			label: "Consultoria",
			count: allServices.filter((s) => s.category === "consultoria").length,
		},
		{
			id: "governanca",
			label: "Governança",
			count: allServices.filter((s) => s.category === "governanca").length,
		},
	];

	const companySizes = [
		{ id: "all", label: "Todos os portes" },
		{ id: "micro", label: "Micro empresa (até 9 funcionários)" },
		{ id: "pequena", label: "Pequena empresa (10-49 funcionários)" },
		{ id: "media", label: "Média empresa (50-249 funcionários)" },
		{ id: "grande", label: "Grande empresa (250+ funcionários)" },
	];

	const filteredServices = allServices.filter((service) => {
		const categoryMatch =
			selectedCategory === "all" || service.category === selectedCategory;
		const sizeMatch =
			selectedCompanySize === "all" ||
			service.companySize.includes(selectedCompanySize);
		return categoryMatch && sizeMatch;
	});

	return (
		<div className="max-w-7xl mx-auto">
			{/* Header */}
			<div className="text-center mb-12">
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
					Encontre a Solução Ideal
				</h1>
				<p className="text-xl text-brand-gray-300 max-w-3xl mx-auto mb-8">
					Explore nosso catálogo completo de serviços de TI. Use os filtros para
					encontrar a solução perfeita para sua empresa.
				</p>
			</div>

			{/* Filtros */}
			<div className="bg-card rounded-xl p-6 border border-white/10 mb-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Filtro por Categoria */}
					<div>
						<label className="block text-sm font-medium text-white mb-3">
							Categoria
						</label>
						<div className="flex flex-wrap gap-2">
							{categories.map((category) => (
								<button
									key={category.id}
									onClick={() => setSelectedCategory(category.id)}
									className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
										selectedCategory === category.id
											? "bg-brand-gold-500 text-black"
											: "bg-brand-green-700/30 text-brand-gray-300 hover:bg-brand-gold-500/20"
									}`}
								>
									{category.label} ({category.count})
								</button>
							))}
						</div>
					</div>

					{/* Filtro por Porte da Empresa */}
					<div>
						<label className="block text-sm font-medium text-white mb-3">
							Porte da Empresa
						</label>
						<select
							value={selectedCompanySize}
							onChange={(e) => setSelectedCompanySize(e.target.value)}
							className="w-full bg-brand-green-700/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-brand-gold-500 focus:outline-none"
						>
							{companySizes.map((size) => (
								<option
									key={size.id}
									value={size.id}
									className="bg-brand-green-800"
								>
									{size.label}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Resultados */}
				<div className="mt-4 text-sm text-brand-gray-400">
					Mostrando {filteredServices.length} de {allServices.length} serviços
				</div>
			</div>

			{/* Grid de Serviços */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
				{filteredServices.map((service) => (
					<Link
						key={service.id}
						href={service.link}
						className="group bg-card rounded-xl p-6 border border-white/10 hover:border-brand-gold-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-gold-500/10"
					>
						<div className="relative">
							{/* Badge */}
							<div className="absolute -top-2 -right-2">
								<span
									className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${service.badgeColor}`}
								>
									{service.badge}
								</span>
							</div>

							{/* Ícone */}
							<div className="text-4xl mb-4">{service.icon}</div>

							{/* Título */}
							<h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-gold-400 transition-colors">
								{service.title}
							</h3>

							{/* Descrição */}
							<p className="text-brand-gray-300 text-sm mb-4 line-clamp-3">
								{service.description}
							</p>

							{/* Features */}
							<ul className="space-y-1 mb-4">
								{service.features.map((feature, index) => (
									<li
										key={index}
										className="flex items-center text-xs text-brand-gray-400"
									>
										<svg
											className="w-3 h-3 mr-2 text-brand-gold-500 flex-shrink-0"
											fill="currentColor"
											viewBox="0 0 20 20"
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

							{/* Info Footer */}
							<div className="flex justify-between items-center text-xs text-brand-gray-400 border-t border-white/10 pt-3">
								<span>SLA: {service.sla}</span>
								<span className="font-medium text-brand-gold-400">
									{service.price}
								</span>
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* CTA Final */}
			<div className="text-center bg-gradient-to-r from-brand-green-800/50 to-brand-green-700/50 rounded-xl p-8 border border-white/10">
				<h3 className="text-2xl font-bold text-white mb-4">
					Não encontrou o que procura?
				</h3>
				<p className="text-brand-gray-300 mb-6 max-w-2xl mx-auto">
					Nossos especialistas podem criar uma solução personalizada para suas
					necessidades específicas.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href="/contact"
						className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-brand-gold-500 hover:bg-brand-gold-600 transition-colors duration-300 shadow-lg"
					>
						Falar com Especialista
					</Link>
					<Link
						href="/faq"
						className="inline-flex items-center justify-center px-6 py-3 border border-brand-gold-500 text-base font-medium rounded-md text-brand-gold-400 hover:bg-brand-gold-500/10 transition-colors duration-300"
					>
						Ver FAQ
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ServicesHub;
