"use client";
"use strict";
exports.__esModule = true;
exports.MobileMenu = void 0;
var link_1 = require("next/link");
var MobileMenu = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, activeAnchor = _a.activeAnchor, pathname = _a.pathname, navRef = _a.navRef;
    if (!isOpen)
        return null;
    return (React.createElement("div", { id: "primary-mobile-nav", className: "lg:hidden overflow-hidden border-t border-white/20", tabIndex: -1, ref: navRef },
        React.createElement("nav", { className: "flex flex-col space-y-1 py-3", "aria-label": "Navega\u00E7\u00E3o m\u00F3vel" },
            React.createElement(link_1["default"], { href: "/#servicos", className: "text-white link-brand block px-3 py-3 rounded hover:bg-white/5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] " + (activeAnchor === "servicos" ? "is-active" : ""), "aria-current": activeAnchor === "servicos" ? "page" : undefined, onClick: onClose }, "Servi\u00E7os"),
            React.createElement(link_1["default"], { href: "/#sobre", className: "text-white link-brand block px-3 py-3 rounded hover:bg-white/5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] " + (pathname === "/" && activeAnchor === "sobre" ? "is-active" : ""), "aria-current": pathname === "/" && activeAnchor === "sobre" ? "page" : undefined, onClick: onClose }, "Sobre"),
            React.createElement(link_1["default"], { href: "/contact", className: "text-white link-brand block px-3 py-3 rounded hover:bg-white/5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] " + (pathname === "/contact" ? "is-active" : ""), "aria-current": pathname === "/contact" ? "page" : undefined, onClick: onClose }, "Contato"),
            React.createElement(link_1["default"], { href: "/contact", className: "mt-2 text-center btn-reflect-sweep btn-border-aurora rounded-lg px-4 py-3 text-white ring-1 ring-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))]", onClick: onClose }, "Fale conosco"))));
};
exports.MobileMenu = MobileMenu;
