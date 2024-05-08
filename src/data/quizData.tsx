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
  help?: string;
  choices: string[];
  timer: number;
  correctAnswer: number;
  selectedAnswer: number | null;
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
        question: 'What is the purpose of Javascript?',
        help: 'Select all that apply',
        choices: [
          'A. To create web pages',
          'B: To add interactivity to web pages',
          'C: To style web pages',
          'D: To perform server-side operations on web',
        ],
        timer: 15,
        correctAnswer: 1,
        selectedAnswer: null,
        statistics: {
          totalAttempts: 3,
          correctAttempts: 2,
          incorrectAttempts: 1,
        },
      },
      {
        id: 2,
        question: 'Wich of the following is not a javascript data type?',
        choices: ['A. Number', 'B. String', 'C. Boolean', 'D. Undefined'],
        timer: 5,
        correctAnswer: 3,
        selectedAnswer: null,
        statistics: {
          totalAttempts: 3,
          correctAttempts: 2,
          incorrectAttempts: 1,
        },
      },
      {
        id: 3,
        question: 'Which of the following is not a javascript operator?',
        choices: ['A. +', 'B. -', 'C. *', 'D. /', 'E. **'],
        timer: 25,
        correctAnswer: 4,
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
