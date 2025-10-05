"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { User } from './types';

interface TypingIndicatorProps {
  users: User[];
  className?: string;
}

/**
 * TypingIndicator - Indicador de digitação animado
 */
export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  users,
  className,
}) => {
  if (users.length === 0) return null;

  const getTypingText = () => {
    if (users.length === 1) {
      return `${users[0].name} está digitando...`;
    } else if (users.length === 2) {
      return `${users[0].name} e ${users[1].name} estão digitando...`;
    } else {
      return `${users.length} pessoas estão digitando...`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={cn(
        "flex items-center space-x-3 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl rounded-2xl border border-white/10",
        className
      )}
    >
      {/* Dots animados modernos */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-cyan-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Texto */}
      <span className="text-sm text-cyan-400 font-medium">
        {getTypingText()}
      </span>
    </motion.div>
  );
};
