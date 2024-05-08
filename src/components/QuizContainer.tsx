import { useEffect } from 'react';

import { useAppContext } from '@/hooks/context';
import { Empty } from './Empty';
import { QuizCard } from './QuizCard';

export function QuizContainer() {
  const { quizzes, setCurrentQuiz } = useAppContext();

  useEffect(() => {
    setCurrentQuiz(null);
  }, []);

  return (
    <div className="flex mt-10 gap-4 w-full px-4">
      {quizzes.length === 0 ? (
        <Empty />
      ) : (
        <div>
          <h2 className="text-xl font-bold">My Quizzes</h2>
          <div className="mt-6 flex gap-2 flex-wrap">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} {...quiz} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
