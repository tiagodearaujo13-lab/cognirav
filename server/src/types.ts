export type QuestionCategory = 'numeric' | 'logic' | 'spatial' | 'structural';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuestionInternal {
  id: number;
  category: QuestionCategory;
  statement: string;
  options: QuestionOption[];
  correctAnswer: string;
}

export type QuestionPublic = Omit<QuestionInternal, 'correctAnswer'>;

export interface CategoryScore {
  category: QuestionCategory;
  total: number;
  correct: number;
  percentage: number;
}

export interface TestResultResponse {
  email: string;
  totalQuestions: number;
  correctCount: number;
  estimatedIQ: number;
  percentile: number;
  classification: string;
  categories: CategoryScore[];
  completedAt: string;
}

export interface AnswerPayload {
  questionId: number;
  selectedOption: string;
}

export interface SubmitPayload {
  email: string;
  answers: AnswerPayload[];
}
