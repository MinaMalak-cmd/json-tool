/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path differs per host:
//  - Root-serving hosts (Vercel, Netlify, Cloudflare Pages) need "/" → default.
//  - GitHub Pages serves from a subpath; its Actions workflow sets
//    VITE_BASE_PATH=/json-tool/ to override this default.
const base = process.env.VITE_BASE_PATH ?? "/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
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
