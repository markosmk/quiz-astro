import { MessageCircleQuestionIcon } from 'lucide-react';

export function Empty() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <MessageCircleQuestionIcon className="w-32 h-32" />
      <h2 className="text-3xl font-bold">Quizzes await! Make one now!</h2>
      <span className="font-light">Click below to get started...</span>
      <button className="p-3 px-4 text-white text-sm bg-black rounded-md">Create my first Quiz</button>
    </div>
  );
}
