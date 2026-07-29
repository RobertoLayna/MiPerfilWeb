import { readFileSync, writeFileSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "../dist");
const htmlFile = resolve(dist, "index.html");
let html = readFileSync(htmlFile, "utf-8");

html = html.replace(
  /<link rel="stylesheet" href="([^"]+\.css)">/,
  (_, href) => {
    const url = new URL(href, "http://localhost");
    const file = resolve(dist, url.pathname.replace(/^\//, ""));
    const css = readFileSync(file, "utf-8");
    return `<style>${css}</style>`;
  }
);

writeFileSync(htmlFile, html);
console.log("CSS inlined successfully");
