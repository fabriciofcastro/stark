"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Services = () => {
  const featuredServices = [
    {
      id: "suporte-tecnico",
      title: "Suporte Técnico Empresarial",
      subtitle: "24/7 • SLA Garantido",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de Suporte Técnico</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      description:
        "Suporte técnico especializado 24/7 com SLA garantido para garantir a continuidade da sua operação.",
      features: ["Monitoramento 24/7", "SLA garantido", "Equipe especializada"],
      link: "/suporte-tecnico-empresarial",
      badge: "Popular",
      badgeColor: "from-emerald-500 to-green-400",
      gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
      glow: "shadow-emerald-500/25",
    },
    {
      id: "consultoria-tecnologica",
      title: "Consultoria Tecnológica",
      subtitle: "Estratégica • Transformação Digital",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de Consultoria Estratégica</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      description:
        "Transformação digital e planejamento estratégico para otimizar processos e reduzir custos.",
      features: [
        "Auditoria tecnológica",
        "Roadmap estratégico",
        "ROI comprovado",
      ],
      link: "/consultoria-tecnologica",
      badge: "Recomendado",
      badgeColor: "from-blue-500 to-indigo-400",
      gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/20",
      glow: "shadow-blue-500/25",
    },
    {
      id: "cloud-infraestrutura",
      title: "Cloud & Infraestrutura",
      subtitle: "VPS • Linux • Alta Disponibilidade",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de Soluções em Nuvem</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-4.477-5.001A4 4 0 003 15z"
          />
        </svg>
      ),
      description:
        "Provisionamento, hardening e observabilidade em servidores Linux com alta disponibilidade.",
      features: [
        "99.9% disponibilidade",
        "Backups automatizados",
        "Escalabilidade",
      ],
      link: "/cloud-vps-linux",
      badge: "Novo",
      badgeColor: "from-amber-500 to-yellow-400",
      gradient: "from-amber-500/20 via-orange-500/10 to-red-500/20",
      glow: "shadow-amber-500/25",
    },
    {
      id: "ciberseguranca",
      title: "Cibersegurança",
      subtitle: "Pentest • SOC • LGPD",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Ícone de Cibersegurança</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      description:
        "Pentest, SOC/MDR, LGPD e resposta a incidentes alinhada a NIST.",
      features: [
        "Pentest (web, infra, Wi‑Fi)",
        "SOC/MDR (monitoramento 24/7)",
        "LGPD/DPA e conformidade",
      ],
      link: "/cyberseguranca",
      badge: "Essencial",
      badgeColor: "from-red-500 to-rose-400",
      gradient: "from-red-500/20 via-pink-500/10 to-purple-500/20",
      glow: "shadow-red-500/25",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
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
            className="text-sm font-medium text-blue-400 mb-4 tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Nossos Serviços
          </motion.h2>
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Soluções Tecnológicas
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Revolucionárias
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Serviços especializados com tecnologia de ponta para transformar sua
            infraestrutura de TI
          </motion.p>
        </motion.div>

        {/* Revolutionary Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group perspective-1000"
              whileHover={{
                scale: 1.02,
                y: -10,
              }}
            >
              <Link href={service.link} className="block h-full">
                <motion.div
                  className={`relative h-full p-8 rounded-2xl bg-gradient-to-br ${service.gradient} backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer group-hover:shadow-2xl ${service.glow} group-hover:shadow-[0_0_50px]`}
                  whileHover={{
                    scale: 1.05,
                    z: 50,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Holographic Overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Badge */}
                    <motion.div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${service.badgeColor} text-white mb-6`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {service.badge}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      className="mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-colors duration-300 w-fit"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-white group-hover:text-blue-300 transition-colors duration-300">
                        {service.icon}
                      </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {service.title}
                    </motion.h3>

                    {/* Subtitle */}
                    <motion.p
                      className="text-sm text-blue-300 mb-4 font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {service.subtitle}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      className="text-gray-300 text-sm leading-relaxed mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      {service.description}
                    </motion.p>

                    {/* Features */}
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                    >
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={`${service.id}-feature-${featureIndex}`}
                          className="flex items-center text-xs text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1 + 0.8 + featureIndex * 0.1,
                          }}
                        >
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                          {feature}
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute bottom-6 right-6 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.9 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Seta de navegação</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
          >
            <span>Explorar Todos os Serviços</span>
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
