import type { QuestionPublic, TestResultResponse, SubmitPayload } from '../types/index';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// ── Obter questões ─────────────────────────────────────────────────────────────
export async function fetchQuestions(): Promise<QuestionPublic[]> {
  const res = await fetch(`${API_BASE}/questions`);
  if (!res.ok) {
    throw new Error(`Erro ao carregar questões: ${res.status}`);
  }
  return res.json() as Promise<QuestionPublic[]>;
}

// ── Submeter respostas ─────────────────────────────────────────────────────────
export type SubmitResult =
  | { success: true; data: TestResultResponse }
  | { success: false; alreadyCompleted: boolean; message: string };

export async function submitTest(payload: SubmitPayload): Promise<SubmitResult> {
  const res = await fetch(`${API_BASE}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = await res.json() as Record<string, unknown>;

  if (res.status === 409) {
    return {
      success: false,
      alreadyCompleted: true,
      message:
        (body['error'] as string) ??
        'Este e-mail já realizou o teste Cognirav.',
    };
  }

  if (!res.ok) {
    return {
      success: false,
      alreadyCompleted: false,
      message: (body['error'] as string) ?? 'Erro inesperado ao submeter o teste.',
    };
  }

  return { success: true, data: body as unknown as TestResultResponse };
}
