"use client";

import { motion } from "framer-motion";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Youtube,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Users,
  Heart,
  Star
} from "lucide-react";
import { trackEvent } from "@/lib/analytics-unified";

interface SocialFollowButtonsProps {
  variant?: "floating" | "inline" | "compact" | "footer";
  className?: string;
  showStats?: boolean;
}

export function SocialFollowButtons({
  variant = "inline",
  className = "",
  showStats = true
}: SocialFollowButtonsProps) {
  
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/starksolutions",
      color: "hover:text-blue-500",
      bgColor: "hover:bg-blue-500/10",
      followers: "2.5K",
      engagement: "4.2%"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/stark-solutions",
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-600/10",
      followers: "1.8K",
      engagement: "6.8%"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/starksolutions",
      color: "hover:text-pink-500",
      bgColor: "hover:bg-pink-500/10",
      followers: "1.2K",
      engagement: "8.1%"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/starksolutions",
      color: "hover:text-sky-400",
      bgColor: "hover:bg-sky-500/10",
      followers: "890",
      engagement: "5.5%"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@starksolutions",
      color: "hover:text-red-500",
      bgColor: "hover:bg-red-500/10",
      followers: "650",
      engagement: "12.3%"
    }
  ];

  const contactLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/5511999999999",
      color: "hover:text-green-500",
      bgColor: "hover:bg-green-500/10",
      label: "Chat"
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:contato@starksolutions.com.br",
      color: "hover:text-yellow-500",
      bgColor: "hover:bg-yellow-500/10",
      label: "E-mail"
    },
    {
      name: "Telefone",
      icon: Phone,
      url: "tel:+5511999999999",
      color: "hover:text-blue-500",
      bgColor: "hover:bg-blue-500/10",
      label: "Ligar"
    },
    {
      name: "Localização",
      icon: MapPin,
      url: "https://maps.google.com/?q=Itaquaquecetuba,SP",
      color: "hover:text-red-500",
      bgColor: "hover:bg-red-500/10",
      label: "Mapa"
    }
  ];

  const handleSocialClick = (social: any, type: "social" | "contact") => {
    trackEvent("social_follow", type, social.name);
    window.open(social.url, "_blank", "noopener,noreferrer");
  };

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {socialLinks.slice(0, 4).map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick(social, "social")}
            className={`p-2 rounded-lg transition-all duration-300 ${social.bgColor} ${social.color} border border-white/10 hover:border-white/20 group`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </motion.a>
        ))}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Redes Sociais */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-brand-gold-400 flex items-center gap-2">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            Siga-nos
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick(social, "social")}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl transition-all duration-300 ${social.bgColor} ${social.color} border border-white/10 hover:border-white/20 group`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <social.icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <div className="text-xs sm:text-sm font-medium">{social.name}</div>
                  {showStats && (
                    <div className="text-xs opacity-70">
                      {social.followers} seguidores
                    </div>
                  )}
                </div>
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-brand-gold-400 flex items-center gap-2">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            Entre em Contato
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
            {contactLinks.map((contact, index) => (
              <motion.a
                key={contact.name}
                href={contact.url}
                target={contact.name === "Email" || contact.name === "Telefone" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                onClick={() => handleSocialClick(contact, "contact")}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl transition-all duration-300 ${contact.bgColor} ${contact.color} border border-white/10 hover:border-white/20 group`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + socialLinks.length) * 0.1 }}
              >
                <contact.icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <div className="text-xs sm:text-sm font-medium">{contact.label}</div>
                  <div className="text-xs opacity-70">{contact.name}</div>
                </div>
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Redes Sociais */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-white flex items-center gap-2">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold-400" />
          Siga-nos nas Redes Sociais
        </h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick(social, "social")}
              className={`flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 ${social.bgColor} ${social.color} border border-white/10 hover:border-white/20 group cursor-pointer`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-2 sm:p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                <social.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm sm:text-base">{social.name}</div>
                {showStats && (
                  <div className="text-xs sm:text-sm opacity-70 flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
                    <span>{social.followers} seguidores</span>
                    <span className="text-brand-gold-400 hidden xs:inline">•</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {social.engagement}
                    </span>
                  </div>
                )}
              </div>
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Contato Rápido */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-white flex items-center gap-2">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold-400" />
          Entre em Contato
        </h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {contactLinks.map((contact, index) => (
            <motion.a
              key={contact.name}
              href={contact.url}
              target={contact.name === "Email" || contact.name === "Telefone" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              onClick={() => handleSocialClick(contact, "contact")}
              className={`flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 ${contact.bgColor} ${contact.color} border border-white/10 hover:border-white/20 group cursor-pointer`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + socialLinks.length) * 0.1 }}
            >
              <div className="p-2 sm:p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                <contact.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm sm:text-base">{contact.label}</div>
                <div className="text-xs sm:text-sm opacity-70">{contact.name}</div>
              </div>
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente para seguir flutuante
export function FloatingSocialFollow() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-40"
    >
      <div className="bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl">
        <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-brand-gold-400">Siga-nos</h4>
        <div className="flex flex-col gap-2">
          {[
            { name: "Facebook", icon: Facebook, url: "https://facebook.com/starktecnologia", color: "hover:text-blue-500" },
            { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/company/stark-gestao-tecnologia", color: "hover:text-blue-600" },
            { name: "Instagram", icon: Instagram, url: "https://instagram.com/starktecnologia", color: "hover:text-pink-500" },
            { name: "YouTube", icon: Youtube, url: "https://youtube.com/@starktecnologia", color: "hover:text-red-500" }
          ].map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${social.color} hover:bg-white/10 border border-white/10 hover:border-white/20 group`}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <social.icon className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
