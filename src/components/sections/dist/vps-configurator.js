"use client";
"use strict";
exports.__esModule = true;
exports.VpsConfigurator = void 0;
var react_1 = require("react");
var checkbox_1 = require("@/components/ui/checkbox");
var range_1 = require("@/components/ui/range");
function NumberInput(_a) {
    var label = _a.label, value = _a.value, setValue = _a.setValue, min = _a.min, max = _a.max, _b = _a.step, step = _b === void 0 ? 1 : _b, suffix = _a.suffix;
    return (React.createElement(range_1["default"], { label: label, min: min, max: max, step: step, value: value, onChange: function (e) { return setValue(Number(e.target.value)); }, suffix: suffix }));
}
function VpsConfigurator() {
    var _a = react_1.useState(2), vcpu = _a[0], setVcpu = _a[1];
    var _b = react_1.useState(4), ram = _b[0], setRam = _b[1]; // GB
    var _c = react_1.useState(80), disk = _c[0], setDisk = _c[1]; // GB
    var _d = react_1.useState(true), backups = _d[0], setBackups = _d[1];
    var _e = react_1.useState(false), ha = _e[0], setHa = _e[1];
    var estimate = react_1.useMemo(function () {
        // Tabela simples (valores indicativos)
        var base = 25; // gestão e monitoração
        var cpuPrice = vcpu * 12; // por vCPU
        var ramPrice = ram * 2.5; // por GB
        var diskPrice = Math.max(0, disk - 20) * 0.12; // 20GB inclusos
        var backupPrice = backups ? disk * 0.06 + 10 : 0; // storage + operação
        var haPrice = ha ? 30 : 0; // overhead de HA
        var monthly = Math.round((base + cpuPrice + ramPrice + diskPrice + backupPrice + haPrice) * 100) / 100;
        return { monthly: monthly };
    }, [vcpu, ram, disk, backups, ha]);
    return (React.createElement("section", { className: "rounded-xl bg-card p-6 shadow-soft border border-white/10" },
        React.createElement("h2", { className: "mb-3 text-2xl font-semibold text-white" }, "Configurador de VPS"),
        React.createElement("p", { className: "mb-6 text-sm text-gray-200" }, "Ajuste os recursos e veja a estimativa mensal (infra + gest\u00E3o)."),
        React.createElement("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2" },
            React.createElement(NumberInput, { label: "vCPU", value: vcpu, setValue: setVcpu, min: 1, max: 16, suffix: "vCPU" }),
            React.createElement(NumberInput, { label: "Mem\u00F3ria RAM", value: ram, setValue: setRam, min: 1, max: 64, step: 1, suffix: "GB" }),
            React.createElement(NumberInput, { label: "Disco SSD", value: disk, setValue: setDisk, min: 20, max: 500, step: 10, suffix: "GB" }),
            React.createElement(checkbox_1["default"], { id: "cfg-backups", label: "Backups autom\u00E1ticos", checked: backups, onChange: function (e) { return setBackups(e.target.checked); } }),
            React.createElement(checkbox_1["default"], { id: "cfg-ha", label: "Alta disponibilidade (HA)", checked: ha, onChange: function (e) { return setHa(e.target.checked); } })),
        React.createElement("div", { className: "mt-6 flex items-baseline gap-3" },
            React.createElement("span", { className: "text-gray-200" }, "Estimativa:"),
            React.createElement("span", { className: "text-3xl font-bold text-gold" },
                "R$ ",
                estimate.monthly.toFixed(2),
                "/m\u00EAs")),
        React.createElement("div", { className: "mt-6 flex flex-wrap gap-3" },
            React.createElement("a", { href: "https://wa.me/5511994396469?text=Ol\u00E1! Quero este VPS: " + vcpu + " vCPU, " + ram + "GB RAM, " + disk + "GB SSD, backups=" + backups + ", HA=" + ha + ".", className: "rounded-lg bg-gold px-5 py-3 text-sm font-medium text-black hover:opacity-90" }, "Pedir proposta"),
            React.createElement("a", { href: "/contact", className: "rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10" }, "Receber por e-mail"))));
}
exports.VpsConfigurator = VpsConfigurator;
