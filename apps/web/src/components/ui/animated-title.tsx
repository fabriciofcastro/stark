"use client";

import React from "react";
import { motion } from "framer-motion";
import { ReflectionEffect } from "./reflection-effect";

interface AnimatedTitleProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  effect?: "none" | "shimmer" | "glow" | "aurora" | "wave" | "particle";
  className?: string;
  intensity?: "low" | "medium" | "high";
  delay?: number;
}

const AnimatedTitle = ({
  children,
  variant = "h2",
  effect = "shimmer",
  className = "",
  intensity = "medium",
  delay = 0,
}: AnimatedTitleProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "h1":
        return "text-5xl md:text-6xl lg:text-7xl font-bold";
      case "h2":
        return "text-4xl md:text-5xl lg:text-6xl font-bold";
      case "h3":
        return "text-3xl md:text-4xl lg:text-5xl font-semibold";
      case "h4":
        return "text-2xl md:text-3xl lg:text-4xl font-semibold";
      case "h5":
        return "text-xl md:text-2xl lg:text-3xl font-medium";
      case "h6":
        return "text-lg md:text-xl lg:text-2xl font-medium";
      default:
        return "text-4xl md:text-5xl lg:text-6xl font-bold";
    }
  };

  const getColorClasses = () => {
    return "text-white bg-gradient-to-r from-white via-neutral-100 to-white bg-clip-text text-transparent";
  };

  const getShadowClasses = () => {
    return "drop-shadow-lg";
  };

  const TitleComponent = variant;

  if (effect === "none") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className={className}
      >
        <TitleComponent
          className={`${getVariantClasses()} ${getColorClasses()} ${getShadowClasses()}`}
        >
          {children}
        </TitleComponent>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      <ReflectionEffect variant={effect as any} intensity={intensity}>
        <TitleComponent
          className={`${getVariantClasses()} ${getColorClasses()} ${getShadowClasses()}`}
        >
          {children}
        </TitleComponent>
      </ReflectionEffect>
    </motion.div>
  );
};

export { AnimatedTitle };
