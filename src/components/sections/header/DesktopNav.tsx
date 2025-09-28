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
			className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 whitespace-nowrap"
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
				className={`text-white link-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] rounded ${
					pathname?.startsWith("/blog") ? "is-active" : ""
				}`}
				aria-current={pathname?.startsWith("/blog") ? "page" : undefined}
			>
				Blog
			</Link>
			<Link
				href="/#sobre"
				onClick={() => setActiveAnchor("sobre")}
				className={`text-white link-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] rounded ${
					pathname === "/" && activeAnchor === "sobre" ? "is-active" : ""
				}`}
				aria-current={
					pathname === "/" && activeAnchor === "sobre" ? "page" : undefined
				}
			>
				Sobre
			</Link>
		</nav>
	);
};

export { DesktopNav };
