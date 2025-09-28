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
exports.Textarea = void 0;
var react_1 = require("react");
var cx = function () {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    return parts.filter(Boolean).join(" ");
};
var Textarea = react_1.forwardRef(function (_a, ref) {
    var id = _a.id, label = _a.label, _b = _a.floating, floating = _b === void 0 ? true : _b, error = _a.error, description = _a.description, _c = _a.showCounter, showCounter = _c === void 0 ? false : _c, maxLength = _a.maxLength, className = _a.className, _d = _a.size, size = _d === void 0 ? "md" : _d, counterClassName = _a.counterClassName, required = _a.required, value = _a.value, props = __rest(_a, ["id", "label", "floating", "error", "description", "showCounter", "maxLength", "className", "size", "counterClassName", "required", "value"]);
    var autoId = react_1.useId();
    var textareaId = id !== null && id !== void 0 ? id : "textarea-" + autoId;
    var descId = description ? textareaId + "-desc" : undefined;
    var errorId = error ? textareaId + "-error" : undefined;
    var sizes = {
        sm: "px-2 py-2 text-sm",
        md: "px-4 py-3",
        lg: "px-4 py-4 text-lg"
    };
    var baseClasses = cx("w-full bg-white/10 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))] focus:border-transparent", "peer", sizes[size], error ? "border-red-500 focus:ring-red-500" : "", className);
    var labelEl = label && floating ? (React.createElement("label", { htmlFor: textareaId, className: "pointer-events-none absolute left-3 top-2 text-sm text-gray-200 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold peer-focus:px-1 peer-focus:bg-[hsl(var(--brand-green-800))] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-[hsl(var(--brand-green-800))]" },
        label,
        " ",
        required && React.createElement("span", { className: "text-red-400" }, "*"))) : label ? (React.createElement("label", { htmlFor: textareaId, className: "mb-2 block font-medium text-gray-200 text-sm" },
        label,
        " ",
        required && React.createElement("span", { className: "text-red-400" }, "*"))) : null;
    var currentLength = typeof value === "string" || typeof value === "number"
        ? String(value).length
        : 0;
    return (React.createElement("div", { className: floating ? "relative" : undefined },
        floating ? null : labelEl,
        React.createElement("textarea", __assign({ id: textareaId, ref: ref, required: required, "aria-describedby": [descId, errorId].filter(Boolean).join(" ") || undefined, "aria-invalid": !!error, placeholder: floating ? " " : props.placeholder, maxLength: maxLength, className: baseClasses, value: value }, props)),
        floating ? labelEl : null,
        description && !error && (React.createElement("p", { id: descId, className: "mt-1 text-gray-400 text-xs" }, description)),
        error && (React.createElement("p", { id: errorId, role: "alert", className: "mt-1 text-red-500 text-xs" }, typeof error === "string" ? error : "Valor inválido.")),
        showCounter && (React.createElement("div", { className: cx("mt-1 flex items-center justify-end text-xs text-gray-400", counterClassName), "aria-live": "polite" },
            currentLength,
            maxLength ? "/" + maxLength : ""))));
});
exports.Textarea = Textarea;
Textarea.displayName = "Textarea";
exports["default"] = Textarea;
