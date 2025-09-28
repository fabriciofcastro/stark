"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, Lightbulb } from "lucide-react";

interface ValidationRule {
	id: string;
	message: string;
	type: "error" | "warning" | "success" | "info";
	passed: boolean;
}

interface SmartValidationProps {
	fieldName: string;
	value: string;
	rules: ValidationRule[];
	suggestions?: string[];
	className?: string;
}

export default function SmartValidation({
	fieldName,
	value,
	rules,
	suggestions = [],
	className = "",
}: SmartValidationProps) {
	const hasErrors = rules.some((rule) => rule.type === "error" && !rule.passed);
	const hasWarnings = rules.some(
		(rule) => rule.type === "warning" && !rule.passed,
	);
	const allPassed = rules.every((rule) => rule.passed);

	if (!value && rules.length === 0) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: "auto" }}
				exit={{ opacity: 0, height: 0 }}
				className={`mt-2 ${className}`}
			>
				{/* Regras de validação */}
				<div className="space-y-1">
					{rules.map((rule) => (
						<motion.div
							key={rule.id}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							className={`flex items-center gap-2 text-xs ${
								rule.type === "error" && !rule.passed
									? "text-red-400"
									: rule.type === "warning" && !rule.passed
										? "text-yellow-400"
										: rule.type === "success" && rule.passed
											? "text-green-400"
											: "text-gray-400"
							}`}
						>
							{rule.type === "error" && !rule.passed && (
								<AlertCircle className="w-3 h-3 flex-shrink-0" />
							)}
							{rule.type === "warning" && !rule.passed && (
								<AlertCircle className="w-3 h-3 flex-shrink-0" />
							)}
							{rule.type === "success" && rule.passed && (
								<CheckCircle className="w-3 h-3 flex-shrink-0" />
							)}
							{rule.type === "info" && (
								<Info className="w-3 h-3 flex-shrink-0" />
							)}
							<span>{rule.message}</span>
						</motion.div>
					))}
				</div>

				{/* Sugestões inteligentes */}
				{suggestions.length > 0 && value && (
					<motion.div
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-3 p-3 bg-brand-gold-500/10 border border-brand-gold-500/20 rounded-lg"
					>
						<div className="flex items-center gap-2 mb-2">
							<Lightbulb className="w-4 h-4 text-brand-gold-400" />
							<span className="text-xs font-medium text-brand-gold-400">
								Sugestões para {fieldName}:
							</span>
						</div>
						<div className="space-y-1">
							{suggestions.map((suggestion, index) => (
								<div
									key={index}
									className="text-xs text-gray-300 cursor-pointer hover:text-white transition-colors"
									onClick={() => {
										// Aqui poderia implementar auto-preenchimento
										console.log(`Sugestão selecionada: ${suggestion}`);
									}}
								>
									• {suggestion}
								</div>
							))}
						</div>
					</motion.div>
				)}

				{/* Indicador de força/qualidade */}
				{value && (
					<motion.div
						initial={{ opacity: 0, scaleX: 0 }}
						animate={{ opacity: 1, scaleX: 1 }}
						className="mt-2"
					>
						<div className="flex items-center gap-2">
							<div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
								<motion.div
									className={`h-full rounded-full transition-all duration-300 ${
										allPassed
											? "bg-green-500"
											: hasErrors
												? "bg-red-500"
												: hasWarnings
													? "bg-yellow-500"
													: "bg-gray-500"
									}`}
									initial={{ width: 0 }}
									animate={{
										width: `${Math.max(20, (rules.filter((r) => r.passed).length / rules.length) * 100)}%`,
									}}
								/>
							</div>
							<span className="text-xs text-gray-400">
								{allPassed ? "Ótimo!" : hasErrors ? "Precisa melhorar" : "Bom"}
							</span>
						</div>
					</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
	);
}
