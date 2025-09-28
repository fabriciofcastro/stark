"use client";
"use strict";
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
exports.__esModule = true;
exports.ContactChatwootBridge = void 0;
var react_1 = require("react");
// import { CHATWOOT_BASE_URL } from "@/lib/site";
exports.ContactChatwootBridge = function () {
    var _a = react_1.useState(null), lastPayload = _a[0], setLastPayload = _a[1];
    react_1.useEffect(function () {
        var onSent = function (e) {
            var detail = e.detail;
            setLastPayload(detail);
            try {
                // Identifica o usuário no widget (quando disponível)
                // @ts-expect-error chatwoot global
                if (window.$chatwoot) {
                    // @ts-expect-error chatwoot global
                    window.$chatwoot.setUser(detail.email || detail.phone || detail.name || "lead", {
                        email: detail.email,
                        name: detail.name,
                        avatar_url: undefined,
                        phone_number: detail.phone,
                        company: detail.company,
                        metadata: {
                            service: detail.service,
                            objective: detail.objective,
                            needs: detail.needs,
                            timeframe: detail.timeframe,
                            budget: detail.budget,
                            companySize: detail.companySize,
                            source: detail.source,
                            preferred: detail.preferred
                        }
                    });
                }
            }
            catch (_a) { }
        };
        window.addEventListener("contact:sent", onSent);
        return function () {
            return window.removeEventListener("contact:sent", onSent);
        };
    }, []);
    react_1.useEffect(function () {
        if (!lastPayload)
            return;
        // Mostra um atalho visual para abrir o chat já identificado
        try {
            // @ts-expect-error chatwoot global
            var api = window.$chatwoot;
            if (api) {
                api.toggle("open");
            }
        }
        catch (_a) { }
        // Envia nota e tags via API privada
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, data, _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("/api/chatwoot/lead", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(lastPayload)
                            })];
                    case 1:
                        res = _d.sent();
                        return [4 /*yield*/, res.json()["catch"](function () { return ({}); })];
                    case 2:
                        data = (_d.sent());
                        if (res.ok && (data === null || data === void 0 ? void 0 : data.conversationId)) {
                            // opcional: exibir protocolo para o usuário
                            try {
                                // @ts-expect-error chatwoot global
                                (_c = (_b = window.$chatwoot) === null || _b === void 0 ? void 0 : _b.setCustomAttributes) === null || _c === void 0 ? void 0 : _c.call(_b, {
                                    last_protocol: (data === null || data === void 0 ? void 0 : data.protocol) || String(data.conversationId)
                                });
                            }
                            catch (_e) { }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _d.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
    }, [lastPayload]);
    return null;
};
