"use client";

import React from "react";
import { motion } from "framer-motion";
import { GeometricPattern } from "./geometric-pattern";
import { DynamicBackground } from "./dynamic-background";

interface SectionWrapperProps {
  variant:
    | "hero"
    | "services"
    | "expertise"
    | "trust"
    | "cases"
    | "governance"
    | "about";
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper = ({
  variant,
  children,
  className = "",
}: SectionWrapperProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "hero":
        return {
          container:
            "relative h-[calc(70vh-5rem)] sm:h-[calc(80vh-5rem)] md:h-[calc(85vh-5rem)] lg:h-[calc(90vh-5rem)] xl:h-[calc(95vh-5rem)] min-h-[420px] max-h-[820px]",
          background:
            "bg-gradient-to-br from-primary-900 via-neutral-950 to-accent-900",
          overlay: "absolute inset-0 bg-black/20",
          shapes: [
            {
              type: "circle",
              size: "w-96 h-96",
              position: "top-1/4 left-1/4",
              color: "secondary-500/10",
              animation: "float",
            },
            {
              type: "blob",
              size: "w-80 h-80",
              position: "bottom-1/4 right-1/4",
              color: "accent-500/10",
              animation: "pulse",
            },
            {
              type: "circle",
              size: "w-64 h-64",
              position: "top-1/2 right-1/3",
              color: "primary-500/5",
              animation: "float-reverse",
            },
          ],
          pattern: "grid",
          content: "relative z-10 text-center",
        };

      case "services":
        return {
          container: "relative",
          background:
            "bg-gradient-to-b from-transparent via-primary-800/10 to-transparent",
          overlay:
            "absolute inset-0 bg-gradient-to-r from-primary-900/10 via-transparent to-accent-900/10",
          shapes: [
            {
              type: "blob",
              size: "w-72 h-72",
              position: "top-1/3 left-1/6",
              color: "secondary-400/5",
              animation: "float",
            },
            {
              type: "circle",
              size: "w-56 h-56",
              position: "bottom-1/3 right-1/6",
              color: "accent-400/5",
              animation: "pulse",
            },
          ],
          pattern: "dots",
          content: "relative z-10",
        };

      case "expertise":
        return {
          container: "relative",
          background:
            "bg-gradient-to-br from-primary-800/10 via-neutral-900/20 to-accent-800/10",
          overlay:
            "absolute inset-0 bg-gradient-to-l from-accent-900/5 to-primary-900/5",
          shapes: [
            {
              type: "blob",
              size: "w-80 h-80",
              position: "top-1/2 left-1/4",
              color: "primary-500/4",
              animation: "float-reverse",
            },
            {
              type: "circle",
              size: "w-64 h-64",
              position: "bottom-1/4 right-1/4",
              color: "secondary-500/4",
              animation: "pulse",
            },
          ],
          pattern: "hexagon",
          content: "relative z-10",
        };

      case "trust":
        return {
          container: "relative",
          background:
            "bg-gradient-to-b from-primary-800/10 via-neutral-900/15 to-accent-800/10",
          overlay:
            "absolute inset-0 bg-gradient-to-t from-primary-900/5 to-accent-900/5",
          shapes: [
            {
              type: "circle",
              size: "w-80 h-80",
              position: "top-1/4 right-1/4",
              color: "accent-400/4",
              animation: "float",
            },
            {
              type: "blob",
              size: "w-64 h-64",
              position: "bottom-1/3 left-1/3",
              color: "primary-400/4",
              animation: "pulse",
            },
            {
              type: "circle",
              size: "w-48 h-48",
              position: "top-1/2 left-1/6",
              color: "secondary-400/3",
              animation: "float-reverse",
            },
          ],
          pattern: "dots",
          content: "relative z-10",
        };

      case "cases":
        return {
          container: "relative",
          background:
            "bg-gradient-to-b from-primary-800/10 via-neutral-900/15 to-accent-800/10",
          overlay:
            "absolute inset-0 bg-gradient-to-br from-accent-900/5 via-transparent to-primary-900/5",
          shapes: [
            {
              type: "blob",
              size: "w-72 h-72",
              position: "top-1/2 left-1/2",
              color: "secondary-500/3",
              animation: "float",
            },
            {
              type: "circle",
              size: "w-48 h-48",
              position: "top-1/4 left-1/6",
              color: "accent-500/4",
              animation: "pulse",
            },
            {
              type: "circle",
              size: "w-36 h-36",
              position: "bottom-1/4 right-1/6",
              color: "primary-500/4",
              animation: "float-reverse",
            },
          ],
          pattern: "hexagon",
          content: "relative z-10",
        };

      case "governance":
        return {
          container: "relative",
          background:
            "bg-gradient-to-br from-primary-800/10 via-neutral-900/15 to-accent-800/10",
          overlay:
            "absolute inset-0 bg-gradient-to-l from-primary-900/5 to-accent-900/5",
          shapes: [
            {
              type: "blob",
              size: "w-64 h-64",
              position: "top-1/3 right-1/3",
              color: "accent-400/4",
              animation: "float-reverse",
            },
            {
              type: "circle",
              size: "w-56 h-56",
              position: "bottom-1/3 left-1/3",
              color: "secondary-400/4",
              animation: "pulse",
            },
            {
              type: "circle",
              size: "w-40 h-40",
              position: "top-1/2 right-1/6",
              color: "primary-400/3",
              animation: "float",
            },
          ],
          pattern: "lines",
          content: "relative z-10",
        };

      case "about":
        return {
          container: "relative",
          background:
            "bg-gradient-to-br from-primary-800/10 via-neutral-900/20 to-accent-800/10",
          overlay:
            "absolute inset-0 bg-gradient-to-t from-neutral-950/10 to-transparent",
          shapes: [
            {
              type: "circle",
              size: "w-96 h-96",
              position: "top-1/4 left-1/4",
              color: "secondary-500/4",
              animation: "float",
            },
            {
              type: "blob",
              size: "w-80 h-80",
              position: "bottom-1/4 right-1/4",
              color: "primary-500/4",
              animation: "pulse",
            },
            {
              type: "circle",
              size: "w-48 h-48",
              position: "top-1/2 right-1/6",
              color: "accent-500/3",
              animation: "float-reverse",
            },
          ],
          pattern: "hexagon",
          content: "relative z-10",
        };

      default:
        return {
          container: "relative",
          background: "bg-gradient-to-b from-transparent to-primary-800/10",
          overlay: "absolute inset-0",
          shapes: [],
          pattern: "none",
          content: "relative z-10",
        };
    }
  };

  const styles = getVariantStyles();

  const getAnimationProps = (animation: string) => {
    switch (animation) {
      case "float":
        return {
          animate: {
            y: [-10, 10, -10],
            scale: [1, 1.05, 1],
          },
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "float-reverse":
        return {
          animate: {
            y: [10, -10, 10],
            scale: [1, 0.95, 1],
          },
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "pulse":
        return {
          animate: {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          },
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      default:
        return {};
    }
  };

  return (
    <div className={`${styles.container} ${className} overflow-hidden`}>
      {/* Background */}
      <div className={`absolute inset-0 ${styles.background}`} />

      {/* Overlay */}
      <div className={styles.overlay} />

      {/* Animated Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {styles.shapes.map((shape, index) => (
          <motion.div
            key={index}
            className={`absolute ${shape.size} ${shape.position} bg-${shape.color} rounded-full blur-3xl`}
            {...getAnimationProps(shape.animation)}
          />
        ))}
      </div>

      {/* Pattern Overlay */}
      {styles.pattern !== "none" && (
        <GeometricPattern
          variant={styles.pattern as any}
          opacity={0.05}
          color="rgba(255,255,255,0.05)"
          size={50}
          animated={true}
          speed="slow"
        />
      )}

      {/* Content */}
      <div className={`${styles.content} overflow-hidden w-full max-w-full`}>
        {children}
      </div>
    </div>
  );
};

export { SectionWrapper };
