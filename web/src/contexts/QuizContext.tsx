import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { fetchQuestions, submitTest } from '../services/api';
import { TOTAL_TIME } from '../utils/shareCard';
import type {
  QuestionPublic,
  QuizStatus,
  TestResultResponse,
} from '../types/index';
import { QuizContext } from './quiz-context';

// ── Provider ───────────────────────────────────────────────────────────────────
export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<QuizStatus>('idle');
  const [questions, setQuestions] = useState<QuestionPublic[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [result, setResult] = useState<TestResultResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pendingEmailRef = useRef<string | null>(null);
  const answersRef = useRef(answers);
  const questionsRef = useRef(questions);

  // Mantém refs sincronizados com o estado mais recente (evita stale closures)
  useEffect(() => {
    answersRef.current = answers;
    questionsRef.current = questions;
  }, [answers, questions]);

  // ── Auto-submit (tempo esgotado) ────────────────────────────────────────────
  // Declarado antes do cronômetro e lendo o estado mais recente via refs,
  // para evitar acesso a variável antes da declaração dentro do setInterval.
  const autoSubmit = useCallback(
    async (email: string) => {
      setStatus('submitting');
      const payload = {
        email,
        answers: Object.entries(answersRef.current).map(([qId, opt]) => ({
          questionId: Number(qId),
          selectedOption: opt,
        })),
      };

      // Preencher respostas em falta com opção inválida (são contadas como erradas)
      const missing = questionsRef.current
        .filter((q) => !(q.id in answersRef.current))
        .map((q) => ({ questionId: q.id, selectedOption: 'x' }));

      payload.answers.push(...missing);

      const res = await submitTest(payload);
      if (res.success) {
        setResult(res.data);
        setStatus('completed');
      } else {
        setError(res.message);
        setStatus(res.alreadyCompleted ? 'already_taken' : 'in_progress');
      }
    },
    []
  );

  // ── Cronômetro ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (status === 'in_progress') {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            // Auto-submit quando o tempo esgota
            if (pendingEmailRef.current) {
              void autoSubmit(pendingEmailRef.current);
            } else {
              // Força estado de submissão sem email (modal será reapresentado)
              setStatus('submitting');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status, autoSubmit]);

  // ── Ações Públicas ──────────────────────────────────────────────────────────

  const startQuiz = useCallback(async () => {
    setError(null);
    setStatus('idle');

    let qs = questions;
    if (qs.length === 0) {
      qs = await fetchQuestions();
      setQuestions(qs);
    }

    setCurrentIndex(0);
    setAnswers({});
    setTimeLeft(TOTAL_TIME);
    setResult(null);
    setStatus('in_progress');
  }, [questions]);

  const selectAnswer = useCallback((questionId: number, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, 29));
  }, []);

  const prevQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const submitQuiz = useCallback(
    async (email: string) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      pendingEmailRef.current = email;
      setStatus('submitting');

      const allAnswers = questions.map((q) => ({
        questionId: q.id,
        selectedOption: answers[q.id] ?? 'x',
      }));

      const res = await submitTest({ email, answers: allAnswers });

      if (res.success) {
        setResult(res.data);
        setStatus('completed');
        setError(null);
      } else {
        setError(res.message);
        setStatus(res.alreadyCompleted ? 'already_taken' : 'in_progress');
      }
    },
    [answers, questions]
  );

  const resetQuiz = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStatus('idle');
    setCurrentIndex(0);
    setAnswers({});
    setTimeLeft(TOTAL_TIME);
    setResult(null);
    setError(null);
    pendingEmailRef.current = null;
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        currentIndex,
        answers,
        timeLeft,
        result,
        error,
        startQuiz,
        selectAnswer,
        nextQuestion,
        prevQuestion,
        submitQuiz,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
