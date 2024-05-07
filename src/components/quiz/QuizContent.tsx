import { useEffect, useState } from 'react';

import { useAppContext } from '@/hooks/context';

export function QuizContent({ seconds, startTimer }: { seconds: number; startTimer: () => void }) {
  const {
    quizzes,
    setQuizzes,
    initQuiz: { selectedQuiz, setSelectedQuiz },
  } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [indexOfQuizSelected, setIndexOfQuizSelected] = useState<number | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const { questions } = selectedQuiz!;

  useEffect(() => {
    console.log({ seconds, currentQuestionIndex });
    if (seconds === 0) {
      if (!selectedQuiz) return;
      if (currentQuestionIndex !== selectedQuiz?.questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((current) => current + 1);
        }, 1000);
      } else {
        setIsQuizFinished(true);
      }
    }
  }, [seconds]);

  useEffect(() => {
    startTimer();
  }, [currentQuestionIndex]);

  useEffect(() => {
    const quizIndexFound = selectedQuiz ? quizzes.findIndex((quiz) => quiz.id === selectedQuiz.id) : null;
    setIndexOfQuizSelected(quizIndexFound);
  }, []);

  useEffect(() => {
    if (isQuizFinished) {
      selectedQuiz?.questions.forEach((question) => (question.selectedAnswer = null)); // or -1?
    }
  }, [isQuizFinished]);

  if (!selectedQuiz) return null;

  const moveToNextQuestion = () => {
    if (!selectedQuiz || indexOfQuizSelected === null) return;

    // selectedQuiz?.questions[currentQuestionIndex].selectedAnswer === null
    if (quizzes[indexOfQuizSelected].questions[currentQuestionIndex].selectedAnswer === null) {
      console.log('please select an answer');
      return;
    }

    quizzes[indexOfQuizSelected].questions[currentQuestionIndex].statistics.totalAttempts += 1;

    if (
      selectedQuiz.questions[currentQuestionIndex].selectedAnswer !==
      selectedQuiz.questions[currentQuestionIndex].correctAnswer
    ) {
      quizzes[indexOfQuizSelected].questions[currentQuestionIndex].statistics.incorrectAttempts += 1;
      console.log('wrong answer');
      return;
    }

    quizzes[indexOfQuizSelected].questions[currentQuestionIndex].statistics.correctAttempts += 1;

    if (currentQuestionIndex === selectedQuiz.questions.length - 1) {
      setIsQuizFinished(true);
      return;
    }

    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex((current) => current + 1);
    }
    setSelectedChoice(null);
  };

  const onSelectedChoice = (choiceIdx: number) => {
    if (!selectedQuiz || indexOfQuizSelected === null) return;

    setSelectedChoice(choiceIdx);

    setQuizzes((quizzes) => {
      const newQuizzes = [...quizzes];
      newQuizzes[indexOfQuizSelected].questions[currentQuestionIndex].selectedAnswer = choiceIdx;
      return newQuizzes;
    });

    setSelectedQuiz(quizzes[indexOfQuizSelected]);
  };

  return isQuizFinished ? (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-center">Quiz Completed</h2>
    </div>
  ) : (
    <>
      <div className="mt-10 flex flex-col">
        {/* subtitle */}
        <span className="text-sm font-light text-slate-400 mb-2 block">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        {/* title */}
        <div className="flex justify-start items-center gap-2">
          <div className="bg-black flex justify-center items-center rounded-full w-10 h-10 text-white">
            {currentQuestionIndex + 1}
          </div>
          <p className="text-xl font-bold">{questions[currentQuestionIndex].question}</p>
        </div>
        {/* answers choices */}
        <div className="mt-6 flex flex-col gap-2">
          {questions[currentQuestionIndex].choices.map((choice, idx) => (
            <div
              key={idx}
              className={`p-4 self-start border-2 rounded-xl ml-10 hover:border-black hover:bg-black hover:text-white select-none cursor-pointer transition-all ${
                selectedChoice === idx ? 'bg-black text-white border-black' : 'border-slate-300'
              }`}
              onClick={() => onSelectedChoice(idx)}
            >
              {choice}
            </div>
          ))}
        </div>
      </div>
      {/* continue */}
      <div className="flex justify-end mt-10">
        <button onClick={moveToNextQuestion} className="p-3 px-4 text-white text-sm bg-black rounded-md">
          Submit
        </button>
      </div>
    </>
  );
}
