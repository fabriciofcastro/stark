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
  Headphones,
  Phone,
  MessageCircle,
  Clock,
  Star,
  Lightbulb,
  Rocket,
  Brain,
  MapPin,
  Map,
  Layers,
  Palette,
  Image,
  Video,
  Camera,
  Brush,
  PenTool,
  Type,
  Layout,
  Grid,
  ExternalLink,
  Mail,
  Share2,
  Heart,
  ThumbsUp,
  Send,
  Bell,
  Bookmark,
  Flag,
  Calendar,
  Timer,
  Gauge,
  Thermometer,
  Battery,
  Mic,
  Volume1,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Move,
  ZoomIn,
  ZoomOut,
  Filter,
  Sliders,
  CheckSquare,
  Square,
  Circle,
  Plus,
  Minus,
  X,
  Trash2,
  Edit,
  Copy,
  Clipboard,
  Save,
  Folder,
  FolderOpen,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  Cloud,
  CloudUpload,
  CloudDownload,
  WifiOff,
  Bluetooth,
  BluetoothConnected,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Power,
  Plug,
  ZapOff,
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Droplet,
  Wind,
  ThermometerSun,
  ThermometerSnowflake,
  ShoppingBag
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

      {/* Interactive Map Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Cobertura Nacional
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Visualization */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-8 h-96">
                {/* Interactive Map SVG */}
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  {/* Brazil Outline */}
                  <motion.path
                    d="M200 50 L250 80 L280 120 L270 160 L240 180 L200 190 L160 180 L130 160 L120 120 L150 80 Z"
                    fill="none"
                    stroke="url(#mapGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                  
                  {/* Major Cities */}
                  {[
                    { x: 200, y: 150, name: "São Paulo", status: "active" },
                    { x: 180, y: 120, name: "Rio de Janeiro", status: "active" },
                    { x: 220, y: 100, name: "Belo Horizonte", status: "active" },
                    { x: 160, y: 140, name: "Brasília", status: "active" },
                    { x: 240, y: 140, name: "Curitiba", status: "active" },
                    { x: 200, y: 180, name: "Porto Alegre", status: "active" },
                    { x: 140, y: 160, name: "Salvador", status: "planning" },
                    { x: 260, y: 160, name: "Recife", status: "planning" }
                  ].map((city, index) => (
                    <motion.g key={city.name}>
                      <motion.circle
                        cx={city.x}
                        cy={city.y}
                        r="8"
                        fill={city.status === "active" ? "#10b981" : "#f59e0b"}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }}
                      />
                      <motion.text
                        x={city.x}
                        y={city.y - 15}
                        textAnchor="middle"
                        className="text-xs fill-white"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 1.5 }}
                        viewport={{ once: true }}
                      >
                        {city.name}
                      </motion.text>
                    </motion.g>
                  ))}
                  
                  <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#059669" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-white text-sm">Ativo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-white text-sm">Em Expansão</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Coverage Details */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">Atendimento em Todo o Brasil</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { region: "Sudeste", cities: "São Paulo, Rio de Janeiro, Belo Horizonte", coverage: "100%" },
                  { region: "Sul", cities: "Curitiba, Porto Alegre, Florianópolis", coverage: "95%" },
                  { region: "Nordeste", cities: "Salvador, Recife, Fortaleza", coverage: "85%" },
                  { region: "Centro-Oeste", cities: "Brasília, Goiânia, Campo Grande", coverage: "90%" },
                  { region: "Norte", cities: "Manaus, Belém, Porto Velho", coverage: "75%" },
                  { region: "Região Metropolitana", cities: "Grande São Paulo e adjacências", coverage: "100%" }
                ].map((item, index) => (
                  <motion.div
                    key={item.region}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">{item.region}</h4>
                      <span className="text-green-400 font-bold">{item.coverage}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{item.cities}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Technologies Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Tecnologias Avançadas
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Frontend Moderno",
                technologies: ["React 18", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"],
                icon: Monitor,
                color: "from-blue-500 to-cyan-500"
              },
              {
                category: "Backend Robusto",
                technologies: ["Node.js", "NestJS", "Prisma ORM", "PostgreSQL", "Redis", "Docker"],
                icon: Server,
                color: "from-green-500 to-emerald-500"
              },
              {
                category: "Mobile & PWA",
                technologies: ["React Native", "Expo", "Progressive Web Apps", "Service Workers", "Push Notifications"],
                icon: Smartphone,
                color: "from-purple-500 to-pink-500"
              },
              {
                category: "Cloud & DevOps",
                technologies: ["AWS", "Vercel", "GitHub Actions", "Kubernetes", "Terraform", "Monitoring"],
                icon: Cloud,
                color: "from-orange-500 to-red-500"
              },
              {
                category: "AI & Analytics",
                technologies: ["OpenAI API", "TensorFlow", "Google Analytics", "Hotjar", "A/B Testing", "Machine Learning"],
                icon: Brain,
                color: "from-indigo-500 to-purple-500"
              },
              {
                category: "E-commerce",
                technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal", "PagSeguro", "Mercado Pago"],
                icon: ShoppingBag,
                color: "from-yellow-500 to-orange-500"
              }
            ].map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <motion.div
                  key={tech.category}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${tech.color} mb-6`}
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
                        {tech.category}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {tech.technologies.map((technology, techIndex) => (
                          <motion.div
                            key={technology}
                            className="flex items-center gap-2 text-gray-300 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: techIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                            <span>{technology}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security & SEO Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Segurança & SEO
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Security Features */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.4)",
                      "0 0 40px rgba(249, 115, 22, 0.7)",
                      "0 0 20px rgba(239, 68, 68, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Shield className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">Segurança Enterprise</h3>
              </div>

              <div className="space-y-4">
                {[
                  { feature: "SSL/TLS Certificado", level: 100, description: "Criptografia de ponta a ponta" },
                  { feature: "Firewall WAF", level: 95, description: "Proteção contra ataques web" },
                  { feature: "Backup Automático", level: 100, description: "Backups diários seguros" },
                  { feature: "Monitoramento 24/7", level: 100, description: "Detecção de intrusão" },
                  { feature: "CDN Global", level: 98, description: "Distribuição segura de conteúdo" },
                  { feature: "LGPD Compliance", level: 100, description: "Conformidade com privacidade" }
                ].map((item, index) => (
                  <motion.div
                    key={item.feature}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">{item.feature}</h4>
                      <span className="text-green-400 font-bold">{item.level}%</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* SEO Features */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.4)",
                      "0 0 40px rgba(147, 51, 234, 0.7)",
                      "0 0 20px rgba(59, 130, 246, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Search className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">SEO Avançado</h3>
              </div>

              <div className="space-y-4">
                {[
                  { feature: "Core Web Vitals", level: 98, description: "Performance otimizada" },
                  { feature: "Schema Markup", level: 100, description: "Dados estruturados" },
                  { feature: "Meta Tags", level: 100, description: "Otimização completa" },
                  { feature: "Sitemap XML", level: 100, description: "Indexação facilitada" },
                  { feature: "Open Graph", level: 100, description: "Compartilhamento social" },
                  { feature: "Local SEO", level: 95, description: "Visibilidade local" }
                ].map((item, index) => (
                  <motion.div
                    key={item.feature}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">{item.feature}</h4>
                      <span className="text-blue-400 font-bold">{item.level}%</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engagement & Design Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Engajamento & Design
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "UX/UI Design",
                icon: Palette,
                features: ["Design System", "Prototipagem", "User Research", "Acessibilidade"],
                metrics: "95% Conversão",
                color: "from-pink-500 to-rose-500"
              },
              {
                title: "Animações",
                icon: Sparkles,
                features: ["Micro-interações", "Transições", "Loading States", "Framer Motion"],
                metrics: "+40% Engajamento",
                color: "from-purple-500 to-indigo-500"
              },
              {
                title: "Performance",
                icon: Zap,
                features: ["Core Web Vitals", "Lazy Loading", "Image Optimization", "CDN"],
                metrics: "98% Score",
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Analytics",
                icon: BarChart3,
                features: ["Google Analytics", "Heatmaps", "A/B Testing", "Conversão"],
                metrics: "+60% ROI",
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                    <div className="relative z-10">
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${item.color} mb-6`}
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors">
                        {item.title}
                      </h3>
                      
                      <div className="mb-4">
                        <motion.div
                          className="text-3xl font-bold text-green-400 mb-2"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          {item.metrics}
                        </motion.div>
                      </div>

                      <ul className="space-y-2">
                        {item.features.map((feature, featureIndex) => (
                          <motion.li
                            key={feature}
                            className="flex items-center gap-2 text-gray-300 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fullstack Projects Portfolio Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Projetos Fullstack
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Desenvolvemos soluções completas desde o frontend até o backend, 
              incluindo infraestrutura e deploy automatizado.
            </p>
            
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/portfolio">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Ver Portfolio Completo
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Completo",
                description: "Plataforma de vendas online com pagamentos, estoque e dashboard admin",
                technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS"],
                image: "🛒",
                status: "Produção"
              },
              {
                title: "Sistema de Gestão",
                description: "ERP customizado para empresas com relatórios e automação",
                technologies: ["React", "NestJS", "MongoDB", "Redis", "Docker"],
                image: "📊",
                status: "Produção"
              },
              {
                title: "App Mobile + Web",
                description: "Aplicativo multiplataforma com sincronização em tempo real",
                technologies: ["React Native", "Expo", "Firebase", "WebRTC", "Push"],
                image: "📱",
                status: "Desenvolvimento"
              },
              {
                title: "Marketplace B2B",
                description: "Plataforma de negócios com sistema de avaliações e chat",
                technologies: ["Vue.js", "Laravel", "MySQL", "WebSocket", "S3"],
                image: "🏢",
                status: "Produção"
              },
              {
                title: "SaaS Analytics",
                description: "Dashboard de analytics com IA para insights de negócio",
                technologies: ["React", "Python", "TensorFlow", "ClickHouse", "K8s"],
                image: "🤖",
                status: "Beta"
              },
              {
                title: "Fintech App",
                description: "Aplicativo financeiro com carteira digital e investimentos",
                technologies: ["Flutter", "Go", "PostgreSQL", "Blockchain", "Kafka"],
                image: "💰",
                status: "Produção"
              }
            ].map((project, index) => (
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
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{project.image}</div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === "Produção" 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : project.status === "Beta"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-400">Tecnologias:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
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
