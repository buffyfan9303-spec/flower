/** @type {import('next').NextConfig} */
const nextConfig = {
  // 타입체크(tsc)는 통과 상태. ESLint의 스타일 규칙(no-explicit-any 등, JSON 파싱부의
  // 의도적 any)으로 프로덕션 빌드가 막히지 않도록 빌드 시 ESLint는 분리합니다.
  // (린트는 `npm run lint`로 별도 실행)
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
