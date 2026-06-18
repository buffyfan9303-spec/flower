import type { Config } from "tailwindcss";

// content 글롭은 process.cwd() 기준으로 해석됩니다.
// preview 하네스가 워크스페이스 루트(다른 cwd)에서 dev 서버를 띄우므로
// 상대경로 + 절대경로(forward-slash, 검증됨)를 함께 지정해 스캔이 깨지지 않게 합니다.
const ABS =
  "C:/Users/buffy/OneDrive/바탕 화면/드 디어 플라워/deudieo-flower/src/**/*.{js,ts,jsx,tsx,mdx}";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", ABS],
  theme: {
    extend: {
      colors: {
        // 페이지 배경 — 따뜻한 아이보리
        cream: "#F7F2EA",
        ivory: "#FCFAF5",
        // 잉크 — 깊은 차콜
        ink: "#26241F",
        // 뮤트 텍스트 — 스톤
        stone: {
          DEFAULT: "#8C8678",
          light: "#A8A294",
        },
        // 메인 액센트 — 세이지 그린
        sage: {
          DEFAULT: "#6F7A63",
          dark: "#515B47",
          light: "#9AA48C",
        },
        // 서브 액센트 — 더스티 블러쉬
        blush: {
          DEFAULT: "#E3C2BB",
          dark: "#C99B92",
        },
        // 골드 디테일
        gold: "#B89B6E",
        line: "#E7DFD3",
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "Noto Sans KR",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "Cormorant Garamond",
          "Noto Serif KR",
          "serif",
        ],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        container: "1440px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "kenburns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 1.2s ease both",
        "kenburns": "kenburns 14s ease-out both",
        "marquee": "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
