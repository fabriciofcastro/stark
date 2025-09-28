// components/layout/header.jsx
"use client";
"use strict";
exports.__esModule = true;
exports.Header = void 0;
var framer_motion_1 = require("framer-motion");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var React = require("react");
var index_1 = require("./header/index");
// import { logEvent } from "@/lib/gtag";
var Header = function () {
    var _a = React.useState(false), isMenuOpen = _a[0], setIsMenuOpen = _a[1];
    var _b = React.useState(false), isServicesOpen = _b[0], setIsServicesOpen = _b[1];
    var _c = React.useState(null), activeAnchor = _c[0], setActiveAnchor = _c[1];
    var pathname = navigation_1.usePathname();
    var mobileNavRef = React.useRef(null);
    var toggleButtonRef = React.useRef(null);
    var _d = React.useState(false), isScrolled = _d[0], setIsScrolled = _d[1];
    var closeTimerRef = React.useRef(null);
    var openServices = function () {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setIsServicesOpen(true);
    };
    var scheduleCloseServices = function () {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
        }
        closeTimerRef.current = window.setTimeout(function () {
            setIsServicesOpen(false);
            closeTimerRef.current = null;
        }, 280);
    };
    React.useEffect(function () {
        var onKeyDown = function (e) {
            if (e.key === "Escape")
                setIsMenuOpen(false);
        };
        if (isMenuOpen) {
            document.addEventListener("keydown", onKeyDown);
            // Foca o primeiro elemento focável dentro do menu
            setTimeout(function () {
                var _a;
                var first = (_a = mobileNavRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("a, button, [tabindex]:not([tabindex='-1'])");
                first === null || first === void 0 ? void 0 : first.focus();
            }, 0);
        }
        return function () { return document.removeEventListener("keydown", onKeyDown); };
    }, [isMenuOpen]);
    // Focus trap e restaura foco ao fechar
    React.useEffect(function () {
        var _a, _b, _c, _d;
        if (!isMenuOpen) {
            // Restaurar foco no botão ao fechar
            try {
                // @ts-expect-error: preventScroll not always present in TS lib
                (_b = (_a = toggleButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a, { preventScroll: true });
            }
            catch (_e) {
                (_d = (_c = toggleButtonRef.current) === null || _c === void 0 ? void 0 : _c.focus) === null || _d === void 0 ? void 0 : _d.call(_c);
            }
            return;
        }
        var container = mobileNavRef.current;
        if (!container)
            return;
        var handleKeyDown = function (e) {
            if (e.key !== "Tab")
                return;
            var focusables = container.querySelectorAll("a, button, [tabindex]:not([tabindex='-1'])");
            if (focusables.length === 0)
                return;
            var first = focusables[0];
            var last = focusables[focusables.length - 1];
            var active = document.activeElement;
            if (e.shiftKey) {
                if (active === first || !container.contains(active)) {
                    last.focus();
                    e.preventDefault();
                }
            }
            else {
                if (active === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return function () { return document.removeEventListener("keydown", handleKeyDown); };
    }, [isMenuOpen]);
    // Body scroll lock quando menu móvel estiver aberto
    React.useEffect(function () {
        if (isMenuOpen) {
            document.body.classList.add("overflow-hidden");
        }
        else {
            document.body.classList.remove("overflow-hidden");
        }
        return function () { return document.body.classList.remove("overflow-hidden"); };
    }, [isMenuOpen]);
    React.useEffect(function () {
        var onScroll = function () { return setIsScrolled(window.scrollY > 0); };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return function () { return window.removeEventListener("scroll", onScroll); };
    }, []);
    // Mantém o item ativo do menu de acordo com o hash atual
    React.useEffect(function () {
        var setFromHash = function () {
            var currentHash = window.location.hash.replace("#", "");
            if (currentHash === "servicos" ||
                currentHash === "sobre" ||
                currentHash === "contato") {
                setActiveAnchor(currentHash);
            }
            else {
                setActiveAnchor(null);
            }
        };
        setFromHash();
        window.addEventListener("hashchange", setFromHash);
        return function () { return window.removeEventListener("hashchange", setFromHash); };
    }, []);
    // Limpa âncora ativa ao navegar para páginas diferentes da home
    React.useEffect(function () {
        if (pathname && pathname !== "/") {
            setActiveAnchor(null);
        }
    }, [pathname]);
    var isSolidHeader = isScrolled || (pathname && pathname !== "/");
    var headerClasses = "sticky top-[calc(env(safe-area-inset-top))] z-40 backdrop-blur-md transition-all duration-300 will-change-transform " + (isSolidHeader
        ? "bg-[hsl(var(--brand-green-900))]/90 border-b border-white/20 shadow-lg"
        : "bg-white/10 border-b border-white/20");
    return (React.createElement("header", { className: headerClasses },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40" },
            React.createElement("div", { className: "flex items-center justify-between gap-3 sm:gap-4 py-3 lg:py-4" },
                React.createElement(index_1.Brand, null),
                React.createElement(index_1.MobileToggle, { isOpen: isMenuOpen, onToggle: function () { return setIsMenuOpen(!isMenuOpen); }, buttonRef: toggleButtonRef }),
                React.createElement(index_1.DesktopNav, { isServicesOpen: isServicesOpen, openServices: openServices, scheduleCloseServices: scheduleCloseServices, activeAnchor: activeAnchor, setActiveAnchor: setActiveAnchor }),
                React.createElement("div", { className: "hidden md:flex items-center gap-3" },
                    React.createElement(link_1["default"], { href: "/contact", className: "btn-reflect-sweep btn-border-aurora rounded-lg px-4 py-2 text-white ring-1 ring-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold-500))]" }, "Fale conosco"))),
            React.createElement(framer_motion_1.AnimatePresence, null, isMenuOpen && (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.25, ease: "easeOut" } },
                React.createElement(index_1.MobileMenu, { isOpen: isMenuOpen, onClose: function () { return setIsMenuOpen(false); }, activeAnchor: activeAnchor, pathname: pathname !== null && pathname !== void 0 ? pathname : null, navRef: mobileNavRef }))))),
        pathname === "/" && !isScrolled && (React.createElement("div", { "aria-hidden": "true", className: "gradient-bar" }))));
};
exports.Header = Header;
