import { ClockIcon } from 'lucide-react';

type Props = {
  title: string;
  icon: React.ReactNode;
  total: number;
  timer: string;
};

export function QuizHeader({ title, icon, total, timer }: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 justify-center">
        <div className="flex items-center justify-center p-2 rounded-md bg-black w-12 h-12">{icon}</div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm font-light">Total questions: {total}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <ClockIcon className="w-8 h-8 -mt-1" />
        <div className="flex flex-col justify-center items-start">
          <p className="text-[12px] leading-3 text-slate-400">Time remaining</p>
          <span className="font-bold">{timer}</span>
        </div>
      </div>
    </div>
  );
}
