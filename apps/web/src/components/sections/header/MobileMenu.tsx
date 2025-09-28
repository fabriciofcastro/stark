"use client";

import Link from "next/link";
import type { RefObject } from "react";

type MobileMenuProps = {
	isOpen: boolean;
	onClose: () => void;
	activeAnchor: "servicos" | "sobre" | "contato" | null;
	pathname: string | null;
	navRef: RefObject<HTMLDivElement>;
};

const MobileMenu = ({
	isOpen,
	onClose,
	activeAnchor,
	pathname,
	navRef,
}: MobileMenuProps) => {
	if (!isOpen) return null;
	return (
		<div
			id="primary-mobile-nav"
			className="lg:hidden overflow-hidden border-t border-white/20"
			tabIndex={-1}
			ref={navRef}
		>
			<nav
				className="flex flex-col space-y-1 py-3"
				aria-label="Navegação móvel"
			>
				<Link
					href="/services"
					className={`text-white link-brand block px-3 py-3 rounded hover:bg-white/5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] ${
						activeAnchor === "servicos" ||
						pathname?.startsWith("/services") ||
						pathname?.startsWith("/suporte-tecnico") ||
						pathname?.startsWith("/suporte-tecnico-empresarial") ||
						pathname?.startsWith("/consultoria-tecnologica") ||
						pathname?.startsWith("/governanca") ||
						pathname?.startsWith("/cloud-vps-linux") ||
						pathname?.startsWith("/create-site") ||
						pathname?.startsWith("/cyberseguranca") ||
						pathname?.startsWith("/helpdesk")
							? "is-active"
							: ""
					}`}
					aria-current={activeAnchor === "servicos" ? "page" : undefined}
					onClick={onClose}
				>
					Serviços
				</Link>
				<Link
					href="/#sobre"
					className={`text-white link-brand block px-3 py-3 rounded hover:bg-white/5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] ${
						pathname === "/" && activeAnchor === "sobre" ? "is-active" : ""
					}`}
					aria-current={
						pathname === "/" && activeAnchor === "sobre" ? "page" : undefined
					}
					onClick={onClose}
				>
					Sobre
				</Link>
				<Link
					href="/contact"
					className={`text-white link-brand block px-3 py-3 rounded hover:bg-white/5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] ${
						pathname === "/contact" ? "is-active" : ""
					}`}
					aria-current={pathname === "/contact" ? "page" : undefined}
					onClick={onClose}
				>
					Contato
				</Link>
				<Link
					href="/contact"
					className="mt-2 text-center btn-reflect-sweep btn-border-aurora rounded-lg px-4 py-3 text-white ring-1 ring-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))]"
					onClick={onClose}
				>
					Fale conosco
				</Link>
			</nav>
		</div>
	);
};

export { MobileMenu };
