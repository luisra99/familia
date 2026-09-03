import manifest from "./manifest.json";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig, loadEnv } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import deadFile from "vite-plugin-deadfile";

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return defineConfig({
    base: process.env.ENV_URL,
    plugins: [
      react(),
      VitePWA({
        registerType: "prompt", // o 'autoUpdate' si querés que actualice solo
        injectRegister: "auto",
        workbox: {
          skipWaiting: true,
          clientsClaim: true,
        },
        includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
        manifest: {
          name: "ProSocial",
          short_name: "ProSocial",
          start_url: "/",
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#3b82f6",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
      deadFile({
        root: "src",
        // throwWhenFound: 2,
      }),
    ],
    define: {
      __BUILD_VERSION__: JSON.stringify(obtenerFechaFormato()),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 8080,
    },
    preview: {
      port: 8080,
    },
    envPrefix: "ENV_",
  });
};
const obtenerFechaFormato = () => {
  const ahora = new Date();
  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");
  const hora = String(ahora.getHours()).padStart(2, "0");
  const minuto = String(ahora.getMinutes()).padStart(2, "0");
  return `${año}.${mes}.${dia}.${hora}.${minuto}`;
};
