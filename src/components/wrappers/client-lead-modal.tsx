"use client";

import { useEffect, useState } from "react";
import { LeadCaptureModal } from "@/components/ui/lead-capture-modal";
import { logEvent } from "@/lib/gtag";

export default function ClientLeadModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const key = "lead_modal_seen";
      if (localStorage.getItem(key)) return;
      const t = setTimeout(() => {
        setOpen(true);
        localStorage.setItem(key, "1");
        logEvent("modal", "lead_open", "auto");
      }, 1500);
      return () => clearTimeout(t);
    } catch {}
  }, []);

  return (
    <LeadCaptureModal
      open={open}
      onClose={() => {
        setOpen(false);
        logEvent("modal", "lead_close", "user");
      }}
    />
  );
}
