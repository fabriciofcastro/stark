"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var site_1 = require("@/lib/site");
function ChatwootWidget() {
    react_1.useEffect(function () {
        if (!site_1.CHATWOOT_BASE_URL || !site_1.CHATWOOT_WEBSITE_TOKEN)
            return;
        var loaded = false;
        var idleTimer = null;
        var onFirstInput = function () { return load(); };
        var load = function () {
            if (loaded)
                return;
            loaded = true;
            if (idleTimer)
                window.clearTimeout(idleTimer);
            window.removeEventListener("pointerdown", onFirstInput);
            window.removeEventListener("keydown", onFirstInput);
            // Settings antes de carregar o SDK
            try {
                window.chatwootSettings = {
                    hideMessageBubble: false,
                    position: "right",
                    locale: "pt_BR",
                    type: "standard"
                };
            }
            catch (_a) { }
            var s = document.createElement("script");
            s.defer = true;
            s.src = site_1.CHATWOOT_BASE_URL + "/packs/js/sdk.js";
            s.onload = function () {
                var _a;
                // @ts-expect-error chatwoot global
                (_a = window.chatwootSDK) === null || _a === void 0 ? void 0 : _a.run({
                    websiteToken: site_1.CHATWOOT_WEBSITE_TOKEN,
                    baseUrl: site_1.CHATWOOT_BASE_URL
                });
            };
            document.body.appendChild(s);
        };
        var enableDeferredLoad = function () {
            if (loaded)
                return;
            // Defer por interação ou 4s de ociosidade
            window.addEventListener("pointerdown", onFirstInput, {
                once: true
            });
            window.addEventListener("keydown", onFirstInput, {
                once: true
            });
            idleTimer = window.setTimeout(load, 4000);
        };
        var hasMarketingConsent = function () {
            var _a;
            try {
                var raw = window.localStorage.getItem("cookie:consent");
                if (!raw)
                    return false;
                var parsed = JSON.parse(raw);
                return !!((_a = parsed === null || parsed === void 0 ? void 0 : parsed.prefs) === null || _a === void 0 ? void 0 : _a.marketing);
            }
            catch (_b) {
                return false;
            }
        };
        // Override por query string: ?chat=1 força carregar independente do consentimento
        var params = new URLSearchParams(window.location.search);
        var override = params.get("chat") === "1" || params.get("cw") === "1";
        if (override || hasMarketingConsent()) {
            enableDeferredLoad();
        }
        else {
            var onConsent_1 = function (e) {
                var detail = e.detail;
                if (detail === null || detail === void 0 ? void 0 : detail.marketing)
                    enableDeferredLoad();
            };
            window.addEventListener("cookie:consent", onConsent_1, {
                once: true
            });
            return function () {
                window.removeEventListener("cookie:consent", onConsent_1);
            };
        }
        return function () {
            if (idleTimer)
                window.clearTimeout(idleTimer);
            window.removeEventListener("pointerdown", onFirstInput);
            window.removeEventListener("keydown", onFirstInput);
        };
    }, []);
    return null;
}
exports["default"] = ChatwootWidget;
