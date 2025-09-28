"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Button = void 0;
var react_1 = require("react");
// Helper simples para compor classes
var cx = function () {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    return parts.filter(Boolean).join(" ");
};
var Button = react_1.forwardRef(function (_a, ref) {
    var children = _a.children, onClick = _a.onClick, _b = _a.variant, variant = _b === void 0 ? "primary" : _b, _c = _a.size, size = _c === void 0 ? "md" : _c, leading = _a.leading, trailing = _a.trailing, _d = _a.className, className = _d === void 0 ? "" : _d, disabled = _a.disabled, props = __rest(_a, ["children", "onClick", "variant", "size", "leading", "trailing", "className", "disabled"]);
    var baseClasses = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg";
    var sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
    };
    var variants = {
        primary: "bg-[hsl(var(--brand-gold-500))] text-black hover:bg-[hsl(var(--brand-gold-400))] focus-visible:ring-[hsl(var(--brand-gold-500))] focus-visible:ring-offset-[hsl(var(--brand-green-900))] shadow-soft",
        secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 focus-visible:ring-[hsl(var(--brand-gold-500))] focus-visible:ring-offset-[hsl(var(--brand-green-900))]",
        outline: "border-2 border-[hsl(var(--brand-gold-500))] text-[hsl(var(--brand-gold-500))] hover:bg-[hsl(var(--brand-gold-500))]/10 focus-visible:ring-[hsl(var(--brand-gold-500))] focus-visible:ring-offset-[hsl(var(--brand-green-900))]",
        ghost: "bg-transparent text-white/90 hover:bg-white/10 focus-visible:ring-white/50",
        destructive: "bg-[hsl(var(--brand-red-500))] text-white hover:bg-[hsl(var(--brand-red-500))]/90 focus-visible:ring-[hsl(var(--brand-red-500))] focus-visible:ring-offset-[hsl(var(--brand-green-900))] shadow-soft",
        success: "bg-[hsl(var(--brand-green-500))] text-black hover:bg-[hsl(var(--brand-green-600))] focus-visible:ring-[hsl(var(--brand-green-500))] focus-visible:ring-offset-[hsl(var(--brand-green-900))] shadow-soft"
    };
    return (React.createElement("button", __assign({ ref: ref, onClick: onClick, disabled: disabled, className: cx(baseClasses, sizes[size], variants[variant], disabled ? "cursor-not-allowed opacity-60" : "", className) }, props),
        leading && React.createElement("span", { className: "flex items-center" }, leading),
        children,
        trailing && React.createElement("span", { className: "flex items-center" }, trailing)));
});
exports.Button = Button;
Button.displayName = "Button";
exports["default"] = Button;
