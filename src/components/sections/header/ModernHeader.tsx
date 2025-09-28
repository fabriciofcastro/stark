"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Phone,
  Mail,
  Settings,
  Shield,
  Cloud,
  Monitor,
  Briefcase,
  Globe,
  Zap
} from "lucide-react";

// Configuração dos serviços para o menu
const services = [
  {
    id: "suporte",
    title: "Suporte Técnico",
    description: "Assistência técnica especializada",
    icon: Monitor,
    href: "/suporte-tecnico",
    color: "green",
    features: ["24/7 Disponibilidade", "Resposta Rápida", "Especialistas Certificados"]
  },
  {
    id: "nuvem",
    title: "Soluções em Nuvem",
    description: "Infraestrutura e migração cloud",
    icon: Cloud,
    href: "/cloud-vps-linux",
    color: "blue",
    features: ["AWS/Azure", "Migração Segura", "Otimização de Custos"]
  },
  {
    id: "consultoria",
    title: "Consultoria Estratégica",
    description: "Orientação em tecnologia e processos",
    icon: Briefcase,
    href: "/consultoria-tecnologica",
    color: "purple",
    features: ["Governança de TI", "Transformação Digital", "Compliance"]
  },
  {
    id: "seguranca",
    title: "Cibersegurança",
    description: "Proteção e monitoramento 24/7",
    icon: Shield,
    href: "/cyberseguranca",
    color: "red",
    features: ["Pentest Completo", "Monitoramento 24/7", "Conformidade LGPD"]
  },
  {
    id: "desenvolvimento",
    title: "Desenvolvimento Web",
    description: "Sites e aplicações modernas",
    icon: Globe,
    href: "/create-site",
    color: "orange",
    features: ["SEO Otimizado", "Performance", "Design Responsivo"]
  },
  {
    id: "governanca",
    title: "Governança de TI",
    description: "Estruturação de processos e políticas",
    icon: Settings,
    href: "/governance",
    color: "indigo",
    features: ["COBIT & ITIL", "ISO 27001", "Auditoria Completa"]
  }
];

const navigation = [
  { name: "Início", href: "/" },
  { name: "Serviços", href: "/services", hasDropdown: true },
  { name: "Sobre", href: "/sobre" },
  { name: "Blog", href: "/blog" },
  { name: "Contato", href: "/contact" }
];

const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const headerOpacity = useTransform(scrollY, [0, 50], [0.95, 0.98]);


  // Gerenciar abertura/fechamento do menu de serviços
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 300);
  };

  // Fechar menu móvel
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Detectar clique fora do menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Bloquear scroll quando menu móvel estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: headerHeight,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Background com glassmorphism */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-brand-green-900/90 via-brand-green-800/85 to-brand-gold-900/80"
          style={{ opacity: headerOpacity }}
        />
        
        {/* Borda inferior sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-brand-gold-400 to-brand-gold-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Zap className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-brand-gold-400/20 to-brand-gold-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl lg:text-2xl font-bold text-white group-hover:text-brand-gold-300 transition-colors duration-300">
                      STARK
                    </h1>
                    <p className="text-xs lg:text-sm text-brand-gold-300 font-medium">
                      GESTÃO EM TECNOLOGIA
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Navegação Desktop */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navigation.map((item) => (
                  <div key={item.name} className="relative">
                    {item.hasDropdown ? (
                      <div className="relative">
                        <button
                          type="button"
                          className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive(item.href)
                              ? "text-brand-gold-300 bg-white/10"
                              : "text-white/90 hover:text-white hover:bg-white/5"
                          }`}
                          onMouseEnter={handleServicesMouseEnter}
                          onMouseLeave={handleServicesMouseLeave}
                        >
                          <span>{item.name}</span>
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isServicesOpen ? "rotate-180" : ""
                            }`} 
                          />
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive(item.href)
                            ? "text-brand-gold-300 bg-white/10"
                            : "text-white/90 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* CTA e Menu Mobile */}
              <div className="flex items-center space-x-3">
                {/* Botão de contato */}
                <motion.div
                  className="hidden sm:block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact">
                    <Button className="bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                      <Phone className="w-4 h-4 mr-2" />
                      Fale Conosco
                    </Button>
                  </Link>
                </motion.div>

                {/* Botão do menu móvel */}
                <motion.button
                  type="button"
                  className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Abrir menu de navegação"
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Menu de Serviços Desktop */}
          <AnimatePresence>
            {isServicesOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-2xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <motion.div
                          key={service.id}
                          className="group"
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            href={service.href}
                            className="block p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`p-3 rounded-lg bg-${service.color}-500/20 group-hover:bg-${service.color}-500/30 transition-colors duration-300`}>
                                <IconComponent className={`w-6 h-6 text-${service.color}-400`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-gold-600 transition-colors duration-300">
                                  {service.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {service.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {service.features.map((feature) => (
                                    <span
                                      key={feature}
                                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-gold-500 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Menu Móvel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            
            {/* Menu Drawer */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white/95 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Header do menu móvel */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-gold-400 to-brand-gold-600 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">STARK</h2>
                      <p className="text-xs text-gray-600">GESTÃO EM TECNOLOGIA</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navegação móvel */}
                <nav className="flex-1 px-6 py-6 space-y-2">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            Serviços
                          </div>
                          <div className="space-y-1">
                            {services.map((service) => {
                              const IconComponent = service.icon;
                              return (
                                <Link
                                  key={service.id}
                                  href={service.href}
                                  onClick={closeMobileMenu}
                                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                  <div className={`p-2 rounded-lg bg-${service.color}-500/20`}>
                                    <IconComponent className={`w-5 h-5 text-${service.color}-500`} />
                                  </div>
                                  <div>
                                    <div className="font-medium">{service.title}</div>
                                    <div className="text-sm text-gray-500">{service.description}</div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className={`block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                            isActive(item.href) ? "bg-brand-gold-50 text-brand-gold-700 font-semibold" : ""
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Footer do menu móvel */}
                <div className="p-6 border-t border-gray-200 space-y-4">
                  <Link href="/contact" onClick={closeMobileMenu}>
                    <Button className="w-full bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-white font-semibold py-3 rounded-lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Fale Conosco
                    </Button>
                  </Link>
                  
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <a href="tel:+5511994396469" className="flex items-center space-x-2 hover:text-brand-gold-600 transition-colors">
                      <Phone className="w-4 h-4" />
                      <span>(11) 99439-6469</span>
                    </a>
                    <a href="mailto:contato@fernandohenrique.dev" className="flex items-center space-x-2 hover:text-brand-gold-600 transition-colors">
                      <Mail className="w-4 h-4" />
                      <span>E-mail</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Espaçamento para o header fixo */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export { ModernHeader };
