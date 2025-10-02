"use client";

import { useEffect, useState } from "react";

export const ContactChatwootBridge = () => {
  const [lastPayload, setLastPayload] = useState<Record<
    string,
    unknown
  > | null>(null);

  useEffect(() => {
    // Verifica se está no cliente
    if (typeof window === 'undefined') return;

    const onSent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setLastPayload(detail);
      try {
        // Identifica o usuário no widget (quando disponível)
        const chatwoot = (window as any).$chatwoot;
        if (chatwoot) {
          chatwoot.setUser(
            detail.email || detail.phone || detail.name || "lead",
            {
              email: detail.email,
              name: detail.name,
              avatar_url: undefined,
              phone_number: detail.phone,
              company: detail.company,
              metadata: {
                service: detail.service,
                objective: detail.objective,
                needs: detail.needs,
                timeframe: detail.timeframe,
                budget: detail.budget,
                companySize: detail.companySize,
                source: detail.source,
                preferred: detail.preferred,
              },
            },
          );
        }
      } catch (error) {
        console.warn('Chatwoot integration error:', error);
      }
    };

    window.addEventListener("contact:sent", onSent as EventListener);
    return () =>
      window.removeEventListener("contact:sent", onSent as EventListener);
  }, []);

  useEffect(() => {
    if (!lastPayload || typeof window === 'undefined') return;
    
    // Mostra um atalho visual para abrir o chat já identificado
    try {
      const chatwoot = (window as any).$chatwoot;
      if (chatwoot) {
        chatwoot.toggle("open");
      }
    } catch (error) {
      console.warn('Chatwoot toggle error:', error);
    }

    // Envia nota e tags via API privada
    (async () => {
      try {
        const res = await fetch("/api/chatwoot/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lastPayload),
        });
        const data = (await res.json().catch(() => ({}))) as {
          conversationId?: string | number;
          protocol?: string;
        };
        if (res.ok && data?.conversationId) {
          // opcional: exibir protocolo para o usuário
          try {
            const chatwoot = (window as any).$chatwoot;
            if (chatwoot?.setCustomAttributes) {
              chatwoot.setCustomAttributes({
                last_protocol: data?.protocol || String(data.conversationId),
              });
            }
          } catch (error) {
            console.warn('Chatwoot custom attributes error:', error);
          }
        }
      } catch (error) {
        console.warn('Chatwoot API error:', error);
      }
    })();
  }, [lastPayload]);

  return null;
};
