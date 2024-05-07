import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import { ContextProvider } from '@/hooks/context';
import { QuizContainer } from './QuizContainer';
import { QuizItem } from './QuizItem';

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <QuizContainer />,
  },
  {
    path: 'about',
    element: (
      <div className="flex flex-col justify-center items-center gap-4 mt-10">
        <h1 className="text-3xl font-bold">About Us</h1>
        <Link to="/" className="p-3 px-4 text-white text-sm bg-black rounded-md">
          Go Home
        </Link>
      </div>
    ),
  },
  {
    path: 'quiz/:id',
    element: <QuizItem />,
  },
  {
    path: '*',
    element: <NoMatch />,
  },
]);

export function QuizApp({ pathname }: { pathname: string }) {
  return import.meta.env.SSR ? (
    <StaticRouter location={pathname}>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </StaticRouter>
  ) : (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

function NoMatch() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-10">
      <h2 className="text-3xl font-bold">Nothing to see here!</h2>
      <p>
        <Link to="/" className="hover:underline">
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
