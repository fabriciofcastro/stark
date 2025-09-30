"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const TechnicalExpertise = () => {
  const expertiseAreas = [
    {
      id: "governanca-ti",
      title: "Governança de TI",
      description:
        "Estruturamos processos, políticas e controles alinhados a COBIT, ITIL, ISO 27001 e NIST. Auditoria, gestão de riscos, LGPD e DPA.",
      services: [
        "COBIT 5 e ITIL v4 (processos e serviços)",
        "ISO 27001 (SGSI) e NIST CSF (segurança)",
        "Gestão de riscos e continuidade (BIA/DRP)",
        "Inventário, CMDB e gestão de mudanças",
        "Políticas de segurança, backup e acesso",
        "Conformidade LGPD: DPA, registro de tratamento",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de Governança</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      badgeColor: "from-cyan-500 to-blue-400",
      gradient: "from-cyan-500/15 via-blue-500/10 to-indigo-500/15",
      glow: "shadow-cyan-500/20",
    },
    {
      id: "criacao-sites",
      title: "Criação de Sites",
      description:
        "Sites otimizados para performance, SEO e conversão. Landing pages, e-commerces e sistemas web personalizados.",
      services: [
        "SEO técnico e performance (Core Web Vitals)",
        "Landing pages de alta conversão",
        "E-commerces integrados",
        "Sistemas web sob medida",
        "Sites responsivos e PWA",
        "Análise e otimização de conversão",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de Desenvolvimento Web</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      badgeColor: "from-emerald-500 to-teal-400",
      gradient: "from-emerald-500/15 via-teal-500/10 to-cyan-500/15",
      glow: "shadow-emerald-500/20",
    },
    {
      id: "engajamento-digital",
      title: "Engajamento Digital",
      description:
        "Estratégias completas para aumentar o engajamento e conversão dos visitantes.",
      services: [
        "Google Analytics 4 e Tag Manager",
        "A/B testing e otimização",
        "Funnels de conversão",
        "Chatbots e automação",
        "Relatórios e métricas personalizadas",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de Engajamento</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      badgeColor: "from-purple-500 to-pink-400",
      gradient: "from-purple-500/15 via-pink-500/10 to-rose-500/15",
      glow: "shadow-purple-500/20",
    },
    {
      id: "email-profissional",
      title: "E-mail Profissional",
      description:
        "Soluções completas de e-mail corporativo com segurança e confiabilidade.",
      services: [
        "E-mail Exchange e G Suite",
        "Configuração e migração de domínios",
        "Proteção contra SPAM e phishing",
        "Arquivamento e backup de e-mails",
        "Políticas de retenção e compliance",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de E-mail</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      badgeColor: "from-orange-500 to-red-400",
      gradient: "from-orange-500/15 via-red-500/10 to-pink-500/15",
      glow: "shadow-orange-500/20",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900">
      {/* Animated Liquid Waves */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -25, 40, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, -75, 50, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-2xl"
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -15, 20, 0],
            scale: [1, 1.02, 0.98, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`grid-line-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
              style={{
                width: "100%",
                height: "1px",
                top: `${i * 5}%`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`grid-vertical-${i}`}
              className="absolute bg-gradient-to-b from-transparent via-purple-400/20 to-transparent"
              style={{
                width: "1px",
                height: "100%",
                left: `${i * 10}%`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleY: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 5,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
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
            Expertise Técnica
          </motion.h2>
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Áreas de
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Especialização
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Conhecimento profundo em tecnologias e metodologias para entregar
            soluções de excelência
          </motion.p>
        </motion.div>

        {/* Expertise Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group perspective-1000"
              whileHover={{
                scale: 1.01,
                y: -4,
                rotateY: 1,
              }}
            >
              <motion.div
                className={`relative h-full p-8 rounded-2xl bg-gradient-to-br ${area.gradient} backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 cursor-pointer group-hover:shadow-2xl ${area.glow} group-hover:shadow-[0_0_60px]`}
                whileHover={{
                  scale: 1.01,
                  z: 50,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Liquid Wave Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated Liquid Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with Liquid Animation */}
                  <motion.div
                    className="mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-cyan-400/20 group-hover:bg-cyan-400/20 transition-colors duration-300 w-fit"
                    whileHover={{
                      rotate: 360,
                      scale: 1.05,
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {area.icon}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    {area.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-gray-300 leading-relaxed mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {area.description}
                  </motion.p>

                  {/* Services List */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                  >
                    {area.services.map((service, serviceIndex) => (
                      <motion.div
                        key={`${area.id}-service-${serviceIndex}`}
                        className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.2 + 0.7 + serviceIndex * 0.1,
                        }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-3 flex-shrink-0"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: serviceIndex * 0.2,
                          }}
                        />
                        {service}
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Floating Action Indicator */}
                  <motion.div
                    className="absolute bottom-6 right-6 text-cyan-400/60 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      delay: index * 0.2 + 0.8,
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Indicador de ação</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25"
          >
            <span>Conhecer Nossos Serviços</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Seta de navegação</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalExpertise;
