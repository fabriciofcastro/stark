"use client";

import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/site";

type CookiePrefs = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function GA4() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    let injected = false;

    const inject = () => {
      if (injected) return;
      injected = true;
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(s1);

      const s2 = document.createElement("script");
      s2.innerHTML = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`;
      document.head.appendChild(s2);
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
      inject();
    } else {
      const onConsent = (e: Event) => {
        const detail = (e as CustomEvent<CookiePrefs>).detail;
        if (detail?.analytics) inject();
      };
      window.addEventListener("cookie:consent", onConsent as EventListener, {
        once: true,
      });
      return () => {
        window.removeEventListener(
          "cookie:consent",
          onConsent as EventListener,
        );
      };
    }
  }, []);

  return null;
}
