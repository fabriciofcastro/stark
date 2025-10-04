"use client";

import { useEffect, useState, useCallback } from "react";
import { trackEvent } from "@/lib/analytics-unified";

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
  loadTime: number;
}

interface ResourceTiming {
  name: string;
  duration: number;
  size: number;
  type: string;
}

export function AdvancedPerformanceOptimizer() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [slowResources, setSlowResources] = useState<ResourceTiming[]>([]);
  const [isOptimized, setIsOptimized] = useState(false);

  // Função para otimizar imagens automaticamente
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll("img");
    let optimizedCount = 0;

    images.forEach((img) => {
      // Adicionar lazy loading se não existir
      if (!img.hasAttribute("loading")) {
        img.setAttribute("loading", "lazy");
        optimizedCount++;
      }

      // Adicionar decoding async
      if (!img.hasAttribute("decoding")) {
        img.setAttribute("decoding", "async");
        optimizedCount++;
      }

      // Adicionar fetchpriority para imagens acima da dobra
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && !img.hasAttribute("fetchpriority")) {
        img.setAttribute("fetchpriority", "high");
        optimizedCount++;
      }
    });

    if (optimizedCount > 0) {
      trackEvent("performance_optimization", "images", `Optimized ${optimizedCount} images`);
    }
  }, []);

  // Função para pré-carregar recursos críticos
  const preloadCriticalResources = useCallback(() => {
    const criticalResources = [
      { href: "/fonts/inter-var.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous" },
      { href: "/images/logo/logo.png", as: "image" },
      { href: "/icons/icon.svg", as: "image" }
    ];

    criticalResources.forEach((resource) => {
      const existingLink = document.querySelector(`link[href="${resource.href}"]`);
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = resource.href;
        if (resource.as) link.setAttribute("as", resource.as);
        if (resource.type) link.type = resource.type;
        if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
        document.head.appendChild(link);
      }
    });

    trackEvent("performance_optimization", "preload", "Critical resources preloaded");
  }, []);

  // Função para otimizar animações
  const optimizeAnimations = useCallback(() => {
    // Reduzir animações em dispositivos com pouca performance
    const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    if (isLowPerformance || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.style.setProperty("--animation-duration", "0.1s");
      document.documentElement.style.setProperty("--transition-duration", "0.1s");
      trackEvent("performance_optimization", "animations", "Reduced motion enabled");
    }
  }, []);

  // Função para otimizar fontes
  const optimizeFonts = useCallback(() => {
    // Adicionar font-display: swap para melhor performance
    const style = document.createElement("style");
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);

    // Pré-carregar fontes críticas
    const fontLink = document.createElement("link");
    fontLink.rel = "preload";
    fontLink.href = "/fonts/inter-var.woff2";
    fontLink.as = "font";
    fontLink.type = "font/woff2";
    fontLink.crossOrigin = "anonymous";
    document.head.appendChild(fontLink);
  }, []);

  // Função para monitorar Core Web Vitals
  const measureWebVitals = useCallback(() => {
    const vitals: Partial<PerformanceMetrics> = {};

    // LCP - Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      vitals.lcp = lastEntry.startTime;
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime } as PerformanceMetrics));
    });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

    // FID - First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        vitals.fid = entry.processingStart - entry.startTime;
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime } as PerformanceMetrics));
      });
    });
    fidObserver.observe({ entryTypes: ["first-input"] });

    // CLS - Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          vitals.cls = clsValue;
          setMetrics(prev => ({ ...prev, cls: clsValue } as PerformanceMetrics));
        }
      });
    });
    clsObserver.observe({ entryTypes: ["layout-shift"] });

    // FCP - First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        vitals.fcp = entry.startTime;
        setMetrics(prev => ({ ...prev, fcp: entry.startTime } as PerformanceMetrics));
      });
    });
    fcpObserver.observe({ entryTypes: ["paint"] });

    // TTFB - Time to First Byte
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (navigation) {
      vitals.ttfb = navigation.responseStart - navigation.requestStart;
      vitals.loadTime = navigation.loadEventEnd - navigation.fetchStart;
      setMetrics(prev => ({ 
        ...prev, 
        ttfb: navigation.responseStart - navigation.requestStart,
        loadTime: navigation.loadEventEnd - navigation.fetchStart
      } as PerformanceMetrics));
    }

    // Enviar métricas para analytics
    setTimeout(() => {
      if (vitals.lcp) trackEvent("web_vitals", "lcp", "", vitals.lcp);
      if (vitals.fid) trackEvent("web_vitals", "fid", "", vitals.fid);
      if (vitals.cls) trackEvent("web_vitals", "cls", "", vitals.cls);
      if (vitals.fcp) trackEvent("web_vitals", "fcp", "", vitals.fcp);
      if (vitals.ttfb) trackEvent("web_vitals", "ttfb", "", vitals.ttfb);
    }, 5000);
  }, []);

  // Função para identificar recursos lentos
  const identifySlowResources = useCallback(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const slow = resources
      .filter((resource) => resource.duration > 1000) // Mais de 1 segundo
      .map((resource) => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize || 0,
        type: resource.initiatorType
      }))
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10);

    setSlowResources(slow);

    if (slow.length > 0) {
      trackEvent("performance_issue", "slow_resources", `${slow.length} slow resources detected`);
    }
  }, []);

  // Função para otimizar CSS crítico
  const optimizeCriticalCSS = useCallback(() => {
    // Inline CSS crítico
    const criticalCSS = `
      .critical-loading {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .critical-loaded {
        opacity: 1;
      }
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `;

    const style = document.createElement("style");
    style.textContent = criticalCSS;
    style.setAttribute("data-critical", "true");
    document.head.appendChild(style);
  }, []);

  // Função para implementar Service Worker
  const registerServiceWorker = useCallback(async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registrado:", registration);
        trackEvent("performance_optimization", "service_worker", "SW registered successfully");
      } catch (error) {
        console.error("Erro ao registrar Service Worker:", error);
      }
    }
  }, []);

  // Função para otimizar memória
  const optimizeMemory = useCallback(() => {
    // Limpar event listeners órfãos
    const cleanup = () => {
      // Implementar limpeza de memória se necessário
    };

    // Executar limpeza periodicamente
    setInterval(cleanup, 30000); // A cada 30 segundos
  }, []);

  // Inicializar otimizações
  useEffect(() => {
    const initOptimizations = async () => {
      // Otimizações imediatas
      optimizeImages();
      preloadCriticalResources();
      optimizeAnimations();
      optimizeFonts();
      optimizeCriticalCSS();
      
      // Registrar Service Worker
      await registerServiceWorker();
      
      // Otimizações de memória
      optimizeMemory();
      
      setIsOptimized(true);
      trackEvent("performance_optimization", "initialization", "All optimizations applied");
    };

    initOptimizations();
  }, [
    optimizeImages,
    preloadCriticalResources,
    optimizeAnimations,
    optimizeFonts,
    optimizeCriticalCSS,
    registerServiceWorker,
    optimizeMemory
  ]);

  // Medir métricas após carregamento
  useEffect(() => {
    if (document.readyState === "complete") {
      measureWebVitals();
      identifySlowResources();
    } else {
      window.addEventListener("load", () => {
        measureWebVitals();
        identifySlowResources();
      });
    }
  }, [measureWebVitals, identifySlowResources]);

  return null; // Componente não renderiza nada visualmente
}

// Hook para monitorar performance
export function usePerformanceMonitoring() {
  const [isLoading, setIsLoading] = useState(true);
  const [performanceScore, setPerformanceScore] = useState<number>(0);

  useEffect(() => {
    const calculatePerformanceScore = () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (!navigation) return 0;

      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      
      // Calcular score baseado em métricas
      let score = 100;
      
      // Penalizar por tempo de carregamento
      if (loadTime > 3000) score -= 20;
      else if (loadTime > 2000) score -= 10;
      
      // Penalizar por DOM lento
      if (domContentLoaded > 2000) score -= 15;
      else if (domContentLoaded > 1000) score -= 5;
      
      return Math.max(0, score);
    };

    const timer = setTimeout(() => {
      setIsLoading(false);
      setPerformanceScore(calculatePerformanceScore());
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return { isLoading, performanceScore };
}
