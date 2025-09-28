"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[70] flex items-center justify-center px-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === containerRef.current) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-[71] w-full max-w-lg rounded-xl border border-white/15 bg-[hsl(var(--brand-green-800))]/95 backdrop-blur-md shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-4">
          <h3 id="modal-title" className="text-lg font-semibold text-white">
            {title}
          </h3>
          <button
            className="rounded px-2 py-1 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))]"
            onClick={onClose}
            type="button"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        <div className="p-4 text-sm text-gray-200">{children}</div>
      </div>
    </div>
  );
}
