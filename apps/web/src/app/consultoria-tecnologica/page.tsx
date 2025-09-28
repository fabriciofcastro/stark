import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Consultoria Tecnológica Estratégica | STARK Gestão em Tecnologia",
	description:
		"Consultoria tecnológica estratégica para transformação digital. Análise de processos, otimização de TI, planejamento estratégico e implementação de soluções inovadoras.",
	keywords:
		"consultoria tecnológica, transformação digital, estratégia TI, otimização processos, planejamento tecnológico, inovação empresarial",
	robots: {
		index: true,
		follow: true,
	},
};

export default function ConsultoriaTecnologica() {
	const services = [
		{
			title: "Auditoria Tecnológica",
			icon: "🔍",
			description:
				"Análise completa da infraestrutura atual e identificação de oportunidades",
			features: [
				"Mapeamento da infraestrutura atual",
				"Análise de vulnerabilidades de segurança",
				"Identificação de gargalos de performance",
				"Relatório detalhado com recomendações",
			],
		},
		{
			title: "Planejamento Estratégico",
			icon: "📋",
			description:
				"Desenvolvimento de roadmap tecnológico alinhado aos objetivos de negócio",
			features: [
				"Roadmap de TI de 3-5 anos",
				"Alinhamento com estratégia empresarial",
				"Priorização de investimentos",
				"Cronograma de implementação",
			],
		},
		{
			title: "Transformação Digital",
			icon: "🚀",
			description:
				"Modernização de processos e implementação de tecnologias inovadoras",
			features: [
				"Automação de processos",
				"Migração para soluções modernas",
				"Capacitação de equipes",
				"Acompanhamento de resultados",
			],
		},
		{
			title: "Governança de TI",
			icon: "⚖️",
			description:
				"Estruturação de políticas e processos para gestão eficiente de TI",
			features: [
				"Políticas de segurança e uso",
				"Processos de aprovação e controle",
				"Métricas de performance",
				"Compliance e conformidade",
			],
		},
	];

	const methodologies = [
		{
			phase: "1. Análise",
			title: "Diagnóstico Completo",
			description:
				"Mapeamos sua infraestrutura atual, processos e necessidades",
			deliverables: [
				"Auditoria técnica detalhada",
				"Análise de gaps tecnológicos",
				"Benchmarking com mercado",
				"Relatório executivo",
			],
		},
		{
			phase: "2. Estratégia",
			title: "Planejamento Estratégico",
			description: "Desenvolvemos um plano personalizado para seus objetivos",
			deliverables: [
				"Roadmap tecnológico",
				"Análise de ROI",
				"Cronograma de implementação",
				"Plano de investimentos",
			],
		},
		{
			phase: "3. Implementação",
			title: "Execução Orientada",
			description: "Acompanhamos a implementação garantindo o sucesso",
			deliverables: [
				"Gestão de projetos",
				"Suporte na implementação",
				"Treinamento de equipes",
				"Acompanhamento semanal",
			],
		},
		{
			phase: "4. Otimização",
			title: "Melhoria Contínua",
			description: "Monitoramos resultados e otimizamos continuamente",
			deliverables: [
				"Métricas de performance",
				"Relatórios mensais",
				"Ajustes e melhorias",
				"Suporte contínuo",
			],
		},
	];

	const benefits = [
		{
			title: "Redução de Custos",
			description:
				"Identificação de oportunidades de economia e otimização de investimentos",
			icon: "💰",
			percentage: "30%",
		},
		{
			title: "Aumento de Produtividade",
			description:
				"Automação de processos e eliminação de gargalos operacionais",
			icon: "⚡",
			percentage: "40%",
		},
		{
			title: "Melhoria de Segurança",
			description:
				"Implementação de políticas e controles de segurança robustos",
			icon: "🔒",
			percentage: "95%",
		},
		{
			title: "Inovação Tecnológica",
			description: "Adoção de tecnologias modernas e competitivas",
			icon: "🚀",
			percentage: "200%",
		},
	];

	return (
		<div className="container mx-auto px-4 py-16">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-5xl font-bold mb-6 text-brand-gold-500">
					Consultoria Tecnológica Estratégica
				</h1>
				<p className="text-xl text-brand-gray-300 max-w-3xl mx-auto">
					Transforme sua empresa através da tecnologia. Nossa consultoria
					estratégica ajuda você a tomar decisões inteligentes, otimizar
					processos e implementar soluções inovadoras.
				</p>
			</section>

			{/* Services Overview */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Nossos Serviços de Consultoria
				</h2>
				<div className="grid md:grid-cols-2 gap-8">
					{services.map((service, index) => (
						<div key={index} className="bg-brand-green-800 p-8 rounded-lg">
							<div className="flex items-center gap-4 mb-6">
								<span className="text-4xl">{service.icon}</span>
								<div>
									<h3 className="text-xl font-bold text-brand-gold-400">
										{service.title}
									</h3>
									<p className="text-brand-gray-300 text-sm">
										{service.description}
									</p>
								</div>
							</div>
							<ul className="space-y-3">
								{service.features.map((feature, featureIndex) => (
									<li
										key={featureIndex}
										className="flex items-start gap-2 text-brand-gray-300"
									>
										<span className="text-brand-green-500 mt-1">✓</span>
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			{/* Methodologies */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Nossa Metodologia
				</h2>
				<div className="space-y-8">
					{methodologies.map((method, index) => (
						<div key={index} className="grid lg:grid-cols-3 gap-8 items-center">
							<div className="lg:col-span-1">
								<div className="bg-brand-gold-500 text-black p-6 rounded-lg text-center">
									<div className="text-2xl font-bold mb-2">{method.phase}</div>
									<h3 className="text-xl font-bold">{method.title}</h3>
								</div>
							</div>
							<div className="lg:col-span-2">
								<div className="bg-brand-green-800 p-6 rounded-lg">
									<p className="text-brand-gray-300 mb-4">
										{method.description}
									</p>
									<h4 className="font-semibold mb-3 text-brand-gold-400">
										Principais Entregas:
									</h4>
									<ul className="grid md:grid-cols-2 gap-2">
										{method.deliverables.map(
											(deliverable, deliverableIndex) => (
												<li
													key={deliverableIndex}
													className="flex items-start gap-2 text-brand-gray-300 text-sm"
												>
													<span className="text-brand-green-500 mt-1">•</span>
													<span>{deliverable}</span>
												</li>
											),
										)}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Benefits */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Resultados Esperados
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{benefits.map((benefit, index) => (
						<div
							key={index}
							className="bg-brand-green-800 p-6 rounded-lg text-center"
						>
							<div className="text-4xl mb-4">{benefit.icon}</div>
							<div className="text-3xl font-bold text-brand-gold-500 mb-2">
								{benefit.percentage}
							</div>
							<h3 className="text-lg font-bold mb-3 text-brand-gold-400">
								{benefit.title}
							</h3>
							<p className="text-brand-gray-300 text-sm">
								{benefit.description}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Case Study */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Case de Sucesso
				</h2>
				<div className="bg-brand-green-800 p-8 rounded-lg">
					<div className="grid lg:grid-cols-2 gap-8">
						<div>
							<h3 className="text-2xl font-bold mb-4 text-brand-gold-400">
								Transformação Digital - Indústria Metalúrgica
							</h3>
							<div className="space-y-4 text-brand-gray-300">
								<p>
									<strong className="text-brand-gold-400">Desafio:</strong>
									Sistema legado causando lentidão e perda de competitividade.
								</p>
								<p>
									<strong className="text-brand-gold-400">Solução:</strong>
									Auditoria completa, planejamento estratégico e migração para
									sistema moderno.
								</p>
								<p>
									<strong className="text-brand-gold-400">Resultados:</strong>
								</p>
								<ul className="list-disc pl-6 space-y-2">
									<li>40% aumento na produtividade</li>
									<li>60% redução no tempo de processos</li>
									<li>30% economia de custos operacionais</li>
									<li>ROI de 300% em 18 meses</li>
								</ul>
							</div>
						</div>
						<div className="bg-brand-green-700 p-6 rounded-lg">
							<div className="text-center mb-6">
								<div className="text-6xl mb-4">💬</div>
								<h4 className="text-xl font-bold text-brand-gold-400">
									Depoimento do Cliente
								</h4>
							</div>
							<blockquote className="text-brand-gray-300 italic mb-6 text-lg">
								"A consultoria da STARK foi fundamental para nossa transformação
								digital. Eles não apenas modernizaram nossa TI, mas
								transformaram completamente nossa operação. Os resultados
								superaram todas as expectativas."
							</blockquote>
							<div className="text-center">
								<div className="font-semibold text-brand-gold-400">
									Carlos Silva, CEO
								</div>
								<div className="text-brand-gray-400 text-sm">
									Indústria Metalúrgica São Paulo
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Technologies */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Tecnologias que Trabalhamos
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-brand-green-800 p-6 rounded-lg">
						<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
							Cloud Computing
						</h3>
						<ul className="space-y-2 text-brand-gray-300">
							<li>• AWS (Amazon Web Services)</li>
							<li>• Microsoft Azure</li>
							<li>• Google Cloud Platform</li>
							<li>• Estratégias de migração</li>
						</ul>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg">
						<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
							Automação e IA
						</h3>
						<ul className="space-y-2 text-brand-gray-300">
							<li>• RPA (Robotic Process Automation)</li>
							<li>• Machine Learning</li>
							<li>• Inteligência Artificial</li>
							<li>• Chatbots e Assistência Virtual</li>
						</ul>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg">
						<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
							Modernização
						</h3>
						<ul className="space-y-2 text-brand-gray-300">
							<li>• Microserviços</li>
							<li>• DevOps e CI/CD</li>
							<li>• Containers (Docker, Kubernetes)</li>
							<li>• APIs e Integrações</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Investimento em Consultoria
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-brand-green-800 p-8 rounded-lg">
						<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
							Auditoria Básica
						</h3>
						<div className="text-3xl font-bold text-brand-gold-500 mb-6">
							R$ 8.000
						</div>
						<ul className="space-y-3 text-brand-gray-300 mb-8">
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Análise de infraestrutura atual</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Identificação de vulnerabilidades</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Relatório executivo detalhado</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Recomendações prioritárias</span>
							</li>
						</ul>
						<a
							href="/contact"
							className="w-full bg-brand-gold-500 text-black py-3 rounded-lg font-semibold text-center block hover:bg-brand-gold-400 transition-colors"
						>
							Solicitar Orçamento
						</a>
					</div>
					<div className="bg-brand-green-800 p-8 rounded-lg border-2 border-brand-gold-500 relative">
						<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
							<span className="bg-brand-gold-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
								Mais Procurado
							</span>
						</div>
						<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
							Planejamento Estratégico
						</h3>
						<div className="text-3xl font-bold text-brand-gold-500 mb-6">
							R$ 25.000
						</div>
						<ul className="space-y-3 text-brand-gray-300 mb-8">
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Auditoria completa + Planejamento</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Roadmap de 3-5 anos</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Análise de ROI detalhada</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Workshops com stakeholders</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Acompanhamento por 6 meses</span>
							</li>
						</ul>
						<a
							href="/contact"
							className="w-full bg-brand-gold-500 text-black py-3 rounded-lg font-semibold text-center block hover:bg-brand-gold-400 transition-colors"
						>
							Solicitar Orçamento
						</a>
					</div>
					<div className="bg-brand-green-800 p-8 rounded-lg">
						<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
							Transformação Completa
						</h3>
						<div className="text-3xl font-bold text-brand-gold-500 mb-6">
							Sob Consulta
						</div>
						<ul className="space-y-3 text-brand-gray-300 mb-8">
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Consultoria completa + Implementação</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Gestão de projeto dedicada</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Capacitação de equipes</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Suporte pós-implementação</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Garantia de resultados</span>
							</li>
						</ul>
						<a
							href="/contact"
							className="w-full bg-brand-gold-500 text-black py-3 rounded-lg font-semibold text-center block hover:bg-brand-gold-400 transition-colors"
						>
							Falar com Consultor
						</a>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="text-center bg-brand-green-800 p-12 rounded-lg">
				<h2 className="text-3xl font-bold mb-6 text-brand-gray-200">
					Pronto para Transformar sua Empresa?
				</h2>
				<p className="text-xl text-brand-gray-300 mb-8 max-w-2xl mx-auto">
					Agende uma consultoria gratuita e descubra como a tecnologia pode
					impulsionar o crescimento do seu negócio.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/contact"
						className="bg-brand-gold-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold-400 transition-colors"
					>
						Agendar Consultoria Gratuita
					</a>
					<a
						href="/portfolio"
						className="border border-brand-gold-500 text-brand-gold-500 px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold-500 hover:text-black transition-colors"
					>
						Ver Cases de Sucesso
					</a>
				</div>
			</section>
		</div>
	);
}
