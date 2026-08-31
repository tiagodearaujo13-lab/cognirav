import { useContext } from 'react';
import { QuizContext } from '../contexts/QuizContext';

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error('useQuiz deve ser usado dentro de <QuizProvider>');
  }
  return ctx;
}
