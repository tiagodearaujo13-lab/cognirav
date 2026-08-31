import type { TestResultResponse } from '../types/index';

const TOTAL_TIME = 20 * 60; // 20 minutos em segundos

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function buildShareText(result: TestResultResponse): string {
  return (
    `🧠 Fiz o teste Cognirav de QI Fluida!\n` +
    `📊 QI Estimado: ${result.estimatedIQ}\n` +
    `🏆 Classificação: ${result.classification}\n` +
    `📈 Acertos: ${result.correctCount}/${result.totalQuestions}\n` +
    `Superior a ${result.percentile}% da população!\n\n` +
    `Tenta tu também → https://cognirav.app`
  );
}

export function buildWhatsAppUrl(result: TestResultResponse): string {
  const text = encodeURIComponent(buildShareText(result));
  return `https://wa.me/?text=${text}`;
}

export async function copyResultToClipboard(result: TestResultResponse): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(buildShareText(result));
    return true;
  } catch {
    return false;
  }
}

export { TOTAL_TIME };
