"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function result() {

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        結果
       <Link className="text-white bg-cyan-900 px-3 py-2" href="/">再玩一次</Link>
      </div>
    </>
  )
}
