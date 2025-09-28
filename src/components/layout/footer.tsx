// components/layout/footer.jsx
"use client";

import Link from "next/link";

const Footer = () => {
	return (
		<footer className="border-white/20 border-t bg-brand-green-900/30 px-4 py-12 backdrop-blur-md sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-5">
					<div className="col-span-1 md:col-span-2">
						<div className="mb-4 flex items-center space-x-2">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-gold-500 ring-2 ring-[hsl(var(--brand-gold-400))]/40">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-8 w-8 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<title id="footer-logo-title">Logotipo STARK</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
									/>
								</svg>
							</div>
							<div>
								<h4 className="font-bold text-2xl text-white">STARK</h4>
								<p className="text-brand-gold-500">GESTÃO EM TECNOLOGIA</p>
							</div>
						</div>
						<p className="mb-4 text-brand-gray-400">
							Especialistas em governança e serviços de TI, ajudando empresas a
							transformar sua infraestrutura tecnológica em um ativo
							estratégico.
						</p>
						<p className="text-brand-gray-400 text-sm">
							© 2024 STARK Gestão em Tecnologia. Todos os direitos reservados.
						</p>
					</div>

					{/* Serviços */}
					<div>
						<h5 className="mb-4 font-semibold text-lg text-white">Serviços</h5>
						<ul className="space-y-2">
							<li>
								<Link
									href="/suporte-tecnico"
									className="text-brand-gray-400 link-brand"
								>
									Suporte Técnico
								</Link>
							</li>
							<li>
								<Link
									href="/suporte-tecnico-empresarial"
									className="text-brand-gray-400 link-brand"
								>
									Suporte Empresarial
								</Link>
							</li>
							<li>
								<Link
									href="/consultoria-tecnologica"
									className="text-brand-gray-400 link-brand"
								>
									Consultoria Tecnológica
								</Link>
							</li>
							<li>
								<Link
									href="/cloud-vps-linux"
									className="text-brand-gray-400 link-brand"
								>
									Soluções em Nuvem
								</Link>
							</li>
							<li>
								<Link
									href="/governanca"
									className="text-brand-gray-400 link-brand"
								>
									Governança de TI
								</Link>
							</li>
							<li>
								<Link
									href="/cyberseguranca"
									className="text-brand-gray-400 link-brand"
								>
									Cibersegurança
								</Link>
							</li>
							<li>
								<Link
									href="/create-site"
									className="text-brand-gray-400 link-brand"
								>
									Criação de Sites
								</Link>
							</li>
						</ul>
					</div>

					{/* Empresa */}
					<div>
						<h5 className="mb-4 font-semibold text-lg text-white">Empresa</h5>
						<ul className="space-y-2">
							<li>
								<Link href="/sobre" className="text-brand-gray-400 link-brand">
									Sobre Nós
								</Link>
							</li>
							<li>
								<Link
									href="/portfolio"
									className="text-brand-gray-400 link-brand"
								>
									Portfólio
								</Link>
							</li>
							<li>
								<Link
									href="/cases-de-sucesso"
									className="text-brand-gray-400 link-brand"
								>
									Cases de Sucesso
								</Link>
							</li>
							<li>
								<Link href="/faq" className="text-brand-gray-400 link-brand">
									FAQ
								</Link>
							</li>
							<li>
								<Link href="/blog" className="text-brand-gray-400 link-brand">
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-brand-gray-400 link-brand"
								>
									Contato
								</Link>
							</li>
						</ul>
					</div>

					{/* Contato */}
					<div>
						<h5 className="mb-4 font-semibold text-lg text-white">Contato</h5>
						<ul className="space-y-2 text-brand-gray-400">
							<li className="flex items-start">
								<svg
									className="mt-0.5 mr-2 h-5 w-5 text-brand-gold-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									role="img"
									aria-labelledby="addr-title"
								>
									<title id="addr-title">Endereço</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								Av. Paulista, 1000
								<br />
								Itaquaquecetuba - SP
							</li>
							<li className="flex items-center">
								<svg
									className="mr-2 h-5 w-5 text-brand-gold-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									role="img"
									aria-labelledby="email-title"
								>
									<title id="email-title">E-mail</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								contato@starkgestao.com.br
							</li>
							<li className="flex items-center">
								<svg
									className="mr-2 h-5 w-5 text-brand-gold-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<title id="phone-title">Telefone</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
								(11) 99439-6469
							</li>
						</ul>
					</div>
				</div>
				{/* Links Legais */}
				<div className="mt-8 border-white/20 border-t pt-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						<Link
							href="/politica-de-privacidade"
							className="text-brand-gray-400 text-sm hover:text-brand-gold-400 transition-colors"
						>
							Política de Privacidade
						</Link>
						<Link
							href="/termos-de-uso"
							className="text-brand-gray-400 text-sm hover:text-brand-gold-400 transition-colors"
						>
							Termos de Uso
						</Link>
						<Link
							href="/politica-de-cookies"
							className="text-brand-gray-400 text-sm hover:text-brand-gold-400 transition-colors"
						>
							Política de Cookies
						</Link>
						<Link
							href="/lgpd"
							className="text-brand-gray-400 text-sm hover:text-brand-gold-400 transition-colors"
						>
							LGPD
						</Link>
					</div>
				</div>

				<div className="mt-6 border-white/20 border-t pt-6 text-center text-brand-gray-400">
					<p>
						Observabilidade e análise de métricas integradas | Google Analytics
						| Vercel Analytics
					</p>
					<button
						type="button"
						onClick={() => {
							window.dispatchEvent(new Event("cookie:open-preferences"));
						}}
						className="mt-3 rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white hover:bg-white/5"
					>
						Rever preferências de cookies
					</button>
				</div>
			</div>
		</footer>
	);
};

export { Footer };
