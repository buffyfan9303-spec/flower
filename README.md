# 드디어 플라워 (Deudieo Flower)

꽃 판매 부티크 웹사이트. Next.js 14 (App Router) · TypeScript · Tailwind CSS.

## 로컬 실행

```bash
npm install
cp .env.example .env.local   # 값 채우기 (ADMIN_PASSWORD 등)
npm run dev                  # http://localhost:3000
```

## 주요 기능

- 스토어프론트: 홈 · 상품목록/상세(옵션·수량·리본·수령일) · 시즌 기획전 · 정기구독 · 저널 · 브랜드 스토리
- 장바구니(zustand, localStorage) + 슬라이드 드로어 + 무료배송 프로그레스
- 주문 · 기업견적 · 정기구독 신청 · 문의 폼 (목 API + 이메일/카카오 알림 스텁)
- 카운트다운 · 가격 앵커링 · 평점/재고 배지 · 신뢰배지 · 크로스셀
- SEO: 페이지별 메타데이터 · Product/Florist JSON-LD · sitemap · robots

## 관리자 (`/admin`)

- 로그인 필요 (`ADMIN_PASSWORD`). 미들웨어가 `/admin`·`/api/admin` 보호.
- 상품(금액·이미지·재고·순서·노출·옵션) / 컬렉션·기획전 / 사이트 설정(공지·히어로·연락처·배송) 관리.
- 저장은 `content/*.json` 파일 기반. 변경 즉시 공개 사이트에 반영.

## 배포 (Vercel)

1. GitHub 저장소를 Vercel 프로젝트에 연결 → push 시 자동 배포.
2. **환경변수 등록 필수**: `ADMIN_PASSWORD`, `ADMIN_TOKEN` (`OPERATOR_EMAIL` 선택).
   - `ADMIN_TOKEN` 미설정 시 관리자 로그인이 동작하지 않습니다.
3. ⚠️ 서버리스(Vercel) 파일시스템은 읽기 전용이라 **관리자 저장이 영속되지 않습니다.**
   공개 사이트는 시드 데이터로 정상 동작하나, 운영 단계의 콘텐츠 관리에는
   데이터베이스(Supabase 등) 연동이 필요합니다.
