// components/layout/hero.tsx
"use client";
"use strict";
exports.__esModule = true;
var hero_slides_1 = require("@/components/data/hero-slides");
var hero_embla_1 = require("@/components/ui/hero-embla");
var Hero = function () {
    return (React.createElement("section", { className: "relative p-0", "aria-labelledby": "hero-title" },
        React.createElement("div", { className: "w-full" },
            React.createElement(hero_embla_1["default"], { slides: hero_slides_1.heroSlides })),
        React.createElement("div", { "aria-hidden": "true", className: "absolute top-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl -z-10" }),
        React.createElement("div", { "aria-hidden": "true", className: "absolute bottom-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl -z-10" })));
};
exports["default"] = Hero;
