// components/sections/contact-section.jsx
"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var framer_motion_1 = require("framer-motion");
var react_1 = require("react");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var gtag_1 = require("@/lib/gtag");
var button_1 = require("../ui/button");
var toast_1 = require("@/components/ui/toast");
var site_1 = require("@/lib/site");
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
function maskPhone(input) {
    var digits = input.replace(/\D/g, "");
    if (digits.length <= 10) {
        return digits
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .slice(0, 14);
    }
    return digits
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
}
function maskCnpj(input) {
    var digits = input.replace(/\D/g, "").slice(0, 14);
    if (digits.length <= 2)
        return digits;
    if (digits.length <= 5)
        return digits.replace(/(\d{2})(\d+)/, "$1.$2");
    if (digits.length <= 8)
        return digits.replace(/(\d{2})(\d{3})(\d+)/, "$1.$2.$3");
    if (digits.length <= 12)
        return digits.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, "$1.$2.$3/$4");
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*/, "$1.$2.$3/$4-$5");
}
// Removido Field local (substituído por ui/Input com floating)
var SelectField = function (_a) {
    var id = _a.id, label = _a.label, value = _a.value, onChange = _a.onChange, onBlur = _a.onBlur, options = _a.options, error = _a.error, hint = _a.hint, required = _a.required;
    return (React.createElement("div", { className: "relative" },
        React.createElement("select", { id: id, name: id, value: value, onChange: function (e) { return onChange(e.target.value); }, onBlur: onBlur, required: required, className: "w-full appearance-none rounded-lg border bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))] " + (error ? "border-red-500 focus:ring-red-500" : "border-white/20") },
            React.createElement("option", { value: "", className: "bg-slate-800" }, "Selecione um servi\u00E7o"),
            options.map(function (opt) { return (React.createElement("option", { key: opt.value, value: opt.value, className: "bg-slate-800" }, opt.label)); })),
        React.createElement("label", { htmlFor: id, className: "pointer-events-none absolute left-3 -top-2 bg-[hsl(var(--brand-green-800))] px-1 text-xs text-gray-200" },
            label,
            required && React.createElement("span", { className: "text-red-400" }, "*")),
        error && (React.createElement("p", { id: id + "-error", className: "mt-1 text-xs text-red-400" }, error)),
        !error && hint && (React.createElement("p", { id: id + "-hint", className: "mt-1 text-xs text-gray-200" }, hint))));
};
var Contact = function (_a) {
    var _b = _a.showHeading, showHeading = _b === void 0 ? true : _b;
    var _c = react_1.useState(""), name = _c[0], setName = _c[1];
    var _d = react_1.useState(""), email = _d[0], setEmail = _d[1];
    var _e = react_1.useState(""), company = _e[0], setCompany = _e[1];
    var _f = react_1.useState(""), phone = _f[0], setPhone = _f[1];
    var _g = react_1.useState(""), service = _g[0], setService = _g[1];
    var _h = react_1.useState(""), role = _h[0], setRole = _h[1];
    var _j = react_1.useState(""), source = _j[0], setSource = _j[1];
    var _k = react_1.useState(""), companySize = _k[0], setCompanySize = _k[1];
    var _l = react_1.useState("whatsapp"), preferred = _l[0], setPreferred = _l[1];
    var _m = react_1.useState(false), consent = _m[0], setConsent = _m[1];
    var _o = react_1.useState(""), cnpj = _o[0], setCnpj = _o[1];
    var _p = react_1.useState(""), message = _p[0], setMessage = _p[1];
    var _q = react_1.useState(""), objective = _q[0], setObjective = _q[1];
    var _r = react_1.useState([]), needs = _r[0], setNeeds = _r[1];
    var _s = react_1.useState(""), timeframe = _s[0], setTimeframe = _s[1];
    var _t = react_1.useState(""), budget = _t[0], setBudget = _t[1];
    var _u = react_1.useState(false), submitting = _u[0], setSubmitting = _u[1];
    var _v = react_1.useState(false), sent = _v[0], setSent = _v[1];
    var _w = react_1.useState({}), errors = _w[0], setErrors = _w[1];
    var _x = react_1.useState(""), statusMsg = _x[0], setStatusMsg = _x[1];
    var _y = react_1.useState("idle"), statusType = _y[0], setStatusType = _y[1];
    var _z = react_1.useState(0), attempts = _z[0], setAttempts = _z[1];
    var _0 = react_1.useState(null), startTs = _0[0], setStartTs = _0[1];
    var _1 = react_1.useState(false), recaptchaReady = _1[0], setRecaptchaReady = _1[1];
    var validateField = function (field) {
        var res = validate();
        setErrors(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = res[field], _a)));
        });
    };
    var honeyRef = react_1.useRef(null);
    var MESSAGE_MAX = 500;
    var SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    react_1.useEffect(function () {
        if (!SITE_KEY)
            return;
        if (typeof window === "undefined")
            return;
        var w = window;
        if (w.grecaptcha) {
            w.grecaptcha.ready(function () { return setRecaptchaReady(true); });
            return;
        }
        var s = document.createElement("script");
        s.src = "https://www.google.com/recaptcha/api.js?render=" + SITE_KEY;
        s.async = true;
        s.defer = true;
        s.onload = function () {
            var _a;
            var ww = window;
            (_a = ww.grecaptcha) === null || _a === void 0 ? void 0 : _a.ready(function () { return setRecaptchaReady(true); });
        };
        document.head.appendChild(s);
    }, [SITE_KEY]);
    function validate(values) {
        var v = __assign({ name: name,
            email: email,
            company: company,
            phone: phone,
            service: service,
            preferred: preferred,
            consent: consent,
            cnpj: cnpj,
            role: role,
            source: source,
            message: message }, values);
        var e = {};
        if (!v.name || v.name.trim().length < 3)
            e.name = "Informe seu nome completo (mín. 3 caracteres).";
        if (!v.email || !emailRegex.test(v.email))
            e.email = "Informe um e-mail válido.";
        if (!v.company || v.company.trim().length < 2)
            e.company = "Informe o nome da empresa.";
        var digits = (v.phone || "").replace(/\D/g, "");
        if (digits.length < 10)
            e.phone = "Telefone inválido. Use DDD + número.";
        if (!v.service)
            e.service = "Selecione um serviço.";
        if (!objective)
            e.service = e.service || "Informe o objetivo do contato.";
        if (!v.consent)
            e.message = e.message || "Confirme o consentimento de contato.";
        var cnpjDigits = (v.cnpj || "").replace(/\D/g, "");
        if (v.cnpj && cnpjDigits.length > 0 && cnpjDigits.length !== 14)
            e.cnpj = "CNPJ inválido (use 14 dígitos).";
        if (!v.message || v.message.trim().length < 20)
            e.message = "Descreva sua necessidade (mín. 20 caracteres).";
        return e;
    }
    function handleSubmit(e) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var newErrors, now, durationMs, delayMs, token, w, _b, res, evt, _c, text;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (e)
                            e.preventDefault();
                        if ((_a = honeyRef.current) === null || _a === void 0 ? void 0 : _a.value)
                            return [2 /*return*/];
                        newErrors = validate();
                        setErrors(newErrors);
                        if (Object.keys(newErrors).length > 0) {
                            setStatusType("error");
                            setStatusMsg("Verifique os campos destacados.");
                            gtag_1.logEvent("form", "contact_error_validate", "client");
                            return [2 /*return*/];
                        }
                        now = Date.now();
                        if (!startTs)
                            setStartTs(now);
                        durationMs = now - (startTs !== null && startTs !== void 0 ? startTs : now);
                        delayMs = Math.min(attempts * 1000, 5000);
                        if (!(delayMs > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, delayMs); })];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2:
                        setSubmitting(true);
                        setStatusType("info");
                        setStatusMsg("Enviando...");
                        gtag_1.logEvent("form", "contact_submit", "start");
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 6, , 7]);
                        w = window;
                        if (!(SITE_KEY && recaptchaReady && w.grecaptcha)) return [3 /*break*/, 5];
                        return [4 /*yield*/, w.grecaptcha.execute(SITE_KEY, {
                                action: "contact_submit"
                            })];
                    case 4:
                        token = _d.sent();
                        _d.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        _b = _d.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        _d.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, fetch("/api/contact", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    name: name,
                                    email: email,
                                    company: company,
                                    phone: phone,
                                    service: service,
                                    preferred: preferred,
                                    consent: consent,
                                    companySize: companySize,
                                    objective: objective,
                                    needs: needs,
                                    timeframe: timeframe,
                                    budget: budget,
                                    cnpj: cnpj,
                                    role: role,
                                    source: source,
                                    message: message,
                                    durationMs: durationMs,
                                    token: token,
                                    ts: now
                                })
                            })];
                    case 8:
                        res = _d.sent();
                        if (!res.ok)
                            throw new Error("Falha ao enviar");
                        setSubmitting(false);
                        setSent(true);
                        setStatusType("success");
                        setStatusMsg("Mensagem enviada com sucesso.");
                        toast_1.pushToast({
                            type: "success",
                            message: "Mensagem enviada. Você pode iniciar um chat agora."
                        });
                        // Sinaliza para integração com Chatwoot (bridge)
                        try {
                            evt = new CustomEvent("contact:sent", {
                                detail: {
                                    name: name,
                                    email: email,
                                    company: company,
                                    phone: phone,
                                    service: service,
                                    preferred: preferred,
                                    consent: consent,
                                    companySize: companySize,
                                    objective: objective,
                                    needs: needs,
                                    timeframe: timeframe,
                                    budget: budget,
                                    cnpj: cnpj,
                                    role: role,
                                    source: source,
                                    message: message
                                }
                            });
                            window.dispatchEvent(evt);
                        }
                        catch (_e) { }
                        gtag_1.logEvent("form", "contact_success", String(durationMs));
                        return [3 /*break*/, 10];
                    case 9:
                        _c = _d.sent();
                        setSubmitting(false);
                        setAttempts(function (a) { return a + 1; });
                        setStatusType("error");
                        setStatusMsg("Não foi possível enviar. Abrindo WhatsApp...");
                        toast_1.pushToast({
                            type: "error",
                            message: "Falha ao enviar. Redirecionando para WhatsApp."
                        });
                        gtag_1.logEvent("form", "contact_error_request", "fallback_whatsapp");
                        try {
                            text = encodeURIComponent("Contato via site\n\n" +
                                ("Nome: " + name + "\n") +
                                ("Email: " + email + "\n") +
                                ("Empresa: " + company + "\n") +
                                (cnpj ? "CNPJ: " + cnpj + "\n" : "") +
                                (role ? "Cargo/\u00C1rea: " + role + "\n" : "") +
                                ("Telefone: " + phone + "\n") +
                                ("Servi\u00E7o: " + service + "\n") +
                                (objective ? "Objetivo: " + objective + "\n" : "") +
                                ((needs === null || needs === void 0 ? void 0 : needs.length) ? "Necessidades: " + needs.join(", ") + "\n" : "") +
                                (timeframe ? "Prazo: " + timeframe + "\n" : "") +
                                (budget ? "Or\u00E7amento: " + budget + "\n" : "") +
                                (companySize ? "Tamanho da empresa: " + companySize + "\n" : "") +
                                (source ? "Como nos conheceu: " + source + "\n" : "") +
                                (preferred ? "Canal preferido: " + preferred + "\n" : "") +
                                ("\nMensagem:\n" + message));
                            window.open("https://wa.me/5511994396469?text=" + text, "_blank");
                        }
                        catch (_f) { }
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("section", { id: "contato", className: "px-4 py-20 sm:px-6 lg:px-8 reveal" },
        React.createElement("div", { className: "mx-auto max-w-4xl" },
            showHeading && (React.createElement("div", { className: "mb-16 text-center" },
                React.createElement("h3", { className: "mb-4 font-bold text-3xl text-white md:text-4xl" }, "Entre em Contato"),
                React.createElement("p", { className: "text-gray-200 text-xl" }, "Fale conosco e garanta o suporte que sua empresa merece!"))),
            React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35, ease: "easeOut" }, className: "rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md md:p-12" },
                React.createElement("form", { className: "space-y-6", onSubmit: handleSubmit, noValidate: true, onKeyDown: function (e) {
                        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                            handleSubmit();
                        }
                    } },
                    React.createElement("div", { className: "mb-2" },
                        React.createElement("h4", { className: "text-white text-lg font-semibold" }, "Seus dados")),
                    React.createElement("input", { ref: honeyRef, type: "text", className: "hidden", "aria-hidden": "true", tabIndex: -1 }),
                    React.createElement(framer_motion_1.motion.div, { className: "grid grid-cols-1 gap-6 md:grid-cols-2", initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.2 }, variants: {
                            hidden: { opacity: 0, y: 10 },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: { staggerChildren: 0.06 }
                            }
                        } },
                        React.createElement(input_1["default"], { id: "name", label: "Nome Completo", floating: true, value: name, onChange: function (e) {
                                setName(e.target.value);
                                setErrors(function (prev) { return (__assign(__assign({}, prev), { name: undefined })); });
                            }, onBlur: function () { return validateField("name"); }, description: "Informe ao menos 3 caracteres.", required: true, error: errors.name, autoComplete: "name" }),
                        React.createElement(input_1["default"], { id: "email", label: "Email", type: "email", floating: true, value: email, onChange: function (e) {
                                setEmail(e.target.value);
                                setErrors(function (prev) { return (__assign(__assign({}, prev), { email: undefined })); });
                            }, onBlur: function () { return validateField("email"); }, description: "Nunca compartilharemos seu e-mail.", required: true, error: errors.email, autoComplete: "email" })),
                    React.createElement(framer_motion_1.motion.div, { className: "grid grid-cols-1 gap-6 md:grid-cols-2", initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.2 }, variants: {
                            hidden: { opacity: 0, y: 10 },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: { staggerChildren: 0.06 }
                            }
                        } },
                        React.createElement(input_1["default"], { id: "company", label: "Empresa", floating: true, value: company, onChange: function (e) { return setCompany(e.target.value); }, onBlur: function () { return validateField("company"); }, required: true, error: errors.company, autoComplete: "organization" }),
                        React.createElement(input_1["default"], { id: "phone", label: "Telefone", type: "tel", floating: true, value: phone, onChange: function (e) {
                                var m = maskPhone(e.target.value);
                                setPhone(m);
                                setErrors(function (prev) { return (__assign(__assign({}, prev), { phone: undefined })); });
                            }, onBlur: function () { return validateField("phone"); }, description: "Inclua DDD. Ex: (11) 91234-5678.", required: true, error: errors.phone, autoComplete: "tel" })),
                    React.createElement("div", { className: "mt-2" },
                        React.createElement("h4", { className: "text-white text-lg font-semibold" }, "O que voc\u00EA precisa")),
                    React.createElement(SelectField, { id: "service", label: "Servi\u00E7o de Interesse", value: service, onChange: function (v) {
                            setService(v);
                            setErrors(function (prev) { return (__assign(__assign({}, prev), { service: undefined })); });
                        }, onBlur: function () { return validateField("service"); }, hint: "Selecione o assunto principal.", required: true, error: errors.service, options: [
                            { value: "suporte", label: "Suporte Técnico" },
                            { value: "nuvem", label: "Soluções em Nuvem" },
                            { value: "consultoria", label: "Consultoria Estratégica" },
                            { value: "recuperacao", label: "Recuperação de Dados" },
                        ] }),
                    React.createElement(framer_motion_1.motion.div, { className: "grid grid-cols-1 gap-6 md:grid-cols-2", initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.2 }, variants: {
                            hidden: { opacity: 0, y: 10 },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: { staggerChildren: 0.06 }
                            }
                        } },
                        React.createElement(SelectField, { id: "preferred", label: "Canal preferido para resposta", value: preferred, onChange: function (v) { return setPreferred(v); }, options: [
                                { value: "whatsapp", label: "WhatsApp" },
                                { value: "email", label: "E-mail" },
                                { value: "telefone", label: "Telefone" },
                            ], hint: "Escolha como deseja ser contatado." }),
                        React.createElement(SelectField, { id: "companySize", label: "Tamanho da empresa", value: companySize, onChange: function (v) { return setCompanySize(v); }, options: [
                                { value: "1-10", label: "1–10 colaboradores" },
                                { value: "11-50", label: "11–50 colaboradores" },
                                { value: "51-200", label: "51–200 colaboradores" },
                                { value: "200+", label: "200+ colaboradores" },
                            ], hint: "Opcional, ajuda a adequar a proposta." })),
                    React.createElement("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2" },
                        React.createElement(input_1["default"], { id: "cnpj", label: "CNPJ (opcional)", floating: true, value: cnpj, onChange: function (e) {
                                var m = maskCnpj(e.target.value);
                                setCnpj(m);
                                setErrors(function (prev) { return (__assign(__assign({}, prev), { cnpj: undefined })); });
                            }, onBlur: function () { return validateField("cnpj"); }, error: errors.cnpj, inputMode: "numeric", autoComplete: "off" }),
                        React.createElement(input_1["default"], { id: "role", label: "Cargo/\u00C1rea (opcional)", floating: true, value: role, onChange: function (e) { return setRole(e.target.value); }, autoComplete: "organization-title" })),
                    React.createElement("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2" },
                        React.createElement(SelectField, { id: "source", label: "Como nos conheceu? (opcional)", value: source, onChange: function (v) { return setSource(v); }, options: [
                                { value: "google", label: "Google" },
                                { value: "indicacao", label: "Indicação" },
                                { value: "anuncio", label: "Anúncio" },
                                { value: "redes", label: "Redes sociais" },
                                { value: "outro", label: "Outro" },
                            ] })),
                    React.createElement("div", { className: "mt-2" },
                        React.createElement("h4", { className: "text-white text-lg font-semibold" }, "Detalhes do projeto")),
                    React.createElement(framer_motion_1.motion.div, { className: "grid grid-cols-1 gap-6 md:grid-cols-3", initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.2 }, variants: {
                            hidden: { opacity: 0, y: 10 },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: { staggerChildren: 0.06 }
                            }
                        } },
                        React.createElement(SelectField, { id: "objective", label: "Objetivo principal", value: objective, onChange: function (v) { return setObjective(v); }, options: [
                                { value: "suporte", label: "Suporte contínuo" },
                                { value: "projeto", label: "Projeto pontual" },
                                { value: "diagnostico", label: "Auditoria/diagnóstico" },
                                { value: "site", label: "Website / Landing page" },
                            ], hint: "Selecione uma op\u00E7\u00E3o", required: true, error: errors.service && !objective
                                ? "Informe o objetivo"
                                : undefined }),
                        React.createElement(SelectField, { id: "timeframe", label: "Prazo desejado", value: timeframe, onChange: function (v) { return setTimeframe(v); }, options: [
                                { value: "agil", label: "Imediato / 2 semanas" },
                                { value: "1-3m", label: "1–3 meses" },
                                { value: "3m+", label: "> 3 meses" },
                            ], hint: "Ajuda a priorizar seu atendimento" }),
                        React.createElement(SelectField, { id: "budget", label: "Or\u00E7amento estimado", value: budget, onChange: function (v) { return setBudget(v); }, options: [
                                { value: "to-3k", label: "Até R$ 3 mil" },
                                { value: "3-10k", label: "R$ 3–10 mil" },
                                { value: "10-30k", label: "R$ 10–30 mil" },
                                { value: "30k+", label: "> R$ 30 mil" },
                            ], hint: "Estimativa, n\u00E3o vinculante" })),
                    React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.3 } },
                        React.createElement("div", { className: "mb-2 text-sm text-gray-200" }, "Principais necessidades (opcional)"),
                        React.createElement("div", { className: "grid grid-cols-1 gap-2 sm:grid-cols-2" }, [
                            { value: "servicedesk", label: "Service Desk / Help Desk" },
                            { value: "cloud", label: "Cloud / VPS / Linux" },
                            { value: "seguranca", label: "Segurança (Pentest/MDR)" },
                            { value: "governanca", label: "Governança / Conformidade" },
                            { value: "site", label: "Website / SEO / Conversão" },
                        ].map(function (opt) { return (React.createElement("label", { key: opt.value, className: "flex items-center gap-2 text-sm text-gray-200" },
                            React.createElement("input", { type: "checkbox", className: "h-4 w-4 rounded border-white/30 bg-transparent text-gold focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))]", checked: needs.includes(opt.value), onChange: function (e) {
                                    setNeeds(function (curr) {
                                        if (e.target.checked)
                                            return Array.from(new Set(__spreadArrays(curr, [opt.value])));
                                        return curr.filter(function (n) { return n !== opt.value; });
                                    });
                                } }),
                            opt.label)); }))),
                    React.createElement(textarea_1["default"], { id: "message", label: "Mensagem", floating: true, rows: 5, value: message, onChange: function (e) {
                            setMessage(e.target.value);
                            setErrors(function (prev) { return (__assign(__assign({}, prev), { message: undefined })); });
                        }, onBlur: function () { return validateField("message"); }, maxLength: MESSAGE_MAX, required: true, error: errors.message, showCounter: true }),
                    React.createElement(input_1["default"], { id: "briefing_url", label: "Link de arquivos (briefing, doc, drive)", type: "url", floating: true, placeholder: "https://...", onChange: function (e) {
                            var v = e.target.value;
                            try {
                                var raw = window.localStorage.getItem("contactForm");
                                var saved = raw ? JSON.parse(raw) : {};
                                saved.briefingUrl = v;
                                window.localStorage.setItem("contactForm", JSON.stringify(saved));
                            }
                            catch (_a) { }
                        }, description: "Opcional. Envie links para documentos ou pastas de refer\u00EAncia." }),
                    React.createElement("label", { className: "flex items-start gap-2 text-sm text-gray-200" },
                        React.createElement("input", { type: "checkbox", className: "mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-gold focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold-500))]", checked: consent, onChange: function (e) {
                                return setConsent(e.target.checked);
                            } }),
                        React.createElement("span", null, "Autorizo o uso dos meus dados para contato e envio de proposta, conforme LGPD.")),
                    statusType !== "idle" && (React.createElement(framer_motion_1.motion.output, { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, className: "text-sm " + (statusType === "error"
                            ? "text-red-400"
                            : statusType === "success"
                                ? "text-emerald-400"
                                : "text-gray-200"), "aria-live": statusType === "error" ? "assertive" : "polite" }, statusMsg)),
                    sent && (React.createElement("div", { className: "rounded-lg border border-white/15 bg-white/5 p-4 text-sm text-gray-200" },
                        React.createElement("div", { className: "mb-2 flex items-center justify-between gap-2" },
                            React.createElement("div", { className: "font-semibold text-white" }, "Resumo enviado"),
                            React.createElement("div", { className: "flex items-center gap-2" },
                                React.createElement("button", { type: "button", className: "rounded px-2 py-1 text-xs text-white/80 hover:text-white hover:bg-white/10 ring-1 ring-transparent hover:ring-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))]", onClick: function () {
                                        try {
                                            setSent(false);
                                            setStatusType("idle");
                                            setStatusMsg("");
                                            setTimeout(function () {
                                                var el = document.getElementById("name");
                                                el === null || el === void 0 ? void 0 : el.focus();
                                            }, 0);
                                        }
                                        catch (_a) { }
                                    } }, "Editar dados"),
                                React.createElement("button", { type: "button", className: "rounded px-2 py-1 text-xs text-white/80 hover:text-white hover:bg-white/10 ring-1 ring-transparent hover:ring-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))]", onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                                        var summary, _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    _b.trys.push([0, 2, , 3]);
                                                    summary = [
                                                        "Nome: " + name,
                                                        "Email: " + email,
                                                        "Empresa: " + company,
                                                        cnpj ? "CNPJ: " + cnpj : "",
                                                        role ? "Cargo/\u00C1rea: " + role : "",
                                                        "Telefone: " + phone,
                                                        "Servi\u00E7o: " + service,
                                                        objective ? "Objetivo: " + objective : "",
                                                        needs.length
                                                            ? "Necessidades: " + needs.join(", ")
                                                            : "",
                                                        timeframe ? "Prazo: " + timeframe : "",
                                                        budget ? "Or\u00E7amento: " + budget : "",
                                                        companySize ? "Tamanho: " + companySize : "",
                                                        source ? "Origem: " + source : "",
                                                        preferred ? "Canal preferido: " + preferred : "",
                                                    ]
                                                        .filter(Boolean)
                                                        .join("\n");
                                                    return [4 /*yield*/, navigator.clipboard.writeText(summary)];
                                                case 1:
                                                    _b.sent();
                                                    toast_1.pushToast({
                                                        type: "success",
                                                        message: "Resumo copiado."
                                                    });
                                                    return [3 /*break*/, 3];
                                                case 2:
                                                    _a = _b.sent();
                                                    toast_1.pushToast({
                                                        type: "error",
                                                        message: "Não foi possível copiar."
                                                    });
                                                    return [3 /*break*/, 3];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); } }, "Copiar resumo"))),
                        React.createElement("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2" },
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-gray-400" }, "Servi\u00E7o:"),
                                " ",
                                service || "-"),
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-gray-400" }, "Objetivo:"),
                                " ",
                                objective || "-"),
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-gray-400" }, "Prazo:"),
                                " ",
                                timeframe || "-"),
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-gray-400" }, "Or\u00E7amento:"),
                                " ",
                                budget || "-"),
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-gray-400" }, "Tamanho:"),
                                " ",
                                companySize || "-"),
                            React.createElement("li", null,
                                React.createElement("span", { className: "text-gray-400" }, "Canal:"),
                                " ",
                                preferred || "-")))),
                    React.createElement("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2" },
                        React.createElement(framer_motion_1.motion.div, { whileTap: { scale: 0.98 } },
                            React.createElement(button_1.Button, { type: "submit", variant: "primary", className: "w-full cursor-pointer", disabled: submitting }, submitting
                                ? "Enviando..."
                                : sent
                                    ? "Enviado!"
                                    : "Enviar Mensagem")),
                        sent && (React.createElement("button", { type: "button", className: "inline-flex items-center justify-center rounded-lg px-4 py-2 text-white ring-1 ring-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))] cursor-pointer", onClick: function () {
                                var _a;
                                try {
                                    // @ts-expect-error chatwoot global
                                    (_a = window.$chatwoot) === null || _a === void 0 ? void 0 : _a.toggle("open");
                                }
                                catch (_b) { }
                            } }, preferred === "whatsapp"
                            ? "Iniciar chat agora"
                            : "Falar com um atendente")),
                        sent && (React.createElement("a", { href: site_1.MEETING_URL, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center rounded-lg px-4 py-2 text-black bg-gold hover:opacity-90 cursor-pointer text-center" }, "Agendar reuni\u00E3o"))),
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("button", { type: "button", className: "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10 transition-colors cursor-pointer", onClick: function () {
                                setName("");
                                setEmail("");
                                setCompany("");
                                setPhone("");
                                setService("");
                                setObjective("");
                                setNeeds([]);
                                setTimeframe("");
                                setBudget("");
                                setMessage("");
                                setErrors({});
                                setSent(false);
                                setStatusType("idle");
                                setStatusMsg("");
                            } },
                            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true" },
                                React.createElement("path", { d: "M18 7v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12zm-2-3h-1.5l-.71-.71A1 1 0 0 0 13.09 3h-2.18a1 1 0 0 0-.7.29L9.5 4H8a1 1 0 0 0-1 1v1h10V5a1 1 0 0 0-1-1z" })),
                            "Limpar formul\u00E1rio"),
                        React.createElement("span", { className: "text-xs text-gray-500" }, "Ctrl/Cmd + Enter para enviar")))))));
};
exports["default"] = Contact;
