// components/sections/contact-seo.tsx
"use client";
"use strict";
exports.__esModule = true;
exports.ContactSeo = void 0;
var structured_data_1 = require("@/components/seo/structured-data");
exports.ContactSeo = function () {
    var data = structured_data_1.serviceData("Contato", "Fale com a STARK para suporte técnico, consultoria, cloud e segurança. WhatsApp, e‑mail ou formulário com validação e reCAPTCHA.");
    return (React.createElement(React.Fragment, null,
        React.createElement(structured_data_1.JsonLd, { data: data }),
        React.createElement(structured_data_1.JsonLd, { data: structured_data_1.breadcrumbData("Contact", "/contact") })));
};
