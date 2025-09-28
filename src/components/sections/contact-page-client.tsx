// components/sections/contact-page-client.tsx
"use client";

import { useState } from "react";
import Contact from "@/components/sections/contact";
import Modal from "@/components/ui/modal";

export const ContactPageClient = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Contact showHeading={false} />
      <Modal open={open} onClose={() => setOpen(false)} title="Mensagem enviada!">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Mensagem enviada!</h3>
          <p className="text-gray-300 mb-6">
            Obrigado pelo contato. Retornaremos em até 24h úteis.
          </p>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90"
          >
            Fechar
          </button>
        </div>
      </Modal>
    </>
  );
};