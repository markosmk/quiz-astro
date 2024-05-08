import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { quizData } from '@/data/quizData';
import { useAppContext } from '@/hooks/context';
import { QuizContent } from './QuizContent';
import { QuizHeader } from './QuizHeader';

export function QuizPage() {
  const { currentQuiz, setCurrentQuiz } = useAppContext();
  let { id } = useParams();

  useEffect(() => {
    if (!currentQuiz && id) {
      const quiz = quizData.find((quiz) => quiz.id === +id);
      if (!quiz) return;
      setCurrentQuiz(quiz);
    }
  }, []);

  if (!currentQuiz)
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-center">Please select a quiz</h2>
        <p className="text-center">No quiz selected</p>
        <div className="flex justify-center">
          <Link to="/" className="p-3 px-4  text-white text-sm text-center bg-black rounded-md">
            Go back
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col px-4 md:px-24 mt-10">
      <QuizHeader quiz={currentQuiz} />
      <QuizContent quiz={currentQuiz} />
    </div>
  );
}
