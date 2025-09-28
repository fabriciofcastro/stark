"use client";

import React from "react";
import { motion } from "framer-motion";

interface MinimalistSectionProps {
	title?: string;
	subtitle?: string;
	description?: string;
	children: React.ReactNode;
	variant?: "centered" | "left" | "right";
	className?: string;
}

const MinimalistSection = ({
	title,
	subtitle,
	description,
	children,
	variant = "centered",
	className = "",
}: MinimalistSectionProps) => {
	const getVariantStyles = () => {
		switch (variant) {
			case "left":
				return {
					container: "text-left",
					title: "text-4xl md:text-5xl font-bold text-white mb-4",
					subtitle: "text-sm text-secondary-400 font-medium mb-2 uppercase tracking-wider",
					description: "text-lg text-neutral-300 leading-relaxed max-w-2xl",
				};
			case "right":
				return {
					container: "text-right",
					title: "text-4xl md:text-5xl font-bold text-white mb-4",
					subtitle: "text-sm text-secondary-400 font-medium mb-2 uppercase tracking-wider",
					description: "text-lg text-neutral-300 leading-relaxed max-w-2xl ml-auto",
				};
			default:
				return {
					container: "text-center",
					title: "text-4xl md:text-5xl font-bold text-white mb-4",
					subtitle: "text-sm text-secondary-400 font-medium mb-2 uppercase tracking-wider",
					description: "text-lg text-neutral-300 leading-relaxed max-w-3xl mx-auto",
				};
		}
	};

	const styles = getVariantStyles();

	return (
		<section className={`py-16 ${className}`}>
			<div className="container mx-auto px-4">
				<div className={styles.container}>
					{/* Subtitle */}
					{subtitle && (
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className={styles.subtitle}
						>
							{subtitle}
						</motion.p>
					)}

					{/* Title */}
					{title && (
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className={styles.title}
						>
							{title}
						</motion.h2>
					)}

					{/* Description */}
					{description && (
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className={styles.description}
						>
							{description}
						</motion.p>
					)}
				</div>

				{/* Content */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="mt-12"
				>
					{children}
				</motion.div>
			</div>
		</section>
	);
};

export { MinimalistSection };
