import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/uniroute/",
  plugins: [react()],
  build: {
    outDir: "docs",
  },
});
