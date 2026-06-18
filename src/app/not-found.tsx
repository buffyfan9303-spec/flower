import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center px-6 pt-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-4xl lg:text-5xl">
        찾으시는 꽃이
        <br />
        시들었나 봐요
      </h1>
      <p className="mt-4 text-sm text-stone">
        페이지를 찾을 수 없습니다. 다른 꽃을 둘러보세요.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-outline">홈으로</Link>
        <Link href="/shop" className="btn-primary">꽃 둘러보기</Link>
      </div>
    </div>
  );
}
