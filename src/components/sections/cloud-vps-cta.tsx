// components/sections/cloud-vps-cta.tsx
"use client";

import Link from "next/link";
import { logEvent } from "@/lib/gtag";

export const CloudVpsCta = () => {
  return (
    <div className="mt-6 flex gap-3 text-sm">
      <Link
        href="https://wa.me/5511994396469"
        className="rounded-lg bg-gold px-5 py-3 font-medium text-black hover:opacity-90"
        onClick={() => logEvent("cta", "whatsapp_click", "cloud_vps_linux")}
      >
        WhatsApp
      </Link>
      <Link
        href="/contact"
        className="rounded-lg border border-white/30 px-5 py-3 font-medium text-white hover:bg-white/10"
        onClick={() => logEvent("cta", "proposta_click", "cloud_vps_linux")}
      >
        Solicitar proposta
      </Link>
    </div>
  );
};
