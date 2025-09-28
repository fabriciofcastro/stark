import { NextResponse } from "next/server";

export function GET() {
  const body = [
    "Contact: mailto:security@starkgestao.com.br",
    "Expires: 2026-01-01T00:00:00.000Z",
    "Preferred-Languages: pt, en",
    "Policy: https://starkgestao.com.br/SECURITY",
  ].join("\n");
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
