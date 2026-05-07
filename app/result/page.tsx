"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePsyDataStore } from "@/store/store";
import { useRouter } from "next/navigation";

export default function result() {
  const router = useRouter();
  const psyData = usePsyDataStore( (state) => state.psyData);
  const [psyResult, setPsyResult] = useState(<></>);
  const setPsyScore = usePsyDataStore( (state) => state.setScore);

  useEffect(() => {
    getResult();
  }, [psyData.score]);

  function getResult(){
    if (psyData.score < 3) {
      setPsyResult(<div>結果 A</div>); //可以把整個設計寫在裡面
    } else if (psyData.score >= 3 && psyData.score < 7) {
      setPsyResult(<div>結果 B</div>);
    } else {
      setPsyResult(<div>結果 C</div>);
    }
  }

  function playAgain(){
    setPsyScore(0);
    router.push("/");
  }


  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        結果總分：{ psyData.score }
        { psyResult }

       <div className="text-white bg-cyan-900 px-3 py-2"
            onClick={playAgain}> 再玩一次 </div>
      </div>
    </>
  )
}
