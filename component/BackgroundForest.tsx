"use client";

export default function BackgroundForest() {
  return (
    /* 🌲 森林剪影區塊：pointer-events-none 確保絕對不干擾點擊事件 */
    <div className="pointer-events-none select-none absolute bottom-0 left-0 right-0 z-0 h-48 w-full overflow-hidden">
      
      {/* 🌲 後排遠景：大樹，透明度極低 */}
      <img src="/tree.png" alt="遠樹1" className="absolute bottom-0 left-[5%] h-36 brightness-[0.03] object-contain object-bottom" />
      <img src="/tree.png" alt="遠樹2" className="absolute bottom-0 left-[25%] h-44 brightness-[0.02] object-contain object-bottom" />
      <img src="/tree.png" alt="遠樹3" className="absolute bottom-0 right-[20%] h-40 brightness-[0.03] object-contain object-bottom" />
      <img src="/tree.png" alt="遠樹4" className="absolute bottom-0 right-[5%] h-48 brightness-[0.02] object-contain object-bottom" />

      {/* 🌲 前排近景：中/小樹，透明度稍高 */}
      <img src="/tree.png" alt="近樹1" className="absolute bottom-0 left-[12%] h-24 brightness-[0.06] object-contain object-bottom" />
      <img src="/tree.png" alt="近樹2" className="absolute bottom-0 left-[18%] h-28 brightness-[0.05] object-contain object-bottom" />
      <img src="/tree.png" alt="近樹3" className="absolute bottom-0 right-[12%] h-32 brightness-[0.06] object-contain object-bottom" />
      <img src="/tree.png" alt="近樹4" className="absolute bottom-0 right-[30%] h-20 brightness-[0.04] object-contain object-bottom" />

    </div>
  );
}
