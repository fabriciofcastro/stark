import { NextResponse } from "next/server";
import {
  CHATWOOT_API_BASE_URL,
  CHATWOOT_ACCESS_TOKEN,
  CHATWOOT_ACCOUNT_ID,
  CHATWOOT_INBOX_ID,
} from "@/lib/chatwoot";

type CwSearchResponse<T> = { payload: T[] };
type CwContact = { id: number };

type LeadPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  service?: string;
  preferred?: string;
  consent?: boolean;
  companySize?: string;
  objective?: string;
  needs?: string[];
  timeframe?: string;
  budget?: string;
  cnpj?: string;
  role?: string;
  source?: string;
  message?: string;
};

async function cwFetch<T = unknown>(path: string, init?: RequestInit) {
  const url = `${CHATWOOT_API_BASE_URL}/api/v1${path}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${CHATWOOT_ACCESS_TOKEN}`,
    ...(init?.headers || {}),
  };
  const res = await fetch(url, { ...init, headers, cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Chatwoot API error ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

async function findContactId(
  email?: string,
  phone?: string,
): Promise<string | null> {
  try {
    if (email) {
      const q = encodeURIComponent(`email:${email}`);
      const data = await cwFetch<CwSearchResponse<CwContact>>(
        `/accounts/${CHATWOOT_ACCOUNT_ID}/contacts/search?q=${q}`,
      );
      if (data?.payload?.length) return String(data.payload[0].id);
    }
  } catch {}
  // Fallback: try phone
  try {
    if (phone) {
      const q = encodeURIComponent(`phone_number:${phone}`);
      const data = await cwFetch<CwSearchResponse<CwContact>>(
        `/accounts/${CHATWOOT_ACCOUNT_ID}/contacts/search?q=${q}`,
      );
      if (data?.payload?.length) return String(data.payload[0].id);
    }
  } catch {}
  return null;
}

async function createContact(payload: LeadPayload): Promise<string> {
  const data = await cwFetch<CwContact>(
    `/accounts/${CHATWOOT_ACCOUNT_ID}/contacts`,
    {
      method: "POST",
      body: JSON.stringify({
        name: payload.name || "Lead",
        email: payload.email || undefined,
        phone_number: payload.phone || undefined,
        additional_attributes: {
          company: payload.company,
          service: payload.service,
          objective: payload.objective,
          needs: payload.needs,
          timeframe: payload.timeframe,
          budget: payload.budget,
          companySize: payload.companySize,
          source: payload.source,
          preferred: payload.preferred,
          cnpj: payload.cnpj,
          role: payload.role,
        },
      }),
    },
  );
  return String(data.id);
}

async function ensureContactId(payload: LeadPayload): Promise<string> {
  const found = await findContactId(payload.email, payload.phone);
  if (found) return found;
  return createContact(payload);
}

type CwConversation = { id: number };

async function ensureConversationId(contactId: string): Promise<string> {
  // Create a conversation for this contact in the selected inbox
  const data = await cwFetch<CwConversation>(
    `/accounts/${CHATWOOT_ACCOUNT_ID}/conversations`,
    {
      method: "POST",
      body: JSON.stringify({
        inbox_id: Number(CHATWOOT_INBOX_ID),
        contact_id: Number(contactId),
        additional_attributes: {},
      }),
    },
  );
  return String(data.id);
}

async function addNote(conversationId: string, content: string) {
  await cwFetch(
    `/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({ content, private: true }),
    },
  );
}

async function addLabels(conversationId: string, labels: string[]) {
  if (!labels.length) return;
  await cwFetch(
    `/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/labels`,
    { method: "POST", body: JSON.stringify({ labels }) },
  );
}

async function sendPublicMessage(conversationId: string, content: string) {
  await cwFetch(
    `/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({ content, private: false }),
    },
  );
}

function normalizeLabel(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_\-]/g, "")
    .slice(0, 50);
}

export async function POST(req: Request) {
  try {
    if (
      !CHATWOOT_API_BASE_URL ||
      !CHATWOOT_ACCESS_TOKEN ||
      !CHATWOOT_ACCOUNT_ID ||
      !CHATWOOT_INBOX_ID
    ) {
      return NextResponse.json(
        { error: "Chatwoot env missing" },
        { status: 500 },
      );
    }

    const payload = (await req.json()) as LeadPayload;
    const contactId = await ensureContactId(payload);
    const conversationId = await ensureConversationId(contactId);

    const labels: string[] = [];
    if (payload.service) labels.push(normalizeLabel(String(payload.service)));
    if (payload.objective)
      labels.push(normalizeLabel(String(payload.objective)));
    if (Array.isArray(payload.needs))
      labels.push(...payload.needs.map((n: string) => normalizeLabel(n)));

    const note = [
      `Novo lead pelo site`,
      `Nome: ${payload.name || ""}`,
      `Email: ${payload.email || ""}`,
      `Empresa: ${payload.company || ""}`,
      payload.cnpj ? `CNPJ: ${payload.cnpj}` : "",
      payload.role ? `Cargo/Área: ${payload.role}` : "",
      `Telefone: ${payload.phone || ""}`,
      `Serviço: ${payload.service || ""}`,
      payload.objective ? `Objetivo: ${payload.objective}` : "",
      payload.needs?.length ? `Necessidades: ${payload.needs.join(", ")}` : "",
      payload.timeframe ? `Prazo: ${payload.timeframe}` : "",
      payload.budget ? `Orçamento: ${payload.budget}` : "",
      payload.companySize ? `Tamanho: ${payload.companySize}` : "",
      payload.source ? `Origem: ${payload.source}` : "",
      payload.preferred ? `Canal preferido: ${payload.preferred}` : "",
      "",
      `Mensagem:`,
      `${payload.message || ""}`,
    ]
      .filter(Boolean)
      .join("\n");

    await addNote(conversationId, note);
    await addLabels(conversationId, labels);
    const protocol = `CW-${conversationId}`;
    await sendPublicMessage(
      conversationId,
      `Recebemos seu formulário. Protocolo: ${protocol}. Vamos continuar por aqui se precisar. Um atendente humano pode assumir a qualquer momento.`,
    );

    return NextResponse.json({ ok: true, contactId, conversationId, protocol });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message || String(err) },
      { status: 500 },
    );
  }
}
