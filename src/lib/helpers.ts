import type { Question } from '@/data/quizData';

export function calculateSuccessRate(questions: Question[]) {
  let correctQuestions = 0;
  let totalAttempts = 0;
  let successRate = 0;
  questions.forEach((question) => {
    totalAttempts += question.statistics.totalAttempts;
    correctQuestions += question.statistics.correctAttempts;
  });
  if (totalAttempts > 0) {
    successRate = Math.ceil((correctQuestions / totalAttempts) * 100);
  }
  return successRate;
}
