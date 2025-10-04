"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Mail, 
  Calendar,
  Star,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Users,
  Award
} from "lucide-react";
import { trackEvent } from "@/lib/analytics-unified";

interface CTAProps {
  variant?: "hero" | "floating" | "inline" | "popup" | "banner";
  urgency?: "low" | "medium" | "high";
  theme?: "primary" | "success" | "warning" | "info";
  className?: string;
  showSocialProof?: boolean;
  autoShow?: boolean;
  delay?: number;
}

export function StrategicCTA({
  variant = "inline",
  urgency = "medium",
  theme = "primary",
  className = "",
  showSocialProof = true,
  autoShow = false,
  delay = 3000
}: CTAProps) {
  const [isVisible, setIsVisible] = useState(!autoShow);
  const [socialProof, setSocialProof] = useState({
    customers: 1250,
    rating: 4.9,
    responseTime: "2 min"
  });

  // Auto-show para popups
  useEffect(() => {
    if (autoShow && variant === "popup") {
      const timer = setTimeout(() => {
        setIsVisible(true);
        trackEvent("cta_auto_show", variant, "Auto popup displayed");
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [autoShow, variant, delay]);

  // Simular atualização de social proof
  useEffect(() => {
    const interval = setInterval(() => {
      setSocialProof(prev => ({
        ...prev,
        customers: prev.customers + Math.floor(Math.random() * 3),
        responseTime: `${Math.floor(Math.random() * 3) + 1} min`
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCTAClick = (action: string, label: string) => {
    trackEvent("cta_click", action, label);
  };

  const getThemeStyles = () => {
    switch (theme) {
      case "success":
        return {
          bg: "from-green-600 to-emerald-600",
          hover: "hover:from-green-700 hover:to-emerald-700",
          accent: "text-green-400",
          border: "border-green-500/20"
        };
      case "warning":
        return {
          bg: "from-orange-600 to-red-600",
          hover: "hover:from-orange-700 hover:to-red-700",
          accent: "text-orange-400",
          border: "border-orange-500/20"
        };
      case "info":
        return {
          bg: "from-blue-600 to-cyan-600",
          hover: "hover:from-blue-700 hover:to-cyan-700",
          accent: "text-blue-400",
          border: "border-blue-500/20"
        };
      default:
        return {
          bg: "from-brand-gold-500 to-brand-gold-600",
          hover: "hover:from-brand-gold-600 hover:to-brand-gold-700",
          accent: "text-brand-gold-400",
          border: "border-brand-gold-500/20"
        };
    }
  };

  const getUrgencyText = () => {
    switch (urgency) {
      case "high":
        return {
          text: "🔥 Oferta por tempo limitado!",
          icon: Zap,
          color: "text-red-400"
        };
      case "medium":
        return {
          text: "⚡ Resposta em até 2 minutos",
          icon: Clock,
          color: "text-yellow-400"
        };
      default:
        return {
          text: "✨ Solução personalizada",
          icon: Star,
          color: "text-brand-gold-400"
        };
    }
  };

  const urgencyInfo = getUrgencyText();
  const themeStyles = getThemeStyles();

  if (variant === "hero") {
    return (
      <div className={`relative ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {/* Urgency Banner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`flex items-center gap-2 mb-6 ${urgencyInfo.color}`}
          >
            <urgencyInfo.icon className="w-5 h-5" />
            <span className="font-semibold">{urgencyInfo.text}</span>
          </motion.div>

          {/* Main CTA */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Transforme sua empresa com nossa
                <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
                  {" "}tecnologia avançada
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Soluções personalizadas em TI que impulsionam resultados. 
                Mais de {socialProof.customers.toLocaleString()} empresas já confiam em nós.
              </p>

              {showSocialProof && (
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-white font-semibold">{socialProof.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{socialProof.customers.toLocaleString()}+ clientes</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>Resposta em {socialProof.responseTime}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <motion.button
                onClick={() => handleCTAClick("primary", "hero_whatsapp")}
                className={`w-full bg-gradient-to-r ${themeStyles.bg} ${themeStyles.hover} text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Falar com Especialista
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => handleCTAClick("secondary", "hero_phone")}
                className="w-full bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Ligar Agora
              </motion.button>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Ou envie um e-mail:{" "}
                  <a 
                    href="mailto:contato@starksolutions.com.br"
                    className="text-brand-gold-400 hover:text-brand-gold-300 transition-colors"
                    onClick={() => handleCTAClick("email", "hero_email")}
                  >
                    contato@starksolutions.com.br
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 pt-6 border-t border-white/10"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Certificado ISO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Garantia LGPD</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>ROI Comprovado</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (variant === "floating") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className={`fixed right-6 bottom-6 z-50 ${className}`}
      >
        <motion.button
          onClick={() => handleCTAClick("floating", "whatsapp")}
          className={`bg-gradient-to-r ${themeStyles.bg} ${themeStyles.hover} text-white px-6 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: [
              "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
            ]
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span>Precisa de Ajuda?</span>
          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        </motion.button>
      </motion.div>
    );
  }

  if (variant === "popup") {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsVisible(false)} />
            <motion.div
              className="relative bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Precisa de Suporte Técnico?
                </h3>
                <p className="text-gray-300">
                  Nossa equipe está pronta para ajudar você agora mesmo!
                </p>
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={() => handleCTAClick("popup_whatsapp", "whatsapp")}
                  className={`w-full bg-gradient-to-r ${themeStyles.bg} text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 group`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat WhatsApp
                </motion.button>

                <motion.button
                  onClick={() => handleCTAClick("popup_phone", "phone")}
                  className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  Ligar Agora
                </motion.button>
              </div>

              {showSocialProof && (
                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                  <p className="text-gray-400 text-sm">
                    ⭐ {socialProof.rating}/5 • {socialProof.customers.toLocaleString()}+ clientes satisfeitos
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r ${themeStyles.bg} ${themeStyles.hover} text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className={`flex items-center gap-2 mb-2 ${urgencyInfo.color}`}>
            <urgencyInfo.icon className="w-4 h-4" />
            <span className="text-sm font-semibold">{urgencyInfo.text}</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Precisa de Suporte Técnico?</h3>
          <p className="text-white/90">Nossa equipe especializada está pronta para ajudar!</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            onClick={() => handleCTAClick("inline_whatsapp", "whatsapp")}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={() => handleCTAClick("inline_phone", "phone")}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Phone className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Componente para CTAs contextuais baseados na página
export function ContextualCTA({ page }: { page: string }) {
  const ctaConfigs = {
    "suporte-tecnico": {
      title: "Problema com seu computador?",
      subtitle: "Suporte técnico especializado em até 2 minutos",
      urgency: "high" as const,
      theme: "warning" as const
    },
    "consultoria-tecnologica": {
      title: "Quer modernizar sua empresa?",
      subtitle: "Consultoria estratégica personalizada",
      urgency: "medium" as const,
      theme: "info" as const
    },
    "cyberseguranca": {
      title: "Sua empresa está protegida?",
      subtitle: "Auditoria de segurança gratuita",
      urgency: "high" as const,
      theme: "warning" as const
    },
    "create-site": {
      title: "Precisa de um site profissional?",
      subtitle: "Desenvolvimento personalizado com garantia",
      urgency: "medium" as const,
      theme: "success" as const
    }
  };

  const config = ctaConfigs[page as keyof typeof ctaConfigs] || ctaConfigs["suporte-tecnico"];

  return (
    <StrategicCTA
      variant="inline"
      urgency={config.urgency}
      theme={config.theme}
      showSocialProof={true}
    />
  );
}
