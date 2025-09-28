"use client";

import { useEffect, useState } from "react";

type Toast = {
  id: number;
  type: "success" | "error" | "info";
  message: string;
};

let pushToastRef: ((t: Omit<Toast, "id">) => void) | null = null;

export function pushToast(t: Omit<Toast, "id">) {
  pushToastRef?.(t);
}

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    pushToastRef = (t) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, ...t }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
      }, 4500);
    };
    return () => {
      pushToastRef = null;
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-3 z-[60] flex flex-col items-center gap-2 px-3">
      {toasts.map((t) => (
        <output
          key={t.id}
          className={`pointer-events-auto max-w-[92vw] rounded-lg border px-4 py-3 text-sm shadow-soft backdrop-blur-md ${
            t.type === "success"
              ? "bg-emerald-600/20 border-emerald-400/40 text-emerald-100"
              : t.type === "error"
                ? "bg-red-600/20 border-red-400/40 text-red-100"
                : "bg-slate-600/20 border-white/20 text-white"
          }`}
        >
          {t.message}
        </output>
      ))}
    </div>
  );
}
