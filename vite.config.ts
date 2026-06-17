/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT for GitHub Pages: served from https://<user>.github.io/json-tool/
  base: "/json-tool/",
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendors into their own chunks for better caching.
        manualChunks: {
          react: ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
          codemirror: [
            "@uiw/react-codemirror",
            "@codemirror/lang-json",
            "@codemirror/theme-one-dark",
          ],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/test/**",
        "src/main.tsx",
        "src/**/types.ts",
      ],
    },
  },
});
