"use client";

import type { ReactNode } from "react";

export const ai =
  "w-full rounded-[4px] border border-line bg-cream px-3 py-2 text-sm text-ink focus:border-sage-dark focus:outline-none";

export function Labeled({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-[11px] font-medium text-stone">{label}</span>
      {children}
    </label>
  );
}

export function SaveBar({
  dirty,
  saving,
  onSave,
  message,
}: {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  message?: string;
}) {
  return (
    <div className="sticky bottom-0 z-20 -mx-5 mt-8 flex items-center justify-between border-t border-line bg-cream/95 px-5 py-3 backdrop-blur lg:-mx-8 lg:px-8">
      <span className="text-xs text-stone">
        {message || (dirty ? "저장되지 않은 변경사항이 있습니다." : "모든 변경사항이 저장되었습니다.")}
      </span>
      <button
        onClick={onSave}
        disabled={!dirty || saving}
        className="btn-primary disabled:opacity-40"
      >
        {saving ? "저장 중…" : "변경사항 저장"}
      </button>
    </div>
  );
}

export function IconBtn({
  onClick,
  title,
  children,
  disabled,
}: {
  onClick: () => void;
  title: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-line bg-ivory text-stone transition hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}
