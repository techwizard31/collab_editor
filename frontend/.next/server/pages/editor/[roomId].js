const CHUNK_PUBLIC_PATH = "server/pages/editor/[roomId].js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_03c4cb._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__3f867f._.js");
runtime.loadChunk("server/chunks/ssr/_a0a8a3._.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/pages/editor/[roomId].js [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/pages/_app.js [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
