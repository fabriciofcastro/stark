"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedBorder } from "./animated-border";
import { ReflectionEffect } from "./reflection-effect";
import { AnimatedIcon } from "./animated-icon";

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
						"relative group bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10",
					title:
						"text-xl font-bold text-white mb-2 group-hover:text-secondary-400 transition-colors duration-300",
					subtitle: "text-sm text-neutral-400 mb-4 font-medium",
					description: "text-neutral-300 leading-relaxed mb-6",
					icon: "w-12 h-12 text-secondary-400 mb-4 group-hover:text-secondary-300 transition-colors duration-300",
					badge:
						"absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full",
					features: "space-y-2 mb-6",
					feature: "text-sm text-neutral-400 flex items-center",
					featureIcon: "w-2 h-2 bg-secondary-500 rounded-full mr-3",
					link: "inline-flex items-center justify-center text-secondary-400 hover:text-secondary-300 font-medium transition-colors duration-300 group-hover:translate-x-1 mt-4",
				};
			case "minimal":
				return {
					container:
						"relative group bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all duration-300 hover:bg-neutral-900/40",
					title:
						"text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300",
					subtitle: "text-xs text-neutral-500 mb-3 font-medium",
					description: "text-neutral-400 text-sm leading-relaxed mb-4",
					icon: "w-8 h-8 text-primary-400 mb-3 group-hover:text-primary-300 transition-colors duration-300",
					badge:
						"absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full",
					features: "space-y-1 mb-4",
					feature: "text-xs text-neutral-500 flex items-center",
					featureIcon: "w-1.5 h-1.5 bg-primary-500 rounded-full mr-2",
					link: "inline-flex items-center text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors duration-300",
				};
			default:
				return {
					container:
						"relative group bg-gradient-to-br from-neutral-900/40 to-neutral-800/20 backdrop-blur-sm border border-white/8 rounded-xl p-6 hover:border-white/15 transition-all duration-400 hover:shadow-xl hover:shadow-primary-500/5",
					title:
						"text-lg font-bold text-white mb-2 group-hover:text-accent-400 transition-colors duration-300",
					subtitle: "text-sm text-neutral-400 mb-3 font-medium",
					description: "text-neutral-300 text-sm leading-relaxed mb-4",
					icon: "w-10 h-10 text-accent-400 mb-3 group-hover:text-accent-300 transition-colors duration-300",
					badge:
						"absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full",
					features: "space-y-1.5 mb-4",
					feature: "text-sm text-neutral-400 flex items-center",
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
					{features.map((feature, index) => (
						<li key={index} className={styles.feature}>
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
			whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
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
