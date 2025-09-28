"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var DEFAULT_PREFS = {
    necessary: true,
    analytics: true,
    marketing: false
};
function CookieConsent() {
    var _a = react_1.useState(false), show = _a[0], setShow = _a[1];
    var _b = react_1.useState(DEFAULT_PREFS), prefs = _b[0], setPrefs = _b[1];
    var _c = react_1.useState(false), configOpen = _c[0], setConfigOpen = _c[1];
    react_1.useEffect(function () {
        try {
            var v = window.localStorage.getItem("cookie:consent");
            if (!v) {
                setShow(true);
                return;
            }
            var parsed = JSON.parse(v);
            setPrefs(parsed.prefs || DEFAULT_PREFS);
            setShow(false);
        }
        catch (_a) {
            setShow(true);
        }
    }, []);
    var save = function (next) {
        try {
            window.localStorage.setItem("cookie:consent", JSON.stringify({ acceptedAt: Date.now(), prefs: next }));
            window.__cookie_prefs =
                next;
            window.dispatchEvent(new CustomEvent("cookie:consent", { detail: next }));
        }
        catch (_a) { }
    };
    var acceptAll = function () {
        var next = { necessary: true, analytics: true, marketing: true };
        setPrefs(next);
        save(next);
        setShow(false);
    };
    var rejectAll = function () {
        var next = { necessary: true, analytics: false, marketing: false };
        setPrefs(next);
        save(next);
        setShow(false);
    };
    // Reabrir via evento global ou botão no rodapé
    react_1.useEffect(function () {
        var openPrefs = function () {
            setShow(true);
            setConfigOpen(true);
        };
        window.addEventListener("cookie:open-preferences", openPrefs);
        return function () {
            return window.removeEventListener("cookie:open-preferences", openPrefs);
        };
    }, []);
    if (!show)
        return null;
    return (React.createElement("div", { className: "fixed bottom-0 left-0 right-0 z-50 border-t border-white/15 bg-[hsl(var(--brand-green-800))]/95 backdrop-blur-md p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.35)]" },
        React.createElement("div", { className: "mx-auto max-w-7xl" },
            React.createElement("h3", { className: "mb-2 text-lg font-semibold text-white" }, "Cookies e Privacidade"),
            React.createElement("p", { className: "mb-4 text-sm text-gray-200" },
                "Utilizamos cookies para melhorar sua experi\u00EAncia, analisar tr\u00E1fego e exibir conte\u00FAdo personalizado. Ao clicar em \"Aceitar todos\", voc\u00EA concorda com o uso de todos os cookies conforme descrito em nossa",
                React.createElement("a", { href: "/politica-de-privacidade", className: "ml-1 underline text-brand-gold-500 hover:text-brand-gold-400" }, "Pol\u00EDtica de Privacidade"),
                "."),
            React.createElement("div", { className: "flex flex-col gap-3 sm:flex-row" },
                React.createElement("button", { type: "button", onClick: acceptAll, className: "rounded-lg bg-gold px-6 py-2 font-medium text-black hover:opacity-90" }, "Aceitar todos"),
                React.createElement("button", { type: "button", onClick: rejectAll, className: "rounded-lg border border-white/20 bg-white/5 px-6 py-2 font-medium text-white hover:bg-white/10" }, "Recusar todos"),
                React.createElement("button", { type: "button", onClick: function () { return setConfigOpen(true); }, className: "rounded-lg border border-white/20 px-6 py-2 font-medium text-white hover:bg-white/5" }, "Configurar prefer\u00EAncias"))),
        configOpen && (React.createElement("div", { className: "fixed inset-0 z-[60] flex items-end justify-center sm:items-center" },
            React.createElement("div", { className: "absolute inset-0 bg-black/50", onClick: function () { return setConfigOpen(false); }, "aria-hidden": true }),
            React.createElement("div", { className: "relative w-full rounded-t-2xl border border-white/15 bg-[hsl(var(--brand-green-900))] p-6 text-white shadow-2xl sm:max-w-lg sm:rounded-2xl" },
                React.createElement("h4", { className: "text-lg font-semibold" }, "Prefer\u00EAncias de Cookies"),
                React.createElement("p", { className: "mt-1 text-sm text-gray-300" }, "Escolha quais categorias de cookies deseja permitir. Cookies necess\u00E1rios s\u00E3o essenciais para o funcionamento do site."),
                React.createElement("div", { className: "mt-4 space-y-3 text-sm" },
                    React.createElement("label", { className: "flex items-start gap-3" },
                        React.createElement("input", { type: "checkbox", className: "mt-1", checked: true, readOnly: true, "aria-readonly": true }),
                        React.createElement("span", null,
                            React.createElement("span", { className: "font-medium" }, "Necess\u00E1rios"),
                            React.createElement("span", { className: "block text-gray-300" }, "Essenciais para recursos b\u00E1sicos como navega\u00E7\u00E3o e seguran\u00E7a."))),
                    React.createElement("label", { className: "flex items-start gap-3" },
                        React.createElement("input", { type: "checkbox", className: "mt-1", checked: prefs.analytics, onChange: function (e) {
                                return setPrefs(__assign(__assign({}, prefs), { analytics: e.target.checked }));
                            } }),
                        React.createElement("span", null,
                            React.createElement("span", { className: "font-medium" }, "Anal\u00EDticos"),
                            React.createElement("span", { className: "block text-gray-300" }, "Ajudam a entender o uso do site para melhor\u00E1-lo."))),
                    React.createElement("label", { className: "flex items-start gap-3" },
                        React.createElement("input", { type: "checkbox", className: "mt-1", checked: prefs.marketing, onChange: function (e) {
                                return setPrefs(__assign(__assign({}, prefs), { marketing: e.target.checked }));
                            } }),
                        React.createElement("span", null,
                            React.createElement("span", { className: "font-medium" }, "Marketing"),
                            React.createElement("span", { className: "block text-gray-300" }, "Personaliza\u00E7\u00E3o e ofertas relevantes.")))),
                React.createElement("div", { className: "mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end" },
                    React.createElement("button", { type: "button", onClick: function () { return setConfigOpen(false); }, className: "rounded-lg border border-white/20 px-6 py-2 font-medium text-white hover:bg-white/5" }, "Cancelar"),
                    React.createElement("button", { type: "button", onClick: function () {
                            save(__assign(__assign({}, prefs), { necessary: true }));
                            setShow(false);
                        }, className: "rounded-lg bg-gold px-6 py-2 font-medium text-black hover:opacity-90" }, "Salvar prefer\u00EAncias")))))));
}
exports["default"] = CookieConsent;
