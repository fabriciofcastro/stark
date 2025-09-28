"use client";
"use strict";
exports.__esModule = true;
exports.MobileToggle = void 0;
var MobileToggle = function (_a) {
    var isOpen = _a.isOpen, onToggle = _a.onToggle, _b = _a.controlsId, controlsId = _b === void 0 ? "primary-mobile-nav" : _b, buttonRef = _a.buttonRef;
    return (React.createElement("button", { className: "lg:hidden text-white", onClick: onToggle, "aria-label": isOpen ? "Fechar menu" : "Abrir menu", "aria-expanded": isOpen, "aria-controls": controlsId, type: "button", ref: buttonRef },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", role: "img", "aria-labelledby": "menu-title" },
            React.createElement("title", { id: "menu-title" }, isOpen ? "Fechar menu" : "Abrir menu"),
            isOpen ? (React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })) : (React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }))),
        React.createElement("span", { className: "sr-only" },
            isOpen ? "Fechar" : "Abrir",
            " menu")));
};
exports.MobileToggle = MobileToggle;
