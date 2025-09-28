import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Portfólio | Projetos de Sucesso - STARK Gestão em Tecnologia",
	description:
		"Conheça alguns dos nossos principais projetos e cases de sucesso. Soluções em TI implementadas com excelência para empresas de diversos segmentos.",
	keywords:
		"portfólio stark, projetos TI, cases de sucesso, soluções implementadas, clientes stark, projetos tecnologia",
	robots: {
		index: true,
		follow: true,
	},
};

export default function Portfolio() {
	const projects = [
		{
			id: 1,
			title: "Migração para Cloud - Empresa de Logística",
			client: "Logística Express Ltda",
			sector: "Transporte e Logística",
			description:
				"Migração completa da infraestrutura local para nuvem AWS, resultando em 40% de redução de custos e 99.9% de disponibilidade.",
			technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
			results: [
				"40% redução de custos operacionais",
				"99.9% de disponibilidade do sistema",
				"60% melhoria na performance",
				"Escalabilidade automática implementada",
			],
			image: "/images/portfolio/cloud-migration.jpg",
			duration: "6 meses",
			team: "8 especialistas",
		},
		{
			id: 2,
			title: "Sistema de Gestão Integrado",
			client: "Indústria Metalúrgica São Paulo",
			sector: "Indústria",
			description:
				"Desenvolvimento de sistema ERP customizado integrando produção, estoque, vendas e financeiro em uma única plataforma.",
			technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
			results: [
				"30% aumento na produtividade",
				"50% redução no tempo de processos",
				"100% integração entre departamentos",
				"Relatórios em tempo real",
			],
			image: "/images/portfolio/erp-system.jpg",
			duration: "8 meses",
			team: "12 especialistas",
		},
		{
			id: 3,
			title: "Segurança da Informação - Rede de Farmácias",
			client: "Farmácia Popular Network",
			sector: "Saúde",
			description:
				"Implementação de políticas de segurança, backup automatizado e monitoramento 24/7 para rede com 50+ unidades.",
			technologies: ["Fortinet", "Veeam", "SIEM", "Active Directory"],
			results: [
				"Zero incidentes de segurança",
				"99.99% de disponibilidade",
				"Conformidade com LGPD",
				"Backup automático diário",
			],
			image: "/images/portfolio/security-project.jpg",
			duration: "4 meses",
			team: "6 especialistas",
		},
		{
			id: 4,
			title: "E-commerce B2B Personalizado",
			client: "Distribuidora de Materiais de Construção",
			sector: "Varejo",
			description:
				"Plataforma de e-commerce B2B com catálogo dinâmico, gestão de pedidos e integração com ERP existente.",
			technologies: ["Next.js", "Stripe", "MongoDB", "AWS"],
			results: [
				"200% aumento nas vendas online",
				"80% redução no tempo de pedidos",
				"Interface intuitiva para clientes",
				"Integração completa com estoque",
			],
			image: "/images/portfolio/ecommerce-project.jpg",
			duration: "5 meses",
			team: "10 especialistas",
		},
		{
			id: 5,
			title: "Automação de Processos - Escritório de Advocacia",
			client: "Advocacia & Associados",
			sector: "Jurídico",
			description:
				"Automação de processos jurídicos com workflow inteligente, gestão documental e integração com tribunais.",
			technologies: ["Power Automate", "SharePoint", "Azure", "AI/ML"],
			results: [
				"70% redução no tempo de processos",
				"Automação de 15 workflows",
				"Gestão documental centralizada",
				"Integração com tribunais",
			],
			image: "/images/portfolio/automation-project.jpg",
			duration: "3 meses",
			team: "5 especialistas",
		},
		{
			id: 6,
			title: "Infraestrutura de TI - Hospital Regional",
			client: "Hospital Regional Itaquá",
			sector: "Saúde",
			description:
				"Modernização completa da infraestrutura de TI com alta disponibilidade, backup e segurança para ambiente hospitalar.",
			technologies: ["VMware", "Cisco", "EMC", "Backup Solutions"],
			results: [
				"100% disponibilidade crítica",
				"Backup automatizado",
				"Segurança hospitalar",
				"Monitoramento 24/7",
			],
			image: "/images/portfolio/hospital-infrastructure.jpg",
			duration: "10 meses",
			team: "15 especialistas",
		},
	];

	const stats = [
		{ number: "200+", label: "Projetos Concluídos" },
		{ number: "150+", label: "Clientes Satisfeitos" },
		{ number: "99.9%", label: "Disponibilidade Média" },
		{ number: "24/7", label: "Suporte Técnico" },
	];

	return (
		<div className="container mx-auto px-4 py-16">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-5xl font-bold mb-6 text-brand-gold-500">
					Nosso Portfólio
				</h1>
				<p className="text-xl text-brand-gray-300 max-w-3xl mx-auto">
					Conheça alguns dos nossos principais projetos e cases de sucesso. Cada
					solução é desenvolvida com excelência técnica e foco em resultados.
				</p>
			</section>

			{/* Estatísticas */}
			<section className="mb-16">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{stats.map((stat) => (
						<div
							key={stat.number}
							className="bg-brand-green-800 p-6 rounded-lg text-center"
						>
							<div className="text-3xl font-bold text-brand-gold-500 mb-2">
								{stat.number}
							</div>
							<div className="text-brand-gray-300 text-sm">{stat.label}</div>
						</div>
					))}
				</div>
			</section>

			{/* Projetos */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Projetos em Destaque
				</h2>
				<div className="space-y-12">
					{projects.map((project) => (
						<div
							key={project.id}
							className={`grid lg:grid-cols-2 gap-8 items-center ${
								project.id % 2 === 0 ? "lg:grid-flow-col-dense" : ""
							}`}
						>
							<div
								className={`${project.id % 2 === 0 ? "lg:col-start-2" : ""}`}
							>
								<div className="bg-brand-green-800 p-8 rounded-lg">
									<div className="flex items-center gap-3 mb-4">
										<span className="bg-brand-gold-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
											{project.sector}
										</span>
										<span className="text-brand-gray-400 text-sm">
											{project.duration} • {project.team}
										</span>
									</div>
									<h3 className="text-2xl font-bold mb-4 text-brand-gray-200">
										{project.title}
									</h3>
									<p className="text-brand-gray-300 mb-6">
										<strong className="text-brand-gold-400">Cliente:</strong>{" "}
										{project.client}
									</p>
									<p className="text-brand-gray-300 mb-6">
										{project.description}
									</p>

									<div className="mb-6">
										<h4 className="font-semibold mb-3 text-brand-gold-400">
											Tecnologias Utilizadas:
										</h4>
										<div className="flex flex-wrap gap-2">
											{project.technologies.map((tech) => (
												<span
													key={tech}
													className="bg-brand-green-700 text-brand-cyan-400 px-3 py-1 rounded-full text-sm"
												>
													{tech}
												</span>
											))}
										</div>
									</div>

									<div>
										<h4 className="font-semibold mb-3 text-brand-gold-400">
											Principais Resultados:
										</h4>
										<ul className="space-y-2">
											{project.results.map((result) => (
												<li
													key={result}
													className="flex items-start gap-2 text-brand-gray-300"
												>
													<span className="text-brand-green-500 mt-1">✓</span>
													<span>{result}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div
								className={`${project.id % 2 === 0 ? "lg:col-start-1" : ""}`}
							>
								<div className="bg-brand-green-900 p-8 rounded-lg text-center">
									<div className="text-6xl mb-4">📊</div>
									<h4 className="text-xl font-bold mb-4 text-brand-gold-400">
										Projeto #{project.id}
									</h4>
									<p className="text-brand-gray-300 mb-6">
										Este projeto demonstra nossa capacidade de entregar soluções
										personalizadas que geram resultados mensuráveis.
									</p>
									<div className="bg-brand-green-800 p-4 rounded-lg">
										<div className="text-2xl font-bold text-brand-gold-500 mb-2">
											{project.results[0]}
										</div>
										<div className="text-brand-gray-300 text-sm">
											Principal benefício alcançado
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Setores Atendidos */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Setores que Atendemos
				</h2>
				<div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
					{[
						{ name: "Indústria", icon: "🏭", projects: "45+" },
						{ name: "Varejo", icon: "🛒", projects: "38+" },
						{ name: "Saúde", icon: "🏥", projects: "32+" },
						{ name: "Educação", icon: "🎓", projects: "28+" },
						{ name: "Jurídico", icon: "⚖️", projects: "25+" },
						{ name: "Logística", icon: "🚚", projects: "22+" },
						{ name: "Financeiro", icon: "🏦", projects: "18+" },
						{ name: "Serviços", icon: "🔧", projects: "15+" },
					].map((sector) => (
						<div
							key={sector.name}
							className="bg-brand-green-800 p-6 rounded-lg text-center"
						>
							<div className="text-3xl mb-3">{sector.icon}</div>
							<h3 className="font-bold mb-2 text-brand-gold-400">
								{sector.name}
							</h3>
							<p className="text-brand-gray-300 text-sm">
								{sector.projects} projetos
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Testimonials */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					O que Nossos Clientes Dizem
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-brand-green-800 p-6 rounded-lg">
						<div className="text-brand-gold-500 mb-4">⭐⭐⭐⭐⭐</div>
						<p className="text-brand-gray-300 mb-4 italic">
							"A STARK transformou nossa infraestrutura de TI. A migração para
							nuvem resultou em economia significativa e melhor performance."
						</p>
						<div className="text-brand-gold-400 font-semibold">
							Carlos Silva, CEO
						</div>
						<div className="text-brand-gray-400 text-sm">
							Logística Express Ltda
						</div>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg">
						<div className="text-brand-gold-500 mb-4">⭐⭐⭐⭐⭐</div>
						<p className="text-brand-gray-300 mb-4 italic">
							"Excelente atendimento e conhecimento técnico. O sistema ERP
							customizado superou nossas expectativas."
						</p>
						<div className="text-brand-gold-400 font-semibold">
							Maria Santos, Diretora
						</div>
						<div className="text-brand-gray-400 text-sm">
							Indústria Metalúrgica SP
						</div>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg">
						<div className="text-brand-gold-500 mb-4">⭐⭐⭐⭐⭐</div>
						<p className="text-brand-gray-300 mb-4 italic">
							"Suporte técnico 24/7 e soluções inovadoras. Parceiros
							estratégicos no crescimento do nosso negócio."
						</p>
						<div className="text-brand-gold-400 font-semibold">
							João Oliveira, Gerente
						</div>
						<div className="text-brand-gray-400 text-sm">
							Farmácia Popular Network
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="text-center bg-brand-green-800 p-12 rounded-lg">
				<h2 className="text-3xl font-bold mb-6 text-brand-gray-200">
					Próximo Projeto de Sucesso Pode Ser o Seu
				</h2>
				<p className="text-xl text-brand-gray-300 mb-8 max-w-2xl mx-auto">
					Entre em contato conosco e vamos discutir como podemos ajudar sua
					empresa a alcançar resultados similares.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/contact"
						className="bg-brand-gold-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold-400 transition-colors"
					>
						Solicitar Proposta
					</a>
					<a
						href="/services"
						className="border border-brand-gold-500 text-brand-gold-500 px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold-500 hover:text-black transition-colors"
					>
						Ver Serviços
					</a>
				</div>
			</section>
		</div>
	);
}
