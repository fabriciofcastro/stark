"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Code, 
  Terminal, 
  FileText, 
  GitBranch, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Target,
  Award,
  TrendingUp,
  BarChart3,
  Users,
  Globe,
  Settings,
  Activity,
  AlertCircle,
  RefreshCw,
  Download,
  Upload,
  Lock,
  Eye,
  Search,
  Monitor,
  Server,
  Database,
  Wifi,
  Smartphone,
  Laptop,
  HardDrive,
  Cpu,
  Network,
  Shield,
  Wrench,
  Headphones,
  Phone,
  MessageCircle,
  Clock,
  Award as AwardIcon,
  Star,
  Lightbulb,
  Rocket,
  Brain,
  Target as TargetIcon,
  Shield as ShieldIcon,
  Zap as ZapIcon
} from "lucide-react";

export default function CriacaoDeSitesPage() {
  const [codeParticles, setCodeParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    type: 'code' | 'terminal' | 'file' | 'git';
    opacity: number;
    content: string;
  }>>([]);
  const [typingText, setTypingText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const codeLines = [
    "const site = new StarkWebsite({",
    "  performance: 'optimized',",
    "  seo: 'advanced',",
    "  design: 'modern',",
    "  security: 'enterprise'",
    "});",
    "",
    "site.deploy(); // 🚀"
  ];

  // Code Particles Animation
  useEffect(() => {
    let animationFrameId: number;
    let isAnimating = false;

    const generateCodeParticles = () => {
      const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        type: ['code', 'terminal', 'file', 'git'][Math.floor(Math.random() * 4)] as 'code' | 'terminal' | 'file' | 'git',
        opacity: Math.random() * 0.8 + 0.2,
        content: ['<div>', '</div>', 'function()', 'const', 'let', 'if', 'else', 'return', 'import', 'export'][Math.floor(Math.random() * 10)]
      }));
      setCodeParticles(particles);
    };

    const animateParticles = () => {
      if (!isAnimating) return;
      
      setCodeParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100,
        opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.4 + 0.6
      })));

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isAnimating = entry.isIntersecting;
        if (isAnimating) {
          animationFrameId = requestAnimationFrame(animateParticles);
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    generateCodeParticles();
    const interval = setInterval(generateCodeParticles, 15000);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Typing Animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;
    let lineIndex = 0;

    const typeNextChar = () => {
      if (lineIndex < codeLines.length) {
        const currentLine = codeLines[lineIndex];
        if (currentIndex < currentLine.length) {
          setTypingText(prev => prev + currentLine[currentIndex]);
          currentIndex++;
          timeoutId = setTimeout(typeNextChar, 50);
        } else {
          setTypingText(prev => prev + '\n');
          lineIndex++;
          currentIndex = 0;
          timeoutId = setTimeout(typeNextChar, 200);
        }
      } else {
        // Reset and restart
        setTypingText("");
        lineIndex = 0;
        currentIndex = 0;
        timeoutId = setTimeout(typeNextChar, 1000);
      }
    };

    timeoutId = setTimeout(typeNextChar, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const services = [
    {
      title: "Desenvolvimento Frontend",
      icon: Code,
      description: "Interfaces modernas e responsivas com React/Next.js",
      features: ["React/Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Backend & APIs",
      icon: Server,
      description: "APIs robustas e escaláveis para seu negócio",
      features: ["Node.js/NestJS", "APIs RESTful", "GraphQL", "Microserviços"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "SEO & Performance",
      icon: Zap,
      description: "Otimização completa para motores de busca",
      features: ["Core Web Vitals", "Schema Markup", "Meta Tags", "Sitemap XML"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Segurança & Deploy",
      icon: Shield,
      description: "Deploy seguro e monitoramento contínuo",
      features: ["HTTPS/SSL", "Firewall", "CDN", "Monitoramento"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const technologies = [
    { name: "React/Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 88 },
    { name: "PostgreSQL", level: 85 },
    { name: "AWS/Vercel", level: 92 },
    { name: "Docker", level: 87 }
  ];

  const portfolio = [
    { 
      title: "E-commerce Moderno", 
      desc: "Plataforma completa com pagamentos e gestão", 
      tech: ["Next.js", "Stripe", "PostgreSQL"],
      color: "from-blue-500 to-purple-500"
    },
    { 
      title: "Landing Page Premium", 
      desc: "Alta conversão com animações e SEO", 
      tech: ["React", "Framer Motion", "Tailwind"],
      color: "from-green-500 to-teal-500"
    },
    { 
      title: "Portal Corporativo", 
      desc: "Sistema completo com blog e dashboard", 
      tech: ["Next.js", "Prisma", "Auth0"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 overflow-hidden">
      {/* Animated Code Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Code Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern id="codeGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#10b981" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#059669" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#codeGrid)" />
        </svg>

        {/* Code Particles */}
        {codeParticles.map((particle) => {
          const IconComponent = particle.type === 'code' ? Code : 
                               particle.type === 'terminal' ? Terminal : 
                               particle.type === 'file' ? FileText : GitBranch;
          
          return (
            <motion.div
              key={particle.id}
              className="absolute text-green-400/20"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [particle.opacity * 0.2, particle.opacity, particle.opacity * 0.2],
              }}
              transition={{
                duration: 8 + particle.id * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.id * 0.1,
              }}
            >
              <div className="flex flex-col items-center">
                <IconComponent size={20} />
                <span className="text-xs font-mono mt-1">{particle.content}</span>
              </div>
            </motion.div>
          );
        })}

        {/* Floating Tech Icons */}
        {[Monitor, Laptop, Smartphone, Database, Network, Cpu, HardDrive, Wifi].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/5"
            style={{
              left: `${10 + (index * 12)}%`,
              top: `${15 + (index % 4) * 25}%`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4,
            }}
          >
            <Icon size={32} />
          </motion.div>
        ))}

        {/* Code Rain Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"
          animate={{
            y: ['-100%', '100%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          style={{ y, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Code Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-32 h-32 mb-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 shadow-2xl"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 30px rgba(16, 185, 129, 0.4)",
                  "0 0 50px rgba(5, 150, 105, 0.7)",
                  "0 0 30px rgba(16, 185, 129, 0.4)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Code className="w-16 h-16 text-white" />
            </motion.div>

            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Desenvolvimento
            </motion.h1>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Web Moderno
            </motion.h2>

            <motion.p
              className="text-2xl sm:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Sites{" "}
              <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text font-semibold">
                rápidos, seguros e otimizados
              </span>
              {" "}para conversão
            </motion.p>

            {/* Live Code Preview */}
            <motion.div
              className="max-w-2xl mx-auto mb-12 bg-black/50 rounded-xl p-6 font-mono text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">stark-website.js</span>
              </div>
              <pre className="text-green-400 text-sm overflow-hidden">
                {typingText}
                <motion.span
                  className="inline-block w-2 h-4 bg-green-400 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </pre>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Criar Meu Site
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Ver Portfólio
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Nossos Serviços
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.color} mb-6`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)"
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-start gap-3 text-gray-300 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Portfólio
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <motion.div
                key={project.title}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className={`w-full h-32 rounded-lg bg-gradient-to-r ${project.color} mb-6 flex items-center justify-center`}>
                      <Monitor className="w-12 h-12 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Tecnologias
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors">
                      {tech.name}
                    </h3>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Proficiência</span>
                        <span>{tech.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Certificado</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="relative rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl sm:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Vamos Criar seu Site?
            </motion.h2>
            
            <motion.p
              className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Desenvolvemos sites modernos, rápidos e otimizados para conversão.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Solicitar Orçamento
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Falar com Desenvolvedor
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
