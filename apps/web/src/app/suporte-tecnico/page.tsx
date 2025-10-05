"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Headphones, 
  Phone, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Zap, 
  Shield, 
  Wrench,
  Monitor,
  Server,
  Database,
  Wifi,
  Smartphone,
  Laptop,
  HardDrive,
  Cpu,
  Network,
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
  FileText,
  Code,
  Terminal,
  Star,
  Timer
} from "lucide-react";

export default function SuporteTecnicoPage() {
  const [supportParticles, setSupportParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    type: 'headphones' | 'phone' | 'message' | 'wrench';
    opacity: number;
  }>>([]);
  const [connectionLines, setConnectionLines] = useState<Array<{
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    active: boolean;
  }>>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Support Particles Animation
  useEffect(() => {
    let animationFrameId: number;
    let isAnimating = false;

    const generateSupportParticles = () => {
      const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        type: ['headphones', 'phone', 'message', 'wrench'][Math.floor(Math.random() * 4)] as 'headphones' | 'phone' | 'message' | 'wrench',
        opacity: Math.random() * 0.8 + 0.2
      }));
      setSupportParticles(particles);
    };

    const generateConnectionLines = () => {
      const lines = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        active: Math.random() > 0.5
      }));
      setConnectionLines(lines);
    };

    const animateParticles = () => {
      if (!isAnimating) return;
      
      setSupportParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100,
        opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.4 + 0.6
      })));

      setConnectionLines(prev => prev.map(line => ({
        ...line,
        active: Math.random() > 0.7,
        x1: (line.x1 + (Math.random() - 0.5) * 0.2 + 100) % 100,
        y1: (line.y1 + (Math.random() - 0.5) * 0.2 + 100) % 100,
        x2: (line.x2 + (Math.random() - 0.5) * 0.2 + 100) % 100,
        y2: (line.y2 + (Math.random() - 0.5) * 0.2 + 100) % 100,
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

    generateSupportParticles();
    generateConnectionLines();
    const interval = setInterval(generateSupportParticles, 20000);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const services = [
    {
      title: "Suporte Remoto",
      icon: Headphones,
      description: "Assistência técnica remota segura e eficiente",
      features: ["Acesso remoto seguro", "Resolução rápida", "Monitoramento em tempo real", "Relatórios detalhados"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Manutenção Preventiva",
      icon: Settings,
      description: "Manutenção proativa para evitar problemas",
      features: ["Monitoramento contínuo", "Atualizações automáticas", "Backup automático", "Relatórios de performance"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Suporte Presencial",
      icon: Wrench,
      description: "Assistência técnica no local quando necessário",
      features: ["Visitas técnicas", "Instalação de hardware", "Configuração de equipamentos", "Treinamento de usuários"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Help Desk 24/7",
      icon: MessageCircle,
      description: "Suporte contínuo para emergências críticas",
      features: ["Atendimento 24/7", "Resposta em 2 horas", "Escalação automática", "SLA garantido"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const serviceAreas = [
    "São Paulo", "Itaquaquecetuba", "Guarulhos", "Suzano", 
    "Mogi das Cruzes", "Arujá", "Santa Isabel", "Ferraz de Vasconcelos"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated Support Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Connection Network */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {connectionLines.map((line) => (
            <motion.line
              key={line.id}
              x1={`${line.x1}%`}
              y1={`${line.y1}%`}
              x2={`${line.x2}%`}
              y2={`${line.y2}%`}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              opacity={line.active ? 0.8 : 0.2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: line.active ? 1 : 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: line.id * 0.1
              }}
            />
          ))}
          
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Support Particles */}
        {supportParticles.map((particle) => {
          const IconComponent = particle.type === 'headphones' ? Headphones : 
                               particle.type === 'phone' ? Phone : 
                               particle.type === 'message' ? MessageCircle : Wrench;
          
          return (
            <motion.div
              key={particle.id}
              className="absolute text-cyan-400/30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 180, 360],
                scale: [0.8, 1.3, 0.8],
                opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
              }}
              transition={{
                duration: 6 + particle.id * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.id * 0.2,
              }}
            >
              <IconComponent size={28} />
            </motion.div>
          );
        })}

        {/* Floating Tech Icons */}
        {[Monitor, Server, Database, Wifi, Smartphone, Laptop, HardDrive, Cpu].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{
              left: `${15 + (index * 10)}%`,
              top: `${25 + (index % 4) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 8 + index * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
          >
            <Icon size={24} />
          </motion.div>
        ))}

        {/* Connection Pulses */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 4,
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
            {/* Animated Support Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-32 h-32 mb-8 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 shadow-2xl"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 30px rgba(6, 182, 212, 0.4)",
                  "0 0 50px rgba(59, 130, 246, 0.7)",
                  "0 0 30px rgba(6, 182, 212, 0.4)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Headphones className="w-16 h-16 text-white" />
            </motion.div>

            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Suporte Técnico
            </motion.h1>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Especializado
            </motion.h2>

            <motion.p
              className="text-2xl sm:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Resposta em até{" "}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-semibold">
                2 horas
              </span>
              {" "}com suporte 24/7
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Solicitar Suporte
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Chat ao Vivo
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
                        boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)"
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
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
                            <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
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

      {/* Service Areas Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Área de Atendimento
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {serviceAreas.map((area, index) => (
              <motion.div
                key={area}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  <div className="relative z-10">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-4"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <Globe className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {area}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services Deep Dive */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Serviços de Suporte Especializados
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                service: "Help Desk 24/7",
                icon: Headphones,
                description: "Suporte técnico contínuo para resolução de problemas",
                features: [
                  "Atendimento 24 horas por dia",
                  "Tickets priorizados por criticidade",
                  "Chat, telefone e email",
                  "Escalação automática para especialistas"
                ],
                sla: "15 min",
                color: "from-blue-500 to-cyan-500"
              },
              {
                service: "Suporte Remoto",
                icon: Monitor,
                description: "Assistência técnica via acesso remoto seguro",
                features: [
                  "Acesso remoto criptografado",
                  "Diagnóstico em tempo real",
                  "Correção imediata de problemas",
                  "Gravação de sessões para auditoria"
                ],
                sla: "5 min",
                color: "from-green-500 to-emerald-500"
              },
              {
                service: "Manutenção Preventiva",
                icon: Settings,
                description: "Manutenção programada para evitar problemas",
                features: [
                  "Agendamento automático",
                  "Relatórios de status",
                  "Atualizações de segurança",
                  "Backup e verificação de integridade"
                ],
                sla: "Agendado",
                color: "from-purple-500 to-indigo-500"
              },
              {
                service: "Suporte de Hardware",
                icon: HardDrive,
                description: "Reparo e substituição de componentes físicos",
                features: [
                  "Diagnóstico de hardware",
                  "Substituição de peças",
                  "Garantia estendida",
                  "Inventário automatizado"
                ],
                sla: "2 horas",
                color: "from-orange-500 to-red-500"
              },
              {
                service: "Suporte de Software",
                icon: FileText,
                description: "Instalação, configuração e troubleshooting",
                features: [
                  "Instalação de aplicações",
                  "Configuração personalizada",
                  "Resolução de bugs",
                  "Migração de dados"
                ],
                sla: "30 min",
                color: "from-teal-500 to-blue-500"
              },
              {
                service: "Suporte de Rede",
                icon: Network,
                description: "Configuração e manutenção de infraestrutura de rede",
                features: [
                  "Configuração de roteadores",
                  "Troubleshooting de conectividade",
                  "Otimização de performance",
                  "Segurança de rede"
                ],
                sla: "1 hora",
                color: "from-pink-500 to-rose-500"
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.service}
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
                        boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)"
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {service.service}
                        </h3>
                        <span className="text-cyan-400 font-bold text-sm bg-cyan-500/20 px-2 py-1 rounded-full">
                          SLA: {service.sla}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-400">Inclui:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <motion.li
                              key={feature}
                              className="flex items-start gap-2 text-gray-300 text-sm"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Metrics & KPIs */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Métricas de Suporte
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                metric: "Tempo de Resposta",
                value: "2 min",
                description: "Tempo médio para primeira resposta",
                trend: "+25%",
                status: "excellent",
                icon: Clock
              },
              {
                metric: "Taxa de Resolução",
                value: "94%",
                description: "Problemas resolvidos na primeira tentativa",
                trend: "+8%",
                status: "excellent",
                icon: CheckCircle
              },
              {
                metric: "Satisfação do Cliente",
                value: "98%",
                description: "Avaliação média dos clientes",
                trend: "+12%",
                status: "excellent",
                icon: Star
              },
              {
                metric: "Uptime dos Sistemas",
                value: "99.9%",
                description: "Disponibilidade garantida",
                trend: "stable",
                status: "excellent",
                icon: Activity
              },
              {
                metric: "Tickets por Dia",
                value: "247",
                description: "Volume médio de atendimentos",
                trend: "+15%",
                status: "good",
                icon: MessageCircle
              },
              {
                metric: "Tempo de Resolução",
                value: "1.2h",
                description: "Tempo médio para resolução completa",
                trend: "-18%",
                status: "excellent",
                icon: Timer
              },
              {
                metric: "Clientes Ativos",
                value: "1.847",
                description: "Empresas com suporte ativo",
                trend: "+22%",
                status: "good",
                icon: Users
              },
              {
                metric: "Disponibilidade 24/7",
                value: "100%",
                description: "Cobertura de atendimento",
                trend: "stable",
                status: "excellent",
                icon: Globe
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.metric}
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
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-6"
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
                      
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                        {item.metric}
                      </h3>
                      
                      <div className="mb-4">
                        <motion.div
                          className="text-4xl font-bold text-cyan-400 mb-2"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          {item.value}
                        </motion.div>
                        <div className="flex items-center justify-center gap-2">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            item.status === 'excellent' ? 'bg-green-500/20 text-green-400' :
                            item.status === 'good' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {item.trend}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Tools & Technologies */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ferramentas & Tecnologias
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Remote Access Tools */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 20px rgba(6, 182, 212, 0.4)",
                      "0 0 40px rgba(59, 130, 246, 0.7)",
                      "0 0 20px rgba(6, 182, 212, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Monitor className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">Ferramentas de Acesso Remoto</h3>
              </div>

              <div className="space-y-4">
                {[
                  { tool: "TeamViewer", description: "Acesso remoto seguro e confiável", features: ["Criptografia AES-256", "Transferência de arquivos", "Gravação de sessões"] },
                  { tool: "AnyDesk", description: "Conectividade rápida e estável", features: ["Latência ultra-baixa", "Multi-plataforma", "Controle de acesso"] },
                  { tool: "Chrome Remote Desktop", description: "Acesso via navegador", features: ["Sem instalação", "Cross-platform", "Fácil configuração"] },
                  { tool: "Microsoft Remote Desktop", description: "Solução nativa do Windows", features: ["Integração Active Directory", "Multi-sessão", "Aplicações remotas"] },
                  { tool: "VNC Connect", description: "Acesso remoto multiplataforma", features: ["Código de acesso único", "Chat integrado", "Transferência drag-and-drop"] },
                  { tool: "Splashtop", description: "Performance de desktop nativo", features: ["4K streaming", "Som HD", "Acesso móvel"] }
                ].map((item, index) => (
                  <motion.div
                    key={item.tool}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">{item.tool}</h4>
                      <span className="text-cyan-400 font-bold text-sm">Ativo</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, featureIndex) => (
                        <span key={feature} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Monitoring & Management */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 20px rgba(16, 185, 129, 0.4)",
                      "0 0 40px rgba(5, 150, 105, 0.7)",
                      "0 0 20px rgba(16, 185, 129, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Activity className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">Monitoramento & Gestão</h3>
              </div>

              <div className="space-y-4">
                {[
                  { tool: "PRTG Network Monitor", description: "Monitoramento de rede e infraestrutura", features: ["Alertas automáticos", "Dashboards em tempo real", "Relatórios personalizados"] },
                  { tool: "SolarWinds N-Central", description: "Gestão remota de endpoints", features: ["Patch management", "Backup automático", "Inventário de hardware"] },
                  { tool: "Kaseya VSA", description: "Automação de tarefas de TI", features: ["Scripting automatizado", "Deploy de software", "Gestão de patches"] },
                  { tool: "ConnectWise Automate", description: "Automação e monitoramento proativo", features: ["Detecção proativa", "Correção automática", "Relatórios executivos"] },
                  { tool: "ManageEngine Desktop Central", description: "Gestão unificada de desktops", features: ["Deploy de SO", "Gestão de aplicações", "Políticas de segurança"] },
                  { tool: "NinjaRMM", description: "RMM moderno e intuitivo", features: ["Interface moderna", "Integração com PSA", "Scripting PowerShell"] }
                ].map((item, index) => (
                  <motion.div
                    key={item.tool}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">{item.tool}</h4>
                      <span className="text-green-400 font-bold text-sm">Ativo</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, featureIndex) => (
                        <span key={feature} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Case Studies */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Cases de Suporte
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                company: "Escritório de Advocacia",
                industry: "Serviços Jurídicos",
                challenge: "Sistema lento e instabilidade de rede",
                solution: "Otimização de sistema e migração para SSD",
                results: [
                  "Performance 300% melhor",
                  "Zero instabilidades em 6 meses",
                  "Tempo de inicialização reduzido em 80%",
                  "Economia de R$ 15K em novos equipamentos"
                ],
                technologies: ["SSD Migration", "Network Optimization", "System Cleanup", "Hardware Upgrade"],
                image: "⚖️"
              },
              {
                company: "Clínica Odontológica",
                industry: "Saúde",
                challenge: "Perda de dados e problemas de backup",
                solution: "Implementação de backup automatizado e redundância",
                results: [
                  "Backup automático 24/7",
                  "Zero perda de dados",
                  "Recovery time < 30 min",
                  "Compliance LGPD 100%"
                ],
                technologies: ["Automated Backup", "Cloud Storage", "Data Encryption", "Disaster Recovery"],
                image: "🦷"
              },
              {
                company: "Loja de Roupas",
                industry: "Varejo",
                challenge: "Sistema de PDV instável e problemas de conectividade",
                solution: "Migração para sistema cloud e backup local",
                results: [
                  "Uptime 99.9%",
                  "Vendas online integradas",
                  "Relatórios em tempo real",
                  "Aumento de 40% nas vendas"
                ],
                technologies: ["Cloud POS", "Network Redundancy", "Mobile Integration", "Real-time Analytics"],
                image: "👕"
              },
              {
                company: "Academia",
                industry: "Fitness",
                challenge: "Sistema de gestão de alunos offline",
                solution: "Migração para sistema web e integração mobile",
                results: [
                  "Gestão 100% online",
                  "App para alunos",
                  "Pagamentos automatizados",
                  "Redução de 60% em tarefas administrativas"
                ],
                technologies: ["Web Platform", "Mobile App", "Payment Gateway", "CRM Integration"],
                image: "💪"
              },
              {
                company: "Restaurante",
                industry: "Alimentação",
                challenge: "Sistema de delivery e gestão de pedidos",
                solution: "Implementação de sistema integrado",
                results: [
                  "Pedidos automatizados",
                  "Integração com iFood/Rappi",
                  "Controle de estoque",
                  "Aumento de 80% nas vendas"
                ],
                technologies: ["Delivery Integration", "Inventory Management", "POS System", "Analytics Dashboard"],
                image: "🍽️"
              },
              {
                company: "Consultório Médico",
                industry: "Saúde",
                challenge: "Sistema de prontuário eletrônico",
                solution: "Migração para sistema certificado e backup seguro",
                results: [
                  "Prontuário eletrônico certificado",
                  "Backup criptografado",
                  "Compliance CFM",
                  "Eficiência 50% maior"
                ],
                technologies: ["EMR System", "Data Encryption", "Cloud Backup", "CFM Compliance"],
                image: "🏥"
              }
            ].map((case_study, index) => (
              <motion.div
                key={case_study.company}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{case_study.image}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {case_study.company}
                        </h3>
                        <p className="text-cyan-400 text-sm">{case_study.industry}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Desafio:</h4>
                      <p className="text-gray-300 text-sm mb-3">{case_study.challenge}</p>
                      
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Solução:</h4>
                      <p className="text-gray-300 text-sm mb-4">{case_study.solution}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Resultados:</h4>
                      <ul className="space-y-2">
                        {case_study.results.map((result, resultIndex) => (
                          <motion.li
                            key={result}
                            className="flex items-start gap-2 text-gray-300 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: resultIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <span>{result}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Tecnologias:</h4>
                      <div className="flex flex-wrap gap-2">
                        {case_study.technologies.map((tech, techIndex) => (
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

      {/* Contact Section */}
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
              Pronto para Suporte?
            </motion.h2>
            
            <motion.p
              className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Entre em contato agora e tenha suporte técnico especializado em até 2 horas.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                (11) 99439-6469
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-lg group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                contato@starksolutions.com.br
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}