import { useAppContext } from '@/hooks/context';
import { useTimer } from '@/hooks/useTimer';
import { QuizContent } from './QuizContent';
import { QuizHeader } from './QuizHeader';

export function QuizPage() {
  const {
    initQuiz: { selectedQuiz },
  } = useAppContext();

  const { seconds, timeElapsed, reStart } = useTimer({
    timeInSeconds: 25,
    initiallyRunning: true,
  });

  return (
    <div className="flex flex-col px-24 mt-10">
      {selectedQuiz ? (
        <>
          <QuizHeader
            title={selectedQuiz.title}
            icon={selectedQuiz.icon}
            total={selectedQuiz.questions.length}
            timer={timeElapsed}
          />
          <QuizContent seconds={seconds} startTimer={reStart} />
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center">Please select a quiz</h2>
          <p>No quiz selected</p>
        </>
      )}
    </div>
  );
}
