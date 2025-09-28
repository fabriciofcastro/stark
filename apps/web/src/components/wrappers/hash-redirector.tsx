"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector("header");
  const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0;
  const rect = el.getBoundingClientRect();
  const y = window.scrollY + rect.top - headerHeight - 8; // pequeno espaçamento
  window.scrollTo({ top: y < 0 ? 0 : y, behavior: "smooth" });
}

function scrollToHashWithRetry(hash: string, attempts = 16) {
  if (!hash || attempts <= 0) return;
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (el) {
    scrollToHash(hash);
    return;
  }
  setTimeout(() => scrollToHashWithRetry(hash, attempts - 1), 50);
}

export default function HashRedirector() {
  const pathname = usePathname();
  const router = useRouter();

  // Trata hash presente na URL após navegação de rota (App Router)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { hash } = window.location;
    if (!hash) return;

    if (hash === "#contato") {
      router.replace("/contact");
      return;
    }

    if (hash === "#sobre") {
      if (pathname !== "/") {
        router.push("/#sobre");
        return;
      }
      // tenta rolar com retry para garantir que o elemento esteja no DOM
      setTimeout(() => scrollToHashWithRetry("#sobre"), 0);
    } else {
      // Para outros hashes na mesma rota
      setTimeout(() => scrollToHashWithRetry(hash), 0);
    }
  }, [pathname, router]);

  // Ouve alterações de hash dentro da mesma página
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onHashChange = () => {
      if (window.location.hash) scrollToHash(window.location.hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return null;
}
