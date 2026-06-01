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
    /* 💡 優化點 1：最外層內距調整
       - 預設大螢幕用 pt-15，留足夠空間。
       - 當螢幕寬度小於 520px (compact) 時，改為 pt-14 (約 56px)，剛好避開 50px 高的綵帶。
       - 當螢幕高度小於 720px (short) 時，同樣壓縮至 pt-14，並將 pb-2 縮為 pb-1。 */
    <div className="question-page flex h-full min-h-0 flex-col pt-15 compact:pt-14 short:pt-14 pb-2 short:pb-1">
      
      {/* 頂部題號與題目區塊 */}
      <div className="shrink-0">
        {/* 💡 優化點 2：題號與文字大小、間距
           - 小螢幕/矮螢幕時，將 mb-2 縮小為 mb-1，字體微縮至 text-[11px]，避免擠壓。 */}
        <p className="q-progress-label mb-2 compact:mb-1 short:mb-1 p-2 compact:p-1 short:p-1 text-center text-xs compact:text-[11px] short:text-[11px] font-bold tracking-widest text-pink-300/80 uppercase">
          ✦ {questionIndex + 1} / {psyData.questions.length} ✦
        </p>

        {/* 💡 優化點 3：題目字體與行距
           - 預設大文字 text-xl。
           - 小/矮螢幕時降為 text-base (16px) 或 compact:text-[16px]，行距改為緊湊的 leading-snug，確保長題目不會吃掉下方按鈕的空間。 */}
        <h3 className="q-title mb-4 compact:mb-2 short:mb-2 text-xl compact:text-base short:text-base leading-relaxed compact:leading-snug short:leading-snug tracking-wide text-stone-100">
          <span className="mr-1 text-emerald-300">Q{questionIndex + 1}.</span>
          {currentQuestion.title}
        </h3>
      </div>

      {/* 選項區塊（可滾動） */}
      {/* 💡 優化點 4：按鈕與間距的微調
         - 預設按鈕間距 gap-4.5，小/矮螢幕時緊湊至 gap-2。 */}
      <div className="q-options flex min-h-0 flex-1 flex-col gap-5 compact:gap-4 short:gap-4 overflow-y-auto pt-3 compact:pt-1 short:pt-1 pr-1">
        {currentQuestion.options.map(
          (option: { text: string }, index: number) => {
            const isSelected = selectedOption === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => selectOption(index)}
                /* 💡 優化點 5：按鈕內距與文字大小的完美比例
                   - 大螢幕：p-4.5, text-[14.5px]
                   - 小/矮螢幕：內距縮小到 p-3 compact:p-3 short:p-3，字體調至 text-xs (12px)
                   - 圓角從 rounded-2xl 稍微收斂到 rounded-xl，看起來更俐落精緻。 */
                className={`q-option-btn w-full rounded-2xl p-4.5 compact:p-3 short:p-3 text-left text-[14.5px]
                  compact:text-s short:text-s font-medium leading-relaxed compact:leading-snug short:leading-snug tracking-wide transition-all duration-200 
                  active:scale-[0.985] shadow-sm flex-1 min-h-[52px] flex items-center ${
                  isSelected
                    ? "border-pink-400 bg-emerald-900/40 text-white shadow-[0_0_15px_rgba(244,114,182,0.15)] -translate-y-px transform"
                    : "border-emerald-800/30 bg-[#173026]/70 text-stone-300 hover:border-emerald-500/40 hover:bg-[#1a382c] hover:text-white"
                }`}
              >
                <span
                  className={`q-option-label mr-4 compact:mr-2 inline-block rounded-xl px-2.5 py-1 compact:px-2 compact:py-0.5 text-xs compact:text-[11px] 
                    short:text-[11px] font-bold tracking-normal transition-all duration-200 shrink-0 ${
                    isSelected
                      ? "bg-linear-to-br from-[#8B2626] to-[#A33838] text-white shadow-sm"
                      : "bg-emerald-950/80 text-emerald-300"
                  }`}
                  style={{ minWidth: "1.5rem" }}
                >
                  {String.fromCharCode(65 + index)}
                </span >


                <span className="flex-1 text-left leading-relaxed compact:leading-snug short:leading-snug">
                  {option.text}
               </span>
              </button>
            );
          }
        )}
      </div>

      {/* 底部導航與進度條區塊 */}
      <div className="mt-auto shrink-0 pt-2">
        {/* 💡 優化點 6：按鈕高度
           - 預設 h-12 w-12，小/矮螢幕時微縮到 h-10 w-10，幫中間的選項多爭取 8px 的垂直空間！ */}
        <div className="q-nav-row flex items-center justify-between pb-2 compact:pb-1 short:pb-1">
          <div className="q-nav-slot flex h-12 w-12 compact:h-10 compact:w-10 short:h-10 short:w-10 items-center justify-center">
            {questionIndex > 0 && (
              <div className="transition-transform hover:scale-105">
                <NavCircleButton
                  direction="left"
                  onClick={goBack}
                  aria-label="上一題"
                />
              </div>
            )}
          </div>

          <div className="q-nav-slot flex h-12 w-12 compact:h-10 compact:w-10 short:h-10 short:w-10 items-center justify-center">
            {selectedOption !== null && (
              <div className="animate-pulse-subtle transition-transform hover:scale-105">
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

        {/* 🎄 聖誕拐杖糖進度條：小/矮螢幕時高度從 h-5 微縮至 h-4 */}
        <div className="q-progress-bar h-5 compact:h-4 short:h-4 w-full overflow-hidden rounded-full border border-emerald-900/40 bg-[#132A22] p-[3px] compact:p-[2px] short:p-[2px] shadow-inner">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
            style={{
              width: `${progress}%`,
              backgroundImage:
                "linear-gradient(45deg, #ef4444 25%, #f8fafc 25%, #f8fafc 50%, #ef4444 50%, #ef4444 75%, #f8fafc 75%, #f8fafc)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>
      </div>

    </div>
  );
}
