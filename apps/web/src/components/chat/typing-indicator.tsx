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
        "flex items-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg",
        className
      )}
    >
      {/* Dots animados */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-gray-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Texto */}
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {getTypingText()}
      </span>
    </motion.div>
  );
};
