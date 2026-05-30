"use client";
import Link from "next/link";

export default function ActionButton() {
  return (
    <Link
      className="rounded-xl border border-emerald-800/60 bg-emerald-900/40 px-4 py-2 text-sm text-stone-200 transition-colors hover:border-emerald-600/50 hover:bg-emerald-800/50"
      href="/"
    >
      按鈕元件
    </Link>
  );
}
