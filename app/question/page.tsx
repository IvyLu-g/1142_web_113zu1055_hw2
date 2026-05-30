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
        {/* 進度條改為粉綠漸層，並增加柔和外發光 */}
        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-emerald-950/60 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-pink-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 題號改用更夢幻的草莓粉，與進度條呼應 */}
        <p className="mb-2 text-xs font-bold tracking-widest text-pink-300/80 uppercase">
          ✦ Progress: {questionIndex + 1} / {psyData.questions.length} ✦
        </p>

        {/* 題目文字：字體放大、行距加寬 (leading-relaxed) */}
        <h2 className="mb-4 text-xl font-bold leading-relaxed tracking-wide text-stone-100">
          <span className="text-emerald-300 mr-1">Q{questionIndex + 1}.</span>
          {currentQuestion.title}
        </h2>

        <hr className="mb-5 border-emerald-900/30" />
      </div>

      {/* 選項區塊：將 gap 拉開到 3.5，看起來更加大氣、不擁擠 */}
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
                    ? "border-pink-400 bg-emerald-900/40 text-white shadow-[0_0_15px_rgba(244,114,182,0.15)] transform -translate-y-[1px]"
                    : "border-emerald-800/30 bg-[#173026]/70 text-stone-300 hover:border-emerald-500/40 hover:bg-[#1a382c] hover:text-white"
                }`}
              >
                {/* 選項英文標籤 (A, B, C, D) 的視覺優化 */}
                <span
                  className={`mr-4 inline-block rounded-xl px-2.5 py-1 text-xs font-bold tracking-normal transition-all duration-200 ${
                    isSelected
                      ? "bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-sm"
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
