"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [activeStat, setActiveStat] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const impactStats = [
    {
      number: "500+",
      label: "Clientes Atendidos",
      icon: "👥",
      description: "Empresas de todos os portes que confiam em nossos serviços",
      value: "Desde startups até grandes corporações",
      color: "text-primary-400",
      bgColor: "bg-primary-500/10",
      borderColor: "border-primary-500/20",
    },
    {
      number: "99.99%",
      label: "Uptime Garantido",
      icon: "⚡",
      description: "Disponibilidade que mantém seu negócio sempre funcionando",
      value: "SLA com penalidades contratuais",
      color: "text-accent-400",
      bgColor: "bg-accent-500/10",
      borderColor: "border-accent-500/20",
    },
    {
      number: "<15min",
      label: "Resposta Emergencial",
      icon: "🎯",
      description: "Suporte imediato para situações críticas",
      value: "Tempo de resposta garantido",
      color: "text-warning-400",
      bgColor: "bg-warning-500/10",
      borderColor: "border-warning-500/20",
    },
    {
      number: "13+",
      label: "Anos de Experiência",
      icon: "🚀",
      description: "Trajetória sólida em transformação digital e inovação",
      value: "Expertise consolidada no mercado",
      color: "text-secondary-400",
      bgColor: "bg-secondary-500/10",
      borderColor: "border-secondary-500/20",
    },
  ];

  const values = [
    {
      title: "Excelência Técnica",
      description:
        "Especialistas certificados em tecnologias de ponta e melhores práticas do mercado",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de Excelência</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      highlight: "Certificações Internacionais",
    },
    {
      title: "Inovação Contínua",
      description:
        "Adotamos as tecnologias mais avançadas para manter seu negócio sempre à frente",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-accent-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de Inovação</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      highlight: "Tecnologias Emergentes",
    },
    {
      title: "Parceria Estratégica",
      description:
        "Relacionamentos duradouros baseados em confiança, transparência e resultados",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-secondary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de Parceria</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      highlight: "Relacionamento Duradouro",
    },
    {
      title: "Segurança Total",
      description:
        "Proteção completa com conformidade total às principais normas internacionais",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-warning-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de Segurança</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      highlight: "Conformidade Internacional",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      {/* Liquid Explosions Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Liquid Explosion Particles */}
        {[...Array(30)].map(() => (
          <motion.div
            key={`liquid-particle-${Math.random()}`}
            className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400/40 to-blue-400/40 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [0.5, 2, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Liquid Wave Explosions */}
        {[...Array(6)].map(() => (
          <motion.div
            key={`liquid-wave-${Math.random()}`}
            className="absolute w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, Math.random() * 150 - 75, 0],
              y: [0, Math.random() * 150 - 75, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Liquid Drops */}
        {[...Array(15)].map(() => (
          <motion.div
            key={`liquid-drop-${Math.random()}`}
            className="absolute w-8 h-8 bg-gradient-to-b from-cyan-400/30 to-transparent rounded-full"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
            animate={{
              y: [0, 50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-sm font-medium text-cyan-400 mb-4 tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Sobre Nós
          </motion.h2>
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Parceiros em
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Transformação Digital
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Há 13+ anos criando soluções tecnológicas que impulsionam o
            crescimento e garantem a segurança do seu negócio
          </motion.p>
        </motion.div>
        <div className="space-y-12">
          {/* Estatísticas de Impacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {impactStats.map((stat, index) => (
              <motion.div
                key={`stat-${stat.label}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div
                  className={`bg-gradient-to-br from-cyan-800/30 to-blue-800/30 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 text-center hover:border-cyan-400/40 transition-all duration-300 cursor-pointer group-hover:shadow-lg group-hover:shadow-cyan-500/25 ${activeStat === index ? "ring-2 ring-offset-2 ring-secondary-500/50" : ""}`}
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <motion.div
                    className="text-3xl font-bold text-white mb-2"
                    whileHover={{
                      color: "#06b6d4",
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-lg font-semibold text-cyan-300 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-300 mb-2">
                    {stat.description}
                  </div>
                  <div className="text-xs text-gray-400">{stat.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nossos Valores */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-3">
                O que nos Move
              </h3>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Valores fundamentais que guiam nossa jornada de transformação
                digital
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={`value-${value.title}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="bg-gradient-to-br from-cyan-800/30 to-blue-800/30 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 text-center hover:border-cyan-400/40 transition-all duration-300 cursor-pointer group-hover:shadow-lg group-hover:shadow-cyan-500/25">
                    <div className="text-4xl mb-3">{value.icon}</div>
                    <motion.div
                      className="text-xl font-bold text-white mb-2"
                      whileHover={{
                        color: "#06b6d4",
                      }}
                    >
                      {value.title}
                    </motion.div>
                    <div className="text-sm text-gray-300 mb-2">
                      {value.description}
                    </div>
                    <div className="text-xs text-cyan-400 font-medium">
                      {value.highlight}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Nossa História */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-3">
                Nossa Jornada de{" "}
                <span className="text-secondary-400">Transformação</span>
              </h3>
              <p className="text-neutral-400 max-w-3xl mx-auto">
                Uma trajetória construída com excelência, inovação e resultados
                comprovados
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="space-y-4 text-neutral-300">
                  <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-lg p-4">
                    <h4 className="text-xl font-bold text-white mb-2 flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                      Nossa Origem
                    </h4>
                    <p className="leading-relaxed">
                      Fundada em 2011, a STARK nasceu da visão de democratizar o
                      acesso à tecnologia de ponta. Iniciamos nossa jornada com
                      o propósito de transformar ideias em realidade digital,
                      oferecendo soluções que impulsionam o crescimento de
                      empresas de todos os portes.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-accent-500/10 to-secondary-500/10 border border-accent-500/20 rounded-lg p-4">
                    <h4 className="text-xl font-bold text-white mb-2 flex items-center">
                      <span className="w-2 h-2 bg-accent-500 rounded-full mr-3"></span>
                      Nosso Crescimento
                    </h4>
                    <p className="leading-relaxed">
                      Ao longo de 13+ anos, construímos uma reputação sólida
                      baseada em resultados mensuráveis. Já atendemos mais de
                      500 empresas, desde startups inovadoras até grandes
                      corporações, sempre com foco em parcerias duradouras e
                      transformação digital efetiva.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <div className="flex items-center space-x-2 bg-neutral-800/30 px-3 py-1.5 rounded-lg">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm font-medium text-white">
                        13+ Anos de Experiência
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-neutral-800/30 px-3 py-1.5 rounded-lg">
                      <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                      <span className="text-sm font-medium text-white">
                        500+ Empresas Atendidas
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-neutral-800/30 px-3 py-1.5 rounded-lg">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                      <span className="text-sm font-medium text-white">
                        99.99% Uptime
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary-800/30 to-accent-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold">M</span>
                    </div>
                    <h4 className="text-xl font-bold text-white">
                      Nossa Missão
                    </h4>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    Democratizar o acesso à tecnologia de ponta, oferecendo
                    soluções inovadoras que impulsionam o crescimento e a
                    transformação digital das empresas, garantindo segurança,
                    eficiência e resultados mensuráveis.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-accent-800/30 to-secondary-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-secondary-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold">V</span>
                    </div>
                    <h4 className="text-xl font-bold text-white">
                      Nossa Visão
                    </h4>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    Ser a referência em tecnologia e inovação no Brasil,
                    reconhecida pela excelência técnica, pela transformação
                    digital efetiva e pelo impacto positivo no crescimento dos
                    nossos parceiros.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-br from-primary-900/40 via-neutral-900/30 to-accent-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Pronto para{" "}
                    <span className="text-secondary-400">Transformar</span> Seu
                    Negócio?
                  </h3>
                  <p className="text-neutral-300 mb-6 max-w-3xl mx-auto text-base leading-relaxed">
                    Junte-se a mais de 500 empresas que já confiam na STARK para
                    sua transformação digital. Descubra como podemos ajudar sua
                    empresa a alcançar novos patamares de eficiência, segurança
                    e crescimento.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 max-w-4xl mx-auto">
                    <div className="bg-neutral-800/30 border border-white/10 rounded-lg p-3">
                      <div className="text-xl mb-1">🚀</div>
                      <div className="text-sm font-semibold text-white">
                        Implementação Rápida
                      </div>
                      <div className="text-xs text-neutral-400">
                        Resultados em 30 dias
                      </div>
                    </div>
                    <div className="bg-neutral-800/30 border border-white/10 rounded-lg p-3">
                      <div className="text-xl mb-1">🛡️</div>
                      <div className="text-sm font-semibold text-white">
                        Segurança Total
                      </div>
                      <div className="text-xs text-neutral-400">
                        Conformidade garantida
                      </div>
                    </div>
                    <div className="bg-neutral-800/30 border border-white/10 rounded-lg p-3">
                      <div className="text-xl mb-1">📈</div>
                      <div className="text-sm font-semibold text-white">
                        ROI Comprovado
                      </div>
                      <div className="text-xs text-neutral-400">
                        Resultados mensuráveis
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-secondary-500/25"
                    >
                      <span className="mr-2">💬</span>
                      Fale Conosco Agora
                    </a>
                    <a
                      href="/services"
                      className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-primary-500 text-primary-400 font-semibold rounded-xl hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-105"
                    >
                      <span className="mr-2">🔧</span>
                      Ver Nossos Serviços
                    </a>
                    <a
                      href="/cases-de-sucesso"
                      className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-accent-500 text-accent-400 font-semibold rounded-xl hover:bg-accent-500 hover:text-white transition-all duration-300 hover:scale-105"
                    >
                      <span className="mr-2">📊</span>
                      Ver Cases de Sucesso
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
