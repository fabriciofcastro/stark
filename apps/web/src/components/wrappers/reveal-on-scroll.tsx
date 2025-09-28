"use client";

import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Função para observar elementos reveal
    const observeElements = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"),
      );
      
      if (elements.length === 0) return;

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15 },
      );

      elements.forEach((el) => {
        // Adiciona a classe imediatamente se o elemento já estiver visível
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add("is-visible");
        } else {
          // Caso contrário, observa com Intersection Observer
          io.observe(el);
        }
      });

      // Limpar o observador quando o efeito for limpo
      return () => {
        io.disconnect();
      };
    };

    // Executa a primeira vez quando o componente é montado
    observeElements();

    // Otimização: executar novamente quando houver navegação no navegador
    // (apesar de Next.js App Router não disparar events de navegação como BrowserRouter)
    let timeoutId: NodeJS.Timeout;
    
    // Tenta adicionar uma verificação de mudança de rota baseada em eventos do histórico
    const handlePopState = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(observeElements, 100);
    };

    window.addEventListener('popstate', handlePopState);

    // Observar mutações no DOM para capturar novos elementos .reveal
    const observer = new MutationObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(observeElements, 50);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('popstate', handlePopState);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
