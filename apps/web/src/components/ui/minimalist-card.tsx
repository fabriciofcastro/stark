"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface MinimalistCardProps {
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  features?: string[];
  link?: string;
  variant?: "default" | "featured" | "minimal";
  className?: string;
}

const MinimalistCard = ({
  title,
  subtitle,
  description,
  icon,
  badge,
  badgeColor = "bg-secondary-500",
  features = [],
  link,
  variant = "default",
  className = "",
}: MinimalistCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "featured":
        return {
          container:
            "relative group bg-gradient-to-br from-primary-950/30 to-accent-950/20 backdrop-blur-sm border border-primary-500/20 rounded-xl p-6 hover:border-primary-400/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/20 hover:-translate-y-1",
          title:
            "text-xl font-bold text-white mb-2 group-hover:text-secondary-400 transition-colors duration-300",
          subtitle: "text-sm text-secondary-400 mb-3 font-medium",
          description: "text-neutral-200 leading-relaxed mb-4",
          icon: "w-10 h-10 text-secondary-400 mb-3 group-hover:text-secondary-300 transition-colors duration-300",
          badge:
            "absolute top-3 right-3 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-secondary-500/20 text-secondary-300 border border-secondary-500/30",
          features: "space-y-1.5 mb-4",
          feature: "text-sm text-neutral-300 flex items-center",
          featureIcon: "w-1.5 h-1.5 bg-secondary-500 rounded-full mr-2",
          link: "inline-flex items-center justify-center text-secondary-400 hover:text-secondary-300 font-medium transition-colors duration-300 group-hover:translate-x-0.5 mt-3",
        };
      case "minimal":
        return {
          container:
            "relative group bg-gradient-to-br from-primary-950/20 to-accent-950/10 backdrop-blur-sm border border-primary-500/10 rounded-lg p-5 hover:border-primary-400/20 transition-all duration-300 hover:bg-primary-950/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10",
          title:
            "text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300",
          subtitle: "text-xs text-secondary-400 mb-2.5 font-medium",
          description: "text-neutral-200 text-sm leading-relaxed mb-3",
          icon: "w-8 h-8 text-primary-400 mb-2.5 group-hover:text-primary-300 transition-colors duration-300",
          badge:
            "absolute top-2.5 right-2.5 px-2 py-0.5 text-xs font-medium rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30",
          features: "space-y-1 mb-3",
          feature: "text-xs text-neutral-300 flex items-center",
          featureIcon: "w-1.5 h-1.5 bg-primary-500 rounded-full mr-2",
          link: "inline-flex items-center text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors duration-300",
        };
      default:
        return {
          container:
            "relative group bg-gradient-to-br from-accent-950/20 to-primary-950/10 backdrop-blur-sm border border-accent-500/15 rounded-lg p-5 hover:border-accent-400/25 transition-all duration-400 hover:shadow-lg hover:shadow-accent-500/15 hover:-translate-y-1",
          title:
            "text-lg font-bold text-white mb-2 group-hover:text-accent-400 transition-colors duration-300",
          subtitle: "text-sm text-secondary-400 mb-3 font-medium",
          description: "text-neutral-200 text-sm leading-relaxed mb-3",
          icon: "w-8 h-8 text-accent-400 mb-2.5 group-hover:text-accent-300 transition-colors duration-300",
          badge:
            "absolute top-2.5 right-2.5 px-2 py-0.5 text-xs font-semibold rounded-full bg-accent-500/20 text-accent-300 border border-accent-500/30",
          features: "space-y-1 mb-3",
          feature: "text-sm text-neutral-300 flex items-center",
          featureIcon: "w-1.5 h-1.5 bg-accent-500 rounded-full mr-2",
          link: "inline-flex items-center text-accent-400 hover:text-accent-300 text-sm font-medium transition-colors duration-300 group-hover:translate-x-0.5",
        };
    }
  };

  const styles = getVariantStyles();

  const CardContent = () => (
    <>
      {/* Badge */}
      {badge && <div className={`${styles.badge} ${badgeColor}`}>{badge}</div>}

      {/* Icon */}
      {icon && <div className={styles.icon}>{icon}</div>}

      {/* Title */}
      <h3 className={styles.title}>{title}</h3>

      {/* Subtitle */}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      {/* Description */}
      <p className={styles.description}>{description}</p>

      {/* Features */}
      {features.length > 0 && (
        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature} className={styles.feature}>
              <div className={styles.featureIcon} />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Link */}
      {link && (
        <div className={styles.link}>
          Saiba mais
          <svg
            className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </>
  );

  return (
    <motion.div
      className={`${styles.container} ${className}`}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {link ? (
        <Link href={link} className="block cursor-pointer">
          <CardContent />
        </Link>
      ) : (
        <CardContent />
      )}
    </motion.div>
  );
};

export { MinimalistCard };
