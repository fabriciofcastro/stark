"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Clock,
  Users,
  Target,
  Award,
  Zap,
  Shield,
  Globe,
  Heart,
  Rocket,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
} from "lucide-react";

const HistoriaPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Timeline da empresa
  const timeline = [
    {
      year: "2008",
      title: "O Início da Revolução",
      description: "Fundada por visionários da tecnologia, a Stark nasceu com o propósito de democratizar a inovação digital para empresas de todos os tamanhos.",
      icon: Lightbulb,
      color: "from-blue-500 to-purple-500",
      image: "/images/timeline/2008.jpg",
      achievements: ["Primeira equipe de 5 pessoas", "Primeiro cliente", "Escritório em São Paulo"],
    },
    {
      year: "2012",
      title: "Expansão e Certificação",
      description: "Conquistamos nossa primeira certificação ISO e expandimos para outras capitais brasileiras, estabelecendo padrões de excelência.",
      icon: Award,
      color: "from-purple-500 to-pink-500",
      image: "/images/timeline/2012.jpg",
      achievements: ["Certificação ISO 27001", "Equipe de 50 pessoas", "5 cidades atendidas"],
    },
    {
      year: "2016",
      title: "Revolução Cloud",
      description: "Lideramos a migração para cloud computing no Brasil, ajudando empresas a se tornarem mais ágeis e eficientes.",
      icon: Globe,
      color: "from-pink-500 to-red-500",
      image: "/images/timeline/2016.jpg",
      achievements: ["Parceria com AWS/Azure", "100+ clientes", "Primeira operação internacional"],
    },
    {
      year: "2020",
      title: "Transformação Digital Global",
      description: "Durante a pandemia, aceleramos a transformação digital de centenas de empresas, provando nossa capacidade de adaptação.",
      icon: Zap,
      color: "from-red-500 to-orange-500",
      image: "/images/timeline/2020.jpg",
      achievements: ["300+ clientes", "Migração 100% remota", "Crescimento de 200%"],
    },
    {
      year: "2024",
      title: "Futuro Presente",
      description: "Implementamos IA, IoT e tecnologias quânticas, posicionando nossos clientes na vanguarda da inovação.",
      icon: Rocket,
      color: "from-orange-500 to-yellow-500",
      image: "/images/timeline/2024.jpg",
      achievements: ["500+ clientes", "IA integrada", "Tecnologias quânticas"],
    },
  ];

  // Estatísticas em tempo real
  const liveStats = [
    { icon: Users, value: "500+", label: "Clientes Ativos", color: "from-blue-500 to-cyan-500" },
    { icon: Globe, value: "50+", label: "Países", color: "from-purple-500 to-pink-500" },
    { icon: Award, value: "15+", label: "Anos de Experiência", color: "from-green-500 to-emerald-500" },
    { icon: Target, value: "99.9%", label: "Satisfação", color: "from-orange-500 to-red-500" },
  ];

  // Depoimentos de clientes
  const testimonials = [
    {
      name: "Maria Silva",
      role: "CTO, TechCorp",
      company: "Empresa de Tecnologia",
      content: "A Stark revolucionou nossa infraestrutura. Reduzimos custos em 40% e aumentamos performance em 300%. Uma parceria que transformou nosso negócio.",
      avatar: "MS",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "CEO, InnovateLab",
      company: "Laboratório de Inovação",
      content: "Parceria estratégica excepcional. Nos ajudaram a migrar para cloud com zero downtime. Profissionais de altíssimo nível.",
      avatar: "JS",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Diretora de TI, GlobalCorp",
      company: "Corporação Global",
      content: "Equipe altamente qualificada e comprometida. Resultados que superaram nossas expectativas. Recomendo sem hesitação.",
      avatar: "AC",
      rating: 5,
    },
  ];

  // Controles do vídeo
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Auto-play dos slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % timeline.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Background Animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`grid-h-${i}`}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ top: `${i * 5}%` }}
              animate={{
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`grid-v-${i}`}
              className="absolute h-full w-px bg-gradient-to-b from-transparent via-white to-transparent"
              style={{ left: `${i * 5}%` }}
              animate={{
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
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
              className="inline-flex items-center justify-center w-32 h-32 mb-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 shadow-2xl"
              animate={{
                x: [0, 10, -10, 0],
                y: [0, -5, 0],
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 30px rgba(139, 92, 246, 0.4)",
                  "0 0 50px rgba(139, 92, 246, 0.7)",
                  "0 0 30px rgba(139, 92, 246, 0.4)",
                ],
              }}
              transition={{
                x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Zap className="w-16 h-16 text-white" />
            </motion.div>

            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Nossa História
            </motion.h1>

            <motion.p
              className="text-2xl sm:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Uma jornada de{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-semibold">
                inovação, crescimento e transformação digital
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                onClick={() => setShowVideoModal(true)}
                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-6 h-6" />
                Assistir Vídeo da História
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-6 h-6" />
                Conhecer Nossa Equipe
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Números em Tempo Real
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {liveStats.map((stat, index) => (
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
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  <div className="relative z-10 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${stat.color} mb-6`}
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.7, 1, 0.7],
                        filter: [
                          "brightness(1)",
                          "brightness(1.2)",
                          "brightness(1)",
                        ],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <stat.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <motion.div
                      className="text-5xl font-bold text-white mb-3"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.div>
                    
                    <p className="text-gray-300 text-lg font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Linha do Tempo Interativa
          </motion.h2>

          {/* Timeline Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-4 p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              {timeline.map((item, index) => (
                <motion.button
                  key={item.year}
                  onClick={() => setCurrentSlide(index)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.year}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Timeline Content */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="relative"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div className="space-y-8">
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${timeline[currentSlide].color} mb-6`}
                      whileHover={{ 
                        scale: 1.3, 
                        y: -8,
                        x: 5,
                        boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
                        filter: "brightness(1.3)"
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {React.createElement(timeline[currentSlide].icon, { className: "w-10 h-10 text-white" })}
                    </motion.div>

                    <motion.h3
                      className="text-4xl font-bold text-white mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {timeline[currentSlide].title}
                    </motion.h3>

                    <motion.p
                      className="text-xl text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {timeline[currentSlide].description}
                    </motion.p>

                    {/* Achievements */}
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <h4 className="text-lg font-semibold text-white">Principais Conquistas:</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {timeline[currentSlide].achievements.map((achievement, index) => (
                          <motion.div
                            key={achievement}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${timeline[currentSlide].color}`} />
                            <span className="text-gray-300">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Visual */}
                  <div className="relative">
                    <motion.div
                      className="relative w-full h-96 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/10 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${timeline[currentSlide].color} opacity-20`} />
                      
                      <div className="relative z-10 flex items-center justify-center h-full">
                        <motion.div
                          className="text-center"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {React.createElement(timeline[currentSlide].icon, { className: "w-32 h-32 text-white mx-auto mb-4" })}
                          <div className="text-6xl font-bold text-white mb-2">
                            {timeline[currentSlide].year}
                          </div>
                          <div className="text-xl text-gray-300">
                            {timeline[currentSlide].title}
                          </div>
                        </motion.div>
                      </div>

                      {/* Floating Elements */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full bg-white/10"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 20 + 10}px`,
                            height: `${Math.random() * 20 + 10}px`,
                          }}
                          animate={{
                            x: [0, Math.random() * 50 - 25, 0],
                            y: [0, Math.random() * 50 - 25, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mt-12">
              <motion.button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + timeline.length) % timeline.length)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
                Anterior
              </motion.button>

              <div className="flex gap-2">
                {timeline.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-gradient-to-r from-purple-500 to-cyan-500 scale-125"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % timeline.length)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Próximo
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Vozes que Inspiram
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    {/* Content */}
                    <blockquote className="text-gray-300 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      
                      <div>
                        <div className="text-white font-semibold">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {testimonial.role}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {testimonial.company}
                        </div>
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
            className="relative p-12 rounded-2xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/10"
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
              Faça Parte da Nossa História
            </motion.h2>
            
            <motion.p
              className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Junte-se a centenas de empresas que já transformaram seus negócios com a Stark.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-6 h-6" />
                Começar Transformação
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-6 h-6" />
                Agendar Consultoria
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl mx-4 bg-black rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-black/70 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="/images/video-poster.jpg"
                  onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
                  onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="/videos/company-history.mp4" type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause */}
                    <motion.button
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </motion.button>

                    {/* Time Display */}
                    <div className="text-white text-sm font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>

                    {/* Volume */}
                    <motion.button
                      onClick={toggleMute}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </motion.button>

                    {/* Fullscreen */}
                    <motion.button
                      onClick={toggleFullscreen}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoriaPage;
