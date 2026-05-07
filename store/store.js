import { isQuestionDotToken } from 'typescript';
import { create } from 'zustand';

const questionData = [
    {
      title: "問題一",
      options: [
        {
          text: "選項一",
          value: 1
        },
        {
          text: "選項二",
          value: 2
        },
        {
          text: "選項三",
          value: 3
        }
      ]
    },
    {
      title: "問題二",
      options: [
        {
          text: "選項一",
          value: 1
        },
        {
          text: "選項二",
          value: 2
        },
        {
          text: "選項三",
          value: 3
        }
      ]
    },
    {
      title: "問題三",
      options: [
        {
          text: "選項一",
          value: 1
        },
        {
          text: "選項二",
          value: 2
        },
        {
          text: "選項三",
          value: 3
        }
      ]
    }
  ];

// 建立 store hook
const usePsyDataStore = create(
    (set) => ({
      psyData:{
        // questionIndex: 0,
        score: 0,
        questions: questionData
      },
      setScore:(score) => set( (state) => ( {psyData: {...state.psyData, score: score}}) )

    })
);

export { usePsyDataStore }