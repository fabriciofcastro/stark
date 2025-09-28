"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useState } from "react";

interface EnhancedSectionProps {
	title: string;
	description?: string;
	icon: React.ReactNode;
	children: React.ReactNode;
	isOpen: boolean;
	onToggle: () => void;
	status?: "pending" | "in-progress" | "completed" | "error";
	progress?: number;
	estimatedTime?: string;
	className?: string;
}

export default function EnhancedSection({
	title,
	description,
	icon,
	children,
	isOpen,
	onToggle,
	status = "pending",
	progress = 0,
	estimatedTime,
	className = "",
}: EnhancedSectionProps) {
	const [isHovered, setIsHovered] = useState(false);

	const getStatusColor = () => {
		switch (status) {
			case "completed":
				return "text-green-400 border-green-400/30 bg-green-400/5";
			case "in-progress":
				return "text-brand-gold-400 border-brand-gold-400/30 bg-brand-gold-400/5";
			case "error":
				return "text-red-400 border-red-400/30 bg-red-400/5";
			default:
				return "text-gray-400 border-white/20 bg-white/5";
		}
	};

	const getStatusIcon = () => {
		switch (status) {
			case "completed":
				return <CheckCircle className="w-5 h-5 text-green-400" />;
			case "error":
				return <AlertCircle className="w-5 h-5 text-red-400" />;
			case "in-progress":
				return <Clock className="w-5 h-5 text-brand-gold-400" />;
			default:
				return icon;
		}
	};

	return (
		<motion.div
			className={`relative rounded-2xl border transition-all duration-300 ${getStatusColor()} ${className}`}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			whileHover={{ scale: 1.01 }}
		>
			{/* Background pattern */}
			<div className="absolute inset-0 rounded-2xl opacity-5">
				<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent rounded-full -mr-16 -mt-16" />
				<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white to-transparent rounded-full -ml-12 -mb-12" />
			</div>

			{/* Header */}
			<motion.button
				onClick={onToggle}
				className="relative w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 rounded-2xl"
				whileTap={{ scale: 0.98 }}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<motion.div
							className="flex-shrink-0"
							animate={{ rotate: isHovered ? 360 : 0 }}
							transition={{ duration: 0.5 }}
						>
							{getStatusIcon()}
						</motion.div>

						<div className="flex-1">
							<h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
							{description && (
								<p className="text-sm text-gray-400">{description}</p>
							)}

							{/* Progress bar */}
							{progress > 0 && (
								<div className="mt-2">
									<div className="flex items-center gap-2 mb-1">
										<div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
											<motion.div
												className="h-full bg-gradient-to-r from-brand-gold-500 to-brand-gold-400 rounded-full"
												initial={{ width: 0 }}
												animate={{ width: `${progress}%` }}
												transition={{ duration: 0.5 }}
											/>
										</div>
										<span className="text-xs text-gray-400">
											{Math.round(progress)}%
										</span>
									</div>
								</div>
							)}

							{/* Estimated time */}
							{estimatedTime && (
								<div className="flex items-center gap-1 mt-1">
									<Clock className="w-3 h-3 text-gray-500" />
									<span className="text-xs text-gray-500">
										Tempo estimado: {estimatedTime}
									</span>
								</div>
							)}
						</div>
					</div>

					<motion.div
						animate={{ rotate: isOpen ? 180 : 0 }}
						transition={{ duration: 0.3 }}
						className="flex-shrink-0 ml-4"
					>
						<ChevronDown className="w-5 h-5 text-gray-400" />
					</motion.div>
				</div>
			</motion.button>

			{/* Content */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						<div className="px-6 pb-6">
							<motion.div
								initial={{ y: -10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -10, opacity: 0 }}
								transition={{ duration: 0.2, delay: 0.1 }}
							>
								{children}
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Glow effect when active */}
			{isOpen && (
				<motion.div
					className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-gold-500/10 to-transparent opacity-50 pointer-events-none"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.5 }}
					exit={{ opacity: 0 }}
				/>
			)}
		</motion.div>
	);
}
