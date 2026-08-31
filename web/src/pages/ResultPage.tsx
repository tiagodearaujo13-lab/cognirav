import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Share2,
  Copy,
  RotateCcw,
  CheckCheck,
  TrendingUp,
} from 'lucide-react';
import { useQuiz } from '../hooks/useQuiz';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Card } from '../components/ui/Card';
import { buildWhatsAppUrl, copyResultToClipboard } from '../utils/shareCard';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../types/index';
import type { QuestionCategory } from '../types/index';

// Mapa de cores por categoria para os breakdowns
const CAT_COLORS: Record<QuestionCategory, string> = {
  numeric:    'from-blue-600 to-blue-400',
  logic:      'from-violet-600 to-violet-400',
  spatial:    'from-emerald-600 to-emerald-400',
  structural: 'from-amber-600 to-amber-400',
};

export const ResultPage: React.FC = () => {
  const { result, status, resetQuiz } = useQuiz();
  const [copied, setCopied] = useState(false);

  // Confetti para scores elevados (QI ≥ 116)
  useEffect(() => {
    if (result && result.estimatedIQ >= 116) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        void confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#4f46e5', '#7c3aed', '#10b981', '#f1f5f9'],
        });
        void confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#4f46e5', '#7c3aed', '#10b981', '#f1f5f9'],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [result]);

  const handleCopy = async () => {
    if (!result) return;
    const success = await copyResultToClipboard(result);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400">A carregar resultado…</p>
      </div>
    );
  }

  const iqRadius = 54;
  const iqCircumference = 2 * Math.PI * iqRadius;
  // Normalizar QI para arco (70–145 → 0–100%)
  const iqNorm = Math.min(100, Math.max(0, ((result.estimatedIQ - 70) / 75) * 100));
  const iqDash = (iqNorm / 100) * iqCircumference;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16 max-w-2xl mx-auto">
      {/* ── Topo ── */}
      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Relatório Cognirav</p>
      <h1
        className="font-display text-3xl md:text-4xl font-extrabold text-slate-100 text-center mb-12"
        style={{ textWrap: 'balance' }}
      >
        Avaliação Concluída
      </h1>

      {/* ── Score principal ── */}
      <Card className="w-full mb-6 text-center p-8 border-accent-indigo/30 animate-fade-in">
        {/* Círculo SVG */}
        <div className="flex justify-center mb-6">
          <svg width="140" height="140" viewBox="0 0 140 140" aria-label={`QI estimado: ${result.estimatedIQ}`}>
            {/* Track */}
            <circle
              cx="70" cy="70" r={iqRadius}
              stroke="rgba(79,70,229,0.15)"
              strokeWidth="10"
              fill="none"
            />
            {/* Arco de progresso */}
            <circle
              cx="70" cy="70" r={iqRadius}
              stroke="url(#iqGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${iqDash} ${iqCircumference}`}
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dasharray 1.2s ease-out' }}
            />
            <defs>
              <linearGradient id="iqGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            {/* Valor central */}
            <text
              x="70" y="65"
              textAnchor="middle" dominantBaseline="middle"
              className="fill-slate-100"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800 }}
            >
              {result.estimatedIQ}
            </text>
            <text
              x="70" y="88"
              textAnchor="middle" dominantBaseline="middle"
              className="fill-slate-400"
              style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif' }}
            >
              QI Estimado
            </text>
          </svg>
        </div>

        {/* Classificação */}
        <p className="font-display text-2xl font-bold text-slate-100 mb-1">{result.classification}</p>
        <p className="text-sm text-slate-500 mb-4">
          Acertos: <span className="text-slate-300 font-semibold font-mono">{result.correctCount}/{result.totalQuestions}</span>
        </p>

        {/* Percentil */}
        <div className="bg-brand-800 rounded-xl p-4 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              Percentil Populacional
            </span>
            <span className="font-mono text-sm font-bold text-indigo-300">{result.percentile}%</span>
          </div>
          <ProgressBar value={result.percentile} max={100} />
          <p className="text-[11px] text-slate-500 mt-2">
            Superior a <span className="text-emerald-400 font-semibold">{result.percentile}%</span> da população avaliada.
          </p>
        </div>
      </Card>

      {/* ── Breakdown por módulo ── */}
      <Card className="w-full mb-6 animate-slide-up">
        <h2 className="font-display text-base font-bold text-slate-300 mb-4">Desempenho por Módulo</h2>
        <div className="space-y-5">
          {result.categories.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="font-mono text-slate-500" aria-hidden="true">{CATEGORY_ICONS[cat.category as QuestionCategory]}</span>
                  {CATEGORY_LABELS[cat.category as QuestionCategory]}
                </span>
                <span className="font-mono text-sm text-slate-400">
                  {cat.correct}/{cat.total}
                  <span className="text-xs text-slate-600 ml-1">({cat.percentage}%)</span>
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-brand-800 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${CAT_COLORS[cat.category as QuestionCategory]} transition-all duration-700`}
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Ações ── */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button
          variant="primary"
          className="flex-1 gap-2"
          onClick={() => window.open(buildWhatsAppUrl(result), '_blank', 'noopener')}
          aria-label="Partilhar resultado no WhatsApp"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Partilhar no WhatsApp
        </Button>

        <Button
          variant="secondary"
          className="flex-1 gap-2"
          onClick={() => void handleCopy()}
          aria-label="Copiar resultado para a área de transferência"
        >
          {copied ? (
            <>
              <CheckCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copiar Resultado
            </>
          )}
        </Button>
      </div>

      {/* Aviso e botão de recomeço */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-600 mb-3">
          Cada e-mail permite apenas uma avaliação. Um novo teste requer um e-mail diferente.
        </p>
        {status === 'already_taken' ? (
          <p className="text-sm text-amber-400">Este e-mail já utilizou a sua tentativa.</p>
        ) : (
          <Button
            variant="ghost"
            className="gap-1.5 text-xs"
            onClick={resetQuiz}
            aria-label="Regressar à página inicial"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Voltar ao início
          </Button>
        )}
      </div>

      {/* Rodapé */}
      <footer className="mt-16 text-xs text-slate-700">
        Relatório gerado em {new Date(result.completedAt).toLocaleString('pt-PT')}
      </footer>
    </main>
  );
};
export default ResultPage;
