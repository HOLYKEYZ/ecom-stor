import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "src", // keep serving src as app root
  publicDir: "../public", // <-- ensure Vite serves the public/ folder at project root
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    open: false,
    proxy: {
      "https://backend-images-app.onrender.com/api/": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
      "/images": {
        target: "http://localhost:3000/",
      },
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
