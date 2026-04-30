"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Prepare() {

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        Loading
       <Link className="text-white bg-cyan-900 px-3 py-2" href="/result">看結果</Link>
      </div>
    </>
  )
}
