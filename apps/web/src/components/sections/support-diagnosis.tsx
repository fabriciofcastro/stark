"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { logEvent } from "@/lib/gtag";

export function SupportDiagnosis() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [devices, setDevices] = useState<number>(10);
  const [urgency, setUrgency] = useState("normal");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      logEvent("lead", "support_diagnosis_submit", email);
    } catch {}

    const text = encodeURIComponent(
      `Diagnóstico de Suporte\n\nNome: ${name}\nEmail: ${email}\nEmpresa: ${company}\nDispositivos: ${devices}\nUrgência: ${urgency}\n\nDescrição:\n${message}`,
    );
    window.open(`https://wa.me/5511994396469?text=${text}`, "_blank");
  };

  return (
    <section className="mt-12 rounded-xl bg-card p-6 shadow-soft border border-white/10">
      <h2 className="mb-3 text-2xl font-semibold text-white">
        Diagnóstico de Suporte
      </h2>
      <p className="mb-6 text-sm text-gray-200">
        Envie um panorama rápido do problema. Retornaremos com uma orientação e
        proposta.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        <Input
          id="sd-name"
          label="Nome"
          floating
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          id="sd-email"
          label="Email"
          type="email"
          floating
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          id="sd-company"
          label="Empresa"
          floating
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <Input
          id="sd-devices"
          label="Quantidade aproximada de dispositivos"
          type="number"
          min={1}
          floating
          value={String(devices)}
          onChange={(e) => setDevices(Number(e.target.value))}
        />

        <Select
          id="sd-urgency"
          label="Urgência"
          floating
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          options={[
            { value: "normal", label: "Normal" },
            { value: "alta", label: "Alta" },
            { value: "crítica", label: "Crítica" },
          ]}
        />

        <Textarea
          id="sd-message"
          label="Descrição do problema"
          rows={4}
          floating
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <div className="md:col-span-2 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90"
          >
            Enviar diagnóstico
          </button>
          <a
            href="https://wa.me/5511994396469"
            className="rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
          >
            Falar no WhatsApp
          </a>
        </div>
      </form>
    </section>
  );
}
