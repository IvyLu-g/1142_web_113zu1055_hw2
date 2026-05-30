"use client";
import Link from "next/link";
import ActionButton from "@/component/ActionButton";
import Emoticons from "@/component/Emoticons";
import { usePsyDataStore } from "@/store/store";

export default function Home() {
  const resetGame = usePsyDataStore((state) => state.resetGame);

  function handleStart() {
    resetGame();
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-2xl leading-relaxed text-stone-50">
        你是哪種聖誕小精靈？
      </h1>

      <Link
        className="rounded-xl bg-[#582b2b] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#582b2b]"
        href="/question"
        onClick={handleStart}
      >
        START
      </Link>
      
    </div>
  );
}
