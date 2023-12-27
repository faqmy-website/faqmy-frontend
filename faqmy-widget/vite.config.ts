import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: "./src/main.ts",
      output: {
        manualChunks: () => "app",
        entryFileNames: `faqmy-widget-[name].js`,
        chunkFileNames: `faqmy-widget-[name].js`,
        assetFileNames: `faqmy-widget-[name].[ext]`,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    // strictPort: true,
    port: 4177,
    // hmr: {
    //   clientPort: 443,
    //   protocol: "wss",
    // },
  },
});
