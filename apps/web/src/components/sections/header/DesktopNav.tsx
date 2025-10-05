"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ServicesDropdown } from "./ServicesDropdown";

type DesktopNavProps = {
	isServicesOpen: boolean;
	openServices: () => void;
	scheduleCloseServices: () => void;
	activeAnchor: "servicos" | "sobre" | "contato" | null;
	setActiveAnchor: (v: "servicos" | "sobre" | "contato" | null) => void;
};

const DesktopNav = ({
	isServicesOpen,
	openServices,
	scheduleCloseServices,
	activeAnchor,
	setActiveAnchor,
}: DesktopNavProps) => {
	const pathname = usePathname();
	return (
		<nav
			className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 whitespace-nowrap"
			aria-label="Navegação principal"
		>
			<ServicesDropdown
				isOpen={isServicesOpen}
				onOpen={openServices}
				onCloseSchedule={scheduleCloseServices}
				isActive={
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
				}
			/>
			<Link
				href="/blog"
				className={`relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg group ${
					pathname?.startsWith("/blog") 
						? "bg-white/10 text-white shadow-lg shadow-cyan-500/20" 
						: "hover:bg-white/5"
				}`}
				aria-current={pathname?.startsWith("/blog") ? "page" : undefined}
			>
				<span className="relative z-10 font-medium">Blog</span>
				{pathname?.startsWith("/blog") && (
					<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-sm" />
				)}
			</Link>
			<Link
				href="/#sobre"
				onClick={() => setActiveAnchor("sobre")}
				className={`relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg group ${
					pathname === "/" && activeAnchor === "sobre"
						? "bg-white/10 text-white shadow-lg shadow-cyan-500/20" 
						: "hover:bg-white/5"
				}`}
				aria-current={
					pathname === "/" && activeAnchor === "sobre" ? "page" : undefined
				}
			>
				<span className="relative z-10 font-medium">Sobre</span>
				{pathname === "/" && activeAnchor === "sobre" && (
					<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-sm" />
				)}
			</Link>
			<Link
				href="/trabalhe-conosco"
				className={`relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg group ${
					pathname?.startsWith("/trabalhe-conosco")
						? "bg-white/10 text-white shadow-lg shadow-cyan-500/20" 
						: "hover:bg-white/5"
				}`}
				aria-current={pathname?.startsWith("/trabalhe-conosco") ? "page" : undefined}
			>
				<span className="relative z-10 font-medium">Trabalhe Conosco</span>
				{pathname?.startsWith("/trabalhe-conosco") && (
					<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-sm" />
				)}
			</Link>
		</nav>
	);
};

export { DesktopNav };
