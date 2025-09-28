"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function ReadingProgress() {
    var _a = react_1.useState(0), progress = _a[0], setProgress = _a[1];
    react_1.useEffect(function () {
        var onScroll = function () {
            var doc = document.documentElement;
            var total = doc.scrollHeight - doc.clientHeight;
            var scrolled = total > 0 ? (window.scrollY / total) * 100 : 0;
            setProgress(Math.min(100, Math.max(0, scrolled)));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return function () { return window.removeEventListener("scroll", onScroll); };
    }, []);
    return (React.createElement("div", { className: "fixed inset-x-0 top-0 z-[45] h-1 bg-white/10" },
        React.createElement("div", { className: "h-full bg-[hsl(var(--brand-gold-500))] transition-[width] duration-200", style: { width: progress + "%" } })));
}
exports["default"] = ReadingProgress;
