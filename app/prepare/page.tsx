"use client";
import Link from "next/link";

export default function Prepare() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <p className="text-lg text-stone-200">正在準備你的結果…</p>
      <Link
        className="rounded-xl bg-red-700 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-600"
        href="/result"
      >
        看結果
      </Link>
    </div>
  );
}
