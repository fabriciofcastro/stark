"use client";

import { useEffect, useState } from "react";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = window.localStorage.getItem("consent:analytics");
    setVisible(v !== "granted" && v !== "denied");
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-4xl rounded-t-xl border border-white/20 bg-black/70 p-4 text-white backdrop-blur-md">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-200">
          Usamos cookies para análise (GA4). Você pode aceitar ou recusar. Dados
          são anonimizados.
        </p>
        <div className="flex gap-2">
          <button
            className="rounded-md bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
            type="button"
            onClick={() => {
              window.localStorage.setItem("consent:analytics", "denied");
              setVisible(false);
            }}
          >
            Recusar
          </button>
          <button
            className="rounded-md bg-[hsl(var(--brand-gold-500))] px-3 py-2 text-sm text-black hover:bg-[hsl(var(--brand-gold-400))]"
            type="button"
            onClick={() => {
              window.localStorage.setItem("consent:analytics", "granted");
              setVisible(false);
              window.location.reload();
            }}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
