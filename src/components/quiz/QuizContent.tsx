import { useEffect, useState } from 'react';

import type { Quiz } from '@/data/quizData';
import { useAppContext } from '@/hooks/context';
import { CircularProgressBar } from './CircularProgressBar';
import { QuizScore } from './QuizScore';

export function QuizContent({ quiz }: { quiz: Quiz }) {
  const {
    quizzes,
    setQuizzes,
    setCurrentQuiz,
    timer: { seconds, isRunning, startTimer, stopTimer },
  } = useAppContext();

  const { questions } = quiz;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [indexOfQuizSelected, setIndexOfQuizSelected] = useState<number | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const [score, setScore] = useState(0);

  // save statistics for current question, and go to next question
  const skipToNextQuestion = (timeout = 0) => {
    // update statistics for incorrect answer for current question
    setQuizzes((quizzes) => {
      const currentQuizzes = [...quizzes];
      currentQuizzes[indexOfQuizSelected!].questions[currentQuestionIndex].statistics.totalAttempts += 1;
      currentQuizzes[indexOfQuizSelected!].questions[currentQuestionIndex].statistics.incorrectAttempts += 1;
      return currentQuizzes;
    });

    // if not last question go to next question
    if (currentQuestionIndex !== questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((current) => current + 1);
        setSelectedChoice(null);
      }, timeout);
    } else {
      setIsQuizFinished(true);
      stopTimer();
    }
  };

  // at first to get index of selected quiz
  useEffect(() => {
    const quizIndexFound = quiz ? quizzes.findIndex((quiz) => quiz.id === quiz.id) : null;
    setIndexOfQuizSelected(quizIndexFound);
  }, []);

  useEffect(() => {
    if (isRunning && seconds === 0 && !isQuizFinished) {
      skipToNextQuestion(1000);
    }
  }, [seconds]);

  // when changed question re start timer
  useEffect(() => {
    startTimer(questions[currentQuestionIndex].timer);
  }, [currentQuestionIndex]);

  // simply to reset selected answers to current quiz
  useEffect(() => {
    if (isQuizFinished) {
      questions.forEach((question) => (question.selectedAnswer = null)); // or -1?
    }
  }, [isQuizFinished]);

  const moveToNextQuestion = () => {
    if (indexOfQuizSelected === null) return;

    const quiz = quizzes[indexOfQuizSelected].questions[currentQuestionIndex];

    if (quiz.selectedAnswer === null) {
      console.log('please select an answer');
      return;
    }

    quiz.statistics.totalAttempts += 1;

    if (questions[currentQuestionIndex].selectedAnswer !== questions[currentQuestionIndex].correctAnswer) {
      quiz.statistics.incorrectAttempts += 1;
      console.log('wrong answer');

      if (currentQuestionIndex !== questions.length - 1) {
        // setTimeout(() => {
        setSelectedChoice(null);
        setCurrentQuestionIndex((current) => current + 1);
        // }, 1000);
      } else {
        setIsQuizFinished(true);
        stopTimer();
      }
      return;
    }

    quiz.statistics.correctAttempts += 1;

    setScore((score) => score + 1);

    if (currentQuestionIndex === questions.length - 1 && quiz.correctAnswer === quiz.correctAnswer) {
      setIsQuizFinished(true);
      stopTimer();
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((current) => current + 1);
    }

    setSelectedChoice(null);
  };

  const onSelectedChoice = (choiceIdx: number) => {
    if (indexOfQuizSelected === null) return;

    setSelectedChoice(choiceIdx);

    // update selected answer on list quizzes
    setQuizzes((quizzes) => {
      const newQuizzes = [...quizzes];
      newQuizzes[indexOfQuizSelected].questions[currentQuestionIndex].selectedAnswer = choiceIdx;
      return newQuizzes;
    });
    // too update current quiz
    setCurrentQuiz(quizzes[indexOfQuizSelected]);
  };

  return isQuizFinished ? (
    <QuizScore
      score={score}
      actions={{
        setScore,
        setSelectedChoice,
        setIsQuizFinished,
        setIndexOfQuizSelected,
        setCurrentQuestionIndex,
      }}
    />
  ) : (
    <>
      <div className="mt-4 md:mt-10 flex flex-col relative">
        {/* progress Score */}
        <div className="relative mx-auto my-4 md:absolute top-0 right-0">
          <CircularProgressBar
            sqSize={124}
            strokeWidth={16}
            percentage={(currentQuestionIndex / questions.length) * 100}
            caption={`${score}/${questions.length}`}
          />
        </div>
        {/* subtitle */}
        <span className="text-sm font-light text-slate-500 mb-2 block">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        {/* title */}
        <div className="flex justify-start items-center gap-2 mr-[124px] pr-2">
          <div className="bg-black hidden md:flex justify-center items-center rounded-full w-10 h-10 text-white">
            {currentQuestionIndex + 1}
          </div>
          <p className="text-lg md:text-xl font-bold">{questions[currentQuestionIndex].question}</p>
        </div>
        {/* answers choices */}
        <div className="mt-6 flex flex-col gap-2">
          {questions[currentQuestionIndex].choices.map((choice, idx) => (
            <div
              key={idx}
              className={`p-3 md:p-4 self-start border-2 rounded-xl md:ml-10 hover:border-black hover:bg-black hover:text-white select-none cursor-pointer ${
                selectedChoice === idx ? 'bg-black text-white border-black' : 'border-slate-300'
              }`}
              onClick={() => onSelectedChoice(idx)}
            >
              {choice}
            </div>
          ))}
        </div>
      </div>
      {/* actions */}
      <div className="flex justify-end mt-10 gap-2">
        <button onClick={() => skipToNextQuestion()} className="p-3 px-4 text-white text-sm bg-black rounded-md">
          Skip
        </button>
        <button
          onClick={moveToNextQuestion}
          disabled={selectedChoice === null || isQuizFinished}
          className={`p-3 px-4 text-white text-sm bg-black rounded-md ${
            selectedChoice === null ? 'cursor-not-allowed opacity-50' : ' opacity-100'
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
        </button>
      </div>
    </>
  );
}
