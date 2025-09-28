"use client";

import { useEffect, useState } from "react";
// import { CHATWOOT_BASE_URL } from "@/lib/site";

export const ContactChatwootBridge = () => {
  const [lastPayload, setLastPayload] = useState<Record<
    string,
    unknown
  > | null>(null);

  useEffect(() => {
    const onSent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setLastPayload(detail);
      try {
        // Identifica o usuário no widget (quando disponível)
        // @ts-expect-error chatwoot global
        if (window.$chatwoot) {
          // @ts-expect-error chatwoot global
          window.$chatwoot.setUser(
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
      } catch {}
    };
    window.addEventListener("contact:sent", onSent as EventListener);
    return () =>
      window.removeEventListener("contact:sent", onSent as EventListener);
  }, []);

  useEffect(() => {
    if (!lastPayload) return;
    // Mostra um atalho visual para abrir o chat já identificado
    try {
      // @ts-expect-error chatwoot global
      const api = window.$chatwoot;
      if (api) {
        api.toggle("open");
      }
    } catch {}

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
            // @ts-expect-error chatwoot global
            window.$chatwoot?.setCustomAttributes?.({
              last_protocol: data?.protocol || String(data.conversationId),
            });
          } catch {}
        }
      } catch {}
    })();
  }, [lastPayload]);

  return null;
};
