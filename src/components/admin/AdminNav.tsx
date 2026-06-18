"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "대시보드", icon: "◧" },
  { href: "/admin/products", label: "상품 관리", icon: "✿" },
  { href: "/admin/collections", label: "컬렉션·기획전", icon: "❏" },
  { href: "/admin/settings", label: "사이트 설정", icon: "⚙" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <nav className="flex h-full flex-col">
      <div className="px-6 py-6">
        <Link href="/admin" className="font-serif text-xl text-ivory">
          드디어 플라워
        </Link>
        <p className="mt-0.5 text-[10px] tracking-widest2 text-ivory/50">ADMIN</p>
      </div>

      <ul className="flex-1 space-y-1 px-3">
        {NAV.map((n) => {
          const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
          return (
            <li key={n.href}>
              <Link
                href={n.href}
                className={`flex items-center gap-3 rounded-[6px] px-3 py-2.5 text-sm transition ${
                  active ? "bg-sage text-ivory" : "text-ivory/70 hover:bg-white/5 hover:text-ivory"
                }`}
              >
                <span className="w-4 text-center opacity-80">{n.icon}</span>
                {n.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="space-y-2 border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-[6px] px-3 py-2.5 text-sm text-ivory/70 transition hover:bg-white/5 hover:text-ivory"
        >
          <span className="w-4 text-center">↗</span> 사이트 보기
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2.5 text-sm text-ivory/70 transition hover:bg-white/5 hover:text-ivory"
        >
          <span className="w-4 text-center">⎋</span> 로그아웃
        </button>
      </div>
    </nav>
  );
}
