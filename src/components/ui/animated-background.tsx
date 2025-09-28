"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedBackgroundProps {
	variant?: "contact" | "hero" | "section";
	className?: string;
}

export default function AnimatedBackground({
	variant = "section",
	className = "",
}: AnimatedBackgroundProps) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const getBackgroundElements = () => {
		switch (variant) {
			case "contact":
				return (
					<>
						{/* Gradient base */}
						<div className="absolute inset-0 bg-gradient-to-br from-brand-green-900/95 via-brand-green-800/90 to-brand-gold-900/85" />

						{/* Animated particles */}
						<div className="absolute inset-0 overflow-hidden">
							{[...Array(20)].map((_, i) => (
								<motion.div
									key={i}
									className="absolute w-2 h-2 bg-brand-gold-400/20 rounded-full"
									initial={{
										x: Math.random() * window.innerWidth,
										y: Math.random() * window.innerHeight,
									}}
									animate={{
										x: Math.random() * window.innerWidth,
										y: Math.random() * window.innerHeight,
									}}
									transition={{
										duration: Math.random() * 10 + 10,
										repeat: Infinity,
										repeatType: "reverse",
										ease: "linear",
									}}
								/>
							))}
						</div>

						{/* Interactive glow */}
						<motion.div
							className="absolute w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl"
							animate={{
								x: mousePosition.x * 4,
								y: mousePosition.y * 4,
							}}
							transition={{ type: "spring", damping: 30, stiffness: 200 }}
						/>

						{/* Geometric patterns */}
						<div className="absolute inset-0 opacity-5">
							<svg
								className="w-full h-full"
								viewBox="0 0 100 100"
								preserveAspectRatio="none"
							>
								<defs>
									<pattern
										id="grid"
										width="10"
										height="10"
										patternUnits="userSpaceOnUse"
									>
										<path
											d="M 10 0 L 0 0 0 10"
											fill="none"
											stroke="currentColor"
											strokeWidth="0.5"
										/>
									</pattern>
								</defs>
								<rect width="100" height="100" fill="url(#grid)" />
							</svg>
						</div>

						{/* Floating shapes */}
						<motion.div
							className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-gold-500/5 rounded-full blur-xl"
							animate={{
								scale: [1, 1.2, 1],
								rotate: [0, 180, 360],
							}}
							transition={{
								duration: 20,
								repeat: Infinity,
								ease: "linear",
							}}
						/>
						<motion.div
							className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-brand-green-500/5 rounded-full blur-xl"
							animate={{
								scale: [1.2, 1, 1.2],
								rotate: [360, 180, 0],
							}}
							transition={{
								duration: 15,
								repeat: Infinity,
								ease: "linear",
							}}
						/>
					</>
				);

			case "hero":
				return (
					<>
						{/* Dynamic gradient */}
						<motion.div
							className="absolute inset-0 bg-gradient-to-br from-brand-green-900 via-brand-green-800 to-brand-gold-900"
							animate={{
								background: [
									"linear-gradient(135deg, #0c1916 0%, #1a3d2e 50%, #2d1b0a 100%)",
									"linear-gradient(135deg, #1a3d2e 0%, #0c1916 50%, #3d2914 100%)",
									"linear-gradient(135deg, #0c1916 0%, #1a3d2e 50%, #2d1b0a 100%)",
								],
							}}
							transition={{ duration: 10, repeat: Infinity }}
						/>

						{/* Animated mesh */}
						<div className="absolute inset-0 opacity-10">
							<motion.div
								className="w-full h-full"
								style={{
									backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,215,0,0.3) 0%, transparent 50%)`,
								}}
							/>
						</div>
					</>
				);

			default:
				return (
					<>
						{/* Simple animated background */}
						<div className="absolute inset-0 bg-gradient-to-br from-brand-green-900/50 to-brand-gold-900/30" />

						<motion.div
							className="absolute inset-0 opacity-20"
							animate={{
								background: [
									"radial-gradient(circle at 20% 80%, rgba(255,215,0,0.1) 0%, transparent 50%)",
									"radial-gradient(circle at 80% 20%, rgba(255,215,0,0.1) 0%, transparent 50%)",
									"radial-gradient(circle at 40% 40%, rgba(255,215,0,0.1) 0%, transparent 50%)",
								],
							}}
							transition={{ duration: 8, repeat: Infinity }}
						/>
					</>
				);
		}
	};

	return (
		<div className={`absolute inset-0 overflow-hidden ${className}`}>
			{getBackgroundElements()}

			{/* Overlay for content readability */}
			<div className="absolute inset-0 bg-black/20" />
		</div>
	);
}
