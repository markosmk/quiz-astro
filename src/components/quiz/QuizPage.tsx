import { useAppContext } from '@/hooks/context';
import { useTimer } from '@/hooks/useTimer';
import { Link } from 'react-router-dom';
import { QuizContent } from './QuizContent';
import { QuizHeader } from './QuizHeader';

export function QuizPage() {
  const {
    initQuiz: { selectedQuiz },
  } = useAppContext();

  const { seconds, timeElapsed, reStart, stop } = useTimer({
    timeInSeconds: 25,
    initiallyRunning: selectedQuiz ? true : false,
  });

  return (
    <div className="flex flex-col px-4 md:px-24 mt-10">
      {selectedQuiz ? (
        <>
          <QuizHeader
            title={selectedQuiz.title}
            icon={selectedQuiz.icon}
            total={selectedQuiz.questions.length}
            timer={timeElapsed}
          />
          <QuizContent seconds={seconds} startTimer={reStart} stopTimer={stop} />
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-center">Please select a quiz</h2>
          <p className="text-center">No quiz selected</p>
          <Link to="/" className="p-3 px-4 text-white text-sm text-center bg-black rounded-md mt-4">
            Go back
          </Link>
        </div>
      )}
    </div>
  );
}
