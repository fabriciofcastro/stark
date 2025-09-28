"use client";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.pushToast = void 0;
var react_1 = require("react");
var pushToastRef = null;
function pushToast(t) {
    pushToastRef === null || pushToastRef === void 0 ? void 0 : pushToastRef(t);
}
exports.pushToast = pushToast;
function Toaster() {
    var _a = react_1.useState([]), toasts = _a[0], setToasts = _a[1];
    react_1.useEffect(function () {
        pushToastRef = function (t) {
            var id = Date.now() + Math.random();
            setToasts(function (prev) { return __spreadArrays(prev, [__assign({ id: id }, t)]); });
            setTimeout(function () {
                setToasts(function (prev) { return prev.filter(function (x) { return x.id !== id; }); });
            }, 4500);
        };
        return function () {
            pushToastRef = null;
        };
    }, []);
    return (React.createElement("div", { className: "fixed inset-x-0 top-3 z-[60] flex flex-col items-center gap-2 px-3" }, toasts.map(function (t) { return (React.createElement("output", { key: t.id, className: "pointer-events-auto max-w-[92vw] rounded-lg border px-4 py-3 text-sm shadow-soft backdrop-blur-md " + (t.type === "success"
            ? "bg-emerald-600/20 border-emerald-400/40 text-emerald-100"
            : t.type === "error"
                ? "bg-red-600/20 border-red-400/40 text-red-100"
                : "bg-slate-600/20 border-white/20 text-white") }, t.message)); })));
}
exports["default"] = Toaster;
