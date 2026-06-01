"use client";
import { useState, useEffect } from "react"; // 💡 引入狀態與副作用鉤子
import Link from "next/link";

export default function Prepare() {
  // 💡 1. 建立一個控制按鈕是否顯示的狀態（預設不顯示）
  const [showButton, setShowButton] = useState(false);

  // 💡 2. 頁面載入後，倒數 2.5 秒（2500毫秒）再把按鈕放行
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500); // 💡 這裡可以自由調整時間，3000 就是 3 秒

    return () => clearTimeout(timer); // 良好的習慣：組件卸載時清除計時器
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 text-center">
      
      {/* 聖誕禮物盒（會持續扭動） */}
      <div className="my-2 flex items-center justify-center h-28 w-28 relative">
        <img
          src="/gift.png"
          alt="聖誕禮物盒"
          className="h-full w-full object-contain animate-gift-wiggle filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] select-none pointer-events-none"
        />
      </div>

      {/* 💡 3. 這裡做了一個貼心小優化：當按鈕還沒出來時，文字顯示「正在尋找...」；按鈕出來後，改成提示「報告已送達！」 */}
      <p className="text-stone-200 text-xs tracking-widest font-medium transition-all duration-300 pb-1.5">
        {!showButton ? (
          <span className="animate-pulse">✦ 正在尋找屬於你的崗位... ✦</span>
        ) : (
          <span className="animate-bounce">員工證已送達！</span>
        )}
      </p>

      {/* 💡 4. 動態控制按鈕的顯示與絲滑淡入效果 */}
      <div 
        className={`transition-all duration-700 ease-out transform ${
          showButton 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <Link
          className="rounded-xl bg-[#582b2b] hover:bg-[#6e3737] px-6 py-2.5 text-sm font-bold text-white tracking-widest shadow-md transition-colors block"
          href="/result"
        >
         查看分派結果
        </Link>
      </div>

    </div>
  );
}
