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
					container: "relative pt-32 pb-24",
					background:
						"bg-gradient-to-b from-transparent via-primary-800/20 to-transparent",
					overlay:
						"absolute inset-0 bg-gradient-to-r from-primary-900/15 via-transparent to-accent-900/15",
					shapes: [
						{
							type: "blob",
							size: "w-72 h-72",
							position: "top-1/3 left-1/6",
							color: "secondary-400/8",
							animation: "float",
						},
						{
							type: "circle",
							size: "w-56 h-56",
							position: "bottom-1/3 right-1/6",
							color: "accent-400/8",
							animation: "pulse",
						},
					],
					pattern: "dots",
					content: "relative z-10",
				};

			case "expertise":
				return {
					container: "relative py-24 border-y border-white/5",
					background:
						"bg-gradient-to-br from-primary-800/15 via-neutral-900/30 to-accent-800/15",
					overlay:
						"absolute inset-0 bg-gradient-to-l from-accent-900/8 to-primary-900/8",
					shapes: [
						{
							type: "blob",
							size: "w-80 h-80",
							position: "top-1/2 left-1/4",
							color: "primary-500/6",
							animation: "float-reverse",
						},
						{
							type: "circle",
							size: "w-64 h-64",
							position: "bottom-1/4 right-1/4",
							color: "secondary-500/6",
							animation: "pulse",
						},
					],
					pattern: "hexagon",
					content: "relative z-10",
				};

			case "trust":
				return {
					container: "relative py-24",
					background:
						"bg-gradient-to-b from-primary-800/25 via-neutral-900/30 to-accent-800/25",
					overlay:
						"absolute inset-0 bg-gradient-to-t from-primary-900/15 to-accent-900/15",
					shapes: [
						{
							type: "circle",
							size: "w-96 h-96",
							position: "top-1/4 right-1/4",
							color: "accent-400/8",
							animation: "float",
						},
						{
							type: "blob",
							size: "w-72 h-72",
							position: "bottom-1/3 left-1/3",
							color: "primary-400/8",
							animation: "pulse",
						},
					],
					pattern: "lines",
					content: "relative z-10",
				};

			case "cases":
				return {
					container: "relative py-24 border-y border-white/5",
					background:
						"bg-gradient-to-b from-primary-800/20 via-neutral-900/25 to-accent-800/20",
					overlay:
						"absolute inset-0 bg-gradient-to-br from-accent-900/12 via-transparent to-primary-900/12",
					shapes: [
						{
							type: "blob",
							size: "w-88 h-88",
							position: "top-1/2 left-1/2",
							color: "secondary-500/5",
							animation: "float",
						},
						{
							type: "circle",
							size: "w-56 h-56",
							position: "top-1/4 left-1/6",
							color: "accent-500/6",
							animation: "pulse",
						},
						{
							type: "circle",
							size: "w-40 h-40",
							position: "bottom-1/4 right-1/6",
							color: "primary-500/6",
							animation: "float-reverse",
						},
					],
					pattern: "grid",
					content: "relative z-10",
				};

			case "governance":
				return {
					container: "relative py-24",
					background:
						"bg-gradient-to-br from-primary-800/25 via-neutral-900/30 to-accent-800/25",
					overlay:
						"absolute inset-0 bg-gradient-to-l from-primary-900/15 to-accent-900/15",
					shapes: [
						{
							type: "blob",
							size: "w-72 h-72",
							position: "top-1/3 right-1/3",
							color: "accent-400/7",
							animation: "float-reverse",
						},
						{
							type: "circle",
							size: "w-64 h-64",
							position: "bottom-1/3 left-1/3",
							color: "secondary-400/7",
							animation: "pulse",
						},
					],
					pattern: "dots",
					content: "relative z-10",
				};

			case "about":
				return {
					container: "relative py-24 border-y border-white/5",
					background:
						"bg-gradient-to-br from-primary-800/20 via-neutral-900/30 to-accent-800/20",
					overlay:
						"absolute inset-0 bg-gradient-to-t from-neutral-950/15 to-transparent",
					shapes: [
						{
							type: "circle",
							size: "w-96 h-96",
							position: "top-1/4 left-1/4",
							color: "secondary-500/6",
							animation: "float",
						},
						{
							type: "blob",
							size: "w-80 h-80",
							position: "bottom-1/4 right-1/4",
							color: "primary-500/6",
							animation: "pulse",
						},
						{
							type: "circle",
							size: "w-48 h-48",
							position: "top-1/2 right-1/6",
							color: "accent-500/4",
							animation: "float-reverse",
						},
					],
					pattern: "hexagon",
					content: "relative z-10",
				};

			default:
				return {
					container: "relative py-24",
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
		<div className={`${styles.container} ${className}`}>
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
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export { SectionWrapper };
