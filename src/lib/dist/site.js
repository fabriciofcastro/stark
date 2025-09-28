"use strict";
exports.__esModule = true;
exports.GA_MEASUREMENT_ID = exports.CHATWOOT_WEBSITE_TOKEN = exports.CHATWOOT_BASE_URL = exports.MEETING_URL = exports.SITE_URL = void 0;
exports.SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
exports.MEETING_URL = process.env.NEXT_PUBLIC_MEETING_URL || "https://cal.com/";
// Chatwoot
exports.CHATWOOT_BASE_URL = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL || "";
exports.CHATWOOT_WEBSITE_TOKEN = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN || "";
// Analytics
exports.GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
