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
			className="lg:hidden overflow-hidden border-t border-white/20 bg-gradient-to-b from-slate-900/50 to-slate-800/30 backdrop-blur-sm"
			tabIndex={-1}
			ref={navRef}
		>
			<nav
				className="flex flex-col space-y-2 py-4 px-4"
				aria-label="Navegação móvel"
			>
				<Link
					href="/services"
					className={`relative block px-4 py-3 text-white/90 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg group ${
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
							? "bg-white/10 text-white shadow-lg shadow-cyan-500/20"
							: "hover:bg-white/5"
					}`}
					aria-current={activeAnchor === "servicos" ? "page" : undefined}
					onClick={onClose}
				>
					<span className="relative z-10 font-medium">Serviços</span>
					{(activeAnchor === "servicos" ||
						pathname?.startsWith("/services") ||
						pathname?.startsWith("/suporte-tecnico") ||
						pathname?.startsWith("/suporte-tecnico-empresarial") ||
						pathname?.startsWith("/consultoria-tecnologica") ||
						pathname?.startsWith("/governanca") ||
						pathname?.startsWith("/cloud-vps-linux") ||
						pathname?.startsWith("/create-site") ||
						pathname?.startsWith("/cyberseguranca") ||
						pathname?.startsWith("/helpdesk")) && (
						<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-sm" />
					)}
				</Link>
				<Link
					href="/#sobre"
					className={`relative block px-4 py-3 text-white/90 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg group ${
						pathname === "/" && activeAnchor === "sobre"
							? "bg-white/10 text-white shadow-lg shadow-cyan-500/20"
							: "hover:bg-white/5"
					}`}
					aria-current={
						pathname === "/" && activeAnchor === "sobre" ? "page" : undefined
					}
					onClick={onClose}
				>
					<span className="relative z-10 font-medium">Sobre</span>
					{pathname === "/" && activeAnchor === "sobre" && (
						<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-sm" />
					)}
				</Link>
				<Link
					href="/trabalhe-conosco"
					className={`relative block px-4 py-3 text-white/90 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg group ${
						pathname?.startsWith("/trabalhe-conosco")
							? "bg-white/10 text-white shadow-lg shadow-cyan-500/20"
							: "hover:bg-white/5"
					}`}
					aria-current={pathname?.startsWith("/trabalhe-conosco") ? "page" : undefined}
					onClick={onClose}
				>
					<span className="relative z-10 font-medium">Trabalhe Conosco</span>
					{pathname?.startsWith("/trabalhe-conosco") && (
						<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-sm" />
					)}
				</Link>
				<Link
					href="/contact"
					className={`relative block px-4 py-3 text-white/90 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg group ${
						pathname === "/contact"
							? "bg-white/10 text-white shadow-lg shadow-cyan-500/20"
							: "hover:bg-white/5"
					}`}
					aria-current={pathname === "/contact" ? "page" : undefined}
					onClick={onClose}
				>
					<span className="relative z-10 font-medium">Contato</span>
					{pathname === "/contact" && (
						<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-sm" />
					)}
				</Link>
				<Link
					href="/contact"
					className="relative mt-4 text-center bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-xl px-6 py-4 text-white font-medium hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group overflow-hidden"
					onClick={onClose}
				>
					<span className="relative z-10">Fale conosco</span>
					<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				</Link>
			</nav>
		</div>
	);
};

export { MobileMenu };
