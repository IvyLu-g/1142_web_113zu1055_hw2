import type { Metadata } from "next";
import { Geist, Geist_Mono, Potta_One } from "next/font/google";
import Snowfall from "@/component/Snowfall";
import MusicPlay from "@/component/MusicPlay";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pottaOne = Potta_One({
  weight: '400',
  variable: "--font-patta-one",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "你是哪種聖誕小精靈？",
  description: "聖誕小精靈心理測驗",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${pottaOne.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* 1. font-pottaOne: 讓整頁 body 預設全域直接套用這款字體 
        2. bg-slate-950 或 bg-[#0D1F1A]: 使用極深墨綠色（接近黑）作為大背景
      */}
      <body className="font-pottaOne relative flex h-full w-full justify-center bg-[#0B1411] p-4">
        {/* 背景下雪特效 */}
        <Snowfall />
        <div className="relative z-10 flex h-full w-full max-w-[480px] flex-col overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#132A22]/95 p-5 pt-14 text-stone-100 shadow-2xl backdrop-blur-[1px]">
          
          {/* 聖誕綵帶 */}
          <div className="absolute top-0 left-0 right-0 z-20 w-full pointer-events-none select-none">
            <img 
              src="/ribbon.png" 
              alt="聖誕綵帶裝飾" 
              className="w-full h-auto object-contain object-top brightness-65 contrast-110 saturate-90"
            />
          </div>

          <MusicPlay />
          {children}
        </div>

      </body>
    </html>
  );
}
