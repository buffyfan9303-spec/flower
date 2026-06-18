"use client";

import type { ReactNode } from "react";

const base =
  "w-full rounded-[4px] border bg-ivory px-4 py-2.5 text-sm text-ink placeholder:text-stone-light focus:outline-none transition-colors";

export function Field({
  label,
  error,
  required,
  children,
  hint,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium tracking-wide text-ink">
        {label}
        {required && <span className="ml-0.5 text-blush-dark">*</span>}
      </span>
      {children}
      {hint && !error && <span className="mt-1 block text-[11px] text-stone">{hint}</span>}
      {error && <span className="mt-1 block text-[11px] text-blush-dark">{error}</span>}
    </label>
  );
}

export function inputCls(error?: string) {
  return `${base} ${error ? "border-blush-dark" : "border-line focus:border-sage-dark"}`;
}
