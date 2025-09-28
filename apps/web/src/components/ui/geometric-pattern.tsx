"use client";

import React from "react";
import { motion } from "framer-motion";

interface GeometricPatternProps {
  variant?: "grid" | "hexagon" | "triangle" | "wave" | "dot" | "line" | "circle" | "diamond";
  className?: string;
  opacity?: number;
  color?: string;
  size?: number;
  animated?: boolean;
  speed?: "slow" | "medium" | "fast";
}

const GeometricPattern = ({
  variant = "grid",
  className = "",
  opacity = 0.1,
  color = "rgba(255,255,255,0.1)",
  size = 50,
  animated = true,
  speed = "medium",
}: GeometricPatternProps) => {
  const getSpeedClasses = () => {
    switch (speed) {
      case "slow":
        return "duration-[20s]";
      case "fast":
        return "duration-[5s]";
      default:
        return "duration-[10s]";
    }
  };

  const getPatternStyle = () => {
    const baseStyle = {
      opacity,
      backgroundSize: `${size}px ${size}px`,
    };

    switch (variant) {
      case "grid":
        return {
          ...baseStyle,
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
        };
      case "hexagon":
        return {
          ...baseStyle,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, ${color} 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, ${color} 2px, transparent 2px)
          `,
        };
      case "triangle":
        return {
          ...baseStyle,
          backgroundImage: `
            linear-gradient(30deg, ${color} 1px, transparent 1px),
            linear-gradient(-30deg, ${color} 1px, transparent 1px)
          `,
        };
      case "wave":
        return {
          ...baseStyle,
          backgroundImage: `
            linear-gradient(45deg, ${color} 1px, transparent 1px)
          `,
        };
      case "dot":
        return {
          ...baseStyle,
          backgroundImage: `
            radial-gradient(circle, ${color} 1px, transparent 1px)
          `,
        };
      case "line":
        return {
          ...baseStyle,
          backgroundImage: `
            linear-gradient(45deg, ${color} 1px, transparent 1px)
          `,
        };
      case "circle":
        return {
          ...baseStyle,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${color} 2px, transparent 2px)
          `,
        };
      case "diamond":
        return {
          ...baseStyle,
          backgroundImage: `
            linear-gradient(45deg, ${color} 1px, transparent 1px),
            linear-gradient(-45deg, ${color} 1px, transparent 1px)
          `,
        };
      default:
        return {
          ...baseStyle,
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
        };
    }
  };

  const getAnimationStyle = () => {
    if (!animated) return {};

    switch (variant) {
      case "grid":
        return {
          animation: "grid-move 20s linear infinite",
        };
      case "hexagon":
        return {
          animation: "hexagon-rotate 30s linear infinite",
        };
      case "triangle":
        return {
          animation: "triangle-float 15s ease-in-out infinite",
        };
      case "wave":
        return {
          animation: "wave-flow 10s ease-in-out infinite",
        };
      case "dot":
        return {
          animation: "dot-pulse 8s ease-in-out infinite",
        };
      case "line":
        return {
          animation: "line-slide 12s linear infinite",
        };
      case "circle":
        return {
          animation: "circle-expand 18s ease-in-out infinite",
        };
      case "diamond":
        return {
          animation: "diamond-rotate 25s linear infinite",
        };
      default:
        return {};
    }
  };

  const patternStyle = getPatternStyle();
  const animationStyle = getAnimationStyle();

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <motion.div
        className={`w-full h-full ${animated ? getSpeedClasses() : ""}`}
        style={{
          ...patternStyle,
          ...animationStyle,
        }}
        animate={animated ? {
          backgroundPosition: ["0% 0%", "100% 100%"],
        } : {}}
        transition={animated ? {
          duration: speed === "slow" ? 20 : speed === "fast" ? 5 : 10,
          repeat: Infinity,
          ease: "linear",
        } : {}}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: ${size}px ${size}px; }
        }
        
        @keyframes hexagon-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes triangle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes wave-flow {
          0% { background-position: 0 0; }
          100% { background-position: ${size}px 0; }
        }
        
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
        
        @keyframes line-slide {
          0% { background-position: 0 0; }
          100% { background-position: ${size}px 0; }
        }
        
        @keyframes circle-expand {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes diamond-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export { GeometricPattern };
