/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
  // 다른 환경 변수들이 있으면 여기에 추가합니다.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
