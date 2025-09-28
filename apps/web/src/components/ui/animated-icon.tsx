"use client";

import React from "react";
import { motion } from "framer-motion";
import { ReflectionEffect } from "./reflection-effect";

interface AnimatedIconProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  effect?: "none" | "shimmer" | "glow" | "aurora" | "wave" | "particle";
  color?: "primary" | "secondary" | "accent" | "white" | "neutral";
  className?: string;
  intensity?: "low" | "medium" | "high";
  hover?: boolean;
  delay?: number;
}

const AnimatedIcon = ({
  children,
  size = "md",
  effect = "shimmer",
  color = "white",
  className = "",
  intensity = "medium",
  hover = true,
  delay = 0,
}: AnimatedIconProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4";
      case "md":
        return "w-6 h-6";
      case "lg":
        return "w-8 h-8";
      case "xl":
        return "w-12 h-12";
      case "2xl":
        return "w-16 h-16";
      default:
        return "w-6 h-6";
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "text-primary-400";
      case "secondary":
        return "text-secondary-400";
      case "accent":
        return "text-accent-400";
      case "white":
        return "text-white";
      case "neutral":
        return "text-neutral-400";
      default:
        return "text-white";
    }
  };

  const getHoverClasses = () => {
    if (!hover) return "";
    return "group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300";
  };

  const IconWrapper = ({ children }: { children: React.ReactNode }) => {
    if (effect === "none") {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay }}
          className={`${getSizeClasses()} ${getColorClasses()} ${getHoverClasses()} ${className}`}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay }}
        className={`${getSizeClasses()} ${getColorClasses()} ${getHoverClasses()} ${className}`}
      >
        <ReflectionEffect variant={effect as any} intensity={intensity}>
          {children}
        </ReflectionEffect>
      </motion.div>
    );
  };

  return <IconWrapper>{children}</IconWrapper>;
};

export { AnimatedIcon };
