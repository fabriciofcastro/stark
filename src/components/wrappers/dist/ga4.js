"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var site_1 = require("@/lib/site");
function GA4() {
    react_1.useEffect(function () {
        if (!site_1.GA_MEASUREMENT_ID)
            return;
        var injected = false;
        var inject = function () {
            if (injected)
                return;
            injected = true;
            var s1 = document.createElement("script");
            s1.async = true;
            s1.src = "https://www.googletagmanager.com/gtag/js?id=" + site_1.GA_MEASUREMENT_ID;
            document.head.appendChild(s1);
            var s2 = document.createElement("script");
            s2.innerHTML = "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '" + site_1.GA_MEASUREMENT_ID + "', { anonymize_ip: true });";
            document.head.appendChild(s2);
        };
        var hasAnalyticsConsent = function () {
            var _a;
            try {
                var raw = window.localStorage.getItem("cookie:consent");
                if (!raw)
                    return false;
                var parsed = JSON.parse(raw);
                return !!((_a = parsed === null || parsed === void 0 ? void 0 : parsed.prefs) === null || _a === void 0 ? void 0 : _a.analytics);
            }
            catch (_b) {
                return false;
            }
        };
        if (hasAnalyticsConsent()) {
            inject();
        }
        else {
            var onConsent_1 = function (e) {
                var detail = e.detail;
                if (detail === null || detail === void 0 ? void 0 : detail.analytics)
                    inject();
            };
            window.addEventListener("cookie:consent", onConsent_1, {
                once: true
            });
            return function () {
                window.removeEventListener("cookie:consent", onConsent_1);
            };
        }
    }, []);
    return null;
}
exports["default"] = GA4;
