"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function RevealOnScroll() {
    react_1.useEffect(function () {
        if (typeof window === "undefined")
            return;
        var elements = Array.from(document.querySelectorAll(".reveal"));
        if (elements.length === 0)
            return;
        var io = new IntersectionObserver(function (entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            }
        }, { threshold: 0.15 });
        elements.forEach(function (el) {
            io.observe(el);
        });
        return function () { return io.disconnect(); };
    }, []);
    return null;
}
exports["default"] = RevealOnScroll;
