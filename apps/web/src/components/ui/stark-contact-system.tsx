"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Bot,
  Sparkles,
  Zap,
  Heart,
  ChevronUp,
  ChevronDown,
  Plus,
  X,
  Settings,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface StarkContactSystemProps {
  chatwootToken: string;
  whatsappNumber: string;
  onContactFormSubmit?: (data: Record<string, unknown>) => void;
}

const StarkContactSystem: React.FC<StarkContactSystemProps> = ({
  chatwootToken,
  whatsappNumber,
  onContactFormSubmit
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Detectar scroll para mostrar/esconder botões
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Handlers
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de saber mais sobre os serviços da STARK. Pode me ajudar?";
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePhoneClick = () => {
    window.open(`tel:${whatsappNumber}`, "_self");
  };

  const handleEmailClick = () => {
    const subject = "Interesse nos serviços STARK";
    const body = "Olá,\n\nGostaria de saber mais sobre os serviços da STARK.\n\nAtenciosamente,";
    const mailtoUrl = `mailto:contato@stark.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, "_self");
  };

  const handleCalendarClick = () => {
    window.open("https://calendly.com/stark-tecnologia", "_blank");
  };

  return (
    <>
      {/* Sistema de contato inteligente */}
      <div className="fixed right-6 z-50 flex flex-col items-end space-y-4">
        
        {/* Chat Principal - Lado Direito */}
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            y: isScrolling ? -10 : 0
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(true)}
          className="relative w-16 h-16 bg-gradient-to-br from-purple-600 via-cyan-500 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white backdrop-blur-sm border border-white/20"
          style={{
            boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <MessageCircle className="w-8 h-8" />
          
          {/* Indicador de status */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>

          {/* Efeito de brilho */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent"
          />

          {/* Partículas flutuantes no hover */}
          <AnimatePresence>
            {isChatOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -20 }}
                  exit={{ opacity: 0, scale: 0, y: -20 }}
                  transition={{ delay: 0.1 }}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -15 }}
                  exit={{ opacity: 0, scale: 0, y: -15 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-2 right-0"
                >
                  <Zap className="w-3 h-3 text-blue-400" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -10 }}
                  exit={{ opacity: 0, scale: 0, y: -10 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 left-0"
                >
                  <Heart className="w-3 h-3 text-pink-400" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.button>

        {/* WhatsApp - Lado Esquerdo */}
        <motion.button
          initial={{ scale: 0, rotate: 180, x: -100 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            x: 0,
            y: isScrolling ? -10 : 0
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsAppClick}
          className="fixed left-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center text-white backdrop-blur-sm border border-white/20 z-50"
          style={{
            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <Phone className="w-8 h-8" />
          
          {/* Indicador de status */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>

          {/* Efeito de ondas */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full border-2 border-green-400"
          />
        </motion.button>

        {/* Botão de ações rápidas */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ 
            scale: showQuickActions ? 1 : 0,
            y: isScrolling ? -10 : 0
          }}
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full shadow-xl flex items-center justify-center text-white backdrop-blur-sm border border-white/20"
        >
          <Plus className={`w-6 h-6 transition-transform ${showQuickActions ? 'rotate-45' : ''}`} />
        </motion.button>

        {/* Menu de ações rápidas */}
        <AnimatePresence>
          {showQuickActions && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-2 border border-white/20 shadow-2xl"
            >
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePhoneClick}
                  className="flex items-center space-x-3 w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-medium">Ligar</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEmailClick}
                  className="flex items-center space-x-3 w-full p-3 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">E-mail</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCalendarClick}
                  className="flex items-center space-x-3 w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">Agendar</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Barra inferior para mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary-900/95 via-neutral-950/98 to-accent-900/95 backdrop-blur-xl border-t border-white/10 p-4 z-40 md:hidden">
        <div className="flex justify-around">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Chat IA</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppClick}
            className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">WhatsApp</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePhoneClick}
            className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Ligar</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCalendarClick}
            className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs">Agendar</span>
          </motion.button>
        </div>
      </div>

      {/* Tooltips informativos */}
      <AnimatePresence>
        {isScrolling && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-white/20 z-40"
          >
            <div className="text-sm font-medium">
              💬 Precisa de ajuda? Estou aqui!
            </div>
            <div className="text-xs text-purple-100 mt-1">
              Clique para conversar
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StarkContactSystem;
