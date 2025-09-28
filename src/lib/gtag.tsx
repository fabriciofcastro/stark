// lib/gtag.js
"use client";

import ReactGA from "react-ga4";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const initGA = () => {
  if (!GA_TRACKING_ID) return;
  // Checagem de consentimento básico
  const consent =
    typeof window !== "undefined"
      ? window.localStorage.getItem("consent:analytics")
      : null;
  if (consent !== "granted") return;
  ReactGA.initialize(GA_TRACKING_ID, { gaOptions: { anonymizeIp: true } });
};

export const logPageView = (path: string) => {
  if (!GA_TRACKING_ID) return;
  ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (
  category: string = "",
  action: string = "",
  label: string = "",
) => {
  if (!GA_TRACKING_ID) return;
  if (category && action) {
    ReactGA.event({ category, action, label });
  }
};

export const logException = (
  description: string = "",
  fatal: boolean = false,
) => {
  if (!GA_TRACKING_ID) return;
  if (description) {
    ReactGA.event("exception", { description, fatal });
  }
};

export const logButtonClick = (label: string) => {
  logEvent("interaction", "button_click", label);
};

export const logServiceInquiry = (serviceName: string) => {
  logEvent("interaction", "service_inquiry", serviceName);
};
