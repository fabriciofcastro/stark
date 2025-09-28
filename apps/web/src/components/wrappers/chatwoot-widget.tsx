"use client";

import { useEffect } from "react";
import { CHATWOOT_BASE_URL, CHATWOOT_WEBSITE_TOKEN } from "@/lib/site";

type CookiePrefs = {
	necessary: boolean;
	analytics: boolean;
	marketing: boolean;
};

export default function ChatwootWidget() {
	useEffect(() => {
		if (!CHATWOOT_BASE_URL || !CHATWOOT_WEBSITE_TOKEN) return;

		let loaded = false;
		let idleTimer: number | null = null;
		const onFirstInput = () => load();

		const load = () => {
			if (loaded) return;
			loaded = true;
			if (idleTimer) window.clearTimeout(idleTimer);
			window.removeEventListener("pointerdown", onFirstInput as EventListener);
			window.removeEventListener("keydown", onFirstInput as EventListener);
			// Settings antes de carregar o SDK
			try {
				(
					window as unknown as { chatwootSettings?: Record<string, unknown> }
				).chatwootSettings = {
					hideMessageBubble: false,
					position: "right",
					locale: "pt_BR",
					type: "standard",
				};
			} catch {}
			const s = document.createElement("script");
			s.defer = true;
			s.src = `${CHATWOOT_BASE_URL}/packs/js/sdk.js`;
			s.onload = () => {
				(window as any).chatwootSDK?.run({
					websiteToken: CHATWOOT_WEBSITE_TOKEN,
					baseUrl: CHATWOOT_BASE_URL,
				});
			};
			document.body.appendChild(s);
		};

		const enableDeferredLoad = () => {
			if (loaded) return;
			// Defer por interação ou 4s de ociosidade
			window.addEventListener("pointerdown", onFirstInput as EventListener, {
				once: true,
			});
			window.addEventListener("keydown", onFirstInput as EventListener, {
				once: true,
			});
			idleTimer = window.setTimeout(load, 4000);
		};

		const hasMarketingConsent = (): boolean => {
			try {
				const raw = window.localStorage.getItem("cookie:consent");
				if (!raw) return false;
				const parsed = JSON.parse(raw) as { prefs?: CookiePrefs };
				return !!parsed?.prefs?.marketing;
			} catch {
				return false;
			}
		};

		// Override por query string: ?chat=1 força carregar independente do consentimento
		const params = new URLSearchParams(window.location.search);
		const override = params.get("chat") === "1" || params.get("cw") === "1";

		if (override || hasMarketingConsent()) {
			enableDeferredLoad();
		} else {
			const onConsent = (e: Event) => {
				const detail = (e as CustomEvent<CookiePrefs>).detail;
				if (detail?.marketing) enableDeferredLoad();
			};
			window.addEventListener("cookie:consent", onConsent as EventListener, {
				once: true,
			});
			return () => {
				window.removeEventListener(
					"cookie:consent",
					onConsent as EventListener,
				);
			};
		}

		return () => {
			if (idleTimer) window.clearTimeout(idleTimer);
			window.removeEventListener("pointerdown", onFirstInput as EventListener);
			window.removeEventListener("keydown", onFirstInput as EventListener);
		};
	}, []);
	return null;
}
