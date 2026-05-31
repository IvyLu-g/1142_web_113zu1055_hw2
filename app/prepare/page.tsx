"use client";
import Link from "next/link";

export default function Prepare() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
      

      <div className="my-2 flex items-center justify-center h-28 w-28 relative">
        <img
          src="/gift.png"
          alt="聖誕禮物盒"
          className="h-full w-full object-contain animate-gift-wiggle filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] select-none pointer-events-none"></img>
        {/* 視覺裝飾：偷偷在禮物盒下方加一個淡淡的金色發光，增加奇幻感 */}
        <div className="absolute -bottom-2 h-4 w-24 bg-amber-500/60 blur-md rounded-full" />
      </div>

      <p className= "text-stone-200" >正在準備你的結果…</p>

      <Link
        className="rounded-xl bg-[#582b2b] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#582b2b]"
        href="/result"
      >
        看結果
      </Link>
    </div>
  );
}
