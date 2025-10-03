// components/layout/footer.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  MapPin, 
  Mail, 
  Phone, 
  ArrowUpRight,
  Shield,
  FileText,
  Cookie,
  Scale
} from "lucide-react";

const Footer = () => {
  const [floatingElements, setFloatingElements] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number }>
  >([]);

  // Generate subtle floating elements
  useEffect(() => {
    const generateElements = () => {
      const newElements = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
      }));
      setFloatingElements(newElements);
    };

    generateElements();
    const interval = setInterval(generateElements, 15000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-br from-slate-950/95 via-neutral-900/98 to-slate-950/95 backdrop-blur-xl overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Floating Elements */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute bg-gradient-to-r from-cyan-400/5 to-blue-500/5 rounded-full blur-sm"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-white/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <title>STARK Logo</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    STARK
                  </h3>
                  <p className="text-sm text-cyan-400 font-medium">GESTÃO EM TECNOLOGIA</p>
                </div>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Transformamos infraestrutura tecnológica em ativos estratégicos. 
                Especialistas em governança, segurança e inovação digital.
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>© 2024 STARK Tecnologia</span>
                <span>•</span>
                <span>Todos os direitos reservados</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Serviços</h4>
            <nav className="space-y-3">
              {[
                { href: "/suporte-tecnico", label: "Suporte Técnico" },
                { href: "/consultoria-tecnologica", label: "Consultoria" },
                { href: "/cloud-vps-linux", label: "Soluções em Nuvem" },
                { href: "/governance", label: "Governança de TI" },
                { href: "/cyberseguranca", label: "Cibersegurança" },
                { href: "/create-site", label: "Desenvolvimento Web" }
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm"
                  >
                    <ArrowUpRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Empresa</h4>
            <nav className="space-y-3">
              {[
                { href: "/sobre", label: "Sobre Nós" },
                { href: "/portfolio", label: "Portfólio" },
                { href: "/cases-de-sucesso", label: "Cases de Sucesso" },
                { href: "/faq", label: "FAQ" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contato" }
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm"
                  >
                    <ArrowUpRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10">
                <MapPin className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <h5 className="text-white font-medium mb-1">Endereço</h5>
                <p className="text-gray-400 text-sm">
                  Av. Paulista, 1000<br />
                  Itaquaquecetuba - SP
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10">
                <Mail className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <h5 className="text-white font-medium mb-1">E-mail</h5>
                <p className="text-gray-400 text-sm">
                  contato@starkgestao.com.br
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10">
                <Phone className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <h5 className="text-white font-medium mb-1">Telefone</h5>
                <p className="text-gray-400 text-sm">
                  (11) 99439-6469
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Legal Links */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-6">
              {[
                { href: "/politica-privacidade", label: "Política de Privacidade", icon: Shield },
                { href: "/termos-uso", label: "Termos de Uso", icon: FileText },
                { href: "/politica-cookies", label: "Política de Cookies", icon: Cookie },
                { href: "/lgpd", label: "LGPD", icon: Scale }
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center space-x-2 text-gray-500 hover:text-cyan-400 transition-all duration-300 text-sm"
                  >
                    <link.icon className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Analytics & Cookie Preferences */}
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-600">
                Google Analytics • Vercel Analytics
              </span>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new Event("cookie:open-preferences"));
                }}
                className="text-xs text-gray-500 hover:text-cyan-400 transition-colors duration-300"
              >
                Gerenciar Cookies
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUpRight className="h-5 w-5 text-cyan-400 group-hover:text-white transition-colors duration-300" />
      </motion.button>
    </footer>
  );
};

export { Footer };
