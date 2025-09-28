// components/layout/header.jsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Brand, DesktopNav, MobileMenu, MobileToggle } from "./header/index";
// import { logEvent } from "@/lib/gtag";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const [activeAnchor, setActiveAnchor] = React.useState<
    "servicos" | "sobre" | "contato" | null
  >(null);
  const pathname = usePathname();
  const mobileNavRef = React.useRef<HTMLDivElement>(null!);
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null!);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const closeTimerRef = React.useRef<number | null>(null);

  const openServices = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsServicesOpen(false);
      closeTimerRef.current = null;
    }, 280);
  };

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener("keydown", onKeyDown);
      // Foca o primeiro elemento focável dentro do menu
      setTimeout(() => {
        const first = mobileNavRef.current?.querySelector<HTMLElement>(
          "a, button, [tabindex]:not([tabindex='-1'])",
        );
        first?.focus();
      }, 0);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // Focus trap e restaura foco ao fechar
  React.useEffect(() => {
    if (!isMenuOpen) {
      // Restaurar foco no botão ao fechar
      try {
        // @ts-ignore: preventScroll not always present in TS lib
        toggleButtonRef.current?.focus?.({ preventScroll: true });
      } catch {
        toggleButtonRef.current?.focus?.();
      }
      return;
    }
    const container = mobileNavRef.current;
    if (!container) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = container.querySelectorAll<HTMLElement>(
        "a, button, [tabindex]:not([tabindex='-1'])",
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !container.contains(active)) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (active === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Body scroll lock quando menu móvel estiver aberto
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mantém o item ativo do menu de acordo com o hash atual
  React.useEffect(() => {
    const setFromHash = () => {
      const currentHash = window.location.hash.replace("#", "");
      if (
        currentHash === "servicos" ||
        currentHash === "sobre" ||
        currentHash === "contato"
      ) {
        setActiveAnchor(currentHash as "servicos" | "sobre" | "contato");
      } else {
        setActiveAnchor(null);
      }
    };
    setFromHash();
    window.addEventListener("hashchange", setFromHash);
    return () => window.removeEventListener("hashchange", setFromHash);
  }, []);

  // Limpa âncora ativa ao navegar para páginas diferentes da home
  React.useEffect(() => {
    if (pathname && pathname !== "/") {
      setActiveAnchor(null);
    }
  }, [pathname]);

  const isSolidHeader = isScrolled || (pathname && pathname !== "/");
  const headerClasses = `sticky top-[calc(env(safe-area-inset-top))] z-40 backdrop-blur-md transition-all duration-300 will-change-transform ${
    isSolidHeader
      ? "bg-[hsl(var(--brand-green-900))]/90 border-b border-white/20 shadow-lg"
      : "bg-white/10 border-b border-white/20"
  }`;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
        <div className="flex items-center justify-between gap-3 sm:gap-4 py-3 lg:py-4">
          <Brand />

          {/* Mobile menu button */}
          <MobileToggle
            isOpen={isMenuOpen}
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
            buttonRef={toggleButtonRef}
          />

          {/* Desktop navigation */}
          <DesktopNav
            isServicesOpen={isServicesOpen}
            openServices={openServices}
            scheduleCloseServices={scheduleCloseServices}
            activeAnchor={activeAnchor}
            setActiveAnchor={setActiveAnchor}
          />

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-reflect-sweep btn-border-aurora rounded-lg px-4 py-2 text-white ring-1 ring-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))]"
            >
              Fale conosco
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                activeAnchor={activeAnchor}
                pathname={pathname ?? null}
                navRef={mobileNavRef}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {pathname === "/" && !isScrolled && (
        <div aria-hidden="true" className="gradient-bar" />
      )}
    </header>
  );
};

export { Header };
