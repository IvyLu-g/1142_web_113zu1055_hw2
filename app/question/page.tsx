"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePsyDataStore } from "../../store/store"

export default function Question() {
  
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const psyData = usePsyDataStore( (state) => state.psyData);
  const setPsyScore = usePsyDataStore( (state) => state.setScore);

  useEffect(() => {
    console.log("目前分數：" + psyData.score);
  }, [psyData.score]);

  function nextQuestion(optionIndex: any){
    console.log("使用者選擇：" + optionIndex);

    //根據使用者的選項加分數
    setPsyScore( psyData.score + psyData.questions[questionIndex].options[optionIndex].value );

    if( questionIndex != psyData.questions.length-1 ){
      console.log("下一題！");
      setQuestionIndex( questionIndex + 1 );
    }else{
      console.log("進入準備看結果頁面");
      router.push("/prepare");
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 text-cyan-900">
        答題

        <div>
          <div>{ ("Q" + (questionIndex+1) + ". ") + psyData.questions[questionIndex].title }</div>
          <div onClick={ ()=> nextQuestion(0) }>{ psyData.questions[questionIndex].options[0].text }</div>
          <div onClick={ ()=> nextQuestion(1) }>{ psyData.questions[questionIndex].options[1].text }</div>
          <div onClick={ ()=> nextQuestion(2) }>{ psyData.questions[questionIndex].options[2].text }</div>
        </div>

      </div>
    </>
  )
}
