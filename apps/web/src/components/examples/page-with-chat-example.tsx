"use client";

import { ChatWidget } from "@/components/chat";

// Exemplo de como usar o chat em uma página específica
export function PageWithChatExample() {
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

					{/* Conteúdo de exemplo */}
					<div className="max-w-4xl mx-auto">
						<div className="bg-white rounded-lg shadow-md p-8">
							<h2 className="text-2xl font-semibold text-gray-900 mb-4">
								Sistema de Chat Integrado
							</h2>
							<p className="text-gray-600 mb-6">
								O chat está disponível no canto inferior direito da página. 
								Clique no ícone para iniciar uma conversa com nossa equipe.
							</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="text-center p-4 bg-blue-50 rounded-lg">
									<h3 className="font-semibold text-blue-900 mb-2">Suporte 24/7</h3>
									<p className="text-blue-700 text-sm">Atendimento sempre disponível</p>
								</div>
								<div className="text-center p-4 bg-green-50 rounded-lg">
									<h3 className="font-semibold text-green-900 mb-2">Resposta Rápida</h3>
									<p className="text-green-700 text-sm">Resposta em até 2 minutos</p>
								</div>
								<div className="text-center p-4 bg-purple-50 rounded-lg">
									<h3 className="font-semibold text-purple-900 mb-2">IA Avançada</h3>
									<p className="text-purple-700 text-sm">Tecnologia de ponta</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Chat Widget */}
			<ChatWidget />
		</div>
	);
}
