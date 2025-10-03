"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Bot, Sparkles, Zap, Heart } from 'lucide-react';

interface PremiumChatButtonProps {
  onClick: () => void;
  isActive?: boolean;
  notificationCount?: number;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const PremiumChatButton: React.FC<PremiumChatButtonProps> = ({
  onClick,
  isActive = false,
  notificationCount = 0,
  position = 'bottom-right'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  // Posicionamento baseado na prop
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  // Efeito de pulso periódico
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 2000);
    }, 10000); // A cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className={`absolute ${
              position.includes('right') ? 'right-16' : 'left-16'
            } top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap`}
          >
            <div className="text-sm font-medium">
              💬 Fale com nossa IA
            </div>
            <div className="text-xs text-gray-300 mt-1">
              Resposta instantânea
            </div>
            {/* Seta */}
            <div className={`absolute top-1/2 transform -translate-y-1/2 ${
              position.includes('right') ? '-right-1' : '-left-1'
            } w-2 h-2 bg-gray-900 rotate-45`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão principal */}
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
            : 'bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500'
        }`}
        style={{
          boxShadow: isActive 
            ? '0 20px 40px rgba(34, 197, 94, 0.4)'
            : '0 20px 40px rgba(59, 130, 246, 0.4)'
        }}
      >
        {/* Efeito de pulso */}
        <AnimatePresence>
          {showPulse && (
            <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.4, opacity: 0 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 2, repeat: 1 }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"
            />
          )}
        </AnimatePresence>

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
          className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/20 to-transparent"
        />

        {/* Ícone principal */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div
                key="active"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Bot className="w-8 h-8 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="inactive"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Indicador de notificação */}
        {notificationCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <span className="text-white text-xs font-bold">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          </motion.div>
        )}

        {/* Indicador de status */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>

        {/* Partículas flutuantes */}
        <AnimatePresence>
          {isHovered && (
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

      {/* Efeito de ondas */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-blue-400"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumChatButton;
