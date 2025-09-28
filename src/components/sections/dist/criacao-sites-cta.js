// components/sections/criacao-sites-cta.tsx
"use client";
"use strict";
exports.__esModule = true;
exports.CriacaoSitesCta = void 0;
var link_1 = require("next/link");
var gtag_1 = require("@/lib/gtag");
exports.CriacaoSitesCta = function () {
    return (React.createElement("div", { className: "mt-6 flex gap-3" },
        React.createElement(link_1["default"], { href: "https://wa.me/5511994396469", className: "rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90", onClick: function () { return gtag_1.logEvent("cta", "whatsapp_click", "criacao_sites"); } }, "Falar no WhatsApp"),
        React.createElement(link_1["default"], { href: "/contact", className: "rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10", onClick: function () { return gtag_1.logEvent("cta", "orcamento_click", "criacao_sites"); } }, "Solicitar or\u00E7amento")));
};
