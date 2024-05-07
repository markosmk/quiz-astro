import { EllipsisIcon, MedalIcon, PlayIcon } from 'lucide-react';
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
    <li className="rounded-lg flex flex-col border border-gray-300 bg-white">
      <div onClick={handleClick} className="flex flex-col gap-2 p-4 cursor-pointer">
        <div className="relative bg-black w-full h-32 flex justify-center items-center rounded-md">
          <div className="absolute cursor-pointer top-3 right-3">
            <EllipsisIcon className="w-6 h-6" color="white" />
          </div>
          {icon}
          {/* <CodeXmlIcon className="w-16 h-16" color="white" /> */}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm font-light">{questions.length} question(s)</p>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 items-center">
            <MedalIcon className="w-4 h-4" color="green" />
            <span className="text-xs">Success rate: {globalSuccessRate}%</span>
          </div>
          <div className="rounded-full bg-black w-6 h-6 flex items-center justify-center">
            <PlayIcon className="w-4 h-4" color="white" />
          </div>
        </div>
      </div>
    </li>
  );
}
