"use client";

import { motion } from "framer-motion";
import { Cookie, Settings, BarChart3, Target, Shield, Info, Clock, CheckCircle, Globe, Zap, Cpu, Network, Lock, Database } from "lucide-react";
import { useState, useEffect } from "react";

const CookiePolicyPage = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; delay: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        delay: Math.random() * 3
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const cookieTypes = [
    {
      icon: Shield,
      name: "Cookies Necessários",
      description: "Essenciais para o funcionamento básico do site",
      examples: [
        "Preferências de idioma e região",
        "Dados de sessão e autenticação",
        "Configurações de segurança e privacidade",
        "Funcionalidades básicas do site",
        "Carrinho de compras e formulários",
        "Prevenção de fraudes e segurança"
      ],
      duration: "Sessão",
      color: "from-green-500 to-emerald-600",
      required: true
    },
    {
      icon: BarChart3,
      name: "Cookies de Análise",
      description: "Nos ajudam a entender como você usa o site",
      examples: [
        "Google Analytics 4 com anonimização",
        "Métricas de desempenho e velocidade",
        "Estatísticas de uso e navegação",
        "Análise de comportamento do usuário",
        "Relatórios de conversão e funil",
        "Heatmaps e gravações de sessão"
      ],
      duration: "2 anos",
      color: "from-blue-500 to-cyan-600",
      required: false
    },
    {
      icon: Target,
      name: "Cookies de Performance",
      description: "Melhoram a velocidade e funcionalidade",
      examples: [
        "Cache de recursos estáticos",
        "Otimização de carregamento de imagens",
        "CDN e distribuição global",
        "Compressão de dados e minificação",
        "Lazy loading e carregamento progressivo",
        "Service Workers e PWA"
      ],
      duration: "1 ano",
      color: "from-purple-500 to-indigo-600",
      required: false
    },
    {
      icon: Globe,
      name: "Cookies de Marketing",
      description: "Personalizam anúncios e conteúdo",
      examples: [
        "Publicidade direcionada e remarketing",
        "Análise de conversão e ROI",
        "Campanhas personalizadas e segmentação",
        "Redes sociais e pixels de tracking",
        "A/B testing e otimização de landing pages",
        "Email marketing e newsletters"
      ],
      duration: "6 meses",
      color: "from-orange-500 to-red-600",
      required: false
    },
    {
      icon: Lock,
      name: "Cookies de Segurança",
      description: "Protegem contra fraudes e ataques",
      examples: [
        "Detecção de bots e ataques DDoS",
        "Verificação de identidade e 2FA",
        "Proteção contra CSRF e XSS",
        "Monitoramento de tentativas de login",
        "Análise de risco e scoring",
        "Compliance com regulamentações"
      ],
      duration: "30 dias",
      color: "from-red-500 to-pink-600",
      required: true
    },
    {
      icon: Database,
      name: "Cookies de Funcionalidade",
      description: "Lembram suas preferências e configurações",
      examples: [
        "Tema claro/escuro e personalização",
        "Preferências de notificação",
        "Configurações de acessibilidade",
        "Idioma e localização",
        "Filtros e ordenação de conteúdo",
        "Configurações de privacidade"
      ],
      duration: "1 ano",
      color: "from-cyan-500 to-teal-600",
      required: false
    }
  ];

  const managementSteps = [
    {
      icon: Settings,
      title: "Gerenciar no Site",
      description: "Use nosso modal de cookies para personalizar suas preferências",
      action: "Clique no ícone de cookies no canto inferior"
    },
    {
      icon: Cookie,
      title: "Configurações do Navegador",
      description: "Configure cookies diretamente no seu navegador",
      action: "Acesse Configurações > Privacidade > Cookies"
    },
    {
      icon: Shield,
      title: "Ferramentas de Terceiros",
      description: "Use ferramentas especializadas para gerenciar cookies",
      action: "Opt-out em redes publicitárias"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            }}
            transition={{
              duration: 2.8 + Math.random() * 1.2,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-24 left-12 w-24 h-24 border border-cyan-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-52 right-16 w-16 h-16 border border-purple-500/20 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-10 h-10 border border-blue-500/20 rounded-full"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-88 h-88 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-76 h-76 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl mb-8"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Cookie className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Política de Cookies
            </motion.h1>
            
            <motion.p
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Entenda como utilizamos cookies para melhorar sua experiência no site da STARK Tecnologia 
              e como você pode gerenciar suas preferências de forma transparente e segura.
            </motion.p>

            <motion.div
              className="flex items-center justify-center space-x-2 text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Clock className="w-4 h-4" />
              <span>Última atualização: {new Date().toLocaleDateString('pt-BR')} - Versão 3.0</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* What are Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
            <div className="flex items-start space-x-4">
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              
              <div className="flex-1">
                <motion.h2
                  className="text-2xl font-bold text-white mb-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  O que são Cookies?
                </motion.h2>
                <p className="text-white/80 leading-relaxed mb-4 text-lg">
                  Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita nosso site. 
                  Eles nos ajudam a fornecer uma experiência personalizada e melhorar a funcionalidade do site.
                </p>
                <p className="text-white/80 leading-relaxed text-lg">
                  Utilizamos cookies de forma transparente e responsável, sempre respeitando sua privacidade e 
                  oferecendo controle total sobre quais tipos de cookies aceitar.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cookie Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            className="text-3xl font-bold text-white text-center mb-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Tipos de Cookies que Utilizamos
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${cookie.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-cyan-500/25`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <cookie.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {cookie.name}
                      </h3>
                      {cookie.required && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Obrigatório
                        </span>
                      )}
                    </div>
                    <p className="text-white/70 mb-4 text-sm">
                      {cookie.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white/90 mb-2">Exemplos:</h4>
                      <ul className="space-y-1">
                        {cookie.examples.map((example, exampleIndex) => (
                          <motion.li
                            key={exampleIndex}
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: exampleIndex * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                              whileHover={{ scale: 1.5 }}
                              transition={{ duration: 0.2 }}
                            />
                            <span className="text-white/70 text-xs">{example}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Duração:</span>
                      <span className="text-white/80 font-medium">{cookie.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Management */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            className="text-3xl font-bold text-white text-center mb-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Como Gerenciar Cookies
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {managementSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 text-center"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/25"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.h3
                  className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.title}
                </motion.h3>
                
                <p className="text-white/70 mb-4 leading-relaxed text-sm">
                  {step.description}
                </p>
                
                <motion.div
                  className="bg-white/10 rounded-lg p-3 group-hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white/80 text-sm font-medium">
                    {step.action}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your Rights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
            <div className="text-center mb-8">
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h2
                className="text-2xl font-bold text-white mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                Seus Direitos
              </motion.h2>
              <p className="text-white/80 max-w-2xl mx-auto text-lg">
                Você tem controle total sobre os cookies. Pode aceitar, recusar ou personalizar 
                suas preferências a qualquer momento.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Você pode:</h3>
                <ul className="space-y-3">
                  {[
                    "Aceitar todos os cookies",
                    "Recusar cookies opcionais",
                    "Personalizar por categoria",
                    "Alterar preferências a qualquer momento"
                  ].map((right, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      </motion.div>
                      <span className="text-white/80">{right}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Impacto:</h3>
                <ul className="space-y-3">
                  {[
                    { text: "Funcionalidade básica sempre mantida", color: "bg-green-400" },
                    { text: "Experiência personalizada opcional", color: "bg-blue-400" },
                    { text: "Analytics para melhorias do site", color: "bg-purple-400" },
                    { text: "Marketing direcionado (opcional)", color: "bg-orange-400" }
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className={`w-2 h-2 ${item.color} rounded-full flex-shrink-0`}
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="text-white/80">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 text-center"
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Settings className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Dúvidas sobre Cookies?
          </motion.h2>
          
          <motion.p
            className="text-white/80 mb-8 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nossa equipe está disponível para esclarecer qualquer dúvida sobre nossa política de cookies 
            e como gerenciar suas preferências.
          </motion.p>
          
          <motion.a
            href="/contato"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-xl font-medium hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Entre em Contato
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
