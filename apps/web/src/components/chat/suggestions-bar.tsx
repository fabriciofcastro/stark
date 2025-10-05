"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Suggestion } from './types';

interface SuggestionsBarProps {
  suggestions: Suggestion[];
  onSuggestionClick: (suggestion: Suggestion) => void;
  className?: string;
}

/**
 * SuggestionsBar - Barra de sugestões rápidas
 */
export const SuggestionsBar: React.FC<SuggestionsBarProps> = ({
  suggestions,
  onSuggestionClick,
  className,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={cn(
        "flex flex-wrap gap-2 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl rounded-2xl border border-white/10",
        className
      )}
    >
      {suggestions.map((suggestion) => (
        <motion.button
          key={suggestion.id}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSuggestionClick(suggestion)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-xl",
            "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white",
            "border border-cyan-400/30 hover:border-cyan-400/50",
            "hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-purple-500/30",
            "hover:shadow-lg hover:shadow-cyan-500/20",
            "transition-all duration-300",
            "focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          )}
        >
          {suggestion.text}
        </motion.button>
      ))}
    </motion.div>
  );
};
