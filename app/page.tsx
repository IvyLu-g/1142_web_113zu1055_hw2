"use client"
import { useState, useEffect } from "react";

export default function Home() {

  const [counter, setCounter] = useState(0);

  function addNight(){
    console.log("被點到了");
  }

  useEffect(function(){
    console.log("畫面載入完成");
  },[]);

  useEffect(function(){
    console.log("有人說晚安");
  },[counter]);

  function nextProblem(){
    setCounter(counter+1);
  }


  return (
    <>

      {
        (counter == 0) && <div className="w-[480px] h-screen flex justify-center items-center flex-col bg-slate-900 m-auto">
          <div>歡迎畫面</div>
          <div onClick={nextProblem} className="bg-slate-100 text-slate-900 px-3 py-3">開始測驗</div>
        </div>
      }

      {
        (counter == 0) && <div className="w-[480px] h-screen flex justify-center items-center flex-col bg-slate-900 m-auto">
          <div>題目一</div>
          <div onClick={nextProblem} className="bg-slate-100 text-slate-900 px-3 py-3">下一題</div>
        </div>
      }
    </>
  )
}
