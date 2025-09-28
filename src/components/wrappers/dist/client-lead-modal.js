"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lead_capture_modal_1 = require("@/components/ui/lead-capture-modal");
var gtag_1 = require("@/lib/gtag");
function ClientLeadModal() {
    var _a = react_1.useState(false), open = _a[0], setOpen = _a[1];
    react_1.useEffect(function () {
        try {
            var key_1 = "lead_modal_seen";
            if (localStorage.getItem(key_1))
                return;
            var t_1 = setTimeout(function () {
                setOpen(true);
                localStorage.setItem(key_1, "1");
                gtag_1.logEvent("modal", "lead_open", "auto");
            }, 1500);
            return function () { return clearTimeout(t_1); };
        }
        catch (_a) { }
    }, []);
    return (React.createElement(lead_capture_modal_1.LeadCaptureModal, { open: open, onClose: function () {
            setOpen(false);
            gtag_1.logEvent("modal", "lead_close", "user");
        } }));
}
exports["default"] = ClientLeadModal;
