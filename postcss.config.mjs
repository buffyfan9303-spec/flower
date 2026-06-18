/** @type {import('postcss-load-config').Config} */
// tailwindcss 플러그인은 config를 process.cwd() 기준으로 탐색합니다.
// preview 하네스가 워크스페이스 루트(다른 cwd)에서 dev 서버를 띄우므로
// flower의 tailwind.config.ts 경로를 명시적으로 지정합니다.
const config = {
  plugins: {
    tailwindcss: {
      config:
        "C:/Users/buffy/OneDrive/바탕 화면/드 디어 플라워/deudieo-flower/tailwind.config.ts",
    },
  },
};

export default config;
