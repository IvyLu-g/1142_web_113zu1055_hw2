import { isQuestionDotToken } from 'typescript';
import { create } from 'zustand';

let questionData = [
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


const usePsyDataStore = create(
    (set) => ({
        questionIndex: 0,
        totalValue: 0,
        questions: questionData
    })
);

export { usePsyDataStore }