"use client";
import { useState, useEffect, useRef } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true); // 預設靜音（防瀏覽器阻擋自動播放）

  useEffect(() => {
    // 建立 Audio 實例，直接讀取 public/bgm.mp3
    const audio = new Audio("/bgm.mp3");
    audio.loop = true; // 開啟循環播放
    audio.volume = 0.3; // 控制音量在 30%（比較舒服，不會嚇到人）
    audioRef.current = audio;

    // 嘗試自動播放（部分瀏覽器會阻擋，需要使用者點擊網頁）
    const handleFirstClick = () => {
      if (audioRef.current && isMuted) {
        // 如果使用者點擊了網頁任何地方，嘗試默默在背景播（保持靜音或提示）
      }
    };
    window.addEventListener("click", handleFirstClick);

    return () => {
      audio.pause();
      window.removeEventListener("click", handleFirstClick);
    };
  }, []);

  // 切換聲音開關
  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.play().catch((err) => console.log("播放被阻擋:", err));
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div className="absolute top-4 left-4 z-50">
      <button
        type="button"
        onClick={toggleMute}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-900/30 bg-[#163026]/80 text-stone-300 shadow-md backdrop-blur-xs transition-all hover:scale-105 hover:border-emerald-500/40 hover:text-white active:scale-95"
        title={isMuted ? "播放音樂" : "靜音"}
      >
        {isMuted ? (
          /* 🔇 靜音圖標 (帶有一條斜線) */
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
          </svg>
        ) : (
          /* 🔊 播放中圖標 (有波浪) */
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 animate-pulse">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
        )}
      </button>
    </div>
  );
}