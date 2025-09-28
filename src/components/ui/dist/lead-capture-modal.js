"use strict";
exports.__esModule = true;
exports.LeadCaptureModal = void 0;
var react_1 = require("react");
function LeadCaptureModal(_a) {
    var open = _a.open, onClose = _a.onClose;
    var dialogRef = react_1.useRef(null);
    var _b = react_1.useState(""), name = _b[0], setName = _b[1];
    var _c = react_1.useState(""), email = _c[0], setEmail = _c[1];
    react_1.useEffect(function () {
        var _a;
        if (!open)
            return;
        var prev = document.activeElement;
        var first = (_a = dialogRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("input, button, [tabindex]:not([tabindex='-1'])");
        first === null || first === void 0 ? void 0 : first.focus();
        return function () { return prev === null || prev === void 0 ? void 0 : prev.focus(); };
    }, [open]);
    if (!open)
        return null;
    return (React.createElement("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "lead-modal-title", className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4", onClick: function (e) {
            if (e.target === e.currentTarget)
                onClose();
        }, onKeyDown: function (e) {
            if (e.key === "Escape" || e.key === "Enter") {
                onClose();
            }
        }, tabIndex: -1 },
        React.createElement("div", { ref: dialogRef, className: "w-full max-w-md rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md gold-border-animated" },
            React.createElement("h2", { id: "lead-modal-title", className: "mb-2 text-xl font-semibold text-white" }, "Solicite um or\u00E7amento"),
            React.createElement("p", { className: "mb-4 text-sm text-gray-200" }, "Deixe seus dados e retornaremos rapidamente."),
            React.createElement("form", { className: "space-y-3", onSubmit: function (e) {
                    e.preventDefault();
                    var text = encodeURIComponent("Or\u00E7amento\n\nNome: " + name + "\nEmail: " + email);
                    window.open("https://wa.me/5511994396469?text=" + text, "_blank");
                    onClose();
                } },
                React.createElement("div", { className: "relative" },
                    React.createElement("input", { id: "lead-name", className: "peer w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))]", placeholder: " ", value: name, onChange: function (e) { return setName(e.target.value); }, required: true }),
                    React.createElement("label", { htmlFor: "lead-name", className: "pointer-events-none absolute left-3 top-2 text-sm text-gray-200 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-focus:px-1 peer-focus:bg-[hsl(var(--brand-green-800))] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-[hsl(var(--brand-green-800))]" }, "Nome")),
                React.createElement("div", { className: "relative" },
                    React.createElement("input", { id: "lead-email", type: "email", className: "peer w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))]", placeholder: " ", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true }),
                    React.createElement("label", { htmlFor: "lead-email", className: "pointer-events-none absolute left-3 top-2 text-sm text-gray-200 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-focus:px-1 peer-focus:bg-[hsl(var(--brand-green-800))] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-[hsl(var(--brand-green-800))]" }, "Email")),
                React.createElement("div", { className: "mt-4 flex gap-3" },
                    React.createElement("button", { type: "submit", className: "rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90 btn-shimmer" }, "Pedir or\u00E7amento"),
                    React.createElement("button", { type: "button", className: "rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10", onClick: onClose }, "Fechar"))))));
}
exports.LeadCaptureModal = LeadCaptureModal;
