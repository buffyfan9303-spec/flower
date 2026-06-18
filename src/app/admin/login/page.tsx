"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        const from = params.get("from") || "/admin";
        router.replace(from.startsWith("/admin") ? from : "/admin");
        router.refresh();
      } else {
        setError(json.error || "로그인에 실패했습니다.");
      }
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="font-serif text-2xl text-ink">드디어 플라워</p>
          <p className="mt-1 text-xs tracking-widest2 text-stone">ADMIN</p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 rounded-[6px] border border-line bg-ivory p-6">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-ink">관리자 비밀번호</span>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[4px] border border-line bg-cream px-4 py-2.5 text-sm focus:border-sage-dark focus:outline-none"
              placeholder="비밀번호"
            />
          </label>
          {error && <p className="mt-2 text-[12px] text-blush-dark">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-5 w-full disabled:opacity-50"
          >
            {loading ? "확인 중…" : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
