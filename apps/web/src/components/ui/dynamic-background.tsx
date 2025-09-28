"use client";

import React from "react";
import { motion } from "framer-motion";

interface DynamicBackgroundProps {
  children: React.ReactNode;
  variant?: "hero" | "services" | "expertise" | "trust" | "cases" | "governance" | "about";
  className?: string;
  intensity?: "low" | "medium" | "high";
  speed?: "slow" | "medium" | "fast";
}

const DynamicBackground = ({
  children,
  variant = "hero",
  className = "",
  intensity = "medium",
  speed = "medium",
}: DynamicBackgroundProps) => {
  const getIntensityClasses = () => {
    switch (intensity) {
      case "low":
        return "opacity-20";
      case "high":
        return "opacity-60";
      default:
        return "opacity-40";
    }
  };

  const getSpeedClasses = () => {
    switch (speed) {
      case "slow":
        return "duration-[30s]";
      case "fast":
        return "duration-[10s]";
      default:
        return "duration-[20s]";
    }
  };

  const getVariantConfig = () => {
    switch (variant) {
      case "hero":
        return {
          gradients: [
            "linear-gradient(135deg, hsl(210, 100%, 20%) 0%, hsl(0, 0%, 10%) 50%, hsl(45, 100%, 10%) 100%)",
            "linear-gradient(135deg, hsl(160, 100%, 20%) 0%, hsl(210, 100%, 10%) 50%, hsl(45, 100%, 20%) 100%)",
            "linear-gradient(135deg, hsl(45, 100%, 20%) 0%, hsl(160, 100%, 10%) 50%, hsl(210, 100%, 20%) 100%)",
          ],
          shapes: [
            { type: "circle", size: "w-96 h-96", position: "top-1/4 left-1/4", color: "secondary-500/10" },
            { type: "blob", size: "w-80 h-80", position: "bottom-1/4 right-1/4", color: "accent-500/10" },
            { type: "circle", size: "w-64 h-64", position: "top-1/2 right-1/3", color: "primary-500/5" },
          ],
        };
      case "services":
        return {
          gradients: [
            "linear-gradient(135deg, hsl(210, 100%, 15%) 0%, hsl(160, 100%, 10%) 50%, hsl(45, 100%, 15%) 100%)",
            "linear-gradient(135deg, hsl(160, 100%, 15%) 0%, hsl(45, 100%, 10%) 50%, hsl(210, 100%, 15%) 100%)",
            "linear-gradient(135deg, hsl(45, 100%, 15%) 0%, hsl(210, 100%, 10%) 50%, hsl(160, 100%, 15%) 100%)",
          ],
          shapes: [
            { type: "blob", size: "w-72 h-72", position: "top-1/3 left-1/6", color: "secondary-400/8" },
            { type: "circle", size: "w-56 h-56", position: "bottom-1/3 right-1/6", color: "accent-400/8" },
          ],
        };
      case "expertise":
        return {
          gradients: [
            "linear-gradient(135deg, hsl(210, 100%, 12%) 0%, hsl(0, 0%, 8%) 50%, hsl(160, 100%, 12%) 100%)",
            "linear-gradient(135deg, hsl(160, 100%, 12%) 0%, hsl(45, 100%, 8%) 50%, hsl(210, 100%, 12%) 100%)",
            "linear-gradient(135deg, hsl(45, 100%, 12%) 0%, hsl(210, 100%, 8%) 50%, hsl(160, 100%, 12%) 100%)",
          ],
          shapes: [
            { type: "blob", size: "w-80 h-80", position: "top-1/2 left-1/4", color: "primary-500/6" },
            { type: "circle", size: "w-64 h-64", position: "bottom-1/4 right-1/4", color: "secondary-500/6" },
          ],
        };
      case "trust":
        return {
          gradients: [
            "linear-gradient(135deg, hsl(160, 100%, 15%) 0%, hsl(210, 100%, 10%) 50%, hsl(45, 100%, 15%) 100%)",
            "linear-gradient(135deg, hsl(45, 100%, 15%) 0%, hsl(160, 100%, 10%) 50%, hsl(210, 100%, 15%) 100%)",
            "linear-gradient(135deg, hsl(210, 100%, 15%) 0%, hsl(45, 100%, 10%) 50%, hsl(160, 100%, 15%) 100%)",
          ],
          shapes: [
            { type: "circle", size: "w-96 h-96", position: "top-1/4 right-1/4", color: "accent-400/8" },
            { type: "blob", size: "w-72 h-72", position: "bottom-1/3 left-1/3", color: "primary-400/8" },
          ],
        };
      case "cases":
        return {
          gradients: [
            "linear-gradient(135deg, hsl(45, 100%, 18%) 0%, hsl(210, 100%, 12%) 50%, hsl(160, 100%, 18%) 100%)",
            "linear-gradient(135deg, hsl(210, 100%, 18%) 0%, hsl(160, 100%, 12%) 50%, hsl(45, 100%, 18%) 100%)",
            "linear-gradient(135deg, hsl(160, 100%, 18%) 0%, hsl(45, 100%, 12%) 50%, hsl(210, 100%, 18%) 100%)",
          ],
          shapes: [
            { type: "blob", size: "w-88 h-88", position: "top-1/2 left-1/2", color: "secondary-500/5" },
            { type: "circle", size: "w-56 h-56", position: "top-1/4 left-1/6", color: "accent-500/6" },
            { type: "circle", size: "w-40 h-40", position: "bottom-1/4 right-1/6", color: "primary-500/6" },
          ],
        };
      case "governance":
        return {
          gradients: [
            "linear-gradient(135deg, hsl(160, 100%, 18%) 0%, hsl(45, 100%, 12%) 50%, hsl(210, 100%, 18%) 100%)",
            "linear-gradient(135deg, hsl(210, 100%, 18%) 0%, hsl(160, 100%, 12%) 50%, hsl(45, 100%, 18%) 100%)",
            "linear-gradient(135deg, hsl(45, 100%, 18%) 0%, hsl(210, 100%, 12%) 50%, hsl(160, 100%, 18%) 100%)",
          ],
          shapes: [
            { type: "blob", size: "w-72 h-72", position: "top-1/3 right-1/3", color: "accent-400/7" },
            { type: "circle", size: "w-64 h-64", position: "bottom-1/3 left-1/3", color: "secondary-400/7" },
          ],
        };
      case "about":
        return {
          gradients: [
            "linear-gradient(135deg, hsl(45, 100%, 20%) 0%, hsl(160, 100%, 15%) 50%, hsl(210, 100%, 20%) 100%)",
            "linear-gradient(135deg, hsl(210, 100%, 20%) 0%, hsl(45, 100%, 15%) 50%, hsl(160, 100%, 20%) 100%)",
            "linear-gradient(135deg, hsl(160, 100%, 20%) 0%, hsl(210, 100%, 15%) 50%, hsl(45, 100%, 20%) 100%)",
          ],
          shapes: [
            { type: "circle", size: "w-96 h-96", position: "top-1/4 left-1/4", color: "secondary-500/8" },
            { type: "blob", size: "w-80 h-80", position: "bottom-1/4 right-1/4", color: "primary-500/8" },
            { type: "circle", size: "w-48 h-48", position: "top-1/2 right-1/6", color: "accent-500/6" },
          ],
        };
      default:
        return {
          gradients: [
            "linear-gradient(135deg, hsl(210, 100%, 15%) 0%, hsl(0, 0%, 10%) 50%, hsl(45, 100%, 15%) 100%)",
          ],
          shapes: [],
        };
    }
  };

  const config = getVariantConfig();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Dynamic Gradient Background */}
      <motion.div
        className={`absolute inset-0 ${getIntensityClasses()}`}
        animate={{
          background: config.gradients,
        }}
        transition={{
          duration: speed === "slow" ? 30 : speed === "fast" ? 10 : 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: config.gradients[0],
        }}
      />

      {/* Animated Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {config.shapes.map((shape, index) => (
          <motion.div
            key={index}
            className={`absolute ${shape.size} ${shape.position} bg-${shape.color} rounded-full blur-3xl`}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export { DynamicBackground };
