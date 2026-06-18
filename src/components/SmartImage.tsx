"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  palette: [string, string];
  className?: string;
  /** aspect ratio utility, 예: "aspect-[3/4]" */
  ratio?: string;
  /** 폴백에 표시할 라벨(상품명 등) */
  label?: string;
  priority?: boolean;
};

/**
 * 이미지가 로드되면 실제 사진을, 실패/오프라인이면
 * 브랜드 팔레트 그라데이션 + 보태니컬 라인 모티프를 보여줍니다.
 * 더미 데이터로도 항상 "디자인된" 화면을 유지하기 위한 컴포넌트.
 */
export default function SmartImage({
  src,
  alt,
  palette,
  className = "",
  ratio = "aspect-[3/4]",
  label,
  priority,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const [c1, c2] = palette;

  return (
    <div
      className={`relative overflow-hidden ${ratio} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
      }}
    >
      {/* 보태니컬 라인 모티프 (항상 노출, 폴백 겸 질감) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 200 260"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g
          fill="none"
          stroke="#FCFAF5"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M100 250 C100 180 100 140 100 70" />
          <path d="M100 150 C70 140 55 120 52 92 C84 96 100 118 100 150 Z" />
          <path d="M100 150 C130 140 145 120 148 92 C116 96 100 118 100 150 Z" />
          <path d="M100 110 C78 102 66 84 64 60 C92 66 100 86 100 110 Z" />
          <path d="M100 110 C122 102 134 84 136 60 C108 66 100 86 100 110 Z" />
          <circle cx="100" cy="56" r="14" />
          <circle cx="100" cy="56" r="5" fill="#FCFAF5" stroke="none" />
        </g>
      </svg>

      {/* 라벨(폴백 상태에서만 또렷하게) */}
      {label && !loaded && (
        <div className="absolute inset-0 flex items-end p-5">
          <span className="font-serif text-lg italic text-ivory/90 drop-shadow">
            {label}
          </span>
        </div>
      )}

      {/* 실제 이미지 */}
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
