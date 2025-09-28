import http from "http";

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

const cases = [
  { path: "/contato", expect: "/contact" },
  { path: "/contato/", expect: "/contact" },
  { path: "/contato/qualquer", expect: "/contact" },
];

function normalizePathFromLocation(location) {
  try {
    if (!location) return "";
    if (location.startsWith("http")) {
      const u = new URL(location);
      return u.pathname + (u.search || "");
    }
    return location;
  } catch {
    return location;
  }
}

async function check(path, expect) {
  const once = () =>
    new Promise((resolve) => {
      const req = http.request(
        { host: HOST, port: PORT, path, method: "GET" },
        (res) => {
          const loc = normalizePathFromLocation(res.headers.location || "");
          const ok =
            res.statusCode &&
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            loc.endsWith(expect);
          resolve({ path, status: res.statusCode, location: loc, ok });
        },
      );
      req.on("error", (err) =>
        resolve({ path, status: 0, location: "", ok: false, err: String(err) }),
      );
      req.end();
    });

  // first try
  let r = await once();
  if (r.ok) return r;
  // follow one hop if it redirected somewhere diferente do esperado
  if (r.status && r.status >= 300 && r.status < 400 && r.location) {
    const hopPath = normalizePathFromLocation(r.location);
    const r2 = await new Promise((resolve) => {
      const req2 = http.request(
        { host: HOST, port: PORT, path: hopPath, method: "GET" },
        (res2) => {
          const loc2 = normalizePathFromLocation(res2.headers.location || "");
          const ok2 =
            res2.statusCode &&
            res2.statusCode >= 300 &&
            res2.statusCode < 400 &&
            loc2.endsWith(expect);
          resolve({
            path,
            status: res2.statusCode,
            location: loc2,
            ok: ok2,
            hop: hopPath,
          });
        },
      );
      req2.on("error", (err) =>
        resolve({
          path,
          status: 0,
          location: "",
          ok: false,
          err: String(err),
          hop: hopPath,
        }),
      );
      req2.end();
    });
    return r2;
  }
  return r;
}

const results = await Promise.all(cases.map((c) => check(c.path, c.expect)));
let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(
    `${r.ok ? "✔" : "✖"} ${r.path} -> ${r.location} (status ${r.status})`,
  );
}
if (failed) {
  console.error(`Redirect checks failed: ${failed}/${results.length}`);
  process.exit(1);
}
console.log("All redirects OK");
