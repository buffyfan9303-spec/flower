const BADGES = [
  { icon: "✦", title: "신선도 7일 보장", desc: "시들면 100% 교환·환불" },
  { icon: "✶", title: "배송 완료 사진 전송", desc: "받는 분께 전달된 모습 확인" },
  { icon: "✤", title: "안전결제", desc: "전 결제수단 안심 거래" },
];

/** 상세/결제 직전 신뢰 배지 */
export default function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-3 gap-2 ${className}`}>
      {BADGES.map((b) => (
        <li
          key={b.title}
          className="rounded-[4px] border border-line bg-ivory px-2 py-3 text-center"
        >
          <span className="text-sage">{b.icon}</span>
          <p className="mt-1 text-[12px] font-medium leading-tight text-ink">
            {b.title}
          </p>
          <p className="mt-0.5 text-[10px] leading-tight text-stone">{b.desc}</p>
        </li>
      ))}
    </ul>
  );
}
