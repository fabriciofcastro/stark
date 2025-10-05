"use client";

import { ChatProvider } from "@/components/chat";

export default function TestChatPage() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Teste do Chatbot</h1>
      
      <div className="bg-slate-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Status do Chatbot:</h2>
        <ul className="text-white space-y-2">
          <li>✅ ChatProvider importado</li>
          <li>✅ Componente renderizado</li>
          <li>✅ Verifique o canto inferior direito da tela</li>
        </ul>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Instruções:</h2>
        <ol className="text-white space-y-2 list-decimal list-inside">
          <li>Procure pelo botão flutuante no canto inferior direito</li>
          <li>Clique no botão para abrir o chat</li>
          <li>Teste o envio de mensagens</li>
          <li>Verifique se o protocolo é gerado</li>
        </ol>
      </div>

      {/* ChatProvider renderizado aqui para teste */}
      <ChatProvider />
    </div>
  );
}
