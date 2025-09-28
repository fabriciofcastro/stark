// components/sections/about-section.jsx
"use client";
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var About = function () {
    return (React.createElement("section", { id: "sobre", className: "px-4 py-20 sm:px-6 lg:px-8 reveal" },
        React.createElement("div", { className: "mx-auto max-w-7xl" },
            React.createElement("div", { className: "grid grid-cols-1 items-center gap-12 lg:grid-cols-2" },
                React.createElement("div", null,
                    React.createElement("h3", { className: "mb-6 font-bold text-3xl text-white md:text-4xl" }, "Sobre a STARK"),
                    React.createElement("p", { className: "mb-6 text-gray-300 text-lg" }, "Somos uma empresa especializada em tecnologia da informa\u00E7\u00E3o com foco em infraestrutura, seguran\u00E7a da informa\u00E7\u00E3o, suporte e consultoria estrat\u00E9gica."),
                    React.createElement("p", { className: "mb-8 text-gray-300 text-lg" }, "Atendemos escrit\u00F3rios, empresas, ind\u00FAstrias, centros log\u00EDsticos, cl\u00EDnicas, hospitais, lojas, e-commerces, condom\u00EDnios, escolas e entidades p\u00FAblicas em Itaquaquecetuba e regi\u00E3o."),
                    React.createElement("div", { className: "grid grid-cols-2 gap-6" },
                        React.createElement("div", { className: "text-center" },
                            React.createElement("div", { className: "mb-2 font-bold text-3xl text-gold" }, "15+"),
                            React.createElement("div", { className: "text-gray-300" }, "Anos de Experi\u00EAncia")),
                        React.createElement("div", { className: "text-center" },
                            React.createElement("div", { className: "mb-2 font-bold text-3xl text-gold" }, "500+"),
                            React.createElement("div", { className: "text-gray-300" }, "Clientes Satisfeitos")))),
                React.createElement("div", { className: "relative" },
                    React.createElement("div", { className: "rounded-2xl border border-white/20 bg-gold/10 p-8 backdrop-blur-md" },
                        React.createElement(image_1["default"], { src: "https://placehold.co/1200x800/1e40af/ffffff?text=Equipe+STARK", alt: "Equipe STARK", width: 1200, height: 800, unoptimized: true, className: "h-auto w-full rounded-xl", priority: true })),
                    React.createElement("div", { className: "-bottom-6 -left-6 absolute h-32 w-32 rounded-full bg-gold/10 blur-xl" }),
                    React.createElement("div", { className: "-top-6 -right-6 absolute h-32 w-32 rounded-full bg-gold/10 blur-xl" }))))));
};
exports["default"] = About;
