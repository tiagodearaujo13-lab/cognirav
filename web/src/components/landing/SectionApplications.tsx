import React from 'react';
import { CornerBrackets } from './SvgElements';

const applications = [
  { code: '01', title: 'Sociedades de Alto QI', body: 'Mensa, Intertel e Triple Nine usam calibração em percentis superiores a 98% para admissão com mínimo viés linguístico.' },
  { code: '02', title: 'Recrutamento Executivo & Tech', body: 'Avaliação de capacidade indutiva para posições de liderança, arquitetura e engenharia complexa.' },
  { code: '03', title: 'Aviação Militar & Forças Especiais', body: 'Leitura rápida de padrões e tomada de decisão sob sobrecarga sensorial e restrição de tempo.' },
  { code: '04', title: 'Clínica Neuropsicológica', body: 'Triagem de declínio cognitivo, afasia e potencial intelectual desvinculado de barreiras de comunicação.' },
];

export const SectionApplications: React.FC = () => (
  <section id="aplicacoes" className="relative px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.3em] text-blueprint-cyan">[ CONTEXTO DE USO ]</p>
          <h2 className="mt-4 max-w-xl font-headline text-4xl uppercase tracking-tight text-white md:text-6xl">Onde o padrão encontra a decisão</h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-dark-subtext">Um instrumento visual aplicado onde aprender rápido importa mais do que repetir respostas conhecidas.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {applications.map((application) => (
          <article key={application.code} className="group relative min-h-[220px] bg-dark-card p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-blueprint-cyan" data-testid="application-card">
            <CornerBrackets />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-blueprint-cyan">{application.code} / 04</span>
                <span className="h-2 w-2 rounded-full bg-blueprint-cyan opacity-50 transition-opacity group-hover:opacity-100" />
              </div>
              <div>
                <h3 className="mt-12 text-lg font-bold text-white">{application.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dark-subtext">{application.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default SectionApplications;
