import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "FAQ - Perguntas Frequentes | STARK Gestão em Tecnologia",
	description:
		"Encontre respostas para as principais dúvidas sobre nossos serviços de TI, suporte técnico, soluções em nuvem e consultoria em tecnologia.",
	keywords:
		"faq stark, perguntas frequentes, dúvidas TI, suporte técnico, consultoria tecnologia, soluções nuvem",
	robots: {
		index: true,
		follow: true,
	},
};

export default function FAQ() {
	const faqCategories = [
		{
			category: "Serviços Gerais",
			icon: "🔧",
			questions: [
				{
					question: "Quais serviços a STARK oferece?",
					answer:
						"Oferecemos suporte técnico especializado, consultoria em tecnologia, soluções em nuvem, segurança da informação, infraestrutura de TI, desenvolvimento de sistemas e muito mais. Nossa equipe está preparada para atender desde pequenas empresas até grandes corporações.",
				},
				{
					question: "A STARK atende empresas de todos os portes?",
					answer:
						"Sim! Atendemos desde micro e pequenas empresas até grandes corporações. Nossas soluções são adaptadas para cada porte de negócio, garantindo que você receba exatamente o que precisa, sem pagar por recursos desnecessários.",
				},
				{
					question: "Qual é a área de atendimento da STARK?",
					answer:
						"Atendemos toda a região metropolitana de São Paulo, com foco em Itaquaquecetuba, Suzano, Mogi das Cruzes, Arujá, Ferraz de Vasconcelos, Poá, São Paulo (Capital) e Guarulhos. Para outras regiões, consulte nossa equipe comercial.",
				},
				{
					question: "Como funciona o atendimento de emergência?",
					answer:
						"Oferecemos suporte técnico 24/7 para emergências críticas. Nosso sistema de priorização garante resposta rápida para problemas que afetam a operação do seu negócio. Entre em contato através dos nossos canais de emergência.",
				},
			],
		},
		{
			category: "Suporte Técnico",
			icon: "💻",
			questions: [
				{
					question: "Qual é o tempo de resposta do suporte técnico?",
					answer:
						"Para emergências críticas: até 1 hora. Para problemas de alta prioridade: até 4 horas. Para demandas normais: até 24 horas. Temos diferentes níveis de SLA conforme o tipo de contrato e criticidade do problema.",
				},
				{
					question: "O suporte técnico inclui manutenção preventiva?",
					answer:
						"Sim! Nossos contratos de suporte incluem manutenção preventiva regular, monitoramento proativo, atualizações de segurança e relatórios mensais de performance. A prevenção é sempre mais eficiente que a correção.",
				},
				{
					question: "Posso ter suporte remoto e presencial?",
					answer:
						"Claro! Oferecemos suporte remoto para a maioria dos problemas, o que garante resposta mais rápida. Quando necessário, nossa equipe técnica se desloca até sua empresa para atendimento presencial.",
				},
				{
					question: "Como é feito o backup dos dados?",
					answer:
						"Implementamos estratégias de backup automatizado com múltiplas camadas: backup local diário, backup na nuvem e backup em localização geográfica distinta. Testamos regularmente a integridade dos backups.",
				},
			],
		},
		{
			category: "Soluções em Nuvem",
			icon: "☁️",
			questions: [
				{
					question: "Quais são os benefícios de migrar para a nuvem?",
					answer:
						"Migração para nuvem oferece redução de custos (até 40%), maior segurança, escalabilidade automática, acesso remoto, backup automático, atualizações automáticas e melhor performance. Além disso, você paga apenas pelo que usa.",
				},
				{
					question: "A nuvem é segura para dados sensíveis?",
					answer:
						"Sim! Utilizamos as melhores práticas de segurança, criptografia de dados, controle de acesso rigoroso e conformidade com LGPD. Trabalhamos com provedores certificados como AWS, Azure e Google Cloud.",
				},
				{
					question: "Quanto tempo leva uma migração para nuvem?",
					answer:
						"Depende da complexidade do ambiente atual. Migrações simples podem ser concluídas em 2-4 semanas, enquanto ambientes mais complexos podem levar 3-6 meses. Fazemos um planejamento detalhado antes de iniciar qualquer migração.",
				},
				{
					question: "Posso migrar gradualmente para a nuvem?",
					answer:
						"Sim! Recomendamos uma abordagem gradual, migrando aplicações menos críticas primeiro. Isso permite testar e ajustar o ambiente antes de migrar sistemas essenciais, reduzindo riscos.",
				},
			],
		},
		{
			category: "Segurança da Informação",
			icon: "🔒",
			questions: [
				{
					question: "Como a STARK garante a segurança dos dados?",
					answer:
						"Implementamos múltiplas camadas de segurança: firewall avançado, antivírus corporativo, backup seguro, monitoramento 24/7, treinamento da equipe, políticas de acesso e conformidade com LGPD. A segurança é nossa prioridade.",
				},
				{
					question: "O que é LGPD e como a STARK ajuda na conformidade?",
					answer:
						"LGPD é a Lei Geral de Proteção de Dados. Ajudamos na adequação através de auditorias, implementação de políticas de privacidade, controles de acesso, criptografia de dados e treinamento da equipe em boas práticas de proteção de dados.",
				},
				{
					question: "Como funciona o monitoramento de segurança?",
					answer:
						"Utilizamos ferramentas de SIEM (Security Information and Event Management) que monitoram 24/7 todos os eventos de segurança, detectam ameaças em tempo real e geram alertas automáticos para nossa equipe de segurança.",
				},
				{
					question: "A STARK oferece treinamento em segurança?",
					answer:
						"Sim! Oferecemos treinamentos regulares para sua equipe sobre conscientização em segurança, boas práticas, identificação de ameaças (phishing, malware) e procedimentos de resposta a incidentes.",
				},
			],
		},
		{
			category: "Consultoria e Desenvolvimento",
			icon: "🎯",
			questions: [
				{
					question: "Como funciona a consultoria em tecnologia?",
					answer:
						"Nossa consultoria começa com uma análise detalhada do seu ambiente atual, identificação de oportunidades de melhoria e desenvolvimento de um plano estratégico personalizado. Acompanhamos a implementação e medimos os resultados.",
				},
				{
					question: "A STARK desenvolve sistemas personalizados?",
					answer:
						"Sim! Desenvolvemos sistemas web, aplicações mobile, integrações entre sistemas, automação de processos e muito mais. Utilizamos tecnologias modernas e metodologias ágeis para garantir qualidade e prazo.",
				},
				{
					question: "Quanto tempo leva o desenvolvimento de um sistema?",
					answer:
						"Depende da complexidade do projeto. Sistemas simples podem ser desenvolvidos em 1-3 meses, enquanto projetos mais complexos podem levar 6-12 meses. Fazemos entregas incrementais para você acompanhar o progresso.",
				},
				{
					question: "Oferecem suporte pós-desenvolvimento?",
					answer:
						"Sim! Todos os nossos desenvolvimentos incluem suporte pós-entrega, correção de bugs, atualizações de segurança e evolução conforme suas necessidades. Oferecemos diferentes planos de manutenção.",
				},
			],
		},
		{
			category: "Comercial e Contratos",
			icon: "💰",
			questions: [
				{
					question: "Como funciona o processo de contratação?",
					answer:
						"Iniciamos com uma reunião para entender suas necessidades, elaboramos uma proposta personalizada, apresentamos a solução e, após aprovação, formalizamos o contrato. Todo o processo é transparente e sem surpresas.",
				},
				{
					question: "Quais são as formas de pagamento aceitas?",
					answer:
						"Aceitamos pagamento à vista com desconto, parcelamento em até 12x no cartão, boleto bancário, transferência bancária e para empresas, faturamento mensal conforme contrato.",
				},
				{
					question: "Há garantia nos serviços prestados?",
					answer:
						"Sim! Oferecemos garantia de 90 dias para serviços de desenvolvimento e 30 dias para serviços de suporte técnico. Nossa política de qualidade garante sua satisfação ou devolvemos seu investimento.",
				},
				{
					question: "Posso cancelar o contrato a qualquer momento?",
					answer:
						"Sim, mas recomendamos o período mínimo de 3 meses para que você possa avaliar os resultados. Oferecemos flexibilidade para ajustes no contrato conforme suas necessidades evoluem.",
				},
			],
		},
	];

	return (
		<div className="container mx-auto px-4 py-16">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-5xl font-bold mb-6 text-brand-gold-500">
					Perguntas Frequentes
				</h1>
				<p className="text-xl text-brand-gray-300 max-w-3xl mx-auto">
					Encontre respostas rápidas para as principais dúvidas sobre nossos
					serviços de tecnologia. Se não encontrar sua resposta, entre em
					contato!
				</p>
			</section>

			{/* Search Bar */}
			<section className="mb-12">
				<div className="max-w-2xl mx-auto">
					<div className="relative">
						<input
							type="text"
							placeholder="Digite sua dúvida aqui..."
							className="w-full bg-brand-green-800 border border-brand-green-700 rounded-lg px-4 py-3 pr-12 text-brand-gray-200 placeholder-brand-gray-400 focus:outline-none focus:border-brand-gold-500"
						/>
						<div className="absolute right-3 top-3 text-brand-gray-400">🔍</div>
					</div>
				</div>
			</section>

			{/* FAQ Categories */}
			<div className="space-y-12">
				{faqCategories.map((category, categoryIndex) => (
					<section key={categoryIndex} className="mb-16">
						<div className="flex items-center gap-3 mb-8">
							<span className="text-3xl">{category.icon}</span>
							<h2 className="text-3xl font-bold text-brand-gray-200">
								{category.category}
							</h2>
						</div>

						<div className="grid gap-6">
							{category.questions.map((faq, faqIndex) => (
								<div
									key={faqIndex}
									className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-gold-500"
								>
									<h3 className="text-xl font-semibold mb-4 text-brand-gold-400">
										{faq.question}
									</h3>
									<p className="text-brand-gray-300 leading-relaxed">
										{faq.answer}
									</p>
								</div>
							))}
						</div>
					</section>
				))}
			</div>

			{/* Still Have Questions */}
			<section className="mt-16 bg-brand-green-800 p-12 rounded-lg text-center">
				<h2 className="text-3xl font-bold mb-6 text-brand-gray-200">
					Ainda tem Dúvidas?
				</h2>
				<p className="text-xl text-brand-gray-300 mb-8 max-w-2xl mx-auto">
					Não encontrou a resposta que procurava? Nossa equipe está pronta para
					esclarecer todas as suas dúvidas sobre nossos serviços.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/contact"
						className="bg-brand-gold-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold-400 transition-colors"
					>
						Falar com Especialista
					</a>
					<a
						href="tel:+5511999999999"
						className="border border-brand-gold-500 text-brand-gold-500 px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold-500 hover:text-black transition-colors"
					>
						Ligar Agora
					</a>
				</div>
			</section>

			{/* Quick Links */}
			<section className="mt-16">
				<h2 className="text-2xl font-bold text-center mb-8 text-brand-gray-200">
					Links Úteis
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					<a
						href="/services"
						className="bg-brand-green-800 p-6 rounded-lg text-center hover:bg-brand-green-700 transition-colors"
					>
						<div className="text-3xl mb-3">🔧</div>
						<h3 className="font-semibold text-brand-gold-400">
							Nossos Serviços
						</h3>
						<p className="text-brand-gray-300 text-sm mt-2">
							Conheça todos os serviços que oferecemos
						</p>
					</a>
					<a
						href="/portfolio"
						className="bg-brand-green-800 p-6 rounded-lg text-center hover:bg-brand-green-700 transition-colors"
					>
						<div className="text-3xl mb-3">📊</div>
						<h3 className="font-semibold text-brand-gold-400">Portfólio</h3>
						<p className="text-brand-gray-300 text-sm mt-2">
							Veja nossos projetos de sucesso
						</p>
					</a>
					<a
						href="/sobre"
						className="bg-brand-green-800 p-6 rounded-lg text-center hover:bg-brand-green-700 transition-colors"
					>
						<div className="text-3xl mb-3">🏢</div>
						<h3 className="font-semibold text-brand-gold-400">Sobre Nós</h3>
						<p className="text-brand-gray-300 text-sm mt-2">
							Conheça nossa história e valores
						</p>
					</a>
					<a
						href="/blog"
						className="bg-brand-green-800 p-6 rounded-lg text-center hover:bg-brand-green-700 transition-colors"
					>
						<div className="text-3xl mb-3">📝</div>
						<h3 className="font-semibold text-brand-gold-400">Blog</h3>
						<p className="text-brand-gray-300 text-sm mt-2">
							Artigos e dicas sobre tecnologia
						</p>
					</a>
				</div>
			</section>
		</div>
	);
}
