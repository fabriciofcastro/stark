// components/sections/criacao-sites-cta.tsx
"use client";

import Link from "next/link";
import { logEvent } from "@/lib/gtag";

export const CriacaoSitesCta = () => {
  return (
    <div className="mt-6 flex gap-3">
      <Link
        href="https://wa.me/5511994396469"
        className="rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90"
        onClick={() => logEvent("cta", "whatsapp_click", "criacao_sites")}
      >
        Falar no WhatsApp
      </Link>
      <Link
        href="/contact"
        className="rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
        onClick={() => logEvent("cta", "orcamento_click", "criacao_sites")}
      >
        Solicitar orçamento
      </Link>
    </div>
  );
};
