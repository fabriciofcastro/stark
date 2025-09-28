import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import crypto from "crypto";
import {
  CHATWOOT_API_BASE_URL,
  CHATWOOT_ACCESS_TOKEN,
  CHATWOOT_ACCOUNT_ID,
} from "@/lib/chatwoot";

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

async function sendPublicMessage(conversationId: number, content: string) {
  await cwFetch(
    `/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({ content, private: false }),
    },
  );
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export async function POST(req: Request) {
  try {
    if (
      !CHATWOOT_API_BASE_URL ||
      !CHATWOOT_ACCESS_TOKEN ||
      !CHATWOOT_ACCOUNT_ID
    ) {
      return NextResponse.json(
        { error: "Chatwoot env missing" },
        { status: 500 },
      );
    }

    const raw = await req.text();
    const secret = process.env.CHATWOOT_WEBHOOK_SECRET || "";
    const headerSig = req.headers.get("x-chatwoot-signature") || "";
    if (secret) {
      try {
        const computed = crypto
          .createHmac("sha256", secret)
          .update(raw)
          .digest("hex");
        if (!safeEqual(computed, headerSig)) {
          return NextResponse.json(
            { error: "invalid signature" },
            { status: 401 },
          );
        }
      } catch {
        return NextResponse.json({ error: "signature error" }, { status: 401 });
      }
    }

    const payload = JSON.parse(raw) as {
      event: string;
      account: { id: number };
      conversation?: { id: number };
    };

    if (payload.event === "conversation_created" && payload.conversation?.id) {
      const conversationId = payload.conversation.id;
      const protocol = `CW-${conversationId}`;
      await sendPublicMessage(
        conversationId,
        `Olá! Para agilizar, preencha nosso formulário em ${SITE_URL}/contact. Seu protocolo é ${protocol}. Se preferir, podemos continuar por aqui e um atendente humano pode assumir quando necessário.`,
      );
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message || String(err) },
      { status: 500 },
    );
  }
}
