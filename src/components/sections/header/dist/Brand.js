"use client";
"use strict";
exports.__esModule = true;
exports.Brand = void 0;
var link_1 = require("next/link");
var Brand = function () {
    return (React.createElement(link_1["default"], { href: "/", className: "flex items-center space-x-2 group", "aria-label": "P\u00E1gina inicial" },
        React.createElement("div", { className: "w-12 h-12 bg-gold ring-2 ring-[hsl(var(--brand-gold-400))]/40 rounded-lg flex items-center justify-center" },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", role: "img", "aria-labelledby": "logo-title" },
                React.createElement("title", { id: "logo-title" }, "Logotipo STARK"),
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" }))),
        React.createElement("div", null,
            React.createElement("h1", { className: "text-2xl font-bold text-white group-hover:text-gold transition-colors" }, "STARK"),
            React.createElement("p", { className: "text-sm text-gold" }, "GEST\u00C3O EM TECNOLOGIA"))));
};
exports.Brand = Brand;
