import { quizData, type Quiz } from '@/data/quizData';
import { createContext, useContext, useEffect, useState } from 'react';

type Context = {
  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  initQuiz: { selectedQuiz: Quiz | null; setSelectedQuiz: React.Dispatch<React.SetStateAction<Quiz | null>> };
};

const AppContext = createContext<Context>({} as Context);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    setQuizzes(quizData);
  }, []);

  return (
    <AppContext.Provider
      value={{
        quizzes,
        setQuizzes,
        initQuiz: { selectedQuiz, setSelectedQuiz },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function useAppContext() {
  return useContext(AppContext);
}
