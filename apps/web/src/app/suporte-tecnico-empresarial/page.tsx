import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Suporte Técnico Empresarial 24/7 | STARK Gestão em Tecnologia",
	description:
		"Suporte técnico empresarial especializado 24/7. Manutenção preventiva, correção de falhas, monitoramento proativo e SLA garantido para sua empresa.",
	keywords:
		"suporte técnico empresarial, manutenção TI, helpdesk, suporte 24 horas, monitoramento proativo, sla garantido",
	robots: {
		index: true,
		follow: true,
	},
};

export default function SuporteTecnicoEmpresarial() {
	const services = [
		{
			title: "Suporte Preventivo",
			icon: "🛡️",
			description:
				"Manutenção regular para evitar problemas antes que aconteçam",
			features: [
				"Monitoramento 24/7 dos sistemas",
				"Atualizações de segurança automáticas",
				"Verificação periódica de backups",
				"Relatórios mensais de performance",
			],
		},
		{
			title: "Correção de Falhas",
			icon: "🔧",
			description: "Resolução rápida de problemas técnicos e emergências",
			features: [
				"Tempo de resposta garantido por SLA",
				"Suporte remoto e presencial",
				"Equipe especializada disponível 24/7",
				"Diagnóstico preciso e solução eficiente",
			],
		},
		{
			title: "Helpdesk Estruturado",
			icon: "📞",
			description: "Central de atendimento organizada e eficiente",
			features: [
				"Sistema de tickets organizado",
				"Priorização por criticidade",
				"Histórico completo de atendimentos",
				"Comunicação transparente com o cliente",
			],
		},
		{
			title: "Monitoramento Proativo",
			icon: "📊",
			description: "Acompanhamento contínuo da saúde dos sistemas",
			features: [
				"Alertas automáticos de problemas",
				"Dashboards em tempo real",
				"Análise de tendências",
				"Prevenção de falhas críticas",
			],
		},
	];

	const slaLevels = [
		{
			level: "Crítico",
			description: "Sistemas que afetam a operação principal",
			response: "1 hora",
			color: "border-red-500",
			textColor: "text-red-400",
		},
		{
			level: "Alta",
			description: "Problemas que impactam produtividade",
			response: "4 horas",
			color: "border-orange-500",
			textColor: "text-orange-400",
		},
		{
			level: "Média",
			description: "Questões que afetam funcionalidades específicas",
			response: "24 horas",
			color: "border-yellow-500",
			textColor: "text-yellow-400",
		},
		{
			level: "Baixa",
			description: "Melhorias e consultas gerais",
			response: "72 horas",
			color: "border-green-500",
			textColor: "text-green-400",
		},
	];

	const benefits = [
		{
			title: "Disponibilidade 24/7",
			description:
				"Suporte técnico disponível todos os dias, incluindo fins de semana e feriados",
			icon: "🕐",
		},
		{
			title: "Equipe Especializada",
			description:
				"Profissionais certificados com ampla experiência em diferentes tecnologias",
			icon: "👥",
		},
		{
			title: "SLA Garantido",
			description:
				"Tempos de resposta garantidos por contrato com penalidades por descumprimento",
			icon: "⚡",
		},
		{
			title: "Monitoramento Proativo",
			description:
				"Detecção antecipada de problemas antes que afetem sua operação",
			icon: "📈",
		},
		{
			title: "Relatórios Detalhados",
			description:
				"Acompanhamento mensal com métricas de performance e disponibilidade",
			icon: "📋",
		},
		{
			title: "Escalabilidade",
			description:
				"Suporte que cresce junto com sua empresa, adaptando-se às suas necessidades",
			icon: "📊",
		},
	];

	return (
		<div className="container mx-auto px-4 py-16">
			{/* Hero Section */}
			<section className="text-center mb-16">
				<h1 className="text-5xl font-bold mb-6 text-brand-gold-500">
					Suporte Técnico Empresarial
				</h1>
				<p className="text-xl text-brand-gray-300 max-w-3xl mx-auto">
					Suporte técnico especializado 24/7 para garantir a continuidade da sua
					operação. SLA garantido, monitoramento proativo e equipe altamente
					qualificada.
				</p>
			</section>

			{/* Services Overview */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Nossos Serviços de Suporte
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

			{/* SLA Levels */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Níveis de SLA (Service Level Agreement)
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{slaLevels.map((sla, index) => (
						<div
							key={index}
							className={`bg-brand-green-800 p-6 rounded-lg border-l-4 ${sla.color}`}
						>
							<h3 className={`text-lg font-bold mb-3 ${sla.textColor}`}>
								{sla.level}
							</h3>
							<p className="text-brand-gray-300 text-sm mb-4">
								{sla.description}
							</p>
							<div className="bg-brand-green-700 p-3 rounded-lg text-center">
								<div className="text-xl font-bold text-brand-gold-500">
									{sla.response}
								</div>
								<div className="text-brand-gray-300 text-xs">
									Tempo de Resposta
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Benefits */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Por que Escolher Nosso Suporte?
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{benefits.map((benefit, index) => (
						<div
							key={index}
							className="bg-brand-green-800 p-6 rounded-lg text-center"
						>
							<div className="text-4xl mb-4">{benefit.icon}</div>
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

			{/* Process Flow */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Como Funciona Nosso Processo
				</h2>
				<div className="grid md:grid-cols-4 gap-6">
					<div className="bg-brand-green-800 p-6 rounded-lg text-center">
						<div className="text-4xl mb-4">📞</div>
						<h3 className="text-lg font-bold mb-3 text-brand-gold-400">
							1. Solicitação
						</h3>
						<p className="text-brand-gray-300 text-sm">
							Você entra em contato através de nossos canais: telefone, email,
							chat ou sistema de tickets.
						</p>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg text-center">
						<div className="text-4xl mb-4">⚡</div>
						<h3 className="text-lg font-bold mb-3 text-brand-gold-400">
							2. Classificação
						</h3>
						<p className="text-brand-gray-300 text-sm">
							Classificamos a prioridade conforme o impacto no seu negócio e
							acionamos a equipe adequada.
						</p>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg text-center">
						<div className="text-4xl mb-4">🔧</div>
						<h3 className="text-lg font-bold mb-3 text-brand-gold-400">
							3. Resolução
						</h3>
						<p className="text-brand-gray-300 text-sm">
							Nossa equipe especializada resolve o problema no tempo garantido
							pelo SLA.
						</p>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg text-center">
						<div className="text-4xl mb-4">📋</div>
						<h3 className="text-lg font-bold mb-3 text-brand-gold-400">
							4. Documentação
						</h3>
						<p className="text-brand-gray-300 text-sm">
							Documentamos a solução e incluímos no seu histórico para
							referência futura.
						</p>
					</div>
				</div>
			</section>

			{/* Technologies */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Tecnologias que Suportamos
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-brand-green-800 p-6 rounded-lg">
						<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
							Sistemas Operacionais
						</h3>
						<ul className="space-y-2 text-brand-gray-300">
							<li>• Windows Server 2016/2019/2022</li>
							<li>• Linux (Ubuntu, CentOS, Red Hat)</li>
							<li>• macOS para ambientes mistos</li>
							<li>• Virtualização (VMware, Hyper-V)</li>
						</ul>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg">
						<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
							Aplicações de Negócio
						</h3>
						<ul className="space-y-2 text-brand-gray-300">
							<li>• Microsoft 365 / Office 365</li>
							<li>• Google Workspace</li>
							<li>• ERPs (SAP, Oracle, Totvs)</li>
							<li>• CRMs (Salesforce, HubSpot)</li>
						</ul>
					</div>
					<div className="bg-brand-green-800 p-6 rounded-lg">
						<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
							Infraestrutura
						</h3>
						<ul className="space-y-2 text-brand-gray-300">
							<li>• Servidores físicos e virtuais</li>
							<li>• Storage e backup</li>
							<li>• Redes e segurança</li>
							<li>• Cloud (AWS, Azure, GCP)</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section className="mb-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-brand-gray-200">
					Planos de Suporte
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-brand-green-800 p-8 rounded-lg">
						<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
							Básico
						</h3>
						<div className="text-3xl font-bold text-brand-gold-500 mb-6">
							R$ 2.500/mês
						</div>
						<ul className="space-y-3 text-brand-gray-300 mb-8">
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Suporte 8x5 (seg-sex 8h-18h)</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Até 10 usuários</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>SLA de 24h para problemas médios</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Relatório mensal básico</span>
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
								Mais Popular
							</span>
						</div>
						<h3 className="text-xl font-bold mb-4 text-brand-gold-400">
							Profissional
						</h3>
						<div className="text-3xl font-bold text-brand-gold-500 mb-6">
							R$ 5.500/mês
						</div>
						<ul className="space-y-3 text-brand-gray-300 mb-8">
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Suporte 24/7</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Até 50 usuários</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Monitoramento proativo</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>SLA de 4h para problemas altos</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Relatório detalhado mensal</span>
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
							Enterprise
						</h3>
						<div className="text-3xl font-bold text-brand-gold-500 mb-6">
							Sob Consulta
						</div>
						<ul className="space-y-3 text-brand-gray-300 mb-8">
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Suporte 24/7 com engenheiro dedicado</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Usuários ilimitados</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>SLA de 1h para problemas críticos</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Consultoria estratégica incluída</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-brand-green-500 mt-1">✓</span>
								<span>Relatório executivo personalizado</span>
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
					Pronto para Ter Suporte Técnico de Excelência?
				</h2>
				<p className="text-xl text-brand-gray-300 mb-8 max-w-2xl mx-auto">
					Garanta a continuidade da sua operação com nosso suporte técnico
					especializado. SLA garantido e equipe disponível 24/7.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/contact"
						className="bg-brand-gold-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold-400 transition-colors"
					>
						Solicitar Orçamento
					</a>
					<a
						href="tel:+5511999999999"
						className="border border-brand-gold-500 text-brand-gold-500 px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold-500 hover:text-black transition-colors"
					>
						Ligar Agora
					</a>
				</div>
			</section>
		</div>
	);
}
