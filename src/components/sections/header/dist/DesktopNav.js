"use client";
"use strict";
exports.__esModule = true;
exports.DesktopNav = void 0;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var ServicesDropdown_1 = require("./ServicesDropdown");
var DesktopNav = function (_a) {
    var isServicesOpen = _a.isServicesOpen, openServices = _a.openServices, scheduleCloseServices = _a.scheduleCloseServices, activeAnchor = _a.activeAnchor, setActiveAnchor = _a.setActiveAnchor;
    var pathname = navigation_1.usePathname();
    return (React.createElement("nav", { className: "hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 whitespace-nowrap", "aria-label": "Navega\u00E7\u00E3o principal" },
        React.createElement(ServicesDropdown_1.ServicesDropdown, { isOpen: isServicesOpen, onOpen: openServices, onCloseSchedule: scheduleCloseServices, isActive: activeAnchor === "servicos" || (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/services")) || (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/suporte-tecnico")) || (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/governanca")) || (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/cloud-vps-linux")) || (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/criacao-de-sites")) || (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/cyberseguranca")) || (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/helpdesk")) }),
        React.createElement(link_1["default"], { href: "/blog", className: "text-white link-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] rounded " + ((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/blog")) ? "is-active" : ""), "aria-current": (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/blog")) ? "page" : undefined }, "Blog"),
        React.createElement(link_1["default"], { href: "/#sobre", onClick: function () { return setActiveAnchor("sobre"); }, className: "text-white link-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] rounded " + (pathname === "/" && activeAnchor === "sobre" ? "is-active" : ""), "aria-current": pathname === "/" && activeAnchor === "sobre" ? "page" : undefined }, "Sobre")));
};
exports.DesktopNav = DesktopNav;
