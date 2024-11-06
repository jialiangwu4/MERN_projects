import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // alias the @ directory to the src directory
    },
  },
  server: {
    proxy: {
      // proxy requests to the backend server, might need to add CORS middleware on the server to allow cross-origin requests
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
});
