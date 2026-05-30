"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePsyDataStore } from "../../store/store";
import NavCircleButton from "@/component/NavCircleButton";

export default function Question() {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const psyData = usePsyDataStore((state) => state.psyData);
  const setAnswer = usePsyDataStore((state) => state.setAnswer);

  const currentQuestion = psyData.questions[questionIndex];
  const progress = ((questionIndex + 1) / psyData.questions.length) * 100;

  useEffect(() => {
    setSelectedOption(psyData.answers[questionIndex] ?? null);
  }, [questionIndex, psyData.answers]);

  function selectOption(optionIndex: number) {
    setSelectedOption(optionIndex);
  }

  function goNext() {
    if (selectedOption === null) return;

    setAnswer(questionIndex, selectedOption);

    if (questionIndex !== psyData.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      router.push("/prepare");
    }
  }

  function goBack() {
    if (questionIndex === 0) return;
    setQuestionIndex(questionIndex - 1);
  }

  return (
    <div className="flex h-full min-h-0 flex-col justify-between py-2">
      {/* 頂部進度條與題號區 */}
      <div>
        {/* 頂部進度條：深綠色外框底色，增添聖誕層次 */}
        <div className="mb-4 h-5 w-full overflow-hidden rounded-full bg-emerald-950/60 p-[3px] border border-emerald-900/40 shadow-inner">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
            style={{ 
              width: `${progress}%`,
              // 💡 關鍵：利用 linear-gradient 畫出 45 度角的紅白相間斜條紋（聖誕拐杖糖）
              backgroundImage: 'linear-gradient(45deg, #ef4444 25%, #f8fafc 25%, #f8fafc 50%, #ef4444 50%, #ef4444 75%, #f8fafc 75%, #f8fafc)',
              backgroundSize: '20px 20px' // 控制斜條紋的粗細與密集度
            }}
          />
        </div>

        {/* 題號*/}
        <p className="mb-2 text-xs font-bold tracking-widest text-pink-300/80 uppercase text-center">
          ✦ {questionIndex + 1} / {psyData.questions.length} ✦
        </p>

        {/* 題目文字*/}
        <h3 className="mb-4 text-xl leading-relaxed tracking-wide text-stone-100">
          <span className="text-emerald-300 mr-1">Q{questionIndex + 1}.</span>
          {currentQuestion.title}
        </h3>

        <hr className="mb-5 border-emerald-900/30" />
      </div>

      {/* 選項區塊*/}
      <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto pr-1">
        {currentQuestion.options.map(
          (option: { text: string }, index: number) => {
            const isSelected = selectedOption === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => selectOption(index)}
                className={`w-full rounded-2xl border p-4.5 text-left text-[14.5px] font-medium leading-relaxed tracking-wide transition-all duration-200 active:scale-[0.985] shadow-sm ${
                  isSelected
                    ? "border-pink-400 bg-emerald-900/40 text-white shadow-[0_0_15px_rgba(244,114,182,0.15)] transform -translate-y-px"
                    : "border-emerald-800/30 bg-[#173026]/70 text-stone-300 hover:border-emerald-500/40 hover:bg-[#1a382c] hover:text-white"
                }`}
              >
                {/* 選項英文標籤 (A, B, C, D) 的視覺優化 */}
                <span
                  className={`mr-4 inline-block rounded-xl px-2.5 py-1 text-xs font-bold tracking-normal transition-all duration-200 ${
                    isSelected
                      ? "bg-linear-to-br from-[#582b2b] to-rose-500 text-white shadow-sm"
                      : "bg-emerald-950/80 text-emerald-300 group-hover:bg-emerald-900"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                {option.text}
              </button>
            );
          }
        )}
      </div>

      {/* 底部導航按鈕區：上下增加間距 (mt-5) */}
      <div className="mt-5 flex items-center justify-between border-t border-emerald-900/20 pt-3">
        <div className="w-12 h-12 flex items-center justify-center">
          {questionIndex > 0 && (
            <div className="hover:scale-105 transition-transform">
              <NavCircleButton
                direction="left"
                onClick={goBack}
                aria-label="上一題"
              />
            </div>
          )}
        </div>
        
        <div className="w-12 h-12 flex items-center justify-center">
          {selectedOption !== null && (
            <div className="hover:scale-105 transition-transform animate-pulse-subtle">
              <NavCircleButton
                direction="right"
                onClick={goNext}
                aria-label={
                  questionIndex === psyData.questions.length - 1
                    ? "完成測驗"
                    : "下一題"
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
