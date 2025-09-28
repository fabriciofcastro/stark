"use strict";
// components/sections/contact-page-seo.tsx
exports.__esModule = true;
exports.ContactPageSeo = void 0;
var structured_data_1 = require("@/components/seo/structured-data");
exports.ContactPageSeo = function () {
    var contactData = structured_data_1.serviceData("Contato", "Entre em contato com a STARK Gestão em Tecnologia para obter suporte técnico, consultoria em TI, soluções de infraestrutura e segurança da informação em Itaquaquecetuba - SP.");
    return React.createElement(structured_data_1.JsonLd, { data: contactData });
};
