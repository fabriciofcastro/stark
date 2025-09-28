"use client";

import { useEffect } from "react";

export const PerformanceMonitor = () => {
  useEffect(() => {
    if ("performance" in window && performance.mark) {
      try {
        performance.mark("app-mounted");
      } catch {}
    }
  }, []);
  return null;
};
