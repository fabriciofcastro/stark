export const CHATWOOT_API_BASE_URL =
  process.env.CHATWOOT_API_BASE_URL ||
  process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL ||
  "";
export const CHATWOOT_ACCESS_TOKEN = process.env.CHATWOOT_ACCESS_TOKEN || "";
export const CHATWOOT_ACCOUNT_ID = process.env.CHATWOOT_ACCOUNT_ID || "";
export const CHATWOOT_INBOX_ID = process.env.CHATWOOT_INBOX_ID || "";

export function assertChatwootEnv() {
  if (
    !CHATWOOT_API_BASE_URL ||
    !CHATWOOT_ACCESS_TOKEN ||
    !CHATWOOT_ACCOUNT_ID ||
    !CHATWOOT_INBOX_ID
  ) {
    throw new Error("Chatwoot env not configured");
  }
}
