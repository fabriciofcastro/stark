"use client";

import { motion } from "framer-motion";
import { CheckCircle, Edit3, Copy } from "lucide-react";
import { useState } from "react";

interface DataPreviewProps {
	data: Record<string, string | string[] | number | boolean>;
	onEdit?: () => void;
	onCopy?: () => void;
	className?: string;
}

export default function DataPreview({
	data,
	onEdit,
	onCopy,
	className = "",
}: DataPreviewProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			const text = Object.entries(data)
				.filter(([_, value]) => value && value !== "")
				.map(([key, value]) => {
					const label = key
						.replace(/([A-Z])/g, " $1")
						.replace(/^./, (str) => str.toUpperCase());
					return `${label}: ${value}`;
				})
				.join("\n");

			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
			onCopy?.();
		} catch (error) {
			console.error("Failed to copy:", error);
		}
	};

	const formatValue = (
		key: string,
		value: string | string[] | number | boolean,
	) => {
		if (Array.isArray(value)) {
			return value.join(", ");
		}
		if (key === "phone" && value) {
			return value;
		}
		if (key === "cnpj" && value) {
			return value;
		}
		return value || "-";
	};

	const getLabel = (key: string) => {
		const labels: Record<string, string> = {
			name: "Nome",
			email: "E-mail",
			company: "Empresa",
			phone: "Telefone",
			cnpj: "CNPJ",
			role: "Cargo/Área",
			service: "Serviço",
			objective: "Objetivo",
			timeframe: "Prazo",
			budget: "Orçamento",
			companySize: "Tamanho da Empresa",
			source: "Como nos conheceu",
			preferred: "Canal Preferido",
			needs: "Necessidades",
			message: "Mensagem",
		};
		return labels[key] || key;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className={`bg-gradient-to-br from-brand-green-800/30 to-brand-green-900/30 border border-brand-gold-500/20 rounded-xl p-6 ${className}`}
		>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<CheckCircle className="w-5 h-5 text-brand-gold-400" />
					<h3 className="text-lg font-semibold text-white">Resumo dos Dados</h3>
				</div>
				<div className="flex items-center gap-2">
					{onEdit && (
						<button
							type="button"
							onClick={onEdit}
							className="flex items-center gap-1 px-3 py-1 text-xs text-brand-gold-400 hover:text-brand-gold-300 hover:bg-brand-gold-500/10 rounded-lg transition-colors"
						>
							<Edit3 className="w-3 h-3" />
							Editar
						</button>
					)}
					<button
						type="button"
						onClick={handleCopy}
						className="flex items-center gap-1 px-3 py-1 text-xs text-brand-cyan-400 hover:text-brand-cyan-300 hover:bg-brand-cyan-500/10 rounded-lg transition-colors"
					>
						<Copy className="w-3 h-3" />
						{copied ? "Copiado!" : "Copiar"}
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{Object.entries(data)
					.filter(([_, value]) => value && value !== "" && value !== null)
					.map(([key, value]) => (
						<div key={key} className="flex flex-col">
							<span className="text-xs text-gray-400 mb-1">
								{getLabel(key)}
							</span>
							<span className="text-sm text-white break-words">
								{formatValue(key, value)}
							</span>
						</div>
					))}
			</div>

			{data.message && (
				<div className="mt-4 pt-4 border-t border-white/10">
					<span className="text-xs text-gray-400 mb-2 block">Mensagem:</span>
					<p className="text-sm text-gray-200 whitespace-pre-wrap">
						{data.message}
					</p>
				</div>
			)}
		</motion.div>
	);
}
