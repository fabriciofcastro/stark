import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cases de Sucesso | Projetos Reais - STARK Gestão em Tecnologia",
	description:
		"Conheça cases de sucesso reais da STARK. Projetos que transformaram negócios através da tecnologia, com resultados mensuráveis e depoimentos de clientes.",
	keywords:
		"cases de sucesso, projetos TI, transformação digital, resultados stark, clientes satisfeitos, depoimentos",
	robots: {
		index: true,
		follow: true,
	},
};

export default function CasesDeSucesso() {
	const cases = [
		{
			id: 1,
			title: "Transformação Digital Completa",
			client: "Indústria Metalúrgica São Paulo",
			challenge: "Sistema legado causando lentidão e perda de produtividade",
			solution: "Migração para sistema ERP moderno com automação de processos",
			results: [
				"40% aumento na produtividade",
				"60% redução no tempo de processos",
				"30% economia de custos operacionais",
				"100% integração entre departamentos",
			],
			quote:
				"A STARK não apenas modernizou nossa TI, mas transformou completamente nossa operação. Os resultados superaram todas as expectativas.",
			author: "Carlos Silva, CEO",
			duration: "8 meses",
			investment: "R$ 150.000",
			roi: "300% em 18 meses",
		},
		{
			id: 2,
			title: "Segurança da Informação Hospitalar",
			client: "Hospital Regional Itaquá",
			challenge: "Infraestrutura de TI desatualizada e vulnerável a ataques",
			solution: "Modernização completa com foco em segurança e conformidade",
			results: [
				"Zero incidentes de segurança",
				"99.99% de disponibilidade",
				"Conformidade total com LGPD",
				"Backup automatizado e testado",
			],
			quote:
				"A segurança dos nossos pacientes e dados sempre foi prioridade. Com a STARK, temos a tranquilidade de estar totalmente protegidos.",
			author: "Dra. Maria Santos, Diretora Médica",
			duration: "6 meses",
			investment: "R$ 200.000",
			roi: "Evitou multas de R$ 500.000+",
		},
		{
			id: 3,
			title: "E-commerce B2B de Alto Desempenho",
			client: "Distribuidora de Materiais de Construção",
			challenge: "Vendas online limitadas e processo de pedidos manual",
			solution: "Plataforma e-commerce personalizada com integração ERP",
			results: [
				"200% aumento nas vendas online",
				"80% redução no tempo de pedidos",
				"50% crescimento no ticket médio",
				"Interface intuitiva para clientes",
			],
			quote:
				"Nossa plataforma online se tornou o principal canal de vendas. A experiência do cliente melhorou drasticamente.",
			author: "João Oliveira, Gerente Comercial",
			duration: "5 meses",
			investment: "R$ 120.000",
			roi: "400% em 12 meses",
		},
		{
			id: 4,
			title: "Migração para Nuvem com Economia",
			client: "Logística Express Ltda",
			challenge: "Custos altos de infraestrutura local e baixa disponibilidade",
			solution: "Migração completa para AWS com automação e monitoramento",
			results: [
				"45% redução de custos operacionais",
				"99.9% de disponibilidade",
				"Escalabilidade automática",
				"Backup e recuperação automatizados",
			],
			quote:
				"A migração para nuvem foi um divisor de águas. Economizamos muito e ganhamos em performance e confiabilidade.",
			author: "Ana Costa, CTO",
			duration: "4 meses",
			investment: "R$ 80.000",
			roi: "250% em 15 meses",
		},
		{
			id: 5,
			title: "Automação de Processos Jurídicos",
			client: "Advocacia & Associados",
			challenge: "Processos manuais causando lentidão e erros",
			solution: "Sistema de automação com workflow inteligente",
			results: [
				"70% redução no tempo de processos",
				"95% redução de erros manuais",
				"Automação de 15 workflows",
				"Integração com tribunais",
			],
			quote:
				"A automação nos permitiu focar no que realmente importa: nossos clientes. A eficiência aumentou drasticamente.",
			author: "Dr. Roberto Lima, Sócio",
			duration: "3 meses",
			investment: "R$ 60.000",
			roi: "350% em 10 meses",
		},
		{
			id: 6,
			title: "Segurança Avançada para Rede de Farmácias",
			client: "Farmácia Popular Network",
			challenge: "50+ unidades com sistemas desprotegidos e dados sensíveis",
			solution:
				"Implementação de segurança unificada e monitoramento centralizado",
			results: [
				"Zero vazamentos de dados",
				"Monitoramento 24/7 de todas as unidades",
				"Conformidade com LGPD",
				"Backup centralizado e seguro",
			],
			quote:
				"Com 50 unidades, a segurança era um desafio. A STARK criou uma solução que nos dá total controle e proteção.",
			author: "Pedro Fernandes, Diretor de TI",
			duration: "5 meses",
			investment: "R$ 180.000",
			roi: "Evitou multas de R$ 1M+",
		},
	];

	const stats = [
		{ number: "200+", label: "Projetos Concluídos", icon: "🎯" },
		{ number: "98%", label: "Taxa de Satisfação", icon: "⭐" },
		{ number: "R$ 2M+", label: "Economia Gerada", icon: "💰" },
		{ number: "24/7", label: "Suporte Disponível", icon: "🛡️" },
	];

	return (
		<div className="container mx-auto px-4 py-16">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-5xl font-bold mb-6 text-brand-gold-500">
					Cases de Sucesso
				</h1>
				<p className="text-xl text-brand-gray-300 max-w-3xl mx-auto">
					Conheça projetos reais que transformaram negócios através da
					tecnologia. Cada case representa resultados mensuráveis e clientes
					satisfeitos.
				</p>
			</section>

			{/* Estatísticas */}
			<section className="mb-16">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<div
							key={index}
							className="bg-brand-green-800 p-6 rounded-lg text-center"
						>
							<div className="text-3xl mb-3">{stat.icon}</div>
							<div className="text-3xl font-bold text-brand-gold-500 mb-2">
								{stat.number}
							</div>
							<div className="text-brand-gray-300 text-sm">{stat.label}</div>
						</div>
					))}
				</div>
			</section>

			{/* Cases */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Projetos que Transformaram Negócios
				</h2>
				<div className="space-y-12">
					{cases.map((caseItem, index) => (
						<div
							key={caseItem.id}
							className={`grid lg:grid-cols-2 gap-8 items-center ${
								index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
							}`}
						>
							<div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
								<div className="bg-brand-green-800 p-8 rounded-lg">
									<div className="flex items-center gap-3 mb-4">
										<span className="bg-brand-gold-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
											Case #{caseItem.id}
										</span>
										<span className="text-brand-gray-400 text-sm">
											{caseItem.duration} • {caseItem.investment}
										</span>
									</div>

									<h3 className="text-2xl font-bold mb-4 text-brand-gray-200">
										{caseItem.title}
									</h3>
									<p className="text-brand-gold-400 font-semibold mb-4">
										Cliente: {caseItem.client}
									</p>

									<div className="mb-6">
										<h4 className="font-semibold mb-2 text-brand-red-400">
											Desafio:
										</h4>
										<p className="text-brand-gray-300 text-sm">
											{caseItem.challenge}
										</p>
									</div>

									<div className="mb-6">
										<h4 className="font-semibold mb-2 text-brand-blue-400">
											Solução:
										</h4>
										<p className="text-brand-gray-300 text-sm">
											{caseItem.solution}
										</p>
									</div>

									<div className="mb-6">
										<h4 className="font-semibold mb-3 text-brand-cyan-400">
											Principais Resultados:
										</h4>
										<ul className="space-y-2">
											{caseItem.results.map((result, resultIndex) => (
												<li
													key={resultIndex}
													className="flex items-start gap-2 text-brand-gray-300 text-sm"
												>
													<span className="text-brand-green-500 mt-1">✓</span>
													<span>{result}</span>
												</li>
											))}
										</ul>
									</div>

									<div className="bg-brand-green-700 p-4 rounded-lg">
										<div className="text-center">
											<div className="text-2xl font-bold text-brand-gold-500 mb-2">
												ROI: {caseItem.roi}
											</div>
											<div className="text-brand-gray-300 text-sm">
												Retorno sobre Investimento
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
								<div className="bg-brand-green-900 p-8 rounded-lg">
									<div className="text-center mb-6">
										<div className="text-6xl mb-4">💬</div>
										<h4 className="text-xl font-bold text-brand-gold-400 mb-4">
											Depoimento do Cliente
										</h4>
									</div>

									<blockquote className="text-brand-gray-300 italic mb-6 text-lg leading-relaxed">
										"{caseItem.quote}"
									</blockquote>

									<div className="text-center">
										<div className="font-semibold text-brand-gold-400">
											{caseItem.author}
										</div>
										<div className="text-brand-gray-400 text-sm">
											{caseItem.client}
										</div>
									</div>

									<div className="mt-6 pt-6 border-t border-brand-green-700">
										<div className="grid grid-cols-2 gap-4 text-center">
											<div>
												<div className="text-brand-gold-500 font-bold">
													{caseItem.duration}
												</div>
												<div className="text-brand-gray-400 text-xs">
													Duração
												</div>
											</div>
											<div>
												<div className="text-brand-gold-500 font-bold">
													{caseItem.investment}
												</div>
												<div className="text-brand-gray-400 text-xs">
													Investimento
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Processo de Trabalho */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Como Trabalhamos
				</h2>
				<div className="grid md:grid-cols-4 gap-6">
					<div className="bg-brand-green-800 p-6 rounded-lg text-center">
						<div className="text-4xl mb-4">🔍</div>
						<h3 className="text-lg font-bold mb-3 text-brand-gold-400">
							1. Análise
						</h3>
						<p className="text-brand-gray-300 text-sm">
							Mapeamos suas necessidades e desafios atuais para entender
							exatamente o que precisa ser resolvido.
						</p>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg text-center">
						<div className="text-4xl mb-4">📋</div>
						<h3 className="text-lg font-bold mb-3 text-brand-gold-400">
							2. Planejamento
						</h3>
						<p className="text-brand-gray-300 text-sm">
							Desenvolvemos um plano estratégico personalizado com cronograma,
							recursos e metas claras.
						</p>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg text-center">
						<div className="text-4xl mb-4">⚡</div>
						<h3 className="text-lg font-bold mb-3 text-brand-gold-400">
							3. Execução
						</h3>
						<p className="text-brand-gray-300 text-sm">
							Implementamos a solução com nossa equipe especializada, mantendo
							você informado do progresso.
						</p>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg text-center">
						<div className="text-4xl mb-4">📊</div>
						<h3 className="text-lg font-bold mb-3 text-brand-gold-400">
							4. Resultados
						</h3>
						<p className="text-brand-gray-300 text-sm">
							Medimos e demonstramos os resultados alcançados, garantindo o
							retorno sobre seu investimento.
						</p>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="text-center bg-brand-green-800 p-12 rounded-lg">
				<h2 className="text-3xl font-bold mb-6 text-brand-gray-200">
					Seu Próximo Case de Sucesso
				</h2>
				<p className="text-xl text-brand-gray-300 mb-8 max-w-2xl mx-auto">
					Que tal transformar seu negócio em mais um case de sucesso? Entre em
					contato e vamos discutir como podemos ajudar.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/contact"
						className="bg-brand-gold-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold-400 transition-colors"
					>
						Solicitar Consultoria Gratuita
					</a>
					<a
						href="/portfolio"
						className="border border-brand-gold-500 text-brand-gold-500 px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold-500 hover:text-black transition-colors"
					>
						Ver Mais Projetos
					</a>
				</div>
			</section>
		</div>
	);
}
