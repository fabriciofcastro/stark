import type { Metadata } from "next";
import LegalStructuredData from "@/components/seo/legal-structured-data";

export const metadata: Metadata = {
	title: "LGPD - Lei Geral de Proteção de Dados | STARK Gestão em Tecnologia",
	description:
		"Política de proteção de dados pessoais da STARK conforme a Lei Geral de Proteção de Dados (LGPD). Conheça seus direitos e como protegemos suas informações.",
	robots: {
		index: true,
		follow: true,
	},
};

export default function LGPD() {
	return (
		<>
			<LegalStructuredData
				type="lgpd"
				title="LGPD - Lei Geral de Proteção de Dados | STARK Gestão em Tecnologia"
				description="Política de proteção de dados pessoais da STARK conforme a Lei Geral de Proteção de Dados (LGPD). Conheça seus direitos e como protegemos suas informações."
				lastModified={new Date().toISOString()}
				organizationName="STARK Gestão em Tecnologia"
				organizationUrl="https://starkgestao.com.br"
			/>
			<div className="container mx-auto px-4 py-16 max-w-4xl">
				<h1 className="text-4xl font-bold text-center mb-8 text-brand-gold-500">
					Lei Geral de Proteção de Dados (LGPD)
				</h1>

				<div className="prose prose-lg max-w-none text-brand-gray-300 space-y-6">
					<section className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-blue-500">
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							1. Introdução
						</h2>
						<p>
							A STARK Gestão em Tecnologia está comprometida com a proteção dos
							seus dados pessoais e cumpre rigorosamente a Lei Geral de Proteção
							de Dados (LGPD - Lei nº 13.709/2018). Esta política explica como
							coletamos, utilizamos, armazenamos e protegemos suas informações
							pessoais.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							2. Dados Pessoais Coletados
						</h2>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-brand-green-800 p-6 rounded-lg">
								<h3 className="text-xl font-semibold mb-3 text-brand-cyan-500">
									Dados de Identificação
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Nome completo</li>
									<li>E-mail</li>
									<li>Telefone</li>
									<li>Empresa</li>
									<li>Cargo/Função</li>
								</ul>
							</div>
							<div className="bg-brand-green-800 p-6 rounded-lg">
								<h3 className="text-xl font-semibold mb-3 text-brand-orange-500">
									Dados Técnicos
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Endereço IP</li>
									<li>Informações do navegador</li>
									<li>Dados de navegação</li>
									<li>Cookies e tecnologias similares</li>
									<li>Logs de acesso</li>
								</ul>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							3. Finalidades do Tratamento
						</h2>
						<div className="space-y-4">
							<div className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-gold-500">
								<h3 className="text-xl font-semibold mb-3 text-brand-gold-400">
									Prestação de Serviços
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Suporte técnico especializado</li>
									<li>Consultoria em tecnologia</li>
									<li>Desenvolvimento de soluções</li>
									<li>Manutenção de sistemas</li>
								</ul>
							</div>
							<div className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-blue-500">
								<h3 className="text-xl font-semibold mb-3 text-brand-blue-400">
									Comunicação e Marketing
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Envio de propostas comerciais</li>
									<li>Newsletter e atualizações</li>
									<li>Convites para eventos</li>
									<li>Campanhas promocionais</li>
								</ul>
							</div>
							<div className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-cyan-500">
								<h3 className="text-xl font-semibold mb-3 text-brand-cyan-400">
									Melhoria de Serviços
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Análise de uso do site</li>
									<li>Desenvolvimento de novos produtos</li>
									<li>Pesquisas de satisfação</li>
									<li>Otimização de processos</li>
								</ul>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							4. Base Legal
						</h2>
						<p className="mb-4">
							O tratamento de dados pessoais é realizado com base nas seguintes
							hipóteses legais previstas na LGPD:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong className="text-brand-gold-400">Consentimento:</strong>{" "}
								Para comunicações de marketing e newsletter
							</li>
							<li>
								<strong className="text-brand-gold-400">
									Execução de Contrato:
								</strong>{" "}
								Para prestação de serviços contratados
							</li>
							<li>
								<strong className="text-brand-gold-400">
									Legítimo Interesse:
								</strong>{" "}
								Para análise e melhoria de serviços
							</li>
							<li>
								<strong className="text-brand-gold-400">
									Cumprimento de Obrigação Legal:
								</strong>{" "}
								Para atendimento a exigências legais
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							5. Seus Direitos
						</h2>
						<div className="grid md:grid-cols-2 gap-4">
							<div className="bg-brand-green-800 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Acesso aos Dados
								</h4>
								<p className="text-sm text-brand-gray-300">
									Solicitar informações sobre o tratamento dos seus dados
								</p>
							</div>
							<div className="bg-brand-green-800 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Correção
								</h4>
								<p className="text-sm text-brand-gray-300">
									Corrigir dados incompletos, inexatos ou desatualizados
								</p>
							</div>
							<div className="bg-brand-green-800 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Anonimização
								</h4>
								<p className="text-sm text-brand-gray-300">
									Solicitar a anonimização de dados desnecessários
								</p>
							</div>
							<div className="bg-brand-green-800 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Portabilidade
								</h4>
								<p className="text-sm text-brand-gray-300">
									Solicitar a portabilidade dos dados para outro fornecedor
								</p>
							</div>
							<div className="bg-brand-green-800 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Eliminação
								</h4>
								<p className="text-sm text-brand-gray-300">
									Solicitar a eliminação dos dados pessoais
								</p>
							</div>
							<div className="bg-brand-green-800 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Revogação
								</h4>
								<p className="text-sm text-brand-gray-300">
									Revogar o consentimento a qualquer momento
								</p>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							6. Segurança dos Dados
						</h2>
						<div className="bg-brand-green-800 p-6 rounded-lg">
							<p className="mb-4">
								Implementamos medidas técnicas e organizacionais para proteger
								seus dados pessoais:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
								<li>Criptografia de dados em trânsito e em repouso</li>
								<li>Controle de acesso baseado em funções</li>
								<li>Monitoramento contínuo de segurança</li>
								<li>Backup seguro e recuperação de dados</li>
								<li>Treinamento regular da equipe em segurança</li>
								<li>Auditorias periódicas de segurança</li>
							</ul>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							7. Compartilhamento de Dados
						</h2>
						<p className="mb-4">
							Seus dados pessoais podem ser compartilhados apenas nas seguintes
							situações:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong className="text-brand-gold-400">
									Prestadores de Serviço:
								</strong>{" "}
								Empresas que nos auxiliam na prestação de serviços
							</li>
							<li>
								<strong className="text-brand-gold-400">
									Exigência Legal:
								</strong>{" "}
								Quando exigido por autoridades competentes
							</li>
							<li>
								<strong className="text-brand-gold-400">Consentimento:</strong>{" "}
								Quando você autorizar expressamente
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							8. Retenção de Dados
						</h2>
						<p>
							Mantemos seus dados pessoais apenas pelo tempo necessário para
							cumprir as finalidades descritas nesta política ou conforme
							exigido por lei. Dados de clientes ativos são mantidos durante a
							vigência do contrato e por até 5 anos após o término, para fins de
							auditoria e compliance.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							9. Encarregado de Dados (DPO)
						</h2>
						<div className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-red-500">
							<p className="mb-2">
								<strong className="text-brand-red-400">Contato do DPO:</strong>
							</p>
							<p className="text-brand-gray-300">
								E-mail: dpo@starkgestao.com.br
							</p>
							<p className="text-brand-gray-300">Telefone: (11) 99999-9999</p>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							10. Contato
						</h2>
						<p>
							Para exercer seus direitos ou esclarecer dúvidas sobre esta
							política, entre em contato conosco através dos canais disponíveis
							em nossa página de contato.
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
							<a
								href="/termos-de-uso"
								className="block p-4 bg-brand-green-700 rounded-lg hover:bg-brand-green-600 transition-colors duration-300"
							>
								<h4 className="font-semibold text-brand-cyan-400 mb-2">
									Termos de Uso
								</h4>
								<p className="text-sm text-brand-gray-300">
									Condições de uso dos serviços
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
