import path from "path";
import { fileURLToPath } from "url";

// tailwind 설정 경로를 "이 파일 위치" 기준 절대경로로 계산합니다.
// → process.cwd()와 무관하게(=preview 하네스의 워크스페이스 루트 cwd에서도),
//   그리고 OS와 무관하게(=Vercel Linux 빌드에서도) tailwind.config.ts를 정확히 찾습니다.
const dir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: { config: path.join(dir, "tailwind.config.ts") },
  },
};

export default config;
