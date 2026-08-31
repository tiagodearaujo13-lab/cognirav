// Tipos partilhados entre o front-end e o back-end

export type QuestionCategory = 'numeric' | 'logic' | 'spatial' | 'structural';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuestionPublic {
  id: number;
  category: QuestionCategory;
  statement: string;
  options: QuestionOption[];
}

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

export type QuizStatus =
  | 'idle'
  | 'in_progress'
  | 'submitting'
  | 'completed'
  | 'already_taken';

export type CategoryLabel = {
  [K in QuestionCategory]: string;
};

export const CATEGORY_LABELS: CategoryLabel = {
  numeric: 'Raciocínio Numérico',
  logic: 'Lógica Dedutiva',
  spatial: 'Raciocínio Espacial',
  structural: 'Abstração Estrutural',
};

export const CATEGORY_ICONS: Record<QuestionCategory, string> = {
  numeric: '∑',
  logic: '⊃',
  spatial: '◈',
  structural: '⧉',
};
