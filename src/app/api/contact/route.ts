import { NextResponse } from "next/server";

type Payload = {
  name: string;
  email: string;
  company?: string;
  phone: string;
  service: string;
  message: string;
  durationMs?: number;
  token?: string;
  ts?: number;
};

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function bad(msg: string, code = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status: code });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;
    const { name, email, phone, service, message, token } = body || {};
    if (!name || name.trim().length < 3) return bad("invalid_name");
    if (!email || !emailRegex.test(email)) return bad("invalid_email");
    const digits = (phone || "").replace(/\D/g, "");
    if (digits.length < 10) return bad("invalid_phone");
    if (!service) return bad("invalid_service");
    if (!message || message.trim().length < 20) return bad("invalid_message");

    // Optional reCAPTCHA verification
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && secret) {
      if (!token) return bad("missing_recaptcha", 403);
      try {
        const resp = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ secret, response: token }),
          },
        );
        const data = (await resp.json()) as {
          success?: boolean;
          score?: number;
        };
        if (
          !data.success ||
          (typeof data.score === "number" && data.score < 0.3)
        ) {
          return bad("recaptcha_failed", 403);
        }
      } catch {
        return bad("recaptcha_error", 500);
      }
    }

    // TODO: send email or push to ticket system
    // For now, just return ok
    return NextResponse.json({ ok: true });
  } catch {
    return bad("invalid_json");
  }
}
