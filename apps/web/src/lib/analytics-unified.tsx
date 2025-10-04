// lib/analytics-unified.tsx - Sistema de Analytics Unificado e Otimizado
"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GA_MEASUREMENT_ID } from "@/lib/site";

type CookiePrefs = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

// Sistema unificado de analytics
export function UnifiedAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    let injected = false;

    const injectGA = () => {
      if (injected) return;
      injected = true;

      // Script do Google Tag Manager
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script1);

      // Configuração do gtag
      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure'
        });
      `;
      document.head.appendChild(script2);
    };

    const hasAnalyticsConsent = (): boolean => {
      try {
        const raw = window.localStorage.getItem("cookie:consent");
        if (!raw) return false;
        const parsed = JSON.parse(raw) as { prefs?: CookiePrefs };
        return !!parsed?.prefs?.analytics;
      } catch {
        return false;
      }
    };

    if (hasAnalyticsConsent()) {
      injectGA();
    } else {
      const onConsent = (e: Event) => {
        const detail = (e as CustomEvent<CookiePrefs>).detail;
        if (detail?.analytics) injectGA();
      };
      window.addEventListener("cookie:consent", onConsent as EventListener, {
        once: true,
      });
      return () => {
        window.removeEventListener("cookie:consent", onConsent as EventListener);
      };
    }
  }, []);

  return null;
}

// Provider de Analytics com Vercel
export function AnalyticsProvider() {
  const [consented, setConsented] = useState<boolean>(false);

  useEffect(() => {
    const consent = window.localStorage.getItem("cookie:consent");
    if (consent) {
      try {
        const parsed = JSON.parse(consent) as { prefs?: CookiePrefs };
        setConsented(!!parsed?.prefs?.analytics);
      } catch {
        setConsented(false);
      }
    }
  }, []);

  if (!consented) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <UnifiedAnalytics />
    </>
  );
}

// Funções de tracking unificadas
export const trackEvent = (
  action: string,
  category: string = "engagement",
  label?: string,
  value?: number
) => {
  if (typeof window === "undefined") return;
  
  const consent = window.localStorage.getItem("cookie:consent");
  if (!consent) return;

  try {
    const parsed = JSON.parse(consent) as { prefs?: CookiePrefs };
    if (!parsed?.prefs?.analytics) return;

    // Google Analytics 4
    if (window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    // Vercel Analytics
    if (window.va) {
      window.va("event", action);
    }
  } catch (error) {
    console.warn("Analytics tracking error:", error);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window === "undefined") return;
  
  const consent = window.localStorage.getItem("cookie:consent");
  if (!consent) return;

  try {
    const parsed = JSON.parse(consent) as { prefs?: CookiePrefs };
    if (!parsed?.prefs?.analytics) return;

    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  } catch (error) {
    console.warn("Page view tracking error:", error);
  }
};

// Web Vitals tracking
export const trackWebVitals = (metric: {
  name: string;
  id: string;
  value: number;
}) => {
  if (typeof window === "undefined") return;
  
  const consent = window.localStorage.getItem("cookie:consent");
  if (!consent) return;

  try {
    const parsed = JSON.parse(consent) as { prefs?: CookiePrefs };
    if (!parsed?.prefs?.analytics) return;

    if (window.gtag) {
      window.gtag("event", metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        event_category: "Web Vitals",
      });
    }
  } catch (error) {
    console.warn("Web Vitals tracking error:", error);
  }
};

// Declarações de tipos globais
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    va?: (event: "beforeSend" | "event" | "pageview", properties?: unknown) => void;
    dataLayer?: any[];
  }
}
