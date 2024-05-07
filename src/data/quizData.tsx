import { CodeXmlIcon } from 'lucide-react';

export type Quiz = {
  id: number;
  icon: JSX.Element;
  title: string;
  body: string;
  questions: Question[];
};
export type Question = {
  id: number;
  question: string;
  choices: string[];
  correctAnswer: number;
  selectedAnswer: null;
  statistics: {
    totalAttempts: number;
    correctAttempts: number;
    incorrectAttempts: number;
  };
};

export const quizData: Quiz[] = [
  {
    id: 1,
    icon: <CodeXmlIcon className="w-16 h-16" color="white" />,
    title: 'Javascript Quiz Example',
    body: 'This is a quiz description example',
    questions: [
      {
        id: 1,
        question: 'Javascript is...',
        choices: ['A: string', 'B: string', 'C: string', 'D: string'],
        correctAnswer: 1,
        selectedAnswer: null,
        statistics: {
          totalAttempts: 3,
          correctAttempts: 2,
          incorrectAttempts: 1,
        },
      },
    ],
  },
];
