import { quizData, type Quiz } from '@/data/quizData';
import { createContext, useContext, useEffect, useState } from 'react';
import { useTimer } from './useTimer';

type Context = {
  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  currentQuiz: Quiz | null;
  setCurrentQuiz: React.Dispatch<React.SetStateAction<Quiz | null>>;
  timer: ReturnType<typeof useTimer>;
};

const AppContext = createContext<Context>({} as Context);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const timer = useTimer();

  useEffect(() => {
    setQuizzes(quizData);
  }, []);

  return (
    <AppContext.Provider
      value={{
        quizzes,
        setQuizzes,
        currentQuiz,
        setCurrentQuiz,
        timer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
