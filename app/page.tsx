"use client";
import Link from "next/link";
import ActionButton from "@/component/ActionButton"

export default function Home() {

// 路由
//1. 歡迎畫面 /
//2. 答題     /question
//3. 準備看結果/prepare
//4. 結果     /result
// https://psy-test.com/color/result?id=10


  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        歡迎！
       <Link className="text-white bg-cyan-900 px-3 py-2" href="/question">START</Link>
       <ActionButton/>
      </div>
    </>
  )
}
