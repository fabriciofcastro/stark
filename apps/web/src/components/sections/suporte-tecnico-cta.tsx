// components/sections/suporte-tecnico-cta.tsx
"use client";

import Link from "next/link";
import { logEvent } from "@/lib/gtag";

export const SuporteTecnicoCta = () => {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link
        href="https://wa.me/5511994396469"
        className="rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90"
        onClick={() => logEvent("cta", "whatsapp_click", "suporte_tecnico")}
      >
        Falar no WhatsApp
      </Link>
      <Link
        href="/contact"
        className="rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
        onClick={() => logEvent("cta", "diagnostico_click", "suporte_tecnico")}
      >
        Solicitar diagnóstico
      </Link>
    </div>
  );
};
