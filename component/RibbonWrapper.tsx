"use client";

import { usePathname } from "next/navigation";

interface RibbonWrapperProps {
  children: React.ReactNode;
}

export default function RibbonWrapper({ children }: RibbonWrapperProps) {
  const pathname = usePathname();

  // 如果目前的網址是 /result，直接回傳 null（也就是把彩帶完全藏起來）
  if (pathname === "/result") {
    return null;
  }

  // 如果是首頁 (/)、題目頁 (/question) 或準備頁 (/prepare)，就讓彩帶乖乖長出來
  return (
    <>
      {children}
    </>
  );
}
