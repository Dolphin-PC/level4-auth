import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// 환경 변수를 사용하는 방법을 보여주는 예시
export default ({ mode }: { mode: string }) => {
  // 현재 모드에 대한 환경 변수 로드
  const env = loadEnv(mode, process.cwd());

  // 로드된 환경 변수를 사용하여 구성 반환
  return defineConfig({
    plugins: [react()],
    define: {
      "process.env": env,
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};
