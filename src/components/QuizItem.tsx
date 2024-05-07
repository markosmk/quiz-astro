import { ClockIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import useAppContext from '@/hooks/context';

export function QuizItem() {
  const {
    quizzes,
    setQuizzes,
    initQuiz: { selectedQuiz, setSelectedQuiz },
  } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [indexOfQuizSelected, setIndexOfQuizSelected] = useState<number | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

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

  const { icon, title, questions } = selectedQuiz;
  return (
    <div className="flex flex-col px-24 mt-10">
      {/* header */}
      <div className="flex justify-between">
        <div className="flex gap-2 justify-center">
          <div className="flex items-center justify-center p-2 rounded-md bg-black w-12 h-12">{icon}</div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm font-light">Total questions: {questions.length}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <ClockIcon className="w-8 h-8 -mt-1" />
          <div className="flex flex-col justify-center items-start">
            <p className="text-[12px] leading-3 text-slate-400">Time remaining</p>
            <span className="font-bold">00:00:29</span>
          </div>
        </div>
      </div>

      {/* question init */}
      <div className="mt-2 flex flex-col">
        {/* <!-- questions --> */}
        <div className="mt-10">
          {/* <!-- title .  --> */}
          <span className="text-sm font-light text-slate-400 mb-2 block">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="flex justify-start items-center gap-2">
            <div className="bg-black flex justify-center items-center rounded-full w-10 h-10 text-white">
              {currentQuestionIndex + 1}
            </div>
            <p className="text-xl font-bold">{questions[currentQuestionIndex].question}</p>
          </div>
        </div>
        {/* <!-- answers --> */}
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
      <div className="flex justify-end mt-10">
        <button onClick={moveToNextQuestion} className="p-3 px-4 text-white text-sm bg-black rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
}
