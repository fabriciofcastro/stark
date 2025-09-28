import type { NextWebVitalsMetric } from "next/app";
import { reportWebVitalsToGA } from "@/lib/performance";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  try {
    reportWebVitalsToGA({
      name: metric.name,
      id: metric.id,
      value: metric.value as number,
    });
  } catch {}
}
