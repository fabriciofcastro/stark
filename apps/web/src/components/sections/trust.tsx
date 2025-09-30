"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function TrustSection() {
  const [activeTab, setActiveTab] = useState("certifications");
  const [animatedNumbers, setAnimatedNumbers] = useState({
    clients: 0,
    certifications: 0,
    uptime: 0,
    response: 0,
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Dados atualizados para criar uma experiência mais impressionante
  const certifications = [
    {
      id: "iso",
      label: "ISO 27001",
      icon: "🔒",
      description: "Gestão de Segurança da Informação",
      level: "Internacional",
      verified: true,
      glowColor: "shadow-emerald-500/30",
      gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
    },
    {
      id: "soc2",
      label: "SOC 2 Type II",
      icon: "🛡️",
      description: "Controles de Segurança e Privacidade",
      level: "EUA",
      verified: true,
      glowColor: "shadow-blue-500/30",
      gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/20",
    },
    {
      id: "pci",
      label: "PCI DSS",
      icon: "💳",
      description: "Segurança em Pagamentos",
      level: "Global",
      verified: true,
      glowColor: "shadow-amber-500/30",
      gradient: "from-amber-500/20 via-orange-500/10 to-red-500/20",
    },
    {
      id: "lgpd",
      label: "LGPD Compliant",
      icon: "📋",
      description: "Proteção de Dados Pessoais",
      level: "Brasil",
      verified: true,
      glowColor: "shadow-cyan-500/30",
      gradient: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
    },
    {
      id: "cobit",
      label: "COBIT 5",
      icon: "⚙️",
      description: "Governança de TI",
      level: "Global",
      verified: true,
      glowColor: "shadow-purple-500/30",
      gradient: "from-purple-500/20 via-pink-500/10 to-rose-500/20",
    },
    {
      id: "itil",
      label: "ITIL v4",
      icon: "🔄",
      description: "Melhores Práticas de TI",
      level: "Global",
      verified: true,
      glowColor: "shadow-teal-500/30",
      gradient: "from-teal-500/20 via-cyan-500/10 to-blue-500/20",
    },
    {
      id: "nist",
      label: "NIST CSF",
      icon: "🔬",
      description: "Framework de Cibersegurança",
      level: "Global",
      verified: true,
      glowColor: "shadow-violet-500/30",
      gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    },
  ];

  const securityStandards = [
    { id: "ssl", label: "SSL/TLS 1.3", icon: "🔐", compliance: "PCI" },
    { id: "mfa", label: "2FA/MFA", icon: "🔑", compliance: "ISO" },
    { id: "gdpr", label: "GDPR Aligned", icon: "🌍", compliance: "EU" },
    { id: "hipaa", label: "HIPAA Ready", icon: "🏥", compliance: "EUA" },
  ];

  const slas = [
    {
      id: "sla-uptime",
      label: "99.99% Uptime",
      icon: "⚡",
      value: "99.99",
      target: 99.99,
    },
    {
      id: "sla-response",
      label: "Response < 15min",
      icon: "⏱️",
      value: "<15min",
      target: 95,
    },
    {
      id: "sla-resolution",
      label: "Resolution < 4h",
      icon: "🚀",
      value: "<4h",
      target: 90,
    },
    {
      id: "sla-security",
      label: "Security 24/7",
      icon: "🛡️",
      value: "24/7",
      target: 100,
    },
  ];

  // Animações dos números
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      const targets = {
        clients: 500,
        certifications: 7,
        uptime: 99.99,
        response: 15,
      };

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setAnimatedNumbers({
          clients: Math.floor(targets.clients * easeOut),
          certifications: Math.floor(targets.certifications * easeOut),
          uptime: Number((targets.uptime * easeOut).toFixed(2)),
          response: Math.floor(targets.response * easeOut),
        });

        if (step >= steps) {
          clearInterval(interval);
          setAnimatedNumbers(targets);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  const tabs = [
    {
      id: "certifications",
      label: "Certificações",
      count: certifications.length,
    },
    { id: "standards", label: "Padrões", count: securityStandards.length },
    { id: "slas", label: "SLAs", count: slas.length },
  ];

  // Função para gerar hexágonos
  const generateHexagons = () => {
    const hexagons = [];
    for (let i = 0; i < 15; i++) {
      hexagons.push({
        id: i,
        x: Math.random() * 90 + 5, // Limita entre 5% e 95%
        y: Math.random() * 90 + 5, // Limita entre 5% e 95%
        size: Math.random() * 30 + 15, // Limita entre 15px e 45px
        delay: Math.random() * 10,
      });
    }
    return hexagons;
  };

  const hexagons = generateHexagons();

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
      {/* Holographic Hexagons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {hexagons.map((hex) => (
          <motion.div
            key={`hex-${hex.id}`}
            className="absolute opacity-20"
            style={{
              left: `${hex.x}%`,
              top: `${hex.y}%`,
              width: `${hex.size}px`,
              height: `${hex.size}px`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              delay: hex.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              className="text-emerald-400"
            >
              <path
                d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="drop-shadow-lg"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -80, 120, 0],
            scale: [1, 1.3, 0.7, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -60, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-400/15 to-emerald-500/15 rounded-full blur-2xl"
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
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
            className="text-sm font-medium text-emerald-400 mb-4 tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Confiança & Credibilidade
          </motion.h2>
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Números que Comprovam
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Nossa Excelência
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Certificações internacionais, padrões de segurança e SLAs que
            garantem a qualidade dos nossos serviços
          </motion.p>
        </motion.div>

        <div ref={ref} className="space-y-12">
          {/* Estatísticas Principais - Hexágonos Holográficos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                id: "clients",
                title: `${animatedNumbers.clients}+`,
                subtitle: "Clientes Atendidos",
                description: "Empresas de todos os portes",
                icon: "👥",
                gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
                glow: "shadow-emerald-500/25",
              },
              {
                id: "certifications",
                title: animatedNumbers.certifications.toString(),
                subtitle: "Certificações",
                description: "Padrões internacionais",
                icon: "🏆",
                gradient: "from-blue-500/20 via-indigo-500/10 to-purple-500/20",
                glow: "shadow-blue-500/25",
              },
              {
                id: "uptime",
                title: `${animatedNumbers.uptime}%`,
                subtitle: "Uptime",
                description: "Disponibilidade garantida",
                icon: "⚡",
                gradient: "from-amber-500/20 via-orange-500/10 to-red-500/20",
                glow: "shadow-amber-500/25",
              },
              {
                id: "response",
                title: `${animatedNumbers.response}min`,
                subtitle: "Tempo de Resposta",
                description: "Suporte emergencial",
                icon: "🎯",
                gradient: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
                glow: "shadow-cyan-500/25",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 100, rotateY: -45 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group perspective-1000"
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                }}
              >
                <motion.div
                  className={`relative h-full p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} backdrop-blur-xl border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-500 cursor-pointer group-hover:shadow-2xl ${stat.glow} group-hover:shadow-[0_0_60px]`}
                  whileHover={{
                    scale: 1.02,
                    z: 50,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Holographic Hexagon Overlay */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 100 100"
                      className="text-emerald-400/20"
                    >
                      <path
                        d="M50 15 L75 30 L75 70 L50 85 L25 70 L25 30 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="text-3xl mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.h3
                      className="text-2xl font-bold text-white mb-1"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {stat.title}
                    </motion.h3>
                    <motion.p
                      className="text-emerald-300 text-sm font-medium mb-1"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {stat.subtitle}
                    </motion.p>
                    <motion.p
                      className="text-gray-400 text-xs"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      {stat.description}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {tabs.map((tab) => (
              <motion.button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm border ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 shadow-lg shadow-emerald-500/25 border-emerald-400/40"
                    : "bg-neutral-800/30 text-neutral-300 hover:bg-neutral-700/40 hover:text-emerald-300 border-neutral-700/50 hover:border-emerald-400/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}{" "}
                <span className="ml-2 text-xs opacity-75 bg-emerald-500/20 px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Conteúdo das Tabs */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeTab === "certifications" &&
              certifications.map((cert, index) => (
                <motion.div
                  key={`cert-${cert.id}`}
                  initial={{ opacity: 0, y: 100, rotateX: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="group perspective-1000"
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                  }}
                >
                  <motion.div
                    className={`relative h-full p-6 rounded-2xl bg-gradient-to-br ${cert.gradient} backdrop-blur-xl border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-500 cursor-pointer group-hover:shadow-2xl ${cert.glowColor} group-hover:shadow-[0_0_60px]`}
                    whileHover={{
                      scale: 1.02,
                      z: 50,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {/* Holographic Hexagon Pattern */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-8 h-8"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${20 + (i % 2) * 30}%`,
                          }}
                          animate={{
                            rotate: [0, 360],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            duration: 4,
                            delay: i * 0.5,
                            repeat: Infinity,
                          }}
                        >
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 32 32"
                            className="text-emerald-400/30"
                          >
                            <path
                              d="M16 4 L24 8 L24 24 L16 28 L8 24 L8 8 Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                          </svg>
                        </motion.div>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        className="text-2xl mb-3"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {cert.icon}
                      </motion.div>
                      <motion.h3
                        className="text-lg font-bold text-white mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        {cert.label}
                      </motion.h3>
                      <motion.p
                        className="text-emerald-300 text-sm font-medium mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {cert.level}
                      </motion.p>
                      <motion.p
                        className="text-gray-300 text-sm leading-relaxed mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        {cert.description}
                      </motion.p>
                      <motion.div
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-400/30"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.7 }}
                      >
                        {cert.verified ? "✅ Verificado" : "⏳ Pendente"}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

            {activeTab === "standards" &&
              securityStandards.map((standard, index) => (
                <motion.div
                  key={`standard-${standard.id}`}
                  initial={{ opacity: 0, y: 100, rotateX: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="group perspective-1000"
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                  }}
                >
                  <motion.div
                    className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20 backdrop-blur-xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-500 cursor-pointer group-hover:shadow-2xl shadow-blue-500/25 group-hover:shadow-[0_0_60px]"
                    whileHover={{
                      scale: 1.02,
                      z: 50,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="relative z-10">
                      <motion.div
                        className="text-2xl mb-3"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {standard.icon}
                      </motion.div>
                      <motion.h3
                        className="text-lg font-bold text-white mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        {standard.label}
                      </motion.h3>
                      <motion.p
                        className="text-blue-300 text-sm font-medium mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {standard.compliance}
                      </motion.p>
                      <motion.p
                        className="text-gray-300 text-sm leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        Padrão de segurança {standard.compliance}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

            {activeTab === "slas" &&
              slas.map((sla, index) => (
                <motion.div
                  key={`sla-${sla.id}`}
                  initial={{ opacity: 0, y: 100, rotateX: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="group perspective-1000"
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                  }}
                >
                  <motion.div
                    className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-red-500/20 backdrop-blur-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-500 cursor-pointer group-hover:shadow-2xl shadow-amber-500/25 group-hover:shadow-[0_0_60px]"
                    whileHover={{
                      scale: 1.02,
                      z: 50,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="relative z-10">
                      <motion.div
                        className="text-2xl mb-3"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {sla.icon}
                      </motion.div>
                      <motion.h3
                        className="text-lg font-bold text-white mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        {sla.label}
                      </motion.h3>
                      <motion.p
                        className="text-amber-300 text-lg font-bold mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {sla.value}
                      </motion.p>
                      <motion.p
                        className="text-gray-300 text-sm leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        SLA garantido de {sla.target}%
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
