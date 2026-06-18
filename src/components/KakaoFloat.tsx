import Link from "next/link";

/** 우하단 카카오 상담 플로팅 버튼 (placeholder 링크) */
export default function KakaoFloat() {
  return (
    <Link
      href="#"
      aria-label="카카오톡 상담"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#FEE500] px-4 py-3 text-sm font-medium text-[#3C1E1E] shadow-lg transition hover:brightness-95"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7-.2.7-.7 2.6-.8 3-.1.5.2.5.4.4.2-.1 2.6-1.8 3.6-2.5.7.1 1.4.2 2.1.2 5.5 0 10-3.6 10-8S17.5 3 12 3Z" />
      </svg>
      <span className="hidden sm:inline">카카오 상담</span>
    </Link>
  );
}
