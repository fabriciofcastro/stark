import type { Metadata } from "next";
import LegalStructuredData from "@/components/seo/legal-structured-data";

export const metadata: Metadata = {
	title: "Política de Privacidade | STARK Gestão em Tecnologia",
	description:
		"Política de privacidade da STARK Gestão em Tecnologia. Saiba como coletamos, utilizamos e protegemos seus dados pessoais conforme a LGPD.",
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: "Política de Privacidade | STARK Gestão em Tecnologia",
		description:
			"Política de privacidade da STARK Gestão em Tecnologia. Saiba como coletamos, utilizamos e protegemos seus dados pessoais conforme a LGPD.",
		type: "website",
	},
};

export default function PoliticaPrivacidadePage() {
	return (
		<>
			<LegalStructuredData
				type="privacy"
				title="Política de Privacidade | STARK Gestão em Tecnologia"
				description="Política de privacidade da STARK Gestão em Tecnologia. Saiba como coletamos, utilizamos e protegemos seus dados pessoais conforme a LGPD."
				lastModified={new Date().toISOString()}
				organizationName="STARK Gestão em Tecnologia"
				organizationUrl="https://starkgestao.com.br"
			/>
			<div className="container mx-auto px-4 py-16 max-w-4xl">
				<h1 className="text-4xl font-bold text-center mb-8 text-brand-gold-500">
					Política de Privacidade
				</h1>

				<div className="prose prose-lg max-w-none text-brand-gray-300 space-y-6">
					<section className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-blue-500">
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							1. Introdução
						</h2>
						<p>
							A STARK Gestão em Tecnologia está comprometida com a proteção da
							privacidade e dos dados pessoais de nossos clientes e visitantes.
							Esta Política de Privacidade descreve como coletamos, utilizamos,
							armazenamos e protegemos suas informações pessoais, em
							conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº
							13.709/2018).
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
									<li>Endereço de e-mail</li>
									<li>Número de telefone</li>
									<li>Nome da empresa</li>
									<li>Cargo ou função</li>
									<li>Endereço comercial</li>
								</ul>
							</div>
							<div className="bg-brand-green-800 p-6 rounded-lg">
								<h3 className="text-xl font-semibold mb-3 text-brand-orange-500">
									Dados Técnicos
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Endereço IP</li>
									<li>Informações do navegador</li>
									<li>Dados de navegação no site</li>
									<li>Cookies e tecnologias similares</li>
									<li>Logs de acesso e atividade</li>
									<li>Dados de localização (quando permitido)</li>
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
									<li>Consultoria em tecnologia da informação</li>
									<li>Desenvolvimento de soluções personalizadas</li>
									<li>Manutenção e monitoramento de sistemas</li>
									<li>Implementação de projetos de TI</li>
								</ul>
							</div>
							<div className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-blue-500">
								<h3 className="text-xl font-semibold mb-3 text-brand-blue-400">
									Comunicação e Marketing
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Envio de propostas comerciais</li>
									<li>Newsletter e atualizações técnicas</li>
									<li>Convites para eventos e webinars</li>
									<li>Campanhas promocionais</li>
									<li>Comunicações sobre novos serviços</li>
								</ul>
							</div>
							<div className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-cyan-500">
								<h3 className="text-xl font-semibold mb-3 text-brand-cyan-400">
									Melhoria de Serviços
								</h3>
								<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
									<li>Análise de uso do site e serviços</li>
									<li>Desenvolvimento de novos produtos</li>
									<li>Pesquisas de satisfação do cliente</li>
									<li>Otimização de processos internos</li>
									<li>Análise de tendências do mercado</li>
								</ul>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							4. Base Legal para Tratamento
						</h2>
						<p className="mb-4">
							O tratamento de dados pessoais é realizado com base nas seguintes
							hipóteses legais previstas na LGPD:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong className="text-brand-gold-400">Consentimento:</strong>{" "}
								Para comunicações de marketing, newsletter e cookies não
								essenciais
							</li>
							<li>
								<strong className="text-brand-gold-400">
									Execução de Contrato:
								</strong>{" "}
								Para prestação de serviços contratados e cumprimento de
								obrigações
							</li>
							<li>
								<strong className="text-brand-gold-400">
									Legítimo Interesse:
								</strong>{" "}
								Para análise e melhoria de serviços, segurança e prevenção de
								fraudes
							</li>
							<li>
								<strong className="text-brand-gold-400">
									Cumprimento de Obrigação Legal:
								</strong>{" "}
								Para atendimento a exigências legais e regulamentares
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
									pessoais
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
								Implementamos medidas técnicas e organizacionais rigorosas para
								proteger seus dados pessoais:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
								<li>Criptografia de dados em trânsito e em repouso</li>
								<li>Controle de acesso baseado em funções e privilégios</li>
								<li>Monitoramento contínuo de segurança 24/7</li>
								<li>Backup seguro e recuperação de dados</li>
								<li>
									Treinamento regular da equipe em segurança da informação
								</li>
								<li>Auditorias periódicas de segurança e compliance</li>
								<li>Certificações de segurança e conformidade</li>
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
						<div className="grid md:grid-cols-2 gap-4">
							<div className="bg-brand-green-700 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Prestadores de Serviço
								</h4>
								<p className="text-sm text-brand-gray-300">
									Empresas que nos auxiliam na prestação de serviços, sempre com
									garantias contratuais de segurança
								</p>
							</div>
							<div className="bg-brand-green-700 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Exigência Legal
								</h4>
								<p className="text-sm text-brand-gray-300">
									Quando exigido por autoridades competentes ou ordem judicial
								</p>
							</div>
							<div className="bg-brand-green-700 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Consentimento
								</h4>
								<p className="text-sm text-brand-gray-300">
									Quando você autorizar expressamente o compartilhamento
								</p>
							</div>
							<div className="bg-brand-green-700 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Proteção de Direitos
								</h4>
								<p className="text-sm text-brand-gray-300">
									Para proteger nossos direitos, propriedade ou segurança
								</p>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							8. Cookies e Tecnologias Similares
						</h2>
						<p className="mb-4">
							Utilizamos cookies e tecnologias similares para melhorar sua
							experiência em nosso site:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong className="text-brand-gold-400">
									Cookies Essenciais:
								</strong>{" "}
								Necessários para o funcionamento básico do site
							</li>
							<li>
								<strong className="text-brand-gold-400">
									Cookies Analíticos:
								</strong>{" "}
								Para análise de tráfego e comportamento do usuário
							</li>
							<li>
								<strong className="text-brand-gold-400">
									Cookies de Marketing:
								</strong>{" "}
								Para personalização de conteúdo e anúncios
							</li>
						</ul>
						<p className="mt-4">
							Você pode gerenciar suas preferências de cookies através do banner
							de consentimento ou configurações do seu navegador.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							9. Retenção de Dados
						</h2>
						<p>
							Mantemos seus dados pessoais apenas pelo tempo necessário para
							cumprir as finalidades descritas nesta política ou conforme
							exigido por lei. Dados de clientes ativos são mantidos durante a
							vigência do contrato e por até 5 anos após o término, para fins de
							auditoria e compliance. Dados de marketing são mantidos até que
							você solicite a exclusão ou revogue o consentimento.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							10. Encarregado de Dados (DPO)
						</h2>
						<div className="bg-brand-green-800 p-6 rounded-lg border-l-4 border-brand-red-500">
							<p className="mb-2">
								<strong className="text-brand-red-400">Contato do DPO:</strong>
							</p>
							<p className="text-brand-gray-300">
								E-mail: dpo@starkgestao.com.br
							</p>
							<p className="text-brand-gray-300">Telefone: (11) 99439-6469</p>
							<p className="text-brand-gray-300">
								Endereço: Av. Paulista, 1000 - Itaquaquecetuba - SP
							</p>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							11. Alterações na Política
						</h2>
						<p>
							Esta Política de Privacidade pode ser atualizada periodicamente
							para refletir mudanças em nossas práticas ou na legislação
							aplicável. Recomendamos que você revise esta página regularmente.
							Alterações significativas serão comunicadas através de nosso site
							ou por e-mail.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							12. Contato
						</h2>
						<p>
							Para exercer seus direitos, esclarecer dúvidas sobre esta política
							ou reportar violações de dados, entre em contato conosco através
							dos canais disponíveis em nossa página de contato ou diretamente
							com o DPO.
						</p>
					</section>

					{/* Navegação entre páginas legais */}
					<div className="bg-brand-green-800 p-6 rounded-lg mt-8 border-l-4 border-brand-gold-500">
						<h3 className="text-lg font-semibold mb-4 text-brand-gold-400">
							Documentos Relacionados
						</h3>
						<div className="grid md:grid-cols-3 gap-4">
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
