"use client";

import { motion } from "framer-motion";
import { AnimatedBackground } from "./animated-background";
import { getTheme, generateThemeClasses } from "@/lib/theme-system";

interface ThemedSectionProps {
  themeName: string;
  children: React.ReactNode;
  variant?: "hero" | "section" | "page";
  intensity?: "low" | "medium" | "high";
  className?: string;
  showBackground?: boolean;
  showOverlay?: boolean;
}

export function ThemedSection({
  themeName,
  children,
  variant = "section",
  intensity = "medium",
  className = "",
  showBackground = true,
  showOverlay = true,
}: ThemedSectionProps) {
  const theme = getTheme(themeName);

  // Configurações de animação baseadas na variante
  const getAnimationConfig = () => {
    switch (variant) {
      case "hero":
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: "easeOut" },
        };
      case "section":
        return {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: "easeOut" },
        };
      case "page":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4, ease: "easeOut" },
        };
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: "easeOut" },
        };
    }
  };

  const animationConfig = getAnimationConfig();

  return (
    <motion.section
      className={`relative ${className}`}
      initial={animationConfig.initial}
      animate={animationConfig.animate}
      transition={animationConfig.transition}
    >
      {/* Background Animado */}
      {showBackground && (
        <AnimatedBackground
          theme={theme}
          variant={variant}
          intensity={intensity}
        />
      )}

      {/* Conteúdo */}
      <div className="relative z-10">{children}</div>

      {/* Overlay adicional se necessário */}
      {showOverlay && variant === "hero" && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      )}
    </motion.section>
  );
}

interface ThemedContainerProps {
  themeName: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
}

export function ThemedContainer({
  themeName,
  children,
  className = "",
  maxWidth = "7xl",
}: ThemedContainerProps) {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "7xl":
        return "max-w-7xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-7xl";
    }
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${getMaxWidthClass()} ${className}`}
    >
      {children}
    </div>
  );
}

interface ThemedTitleProps {
  themeName: string;
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  animated?: boolean;
}

export function ThemedTitle({
  themeName,
  children,
  level = 2,
  className = "",
  animated = true,
}: ThemedTitleProps) {
  const theme = getTheme(themeName);
  const themeClasses = generateThemeClasses(theme);

  const getTitleClasses = () => {
    const baseClasses = "font-bold tracking-tight leading-tight";
    const sizeClasses = {
      1: "text-4xl md:text-5xl lg:text-6xl",
      2: "text-3xl md:text-4xl lg:text-5xl",
      3: "text-2xl md:text-3xl lg:text-4xl",
      4: "text-xl md:text-2xl lg:text-3xl",
      5: "text-lg md:text-xl lg:text-2xl",
      6: "text-base md:text-lg lg:text-xl",
    };

    return `${baseClasses} ${sizeClasses[level]} ${themeClasses.text} ${className}`;
  };

  const TitleComponent = `h${level}` as keyof React.JSX.IntrinsicElements;

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <TitleComponent className={getTitleClasses()}>
          {children}
        </TitleComponent>
      </motion.div>
    );
  }

  return (
    <TitleComponent className={getTitleClasses()}>{children}</TitleComponent>
  );
}

interface ThemedButtonProps {
  themeName: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  animated?: boolean;
}

export function ThemedButton({
  themeName,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  animated = true,
}: ThemedButtonProps) {
  const theme = getTheme(themeName);
  const themeClasses = generateThemeClasses(theme);

  const getButtonClasses = () => {
    const baseClasses =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300";

    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const variantClasses = {
      primary: `${themeClasses.accent} text-white shadow-lg hover:shadow-xl`,
      secondary:
        "bg-white/10 text-white border border-white/20 hover:bg-white/20",
      outline:
        "bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50",
      ghost: "bg-transparent text-white hover:bg-white/10",
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  const buttonElement = (
    <motion.button
      className={getButtonClasses()}
      onClick={onClick}
      whileHover={animated ? { scale: 1.05 } : {}}
      whileTap={animated ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonElement}
      </a>
    );
  }

  return buttonElement;
}

export default ThemedSection;
