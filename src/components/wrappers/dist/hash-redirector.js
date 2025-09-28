"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
function scrollToHash(hash) {
    var id = hash.replace(/^#/, "");
    if (!id)
        return;
    var el = document.getElementById(id);
    if (!el)
        return;
    var header = document.querySelector("header");
    var headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0;
    var rect = el.getBoundingClientRect();
    var y = window.scrollY + rect.top - headerHeight - 8; // pequeno espaçamento
    window.scrollTo({ top: y < 0 ? 0 : y, behavior: "smooth" });
}
function scrollToHashWithRetry(hash, attempts) {
    if (attempts === void 0) { attempts = 16; }
    if (!hash || attempts <= 0)
        return;
    var id = hash.replace(/^#/, "");
    var el = document.getElementById(id);
    if (el) {
        scrollToHash(hash);
        return;
    }
    setTimeout(function () { return scrollToHashWithRetry(hash, attempts - 1); }, 50);
}
function HashRedirector() {
    var pathname = navigation_1.usePathname();
    var router = navigation_1.useRouter();
    // Trata hash presente na URL após navegação de rota (App Router)
    react_1.useEffect(function () {
        if (typeof window === "undefined")
            return;
        var hash = window.location.hash;
        if (!hash)
            return;
        if (hash === "#contato") {
            router.replace("/contact");
            return;
        }
        if (hash === "#sobre") {
            if (pathname !== "/") {
                router.push("/#sobre");
                return;
            }
            // tenta rolar com retry para garantir que o elemento esteja no DOM
            setTimeout(function () { return scrollToHashWithRetry("#sobre"); }, 0);
        }
        else {
            // Para outros hashes na mesma rota
            setTimeout(function () { return scrollToHashWithRetry(hash); }, 0);
        }
    }, [pathname, router]);
    // Ouve alterações de hash dentro da mesma página
    react_1.useEffect(function () {
        if (typeof window === "undefined")
            return;
        var onHashChange = function () {
            if (window.location.hash)
                scrollToHash(window.location.hash);
        };
        window.addEventListener("hashchange", onHashChange);
        return function () { return window.removeEventListener("hashchange", onHashChange); };
    }, []);
    return null;
}
exports["default"] = HashRedirector;
