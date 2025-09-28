"use client";

import { useEffect, useState } from "react";

type Preferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_PREFS: Preferences = {
  necessary: true,
  analytics: true,
  marketing: false,
};

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFS);
  const [configOpen, setConfigOpen] = useState(false);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem("cookie:consent");
      if (!v) {
        setShow(true);
        return;
      }
      const parsed = JSON.parse(v) as {
        acceptedAt: number;
        prefs: Preferences;
      };
      setPrefs(parsed.prefs || DEFAULT_PREFS);
      setShow(false);
    } catch {
      setShow(true);
    }
  }, []);

  const save = (next: Preferences) => {
    try {
      window.localStorage.setItem(
        "cookie:consent",
        JSON.stringify({ acceptedAt: Date.now(), prefs: next }),
      );
      (window as unknown as { __cookie_prefs?: Preferences }).__cookie_prefs =
        next;
      window.dispatchEvent(
        new CustomEvent<Preferences>("cookie:consent", { detail: next }),
      );
    } catch {}
  };

  const acceptAll = () => {
    const next = { necessary: true, analytics: true, marketing: true };
    setPrefs(next);
    save(next);
    setShow(false);
  };
  const rejectAll = () => {
    const next = { necessary: true, analytics: false, marketing: false };
    setPrefs(next);
    save(next);
    setShow(false);
  };

  // Reabrir via evento global ou botão no rodapé
  useEffect(() => {
    const openPrefs = () => {
      setShow(true);
      setConfigOpen(true);
    };
    window.addEventListener("cookie:open-preferences", openPrefs);
    return () =>
      window.removeEventListener("cookie:open-preferences", openPrefs);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/15 bg-[hsl(var(--brand-green-800))]/95 backdrop-blur-md p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.35)]">
      <div className="mx-auto max-w-7xl">
        <h3 className="mb-2 text-lg font-semibold text-white">
          Cookies e Privacidade
        </h3>
        <p className="mb-4 text-sm text-gray-200">
          Utilizamos cookies para melhorar sua experiência, analisar tráfego e
          exibir conteúdo personalizado. Ao clicar em "Aceitar todos", você
          concorda com o uso de todos os cookies conforme descrito em nossa
          <a
            href="/politica-de-privacidade"
            className="ml-1 underline text-brand-gold-500 hover:text-brand-gold-400"
          >
            Política de Privacidade
          </a>
          .
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-lg bg-gold px-6 py-2 font-medium text-black hover:opacity-90"
          >
            Aceitar todos
          </button>
          <button
            type="button"
            onClick={rejectAll}
            className="rounded-lg border border-white/20 bg-white/5 px-6 py-2 font-medium text-white hover:bg-white/10"
          >
            Recusar todos
          </button>
          <button
            type="button"
            onClick={() => setConfigOpen(true)}
            className="rounded-lg border border-white/20 px-6 py-2 font-medium text-white hover:bg-white/5"
          >
            Configurar preferências
          </button>
        </div>
      </div>
      {configOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setConfigOpen(false)}
            aria-hidden
          />
          <div className="relative w-full rounded-t-2xl border border-white/15 bg-[hsl(var(--brand-green-900))] p-6 text-white shadow-2xl sm:max-w-lg sm:rounded-2xl">
            <h4 className="text-lg font-semibold">Preferências de Cookies</h4>
            <p className="mt-1 text-sm text-gray-300">
              Escolha quais categorias de cookies deseja permitir. Cookies
              necessários são essenciais para o funcionamento do site.
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked
                  readOnly
                  aria-readonly
                />
                <span>
                  <span className="font-medium">Necessários</span>
                  <span className="block text-gray-300">
                    Essenciais para recursos básicos como navegação e segurança.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={prefs.analytics}
                  onChange={(e) =>
                    setPrefs({
                      ...prefs,
                      analytics: (e.target as HTMLInputElement).checked,
                    })
                  }
                />
                <span>
                  <span className="font-medium">Analíticos</span>
                  <span className="block text-gray-300">
                    Ajudam a entender o uso do site para melhorá-lo.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={prefs.marketing}
                  onChange={(e) =>
                    setPrefs({
                      ...prefs,
                      marketing: (e.target as HTMLInputElement).checked,
                    })
                  }
                />
                <span>
                  <span className="font-medium">Marketing</span>
                  <span className="block text-gray-300">
                    Personalização e ofertas relevantes.
                  </span>
                </span>
              </label>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setConfigOpen(false)}
                className="rounded-lg border border-white/20 px-6 py-2 font-medium text-white hover:bg-white/5"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  save({ ...prefs, necessary: true });
                  setShow(false);
                }}
                className="rounded-lg bg-gold px-6 py-2 font-medium text-black hover:opacity-90"
              >
                Salvar preferências
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
