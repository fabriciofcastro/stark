"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedBorderProps {
  children: React.ReactNode;
  variant?: "aurora" | "gradient" | "pulse" | "shimmer" | "glow";
  className?: string;
  intensity?: "low" | "medium" | "high";
}

const AnimatedBorder = ({
  children,
  variant = "aurora",
  className = "",
  intensity = "medium",
}: AnimatedBorderProps) => {
  const getIntensityClasses = () => {
    switch (intensity) {
      case "low":
        return "opacity-30";
      case "high":
        return "opacity-80";
      default:
        return "opacity-50";
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "aurora":
        return {
          background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)",
          animation: "aurora-flow 3s ease infinite",
          size: "400% 400%",
        };
      case "gradient":
        return {
          background: "linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)",
          animation: "gradient-shift 2s ease infinite",
          size: "200% 200%",
        };
      case "pulse":
        return {
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          animation: "pulse-glow 2s ease-in-out infinite",
          size: "100% 100%",
        };
      case "shimmer":
        return {
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          animation: "shimmer-sweep 2s ease-in-out infinite",
          size: "200% 100%",
        };
      case "glow":
        return {
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          animation: "glow-pulse 2s ease-in-out infinite",
          size: "100% 100%",
        };
      default:
        return {
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          animation: "gradient-shift 2s ease infinite",
          size: "200% 200%",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`relative ${className}`}>
      {/* Animated Border */}
      <div
        className={`absolute inset-0 rounded-lg ${getIntensityClasses()}`}
        style={{
          background: styles.background,
          backgroundSize: styles.size,
          animation: styles.animation,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes aurora-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.5;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
        
        @keyframes shimmer-sweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
          }
          50% { 
            box-shadow: 0 0 40px rgba(102, 126, 234, 0.8);
          }
        }
      `}</style>
    </div>
  );
};

export { AnimatedBorder };
