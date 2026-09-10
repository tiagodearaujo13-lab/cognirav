import { createContext } from 'react';
import type { QuestionPublic, QuizStatus, TestResultResponse } from '../types/index';

// ── Tipos do contexto ──────────────────────────────────────────────────────────
export interface QuizContextValue {
  status: QuizStatus;
  questions: QuestionPublic[];
  currentIndex: number;
  answers: Record<number, string>;
  timeLeft: number;
  result: TestResultResponse | null;
  error: string | null;
  startQuiz: () => Promise<void>;
  selectAnswer: (questionId: number, optionId: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitQuiz: (email: string) => Promise<void>;
  resetQuiz: () => void;
}

export const QuizContext = createContext<QuizContextValue | null>(null);
