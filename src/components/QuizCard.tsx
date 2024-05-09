import { ActivityIcon, ClockIcon, EllipsisIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import type { Quiz } from '@/data/quizData';
import { useAppContext } from '@/hooks/context';
import { calculateSuccessRate, calculateTotalDuration } from '@/lib/helpers';

export function QuizCard(quiz: Quiz) {
  const navigate = useNavigate();
  const { title, id, questions, icon } = quiz;
  const { setCurrentQuiz } = useAppContext();
  const globalSuccessRate = calculateSuccessRate(questions);
  const duration = calculateTotalDuration(questions);

  const handleClick = () => {
    setCurrentQuiz(quiz);
    navigate('quiz/' + id);
  };

  return (
    <li className="rounded-xl flex flex-col border border-slate-200 bg-white w-[230px]">
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
        <h2 className="text-xl font-bold truncate">{title}</h2>
        <p className="text-sm font-light text-slate-500">{questions.length} question(s)</p>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-1 items-center">
            <ActivityIcon className="w-4 h-4" />
            <p className="text-xs text-slate-500">Success Rate: {globalSuccessRate}%</p>
          </div>
          <div className="flex gap-1 items-center">
            <ClockIcon className="w-4 h-4" />
            <p className="text-xs text-slate-500">{duration}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
