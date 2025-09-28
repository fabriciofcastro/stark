"use client";

import React from "react";
import { motion } from "framer-motion";

interface ReflectionEffectProps {
	children: React.ReactNode;
	variant?: "shimmer" | "glow" | "aurora" | "wave" | "particle";
	className?: string;
	intensity?: "low" | "medium" | "high";
	direction?:
		| "left-to-right"
		| "right-to-left"
		| "top-to-bottom"
		| "bottom-to-top";
}

const ReflectionEffect = ({
	children,
	variant = "shimmer",
	className = "",
	intensity = "medium",
	direction = "left-to-right",
}: ReflectionEffectProps) => {
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

	const getDirectionClasses = () => {
		switch (direction) {
			case "left-to-right":
				return "from-left-0 to-right-0";
			case "right-to-left":
				return "from-right-0 to-left-0";
			case "top-to-bottom":
				return "from-top-0 to-bottom-0";
			case "bottom-to-top":
				return "from-bottom-0 to-top-0";
			default:
				return "from-left-0 to-right-0";
		}
	};

	const getVariantStyles = () => {
		switch (variant) {
			case "shimmer":
				return {
					background:
						"linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
					animation: "shimmer-sweep 2s ease-in-out infinite",
					size: "200% 100%",
				};
			case "glow":
				return {
					background:
						"radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent)",
					animation: "glow-pulse 2s ease-in-out infinite",
					size: "100% 100%",
				};
			case "aurora":
				return {
					background:
						"linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)",
					animation: "aurora-flow 3s ease infinite",
					size: "400% 400%",
				};
			case "wave":
				return {
					background:
						"linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
					animation: "wave-flow 1.5s ease-in-out infinite",
					size: "300% 100%",
				};
			case "particle":
				return {
					background:
						"radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3), transparent 50%)",
					animation: "particle-float 3s ease-in-out infinite",
					size: "200% 200%",
				};
			default:
				return {
					background:
						"linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
					animation: "shimmer-sweep 2s ease-in-out infinite",
					size: "200% 100%",
				};
		}
	};

	const styles = getVariantStyles();

	return (
		<div className={`relative overflow-hidden ${className}`}>
			{/* Reflection Effect */}
			<motion.div
				className={`absolute inset-0 pointer-events-none ${getIntensityClasses()}`}
				style={{
					background: styles.background,
					backgroundSize: styles.size,
					animation: styles.animation,
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			/>

			{/* Content */}
			<div className="relative z-10">{children}</div>

			{/* CSS Animations */}
			<style jsx>{`
        @keyframes shimmer-sweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        
        @keyframes aurora-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes wave-flow {
          0% { background-position: -300% 0; }
          100% { background-position: 300% 0; }
        }
        
        @keyframes particle-float {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% { 
            transform: translate(20px, -10px) scale(1.1);
            opacity: 0.6;
          }
          50% { 
            transform: translate(-10px, -20px) scale(0.9);
            opacity: 0.4;
          }
          75% { 
            transform: translate(15px, 10px) scale(1.05);
            opacity: 0.5;
          }
        }
      `}</style>
		</div>
	);
};

export { ReflectionEffect };
