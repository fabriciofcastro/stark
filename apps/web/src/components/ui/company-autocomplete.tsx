"use client";

import { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Search } from "lucide-react";

interface CompanySuggestion {
	name: string;
	domain?: string;
	industry?: string;
	size?: string;
}

interface CompanyAutocompleteProps {
	value: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
	error?: string;
	description?: string;
	required?: boolean;
	className?: string;
}

// Base de dados de empresas comuns (pode ser expandida)
const COMPANY_DATABASE: CompanySuggestion[] = [
	{
		name: "Microsoft",
		domain: "microsoft.com",
		industry: "Tecnologia",
		size: "Grande",
	},
	{
		name: "Google",
		domain: "google.com",
		industry: "Tecnologia",
		size: "Grande",
	},
	{
		name: "Amazon",
		domain: "amazon.com",
		industry: "E-commerce",
		size: "Grande",
	},
	{
		name: "Apple",
		domain: "apple.com",
		industry: "Tecnologia",
		size: "Grande",
	},
	{ name: "Meta", domain: "meta.com", industry: "Tecnologia", size: "Grande" },
	{
		name: "Netflix",
		domain: "netflix.com",
		industry: "Entretenimento",
		size: "Grande",
	},
	{
		name: "Spotify",
		domain: "spotify.com",
		industry: "Música",
		size: "Grande",
	},
	{ name: "Uber", domain: "uber.com", industry: "Transporte", size: "Grande" },
	{
		name: "Airbnb",
		domain: "airbnb.com",
		industry: "Hospedagem",
		size: "Grande",
	},
	{
		name: "Tesla",
		domain: "tesla.com",
		industry: "Automotivo",
		size: "Grande",
	},
	{
		name: "Shopify",
		domain: "shopify.com",
		industry: "E-commerce",
		size: "Média",
	},
	{
		name: "Slack",
		domain: "slack.com",
		industry: "Comunicação",
		size: "Média",
	},
	{ name: "Zoom", domain: "zoom.us", industry: "Comunicação", size: "Média" },
	{
		name: "Dropbox",
		domain: "dropbox.com",
		industry: "Armazenamento",
		size: "Média",
	},
	{
		name: "Salesforce",
		domain: "salesforce.com",
		industry: "CRM",
		size: "Grande",
	},
	{ name: "Adobe", domain: "adobe.com", industry: "Software", size: "Grande" },
	{
		name: "Oracle",
		domain: "oracle.com",
		industry: "Banco de Dados",
		size: "Grande",
	},
	{ name: "IBM", domain: "ibm.com", industry: "Tecnologia", size: "Grande" },
	{ name: "Intel", domain: "intel.com", industry: "Hardware", size: "Grande" },
	{
		name: "NVIDIA",
		domain: "nvidia.com",
		industry: "Hardware",
		size: "Grande",
	},
	// Empresas brasileiras
	{
		name: "Petrobras",
		domain: "petrobras.com.br",
		industry: "Energia",
		size: "Grande",
	},
	{ name: "Vale", domain: "vale.com", industry: "Mineração", size: "Grande" },
	{ name: "Itaú", domain: "itau.com.br", industry: "Bancário", size: "Grande" },
	{
		name: "Bradesco",
		domain: "bradesco.com.br",
		industry: "Bancário",
		size: "Grande",
	},
	{
		name: "Banco do Brasil",
		domain: "bb.com.br",
		industry: "Bancário",
		size: "Grande",
	},
	{
		name: "Magazine Luiza",
		domain: "magazineluiza.com.br",
		industry: "Varejo",
		size: "Grande",
	},
	{
		name: "Americanas",
		domain: "americanas.com.br",
		industry: "Varejo",
		size: "Grande",
	},
	{
		name: "Mercado Livre",
		domain: "mercadolivre.com.br",
		industry: "E-commerce",
		size: "Grande",
	},
	{ name: "Stone", domain: "stone.com.br", industry: "Fintech", size: "Média" },
	{
		name: "Nubank",
		domain: "nubank.com.br",
		industry: "Fintech",
		size: "Grande",
	},
	{
		name: "XP Investimentos",
		domain: "xp.com.br",
		industry: "Investimentos",
		size: "Grande",
	},
	{
		name: "Rede Globo",
		domain: "globo.com",
		industry: "Mídia",
		size: "Grande",
	},
	{
		name: "Grupo Pão de Açúcar",
		domain: "paodeacucar.com.br",
		industry: "Varejo",
		size: "Grande",
	},
	{
		name: "JBS",
		domain: "jbs.com.br",
		industry: "Alimentício",
		size: "Grande",
	},
	{
		name: "Ambev",
		domain: "ambev.com.br",
		industry: "Bebidas",
		size: "Grande",
	},
];

export default function CompanyAutocomplete({
	value,
	onChange,
	onBlur,
	error,
	description,
	required = false,
	className = "",
}: CompanyAutocompleteProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [suggestions, setSuggestions] = useState<CompanySuggestion[]>([]);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const inputId = useId();

	// Filtrar sugestões baseado no valor digitado
	useEffect(() => {
		if (value.length < 2) {
			setSuggestions([]);
			setIsOpen(false);
			return;
		}

		const filtered = COMPANY_DATABASE.filter(
			(company) =>
				company.name.toLowerCase().includes(value.toLowerCase()) ||
				company.domain?.toLowerCase().includes(value.toLowerCase()),
		).slice(0, 8); // Limitar a 8 sugestões

		setSuggestions(filtered);
		setIsOpen(filtered.length > 0);
		setHighlightedIndex(-1);
	}, [value]);

	// Fechar dropdown quando clicar fora
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node) &&
				listRef.current &&
				!listRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	const handleSuggestionClick = (suggestion: CompanySuggestion) => {
		onChange(suggestion.name);
		setIsOpen(false);
		setHighlightedIndex(-1);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!isOpen) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setHighlightedIndex((prev) =>
					prev < suggestions.length - 1 ? prev + 1 : prev,
				);
				break;
			case "ArrowUp":
				e.preventDefault();
				setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
				break;
			case "Enter":
				e.preventDefault();
				if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
					handleSuggestionClick(suggestions[highlightedIndex]);
				}
				break;
			case "Escape":
				setIsOpen(false);
				setHighlightedIndex(-1);
				break;
		}
	};

	const getIndustryColor = (industry?: string) => {
		const colors: Record<string, string> = {
			Tecnologia: "text-blue-400",
			"E-commerce": "text-green-400",
			Bancário: "text-yellow-400",
			Fintech: "text-purple-400",
			Varejo: "text-orange-400",
			Mídia: "text-pink-400",
			Energia: "text-red-400",
			Mineração: "text-gray-400",
		};
		return colors[industry || ""] || "text-gray-400";
	};

	return (
		<div className={`relative ${className}`}>
			<div className="relative">
				<input
					id={inputId}
					ref={inputRef}
					type="text"
					value={value}
					onChange={handleInputChange}
					onBlur={onBlur}
					onKeyDown={handleKeyDown}
					onFocus={() =>
						value.length >= 2 && suggestions.length > 0 && setIsOpen(true)
					}
					required={required}
					className={`w-full appearance-none rounded-lg border bg-white/10 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))] ${
						error ? "border-red-500 focus:ring-red-500" : "border-white/20"
					}`}
					placeholder="Digite o nome da empresa..."
					autoComplete="organization"
				/>
				<div className="absolute left-3 top-1/2 -translate-y-1/2">
					<Building2 className="w-4 h-4 text-gray-400" />
				</div>
				{value && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2">
						<Search className="w-4 h-4 text-gray-400" />
					</div>
				)}
			</div>

			{/* Label flutuante */}
			<label
				htmlFor={inputId}
				className="pointer-events-none absolute left-3 -top-2 bg-[hsl(var(--brand-green-800))] px-1 text-xs text-gray-200"
			>
				Empresa {required && <span className="text-red-400">*</span>}
			</label>

			{/* Sugestões */}
			<AnimatePresence>
				{isOpen && suggestions.length > 0 && (
					<motion.div
						ref={listRef}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="absolute z-50 mt-1 w-full rounded-lg border border-white/20 bg-[hsl(var(--brand-green-800))] shadow-xl backdrop-blur-md"
					>
						<div className="max-h-60 overflow-y-auto">
							{suggestions.map((suggestion, index) => (
								<motion.div
									key={suggestion.name}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.05 }}
									className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
										index === highlightedIndex
											? "bg-brand-gold-500/20 text-brand-gold-300"
											: "text-white hover:bg-white/10"
									}`}
									onClick={() => handleSuggestionClick(suggestion)}
								>
									<div className="flex-shrink-0">
										<Building2 className="w-4 h-4 text-brand-gold-400" />
									</div>
									<div className="flex-1 min-w-0">
										<div className="font-medium truncate">
											{suggestion.name}
										</div>
										{suggestion.domain && (
											<div className="text-xs text-gray-400 truncate">
												{suggestion.domain}
											</div>
										)}
									</div>
									<div className="flex items-center gap-2 text-xs">
										{suggestion.industry && (
											<span
												className={`px-2 py-1 rounded-full bg-white/10 ${getIndustryColor(suggestion.industry)}`}
											>
												{suggestion.industry}
											</span>
										)}
										{suggestion.size && (
											<span className="text-gray-400">{suggestion.size}</span>
										)}
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Mensagens de erro e descrição */}
			{error && <p className="mt-1 text-xs text-red-400">{error}</p>}
			{!error && description && (
				<p className="mt-1 text-xs text-gray-200">{description}</p>
			)}
		</div>
	);
}
