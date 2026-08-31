import React from 'react';
import { Brain, Clock, Sigma, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useQuiz } from '../hooks/useQuiz';

const features = [
  {
    icon: Sigma,
    label: '30 Questões Calibradas',
    desc: 'Quatro módulos: Numérico, Lógica, Espacial e Abstração.',
  },
  {
    icon: Clock,
    label: '20 Minutos de Avaliação',
    desc: 'Tempo controlado com cronômetro regressivo e alerta visual.',
  },
  {
    icon: Shield,
    label: 'Tentativa Única por E-mail',
    desc: 'Resultados íntegros e auditáveis, sem repetições.',
  },
  {
    icon: CheckCircle2,
    label: '100% Gratuito',
    desc: 'Sem subscrição. Obtenha o seu relatório completo de forma imediata.',
  },
];

const scale = [
  { range: '28–30', iq: '131–145', label: 'Muito Superior', pct: '>99%' },
  { range: '24–27', iq: '116–130', label: 'Elevado / Superior', pct: '85–97%' },
  { range: '18–23', iq: '101–115', label: 'Média Superior', pct: '51–84%' },
  { range: '11–17', iq: '85–100',  label: 'Média Padrão',   pct: '16–50%' },
  { range: '0–10',  iq: '70–84',   label: 'Abaixo da Média', pct: '<16%' },
];

export const LandingPage: React.FC = () => {
  const { startQuiz, status } = useQuiz();

  const handleStart = () => {
    void startQuiz();
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center flex-1 px-6 pt-24 pb-20 text-center overflow-hidden">
        {/* Fundo decorativo radial */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[600px] h-[600px] rounded-full bg-accent-indigo/5 blur-3xl" />
        </div>

        {/* Badge de autoridade */}
        <span className="relative inline-flex items-center gap-2 rounded-full border border-accent-indigo/40 bg-accent-indigo/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-8">
          <Brain className="h-3.5 w-3.5" aria-hidden="true" />
          Teste Psicométrico Oficial de Inteligência Fluida
        </span>

        {/* Título principal */}
        <h1
          className="font-display text-5xl md:text-7xl font-extrabold text-slate-50 mb-6 leading-tight"
          style={{ textWrap: 'balance' }}
        >
          Descubra o seu{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            QI Fluido
          </span>
        </h1>

        <p className="max-w-xl text-slate-400 text-lg leading-relaxed mb-10">
          30 questões psicométricas calibradas avaliando raciocínio numérico,
          lógica dedutiva, perceção espacial e abstração estrutural.
          Resultados imediatos com precisão matemática.
        </p>

        <Button
          variant="primary"
          className="px-8 py-3.5 text-base rounded-full gap-2 shadow-lg shadow-accent-indigo/30 hover:shadow-accent-indigo/50 transition-shadow"
          onClick={handleStart}
          isLoading={status === 'idle' && false}
          aria-label="Iniciar avaliação cognitiva"
        >
          Iniciar Avaliação Cognitiva
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>

        {/* Métricas rápidas */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl w-full">
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-xl border border-brand-700/60 bg-brand-900/60 p-4 text-center backdrop-blur-sm"
            >
              <Icon className="h-5 w-5 text-indigo-400" aria-hidden="true" />
              <p className="text-xs font-semibold text-slate-200">{label}</p>
              <p className="text-[11px] text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Escala Psicométrica ──────────────────────────────── */}
      <section className="px-6 pb-20 max-w-3xl mx-auto w-full">
        <h2 className="font-display text-2xl font-bold text-slate-200 mb-6 text-center">
          Escala Psicométrica
        </h2>
        <div className="overflow-x-auto rounded-xl border border-brand-700/60">
          <table className="w-full text-sm text-left">
            <thead className="bg-brand-800 text-slate-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">Acertos</th>
                <th className="px-4 py-3">QI Estimado</th>
                <th className="px-4 py-3">Classificação</th>
                <th className="px-4 py-3 font-variant-numeric">Percentil</th>
              </tr>
            </thead>
            <tbody>
              {scale.map((row, i) => (
                <tr
                  key={row.range}
                  className={`border-t border-brand-700/40 ${i % 2 === 0 ? 'bg-brand-900' : 'bg-brand-950'}`}
                >
                  <td className="px-4 py-3 font-mono text-slate-300">{row.range}</td>
                  <td className="px-4 py-3 font-mono text-indigo-300">{row.iq}</td>
                  <td className="px-4 py-3 text-slate-200">{row.label}</td>
                  <td className="px-4 py-3 text-slate-400">{row.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Rodapé ──────────────────────────────────────────── */}
      <footer className="border-t border-brand-800 py-6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Cognirav — tiagodearaujo13-lab. Licença MIT.
      </footer>
    </main>
  );
};
export default LandingPage;
