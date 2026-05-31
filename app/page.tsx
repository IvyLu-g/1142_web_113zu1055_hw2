"use client";
import Link from "next/link";
import { usePsyDataStore } from "@/store/store";

export default function Home() {
  const resetGame = usePsyDataStore((state) => state.resetGame);

  function handleStart() {
    resetGame();
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 text-center py-4">
      <h1 className="text-3xl leading-relaxed text-stone-50 tracking-wider">
        你是哪種聖誕小精靈？
      </h1>

      {/* 🎁 1:1 蠢蠢欲動的禮物盒區塊 */}
      <div className="my-2 flex items-center justify-center h-48 w-48 relative">
        <img
          src="/gift.png"
          alt="聖誕禮物盒"
          className="h-full w-full object-contain animate-gift-wiggle filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] select-none pointer-events-none"></img>
        {/* 視覺裝飾：偷偷在禮物盒下方加一個淡淡的金色發光，增加奇幻感 */}
      </div>

      {/* 開始按鈕：配合你的墨綠 Layout，按鈕顏色我微調成有聖誕質感的漿果紅（比原本更亮一點，更好看） */}
      <Link
        className="rounded-2xl bg-[#8B2626] hover:bg-[#A33838] px-10 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-200 active:scale-95 tracking-widest border border-red-500/20"
        href="/question"
        onClick={handleStart}
      >
        ✦ START ✦
      </Link>
    </div>
  );
}
