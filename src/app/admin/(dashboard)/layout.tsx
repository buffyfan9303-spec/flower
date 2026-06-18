import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "관리자",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream lg:flex">
      <aside className="bg-ink lg:fixed lg:inset-y-0 lg:w-60">
        <AdminNav />
      </aside>
      <div className="flex-1 lg:ml-60">
        <main className="mx-auto max-w-5xl p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
