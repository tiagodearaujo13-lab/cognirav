import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { questionsDatabase } from '../data/questions.js';
import type {
  QuestionPublic,
  CategoryScore,
  TestResultResponse,
  QuestionCategory,
} from '../types.js';

export const testRouter = Router();

// ── Estado em memória (trava de e-mail único) ─────────────────────────────────
const completedTests = new Map<string, TestResultResponse>();

// ── Helpers ───────────────────────────────────────────────────────────────────
function calculateIQ(correct: number): { iq: number; percentile: number; classification: string } {
  if (correct <= 10) {
    return {
      iq: 70 + Math.round((correct / 10) * 14),
      percentile: Math.round((correct / 10) * 16),
      classification: 'Abaixo da Média',
    };
  } else if (correct <= 17) {
    return {
      iq: 85 + Math.round(((correct - 11) / 6) * 15),
      percentile: 16 + Math.round(((correct - 11) / 6) * 34),
      classification: 'Média Padrão',
    };
  } else if (correct <= 23) {
    return {
      iq: 101 + Math.round(((correct - 18) / 5) * 14),
      percentile: 51 + Math.round(((correct - 18) / 5) * 33),
      classification: 'Média Superior',
    };
  } else if (correct <= 27) {
    return {
      iq: 116 + Math.round(((correct - 24) / 3) * 14),
      percentile: 85 + Math.round(((correct - 24) / 3) * 12),
      classification: 'Elevado / Superior',
    };
  } else {
    return {
      iq: 131 + Math.round(((correct - 28) / 2) * 14),
      percentile: 99,
      classification: 'Muito Superior (Mensa Level)',
    };
  }
}

function computeCategoryScores(
  answers: Array<{ questionId: number; selectedOption: string }>
): CategoryScore[] {
  const categories: QuestionCategory[] = ['numeric', 'logic', 'spatial', 'structural'];

  return categories.map((cat) => {
    const catQuestions = questionsDatabase.filter((q) => q.category === cat);
    const total = catQuestions.length;
    const correct = catQuestions.reduce((acc, q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      return acc + (answer?.selectedOption === q.correctAnswer ? 1 : 0);
    }, 0);
    return {
      category: cat,
      total,
      correct,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  });
}

// ── Schema Zod ────────────────────────────────────────────────────────────────
const AnswerSchema = z.object({
  questionId: z.number().int().min(1).max(30),
  selectedOption: z.enum(['a', 'b', 'c', 'd']),
});

const SubmitSchema = z.object({
  email: z
    .string()
    .email('E-mail inválido.')
    .toLowerCase()
    .transform((v) => v.trim()),
  answers: z
    .array(AnswerSchema)
    .length(30, 'São necessárias exactamente 30 respostas.'),
});

// ── GET /api/questions ─────────────────────────────────────────────────────────
testRouter.get('/questions', (_req: Request, res: Response) => {
  const publicQuestions: QuestionPublic[] = questionsDatabase.map(
    ({ correctAnswer: _omit, ...rest }) => rest
  );
  res.status(200).json(publicQuestions);
});

// ── POST /api/submit ───────────────────────────────────────────────────────────
testRouter.post('/submit', (req: Request, res: Response) => {
  const parsed = SubmitSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: 'Dados inválidos.',
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { email, answers } = parsed.data;

  // Trava de tentativa única
  if (completedTests.has(email)) {
    res.status(409).json({
      error: 'Este e-mail já realizou o teste Cognirav.',
      alreadyCompleted: true,
    });
    return;
  }

  // Cálculo de acertos
  const correctCount = questionsDatabase.reduce((acc, q) => {
    const answer = answers.find((a) => a.questionId === q.id);
    return acc + (answer?.selectedOption === q.correctAnswer ? 1 : 0);
  }, 0);

  const { iq, percentile, classification } = calculateIQ(correctCount);
  const categories = computeCategoryScores(answers);

  const result: TestResultResponse = {
    email,
    totalQuestions: 30,
    correctCount,
    estimatedIQ: iq,
    percentile,
    classification,
    categories,
    completedAt: new Date().toISOString(),
  };

  completedTests.set(email, result);

  res.status(201).json(result);
});
