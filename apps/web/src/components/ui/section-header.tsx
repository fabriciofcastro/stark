"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
	subtitle: string;
	title: string;
	description: string;
	icon?: ReactNode;
	variant?: "primary" | "secondary" | "accent" | "warning" | "neutral";
	alignment?: "left" | "center" | "right";
	showIcon?: boolean;
	className?: string;
}

const SectionHeader = ({
	subtitle,
	title,
	description,
	icon,
	variant = "primary",
	alignment = "center",
	showIcon = false,
	className = "",
}: SectionHeaderProps) => {
	const getVariantStyles = () => {
		switch (variant) {
			case "secondary":
				return {
					subtitle: "text-secondary-400",
					title: "title-gradient-secondary",
					icon: "icon-secondary icon-secondary-bg",
					shadow: "shadow-hover-secondary",
				};
			case "accent":
				return {
					subtitle: "text-accent-400",
					title: "title-gradient-primary",
					icon: "icon-accent icon-accent-bg",
					shadow: "shadow-hover-accent",
				};
			case "warning":
				return {
					subtitle: "text-warning-400",
					title: "title-gradient-primary",
					icon: "icon-warning icon-warning-bg",
					shadow: "shadow-hover-warning",
				};
			case "neutral":
				return {
					subtitle: "text-neutral-400",
					title: "title-primary",
					icon: "icon-neutral icon-neutral-bg",
					shadow: "shadow-hover-neutral",
				};
			default:
				return {
					subtitle: "text-primary-400",
					title: "title-gradient-primary",
					icon: "icon-primary icon-primary-bg",
					shadow: "shadow-hover-primary",
				};
		}
	};

	const getAlignmentStyles = () => {
		switch (alignment) {
			case "left":
				return {
					container: "text-left",
					description: "max-w-2xl",
				};
			case "right":
				return {
					container: "text-right",
					description: "max-w-2xl ml-auto",
				};
			default:
				return {
					container: "text-center",
					description: "max-w-3xl mx-auto",
				};
		}
	};

	const styles = getVariantStyles();
	const alignmentStyles = getAlignmentStyles();

	return (
		<motion.div
			className={`mb-12 ${alignmentStyles.container} ${className}`}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true, margin: "-100px" }}
		>
			{/* Subtitle */}
			<motion.div
				className="mb-4"
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				viewport={{ once: true }}
			>
				<div
					className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${styles.subtitle.replace("text-", "bg-").replace("-400", "-500")}/10 border-${styles.subtitle.replace("text-", "").replace("-400", "-500")}/20`}
				>
					{showIcon && icon && (
						<div className={`w-4 h-4 ${styles.icon}`}>{icon}</div>
					)}
					<span
						className={`text-sm font-semibold uppercase tracking-wider ${styles.subtitle}`}
					>
						{subtitle}
					</span>
				</div>
			</motion.div>

			{/* Title */}
			<motion.h2
				className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${styles.title}`}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				viewport={{ once: true }}
			>
				{title}
			</motion.h2>

			{/* Description */}
			<motion.p
				className={`text-lg md:text-xl text-neutral-300 leading-relaxed ${alignmentStyles.description}`}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				viewport={{ once: true }}
			>
				{description}
			</motion.p>

			{/* Decorative Line */}
			<motion.div
				className={`mt-8 h-1 w-24 rounded-full bg-gradient-to-r ${variant === "secondary" ? "from-secondary-500 to-primary-500" : variant === "accent" ? "from-accent-500 to-secondary-500" : "from-primary-500 to-accent-500"} ${alignment === "center" ? "mx-auto" : alignment === "right" ? "ml-auto" : ""}`}
				initial={{ opacity: 0, scaleX: 0 }}
				whileInView={{ opacity: 1, scaleX: 1 }}
				transition={{ duration: 0.8, delay: 0.4 }}
				viewport={{ once: true }}
				style={{
					transformOrigin:
						alignment === "right"
							? "right"
							: alignment === "left"
								? "left"
								: "center",
				}}
			/>
		</motion.div>
	);
};

export { SectionHeader };
