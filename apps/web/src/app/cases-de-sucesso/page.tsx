import { Metadata } from "next";
import { Trophy, TrendingUp, Users, Clock, DollarSign, Target, Star, ExternalLink, CheckCircle, Quote } from "lucide-react";

export const metadata: Metadata = {
	title: "Cases de Sucesso - Projetos Reais - STARK Tecnologia",
	description: "Conheça cases de sucesso reais da STARK. Projetos que transformaram negócios através da tecnologia, com resultados mensuráveis e depoimentos de clientes.",
	keywords: "cases de sucesso, projetos TI, transformação digital, resultados stark, clientes satisfeitos, depoimentos",
};

const CasesDeSucessoPage = () => {
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
			icon: TrendingUp,
			color: "from-blue-500 to-cyan-600"
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
			icon: Target,
			color: "from-green-500 to-emerald-600"
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
			icon: Users,
			color: "from-purple-500 to-indigo-600"
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
			icon: TrendingUp,
			color: "from-cyan-500 to-blue-600"
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
			icon: CheckCircle,
			color: "from-orange-500 to-red-600"
		},
		{
			id: 6,
			title: "Segurança Avançada para Rede de Farmácias",
			client: "Farmácia Popular Network",
			challenge: "50+ unidades com sistemas desprotegidos e dados sensíveis",
			solution: "Implementação de segurança unificada e monitoramento centralizado",
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
			icon: Target,
			color: "from-indigo-500 to-purple-600"
		},
	];

	const stats = [
		{ number: "200+", label: "Projetos Concluídos", icon: Target, color: "from-blue-500 to-cyan-500" },
		{ number: "98%", label: "Taxa de Satisfação", icon: Star, color: "from-purple-500 to-indigo-500" },
		{ number: "R$ 2M+", label: "Economia Gerada", icon: DollarSign, color: "from-green-500 to-emerald-500" },
		{ number: "24/7", label: "Suporte Disponível", icon: Clock, color: "from-orange-500 to-red-500" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
			{/* Hero Section */}
			<div className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-indigo-600/20" />
				<div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
				
				<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
					<div className="text-center">
						<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl mb-8">
							<Trophy className="w-10 h-10 text-white" />
						</div>
						
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
							Cases de Sucesso
						</h1>
						
						<p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
							Conheça projetos reais que transformaram negócios através da tecnologia. 
							Cada case representa resultados mensuráveis e clientes satisfeitos.
						</p>
					</div>
				</div>
			</div>

			{/* Estatísticas */}
			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<div
							key={index}
							className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center hover:border-white/20 transition-all duration-300"
						>
							<div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
								<stat.icon className="w-8 h-8 text-white" />
							</div>
							<div className="text-3xl font-bold text-white mb-2">
								{stat.number}
							</div>
							<div className="text-white/70 text-sm">{stat.label}</div>
						</div>
					))}
				</div>
			</div>

			{/* Cases */}
			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-white mb-4">
						Projetos que Transformaram Negócios
					</h2>
					<p className="text-white/70 text-lg max-w-2xl mx-auto">
						Cada projeto é uma história de sucesso, com resultados reais e clientes satisfeitos
					</p>
				</div>

				<div className="space-y-16">
					{cases.map((caseItem, index) => (
						<div
							key={caseItem.id}
							className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
						>
							<div className="lg:flex lg:items-start lg:space-x-12">
								{/* Case Info */}
								<div className="flex-1">
									<div className="flex items-center space-x-4 mb-6">
										<div className={`w-16 h-16 bg-gradient-to-br ${caseItem.color} rounded-2xl flex items-center justify-center`}>
											<caseItem.icon className="w-8 h-8 text-white" />
										</div>
										<div>
											<div className="flex items-center space-x-2 mb-2">
												<span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
													Case #{caseItem.id}
												</span>
												<span className="text-white/60 text-sm">
													{caseItem.duration}
												</span>
											</div>
											<h3 className="text-2xl font-bold text-white mb-2">
												{caseItem.title}
											</h3>
											<p className="text-white/80 font-medium">
												{caseItem.client}
											</p>
										</div>
									</div>

									{/* Challenge & Solution */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
										<div className="bg-white/10 rounded-xl p-4">
											<h4 className="font-semibold text-red-400 mb-2 flex items-center">
												<Target className="w-4 h-4 mr-2" />
												Desafio:
											</h4>
											<p className="text-white/80 text-sm">
												{caseItem.challenge}
											</p>
										</div>
										<div className="bg-white/10 rounded-xl p-4">
											<h4 className="font-semibold text-blue-400 mb-2 flex items-center">
												<CheckCircle className="w-4 h-4 mr-2" />
												Solução:
											</h4>
											<p className="text-white/80 text-sm">
												{caseItem.solution}
											</p>
										</div>
									</div>

									{/* Results */}
									<div className="mb-6">
										<h4 className="font-semibold text-cyan-400 mb-3 flex items-center">
											<TrendingUp className="w-5 h-5 mr-2" />
											Principais Resultados:
										</h4>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
											{caseItem.results.map((result, resultIndex) => (
												<div key={resultIndex} className="flex items-center space-x-2">
													<div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" />
													<span className="text-white/80 text-sm">{result}</span>
												</div>
											))}
										</div>
									</div>

									{/* ROI */}
									<div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
										<div className="text-center">
											<div className="text-2xl font-bold text-green-400 mb-2">
												ROI: {caseItem.roi}
											</div>
											<div className="text-white/60 text-sm">
												Retorno sobre Investimento
											</div>
										</div>
									</div>
								</div>

								{/* Testimonial */}
								<div className="lg:w-80 lg:flex-shrink-0 mt-8 lg:mt-0">
									<div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/20">
										<div className="text-center mb-6">
											<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
												<Quote className="w-6 h-6 text-white" />
											</div>
											<h4 className="text-lg font-bold text-white mb-4">
												Depoimento do Cliente
											</h4>
										</div>

										<blockquote className="text-white/90 italic mb-6 text-base leading-relaxed">
											"{caseItem.quote}"
										</blockquote>

										<div className="text-center">
											<div className="font-semibold text-purple-300">
												{caseItem.author}
											</div>
											<div className="text-white/60 text-sm">
												{caseItem.client}
											</div>
										</div>

										<div className="mt-6 pt-4 border-t border-white/20">
											<div className="flex justify-between text-center">
												<div>
													<div className="text-white font-bold text-sm">
														{caseItem.duration}
													</div>
													<div className="text-white/60 text-xs">
														Duração
													</div>
												</div>
												<div>
													<div className="text-white font-bold text-sm">
														{caseItem.investment}
													</div>
													<div className="text-white/60 text-xs">
														Investimento
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* CTA Section */}
			<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
				<div className="bg-gradient-to-r from-purple-600/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
					<h2 className="text-3xl font-bold text-white mb-4">
						Seu Próximo Case de Sucesso
					</h2>
					<p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
						Que tal transformar seu negócio em mais um case de sucesso? 
						Entre em contato e vamos discutir como podemos ajudar.
					</p>
					
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="/contato"
							className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl font-medium hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
						>
							<ExternalLink className="w-5 h-5 mr-2" />
							Solicitar Consultoria Gratuita
						</a>
						
						<a
							href="/portfolio"
							className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
						>
							<Trophy className="w-5 h-5 mr-2" />
							Ver Mais Projetos
						</a>
					</div>
				</div>
			</div>

			{/* Background Effects */}
			<div className="fixed inset-0 pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
			</div>
		</div>
	);
};

export default CasesDeSucessoPage;