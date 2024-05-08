import { ClockIcon } from 'lucide-react';

import type { Quiz } from '@/data/quizData';
import { useAppContext } from '@/hooks/context';

export function QuizHeader({ quiz: { title, icon, questions } }: { quiz: Quiz }) {
  const {
    timer: { timeElapsed },
  } = useAppContext();
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-2 overflow-hidden">
      <div className="flex gap-2 w-full">
        <div className="flex items-center justify-center p-2 rounded-md bg-black w-12 h-12">{icon}</div>
        <div className="flex flex-col">
          <h2 className="text-lg md:text-xl font-bold">{title}</h2>
          <p className="text-sm font-light text-slate-500">
            Total questions: <span className="font-bold">{questions.length}</span>
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-4 md:mt-0">
        <ClockIcon className="w-8 h-8 -mt-1" />
        <div className="flex flex-col justify-center items-start">
          <p className="text-[12px] leading-3 text-slate-400 truncate">Time remaining</p>
          <span className="font-bold">{timeElapsed}</span>
        </div>
      </div>
    </div>
  );
}
