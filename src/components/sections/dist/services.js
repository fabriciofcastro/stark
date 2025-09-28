// components/sections/services-section.jsx
"use client";
"use strict";
exports.__esModule = true;
var Services = function () {
    return (React.createElement("section", { id: "servicos", className: "py-20 container-px watermark reveal" },
        React.createElement("div", { className: "max-w-7xl mx-auto" },
            React.createElement("div", { className: "text-center mb-16" },
                React.createElement("h3", { className: "text-3xl md:text-4xl font-bold text-white mb-4" }, "Nossos Servi\u00E7os"),
                React.createElement("p", { className: "text-xl text-gray-300 max-w-2xl mx-auto" }, "Oferecemos solu\u00E7\u00F5es completas e especializadas para atender todas as necessidades da sua infraestrutura de TI")),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" }, [
                {
                    title: "Suporte Técnico",
                    icon: (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        React.createElement("title", null, "\u00CDcone de Suporte T\u00E9cnico"),
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }))),
                    description: "Suporte técnico presencial ou remoto para garantir que seus sistemas, equipamentos e redes funcionem corretamente.",
                    services: [
                        "Usuários com lentidão",
                        "Erros sistemáticos e travamentos",
                        "Instalação e configuração de computadores e impressoras",
                        "Redes",
                        "Softwares, antivírus e sistemas operacionais",
                        "Manutenção preventiva e corretiva",
                        "Backups",
                        "Atendimento remoto ou presencial",
                    ]
                },
                {
                    title: "Soluções em Nuvem",
                    icon: (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        React.createElement("title", null, "\u00CDcone de Solu\u00E7\u00F5es em Nuvem"),
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-4.477-5.001A4 4 0 003 15z" }))),
                    description: "Acesso seguro a sistemas, arquivos e dados de qualquer lugar com agilidade, produtividade e segurança para o seu negócio.",
                    services: [
                        "Armazenamento seguro e bem organizado",
                        "Backup automático dos seus dados",
                        "Acesso ao sistema de qualquer lugar",
                        "Redução de custos com infraestrutura física",
                        "Escalabilidade e desempenho profissional",
                        "Conformidade com a LGPD",
                    ]
                },
                {
                    title: "Consultoria Estratégica",
                    icon: (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        React.createElement("title", null, "\u00CDcone de Consultoria Estrat\u00E9gica"),
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }))),
                    description: "Serviço estratégico onde avaliamos, planejamos o uso de tecnologia, melhorando a performance, segurança, eficiência e reduzindo custos.",
                    services: [
                        "Diagnóstico e análise da estrutura de computadores, servidores, rede, sistemas",
                        "Avaliação de riscos e vulnerabilidades",
                        "Planejamento de redes, servidores, backup, VPN e soluções em nuvem",
                        "Desenvolvimento de estratégias para segurança da informação (LGPD)",
                        "Automatização de processos",
                        "Suporte na tomada de decisões tecnológicas e redução de custos",
                        "Acompanhamento técnico em projetos e contratações",
                        "Assistência em auditorias e conformidade técnica e legal",
                    ]
                },
                {
                    title: "Recuperação de Dados",
                    icon: (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        React.createElement("title", null, "\u00CDcone de Recupera\u00E7\u00E3o de Dados"),
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }))),
                    description: "Recuperamos dados de HDs formatados, SSDs, pen drives, cartões de memória, notebooks e outros dispositivos com alta taxas de sucesso.",
                    services: [
                        "HDs formatados ou danificados",
                        "SSDs, pen drives, cartões de memória, notebooks",
                        "Dados apagados, corrompidos ou após formatação",
                        "Sistemas travados ou com falha",
                        "Atendimento com total confidencialidade",
                        "Alta taxa de sucesso",
                    ]
                },
            ].map(function (service) { return (React.createElement("div", { key: service.title, className: "bg-card shadow-soft rounded-xl p-8 border border-white/10 hover:border-brand-gold-500/30 transition-all duration-300 hover:-translate-y-2" },
                React.createElement("div", { className: "w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-brand-gold-500 border border-white/20 bg-brand-green-700/30" }, service.icon),
                React.createElement("h4", { className: "text-xl font-bold text-white mb-3" }, service.title),
                React.createElement("p", { className: "text-brand-gray-300 mb-6" }, service.description),
                React.createElement("ul", { className: "text-sm text-brand-gray-400 space-y-2" }, service.services.map(function (item) { return (React.createElement("li", { key: service.title + "-" + item, className: "flex items-center" },
                    React.createElement("svg", { className: "w-4 h-4 mr-2 text-brand-gold-500", fill: "currentColor", viewBox: "0 0 20 20", "aria-hidden": "true", focusable: "false" },
                        React.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })),
                    item)); })))); })))));
};
exports["default"] = Services;
