"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
	title: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
	icon?: React.ReactNode;
	className?: string;
	onToggle?: (isOpen: boolean) => void;
}

export default function CollapsibleSection({
	title,
	children,
	defaultOpen = false,
	icon,
	className = "",
	onToggle,
}: CollapsibleSectionProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const handleToggle = () => {
		const newState = !isOpen;
		setIsOpen(newState);
		onToggle?.(newState);
	};

	return (
		<div
			className={`border border-white/20 rounded-lg bg-white/5 ${className}`}
		>
			<button
				type="button"
				onClick={handleToggle}
				className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 rounded-lg"
			>
				<div className="flex items-center gap-3">
					{icon && <span className="text-brand-gold-400">{icon}</span>}
					<h3 className="text-lg font-semibold text-white">{title}</h3>
				</div>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.2 }}
				>
					<ChevronDown className="w-5 h-5 text-gray-400" />
				</motion.div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						<div className="p-4 pt-0 border-t border-white/10">{children}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
