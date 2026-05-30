import { create } from 'zustand';

const questionData = [
    {
      title: "今天聖誕老人比較晚來禮物工廠，沒人監督聖誕小精靈們導致狀況有點混亂，這時你會...",
      options: [
        {
          text: "看不下去，跳出來主動分配工作",
          pop_value: 6,
          eff_value: 8
        },
        {
          text: "喔...我先把我能做的做完",
          pop_value: 2,
          eff_value: 5
        },
        {
          text: "太好啦！可以偷懶了:D 我偷偷滑個手機",
          pop_value: 1,
          eff_value: 1
        },
        {
          text: "詢問有沒有哪裡需要幫忙的",
          pop_value: 4,
          eff_value: 6
        }
      ]
    },
    {
      title: "不好了！隔壁的小精靈手滑，不小心把熱可可倒在準備送出的禮物上，這時你會...",
      options: [
        {
          text: "大驚失色：「哇啊啊怎麼辦！」講笑話安撫緊張的氣氛",
          pop_value: 7,
          eff_value: 2
        },
        {
          text: "立刻舒緩氣氛：「大家不用緊張！你拿抹布，我先把東西移走，看倉庫有沒有備用的禮物」",
          pop_value: 5,
          eff_value: 8
        },
        {
          text: "遞給他抹布，默默幫忙處理",
          pop_value: 2,
          eff_value: 6
        },
        {
          text: "慶幸不是倒在自己這邊，裝作沒看到把自己的東西移遠一點，繼續做自己的事",
          pop_value: 1,
          eff_value: 2
        }
      ]
    },
    {
      title: "終於到了午休時間，聖誕老人請大家喝熱可可跟薑餅人，但眼看午休時間快要結束了，大家都還在聊天玩樂，這時你會...",
      options: [
        {
          text: "我就是沒有意識到午休要結束的那個，試著炒熱氣氛讓大家都開心！",
          pop_value: 8,
          eff_value: 1
        },
        {
          text: "大聲提醒大家：「午休時間要結束嘍！吃飽的人可以先回去工作」",
          pop_value: 5,
          eff_value: 8
        },
        {
          text: "默默拿了兩片餅乾回座位，繼續把工作做完",
          pop_value: 2,
          eff_value: 8
        },
        {
          text: "直接溜回小精靈宿舍躺平，下午開工鐘聲響起前絕對不起來",
          pop_value: 1,
          eff_value: 1
        }
      ]
    },
    {
      title: "禮物都包好了！這時大家要把成千上萬的禮物搬上雪橇，你會...",
      options: [
        {
          text: "站在雪橇旁幫忙指揮，掌控全場物流",
          pop_value: 6,
          eff_value: 8
        },
        {
          text: "偷偷拿胡蘿蔔去餵麋鹿，跟牠們自拍、聊天，稱讚牠們今天好帥",
          pop_value: 8,
          eff_value: 1
        },
        {
          text: "默默照著清單，把禮物搬到正確的位置上",
          pop_value: 2,
          eff_value: 7
        },
        {
          text: "假裝搬得很用力但其實都在摸魚，趁大家不注意時溜到雪橇後座的毛毯裡補眠",
          pop_value: 1,
          eff_value: 1
        }
      ]
    },
    {
      title: "好不容易把禮物放到聖誕樹下，轉身突然發現一個還沒睡覺的小朋友正揉著眼睛看著你！你會...",
      options: [
        {
          text: "超級興奮！大方地向他揮手比「噓」，還偷偷多送他一根聖誕拐杖糖，擊掌道別",
          pop_value: 8,
          eff_value: 2
        },
        {
          text: "公事公辦，立刻對他施展一個「1秒入睡」的催眠魔法，拍拍手迅速撤離現場",
          pop_value: 2,
          eff_value: 8
        },
        {
          text: "嚇了一跳！一邊慌張地對他比「噓」，尷尬地笑手忙腳亂地爬回煙囪",
          pop_value: 5,
          eff_value: 4
        },
        {
          text: "靈機一動，立刻擺出專業的定格姿勢偽裝成聖誕樹上的假精靈娃娃，等他自己睡著",
          pop_value: 2,
          eff_value: 6
        }
      ]
    }
  ];

function emptyAnswers() {
  return questionData.map(() => null);
}

function totalsFromAnswers(questions, answers) {
  let totalPop = 0;
  let totalEff = 0;

  answers.forEach((optionIndex, questionIndex) => {
    if (optionIndex === null) return;
    const option = questions[questionIndex].options[optionIndex];
    totalPop += option.pop_value;
    totalEff += option.eff_value;
  });

  return { totalPop, totalEff };
}

const usePsyDataStore = create((set) => ({
  psyData: {
    totalPop: 0,
    totalEff: 0,
    questions: questionData,
    answers: emptyAnswers(),
  },

  setAnswer: (questionIndex, optionIndex) =>
    set((state) => {
      const answers = [...state.psyData.answers];
      answers[questionIndex] = optionIndex;
      const { totalPop, totalEff } = totalsFromAnswers(
        state.psyData.questions,
        answers
      );

      return {
        psyData: {
          ...state.psyData,
          answers,
          totalPop,
          totalEff,
        },
      };
    }),

  resetGame: () =>
    set((state) => ({
      psyData: {
        ...state.psyData,
        totalPop: 0,
        totalEff: 0,
        answers: emptyAnswers(),
      },
    })),
}));

export { usePsyDataStore };
