import React, { useState } from 'react';
import { AlertTriangle, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useQuiz } from '../hooks/useQuiz';
import { CornerBrackets } from '../components/landing/SvgElements';
import { Button } from '../components/ui/Button';
import { formatTime } from '../utils/shareCard';
import type { QuestionCategory } from '../types/index';
import { CATEGORY_LABELS } from '../types/index';

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isValid) onSubmit(email.trim().toLowerCase());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="w-full max-w-md rounded-2xl border border-dark-border bg-dark-card p-8 shadow-2xl shadow-blueprint-cyan/10">
        <div className="mb-6 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blueprint-cyan/10">
            <Send className="h-6 w-6 text-blueprint-cyan" aria-hidden="true" />
          </div>
          <h2 id="modal-title" className="font-headline text-2xl uppercase text-slate-100">Desbloquear relatório</h2>
          <p className="mt-2 text-sm text-slate-400">Introduza o seu e-mail para receber o relatório oficial Cognirav.<span className="mt-1 block text-xs text-amber-400">⚠ Cada e-mail permite apenas uma avaliação.</span></p>
        </div>
        {isLoading ? (
          <div className="space-y-3 py-6 text-center"><div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-blueprint-cyan/20 border-t-blueprint-cyan" /><p className="text-sm text-slate-400">A calcular perfil psicométrico…</p></div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="email-input" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">E-mail</label>
              <input id="email-input" type="email" autoComplete="email" placeholder="seuemail@exemplo.com" value={email} onChange={(event) => setEmail(event.target.value)} onBlur={() => setTouched(true)} className={`w-full rounded-lg border bg-dark-bg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-cyan ${touched && !isValid ? 'border-red-700' : 'border-dark-border'}`} />
              {touched && !isValid && <p className="mt-1.5 text-xs text-red-400">Introduza um e-mail válido.</p>}
            </div>
            {error && <div className="flex gap-2 rounded-lg border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-300"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /><span>{error}</span></div>}
            <div className="flex gap-3 pt-2"><Button type="button" variant="ghost" className="flex-1" onClick={onCancel}>Cancelar</Button><Button type="submit" variant="primary" className="flex-1" disabled={!isValid}>Ver resultado</Button></div>
          </form>
        )}
      </div>
    </div>
  );
};

const MODULE_RANGES: Record<QuestionCategory, [number, number]> = { numeric: [0, 7], logic: [8, 15], spatial: [16, 23], structural: [24, 29] };

function getModule(index: number): QuestionCategory {
  for (const [category, [min, max]] of Object.entries(MODULE_RANGES) as [QuestionCategory, [number, number]][]) {
    if (index >= min && index <= max) return category;
  }
  return 'numeric';
}

const MatrixViewport: React.FC<{ index: number; statement: string }> = ({ index, statement }) => (
  <div className="relative overflow-hidden border border-dark-border bg-[#0D0E10] p-5 sm:p-8" data-testid="matrix-viewport">
    <CornerBrackets />
    <span className="absolute left-3 top-2 font-mono text-[9px] tracking-[.25em] text-blueprint-cyan/60">VIEWPORT / MATRIX_{String(index + 1).padStart(2, '0')}</span>
    <span className="absolute right-3 top-2 font-mono text-[9px] text-dark-subtext">+ Y:{String(index + 1).padStart(2, '0')}</span>
    <div className="mx-auto flex aspect-[16/9] max-w-2xl items-center justify-center border border-blueprint-cyan/15 bg-[radial-gradient(circle,rgba(0,163,255,.08),transparent_62%)] p-6">
      <div className="grid w-44 grid-cols-3 gap-1.5 sm:w-56">
        {Array.from({ length: 9 }, (_, cell) => (
          <div key={cell} className={`flex aspect-square items-center justify-center border border-blueprint-cyan/25 ${cell === 8 ? 'border-dashed bg-blueprint-cyan/5' : 'bg-dark-surface/70'}`}>
            {cell === 8 ? <span className="font-mono text-xl text-blueprint-cyan">?</span> : <span className="h-3 w-3 rotate-45 border border-blueprint-cyan/60 sm:h-5 sm:w-5" />}
          </div>
        ))}
      </div>
    </div>
    <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-neutral-300 sm:text-base">{statement}</p>
    <div className="mt-4 flex justify-between font-mono text-[9px] uppercase tracking-widest text-dark-subtext"><span>ALIGN +</span><span>NON-VERBAL SIGNAL</span><span>+ ALIGN</span></div>
  </div>
);

export const QuizPage: React.FC = () => {
  const { questions, currentIndex, answers, timeLeft, status, error, selectAnswer, nextQuestion, prevQuestion, submitQuiz } = useQuiz();
  const [showModal, setShowModal] = useState(false);
  const question = questions[currentIndex];
  const currentModule = getModule(currentIndex);
  const totalQuestions = Math.max(30, questions.length);
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const isTimeCritical = timeLeft <= 300;
  const isLast = currentIndex === questions.length - 1;

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (showModal || !question) return;
      const optionIndex = Number(event.key) - 1;
      if (optionIndex >= 0 && optionIndex < question.options.length) {
        selectAnswer(question.id, question.options[optionIndex].id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [question, selectAnswer, showModal]);

  if (!question) return <div className="flex min-h-screen items-center justify-center bg-dark-bg text-slate-400">A carregar console…</div>;

  return (
    <>
      {showModal && <EmailModal onSubmit={(email) => void submitQuiz(email)} onCancel={() => setShowModal(false)} isLoading={status === 'submitting'} error={error} />}
      <main className="min-h-screen overflow-hidden bg-dark-bg px-4 py-5 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-6xl">
          <header className="border-b border-dark-border pb-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.3em] text-blueprint-cyan">COGNIRAV / PSYCHOMETRIC CONSOLE</p>
                <div className="mt-2 flex flex-wrap items-center gap-3"><h1 className="font-mono text-sm font-bold tracking-widest text-white">QUESTÃO {String(currentIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}</h1><span className="border border-blueprint-cyan/40 bg-blueprint-cyan/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-blueprint-cyan">CALIBRANDO PADRÃO</span></div>
              </div>
              <div className={`border px-4 py-2 font-mono text-lg tabular-nums ${isTimeCritical ? 'border-red-500/70 bg-red-500/10 text-red-300 animate-pulse' : 'border-blueprint-cyan/40 bg-blueprint-cyan/5 text-blueprint-cyan'}`} aria-label={`Tempo restante: ${formatTime(timeLeft)}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-4"><div className="flex flex-1 gap-1" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso da avaliação">{Array.from({ length: 30 }, (_, index) => <span key={index} className={`h-1 flex-1 ${index <= currentIndex ? 'bg-blueprint-cyan shadow-[0_0_8px_rgba(0,163,255,.55)]' : 'bg-dark-border'}`} />)}</div><span className="w-10 text-right font-mono text-xs text-blueprint-cyan">{progress}%</span></div>
            <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-dark-subtext"><span>{CATEGORY_LABELS[currentModule]}</span><span>{answeredCount}/{questions.length} respostas registradas</span></div>
          </header>

          <section className="mt-8" aria-label="Viewport de exame">
            <MatrixViewport index={currentIndex} statement={question.statement} />
          </section>

          <section className="mt-8" aria-label="Alternativas de resposta">
            <div className="mb-4 flex items-center justify-between"><p className="font-mono text-[10px] uppercase tracking-[.25em] text-dark-subtext">SELECT RESPONSE / USE KEYS 1—8</p><span className="font-mono text-[10px] text-blueprint-cyan">{question.options.length} SIGNALS</span></div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4" role="radiogroup" aria-label="Opções de resposta">
              {question.options.map((option, index) => {
                const selected = answers[question.id] === option.id;
                return <button key={option.id} type="button" data-testid={`answer-option-${index + 1}`} role="radio" aria-checked={selected} onClick={() => selectAnswer(question.id, option.id)} className={`group relative min-h-28 border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-cyan ${selected ? 'border-2 border-blueprint-cyan bg-blueprint-cyan/10 shadow-[0_0_20px_rgba(0,163,255,.25)]' : 'border-dark-border bg-dark-card hover:border-blueprint-cyan/70 hover:bg-dark-surface'}`}><span className="absolute right-3 top-3 font-mono text-[10px] text-blueprint-cyan">[{index + 1}]</span><span className={`mb-5 block h-8 w-8 border ${selected ? 'border-blueprint-cyan bg-blueprint-cyan/20' : 'border-dark-border bg-dark-surface'} transition-colors`} aria-hidden="true" /><span className="text-sm text-neutral-200">{option.text}</span></button>;
              })}
            </div>
          </section>

          <footer className="mt-8 flex items-center justify-between gap-3 border-t border-dark-border pt-5"><Button variant="secondary" onClick={prevQuestion} disabled={currentIndex === 0} aria-label="Questão anterior"><ChevronLeft className="h-4 w-4" aria-hidden="true" />Anterior</Button>{isLast ? <Button variant="primary" onClick={() => setShowModal(true)} aria-label="Finalizar teste e obter resultado">Finalizar Teste<Send className="ml-2 h-4 w-4" aria-hidden="true" /></Button> : <Button variant="secondary" onClick={nextQuestion} aria-label="Próxima questão">Próxima<ChevronRight className="h-4 w-4" aria-hidden="true" /></Button>}</footer>
        </div>
      </main>
    </>
  );
};

export default QuizPage;
