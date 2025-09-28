// components/sections/helpdesk-form.tsx
"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { logEvent } from "@/lib/gtag";

export const HelpdeskForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [priority, setPriority] = useState("normal");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Novo chamado\n\nNome: ${name}\nEmail: ${email}\nPrioridade: ${priority}\nAssunto: ${subject}\n\nDescrição:\n${message}`,
    );
    window.open(`https://wa.me/5511994396469?text=${text}`, "_blank");
    logEvent("form", "helpdesk_ticket_submit", "helpdesk");
  };

  return (
    <section className="rounded-xl bg-card p-8 shadow-soft border border-white/10 watermark">
      <h2 className="mb-4 text-2xl font-semibold text-white">
        Abrir chamado
      </h2>
      <form
        onSubmit={submitTicket}
        className="grid grid-cols-1 gap-4"
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            submitTicket(e);
          }
        }}
      >
        <Input
          id="helpdesk-name"
          label="Nome"
          floating
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          autoComplete="name"
          required
        />

        <Input
          id="helpdesk-email"
          label="Email"
          type="email"
          floating
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          autoComplete="email"
          required
        />

        <Select
          id="helpdesk-priority"
          label="Prioridade"
          floating
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          options={[
            { value: "normal", label: "Normal" },
            { value: "alta", label: "Alta" },
            { value: "critica", label: "Crítica" },
          ]}
        />

        <Input
          id="helpdesk-subject"
          label="Assunto"
          floating
          value={subject}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSubject(e.target.value)
          }
          required
        />

        <Textarea
          id="helpdesk-message"
          label="Descrição"
          floating
          rows={5}
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          required
          maxLength={500}
          showCounter
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90"
          >
            Enviar
          </button>
          <a
            href="https://wa.me/5511994396469"
            className="rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
            onClick={() => logEvent("cta", "whatsapp_click", "helpdesk")}
          >
            WhatsApp
          </a>
        </div>
      </form>
    </section>
  );
};

export default HelpdeskForm;