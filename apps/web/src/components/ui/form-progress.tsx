"use client";

import { motion } from "framer-motion";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

interface FormProgressProps {
	currentStep: number;
	totalSteps: number;
	steps: Array<{
		id: string;
		title: string;
		description: string;
		icon: React.ReactNode;
		completed: boolean;
		hasErrors: boolean;
	}>;
	className?: string;
}

export default function FormProgress({
	currentStep,
	totalSteps,
	steps,
	className = "",
}: FormProgressProps) {
	return (
		<div className={`w-full ${className}`}>
			{/* Barra de progresso principal */}
			<div className="mb-8">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold text-white">
						Progresso do Formulário
					</h3>
					<span className="text-sm text-brand-gold-400">
						{Math.round((currentStep / totalSteps) * 100)}% completo
					</span>
				</div>

				<div className="relative">
					<div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
						<motion.div
							className="h-full bg-gradient-to-r from-brand-gold-500 to-brand-gold-400 rounded-full"
							initial={{ width: 0 }}
							animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
							transition={{ duration: 0.5, ease: "easeOut" }}
						/>
					</div>

					{/* Indicadores de etapas */}
					<div className="flex justify-between mt-4">
						{steps.map((step, index) => (
							<motion.div
								key={step.id}
								className="flex flex-col items-center"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<div
									className={`
                  relative w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                  ${
										index < currentStep
											? "bg-brand-gold-500 text-black"
											: index === currentStep
												? "bg-brand-gold-500/20 text-brand-gold-400 ring-2 ring-brand-gold-500"
												: "bg-white/10 text-gray-400"
									}
                `}
								>
									{step.completed ? (
										<CheckCircle className="w-5 h-5" />
									) : step.hasErrors ? (
										<AlertCircle className="w-5 h-5 text-red-400" />
									) : (
										<span className="text-xs font-bold">{index + 1}</span>
									)}

									{index === currentStep && (
										<motion.div
											className="absolute inset-0 rounded-full border-2 border-brand-gold-500"
											animate={{ scale: [1, 1.2, 1] }}
											transition={{ duration: 2, repeat: Infinity }}
										/>
									)}
								</div>

								<div className="text-center max-w-20">
									<div
										className={`text-xs font-medium ${
											index <= currentStep ? "text-white" : "text-gray-400"
										}`}
									>
										{step.title}
									</div>
									<div className="text-xs text-gray-500 mt-1">
										{step.description}
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
