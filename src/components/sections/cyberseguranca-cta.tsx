// components/sections/cyberseguranca-cta.tsx
"use client";

import Link from "next/link";

export const CybersegurancaCta = () => {
  return (
    <div className="mt-6 flex gap-3 text-sm">
      <Link
        href="https://wa.me/5511994396469"
        className="rounded-lg bg-gold px-5 py-3 font-medium text-black hover:opacity-90"
      >
        Falar com o SOC
      </Link>
      <Link
        href="/contact"
        className="rounded-lg border border-white/30 px-5 py-3 font-medium text-white hover:bg-white/10"
      >
        Solicitar proposta
      </Link>
    </div>
  );
};
