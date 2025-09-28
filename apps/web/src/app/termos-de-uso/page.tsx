import type { Metadata } from "next";
import LegalStructuredData from "@/components/seo/legal-structured-data";

export const metadata: Metadata = {
	title: "Termos de Uso | STARK Gestão em Tecnologia",
	description:
		"Termos de uso dos serviços da STARK Gestão em Tecnologia. Conheça nossas condições, políticas de uso e responsabilidades.",
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: "Termos de Uso | STARK Gestão em Tecnologia",
		description:
			"Termos de uso dos serviços da STARK Gestão em Tecnologia. Conheça nossas condições, políticas de uso e responsabilidades.",
		type: "website",
	},
};

export default function TermosDeUso() {
	return (
		<>
			<LegalStructuredData
				type="terms"
				title="Termos de Uso | STARK Gestão em Tecnologia"
				description="Termos de uso dos serviços da STARK Gestão em Tecnologia. Conheça nossas condições, políticas de uso e responsabilidades."
				lastModified={new Date().toISOString()}
				organizationName="STARK Gestão em Tecnologia"
				organizationUrl="https://starkgestao.com.br"
			/>
			<div className="container mx-auto px-4 py-16 max-w-4xl">
				<h1 className="text-4xl font-bold text-center mb-8 text-brand-gold-500">
					Termos de Uso
				</h1>

				<div className="prose prose-lg max-w-none text-brand-gray-300 space-y-6">
					<section className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-blue-500">
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							1. Aceitação dos Termos
						</h2>
						<p>
							Ao acessar e utilizar os serviços da STARK Gestão em Tecnologia,
							você concorda em cumprir e estar vinculado aos seguintes termos e
							condições de uso. Se você não concordar com qualquer parte destes
							termos, não deve utilizar nossos serviços.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							2. Descrição dos Serviços
						</h2>
						<p className="mb-4">
							A STARK oferece serviços especializados em tecnologia da
							informação, incluindo mas não se limitando a:
						</p>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-brand-green-800 p-6 rounded-lg">
								<h3 className="text-xl font-semibold mb-3 text-brand-cyan-500">
									Serviços Técnicos
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Suporte técnico especializado</li>
									<li>Consultoria em tecnologia</li>
									<li>Manutenção de sistemas</li>
									<li>Monitoramento de infraestrutura</li>
									<li>Implementação de soluções</li>
								</ul>
							</div>
							<div className="bg-brand-green-800 p-6 rounded-lg">
								<h3 className="text-xl font-semibold mb-3 text-brand-orange-500">
									Desenvolvimento
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Criação de sites e sistemas web</li>
									<li>Soluções em nuvem</li>
									<li>Segurança da informação</li>
									<li>Infraestrutura de TI</li>
									<li>Integração de sistemas</li>
								</ul>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							3. Uso Aceitável
						</h2>
						<div className="space-y-4">
							<div className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-gold-500">
								<h3 className="text-xl font-semibold mb-3 text-brand-gold-400">
									Condutas Permitidas
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Uso dos serviços conforme finalidade contratada</li>
									<li>Respeito às políticas de segurança estabelecidas</li>
									<li>Comunicação adequada e profissional</li>
									<li>Colaboração para resolução de problemas</li>
								</ul>
							</div>
							<div className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-red-500">
								<h3 className="text-xl font-semibold mb-3 text-brand-red-400">
									Condutas Proibidas
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Atividades ilegais ou não autorizadas</li>
									<li>Violar direitos de propriedade intelectual</li>
									<li>Transmitir malware ou código malicioso</li>
									<li>Interferir no funcionamento dos sistemas</li>
									<li>Realizar engenharia reversa dos serviços</li>
									<li>Compartilhar credenciais de acesso</li>
								</ul>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							4. Propriedade Intelectual
						</h2>
						<div className="bg-brand-green-800 p-6 rounded-lg">
							<p className="mb-4">
								Todo o conteúdo, marcas, logotipos, software e propriedade
								intelectual dos serviços STARK são protegidos por direitos
								autorais e outras leis de propriedade intelectual:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
								<li>Conteúdo original criado pela STARK</li>
								<li>Marca registrada "STARK Gestão em Tecnologia"</li>
								<li>Software e códigos desenvolvidos internamente</li>
								<li>Documentação técnica e manuais</li>
								<li>Metodologias e processos proprietários</li>
							</ul>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							5. Responsabilidades e Limitações
						</h2>
						<div className="space-y-4">
							<div className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-gold-500">
								<h3 className="text-xl font-semibold mb-3 text-brand-gold-400">
									Responsabilidades da STARK
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Prestar serviços com qualidade e profissionalismo</li>
									<li>Manter confidencialidade das informações do cliente</li>
									<li>Cumprir prazos acordados contratualmente</li>
									<li>Fornecer suporte técnico adequado</li>
									<li>Manter sistemas seguros e atualizados</li>
								</ul>
							</div>
							<div className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-blue-500">
								<h3 className="text-xl font-semibold mb-3 text-brand-blue-400">
									Limitações de Responsabilidade
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Não nos responsabilizamos por danos indiretos</li>
									<li>Exclusão de lucros cessantes</li>
									<li>Limitação a danos diretos comprovados</li>
									<li>Exclusão de responsabilidade por terceiros</li>
									<li>Limitação por força maior</li>
								</ul>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							6. Confidencialidade
						</h2>
						<div className="bg-brand-green-800 p-6 rounded-lg">
							<p className="mb-4">
								Ambas as partes se comprometem a manter a confidencialidade de
								informações sensíveis:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
								<li>Dados comerciais e estratégicos</li>
								<li>Informações técnicas proprietárias</li>
								<li>Dados pessoais e de clientes</li>
								<li>Processos e metodologias internas</li>
								<li>Qualquer informação marcada como confidencial</li>
							</ul>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							7. Pagamentos e Cobrança
						</h2>
						<div className="grid md:grid-cols-2 gap-4">
							<div className="bg-brand-green-800 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Formas de Pagamento
								</h4>
								<p className="text-sm text-brand-gray-300">
									Boleto bancário, PIX, cartão de crédito e transferência
									bancária
								</p>
							</div>
							<div className="bg-brand-green-800 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Prazos
								</h4>
								<p className="text-sm text-brand-gray-300">
									Conforme especificado em contrato ou proposta comercial
								</p>
							</div>
							<div className="bg-brand-green-800 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Multas
								</h4>
								<p className="text-sm text-brand-gray-300">
									Juros de 1% ao mês e multa de 2% por atraso
								</p>
							</div>
							<div className="bg-brand-green-800 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Suspensão
								</h4>
								<p className="text-sm text-brand-gray-300">
									Serviços podem ser suspensos por inadimplência
								</p>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							8. Rescisão de Contrato
						</h2>
						<p className="mb-4">
							O contrato pode ser rescindido nas seguintes situações:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong className="text-brand-gold-400">
									Rescisão Amigável:
								</strong>{" "}
								Por acordo mútuo entre as partes
							</li>
							<li>
								<strong className="text-brand-gold-400">Inadimplência:</strong>{" "}
								Por falta de pagamento após notificação
							</li>
							<li>
								<strong className="text-brand-gold-400">Descumprimento:</strong>{" "}
								Por violação dos termos contratuais
							</li>
							<li>
								<strong className="text-brand-gold-400">Força Maior:</strong>{" "}
								Por eventos extraordinários e imprevisíveis
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							9. Modificações dos Termos
						</h2>
						<div className="bg-brand-green-800 p-6 rounded-lg">
							<p className="mb-4">
								Reservamo-nos o direito de modificar estes termos a qualquer
								momento. As alterações serão comunicadas através de:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
								<li>Publicação em nosso site oficial</li>
								<li>Notificação por e-mail aos clientes ativos</li>
								<li>Comunicação através de nossos canais oficiais</li>
							</ul>
							<p className="mt-4">
								O uso continuado dos serviços após as modificações constitui
								aceitação dos novos termos.
							</p>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							10. Lei Aplicável e Foro
						</h2>
						<p>
							Estes termos são regidos pela legislação brasileira. Qualquer
							disputa ou controvérsia será resolvida nos tribunais competentes
							de Itaquaquecetuba - SP, renunciando as partes a qualquer outro
							foro, por mais privilegiado que seja.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							11. Disposições Gerais
						</h2>
						<div className="space-y-4">
							<div className="bg-brand-green-800 p-6 rounded-lg">
								<h3 className="text-xl font-semibold mb-3 text-brand-cyan-400">
									Disposições Finais
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>
										Estes termos constituem o acordo integral entre as partes
									</li>
									<li>Nenhuma modificação será válida sem acordo escrito</li>
									<li>A invalidade de uma cláusula não afeta as demais</li>
									<li>
										As partes renunciam a qualquer direito não expressamente
										previsto
									</li>
								</ul>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							12. Contato
						</h2>
						<p>
							Para dúvidas sobre estes termos, esclarecimentos ou sugestões,
							entre em contato conosco através dos canais disponíveis em nossa
							página de contato.
						</p>
					</section>

					{/* Navegação entre páginas legais */}
					<div className="bg-brand-green-800 p-6 rounded-lg mt-8 border-l-4 border-brand-gold-500">
						<h3 className="text-lg font-semibold mb-4 text-brand-gold-400">
							Documentos Relacionados
						</h3>
						<div className="grid md:grid-cols-3 gap-4">
							<a
								href="/politica-de-privacidade"
								className="block p-4 bg-brand-green-700 rounded-lg hover:bg-brand-green-600 transition-colors duration-300"
							>
								<h4 className="font-semibold text-brand-cyan-400 mb-2">
									Política de Privacidade
								</h4>
								<p className="text-sm text-brand-gray-300">
									Como protegemos seus dados
								</p>
							</a>
							<a
								href="/lgpd"
								className="block p-4 bg-brand-green-700 rounded-lg hover:bg-brand-green-600 transition-colors duration-300"
							>
								<h4 className="font-semibold text-brand-cyan-400 mb-2">LGPD</h4>
								<p className="text-sm text-brand-gray-300">
									Lei Geral de Proteção de Dados
								</p>
							</a>
							<a
								href="/politica-de-cookies"
								className="block p-4 bg-brand-green-700 rounded-lg hover:bg-brand-green-600 transition-colors duration-300"
							>
								<h4 className="font-semibold text-brand-cyan-400 mb-2">
									Política de Cookies
								</h4>
								<p className="text-sm text-brand-gray-300">
									Como utilizamos cookies
								</p>
							</a>
						</div>
					</div>

					<div className="bg-brand-green-800 p-6 rounded-lg mt-8 border-l-4 border-brand-gold-500">
						<p className="text-sm text-brand-gray-400">
							<strong className="text-brand-gold-400">
								Última atualização:
							</strong>{" "}
							{new Date().toLocaleDateString("pt-BR")}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
