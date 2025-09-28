"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function Modal(_a) {
    var open = _a.open, onClose = _a.onClose, title = _a.title, children = _a.children;
    var containerRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (!open)
            return;
        var onKey = function (e) {
            if (e.key === "Escape")
                onClose();
        };
        document.addEventListener("keydown", onKey);
        return function () { return document.removeEventListener("keydown", onKey); };
    }, [open, onClose]);
    if (!open)
        return null;
    return (React.createElement("div", { ref: containerRef, className: "fixed inset-0 z-[70] flex items-center justify-center px-4", "aria-labelledby": "modal-title", role: "dialog", "aria-modal": "true", onMouseDown: function (e) {
            if (e.target === containerRef.current)
                onClose();
        } },
        React.createElement("div", { className: "absolute inset-0 bg-black/60" }),
        React.createElement("div", { className: "relative z-[71] w-full max-w-lg rounded-xl border border-white/15 bg-[hsl(var(--brand-green-800))]/95 backdrop-blur-md shadow-soft" },
            React.createElement("div", { className: "flex items-start justify-between gap-4 border-b border-white/10 p-4" },
                React.createElement("h3", { id: "modal-title", className: "text-lg font-semibold text-white" }, title),
                React.createElement("button", { className: "rounded px-2 py-1 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))]", onClick: onClose, type: "button", "aria-label": "Fechar" }, "\u2715")),
            React.createElement("div", { className: "p-4 text-sm text-gray-200" }, children))));
}
exports["default"] = Modal;
