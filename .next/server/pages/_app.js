const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__c2e274._.js");
runtime.loadChunk("server/chunks/ssr/styles_globals_ff5908.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
