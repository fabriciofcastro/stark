"use client";
"use strict";
exports.__esModule = true;
exports.HeroCarousel = void 0;
var image_1 = require("next/image");
var react_1 = require("react");
var button_1 = require("./button");
function HeroCarousel(_a) {
    var slides = _a.slides, _b = _a.intervalMs, intervalMs = _b === void 0 ? 6000 : _b, className = _a.className, _c = _a.mode, mode = _c === void 0 ? "background" : _c, _d = _a.parallax, parallax = _d === void 0 ? false : _d, _e = _a.parallaxStrength, parallaxStrength = _e === void 0 ? 40 : _e;
    var _f = react_1.useState(0), index = _f[0], setIndex = _f[1];
    var _g = react_1.useState(true), auto = _g[0], setAuto = _g[1];
    var imgRef = react_1.useRef(null);
    var _h = react_1.useState(0), imgOffsetY = _h[0], setImgOffsetY = _h[1];
    var rafRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (!auto)
            return;
        var id = setInterval(function () { return setIndex(function (i) { return (i + 1) % slides.length; }); }, intervalMs);
        return function () { return clearInterval(id); };
    }, [auto, slides.length, intervalMs]);
    var go = function (i) {
        setIndex(function (prev) {
            var next = (i + slides.length) % slides.length;
            return next === prev ? prev : next;
        });
        setAuto(false);
    };
    var current = slides[index];
    react_1.useEffect(function () {
        if (mode !== "split" || !parallax)
            return;
        var onScroll = function () {
            if (rafRef.current)
                cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(function () {
                var el = imgRef.current;
                if (!el)
                    return;
                var rect = el.getBoundingClientRect();
                var viewportH = window.innerHeight || 1;
                var center = rect.top + rect.height / 2;
                var delta = (center - viewportH / 2) / viewportH;
                var translate = Math.max(-parallaxStrength, Math.min(parallaxStrength, -delta * parallaxStrength * 2));
                setImgOffsetY(translate);
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return function () {
            window.removeEventListener("scroll", onScroll);
            if (rafRef.current)
                cancelAnimationFrame(rafRef.current);
        };
    }, [mode, parallax, parallaxStrength]);
    if (mode === "split") {
        return (React.createElement("section", { "aria-label": "Destaques do site", className: className },
            React.createElement("div", { className: "grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2" },
                React.createElement("div", { className: "order-2 md:order-1 px-4 md:px-0" },
                    React.createElement("div", { className: "max-w-2xl" },
                        React.createElement("div", { className: "h-0.5 w-16 mb-4 bg-[hsl(var(--brand-gold-500))]" }),
                        React.createElement("h2", { className: "mb-3 text-3xl md:text-5xl font-extrabold text-white" }, current.title),
                        React.createElement("p", { className: "mb-6 text-base md:text-xl text-gray-100/95" }, current.subtitle),
                        React.createElement("div", { className: "flex flex-col items-start gap-3 sm:flex-row sm:gap-4" },
                            current.ctaPrimary && (React.createElement(button_1.Button, { type: "button", variant: "primary", className: "btn-shimmer", onClick: current.ctaPrimary.onClick }, current.ctaPrimary.label)),
                            current.ctaSecondary && (React.createElement(button_1.Button, { type: "button", variant: "secondary", onClick: current.ctaSecondary.onClick }, current.ctaSecondary.label))))),
                React.createElement("div", { className: "order-1 md:order-2 px-4 md:px-0" },
                    React.createElement("div", { ref: imgRef, className: "relative w-full h-[38vh] min-h-[320px] md:h-[62vh] md:min-h-[520px] rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md will-change-transform", style: parallax
                            ? { transform: "translateY(" + imgOffsetY + "px)" }
                            : undefined },
                        React.createElement(image_1["default"], { src: current.image, alt: current.title, fill: true, sizes: "(min-width: 768px) 50vw, 100vw", className: "object-cover", priority: true, unoptimized: true }),
                        React.createElement("div", { className: "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" })))),
            React.createElement("div", { className: "mt-6 flex items-center justify-center gap-6" },
                React.createElement("button", { type: "button", "aria-label": "Slide anterior", className: "rounded-full bg-white/10 p-3 backdrop-blur-md hover:bg-white/20", onClick: function () { return go(index - 1); } },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", role: "img", "aria-labelledby": "hero-prev-title" },
                        React.createElement("title", { id: "hero-prev-title" }, "Anterior"),
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }))),
                React.createElement("div", { className: "flex gap-3" }, slides.map(function (s, i) { return (React.createElement("button", { key: s.title + "-" + i, "aria-label": "Ir para slide " + (i + 1), className: "transition-all " + (i === index
                        ? "h-1.5 w-5 rounded-full bg-[hsl(var(--brand-gold-500))] shadow-[0_0_0_2px_rgba(0,0,0,0.25)]"
                        : "h-1.5 w-1.5 rounded-full bg-white/40"), onClick: function () { return go(i); }, type: "button" })); })),
                React.createElement("button", { type: "button", "aria-label": "Pr\u00F3ximo slide", className: "rounded-full bg-white/10 p-3 backdrop-blur-md hover:bg-white/20", onClick: function () { return go(index + 1); } },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", role: "img", "aria-labelledby": "hero-next-title" },
                        React.createElement("title", { id: "hero-next-title" }, "Pr\u00F3ximo"),
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }))))));
    }
    return (React.createElement("section", { className: className !== null && className !== void 0 ? className : "relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md", "aria-label": "Destaques do site", onMouseEnter: function () { return setAuto(false); }, onMouseLeave: function () { return setAuto(true); } },
        React.createElement("div", { className: "relative h-[60vh] md:h-[72vh] min-h-[420px] md:min-h-[560px] w-full" },
            React.createElement(image_1["default"], { src: current.image, alt: current.title, fill: true, sizes: "100vw", className: "object-cover", priority: true, unoptimized: true }),
            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 via-black/55 to-black/30" }),
            React.createElement("div", { className: "absolute inset-0 flex items-center justify-center px-6" },
                React.createElement("div", { className: "max-w-4xl w-full text-center md:text-left md:px-6 py-8 rounded-xl bg-black/35 backdrop-blur-sm border border-white/15 animate-fade-in-up" },
                    React.createElement("div", { className: "h-0.5 w-16 mx-auto md:mx-0 mb-4 bg-[hsl(var(--brand-gold-500))]" }),
                    React.createElement("h2", { className: "mb-3 text-3xl md:text-6xl font-extrabold text-white drop-shadow" }, current.title),
                    React.createElement("p", { className: "mx-auto md:mx-0 mb-8 max-w-3xl text-base md:text-xl text-gray-100/95" }, current.subtitle),
                    React.createElement("div", { className: "flex flex-col items-center md:items-start justify-center gap-3 sm:flex-row sm:gap-4" },
                        current.ctaPrimary && (React.createElement(button_1.Button, { type: "button", variant: "primary", className: "btn-shimmer", onClick: current.ctaPrimary.onClick }, current.ctaPrimary.label)),
                        current.ctaSecondary && (React.createElement(button_1.Button, { type: "button", variant: "secondary", onClick: current.ctaSecondary.onClick }, current.ctaSecondary.label)))))),
        React.createElement("button", { type: "button", "aria-label": "Slide anterior", className: "absolute left-2 md:left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-md hover:bg-white/20", onClick: function () { return go(index - 1); } },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", role: "img", "aria-labelledby": "hero-prev-title" },
                React.createElement("title", { id: "hero-prev-title" }, "Anterior"),
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }))),
        React.createElement("button", { type: "button", "aria-label": "Pr\u00F3ximo slide", className: "absolute right-2 md:right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-md hover:bg-white/20", onClick: function () { return go(index + 1); } },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", role: "img", "aria-labelledby": "hero-next-title" },
                React.createElement("title", { id: "hero-next-title" }, "Pr\u00F3ximo"),
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }))),
        React.createElement("div", { className: "absolute bottom-3 left-1/2 z-10 -translate-x-1/2 w-full max-w-4xl px-6" },
            React.createElement("div", { className: "flex justify-center gap-3" }, slides.map(function (s, i) { return (React.createElement("button", { key: s.title + "-" + i, "aria-label": "Ir para slide " + (i + 1), className: "transition-all " + (i === index
                    ? "h-1.5 w-5 rounded-full bg-[hsl(var(--brand-gold-500))] shadow-[0_0_0_2px_rgba(0,0,0,0.25)]"
                    : "h-1.5 w-1.5 rounded-full bg-white/40"), onClick: function () { return go(i); }, type: "button" })); })))));
}
exports.HeroCarousel = HeroCarousel;
exports["default"] = HeroCarousel;
