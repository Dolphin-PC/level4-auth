import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // 프로젝트의 src 디렉토리를 '@'로 참조할 수 있게 설정
    },
  },
});
