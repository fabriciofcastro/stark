// components/sections/cyberseguranca-cta.tsx
"use client";
"use strict";
exports.__esModule = true;
exports.CybersegurancaCta = void 0;
var link_1 = require("next/link");
exports.CybersegurancaCta = function () {
    return (React.createElement("div", { className: "mt-6 flex gap-3 text-sm" },
        React.createElement(link_1["default"], { href: "https://wa.me/5511994396469", className: "rounded-lg bg-gold px-5 py-3 font-medium text-black hover:opacity-90" }, "Falar com o SOC"),
        React.createElement(link_1["default"], { href: "/contact", className: "rounded-lg border border-white/30 px-5 py-3 font-medium text-white hover:bg-white/10" }, "Solicitar proposta")));
};
