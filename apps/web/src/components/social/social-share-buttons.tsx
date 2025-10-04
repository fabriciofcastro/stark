"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Mail,
  Copy,
  Check,
  Zap,
  Sparkles
} from "lucide-react";
import { trackEvent } from "@/lib/analytics-unified";

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  className?: string;
  variant?: "floating" | "inline" | "compact";
  showCounts?: boolean;
}

export function SocialShareButtons({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "STARK Gestão em Tecnologia",
  description = "Empresa especializada em tecnologia da informação com foco em infraestrutura, segurança da informação, suporte e consultoria estratégica.",
  hashtags = ["tecnologia", "suporte", "TI", "consultoria"],
  className = "",
  variant = "floating",
  showCounts = false
}: SocialShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCounts, setShareCounts] = useState({
    facebook: 0,
    twitter: 0,
    linkedin: 0,
    whatsapp: 0
  });

  // Função para compartilhar no Facebook
  const shareFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
    trackEvent("social_share", "facebook", title);
  };

  // Função para compartilhar no Twitter
  const shareTwitter = () => {
    const text = `${title} - ${description}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags.join(",")}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
    trackEvent("social_share", "twitter", title);
  };

  // Função para compartilhar no LinkedIn
  const shareLinkedin = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
    trackEvent("social_share", "linkedin", title);
  };

  // Função para compartilhar no WhatsApp
  const shareWhatsApp = () => {
    const text = `${title}\n\n${description}\n\n${url}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, "_blank");
    trackEvent("social_share", "whatsapp", title);
  };

  // Função para compartilhar por email
  const shareEmail = () => {
    const subject = `Confira: ${title}`;
    const body = `${description}\n\n${url}`;
    const shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = shareUrl;
    trackEvent("social_share", "email", title);
  };

  // Função para copiar link
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent("social_share", "copy_link", title);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Erro ao copiar link:", error);
    }
  };

  // Simular contadores de compartilhamento (em produção, usar APIs reais)
  useEffect(() => {
    const fetchShareCounts = async () => {
      // Simular delay de API
      setTimeout(() => {
        setShareCounts({
          facebook: Math.floor(Math.random() * 50) + 10,
          twitter: Math.floor(Math.random() * 30) + 5,
          linkedin: Math.floor(Math.random() * 20) + 3,
          whatsapp: Math.floor(Math.random() * 100) + 20
        });
      }, 1000);
    };

    if (showCounts) {
      fetchShareCounts();
    }
  }, [showCounts, url]);

  const shareButtons = [
    {
      name: "Facebook",
      icon: Facebook,
      action: shareFacebook,
      color: "hover:text-blue-500",
      bgColor: "hover:bg-blue-500/10",
      count: shareCounts.facebook
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: shareTwitter,
      color: "hover:text-sky-400",
      bgColor: "hover:bg-sky-500/10",
      count: shareCounts.twitter
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: shareLinkedin,
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-600/10",
      count: shareCounts.linkedin
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      action: shareWhatsApp,
      color: "hover:text-green-500",
      bgColor: "hover:bg-green-500/10",
      count: shareCounts.whatsapp
    },
    {
      name: "Email",
      icon: Mail,
      action: shareEmail,
      color: "hover:text-red-500",
      bgColor: "hover:bg-red-500/10",
      count: 0
    },
    {
      name: "Copiar Link",
      icon: copied ? Check : Copy,
      action: copyLink,
      color: copied ? "text-green-500" : "hover:text-gray-400",
      bgColor: copied ? "bg-green-500/10" : "hover:bg-gray-500/10",
      count: 0
    }
  ];

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {shareButtons.slice(0, 4).map((button, index) => (
          <motion.button
            key={button.name}
            onClick={button.action}
            className={`p-2 rounded-lg transition-all duration-300 ${button.bgColor} ${button.color} border border-white/10 hover:border-white/20`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button.icon className="w-4 h-4" />
          </motion.button>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {shareButtons.map((button, index) => (
          <motion.button
            key={button.name}
            onClick={button.action}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${button.bgColor} ${button.color} border border-white/10 hover:border-white/20`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{button.name}</span>
            {showCounts && button.count > 0 && (
              <span className="text-xs opacity-70">({button.count})</span>
            )}
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Botão principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-black rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 className="w-5 h-5" />
        <span>Compartilhar</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Menu de compartilhamento */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-3 p-4 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 min-w-[280px]"
          >
            <div className="grid grid-cols-2 gap-3">
              {shareButtons.map((button, index) => (
                <motion.button
                  key={button.name}
                  onClick={() => {
                    button.action();
                    setIsOpen(false);
                  }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${button.bgColor} ${button.color} border border-white/10 hover:border-white/20 group`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-center">{button.name}</span>
                  {showCounts && button.count > 0 && (
                    <span className="text-xs opacity-70 bg-white/10 px-2 py-1 rounded-full">
                      {button.count}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Efeito visual */}
            <div className="absolute -top-2 left-6 w-4 h-4 bg-neutral-900/95 border-l border-t border-white/10 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para fechar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// Componente para botões flutuantes em páginas
export function FloatingSocialShare() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed right-6 bottom-6 z-50"
    >
      <SocialShareButtons variant="floating" />
    </motion.div>
  );
}
