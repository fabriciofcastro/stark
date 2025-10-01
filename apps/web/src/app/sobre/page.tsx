"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  Shield,
  Users,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Star,
  Rocket,
  Brain,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Play,
  Volume2,
  X,
} from "lucide-react";

const AboutPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Dados da empresa
  const companyStats = [
    {
      icon: Users,
      value: "500+",
      label: "Clientes Atendidos",
			color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      value: "15+",
      label: "Anos de Experiência",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      value: "99.9%",
      label: "Uptime Garantido",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      value: "50+",
      label: "Países Atendidos",
      color: "from-orange-500 to-red-500",
    },
  ];

  // Valores da empresa
  const companyValues = [
    {
      icon: Brain,
      title: "Inovação Constante",
      description:
        "Sempre na vanguarda da tecnologia, implementamos as mais recentes soluções para nossos clientes.",
      color: "from-purple-600 to-indigo-600",
      features: [
        "Pesquisa & Desenvolvimento",
        "Tecnologias Emergentes",
        "Projetos Piloto",
      ],
    },
    {
      icon: Shield,
      title: "Segurança Absoluta",
			description:
        "Protegemos seus dados com os mais altos padrões de segurança e compliance do mercado.",
      color: "from-blue-600 to-cyan-600",
      features: ["ISO 27001", "LGPD Compliance", "Auditoria Contínua"],
    },
    {
      icon: Heart,
      title: "Foco no Cliente",
			description:
        "Cada projeto é único. Entendemos suas necessidades e entregamos soluções personalizadas.",
      color: "from-pink-600 to-rose-600",
      features: [
        "Suporte 24/7",
        "Consultoria Personalizada",
        "Relacionamento Próximo",
      ],
    },
    {
      icon: Rocket,
      title: "Crescimento Acelerado",
			description:
        "Transformamos ideias em resultados tangíveis, acelerando o crescimento dos nossos clientes.",
      color: "from-orange-600 to-yellow-600",
      features: ["ROI Mensurável", "Escalabilidade", "Time-to-Market"],
    },
  ];

  // Depoimentos
  const testimonials = [
    {
      name: "Maria Silva",
      role: "CTO, TechCorp",
      content:
        "A Stark revolucionou nossa infraestrutura. Reduzimos custos em 40% e aumentamos performance em 300%.",
      rating: 5,
      avatar: "MS",
    },
    {
      name: "João Santos",
      role: "CEO, InnovateLab",
      content:
        "Parceria estratégica excepcional. Nos ajudaram a migrar para cloud com zero downtime.",
      rating: 5,
      avatar: "JS",
    },
    {
      name: "Ana Costa",
      role: "Diretora de TI, GlobalCorp",
      content:
        "Equipe altamente qualificada e comprometida. Resultados que superaram nossas expectativas.",
      rating: 5,
      avatar: "AC",
    },
  ];

  // Timeline da empresa
  const timeline = [
    {
      year: "2008",
      title: "Fundação",
      description:
        "Nascimento da Stark com a visão de democratizar a tecnologia empresarial.",
      icon: Lightbulb,
      color: "from-blue-500 to-purple-500",
    },
    {
      year: "2012",
      title: "Primeira Certificação",
			description:
        "Conquistamos nossa primeira certificação ISO, estabelecendo padrões de qualidade.",
      icon: Award,
      color: "from-purple-500 to-pink-500",
		},
		{
      year: "2016",
      title: "Expansão Internacional",
			description:
        "Iniciamos operações em múltiplos países, expandindo nosso impacto global.",
      icon: Globe,
      color: "from-pink-500 to-red-500",
		},
		{
      year: "2020",
      title: "Transformação Digital",
			description:
        "Lideramos a transformação digital de 200+ empresas durante a pandemia.",
      icon: Zap,
      color: "from-red-500 to-orange-500",
		},
		{
      year: "2024",
      title: "Futuro Presente",
			description:
        "Implementando IA, IoT e tecnologias quânticas para o próximo nível.",
      icon: Rocket,
      color: "from-orange-500 to-yellow-500",
    },
  ];

  // Auto-play dos depoimentos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

	return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Background Animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`orb-${Math.random()}-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`grid-${Math.random()}-${i}`}
              className="absolute border border-white/20"
              style={{
                left: `${(i % 10) * 10}%`,
                top: `${Math.floor(i / 10) * 10}%`,
                width: "1px",
                height: "1px",
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            />
          ))}
        </div>
					</div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo Animado */}
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 shadow-2xl"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.3)",
                  "0 0 40px rgba(139, 92, 246, 0.6)",
                  "0 0 20px rgba(139, 92, 246, 0.3)",
                ],
              }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Zap className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Stark Tecnologia
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transformando o futuro digital das empresas com{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-semibold">
                inovação, segurança e excelência
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/historia">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  Conheça Nossa História
                </motion.button>
              </Link>

              <motion.button
                onClick={() => setShowVideoModal(true)}
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Volume2 className="w-5 h-5" />
                Assistir Vídeo
              </motion.button>
            </motion.div>
          </motion.div>
												</div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Números que Impressionam
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                  />

                  <div className="relative z-10 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-4`}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <motion.div
                      className="text-4xl font-bold text-white mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.div>

                    <p className="text-gray-300 text-sm font-medium">
                      {stat.label}
                    </p>
										</div>
									</div>
              </motion.div>
							))}
						</div>
					</div>
				</section>

      {/* Values Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Nossos Pilares
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="group relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${value.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${value.color} mb-6`}
                      whileHover={{ 
                        scale: 1.2, 
                        y: -5,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      {value.title}
								</h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {value.description}
                    </p>

                    <div className="space-y-2">
                      {value.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: featureIndex * 0.1,
                          }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
								</div>
							</div>
              </motion.div>
						))}
          </div>
					</div>
				</section>

      {/* Timeline Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Nossa Jornada
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full" />

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Content */}
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <motion.div
                      className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-5`}
                      />

                      <div className="relative z-10">
                        <div
                          className={`inline-flex items-center gap-2 mb-3 ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}
                        >
                          <item.icon className="w-5 h-5 text-white" />
                          <span className="text-2xl font-bold text-white">
                            {item.year}
                          </span>
								</div>

                        <h3 className="text-xl font-bold text-white mb-2">
                          {item.title}
									</h3>

                        <p className="text-gray-300 text-sm">
                          {item.description}
									</p>
								</div>
                    </motion.div>
								</div>

                  {/* Timeline Dot */}
                  <motion.div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${item.color} border-4 border-slate-900 z-10`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                      boxShadow: [
                        `0 0 0 0 rgba(168, 85, 247, 0.7)`,
                        `0 0 0 10px rgba(168, 85, 247, 0)`,
                        `0 0 0 0 rgba(168, 85, 247, 0)`,
                      ],
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.3,
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />
                </motion.div>
              ))}
							</div>
						</div>
					</div>
				</section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            O que Dizem Nossos Clientes
          </motion.h2>

          <div className="relative">
            <motion.div
              className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              key={currentTestimonial}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10" />

              <div className="relative z-10 text-center">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={`star-${Math.random()}-${i}`}
                        className="w-6 h-6 text-yellow-400 fill-current"
                      />
                    ),
                  )}
								</div>

                {/* Testimonial Content */}
                <blockquote className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[currentTestimonial].avatar}
					</div>

                  <div className="text-left">
                    <div className="text-white font-semibold text-lg">
                      {testimonials[currentTestimonial].name}
								</div>
                    <div className="text-gray-400 text-sm">
                      {testimonials[currentTestimonial].role}
									</div>
								</div>
							</div>
						</div>
            </motion.div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={`testimonial-dot-${Math.random()}-${index}`}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 scale-125"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
							</div>
						</div>
					</div>
				</section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="relative p-12 rounded-2xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Pronto para Transformar Seu Negócio?
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Junte-se a centenas de empresas que já revolucionaram seus
              processos com a Stark.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Agendar Consultoria
              </motion.button>
            </motion.div>
          </motion.div>
					</div>
				</section>

        {/* Modal de Vídeo */}
        {showVideoModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-slate-900 rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do Modal */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-cyan-600">
                <h3 className="text-white font-semibold text-lg">Nossa História em Vídeo</h3>
                <motion.button
                  onClick={() => setShowVideoModal(false)}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Player de Vídeo */}
              <div className="aspect-video bg-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                  <h4 className="text-white text-xl font-semibold mb-2">Vídeo Institucional</h4>
                  <p className="text-gray-400 mb-4">Em breve - Conheça nossa jornada de inovação</p>
                  <motion.button
                    onClick={() => setShowVideoModal(false)}
                    className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Fechar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
		</div>
  );
};

export default AboutPage;
