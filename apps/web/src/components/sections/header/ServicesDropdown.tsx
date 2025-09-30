"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ClipboardList,
  Headset,
  Layout as LayoutIcon,
  LifeBuoy,
  Server,
  Shield,
  Briefcase,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

type ServicesDropdownProps = {
  isOpen: boolean;
  onOpen: () => void;
  onCloseSchedule: () => void;
  isActive?: boolean;
};

const ServicesDropdown = ({
  isOpen,
  onOpen,
  onCloseSchedule,
  isActive = false,
}: ServicesDropdownProps) => {
  const triggerRef = React.useRef<HTMLAnchorElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const menuId = React.useId();

  const focusFirstItem = () => {
    const first =
      menuRef.current?.querySelector<HTMLElement>("[role='menuitem']");
    first?.focus();
  };

  const moveFocus = (direction: 1 | -1) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>("[role='menuitem']") ?? [],
    );
    if (items.length === 0) return;
    const active = document.activeElement as HTMLElement | null;
    const idx = Math.max(
      0,
      items.findIndex((el) => el === active),
    );
    const nextIdx = (idx + direction + items.length) % items.length;
    items[nextIdx]?.focus();
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
      setTimeout(focusFirstItem, 0);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onOpen();
      setTimeout(focusFirstItem, 0);
    }
  };

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      triggerRef.current?.focus();
      onCloseSchedule();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      moveFocus(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveFocus(-1);
    } else if (e.key === "Tab") {
      // fecha ao tabular para fora
      onCloseSchedule();
    }
  };

  const services = [
    {
      href: "/suporte-tecnico",
      icon: LifeBuoy,
      title: "Suporte Técnico",
      description:
        "Atendimento remoto e presencial para dispositivos e usuários",
      badges: ["SLA 24h", "Remoto/Presencial"],
      color: "brand-gold",
    },
    {
      href: "/suporte-tecnico-empresarial",
      icon: Users,
      title: "Suporte Empresarial",
      description: "Suporte 24/7, SLA garantido e monitoramento proativo",
      badges: ["24/7 Disponível", "SLA 1h"],
      color: "green",
      popular: true,
    },
    {
      href: "/consultoria-tecnologica",
      icon: Briefcase,
      title: "Consultoria Tecnológica",
      description: "Transformação digital e estratégia tecnológica",
      badges: ["Estratégico", "ROI Comprovado"],
      color: "blue",
    },
    {
      href: "/governanca",
      icon: ClipboardList,
      title: "Governança de TI",
      description: "Processos, políticas, riscos e conformidade",
      badges: ["COBIT & ITIL", "ISO 27001"],
      color: "purple",
    },
    {
      href: "/cloud-vps-linux",
      icon: Server,
      title: "Cloud / VPS / Linux",
      description: "Provisionamento, hardening, backups e alta disponibilidade",
      badges: ["99.9% Uptime", "Alta Disponibilidade"],
      color: "cyan",
    },
    {
      href: "/create-site",
      icon: LayoutIcon,
      title: "Criação de Sites",
      description: "SEO técnico, performance e conversão",
      badges: ["SEO Otimizado", "Performance"],
      color: "orange",
    },
    {
      href: "/cyberseguranca",
      icon: Shield,
      title: "Cibersegurança",
      description: "Pentest, SOC/MDR e resposta a incidentes",
      badges: ["Pentest Completo", "Monitoramento 24/7"],
      color: "red",
    },
    {
      href: "/helpdesk",
      icon: Headset,
      title: "Help Desk",
      description: "Chamados, base de conhecimento e status",
      badges: ["Sistema de Tickets", "Base de Conhecimento"],
      color: "teal",
    },
  ];

  return (
    <div className="relative">
      <Link
        href="/services"
        className={`text-white link-brand px-2 py-2 rounded transition-all duration-300 hover:border-2 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/30 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer ${isActive ? "is-active" : ""}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-current={isActive ? "page" : undefined}
        onFocus={onOpen}
        onMouseEnter={onOpen}
        onMouseLeave={onCloseSchedule}
        onClick={(e) => {
          // Allow normal navigation for the services page
          // But open the dropdown for users who want to see options without navigating
          if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
            // Allow default behavior for new tab/window
            return;
          }
          // For normal clicks, we'll navigate to the services page
          // But first close the dropdown if it's open
          if (isOpen) {
            onCloseSchedule();
          }
        }}
        onKeyDown={onTriggerKeyDown}
        ref={triggerRef}
      >
        Serviços
      </Link>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            role="menu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 mt-3 w-[min(95vw,700px)] sm:w-[min(92vw,800px)] rounded-xl gold-border-animated bg-[hsl(var(--brand-green-800))]/95 backdrop-blur-md p-[1px] z-30 shadow-2xl shadow-black/30 hover:shadow-3xl hover:shadow-black/40 transition-all duration-300"
            onMouseEnter={onOpen}
            onMouseLeave={onCloseSchedule}
            onKeyDown={onMenuKeyDown}
            ref={menuRef}
          >
            <div className="rounded-[calc(theme(borderRadius.xl)-1px)] bg-[hsl(var(--brand-green-800))]/95 p-4 sm:p-6 shadow-2xl">
              {/* Header moderno */}
              <div className="mb-6 sm:mb-8 text-center">
                <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-brand-gold-400 animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-brand-gold-300 animate-pulse delay-75"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-gold-500 animate-pulse delay-150"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-white via-brand-gold-300 to-brand-gold-400 bg-clip-text text-transparent">
                  Nossos Serviços
                </h3>
                <p className="text-brand-gray-300 text-xs sm:text-sm">
                  Soluções especializadas para transformar seu negócio
                </p>
              </div>

              {/* Lista de serviços moderna */}
              <div className="space-y-1">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  const colorClasses = {
                    "brand-gold":
                      "from-brand-gold-500/20 to-brand-gold-600/30 text-brand-gold-400 group-hover:text-brand-gold-300",
                    green:
                      "from-green-500/20 to-green-600/30 text-green-400 group-hover:text-green-300",
                    blue: "from-blue-500/20 to-blue-600/30 text-blue-400 group-hover:text-blue-300",
                    purple:
                      "from-purple-500/20 to-purple-600/30 text-purple-400 group-hover:text-purple-300",
                    cyan: "from-cyan-500/20 to-cyan-600/30 text-cyan-400 group-hover:text-cyan-300",
                    orange:
                      "from-orange-500/20 to-orange-600/30 text-orange-400 group-hover:text-orange-300",
                    red: "from-red-500/20 to-red-600/30 text-red-400 group-hover:text-red-300",
                    teal: "from-teal-500/20 to-teal-600/30 text-teal-400 group-hover:text-teal-300",
                  };

                  return (
                    <motion.div
                      key={service.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={service.href}
                        role="menuitem"
                        className="group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-500/50 hover:border-2 hover:border-white/30 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                      >
                        {/* Badge Popular - melhor posicionado */}
                        {service.popular && (
                          <div className="absolute top-2 right-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                              Popular
                            </span>
                          </div>
                        )}

                        {/* Ícone com animação */}
                        <div
                          className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${colorClasses[service.color as keyof typeof colorClasses]} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}
                        >
                          <IconComponent
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            aria-hidden="true"
                          />
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                            <div className="font-semibold text-white group-hover:text-brand-gold-300 transition-colors text-sm sm:text-base">
                              {service.title}
                            </div>
                            {/* Badges apenas em desktop */}
                            <div className="hidden sm:flex items-center gap-2 text-xs text-brand-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {service.badges.map((badge) => (
                                <span key={badge}>• {badge}</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-brand-gray-300 text-xs sm:text-sm group-hover:text-white/90 transition-colors leading-relaxed">
                            {service.description}
                          </p>
                          {/* Badges em mobile - abaixo da descrição */}
                          <div className="sm:hidden flex items-center gap-2 text-xs text-brand-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                            {service.badges.map((badge) => (
                              <span key={badge}>• {badge}</span>
                            ))}
                          </div>
                        </div>

                        {/* Seta animada */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-brand-gold-400 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer moderno */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                <Link
                  href="/services"
                  className="group flex items-center justify-center gap-2 sm:gap-3 w-full px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-brand-gold-400 hover:text-white hover:bg-gradient-to-r hover:from-brand-gold-500/10 hover:to-brand-gold-600/5 rounded-lg transition-all duration-500 border border-transparent hover:border-2 hover:border-brand-gold-500/40 hover:shadow-2xl hover:shadow-brand-gold-500/20 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="group-hover:font-semibold transition-all duration-300">
                    Ver todos os serviços
                  </span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ServicesDropdown };
