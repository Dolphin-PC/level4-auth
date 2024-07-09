import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://3.38.191.164", // 프록시할 대상 서버의 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 요청 경로에서 '/api'를 제거
      },
    },
  },
});
