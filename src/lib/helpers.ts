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

export function calculateScore(questions: Question[]) {
  let score = 0;
  questions.forEach((question) => {
    score += question.statistics.correctAttempts;
  });
  return score;
}

export function calculateTotalDuration(questions: Question[]) {
  const durationInSeconds =
    questions.reduce((acc, curr) => {
      return acc + curr.timer;
    }, 0) ?? 0;
  return durationInSeconds < 60 ? `${durationInSeconds} sec` : Math.floor(durationInSeconds / 60) + ' min';
}
