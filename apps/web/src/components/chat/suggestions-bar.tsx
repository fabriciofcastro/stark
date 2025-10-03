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
        "flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg",
        className
      )}
    >
      {suggestions.map((suggestion) => (
        <motion.button
          key={suggestion.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSuggestionClick(suggestion)}
          className={cn(
            "px-3 py-2 text-sm font-medium rounded-full",
            "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300",
            "border border-gray-200 dark:border-gray-600",
            "hover:bg-primary-50 dark:hover:bg-primary-900/20",
            "hover:border-primary-300 dark:hover:border-primary-600",
            "hover:text-primary-700 dark:hover:text-primary-300",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          )}
        >
          {suggestion.text}
        </motion.button>
      ))}
    </motion.div>
  );
};
