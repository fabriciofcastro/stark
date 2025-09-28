"use strict";
exports.__esModule = true;
exports.assertChatwootEnv = exports.CHATWOOT_INBOX_ID = exports.CHATWOOT_ACCOUNT_ID = exports.CHATWOOT_ACCESS_TOKEN = exports.CHATWOOT_API_BASE_URL = void 0;
exports.CHATWOOT_API_BASE_URL = process.env.CHATWOOT_API_BASE_URL ||
    process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL ||
    "";
exports.CHATWOOT_ACCESS_TOKEN = process.env.CHATWOOT_ACCESS_TOKEN || "";
exports.CHATWOOT_ACCOUNT_ID = process.env.CHATWOOT_ACCOUNT_ID || "";
exports.CHATWOOT_INBOX_ID = process.env.CHATWOOT_INBOX_ID || "";
function assertChatwootEnv() {
    if (!exports.CHATWOOT_API_BASE_URL ||
        !exports.CHATWOOT_ACCESS_TOKEN ||
        !exports.CHATWOOT_ACCOUNT_ID ||
        !exports.CHATWOOT_INBOX_ID) {
        throw new Error("Chatwoot env not configured");
    }
}
exports.assertChatwootEnv = assertChatwootEnv;
