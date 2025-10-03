// components/layout/footer.tsx - VERSÃO EXTRAORDINÁRIA
"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  MapPin, 
  Mail, 
  Phone, 
  ArrowUpRight,
  Shield,
  FileText,
  Cookie,
  Scale,
  Sparkles,
  Zap,
  Star,
  Globe,
  Layers,
  Hexagon,
  Triangle
} from "lucide-react";

const Footer = () => {
  console.log("🚀 Footer com layout elegante carregado!");
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; type: string; color: string }>>([]);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));

  // Generate extraordinary particles
  useEffect(() => {
    const generateParticles = () => {
      const types = ['circle', 'triangle', 'hexagon', 'star'];
      const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];
      
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 3,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 12000);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="relative border-t border-gradient-to-r from-cyan-500/30 via-transparent to-purple-500/30 backdrop-blur-2xl overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)
        `
      }}
    >
      {/* Extraordinary Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid with Glow */}
        <div className="absolute inset-0">
          <div className="h-full w-full opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>

        {/* Holographic Waves */}
        <div className="absolute inset-0">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 opacity-20"
              style={{
                background: `linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)`,
                transform: `rotate(${i * 120}deg)`,
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          ))}
        </div>
        
        {/* Extraordinary Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              color: particle.color,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          >
            {particle.type === 'circle' && (
              <div className="w-full h-full rounded-full bg-gradient-to-r from-current to-transparent blur-sm" />
            )}
            {particle.type === 'triangle' && (
              <Triangle className="w-full h-full" fill="currentColor" />
            )}
            {particle.type === 'hexagon' && (
              <Hexagon className="w-full h-full" fill="currentColor" />
            )}
            {particle.type === 'star' && (
              <Star className="w-full h-full" fill="currentColor" />
            )}
          </motion.div>
        ))}

        {/* Energy Lines */}
        <div className="absolute inset-0">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{
                top: `${25 + i * 25}%`,
                left: 0,
                right: 0,
                opacity: 0.3,
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Holographic Scan Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        {/* Main Content with 3D Transform */}
        <motion.div 
          className="grid grid-cols-1 gap-16 lg:grid-cols-4"
          style={{
            transformStyle: "preserve-3d",
            rotateX: rotateX,
            rotateY: rotateY,
          }}
        >
          {/* Brand Section - 3D Enhanced */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onHoverStart={() => setIsHovered('brand')}
            onHoverEnd={() => setIsHovered(null)}
          >
            <motion.div 
              className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10"
              style={{
                background: `
                  linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%),
                  linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)
                `,
                boxShadow: isHovered === 'brand' 
                  ? '0 25px 50px -12px rgba(6, 182, 212, 0.25), 0 0 0 1px rgba(6, 182, 212, 0.1)' 
                  : '0 10px 25px -3px rgba(0, 0, 0, 0.3)',
              }}
              animate={{
                scale: isHovered === 'brand' ? 1.02 : 1,
                rotateY: isHovered === 'brand' ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Holographic Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div 
                    className="relative"
                    animate={{ 
                      rotateY: isHovered === 'brand' ? 360 : 0,
                      scale: isHovered === 'brand' ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-600/30 backdrop-blur-sm border border-white/20">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg">
                        <Zap className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/50 to-purple-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                  
                  <div>
                    <motion.h3 
                      className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: isHovered === 'brand' ? '200% 0' : '0% 0',
                      }}
                      transition={{ duration: 1 }}
                      style={{
                        backgroundSize: '200% 100%',
                      }}
                    >
                      STARK
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-cyan-400 font-medium flex items-center space-x-2"
                      animate={{ x: isHovered === 'brand' ? 5 : 0 }}
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>GESTÃO EM TECNOLOGIA</span>
                    </motion.p>
                  </div>
                </div>
                
                <motion.p 
                  className="text-gray-300 leading-relaxed mb-8 max-w-lg text-lg"
                  animate={{
                    opacity: isHovered === 'brand' ? 1 : 0.8,
                  }}
                >
                  Transformamos infraestrutura tecnológica em <span className="text-cyan-400 font-semibold">ativos estratégicos</span>. 
                  Especialistas em governança, segurança e <span className="text-purple-400 font-semibold">inovação digital</span>.
                </motion.p>
                
                <motion.div 
                  className="flex items-center space-x-6 text-sm text-gray-400"
                  animate={{ y: isHovered === 'brand' ? -2 : 0 }}
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-cyan-400" />
                    <span>© 2024 STARK Tecnologia</span>
                  </div>
                  <div className="w-px h-4 bg-gray-600" />
                  <span>Todos os direitos reservados</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Services - Holographic */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            onHoverStart={() => setIsHovered('services')}
            onHoverEnd={() => setIsHovered(null)}
          >
            <motion.div 
              className="relative p-6 rounded-2xl backdrop-blur-xl border border-white/10"
              style={{
                background: `
                  linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%),
                  linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.6) 100%)
                `,
                boxShadow: isHovered === 'services' 
                  ? '0 20px 40px -8px rgba(6, 182, 212, 0.2), 0 0 0 1px rgba(6, 182, 212, 0.1)' 
                  : '0 8px 20px -4px rgba(0, 0, 0, 0.2)',
              }}
              animate={{
                scale: isHovered === 'services' ? 1.02 : 1,
                rotateY: isHovered === 'services' ? -3 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h4 
                className="text-xl font-bold text-white mb-8 flex items-center space-x-3"
                animate={{ x: isHovered === 'services' ? 5 : 0 }}
              >
                <Layers className="h-5 w-5 text-cyan-400" />
                <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  Serviços
                </span>
              </motion.h4>
              
              <nav className="space-y-4">
                {[
                  { href: "/suporte-tecnico", label: "Suporte Técnico", icon: "⚡" },
                  { href: "/consultoria-tecnologica", label: "Consultoria", icon: "🧠" },
                  { href: "/cloud-vps-linux", label: "Soluções em Nuvem", icon: "☁️" },
                  { href: "/governance", label: "Governança de TI", icon: "🏛️" },
                  { href: "/cyberseguranca", label: "Cibersegurança", icon: "🛡️" },
                  { href: "/create-site", label: "Desenvolvimento Web", icon: "🌐" }
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30, rotateY: -15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                    >
                      <motion.span 
                        className="text-lg"
                        animate={{ 
                          scale: isHovered === 'services' ? 1.2 : 1,
                          rotate: isHovered === 'services' ? 10 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {link.icon}
                      </motion.span>
                      <motion.span 
                        className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium"
                        animate={{ x: isHovered === 'services' ? 3 : 0 }}
                      >
                        {link.label}
                      </motion.span>
                      <motion.div
                        className="ml-auto"
                        animate={{ 
                          x: isHovered === 'services' ? 5 : 0,
                          opacity: isHovered === 'services' ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="h-4 w-4 text-cyan-400" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>

          {/* Company - Holographic */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            onHoverStart={() => setIsHovered('company')}
            onHoverEnd={() => setIsHovered(null)}
          >
            <motion.div 
              className="relative p-6 rounded-2xl backdrop-blur-xl border border-white/10"
              style={{
                background: `
                  linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%),
                  linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.6) 100%)
                `,
                boxShadow: isHovered === 'company' 
                  ? '0 20px 40px -8px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(139, 92, 246, 0.1)' 
                  : '0 8px 20px -4px rgba(0, 0, 0, 0.2)',
              }}
              animate={{
                scale: isHovered === 'company' ? 1.02 : 1,
                rotateY: isHovered === 'company' ? 3 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h4 
                className="text-xl font-bold text-white mb-8 flex items-center space-x-3"
                animate={{ x: isHovered === 'company' ? 5 : 0 }}
              >
                <Globe className="h-5 w-5 text-purple-400" />
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Empresa
                </span>
              </motion.h4>
              
              <nav className="space-y-4">
                {[
                  { href: "/sobre", label: "Sobre Nós", icon: "🏢" },
                  { href: "/portfolio", label: "Portfólio", icon: "💼" },
                  { href: "/cases-de-sucesso", label: "Cases de Sucesso", icon: "🏆" },
                  { href: "/faq", label: "FAQ", icon: "❓" },
                  { href: "/blog", label: "Blog", icon: "📝" },
                  { href: "/contact", label: "Contato", icon: "📞" }
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30, rotateY: 15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                    >
                      <motion.span 
                        className="text-lg"
                        animate={{ 
                          scale: isHovered === 'company' ? 1.2 : 1,
                          rotate: isHovered === 'company' ? -10 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {link.icon}
                      </motion.span>
                      <motion.span 
                        className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium"
                        animate={{ x: isHovered === 'company' ? 3 : 0 }}
                      >
                        {link.label}
                      </motion.span>
                      <motion.div
                        className="ml-auto"
                        animate={{ 
                          x: isHovered === 'company' ? 5 : 0,
                          opacity: isHovered === 'company' ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="h-4 w-4 text-purple-400" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Contact Info - Elegant Text Layout */}
        <motion.div
          className="mt-16 pt-12 border-t border-gradient-to-r from-cyan-500/30 via-transparent to-purple-500/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: MapPin, 
                title: "Endereço", 
                content: "Av. Paulista, 1000\nItaquaquecetuba - SP",
                color: "cyan"
              },
              { 
                icon: Mail, 
                title: "E-mail", 
                content: "contato@starkgestao.com.br",
                color: "purple"
              },
              { 
                icon: Phone, 
                title: "Telefone", 
                content: "(11) 99439-6469",
                color: "emerald"
              }
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group text-center"
              >
                <div className="flex flex-col items-center space-y-4">
                  <motion.div 
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-white/10"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.3,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    >
                      <contact.icon className="h-8 w-8 text-cyan-400" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.h5 
                    className="text-white font-bold text-xl"
                    animate={{
                      color: ["#ffffff", "#06b6d4", "#ffffff"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    {contact.title}
                  </motion.h5>
                  
                  <motion.p 
                    className="text-gray-300 text-base leading-relaxed whitespace-pre-line max-w-xs"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4,
                    }}
                  >
                    {contact.content}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Legal Links - Holographic */}
        <motion.div
          className="mt-16 pt-12 border-t border-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-8">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-8">
              {[
                { href: "/politica-privacidade", label: "Política de Privacidade", icon: Shield, color: "cyan" },
                { href: "/termos-uso", label: "Termos de Uso", icon: FileText, color: "purple" },
                { href: "/politica-cookies", label: "Política de Cookies", icon: Cookie, color: "emerald" },
                { href: "/lgpd", label: "LGPD", icon: Scale, color: "orange" }
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="group"
                >
                  <Link
                    href={link.href}
                    className="group flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:bg-slate-700/50"
                  >
                    <motion.div
                      className={`p-2 rounded-lg bg-gradient-to-br ${
                        link.color === 'cyan' ? 'from-cyan-500/20 to-blue-600/20' :
                        link.color === 'purple' ? 'from-purple-500/20 to-pink-600/20' :
                        link.color === 'emerald' ? 'from-emerald-500/20 to-teal-600/20' :
                        'from-orange-500/20 to-red-600/20'
                      }`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <link.icon className={`h-4 w-4 ${
                        link.color === 'cyan' ? 'text-cyan-400' :
                        link.color === 'purple' ? 'text-purple-400' :
                        link.color === 'emerald' ? 'text-emerald-400' :
                        'text-orange-400'
                      }`} />
                    </motion.div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium text-sm">
                      {link.label}
                    </span>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowUpRight className="h-3 w-3 text-cyan-400" />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Analytics & Cookie Preferences */}
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <span className="text-xs text-gray-500 flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse" />
                <span>Google Analytics • Vercel Analytics</span>
              </span>
              <motion.button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new Event("cookie:open-preferences"));
                }}
                className="text-xs text-gray-400 hover:text-cyan-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Gerenciar Cookies
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Fixed Scroll to Top Button - Above Chatbot */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-24 right-8 z-[60] group"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        whileHover={{ 
          scale: 1.15,
          rotate: [0, -10, 10, 0],
          boxShadow: "0 20px 40px -8px rgba(6, 182, 212, 0.4)",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <div className="relative">
          {/* Main Button */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-600/30 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowUpRight className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </div>
          
          {/* Holographic Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/50 to-purple-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${20 + i * 30}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          {/* Energy Ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              background: "conic-gradient(from 0deg, transparent, rgba(6, 182, 212, 0.5), transparent, rgba(139, 92, 246, 0.5), transparent)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "2px",
            }}
          />
        </div>
      </motion.button>
    </footer>
  );
};

export { Footer };
