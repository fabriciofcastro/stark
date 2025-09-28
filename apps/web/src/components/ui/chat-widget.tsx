// components/ui/chat-widget.jsx
"use client";

import { useState } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Obrigado por sua mensagem! Um de nossos especialistas entrará em contato em breve.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--brand-gold-500))] shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))] focus:ring-offset-2"
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
        aria-expanded={isOpen}
        aria-controls="chat-window"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title id="chat-open-title">Abrir chat</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chat-window"
          role="dialog"
          aria-modal="true"
          aria-label="Janela de chat"
          className="fixed right-6 bottom-24 z-40 flex h-96 w-80 flex-col rounded-xl border border-gray-200 bg-white shadow-2xl md:w-96"
        >
          <div className="flex items-center justify-between rounded-t-xl bg-[hsl(var(--brand-gold-500))] p-4 text-black">
            <h3 className="font-bold">Assistente Virtual</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black/80 hover:text-black focus:outline-none"
              aria-label="Fechar chat"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                role="img"
                aria-labelledby="close-title"
              >
                <title id="close-title">Fechar</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-[hsl(var(--brand-gold-500))] text-black"
                      : "border border-gray-200 bg-white text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="rounded-b-xl border-gray-200 border-t bg-white p-4"
          >
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))]"
                aria-label="Digite sua mensagem"
              />
              <button
                type="submit"
                className="rounded-lg bg-[hsl(var(--brand-gold-500))] p-2 text-black transition-all duration-300 hover:bg-[hsl(var(--brand-gold-400))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))]"
                aria-label="Enviar mensagem"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  role="img"
                  aria-labelledby="send-title"
                >
                  <title id="send-title">Enviar</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export { ChatWidget };
