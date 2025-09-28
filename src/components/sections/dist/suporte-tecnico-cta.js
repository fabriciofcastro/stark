// components/sections/suporte-tecnico-cta.tsx
"use client";
"use strict";
exports.__esModule = true;
exports.SuporteTecnicoCta = void 0;
var link_1 = require("next/link");
var gtag_1 = require("@/lib/gtag");
exports.SuporteTecnicoCta = function () {
    return (React.createElement("div", { className: "mt-6 flex flex-wrap gap-3" },
        React.createElement(link_1["default"], { href: "https://wa.me/5511994396469", className: "rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90", onClick: function () { return gtag_1.logEvent("cta", "whatsapp_click", "suporte_tecnico"); } }, "Falar no WhatsApp"),
        React.createElement(link_1["default"], { href: "/contact", className: "rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10", onClick: function () { return gtag_1.logEvent("cta", "diagnostico_click", "suporte_tecnico"); } }, "Solicitar diagn\u00F3stico")));
};
