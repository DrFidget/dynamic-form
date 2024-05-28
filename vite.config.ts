import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // You can add aliases if needed
      // For example:
      // "@/": path.resolve(__dirname, "src"),
    },
  },
  server: {
    // Specify the host here
    host: '172.19.91.78'
  }
});
