"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionBackgroundProps {
	variant?:
		| "hero"
		| "services"
		| "expertise"
		| "trust"
		| "cases"
		| "governance"
		| "about";
	className?: string;
	children: React.ReactNode;
}

const SectionBackground = ({
	variant = "hero",
	className = "",
	children,
}: SectionBackgroundProps) => {
	const getBackgroundConfig = () => {
		switch (variant) {
			case "hero":
				return {
					gradient: "from-primary-900 via-neutral-950 to-accent-900",
					shapes: [
						{
							type: "circle",
							size: "w-96 h-96",
							position: "top-1/4 left-1/4",
							color: "secondary-500/10",
						},
						{
							type: "circle",
							size: "w-80 h-80",
							position: "bottom-1/4 right-1/4",
							color: "accent-500/10",
						},
						{
							type: "blob",
							size: "w-64 h-64",
							position: "top-1/2 right-1/3",
							color: "primary-500/5",
						},
					],
					pattern: "grid",
				};

			case "services":
				return {
					gradient: "from-transparent via-primary-800/20 to-transparent",
					shapes: [
						{
							type: "circle",
							size: "w-72 h-72",
							position: "top-1/3 left-1/6",
							color: "secondary-400/8",
						},
						{
							type: "blob",
							size: "w-56 h-56",
							position: "bottom-1/3 right-1/6",
							color: "accent-400/8",
						},
					],
					pattern: "dots",
				};

			case "expertise":
				return {
					gradient: "from-primary-800/10 via-neutral-900/20 to-accent-800/10",
					shapes: [
						{
							type: "blob",
							size: "w-80 h-80",
							position: "top-1/2 left-1/4",
							color: "primary-500/6",
						},
						{
							type: "circle",
							size: "w-64 h-64",
							position: "bottom-1/4 right-1/4",
							color: "secondary-500/6",
						},
					],
					pattern: "hexagon",
				};

			case "trust":
				return {
					gradient: "from-accent-800/10 via-transparent to-primary-800/10",
					shapes: [
						{
							type: "circle",
							size: "w-96 h-96",
							position: "top-1/4 right-1/4",
							color: "accent-400/8",
						},
						{
							type: "blob",
							size: "w-72 h-72",
							position: "bottom-1/3 left-1/3",
							color: "primary-400/8",
						},
					],
					pattern: "lines",
				};

			case "cases":
				return {
					gradient: "from-transparent to-primary-800/15",
					shapes: [
						{
							type: "blob",
							size: "w-88 h-88",
							position: "top-1/2 left-1/2",
							color: "secondary-500/5",
						},
						{
							type: "circle",
							size: "w-56 h-56",
							position: "top-1/4 left-1/6",
							color: "accent-500/6",
						},
						{
							type: "circle",
							size: "w-40 h-40",
							position: "bottom-1/4 right-1/6",
							color: "primary-500/6",
						},
					],
					pattern: "grid",
				};

			case "governance":
				return {
					gradient: "from-primary-800/15 via-accent-800/10 to-transparent",
					shapes: [
						{
							type: "blob",
							size: "w-72 h-72",
							position: "top-1/3 right-1/3",
							color: "accent-400/7",
						},
						{
							type: "circle",
							size: "w-64 h-64",
							position: "bottom-1/3 left-1/3",
							color: "secondary-400/7",
						},
					],
					pattern: "dots",
				};

			case "about":
				return {
					gradient: "from-accent-800/20 via-primary-800/10 to-neutral-900/20",
					shapes: [
						{
							type: "circle",
							size: "w-96 h-96",
							position: "top-1/4 left-1/4",
							color: "secondary-500/8",
						},
						{
							type: "blob",
							size: "w-80 h-80",
							position: "bottom-1/4 right-1/4",
							color: "primary-500/8",
						},
						{
							type: "circle",
							size: "w-48 h-48",
							position: "top-1/2 right-1/6",
							color: "accent-500/6",
						},
					],
					pattern: "hexagon",
				};

			default:
				return {
					gradient: "from-transparent to-primary-800/10",
					shapes: [],
					pattern: "none",
				};
		}
	};

	const config = getBackgroundConfig();

	return (
		<div className={`relative overflow-hidden ${className}`}>
			{/* Background Gradient */}
			<div
				className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
			/>

			{/* Animated Shapes */}
			<div className="absolute inset-0 pointer-events-none">
				{config.shapes.map((shape, index) => (
					<motion.div
						key={index}
						className={`absolute ${shape.size} ${shape.position} bg-${shape.color} rounded-full blur-3xl`}
						animate={{
							scale: [1, 1.1, 1],
							opacity: [0.3, 0.6, 0.3],
						}}
						transition={{
							duration: 8 + index * 2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>

			{/* Pattern Overlay */}
			{config.pattern !== "none" && (
				<div className="absolute inset-0 opacity-5">
					{config.pattern === "grid" && (
						<div
							className="w-full h-full"
							style={{
								backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
								backgroundSize: "50px 50px",
							}}
						/>
					)}
					{config.pattern === "dots" && (
						<div
							className="w-full h-full"
							style={{
								backgroundImage:
									"radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
								backgroundSize: "30px 30px",
							}}
						/>
					)}
					{config.pattern === "hexagon" && (
						<div
							className="w-full h-full"
							style={{
								backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px)
                `,
								backgroundSize: "60px 60px",
							}}
						/>
					)}
					{config.pattern === "lines" && (
						<div
							className="w-full h-full"
							style={{
								backgroundImage:
									"linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
								backgroundSize: "40px 40px",
							}}
						/>
					)}
				</div>
			)}

			{/* Content */}
			<div className="relative z-10">{children}</div>
		</div>
	);
};

export { SectionBackground };
