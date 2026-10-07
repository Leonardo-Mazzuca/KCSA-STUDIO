import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { renderJsonLd, renderSitemap } from "./src/lib/seo/document.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function kcsaSeo(): Plugin {
  const sitemapPath = path.resolve(__dirname, "public/sitemap.xml");
  const writeSitemap = () => writeFileSync(sitemapPath, renderSitemap(), "utf8");

  return {
    name: "kcsa-seo",
    buildStart: writeSitemap,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/sitemap.xml") return next();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/xml; charset=utf-8");
        res.end(renderSitemap());
      });
    },
    transformIndexHtml(html) {
      return html.replace(
        "<!-- KCSA_JSONLD -->",
        `<script type="application/ld+json">${renderJsonLd()}</script>`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), kcsaSeo()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
