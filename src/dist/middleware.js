"use strict";
exports.__esModule = true;
exports.config = exports.middleware = void 0;
var server_1 = require("next/server");
function middleware(req) {
    var pathname = req.nextUrl.pathname;
    // Redireciona /contato para /contact
    if (pathname === "/contato" ||
        pathname === "/contato/" ||
        pathname === "/contato//") {
        var url = req.nextUrl.clone();
        url.pathname = "/contact";
        return server_1.NextResponse.redirect(url);
    }
    return server_1.NextResponse.next();
}
exports.middleware = middleware;
exports.config = {
    matcher: ["/contato", "/contato/"]
};
