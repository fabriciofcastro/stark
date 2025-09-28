// components/layout/footer.jsx
"use client";
"use strict";
exports.__esModule = true;
exports.Footer = void 0;
var link_1 = require("next/link");
var Footer = function () {
    return (React.createElement("footer", { className: "border-white/20 border-t bg-brand-green-900/30 px-4 py-12 backdrop-blur-md sm:px-6 lg:px-8" },
        React.createElement("div", { className: "mx-auto max-w-7xl" },
            React.createElement("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-4" },
                React.createElement("div", { className: "col-span-1 md:col-span-2" },
                    React.createElement("div", { className: "mb-4 flex items-center space-x-2" },
                        React.createElement("div", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-brand-gold-500 ring-2 ring-[hsl(var(--brand-gold-400))]/40" },
                            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                                React.createElement("title", { id: "footer-logo-title" }, "Logotipo STARK"),
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" }))),
                        React.createElement("div", null,
                            React.createElement("h4", { className: "font-bold text-2xl text-white" }, "STARK"),
                            React.createElement("p", { className: "text-brand-gold-500" }, "GEST\u00C3O EM TECNOLOGIA"))),
                    React.createElement("p", { className: "mb-4 text-brand-gray-400" }, "Especialistas em governan\u00E7a e servi\u00E7os de TI, ajudando empresas a transformar sua infraestrutura tecnol\u00F3gica em um ativo estrat\u00E9gico."),
                    React.createElement("p", { className: "text-brand-gray-400 text-sm" }, "\u00A9 2024 STARK Gest\u00E3o em Tecnologia. Todos os direitos reservados.")),
                React.createElement("div", null,
                    React.createElement("h5", { className: "mb-4 font-semibold text-lg text-white" }, "Servi\u00E7os"),
                    React.createElement("ul", { className: "space-y-2" },
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/suporte-tecnico", className: "text-brand-gray-400 link-brand" }, "Suporte T\u00E9cnico")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/cloud-vps-linux", className: "text-brand-gray-400 link-brand" }, "Solu\u00E7\u00F5es em Nuvem")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/governanca", className: "text-brand-gray-400 link-brand" }, "Consultoria Estrat\u00E9gica")),
                        React.createElement("li", null,
                            React.createElement(link_1["default"], { href: "/services", className: "text-brand-gray-400 link-brand" }, "Recupera\u00E7\u00E3o de Dados")))),
                React.createElement("div", null,
                    React.createElement("h5", { className: "mb-4 font-semibold text-lg text-white" }, "Contato"),
                    React.createElement("ul", { className: "space-y-2 text-brand-gray-400" },
                        React.createElement("li", { className: "flex items-start" },
                            React.createElement("svg", { className: "mt-0.5 mr-2 h-5 w-5 text-brand-gold-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", role: "img", "aria-labelledby": "addr-title" },
                                React.createElement("title", { id: "addr-title" }, "Endere\u00E7o"),
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })),
                            "Av. Paulista, 1000",
                            React.createElement("br", null),
                            "Itaquaquecetuba - SP"),
                        React.createElement("li", { className: "flex items-center" },
                            React.createElement("svg", { className: "mr-2 h-5 w-5 text-brand-gold-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", role: "img", "aria-labelledby": "email-title" },
                                React.createElement("title", { id: "email-title" }, "E-mail"),
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })),
                            "contato@starkgestao.com.br"),
                        React.createElement("li", { className: "flex items-center" },
                            React.createElement("svg", { className: "mr-2 h-5 w-5 text-brand-gold-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                                React.createElement("title", { id: "phone-title" }, "Telefone"),
                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" })),
                            "(11) 99439-6469")))),
            React.createElement("div", { className: "mt-8 border-white/20 border-t pt-8 text-center text-brand-gray-400" },
                React.createElement("p", null, "Observabilidade e an\u00E1lise de m\u00E9tricas integradas | Google Analytics | Vercel Analytics"),
                React.createElement("button", { type: "button", onClick: function () {
                        window.dispatchEvent(new Event("cookie:open-preferences"));
                    }, className: "mt-3 rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white hover:bg-white/5" }, "Rever prefer\u00EAncias de cookies")))));
};
exports.Footer = Footer;
