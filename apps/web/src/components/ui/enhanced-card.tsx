"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EnhancedCardProps {
	title?: string;
	subtitle?: string;
	description?: string;
	icon?: ReactNode;
	features?: string[];
	badge?: string;
	variant?:
		| "primary"
		| "secondary"
		| "accent"
		| "warning"
		| "neutral"
		| "success"
		| "error";
	size?: "sm" | "md" | "lg" | "xl";
	interactive?: boolean;
	className?: string;
	children?: ReactNode;
}

const EnhancedCard = ({
	title,
	subtitle,
	description,
	icon,
	features = [],
	badge,
	variant = "primary",
	size = "md",
	interactive = true,
	className = "",
	children,
}: EnhancedCardProps) => {
	const getVariantStyles = () => {
		switch (variant) {
			case "secondary":
				return {
					background: "gradient-card-secondary",
					border: "border-secondary-500/20",
					hoverBorder: "hover:border-secondary-500/40",
					icon: "icon-secondary icon-secondary-bg",
					title: "text-white",
					subtitle: "text-secondary-400",
					description: "text-neutral-300",
					badge:
						"bg-secondary-500/20 text-secondary-400 border-secondary-500/30",
					shadow: "shadow-hover-secondary",
				};
			case "accent":
				return {
					background: "gradient-card-accent",
					border: "border-accent-500/20",
					hoverBorder: "hover:border-accent-500/40",
					icon: "icon-accent icon-accent-bg",
					title: "text-white",
					subtitle: "text-accent-400",
					description: "text-neutral-300",
					badge: "bg-accent-500/20 text-accent-400 border-accent-500/30",
					shadow: "shadow-hover-accent",
				};
			case "warning":
				return {
					background: "gradient-card-primary",
					border: "border-warning-500/20",
					hoverBorder: "hover:border-warning-500/40",
					icon: "icon-warning icon-warning-bg",
					title: "text-white",
					subtitle: "text-warning-400",
					description: "text-neutral-300",
					badge: "bg-warning-500/20 text-warning-400 border-warning-500/30",
					shadow: "shadow-hover-warning",
				};
			case "success":
				return {
					background: "gradient-card-accent",
					border: "border-success-500/20",
					hoverBorder: "hover:border-success-500/40",
					icon: "icon-accent icon-accent-bg",
					title: "text-white",
					subtitle: "text-success-400",
					description: "text-neutral-300",
					badge: "bg-success-500/20 text-success-400 border-success-500/30",
					shadow: "shadow-hover-accent",
				};
			case "error":
				return {
					background: "gradient-card-primary",
					border: "border-error-500/20",
					hoverBorder: "hover:border-error-500/40",
					icon: "icon-error icon-error-bg",
					title: "text-white",
					subtitle: "text-error-400",
					description: "text-neutral-300",
					badge: "bg-error-500/20 text-error-400 border-error-500/30",
					shadow: "shadow-hover-primary",
				};
			case "neutral":
				return {
					background: "bg-neutral-900/50",
					border: "border-neutral-700/20",
					hoverBorder: "hover:border-neutral-600/40",
					icon: "icon-neutral icon-neutral-bg",
					title: "text-white",
					subtitle: "text-neutral-400",
					description: "text-neutral-300",
					badge: "bg-neutral-700/20 text-neutral-400 border-neutral-600/30",
					shadow: "shadow-hover-neutral",
				};
			default:
				return {
					background: "gradient-card-primary",
					border: "border-primary-500/20",
					hoverBorder: "hover:border-primary-500/40",
					icon: "icon-primary icon-primary-bg",
					title: "text-white",
					subtitle: "text-primary-400",
					description: "text-neutral-300",
					badge: "bg-primary-500/20 text-primary-400 border-primary-500/30",
					shadow: "shadow-hover-primary",
				};
		}
	};

	const getSizeStyles = () => {
		switch (size) {
			case "sm":
				return {
					padding: "p-4",
					iconSize: "w-8 h-8",
					titleSize: "text-lg",
					subtitleSize: "text-sm",
					descriptionSize: "text-sm",
				};
			case "lg":
				return {
					padding: "p-8",
					iconSize: "w-16 h-16",
					titleSize: "text-2xl",
					subtitleSize: "text-lg",
					descriptionSize: "text-base",
				};
			case "xl":
				return {
					padding: "p-10",
					iconSize: "w-20 h-20",
					titleSize: "text-3xl",
					subtitleSize: "text-xl",
					descriptionSize: "text-lg",
				};
			default:
				return {
					padding: "p-6",
					iconSize: "w-12 h-12",
					titleSize: "text-xl",
					subtitleSize: "text-base",
					descriptionSize: "text-sm",
				};
		}
	};

	const styles = getVariantStyles();
	const sizeStyles = getSizeStyles();

	const cardClasses = `
		relative overflow-hidden rounded-2xl backdrop-blur-sm border
		${styles.background}
		${styles.border}
		${interactive ? `${styles.hoverBorder} hover-card transition-all duration-300 cursor-pointer` : ""}
		${sizeStyles.padding}
		${className}
	`;

	return (
		<motion.div
			className={cardClasses}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true, margin: "-50px" }}
			whileHover={interactive ? { scale: 1.02 } : {}}
		>
			{/* Background Effects */}
			<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<div
					className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${variant === "secondary" ? "bg-secondary-500/10" : variant === "accent" ? "bg-accent-500/10" : variant === "warning" ? "bg-warning-500/10" : "bg-primary-500/10"}`}
				/>
				<div
					className={`absolute bottom-0 left-0 w-24 h-24 rounded-full blur-3xl ${variant === "secondary" ? "bg-primary-500/10" : variant === "accent" ? "bg-secondary-500/10" : variant === "warning" ? "bg-accent-500/10" : "bg-accent-500/10"}`}
				/>
			</div>

			<div className="relative z-10 h-full flex flex-col">
				{/* Icon */}
				{icon && (
					<motion.div
						className={`${sizeStyles.iconSize} rounded-xl flex items-center justify-center mb-4 ${styles.icon} group-hover:scale-110 transition-transform duration-300`}
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						{icon}
					</motion.div>
				)}

				{/* Badge */}
				{badge && (
					<motion.div
						className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border mb-4 w-fit ${styles.badge}`}
						initial={{ opacity: 0, x: -10 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{badge}
					</motion.div>
				)}

				{/* Content */}
				<div className="flex-1">
					{/* Subtitle */}
					{subtitle && (
						<motion.div
							className={`${sizeStyles.subtitleSize} font-medium mb-2 ${styles.subtitle}`}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							{subtitle}
						</motion.div>
					)}

					{/* Title */}
					{title && (
						<motion.h3
							className={`${sizeStyles.titleSize} font-bold mb-3 ${styles.title}`}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							{title}
						</motion.h3>
					)}

					{/* Description */}
					{description && (
						<motion.p
							className={`${sizeStyles.descriptionSize} leading-relaxed mb-4 ${styles.description}`}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							{description}
						</motion.p>
					)}

					{/* Features */}
					{features.length > 0 && (
						<motion.div
							className="space-y-2"
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
						>
							{features.map((feature, index) => (
								<div key={index} className="flex items-start space-x-2">
									<div
										className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${variant === "secondary" ? "bg-secondary-500" : variant === "accent" ? "bg-accent-500" : variant === "warning" ? "bg-warning-500" : "bg-primary-500"}`}
									/>
									<span className="text-sm text-neutral-300">{feature}</span>
								</div>
							))}
						</motion.div>
					)}

					{/* Children */}
					{children}
				</div>
			</div>
		</motion.div>
	);
};

export { EnhancedCard };
