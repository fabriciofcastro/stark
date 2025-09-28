"use client";
"use strict";
exports.__esModule = true;
exports.ServicesDropdown = void 0;
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var React = require("react");
var ServicesDropdown = function (_a) {
    var isOpen = _a.isOpen, onOpen = _a.onOpen, onCloseSchedule = _a.onCloseSchedule, _b = _a.isActive, isActive = _b === void 0 ? false : _b;
    var triggerRef = React.useRef(null);
    var menuRef = React.useRef(null);
    var focusFirstItem = function () {
        var _a;
        var first = (_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("[role='menuitem']");
        first === null || first === void 0 ? void 0 : first.focus();
    };
    var moveFocus = function (direction) {
        var _a, _b, _c;
        var items = Array.from((_b = (_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll("[role='menuitem']")) !== null && _b !== void 0 ? _b : []);
        if (items.length === 0)
            return;
        var active = document.activeElement;
        var idx = Math.max(0, items.findIndex(function (el) { return el === active; }));
        var nextIdx = (idx + direction + items.length) % items.length;
        (_c = items[nextIdx]) === null || _c === void 0 ? void 0 : _c.focus();
    };
    var onTriggerKeyDown = function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
            setTimeout(focusFirstItem, 0);
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            onOpen();
            setTimeout(focusFirstItem, 0);
        }
    };
    var onMenuKeyDown = function (e) {
        var _a;
        if (e.key === "Escape") {
            e.preventDefault();
            (_a = triggerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            onCloseSchedule();
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            moveFocus(1);
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            moveFocus(-1);
        }
        else if (e.key === "Tab") {
            // fecha ao tabular para fora
            onCloseSchedule();
        }
    };
    return (React.createElement("div", { className: "relative" },
        React.createElement(link_1["default"], { href: "/services", className: "text-white link-brand px-2 py-2 rounded " + (isActive ? "is-active" : ""), "aria-haspopup": "menu", "aria-expanded": isOpen, "aria-controls": "services-menu", "aria-current": isActive ? "page" : undefined, onFocus: onOpen, onMouseEnter: onOpen, onMouseLeave: onCloseSchedule, onClick: function (e) {
                // abre o dropdown e permite navegação por clique com Ctrl/Meta para nova aba
                if (!(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)) {
                    e.preventDefault();
                    window.location.href = "/services";
                }
            }, onKeyDown: onTriggerKeyDown, ref: triggerRef }, "Servi\u00E7os"),
        React.createElement(framer_motion_1.AnimatePresence, null, isOpen && (React.createElement(framer_motion_1.motion.div, { id: "services-menu", role: "menu", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 }, transition: { duration: 0.18, ease: "easeOut" }, className: "absolute left-1/2 -translate-x-1/2 mt-3 w-[min(92vw,800px)] rounded-xl gold-border-animated bg-[hsl(var(--brand-green-800))]/95 backdrop-blur-md p-[1px] z-30", onMouseEnter: onOpen, onMouseLeave: onCloseSchedule, onKeyDown: onMenuKeyDown, ref: menuRef },
            React.createElement("div", { className: "rounded-[calc(theme(borderRadius.xl)-1px)] bg-[hsl(var(--brand-green-800))]/95 p-4 shadow-2xl grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-left" },
                React.createElement(link_1["default"], { href: "/suporte-tecnico", role: "menuitem", className: "rounded-lg px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 bg-transparent hover:bg-[hsl(var(--brand-gold-500))]/10 ring-1 ring-transparent hover:ring-[hsl(var(--brand-gold-500))]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] overflow-hidden" },
                    React.createElement("div", { className: "flex items-start gap-3 text-white/90 hover:text-white" },
                        React.createElement(lucide_react_1.LifeBuoy, { className: "h-5 w-5 text-gold", "aria-hidden": "true" }),
                        React.createElement("div", { className: "min-w-0" },
                            React.createElement("div", { className: "font-medium" }, "Suporte T\u00E9cnico"),
                            React.createElement("p", { className: "text-white/70 text-xs line-clamp-2" }, "Atendimento remoto e presencial, dispositivos e usu\u00E1rios.")))),
                React.createElement(link_1["default"], { href: "/governanca", role: "menuitem", className: "rounded-lg px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 bg-transparent hover:bg-[hsl(var(--brand-gold-500))]/10 ring-1 ring-transparent hover:ring-[hsl(var(--brand-gold-500))]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] overflow-hidden" },
                    React.createElement("div", { className: "flex items-start gap-3 text-white/90 hover:text-white" },
                        React.createElement(lucide_react_1.ClipboardList, { className: "h-5 w-5 text-gold", "aria-hidden": "true" }),
                        React.createElement("div", { className: "min-w-0" },
                            React.createElement("div", { className: "font-medium" }, "Governan\u00E7a de TI"),
                            React.createElement("p", { className: "text-white/70 text-xs line-clamp-2" }, "Processos, pol\u00EDticas, riscos e conformidade.")))),
                React.createElement(link_1["default"], { href: "/cloud-vps-linux", role: "menuitem", className: "rounded-lg px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 bg-transparent hover:bg-[hsl(var(--brand-gold-500))]/10 ring-1 ring-transparent hover:ring-[hsl(var(--brand-gold-500))]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] overflow-hidden" },
                    React.createElement("div", { className: "flex items-start gap-3 text-white/90 hover:text-white" },
                        React.createElement(lucide_react_1.Server, { className: "h-5 w-5 text-gold", "aria-hidden": "true" }),
                        React.createElement("div", { className: "min-w-0" },
                            React.createElement("div", { className: "font-medium" }, "Cloud / VPS / Linux"),
                            React.createElement("p", { className: "text-white/70 text-xs line-clamp-2" }, "Provisionamento, hardening, backups e HA.")))),
                React.createElement(link_1["default"], { href: "/criacao-de-sites", role: "menuitem", className: "rounded-lg px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 bg-transparent hover:bg-[hsl(var(--brand-gold-500))]/10 ring-1 ring-transparent hover:ring-[hsl(var(--brand-gold-500))]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] overflow-hidden" },
                    React.createElement("div", { className: "flex items-start gap-3 text-white/90 hover:text-white" },
                        React.createElement(lucide_react_1.Layout, { className: "h-5 w-5 text-gold", "aria-hidden": "true" }),
                        React.createElement("div", { className: "min-w-0" },
                            React.createElement("div", { className: "font-medium" }, "Cria\u00E7\u00E3o de Sites"),
                            React.createElement("p", { className: "text-white/70 text-xs line-clamp-2" }, "SEO t\u00E9cnico, performance e convers\u00E3o.")))),
                React.createElement(link_1["default"], { href: "/cyberseguranca", role: "menuitem", className: "rounded-lg px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 bg-transparent hover:bg-[hsl(var(--brand-gold-500))]/10 ring-1 ring-transparent hover:ring-[hsl(var(--brand-gold-500))]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] overflow-hidden" },
                    React.createElement("div", { className: "flex items-start gap-3 text-white/90 hover:text-white" },
                        React.createElement(lucide_react_1.Shield, { className: "h-5 w-5 text-gold", "aria-hidden": "true" }),
                        React.createElement("div", { className: "min-w-0" },
                            React.createElement("div", { className: "font-medium" }, "Ciberseguran\u00E7a"),
                            React.createElement("p", { className: "text-white/70 text-xs line-clamp-2" }, "Pentest, SOC/MDR e resposta a incidentes.")))),
                React.createElement(link_1["default"], { href: "/helpdesk", role: "menuitem", className: "rounded-lg px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 bg-transparent hover:bg-[hsl(var(--brand-gold-500))]/10 ring-1 ring-transparent hover:ring-[hsl(var(--brand-gold-500))]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] overflow-hidden" },
                    React.createElement("div", { className: "flex items-start gap-3 text-white/90 hover:text-white" },
                        React.createElement(lucide_react_1.Headset, { className: "h-5 w-5 text-gold", "aria-hidden": "true" }),
                        React.createElement("div", { className: "min-w-0" },
                            React.createElement("div", { className: "font-medium" }, "Help Desk"),
                            React.createElement("p", { className: "text-white/70 text-xs line-clamp-2" }, "Chamados, base de conhecimento e status."))))))))));
};
exports.ServicesDropdown = ServicesDropdown;
