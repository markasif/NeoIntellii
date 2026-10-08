import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          const normalizedId = id.replace(/\\/g, "/");
          if (
            normalizedId.includes("/node_modules/react/") ||
            normalizedId.includes("/node_modules/react-dom/") ||
            normalizedId.includes("/node_modules/scheduler/")
          ) {
            return "react-vendor";
          }
          if (id.includes("react-router")) return "router-vendor";
          if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) {
            return "motion-vendor";
          }
          if (id.includes("lucide-react")) return "icons-vendor";
          if (id.includes("@radix-ui")) return "radix-vendor";
          if (id.includes("@tanstack")) return "query-vendor";
          if (id.includes("@supabase")) return "supabase-vendor";
          if (id.includes("lenis")) return "lenis-vendor";
          if (id.includes("recharts") || id.includes("d3-")) return "charts-vendor";
          return "vendor";
        },
      },
    },
  },
}));
