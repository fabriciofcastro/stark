"use client";
"use strict";
exports.__esModule = true;
var embla_carousel_react_1 = require("embla-carousel-react");
var image_1 = require("next/image");
var react_1 = require("react");
var button_1 = require("./button");
function HeroEmbla(_a) {
    var slides = _a.slides;
    var _b = embla_carousel_react_1["default"]({
        loop: true,
        duration: 18,
        align: "center"
    }), emblaRef = _b[0], embla = _b[1];
    var _c = react_1.useState(0), selectedIndex = _c[0], setSelectedIndex = _c[1];
    var total = slides.length;
    var _d = react_1.useState(false), userPaused = _d[0], setUserPaused = _d[1];
    var _e = react_1.useState(0), progress = _e[0], setProgress = _e[1];
    var lastRef = react_1.useRef(0);
    var elapsedRef = react_1.useRef(0);
    var _f = react_1.useState(0), parallaxY = _f[0], setParallaxY = _f[1];
    var scrollPrev = react_1.useCallback(function () { return embla === null || embla === void 0 ? void 0 : embla.scrollPrev(); }, [embla]);
    var scrollNext = react_1.useCallback(function () { return embla === null || embla === void 0 ? void 0 : embla.scrollNext(); }, [embla]);
    react_1.useEffect(function () {
        if (!embla)
            return;
        var onSelect = function () {
            setSelectedIndex(embla.selectedScrollSnap());
            // reinicia progresso ao trocar de slide
            elapsedRef.current = 0;
            setProgress(0);
        };
        embla.on("select", onSelect);
        onSelect();
        var media = window.matchMedia("(prefers-reduced-motion: reduce)");
        var raf = null;
        var AUTOPLAY_MS = 6000;
        var tick = function (now) {
            if (!lastRef.current)
                lastRef.current = now;
            var delta = now - lastRef.current;
            lastRef.current = now;
            if (!userPaused && !media.matches) {
                elapsedRef.current += delta;
                var ratio = Math.min(1, elapsedRef.current / AUTOPLAY_MS);
                setProgress(ratio);
                if (elapsedRef.current >= AUTOPLAY_MS) {
                    embla.scrollNext();
                    elapsedRef.current = 0;
                    setProgress(0);
                }
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        var root = embla.rootNode();
        var stop = function () { return setUserPaused(true); };
        var start = function () { return setUserPaused(false); };
        root.addEventListener("mouseenter", stop);
        root.addEventListener("mouseleave", start);
        var onVisibility = function () {
            if (document.hidden)
                setUserPaused(true);
            else
                setUserPaused(false);
        };
        document.addEventListener("visibilitychange", onVisibility);
        // Parallax sutil no eixo Y (respeita reduced-motion)
        var onScroll = function () {
            if (media.matches) {
                setParallaxY(0);
                return;
            }
            var p = embla.scrollProgress();
            var frac = p - Math.floor(p);
            setParallaxY((frac - 0.5) * 10); // ~±5px
        };
        embla.on("scroll", onScroll);
        onScroll();
        return function () {
            if (raf)
                cancelAnimationFrame(raf);
            root.removeEventListener("mouseenter", stop);
            root.removeEventListener("mouseleave", start);
            document.removeEventListener("visibilitychange", onVisibility);
            embla.off("select", onSelect);
            embla.off("scroll", onScroll);
        };
    }, [embla, userPaused]);
    // Prefetch da próxima imagem para troca suave
    react_1.useEffect(function () {
        var _a;
        if (typeof window === "undefined")
            return;
        var next = (selectedIndex + 1) % total;
        var url = (_a = slides[next]) === null || _a === void 0 ? void 0 : _a.image;
        if (!url)
            return;
        var img = new window.Image();
        img.src = url;
    }, [selectedIndex, total, slides]);
    return (React.createElement("section", { className: "relative w-full", "aria-label": "Destaques do site", onKeyDown: function (e) {
            if (e.key === "ArrowLeft")
                scrollPrev();
            if (e.key === "ArrowRight")
                scrollNext();
        } },
        React.createElement("div", { className: "overflow-hidden rounded-none border-0", ref: emblaRef },
            React.createElement("div", { className: "flex touch-pan-y" }, slides.map(function (s, idx) { return (React.createElement("div", { className: "min-w-0 flex-[0_0_100%]", key: s.title + "-" + idx },
                React.createElement("div", { className: "relative w-full h-[65svh] md:h-[72svh] lg:h-[78svh] xl:h-[82svh] min-h-[520px] max-h-[820px]" },
                    React.createElement("div", { className: "absolute inset-0 will-change-transform", style: { transform: "translateY(" + parallaxY + "px)" }, "aria-hidden": "true" },
                        React.createElement(image_1["default"], { src: s.image, alt: s.title, fill: true, sizes: "100vw", className: "object-cover", style: {
                                objectPosition: s
                                    .objectPosition || "50% 50%"
                            }, priority: idx === 0, unoptimized: true })),
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" }),
                    React.createElement("div", { className: "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" }),
                    React.createElement("div", { className: "absolute inset-0 flex items-center px-6 md:px-10 pl-16 pr-16 md:pl-24 md:pr-24 pb-16 md:pb-20" },
                        React.createElement("div", { className: "max-w-3xl" },
                            React.createElement("div", { className: "h-0.5 w-16 mb-5 bg-[hsl(var(--brand-gold-500))]" }),
                            React.createElement("h2", { className: "mb-5 text-[clamp(32px,5.5vw,64px)] font-black tracking-tight leading-tight text-white", style: {
                                    textShadow: "0 2px 16px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.8)"
                                } }, s.title),
                            React.createElement("p", { className: "mb-10 max-w-[44ch] text-[clamp(14px,1.4vw,20px)] leading-relaxed text-white/90" }, s.subtitle),
                            React.createElement("div", { className: "flex flex-col sm:flex-row gap-3" },
                                s.ctaPrimary && (React.createElement(button_1.Button, { variant: "primary", effect: "all", className: "shadow-lg shadow-black/30 hover:translate-y-[0.5px] transition-transform focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] focus-visible:ring-offset-2 focus-visible:ring-offset-black/20", onClick: s.ctaPrimary.onClick }, s.ctaPrimary.label)),
                                s.ctaSecondary && (React.createElement(button_1.Button, { variant: "outline", effect: "reflect", className: "hover:bg-white/10 text-white border-white/20 transition", onClick: s.ctaSecondary.onClick }, s.ctaSecondary.label)))))))); }))),
        React.createElement("div", { className: "absolute inset-x-0 bottom-0 z-40 px-4 md:px-6 pb-4 md:pb-6 pointer-events-none" },
            React.createElement("div", { className: "grid grid-cols-3 items-end gap-3" },
                React.createElement("div", { className: "flex justify-start" },
                    React.createElement(button_1.Button, { type: "button", "aria-label": "Slide anterior", variant: "secondary", effect: "all", size: "sm", className: "pointer-events-auto rounded-full border border-white/30 bg-white/10 p-3 text-white hover:text-[hsl(var(--brand-gold-500))] hover:bg-white/20 hover:border-white/50", onClick: scrollPrev },
                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", role: "img", "aria-labelledby": "he-prev" },
                            React.createElement("title", { id: "he-prev" }, "Anterior"),
                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" })))),
                React.createElement("div", { className: "flex justify-center" },
                    React.createElement(button_1.Button, { type: "button", "aria-label": userPaused ? "Reproduzir" : "Pausar", variant: "secondary", effect: "all", size: "sm", className: "pointer-events-auto rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs text-white/90 hover:bg-white/20", onClick: function () { return setUserPaused(function (p) { return !p; }); }, onKeyDown: function (e) {
                            if (e.key === " ") {
                                e.preventDefault();
                                setUserPaused(function (p) { return !p; });
                            }
                        } }, userPaused ? "Play" : "Pause")),
                React.createElement("div", { className: "flex justify-end" },
                    React.createElement(button_1.Button, { type: "button", "aria-label": "Pr\u00F3ximo slide", variant: "secondary", effect: "all", size: "sm", className: "pointer-events-auto rounded-full border border-white/30 bg-white/10 p-3 text-white hover:text-[hsl(var(--brand-gold-500))] hover:bg-white/20 hover:border-white/50", onClick: scrollNext },
                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", role: "img", "aria-labelledby": "he-next" },
                            React.createElement("title", { id: "he-next" }, "Pr\u00F3ximo"),
                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }))))),
            React.createElement("div", { className: "mt-3" },
                React.createElement("div", { className: "mb-1.5 text-center text-xs text-white/80" },
                    selectedIndex + 1,
                    "/",
                    total),
                React.createElement("div", { className: "group relative mx-auto h-1.5 w-[min(560px,80%)] overflow-hidden rounded-full bg-white/20 border border-white/25 hover:border-[hsl(var(--brand-gold-500))]/40 backdrop-blur-[1px] transition-colors" },
                    React.createElement("div", { className: "absolute inset-y-0 left-0 rounded-full shadow-[0_0_12px_rgba(212,160,23,0.45)] group-hover:shadow-[0_0_16px_rgba(212,160,23,0.6)] transition-[width] duration-150 linear", style: {
                            width: Math.round(progress * 100) + "%",
                            background: "linear-gradient(90deg, hsl(var(--brand-gold-500)), hsl(var(--brand-gold-500)))"
                        }, "aria-hidden": "true" },
                        React.createElement("div", { className: "absolute inset-0 pointer-events-none rounded-full", style: {
                                background: "linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0.15) 45%, rgba(0,0,0,0.06))"
                            } })))))));
}
exports["default"] = HeroEmbla;
