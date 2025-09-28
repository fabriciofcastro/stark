"use client";

import { motion } from "framer-motion";

interface ProgressIndicatorProps {
	currentStep: number;
	totalSteps: number;
	steps: string[];
	className?: string;
}

export default function ProgressIndicator({
	currentStep,
	totalSteps,
	steps,
	className = "",
}: ProgressIndicatorProps) {
	const progress = (currentStep / totalSteps) * 100;

	return (
		<div className={`w-full ${className}`}>
			{/* Progress Bar */}
			<div className="mb-4">
				<div className="flex justify-between text-xs text-gray-400 mb-2">
					<span>Progresso</span>
					<span>
						{currentStep} de {totalSteps}
					</span>
				</div>
				<div className="w-full bg-white/10 rounded-full h-2">
					<motion.div
						className="bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 h-2 rounded-full"
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 0.5, ease: "easeOut" }}
					/>
				</div>
			</div>

			{/* Steps */}
			<div className="flex justify-between">
				{steps.map((step, index) => {
					const stepNumber = index + 1;
					const isActive = stepNumber === currentStep;
					const isCompleted = stepNumber < currentStep;

					return (
						<div
							key={step}
							className="flex flex-col items-center flex-1 max-w-[120px]"
						>
							<motion.div
								className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold mb-2 ${
									isCompleted
										? "bg-brand-gold-500 text-white"
										: isActive
											? "bg-brand-gold-500/20 text-brand-gold-400 border-2 border-brand-gold-500"
											: "bg-white/10 text-gray-400"
								}`}
								animate={{
									scale: isActive ? 1.1 : 1,
								}}
								transition={{ duration: 0.2 }}
							>
								{isCompleted ? (
									<svg
										className="w-4 h-4"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								) : (
									stepNumber
								)}
							</motion.div>
							<span
								className={`text-xs text-center ${
									isActive
										? "text-brand-gold-400 font-medium"
										: isCompleted
											? "text-white"
											: "text-gray-400"
								}`}
								title={step}
							>
								{step}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
