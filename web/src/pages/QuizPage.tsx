import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, AlertTriangle } from 'lucide-react';
import { useQuiz } from '../hooks/useQuiz';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { formatTime } from '../utils/shareCard';
import type { QuestionCategory } from '../types/index';
import { CATEGORY_LABELS } from '../types/index';

// ── Modal Lead Gate ─────────────────────────────────────────────────────────
interface EmailModalProps {
  onSubmit: (email: string) => void;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailModal: React.FC<EmailModalProps> = ({ onSubmit, onCancel, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = EMAIL_REGEX.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onSubmit(email.trim().toLowerCase());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-dark-card border border-dark-border rounded-2xl shadow-2xl shadow-blueprint-cyan/10 w-full max-w-md p-8 animate-scale-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blueprint-cyan/10 mb-4">
            <Send className="h-6 w-6 text-indigo-400" aria-hidden="true" />
          </div>
          <h2 id="modal-title" className="font-display text-2xl font-bold text-slate-100">
            Desbloquear Relatório
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Introduza o seu e-mail para receber o relatório oficial Cognirav.
            <span className="block mt-1 text-xs text-amber-400">⚠ Cada e-mail permite apenas uma avaliação.</span>
          </p>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="text-center py-6 space-y-3">
            <svg className="animate-spin h-10 w-10 text-indigo-400 mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-slate-400 animate-pulse">
              A processar matriz de respostas e a calcular percentil…
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Campo Email */}
            <div>
              <label htmlFor="email-input" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                E-mail
              </label>
              <input
                id="email-input"
                type="email"
                autoComplete="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                className={`
                  w-full rounded-lg border bg-dark-bg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-cyan focus-visible:ring-offset-1 focus-visible:ring-offset-dark-bg
                  ${touched && !isValid ? 'border-red-700' : 'border-dark-border hover:border-dark-borderHover'}
                `}
              />
              {touched && !isValid && (
                <p className="mt-1.5 text-xs text-red-400">Introduza um e-mail válido.</p>
              )}
            </div>

            {/* Erro de API */}
            {error && (
              <div className="flex gap-2 rounded-lg border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-300">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={!isValid}
              >
                Ver Resultado
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ── QuizPage Principal ───────────────────────────────────────────────────────
const MODULE_RANGES: Record<QuestionCategory, [number, number]> = {
  numeric:    [0, 7],
  logic:      [8, 15],
  spatial:    [16, 23],
  structural: [24, 29],
};

function getModule(index: number): QuestionCategory {
  for (const [cat, [min, max]] of Object.entries(MODULE_RANGES) as [QuestionCategory, [number, number]][]) {
    if (index >= min && index <= max) return cat;
  }
  return 'numeric';
}

export const QuizPage: React.FC = () => {
  const {
    questions,
    currentIndex,
    answers,
    timeLeft,
    status,
    error,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
  } = useQuiz();

  const [showModal, setShowModal] = useState(false);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const currentModule = getModule(currentIndex);
  const isTimeCritical = timeLeft < 120;

  const optionKeys = ['A', 'B', 'C', 'D'];

  // Navegação por teclado (A B C D)
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showModal) return;
      const key = e.key.toUpperCase();
      const idx = optionKeys.indexOf(key);
      if (idx !== -1 && question) {
        selectAnswer(question.id, question.options[idx]?.id ?? '');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, showModal]);

  const handleFinish = () => setShowModal(true);

  const handleEmailSubmit = async (email: string) => {
    await submitQuiz(email);
  };

  if (!question) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400">A carregar questões…</p>
      </div>
    );
  }

  return (
    <>
      {/* ── Modal de captura ── */}
      {showModal && (
        <EmailModal
          onSubmit={handleEmailSubmit}
          onCancel={() => setShowModal(false)}
          isLoading={status === 'submitting'}
          error={error}
        />
      )}

      <main className="min-h-screen flex flex-col max-w-2xl mx-auto px-4 py-8">
        {/* ── Top Bar ────────────────────────────────────────── */}
        <header className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            {/* Badge do módulo atual */}
            <Badge category={currentModule} />

            {/* Cronômetro */}
            <div
              className={`font-mono text-sm font-semibold tabular-nums px-3 py-1 rounded-full border transition-colors duration-500 ${
                isTimeCritical
                  ? 'border-red-700 bg-red-950/50 text-red-400 animate-pulse'
                  : 'border-dark-border bg-dark-surface text-neutral-300'
              }`}
              aria-label={`Tempo restante: ${formatTime(timeLeft)}`}
            >
              ⏱ {formatTime(timeLeft)}
            </div>
          </div>

          {/* Barra de progresso */}
          <ProgressBar value={currentIndex + 1} max={questions.length} />

          {/* Contador */}
          <div className="flex justify-between text-xs text-slate-500">
            <span>Questão {currentIndex + 1} de {questions.length}</span>
            <span>{answeredCount}/{questions.length} respondidas</span>
          </div>
        </header>

        {/* ── Enunciado ───────────────────────────────────────── */}
        <div className="animate-slide-up flex-1 space-y-6">
          <div className="rounded-2xl border border-dark-border bg-dark-card p-6">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
              Questão {String(currentIndex + 1).padStart(2, '0')} — {CATEGORY_LABELS[currentModule]}
            </p>
            <p className="text-lg text-slate-100 leading-relaxed font-medium" style={{ textWrap: 'balance' }}>
              {question.statement}
            </p>
          </div>

          {/* ── Opções ──────────────────────────────────────── */}
          <div className="grid gap-3" role="radiogroup" aria-label="Opções de resposta">
            {question.options.map((opt, i) => {
              const isSelected = answers[question.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => selectAnswer(question.id, opt.id)}
                  className={`
                    group w-full flex items-center gap-4 rounded-xl border px-5 py-4 text-left text-sm
                    transition-all duration-200 cursor-pointer
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg
                    ${
                      isSelected
                        ? 'border-blueprint-cyan bg-blueprint-cyan/10 text-slate-100 shadow-md shadow-blueprint-cyan/10'
                        : 'border-dark-border bg-dark-surface text-neutral-300 hover:border-blueprint-cyan/70 hover:bg-dark-card'
                    }
                  `}
                >
                  {/* Letra da opção */}
                  <span
                    className={`
                      flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs font-bold font-mono
                      transition-colors duration-200
                      ${isSelected ? 'bg-blueprint-cyan text-black' : 'bg-dark-card text-neutral-400 group-hover:bg-dark-border'}
                    `}
                    aria-hidden="true"
                  >
                    {optionKeys[i]}
                  </span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Rodapé de Navegação ──────────────────────────── */}
        <footer className="mt-8 flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            aria-label="Questão anterior"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Anterior
          </Button>

          {isLast ? (
            <Button
              variant="primary"
              className="flex-1 sm:flex-none"
              onClick={handleFinish}
              aria-label="Finalizar teste e obter resultado"
            >
              Finalizar Teste
              <Send className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={nextQuestion}
              aria-label="Próxima questão"
            >
              Próxima
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </footer>
      </main>
    </>
  );
};
export default QuizPage;
