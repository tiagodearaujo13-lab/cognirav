import React from 'react';
import { Activity, Gauge, LockKeyhole, Share2 } from 'lucide-react';
import { CornerBrackets } from './SvgElements';

const features = [
  { icon: Activity, code: 'NORM-01', title: 'Normatização Psicométrica Dinâmica', body: 'Curva gaussiana calibrada em μ=100 e σ=15 para contextualizar cada resultado.' },
  { icon: LockKeyhole, code: 'SEC-02', title: 'Isolamento Total do Gabarito', body: 'A chave de respostas não é exposta no DOM nem enviada nas requisições do frontend.' },
  { icon: Gauge, code: 'LAT-03', title: 'Telemetria de Resolução', body: 'Medição de latência por questão (latency_ms) para observar velocidade de processamento.' },
  { icon: Share2, code: 'CERT-04', title: 'Certificação Social', body: 'Credencial vetorial instantânea, pronta para compartilhar em alta resolução.' },
];

const GaussianCurve: React.FC = () => (
  <svg viewBox="0 0 240 64" className="mt-5 h-16 w-full" aria-label="Curva normal com média 100 e desvio padrão 15" role="img">
    <path d="M0 58H240M12 58C62 58 66 8 120 8s58 50 108 50" fill="none" stroke="#00A3FF" strokeOpacity=".75" />
    <path d="M12 58C62 58 66 8 120 8s58 50 108 50v0H12Z" fill="#00A3FF" fillOpacity=".08" />
    <path d="M120 8v50M76 44v14M164 44v14" stroke="#00A3FF" strokeDasharray="2 3" strokeOpacity=".45" />
    <text x="108" y="63" fill="#9EA2A8" fontSize="8">μ=100</text>
  </svg>
);

export const SectionFeatures: React.FC = () => (
  <section id="recursos" className="border-y border-dark-border/60 bg-dark-surface/30 px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[.3em] text-blueprint-cyan">[ SISTEMA COGNIRAV ]</p>
        <h2 className="mt-4 font-headline text-4xl uppercase tracking-tight text-white md:text-6xl">Instrumentação do teste</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, code, title, body }, index) => (
          <article key={code} className="relative min-h-[280px] border border-dark-border bg-dark-card p-6 transition-colors hover:border-blueprint-cyan/70" data-testid="feature-card">
            <CornerBrackets />
            <div className="relative">
              <div className="flex items-center justify-between text-blueprint-cyan">
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="font-mono text-[10px] tracking-widest">{code}</span>
              </div>
              <h3 className="mt-12 text-base font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dark-subtext">{body}</p>
              {index === 0 && <GaussianCurve />}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default SectionFeatures;
