"use client";
import { useState, useEffect } from "react";
import { usePsyDataStore } from "@/store/store";
import { useRouter } from "next/navigation";

type ResultDetails = {
  elfName: string;
  elfTitle: string;
  employeeNo: string;
  accentColor: string;
  buttonColor: string;
  styleCards: {
    work: { icon: React.ReactNode; title: string; text: string };
    others: { icon: React.ReactNode; title: string; text: string };
    strength: { icon: React.ReactNode; title: string; text: string };
  };
  quote: string;
  santaLetter: string;
};

export default function Result() {
  const router = useRouter();
  const psyData = usePsyDataStore((state) => state.psyData);
  const resetGame = usePsyDataStore((state) => state.resetGame);
  const [resultData, setResultData] = useState<ResultDetails | null>(null);

  const { totalPop, totalEff } = psyData;

  useEffect(() => {
    if (totalPop === 0 && totalEff === 0) return;

    const randomNum = Math.floor(100 + Math.random() * 900);
    const empId = `ELF-${randomNum}`;

    let details: ResultDetails;

    // 💡 單色精緻 SVG 線條圖標定義
    const iconFlash = (
      <svg className="w-5 h-5 text-emerald-400 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
    const iconEye = (
      <svg className="w-5 h-5 text-emerald-400 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    );
    const iconBicep = (
      <svg className="w-5 h-5 text-emerald-400 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /> {/* 替換成萬用星芒 */}
      </svg>
    );
    const iconSparkles = (
      <svg className="w-5 h-5 text-emerald-400 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4M4 19h4m12-4v4m-2-2h4m-5-9l4 4m0 0l4-4m-4 4v12" />
      </svg>
    );
    const iconMute = (
      <svg className="w-5 h-5 text-emerald-400 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l3-3m0 0l3-3m-3 3l-3-3m3 3l3 3" />
      </svg>
    );
    const iconShield = (
      <svg className="w-5 h-5 text-emerald-400 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
    const iconCpu = (
      <svg className="w-5 h-5 text-emerald-400 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
      </svg>
    );
    const iconSnail = (
      <svg className="w-5 h-5 text-emerald-400 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
    const iconBed = (
      <svg className="w-5 h-5 text-emerald-400 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    );

    if (totalEff >= 20 && totalPop >= 20) {
      details = {
        elfName: "禮物工廠班長",
        elfTitle: "✦ 哪裡需要幫忙，哪裡就有你 ✦",
        employeeNo: empId,
        accentColor: "from-amber-400 to-orange-500 text-amber-300",
        buttonColor: "from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 border-amber-400/20",
        styleCards: {
          work: { icon: iconFlash, title: "你的工作風格", text: "大家忙成一團時，你總是看不下去，會自動跳出來主動分配工作，根本是工廠的地下總管。" },
          others: { icon: iconEye, title: "小精靈夥伴眼中的你", text: "不只做事超級有效率，還很擅長到處去戳各組進度，跟大家都很合得來，簡真是社交牛逼症加控制狂。" },
          strength: { icon: iconSparkles, title: "你的潛在天賦", text: "工廠裡只要有你在，大家就會覺得天塌下來也有你頂著，莫名地感到無比安心。" }
        },
        quote: "「放開那隻麋鹿讓我來！那個誰，你東西打包好了沒？」",
        santaLetter: "今年的生產進度又提早完成了，真有你的！聖誕老公公偷偷跟你說，不要每天把自己逼得那麼緊，偶爾也可以學學隔壁的人偷偷滑個手機啦。"
      };
    } 
    else if (totalEff < 20 && totalPop >= 20) {
      details = {
        elfName: "派對氣氛組長",
        elfTitle: "✦ 禮物還沒包完，但大家都笑得很開心 ✦",
        employeeNo: empId,
        accentColor: "from-pink-400 to-rose-500 text-pink-300",
        buttonColor: "from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 border-pink-400/20",
        styleCards: {
          work: { icon: iconSparkles, title: "你的工作風格", text: "比起無聊的照表操課，你更喜歡自由發揮。你是那個沒注意到午休要結束、還在炒熱氣氛的嗨咖。" },
          others: { icon: iconEye, title: "小精靈夥伴眼中的你", text: "總能讓工廠充滿歡樂。雖然常常因為講笑話和餵麋鹿自拍導致進度嚴重落後，但沒你大家會悶死。" },
          strength: { icon: iconFlash, title: "你的潛在天賦", text: "擁有強大的快樂渲染力。就算不小心把熱可可倒在禮物上，也能用講笑話把緊張氣氛瞬間舒緩。" }
        },
        quote: "「進度先不要管它，來！看鏡頭，一、二、三，聖誕快樂！」",
        santaLetter: "雖然每次看你的進度表我都血壓飆高，但我不得不承認，有你在的工廠真的比較好玩。謝謝你帶給大家這麼多笑聲，繼續保持！"
      };
    } 
    else if (totalEff >= 20 && totalPop < 20) {
      details = {
        elfName: "默默趕工王",
        elfTitle: "✦ 話不多，但工作永遠做得完 ✦",
        employeeNo: empId,
        accentColor: "from-emerald-400 to-cyan-500 text-emerald-300",
        buttonColor: "from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 border-emerald-400/20",
        styleCards: {
          work: { icon: iconMute, title: "你的工作風格", text: "比起社交聊天，你更喜歡開啟省電模式、戴上耳機，瘋狂專心完成自己手頭上的任務。" },
          others: { icon: iconShield, title: "小精靈夥伴眼中的你", text: "很不愛成為目光焦點，但在大家還在熱烈討論、互相推託的時候，你可能早就已經默默做完一半了。" },
          strength: { icon: iconCpu, title: "你的潛在天賦", text: "公事公辦的無情趕工機器。不愛廢話，但總能默默交出最可靠、最完美的頂級成品。" }
        },
        quote: "「（默默遞給對方抹布）……好了，我回去繼續包禮物了。」",
        santaLetter: "你總是坐在角落不說話，但我每次對清單時，你那一組的產量永遠是最完美的。謝謝你當工廠最穩大的靠山，下班記得去拿你的雙倍薑餅人！"
      };
    } 
    else {
      details = {
        elfName: "暖爐休息專員",
        elfTitle: "✦ 先喝口熱可可再說 ✦",
        employeeNo: empId,
        accentColor: "from-indigo-400 to-purple-500 text-indigo-300",
        buttonColor: "from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-indigo-400/20",
        styleCards: {
          work: { icon: iconSnail, title: "你的工作風格", text: "你極度重視自己的靈魂節奏，天生自帶「減法藝術」，天塌下來也絕對不要指望能催促你" },
          others: { icon: iconBed, title: "小精靈夥伴眼中的你", text: "一有機會就偷懶、偷偷滑手機。能躺著就絕對不坐著，隨時準備溜回小精靈宿舍或是雪橇後座躺平" },
          strength: { icon: iconCpu, title: "你的潛在天賦", text: "地表最強的能量管理大師。深知唯有把電充飽、把熱可可喝完，才有力氣迎接下一個挑戰" }
        },
        quote: "「下午開工鐘聲響起前，誰也別想把我從毛毯裡拉起來。」",
        santaLetter: "看到你睡得這麼香，連我都想跟你一起躺平了。沒關係，平安夜還很長，熱可可喝夠了、休息夠了我們再慢慢開始包禮物吧！"
      };
    }

    setResultData(details);
  }, [totalPop, totalEff]);

  function playAgain() {
    setResultData(null);
    resetGame();
    router.push("/");
  }

  if (!resultData) {
    return <div className="flex h-full items-center justify-center text-stone-400 text-sm animate-pulse">正在調閱精靈檔案...</div>;
  }

  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-between overflow-y-auto px-1 pt-6 pb-3 text-stone-100 scrollbar-none">
      
      {/* 👑 Section 1: Header (完全靠左對齊) */}
      <div className="w-full text-left mt-1 shrink-0 pl-1">
        <div className="text-[12px] tracking-widest text-[#a14343b5] font-bold uppercase">
          你在聖誕禮物工廠的職位是...
        </div>
      </div>

      {/* 📜 中間核心滾動故事區 */}
      <div className="w-full flex-1 flex flex-col gap-6 py-4 max-w-sm">
        
        {/* 🪪 Section 2: Employee Card (無圖、窄內距、極簡版) */}
        <div className="relative w-full rounded-2xl bg-[#173026]/85 border border-emerald-800/40 p-5 text-center shadow-xl backdrop-blur-xs select-none">
          {/* 左上角標章 */}
          <div className="text-left text-[10px] font-bold text-emerald-600/70 tracking-wider">🎄 聖誕禮物工廠</div>
          
          {/* 精靈職稱與頭銜 */}
          <h1 className={`text-4xl bg-linear-to-r ${resultData.accentColor} bg-clip-text text-transparent tracking-widest pt-2 pb-1`}>
            {resultData.elfName}
          </h1>
          <p className="text-[10px] text-stone-300 mt-0.5 tracking-wide font-medium">{resultData.elfTitle}</p>
          
          {/* 右下角絕對定位員工編號 */}
          <div className="absolute bottom-2 right-3 rounded bg-emerald-950/70 border border-emerald-900/30 px-2 py-0.5 text-[9px] tracking-wider text-emerald-400 font-mono scale-90">
            No. {resultData.employeeNo}
          </div>
        </div>

        {/* 🎁 Section 3: About Your Work Style (單色美型線條卡片) */}
        <div className="flex flex-col gap-3">
          {/* 工作風格 */}
          <div className="flex gap-3 items-start bg-[#12271F]/80 border border-emerald-900/30 rounded-xl p-3.5 shadow-sm">
            <span className="shrink-0 mt-0.5">{resultData.styleCards.work.icon}</span>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-xs text-stone-200">{resultData.styleCards.work.title}</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-medium">{resultData.styleCards.work.text}</p>
            </div>
          </div>

          {/* 他人眼光 */}
          <div className="flex gap-3 items-start bg-[#12271F]/80 border border-emerald-900/30 rounded-xl p-3.5 shadow-sm">
            <span className="shrink-0 mt-0.5">{resultData.styleCards.others.icon}</span>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-xs text-stone-200">{resultData.styleCards.others.title}</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-medium">{resultData.styleCards.others.text}</p>
            </div>
          </div>

          {/* 隱藏天賦 */}
          <div className="flex gap-3 items-start bg-[#12271F]/80 border border-emerald-900/30 rounded-xl p-3.5 shadow-sm">
            <span className="shrink-0 mt-0.5">{resultData.styleCards.strength.icon}</span>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-xs text-stone-200">{resultData.styleCards.strength.title}</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-medium">{resultData.styleCards.strength.text}</p>
            </div>
          </div>
        </div>

        {/* 💬 Section 4: Signature Quote */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xs tracking-widest text-emerald-400 px-1 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            經典語錄
          </h2>
          <div className="bg-[#582b2b]/30 border border-red-900/20 rounded-2xl p-4 text-center text-xs italic text-amber-100/90 font-medium tracking-wide leading-relaxed shadow-sm">
            {resultData.quote}
          </div>
        </div>

        {/* 🎅 Section 5: Message from Santa */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xs tracking-widest text-emerald-400 px-1 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            來自聖誕老人的信
          </h2>
          <div className="relative overflow-hidden bg-[#e6dfcc] border border-[#cbd5e1]/10 rounded-2xl p-5 text-stone-800 shadow-md transform rotate-[0.5deg]">
            {/* 💡 單色極簡雪橇裝飾圖標 */}
            <div className="absolute right-4 top-3 text-2xl opacity-10 select-none text-[#5c4d37]">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M19 13h-2V9h2v4zm2-5H3v10h18V8zm-4 7H5V10h12v5z"/>
              </svg>
            </div>
            <h4 className=" text-xs text-[#5c4d37] mb-2 tracking-wide font-pottaOne">親愛的小精靈，</h4>
            <p className="text-xs text-[#4a3e2b] leading-relaxed font-medium pl-1 pr-2">
              {resultData.santaLetter}
            </p>
            <div className="text-right mt-3 text-xs font-bold text-[#5c4d37] font-pottaOne tracking-wider pr-1">
              — 聖誕老人
            </div>
          </div>
        </div>

      </div>

      {/* 🏁 Section 6: Footer & Large Action Button */}
      <div className="w-full shrink-0 text-center mt-2 pt-2 border-t border-emerald-950/40">
        <p className="text-[11px] text-stone-400 tracking-wide mb-3">
          今年的聖誕任務圓滿落幕，準備好重返工廠了嗎？
        </p>
        
        <button
          type="button"
          className={`w-full py-3.5 rounded-2xl bg-linear-to-r ${resultData.buttonColor} text-white font-bold text-sm tracking-widest shadow-xl transition-all active:scale-[0.98] active:brightness-95`}
          onClick={playAgain}
        >
          ✦ 再次返回工廠 ✦
        </button>
      </div>

    </div>
  );
}