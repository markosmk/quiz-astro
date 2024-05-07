import { quizData, type Quiz } from '@/data/quizData';
import { createContext, useContext, useEffect, useState } from 'react';

type Context = {
  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
};

const AppContext = createContext<Context>({} as Context);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    setQuizzes(quizData);
  });
  return <AppContext.Provider value={{ quizzes, setQuizzes }}>{children}</AppContext.Provider>;
}

export default function useAppContext() {
  return useContext(AppContext);
}
