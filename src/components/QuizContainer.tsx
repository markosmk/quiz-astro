import { useEffect } from 'react';

import { useAppContext } from '@/hooks/context';
import { PlusCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
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
            <Link
              to="/new"
              className="flex flex-col gap-2 border border-slate-200 bg-white p-4 justify-center items-center rounded-xl cursor-pointer w-[230px] hover:shadow-xl hover:shadow-slate-200 transition-shadow"
            >
              <PlusCircleIcon className="w-32 h-32" color="black" />
              <span className="select-none text-slate-500">Add a new Quiz</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
