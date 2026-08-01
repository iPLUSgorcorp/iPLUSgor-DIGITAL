import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const requestedBase = process.env.VITE_BASE_PATH || "/";
const base = requestedBase === "/"
  ? "/"
  : `/${requestedBase.replace(/^\/+|\/+$/g, "")}/`;

export default defineConfig({
  base,
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
