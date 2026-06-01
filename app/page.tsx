"use client";
import Link from "next/link";
import { usePsyDataStore } from "@/store/store";

export default function Home() {
  const resetGame = usePsyDataStore((state) => state.resetGame);

  function handleStart() {
    resetGame();
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 text-center py-4 select-none">
      
      {/* 👑 1. 升級後的標題區塊：做出大與小的視覺層次 */}
      <div className="flex flex-col gap-1.5 shrink-0 mt-2">

        {/* 大大氣的主標題，將原本生硬的一長串，優雅地斷成兩行 */}
        <h1 className="text-2xl leading-normal text-stone-50 tracking-widest font-pottaOne">
          如果被分配到<br />
          <span className="text-3xl text-emerald-300">聖誕禮物工廠</span>...？
        </h1>
      </div>

      {/* 🎁 1:1 蠢蠢欲動的禮物盒區塊 */}
      <div className="my-1 flex items-center justify-center h-44 w-44 relative shrink-0">
        <img
          src="/gift.png"
          alt="聖誕禮物盒"
          className="h-full w-full object-contain animate-gift-wiggle filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] select-none pointer-events-none"
        />
        {/* 視覺裝飾：偷偷在禮物盒下方加一個淡淡的金色發光，增加奇幻感 */}
        <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full -z-10 scale-75 animate-pulse" />
      </div>

      {/* 📝 2. 引入文字區塊：塞在禮物與按鈕之間，增加沉浸式故事感 */}
      <div className="max-w-[280px] text-center px-2 py-0.5 animate-pulse-subtle">
        <p className="text-xs text-stone-300 font-medium leading-relaxed tracking-widest">
          聖誕節要到了！<br />
          身為工廠裡不可或缺的小精靈，<br />
          今年冬天……會發生什麼奇妙的事呢？
        </p>
      </div>

      {/* 🏁 開始按鈕 */}
      <div className="w-full max-w-[200px] mt-1 shrink-0">
        <Link
          className="rounded-2xl bg-[#8B2626] hover:bg-[#A33838] px-10 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-200 active:scale-95 tracking-widest border border-red-500/20 block"
          href="/question"
          onClick={handleStart}
        >
          ✦ START ✦
        </Link>
      </div>

    </div>
  );

}
