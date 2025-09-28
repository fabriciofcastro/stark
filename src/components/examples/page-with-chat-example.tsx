"use client";

import { PageChat, FloatingChatButton } from "@/components/global";
import { useChat } from "@/hooks/use-chat";

// Exemplo de como usar o chat em uma página específica
export function PageWithChatExample() {
	const { handleContactFormSubmit, openWhatsApp } = useChat({
		pageName: "exemplo",
		customMessage:
			"Olá! Estou na página de exemplo e gostaria de saber mais sobre os serviços.",
	});

	return (
		<div>
			{/* Conteúdo da página */}
			<div className="min-h-screen bg-gray-50 py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							Exemplo de Página com Chat
						</h1>
						<p className="text-lg text-gray-600 mb-8">
							Esta página demonstra como usar o sistema de chat integrado.
						</p>
					</div>

					{/* Botões de exemplo */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
						<button
							onClick={() => openWhatsApp()}
							className="p-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
						>
							<h3 className="text-xl font-semibold mb-2">Abrir WhatsApp</h3>
							<p className="text-green-100">
								Clique para abrir o WhatsApp com mensagem personalizada
							</p>
						</button>

						<button
							onClick={() =>
								handleContactFormSubmit({
									name: "Usuário Exemplo",
									email: "exemplo@email.com",
									service: "Suporte Técnico",
									message: "Mensagem de exemplo",
								})
							}
							className="p-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						>
							<h3 className="text-xl font-semibold mb-2">Enviar Dados</h3>
							<p className="text-blue-100">
								Clique para enviar dados de exemplo para a API
							</p>
						</button>
					</div>
				</div>
			</div>

			{/* Chat específico da página */}
			<PageChat
				pageName="exemplo"
				customMessage="Olá! Estou na página de exemplo e gostaria de saber mais sobre os serviços da STARK."
				onContactFormSubmit={handleContactFormSubmit}
			/>

			{/* Botão flutuante personalizado */}
			<FloatingChatButton
				pageName="exemplo"
				customMessage="Olá! Estou na página de exemplo e preciso de ajuda."
				position="left"
				showOnScroll={true}
				scrollThreshold={100}
			/>
		</div>
	);
}
