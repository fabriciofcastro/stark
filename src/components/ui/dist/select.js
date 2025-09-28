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
exports.Select = void 0;
var react_1 = require("react");
var cx = function () {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    return parts.filter(Boolean).join(" ");
};
var Select = react_1.forwardRef(function (_a, ref) {
    var id = _a.id, label = _a.label, _b = _a.floating, floating = _b === void 0 ? false : _b, options = _a.options, error = _a.error, description = _a.description, className = _a.className, _c = _a.size, size = _c === void 0 ? "md" : _c, required = _a.required, value = _a.value, props = __rest(_a, ["id", "label", "floating", "options", "error", "description", "className", "size", "required", "value"]);
    var autoId = react_1.useId();
    var selectId = id !== null && id !== void 0 ? id : "select-" + autoId;
    var descId = description ? selectId + "-desc" : undefined;
    var errorId = error ? selectId + "-error" : undefined;
    var sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-3",
        lg: "px-4 py-3 text-lg"
    };
    var sizeClass = sizes[size] || sizes.md;
    var baseClasses = cx("w-full appearance-none bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))] focus:border-transparent", sizeClass, error ? "border-red-500 focus:ring-red-500" : "", className);
    if (floating && label) {
        return (React.createElement("div", { className: "relative" },
            React.createElement("select", __assign({ id: selectId, ref: ref, required: required, "aria-describedby": [descId, errorId].filter(Boolean).join(" ") || undefined, "aria-invalid": !!error, className: baseClasses, value: value }, props), options.map(function (opt) { return (React.createElement("option", { key: opt.value, value: opt.value, className: "bg-slate-800" }, opt.label)); })),
            React.createElement("label", { htmlFor: selectId, className: "pointer-events-none absolute left-3 -top-2 bg-[hsl(var(--brand-green-800))] px-1 text-xs text-gray-200" },
                label,
                " ",
                required && React.createElement("span", { className: "text-red-400" }, "*")),
            description && !error && (React.createElement("p", { id: descId, className: "mt-1 text-gray-400 text-xs" }, description)),
            error && (React.createElement("p", { id: errorId, role: "alert", className: "mt-1 text-red-500 text-xs" }, typeof error === "string" ? error : "Valor inválido."))));
    }
    return (React.createElement(React.Fragment, null,
        label && (React.createElement("label", { htmlFor: selectId, className: "mb-2 block font-medium text-gray-200 text-sm" },
            label,
            " ",
            required && React.createElement("span", { className: "text-red-400" }, "*"))),
        React.createElement("select", __assign({ id: selectId, ref: ref, required: required, "aria-describedby": [descId, errorId].filter(Boolean).join(" ") || undefined, "aria-invalid": !!error, className: baseClasses, value: value }, props), options.map(function (opt) { return (React.createElement("option", { key: opt.value, value: opt.value, className: "bg-slate-800" }, opt.label)); })),
        description && !error && (React.createElement("p", { id: descId, className: "mt-1 text-gray-400 text-xs" }, description)),
        error && (React.createElement("p", { id: errorId, role: "alert", className: "mt-1 text-red-500 text-xs" }, typeof error === "string" ? error : "Valor inválido."))));
});
exports.Select = Select;
Select.displayName = "Select";
exports["default"] = Select;
