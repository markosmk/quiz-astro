import { CheckCircleIcon, CircleXIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAppContext } from '@/hooks/context';

type Props = {
  score: number;
  actions: {
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setIsQuizFinished: React.Dispatch<React.SetStateAction<boolean>>;
    setIndexOfQuizSelected: React.Dispatch<React.SetStateAction<number | null>>;
    setSelectedChoice: React.Dispatch<React.SetStateAction<number | null>>;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  };
};

export function QuizScore({ score, actions }: Props) {
  const { currentQuiz, quizzes } = useAppContext();
  const { setScore, setIsQuizFinished, setIndexOfQuizSelected, setSelectedChoice, setCurrentQuestionIndex } = actions;
  const { questions } = currentQuiz!;

  const emojiScore = () => {
    const emojiMap = {
      1: '😭',
      2: '🙁',
      3: '😐',
      4: '🙂',
      5: '😁',
    };
    if (!currentQuiz) return emojiMap[3];
    const result = Math.ceil(score / questions.length) * 100;

    if (result > 0 && result <= 20) return emojiMap[1];
    if (result > 20 && result <= 40) return emojiMap[2];
    if (result > 40 && result <= 60) return emojiMap[3];
    if (result > 60 && result <= 80) return emojiMap[4];
    if (result > 80 && result <= 100) return emojiMap[5];
    return emojiMap[3];
  };

  const onTryAgain = () => {
    setIsQuizFinished(false);
    setIndexOfQuizSelected(quizzes.findIndex((quiz) => quiz.id === currentQuiz?.id));
    setSelectedChoice(null);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <span className="grayscale text-[160px] h-[150px] my-4 flex items-center justify-center">{emojiScore()}</span>
        <h1 className="text-slate-500 text-center mt-4">Quiz Completed... see results..</h1>
        <h2 className="text-3xl font-bold">Your Score</h2>
        <p className="text-6xl font-bold">
          {score}/{questions.length}
        </p>
      </div>

      <div className="w-full mt-8 flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <CheckCircleIcon className="w-6 h-6" />
          <span className="font-bold">Correct Answers: {score}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <CircleXIcon className="w-6 h-6" />
          <span className="font-bold">Incorrect Answers: {questions.length - score}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="p-3 px-4 mt-6 text-white text-sm bg-black rounded-md" onClick={onTryAgain}>
          Try Again
        </button>
        <Link to="/" className="p-3 px-4 mt-6 text-white text-sm bg-black rounded-md" onClick={onTryAgain}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
