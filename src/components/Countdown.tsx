"use client";

import { useEffect, useState } from "react";

const CUTOFF_HOUR = 14; // 오후 2시 마감

function remainingToCutoff() {
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setHours(CUTOFF_HOUR, 0, 0, 0);
  const diff = cutoff.getTime() - now.getTime();
  return diff; // 음수면 마감 지남
}

const pad = (n: number) => String(n).padStart(2, "0");

/** 당일배송 마감 카운트다운 (긴급성 유도) */
export default function Countdown({ compact = false }: { compact?: boolean }) {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setMs(remainingToCutoff());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // 하이드레이션 가드 (서버/클라 시간 불일치 방지)
  if (ms === null) {
    return (
      <div className={compact ? "" : "rounded-[4px] bg-blush/30 px-4 py-3"}>
        <span className="text-sm text-stone">배송 안내를 불러오는 중…</span>
      </div>
    );
  }

  const past = ms <= 0;
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blush-dark" />
        {past ? (
          <span className="text-stone">오늘 마감 · 내일 오전 발송</span>
        ) : (
          <span className="text-ink">
            당일발송 마감까지{" "}
            <b className="font-semibold text-blush-dark tabular-nums">
              {pad(h)}:{pad(m)}:{pad(s)}
            </b>
          </span>
        )}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-[4px] border border-blush/60 bg-blush/20 px-4 py-3">
      <span className="flex h-2 w-2 shrink-0 animate-pulse rounded-full bg-blush-dark" />
      {past ? (
        <p className="text-sm text-ink">
          오늘 당일배송은 마감됐어요. 지금 주문하면 <b>내일 오전</b> 발송됩니다.
        </p>
      ) : (
        <p className="text-sm text-ink">
          오후 2시 전 주문 시 <b className="text-sage-dark">오늘 출발</b> ·{" "}
          마감까지{" "}
          <b className="font-semibold text-blush-dark tabular-nums">
            {pad(h)}시간 {pad(m)}분 {pad(s)}초
          </b>
        </p>
      )}
    </div>
  );
}
