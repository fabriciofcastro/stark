import type { Metadata } from "next";
import LegalStructuredData from "@/components/seo/legal-structured-data";

export const metadata: Metadata = {
	title: "Política de Cookies | STARK Gestão em Tecnologia",
	description:
		"Política de cookies da STARK Gestão em Tecnologia. Saiba como utilizamos cookies e tecnologias similares em nosso site.",
	robots: {
		index: true,
		follow: true,
	},
};

export default function PoliticaDeCookies() {
	return (
		<>
			<LegalStructuredData
				type="cookies"
				title="Política de Cookies | STARK Gestão em Tecnologia"
				description="Política de cookies da STARK Gestão em Tecnologia. Saiba como utilizamos cookies e tecnologias similares em nosso site."
				lastModified={new Date().toISOString()}
				organizationName="STARK Gestão em Tecnologia"
				organizationUrl="https://starkgestao.com.br"
			/>
			<div className="container mx-auto px-4 py-16 max-w-4xl">
				<h1 className="text-4xl font-bold text-center mb-8 text-brand-gold-500">
					Política de Cookies
				</h1>

				<div className="prose prose-lg max-w-none text-brand-gray-300 space-y-6">
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							1. O que são Cookies
						</h2>
						<p>
							Cookies são pequenos arquivos de texto armazenados no seu
							dispositivo quando você visita nosso site. Eles nos ajudam a
							melhorar sua experiência, analisar o tráfego e personalizar
							conteúdo.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							2. Tipos de Cookies que Utilizamos
						</h2>

						<div className="bg-brand-green-800 p-6 rounded-lg mb-6">
							<h3 className="text-xl font-semibold mb-3 text-brand-gold-400">
								Cookies Essenciais
							</h3>
							<p className="mb-4">
								Necessários para o funcionamento básico do site e não podem ser
								desativados.
							</p>
							<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
								<li>Cookies de sessão</li>
								<li>Cookies de segurança</li>
								<li>Cookies de preferências de idioma</li>
							</ul>
						</div>

						<div className="bg-brand-green-800 p-6 rounded-lg mb-6">
							<h3 className="text-xl font-semibold mb-3 text-brand-cyan-500">
								Cookies de Análise
							</h3>
							<p className="mb-4">
								Coletam informações sobre como você usa nosso site para nos
								ajudar a melhorá-lo.
							</p>
							<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
								<li>Google Analytics</li>
								<li>Métricas de performance</li>
								<li>Estatísticas de uso</li>
							</ul>
						</div>

						<div className="bg-brand-green-800 p-6 rounded-lg mb-6">
							<h3 className="text-xl font-semibold mb-3 text-brand-blue-500">
								Cookies de Marketing
							</h3>
							<p className="mb-4">
								Utilizados para personalizar anúncios e medir a eficácia de
								campanhas.
							</p>
							<ul className="list-disc pl-6 space-y-2 text-brand-gray-300">
								<li>Cookies de remarketing</li>
								<li>Pixel do Facebook</li>
								<li>Chatwoot (suporte)</li>
							</ul>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							3. Como Gerenciar Cookies
						</h2>
						<p className="mb-4">
							Você pode controlar e gerenciar cookies através das configurações
							do seu navegador:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong className="text-brand-gold-400">Chrome:</strong>{" "}
								Configurações → Privacidade e segurança → Cookies
							</li>
							<li>
								<strong className="text-brand-gold-400">Firefox:</strong> Opções
								→ Privacidade e segurança → Cookies
							</li>
							<li>
								<strong className="text-brand-gold-400">Safari:</strong>{" "}
								Preferências → Privacidade → Cookies
							</li>
							<li>
								<strong className="text-brand-gold-400">Edge:</strong>{" "}
								Configurações → Cookies e permissões do site
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							4. Cookies de Terceiros
						</h2>
						<p className="mb-4">
							Utilizamos serviços de terceiros que podem definir cookies:
						</p>
						<div className="grid md:grid-cols-2 gap-4">
							<div className="bg-brand-green-700 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Google Analytics
								</h4>
								<p className="text-sm text-brand-gray-300">
									Análise de tráfego e comportamento do usuário
								</p>
							</div>
							<div className="bg-brand-green-700 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Chatwoot
								</h4>
								<p className="text-sm text-brand-gray-300">
									Widget de atendimento ao cliente
								</p>
							</div>
							<div className="bg-brand-green-700 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Vercel Analytics
								</h4>
								<p className="text-sm text-brand-gray-300">
									Métricas de performance do site
								</p>
							</div>
							<div className="bg-brand-green-700 p-4 rounded-lg">
								<h4 className="font-semibold text-brand-gold-400 mb-2">
									Sentry
								</h4>
								<p className="text-sm text-brand-gray-300">
									Monitoramento de erros e performance
								</p>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							5. Consentimento
						</h2>
						<p>
							Ao continuar navegando em nosso site, você concorda com o uso de
							cookies conforme descrito nesta política. Você pode retirar seu
							consentimento a qualquer momento através das configurações do seu
							navegador.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							6. Atualizações
						</h2>
						<p>
							Esta política de cookies pode ser atualizada periodicamente.
							Recomendamos que você revise esta página regularmente para estar
							ciente de quaisquer alterações.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-brand-gray-200">
							7. Contato
						</h2>
						<p>
							Para dúvidas sobre nossa política de cookies, entre em contato
							conosco através dos canais disponíveis em nossa página de contato.
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
