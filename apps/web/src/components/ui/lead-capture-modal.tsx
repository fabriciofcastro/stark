import { useEffect, useRef, useState } from "react";

export function LeadCaptureModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const first = dialogRef.current?.querySelector<HTMLElement>(
      "input, button, [tabindex]:not([tabindex='-1'])",
    );
    first?.focus();
    return () => prev?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" || e.key === "Enter") {
          onClose();
        }
      }}
      tabIndex={-1}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-md rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md gold-border-animated"
      >
        <h2
          id="lead-modal-title"
          className="mb-2 text-xl font-semibold text-white"
        >
          Solicite um orçamento
        </h2>
        <p className="mb-4 text-sm text-gray-200">
          Deixe seus dados e retornaremos rapidamente.
        </p>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const text = encodeURIComponent(
              `Orçamento\n\nNome: ${name}\nEmail: ${email}`,
            );
            window.open(`https://wa.me/5511994396469?text=${text}`, "_blank");
            onClose();
          }}
        >
          <div className="relative">
            <input
              id="lead-name"
              className="peer w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))]"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label
              htmlFor="lead-name"
              className="pointer-events-none absolute left-3 top-2 text-sm text-gray-200 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-focus:px-1 peer-focus:bg-[hsl(var(--brand-green-800))] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-[hsl(var(--brand-green-800))]"
            >
              Nome
            </label>
          </div>
          <div className="relative">
            <input
              id="lead-email"
              type="email"
              className="peer w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))]"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="lead-email"
              className="pointer-events-none absolute left-3 top-2 text-sm text-gray-200 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-focus:px-1 peer-focus:bg-[hsl(var(--brand-green-800))] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-[hsl(var(--brand-green-800))]"
            >
              Email
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90 btn-shimmer"
            >
              Pedir orçamento
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
