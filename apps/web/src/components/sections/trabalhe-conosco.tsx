"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Users,
  Briefcase,
  Heart,
  Target,
  Award,
  Globe,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Send,
  FileText,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  Code,
  Cloud,
  Brain,
  Palette,
  Rocket
} from "lucide-react";

const TrabalheConosco = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 shadow-2xl">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Trabalhe Conosco
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Carregando oportunidades...
            </p>
          </div>
        </div>
      </section>
    );
  }

  const benefits = [
    {
      icon: Heart,
      title: "Ambiente Humanizado",
      description: "Valorizamos o bem-estar e o crescimento pessoal de cada colaborador"
    },
    {
      icon: Target,
      title: "Projetos Desafiadores",
      description: "Trabalhe em projetos inovadores que impactam milhares de usuários"
    },
    {
      icon: Award,
      title: "Desenvolvimento Contínuo",
      description: "Acesso a cursos, certificações e eventos de tecnologia"
    },
    {
      icon: Globe,
      title: "Flexibilidade",
      description: "Home office, horários flexíveis e foco em resultados"
    },
    {
      icon: Zap,
      title: "Tecnologia de Ponta",
      description: "Trabalhe com as mais modernas ferramentas e tecnologias"
    },
    {
      icon: Star,
      title: "Cultura de Inovação",
      description: "Sua criatividade e ideias são sempre bem-vindas"
    }
  ];

  const departments = [
    {
      icon: Code,
      title: "Desenvolvimento",
      description: "Crie soluções que transformam o mundo digital",
      color: "cyan",
      vacancies: 5
    },
    {
      icon: Cloud,
      title: "Cloud Computing",
      description: "Arquiteture infraestruturas escaláveis e seguras",
      color: "sky",
      vacancies: 3
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Proteja dados e sistemas com expertise em cybersecurity",
      color: "red",
      vacancies: 4
    },
    {
      icon: Brain,
      title: "Inteligência Artificial",
      description: "Desenvolva soluções de IA que revolucionam negócios",
      color: "pink",
      vacancies: 2
    },
    {
      icon: Palette,
      title: "UX/UI Design",
      description: "Crie experiências digitais excepcionais",
      color: "emerald",
      vacancies: 3
    },
    {
      icon: Rocket,
      title: "DevOps",
      description: "Automatize e otimize processos de desenvolvimento",
      color: "purple",
      vacancies: 2
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Candidatura",
      description: "Envie seu currículo e preencha o formulário de candidatura"
    },
    {
      step: "02",
      title: "Análise",
      description: "Nossa equipe analisa seu perfil e experiência"
    },
    {
      step: "03",
      title: "Entrevista",
      description: "Conversa com gestores e colegas de equipe"
    },
    {
      step: "04",
      title: "Teste Técnico",
      description: "Avaliação prática das suas habilidades técnicas"
    },
    {
      step: "05",
      title: "Decisão",
      description: "Retorno com feedback e proposta de contratação"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        
        {/* Floating Icons */}
        {[Users, Briefcase, Heart, Target, Award, Globe, Zap, Star].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{
              left: `${10 + (index * 12)}%`,
              top: `${20 + (index % 4) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.8,
            }}
          >
            <Icon size={28} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 shadow-2xl">
            <Users className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Trabalhe Conosco
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Junte-se à nossa <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">equipe de especialistas</span> e faça parte da revolução tecnológica
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-cyan-400">
              <Star className="w-5 h-5" fill="currentColor" />
              <span>Ambiente inovador</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <Award className="w-5 h-5" fill="currentColor" />
              <span>Oportunidades de crescimento</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Target className="w-5 h-5" fill="currentColor" />
              <span>Projetos desafiadores</span>
            </div>
          </div>
          
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-cyan-500/30" />
        </motion.div>

        {/* Why Work With Us */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Por que trabalhar conosco?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Oferecemos um ambiente único onde talento, inovação e crescimento se encontram
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                    <benefit.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Departments */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Nossas Áreas de Atuação
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Encontre a área que mais combina com seu perfil e paixão
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.title}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-${dept.color}-500/20 to-${dept.color}-600/20`}>
                      <dept.icon className={`w-8 h-8 text-${dept.color}-400`} />
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold rounded-full">
                      {dept.vacancies} vagas
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {dept.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {dept.description}
                  </p>
                  
                  <motion.button
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = '/vagas'}
                  >
                    Ver Vagas
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Nosso Processo Seletivo
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Um processo transparente e humanizado para encontrar os melhores talentos
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { icon: Users, label: "Funcionários", value: "50+", color: "cyan" },
            { icon: Briefcase, label: "Vagas Abertas", value: "19+", color: "purple" },
            { icon: Globe, label: "Países", value: "3", color: "emerald" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
              </div>
              <div className={`text-4xl font-bold text-${stat.color}-400 mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Pronto para fazer parte da nossa equipe?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Explore nossas vagas abertas e encontre a oportunidade perfeita para sua carreira.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.location.href = '/vagas'}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Briefcase className="w-5 h-5" />
                Ver Vagas Abertas
              </motion.button>
              <motion.button
                onClick={() => window.location.href = '/contact'}
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Falar com RH
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrabalheConosco;
