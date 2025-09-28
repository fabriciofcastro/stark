"use client";

const TechnicalExpertise = () => {
	const expertiseAreas = [
		{
			title: "Governança de TI",
			description:
				"Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST. Auditoria, gestão de riscos, LGPD e DPA.",
			services: [
				"COBIT 5 e ITIL v4 (processos e serviços)",
				"ISO 27001 (SGSI) e NIST CSF (segurança)",
				"Gestão de riscos e continuidade (BIA/DRP)",
				"Inventário, CMDB e gestão de mudanças",
				"Políticas de segurança, backup e acesso",
				"Conformidade LGPD: DPA, registro de tratamento",
			],
		},
		{
			title: "Criação de Sites",
			description:
				"Sites otimizados para performance, SEO e conversão. Landing pages, e-commerces e sistemas web personalizados.",
			services: [
				"SEO técnico e performance (Core Web Vitals)",
				"Landing pages de alta conversão",
				"E-commerces integrados",
				"Sistemas web sob medida",
				"Sites responsivos e PWA",
				"Análise e otimização de conversão",
			],
		},
		{
			title: "Engajamento Digital",
			description:
				"Estratégias completas para aumentar o engajamento e conversão dos visitantes.",
			services: [
				"Google Analytics 4 e Tag Manager",
				"A/B testing e otimização",
				"Funnels de conversão",
				"Chatbots e automação",
				"Relatórios e métricas personalizadas",
			],
		},
		{
			title: "E-mail Profissional",
			description:
				"Soluções completas de e-mail corporativo com segurança e confiabilidade.",
			services: [
				"E-mail Exchange e G Suite",
				"Configuração e migração de domínios",
				"Proteção contra SPAM e phishing",
				"Backup e recuperação de e-mails",
				"Integração com CRMs e sistemas",
			],
		},
	];

	return (
		<section className="py-20 container-px reveal">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold-500/10 border border-brand-gold-500/20 mb-6">
						<span className="text-brand-gold-400 text-sm font-medium">
							🔧 Nossa Expertise Técnica
						</span>
					</div>
					<h3 className="mb-4 font-bold text-3xl md:text-4xl text-white">
						Competências Especializadas
					</h3>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						Habilidades técnicas avançadas para resolver os desafios
						tecnológicos mais complexos
					</p>
				</div>

				{/* Expertise Areas Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{expertiseAreas.map((area, index) => (
						<div
							key={area.title}
							className="bg-gradient-to-br from-card to-brand-green-800/30 rounded-2xl p-8 border border-white/10 hover:border-brand-gold-500/30 transition-all duration-500 hover:-translate-y-2"
						>
							<h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
								<span className="text-3xl">
									{index === 0 && "📋"}
									{index === 1 && "🌐"}
									{index === 2 && "📈"}
									{index === 3 && "📧"}
								</span>
								{area.title}
							</h4>
							<p className="text-brand-gray-300 mb-6 text-sm">
								{area.description}
							</p>
							<ul className="text-sm text-brand-gray-400 space-y-2">
								{area.services.map((service) => (
									<li key={service} className="flex items-start">
										<svg
											className="w-4 h-4 mt-1 mr-3 text-brand-gold-500 flex-shrink-0"
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
										<span>{service}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* CTA */}
				<div className="mt-16 text-center">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
						<span className="text-gray-400 text-sm font-medium">
							💬 Quer saber mais sobre nossas especialidades?
						</span>
					</div>
					<h4 className="text-2xl font-bold text-white mb-4">
						Converse com um Especialista
					</h4>
					<p className="text-gray-300 mb-8 max-w-2xl mx-auto">
						Nossa equipe técnica está pronta para discutir suas necessidades
						específicas e encontrar as melhores soluções para sua empresa.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="/contact"
							className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-black bg-brand-gold-500 hover:bg-brand-gold-600 transition-all duration-300 shadow-lg hover:shadow-brand-gold-500/25 hover:-translate-y-1"
						>
							<span>Agendar Consulta Técnica</span>
							<svg
								className="w-5 h-5 ml-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</a>
						<a
							href="/services"
							className="inline-flex items-center justify-center px-8 py-4 border border-brand-gold-500 text-base font-medium rounded-xl text-brand-gold-500 hover:bg-brand-gold-500/10 transition-all duration-300 hover:-translate-y-1"
						>
							Ver Todos os Serviços
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TechnicalExpertise;
