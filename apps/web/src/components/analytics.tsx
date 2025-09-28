"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";
import { initGA } from "@/lib/gtag";

export const AnalyticsProvider = () => {
  const [consented, setConsented] = useState<boolean>(false);

  useEffect(() => {
    const consent =
      window.localStorage.getItem("consent:analytics") === "granted";
    setConsented(consent);
    if (consent) initGA();
  }, []);

  if (!consented) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
};
