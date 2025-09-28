"use client";

import { useMemo, useState } from "react";
import Checkbox from "@/components/ui/checkbox";
import Range from "@/components/ui/range";

type NumberInputProps = {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
};

function NumberInput({
  label,
  value,
  setValue,
  min,
  max,
  step = 1,
  suffix,
}: NumberInputProps) {
  return (
    <Range
      label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => setValue(Number((e.target as HTMLInputElement).value))}
      suffix={suffix}
    />
  );
}

export function VpsConfigurator() {
  const [vcpu, setVcpu] = useState<number>(2);
  const [ram, setRam] = useState<number>(4); // GB
  const [disk, setDisk] = useState<number>(80); // GB
  const [backups, setBackups] = useState<boolean>(true);
  const [ha, setHa] = useState<boolean>(false);

  const estimate = useMemo(() => {
    // Tabela simples (valores indicativos)
    const base = 25; // gestão e monitoração
    const cpuPrice = vcpu * 12; // por vCPU
    const ramPrice = ram * 2.5; // por GB
    const diskPrice = Math.max(0, disk - 20) * 0.12; // 20GB inclusos
    const backupPrice = backups ? disk * 0.06 + 10 : 0; // storage + operação
    const haPrice = ha ? 30 : 0; // overhead de HA
    const monthly =
      Math.round(
        (base + cpuPrice + ramPrice + diskPrice + backupPrice + haPrice) * 100,
      ) / 100;
    return { monthly };
  }, [vcpu, ram, disk, backups, ha]);

  return (
    <section className="rounded-xl bg-card p-6 shadow-soft border border-white/10">
      <h2 className="mb-3 text-2xl font-semibold text-white">
        Configurador de VPS
      </h2>
      <p className="mb-6 text-sm text-gray-200">
        Ajuste os recursos e veja a estimativa mensal (infra + gestão).
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <NumberInput
          label="vCPU"
          value={vcpu}
          setValue={setVcpu}
          min={1}
          max={16}
          suffix="vCPU"
        />
        <NumberInput
          label="Memória RAM"
          value={ram}
          setValue={setRam}
          min={1}
          max={64}
          step={1}
          suffix="GB"
        />
        <NumberInput
          label="Disco SSD"
          value={disk}
          setValue={setDisk}
          min={20}
          max={500}
          step={10}
          suffix="GB"
        />

        <Checkbox
          id="cfg-backups"
          label="Backups automáticos"
          checked={backups}
          onChange={(e) => setBackups((e.target as HTMLInputElement).checked)}
        />

        <Checkbox
          id="cfg-ha"
          label="Alta disponibilidade (HA)"
          checked={ha}
          onChange={(e) => setHa((e.target as HTMLInputElement).checked)}
        />
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-gray-200">Estimativa:</span>
        <span className="text-3xl font-bold text-gold">
          R$ {estimate.monthly.toFixed(2)}/mês
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`https://wa.me/5511994396469?text=Olá! Quero este VPS: ${vcpu} vCPU, ${ram}GB RAM, ${disk}GB SSD, backups=${backups}, HA=${ha}.`}
          className="rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90"
        >
          Pedir proposta
        </a>
        <a
          href="/contact"
          className="rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
        >
          Receber por e-mail
        </a>
      </div>
    </section>
  );
}
