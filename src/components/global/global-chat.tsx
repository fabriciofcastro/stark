"use client";

import { ContactExperience } from "@/components/sections/contact-experience";
import { CHATWOOT_WEBSITE_TOKEN, WHATSAPP_NUMBER } from "@/lib/site";

const GlobalChat = () => {
  // Handler para dados do formulário de contato
  const handleContactFormSubmit = (data: Record<string, unknown>) => {
    // Aqui você pode integrar com sua API de contato
    console.log("Dados coletados globalmente:", data);
    
    // Enviar para API de contato
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error("Erro ao enviar dados de contato:", error);
    });
  };

  return (
    <ContactExperience
      chatwootToken={CHATWOOT_WEBSITE_TOKEN || ""}
      whatsappNumber={WHATSAPP_NUMBER || "+5511994396469"}
      onContactFormSubmit={handleContactFormSubmit}
    />
  );
};

export { GlobalChat };
