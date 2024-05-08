import { ActivityIcon, ChevronsRightIcon, EllipsisIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import type { Quiz } from '@/data/quizData';
import { useAppContext } from '@/hooks/context';
import { calculateSuccessRate } from '@/lib/helpers';

export function QuizCard(quiz: Quiz) {
  const navigate = useNavigate();
  const { title, id, questions, icon } = quiz;
  const {
    initQuiz: { setSelectedQuiz },
  } = useAppContext();
  const globalSuccessRate = calculateSuccessRate(questions);

  const handleClick = () => {
    setSelectedQuiz(quiz);
    navigate('quiz/' + id);
  };

  return (
    <li className="rounded-xl flex flex-col border border-slate-200 bg-white">
      <div
        onClick={handleClick}
        className="flex flex-col gap-2 p-4 cursor-pointer hover:shadow-xl hover:shadow-slate-200 transition-shadow rounded-xl"
      >
        <div className="relative bg-black w-full h-32 flex justify-center items-center rounded-xl">
          <div className="absolute cursor-pointer top-3 right-3">
            <EllipsisIcon className="w-6 h-6" color="white" />
          </div>
          {icon}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm font-light text-slate-500">{questions.length} question(s)</p>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 items-center">
            <ActivityIcon className="w-4 h-4" />
            <p className="text-xs text-slate-500">
              Success Rate: <span className="font-bold">{globalSuccessRate}%</span>
            </p>
          </div>
          <ChevronsRightIcon className="w-6 h-6" />
        </div>
      </div>
    </li>
  );
}
