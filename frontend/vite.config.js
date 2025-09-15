import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows access from network
    port: 5173,      // Set default Vite port
  },
  build: {
    outDir: "dist",  // Output folder
    assetsDir: "assets", 
    sourcemap: true, 
  },
  base: "./",       // Relative paths for deployment
});
