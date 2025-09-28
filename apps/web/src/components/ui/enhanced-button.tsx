"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedBorder } from "./animated-border";
import { ReflectionEffect } from "./reflection-effect";

interface EnhancedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "success";
  size?: "sm" | "md" | "lg";
  effect?: "none" | "shimmer" | "glow" | "aurora" | "pulse" | "border-animated";
  className?: string;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const EnhancedButton = ({
  children,
  variant = "primary",
  size = "md",
  effect = "shimmer",
  className = "",
  onClick,
  onKeyDown,
  disabled = false,
  type = "button",
}: EnhancedButtonProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "lg":
        return "px-6 py-3 text-lg";
      default:
        return "px-4 py-2 text-base";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-secondary-500 text-black hover:bg-secondary-400 focus-visible:ring-secondary-500 focus-visible:ring-offset-neutral-900 shadow-soft";
      case "secondary":
        return "bg-white/10 text-white border border-white/20 hover:bg-white/20 focus-visible:ring-secondary-500 focus-visible:ring-offset-neutral-900";
      case "outline":
        return "border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500/10 focus-visible:ring-secondary-500 focus-visible:ring-offset-neutral-900";
      case "ghost":
        return "bg-transparent text-white/90 hover:bg-white/10 focus-visible:ring-white/50";
      case "destructive":
        return "bg-error-500 text-white hover:bg-error-500/90 focus-visible:ring-error-500 focus-visible:ring-offset-neutral-900 shadow-soft";
      case "success":
        return "bg-success-500 text-black hover:bg-success-600 focus-visible:ring-success-500 focus-visible:ring-offset-neutral-900 shadow-soft";
      default:
        return "bg-secondary-500 text-black hover:bg-secondary-400 focus-visible:ring-secondary-500 focus-visible:ring-offset-neutral-900 shadow-soft";
    }
  };

  const getEffectComponent = () => {
    if (effect === "none") {
      return (
        <motion.button
          type={type}
          onClick={onClick}
          onKeyDown={onKeyDown}
          disabled={disabled}
          className={`
            inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg
            ${getSizeClasses()}
            ${getVariantClasses()}
            ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
            ${className}
          `}
          whileHover={disabled ? {} : { scale: 1.05 }}
          whileTap={disabled ? {} : { scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {children}
        </motion.button>
      );
    }

    if (effect === "border-animated") {
      return (
        <AnimatedBorder variant="aurora" intensity="medium">
          <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
              inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg
              ${getSizeClasses()}
              ${getVariantClasses()}
              ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
              ${className}
            `}
            whileHover={disabled ? {} : { scale: 1.05 }}
            whileTap={disabled ? {} : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {children}
          </motion.button>
        </AnimatedBorder>
      );
    }

    return (
      <ReflectionEffect variant={effect as any} intensity="medium">
        <motion.button
          type={type}
          onClick={onClick}
          onKeyDown={onKeyDown}
          disabled={disabled}
          className={`
            inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg
            ${getSizeClasses()}
            ${getVariantClasses()}
            ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
            ${className}
          `}
          whileHover={disabled ? {} : { scale: 1.05 }}
          whileTap={disabled ? {} : { scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {children}
        </motion.button>
      </ReflectionEffect>
    );
  };

  return getEffectComponent();
};

export { EnhancedButton };
