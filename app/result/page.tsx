"use client";
import { useState, useEffect } from "react";
import { usePsyDataStore } from "@/store/store";
import { useRouter } from "next/navigation";

export default function Result() {
  const router = useRouter();
  const psyData = usePsyDataStore((state) => state.psyData);
  const resetGame = usePsyDataStore((state) => state.resetGame);
  const [psyResult, setPsyResult] = useState<React.ReactNode>(null);

  const { totalPop, totalEff } = psyData;

  useEffect(() => {
    getResult();
  }, [totalPop, totalEff]);

  function getResult() {
    let elfName = "";
    let elfTitle = "";
    let elfDescription = "";
    let accentColor = "from-emerald-400 to-teal-500";

    // 核心交叉二維矩陣邏輯（切分點設在 20 分）
    if (totalEff >= 20 && totalPop >= 20) {
      elfName = "璀璨星光小精靈";
      elfTitle = "✦ 引領潮汐的秩序編織者 ✦";
      elfDescription = "你的靈魂自帶一種無法被忽視的磁場。在群體中，你總是不自覺地站在能看清全局的位置。你擁有極佳的節奏感與平衡能力，能優雅地將周遭無序的絲線梳理成完美的網。這並非出於對權力的渴望，而是你天然具備安撫混亂的本能，讓周圍的人只要看著你的背影，就會感到無比安心。";
      accentColor = "from-amber-400 to-orange-500"; 
    } 
    else if (totalEff < 20 && totalPop >= 20) {
      elfName = "微醺極光小精靈";
      elfTitle = "✦ 點燃冬夜的浪漫惡作劇 ✦";
      elfDescription = "你像是聖誕夜裡突然炸開的彩色拉炮，將驚喜與不可預測性帶入嚴肅的世界。常人眼中標準的條理與規矩，往往限制了你天馬行空的靈感。雖然你偶爾會迷失在光影的細節中，甚至引起一陣手忙腳亂，但你身上跳動的生命力，才是打破冰冷常態、讓沉悶工廠真正活過來的神奇催化劑。";
      accentColor = "from-pink-400 to-rose-500"; 
    } 
    else if (totalEff >= 20 && totalPop < 20) {
      elfName = "晨曦薄霧小精靈";
      elfTitle = "✦ 靜謐流淌的黑夜守護者 ✦";
      elfDescription = "你更習慣與陰影和微光共處，將自己隱匿於喧囂之外。文字、言語或掌聲對你而言都太過沉重，你更喜歡用最純粹的行動與專注，與這個世界進行深度對話。那些被群眾忽略的微小細節、默默支撐著整個結構的隱形骨架，都是你精心守護的秘密花園，是深邃且不可或缺的堅韌力量。";
      accentColor = "from-emerald-400 to-cyan-500"; 
    } 
    else {
      elfName = "冬眠苔蘚小精靈";
      elfTitle = "✦ 與時間和解的省電思想家 ✦";
      elfDescription = "在倡導快速奔跑的時代，你是一株選擇與自身節奏溫柔和解的冬眠植物。你深諳「減法」的藝術，能敏銳地感知周遭環境的能耗，並在混亂中找到最讓自己舒適的庇護所。這種不隨波逐流的淡然並非懶散，而是一種對生命能量的高級管理——將最好的自己，留給值得凝視的漫長靜謐。";
      accentColor = "from-indigo-400 to-purple-500"; 
    }

    setPsyResult(
      <div className="flex w-full flex-col gap-6 text-left">
        {/* 精靈名稱 */}
        <div className="text-center my-4">
          <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-2">
            ✦ Your Soul Essence ✦
          </p>
          <h1 className={`text-3xl font-extrabold bg-linear-to-r ${accentColor} bg-clip-text text-transparent tracking-widest`}>
            {elfName}
          </h1>
          <p className="text-xs text-stone-400 mt-2 tracking-wide font-medium">{elfTitle}</p>
        </div>

        {/* 模糊、抽象的高質感詳細敘述區 */}
        <div className="bg-[#173026]/60 border border-emerald-900/30 rounded-2xl p-6 leading-relaxed text-sm text-stone-300 tracking-wide shadow-inner antialiased">
          {elfDescription}
        </div>
      </div>
    );
  }

  function playAgain() {
    resetGame();
    router.push("/");
  }

  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-between py-4 text-stone-100">
      
      {/* 🔮 頂部裝飾：取代原本生硬的分數顯示，增添測驗神祕感 */}
      <div className="text-[10px] tracking-[0.2em] text-emerald-700/40 uppercase">
        ✦ Oracle of the Christmas Elf ✦
      </div>

      {/* 渲染動態產生的精靈結果區塊 */}
      <div className="w-full my-auto flex-1 flex flex-col justify-center overflow-y-auto max-w-sm">
        {psyResult}
      </div>

      {/* 底部按鈕 */}
      <button
        type="button"
        className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm tracking-widest shadow-md transition-all active:scale-[0.985] border border-emerald-400/20"
        onClick={playAgain}
      >
        ✦ 再次返回工廠 ✦
      </button>

    </div>
  );
}