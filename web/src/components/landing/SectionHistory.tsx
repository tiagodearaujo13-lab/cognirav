import React from 'react';
import { MatrixWireframeGrid, RadarScanner } from './SvgElements';

export const SectionHistory: React.FC = () => (
  <section id="historia" className="relative overflow-hidden border-t border-dark-border/60 px-6 py-24 md:py-32">
    <MatrixWireframeGrid className="pointer-events-none absolute inset-0 opacity-30" />
    <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
      <div>
        <span className="inline-flex rounded-full border border-blueprint-cyan/40 bg-blueprint-cyan/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[.25em] text-blueprint-cyan">
          [ HISTÓRIA &amp; PSICOMETRIA ]
        </span>
        <div className="relative mt-7">
          <span className="absolute -top-8 left-2 -rotate-6 font-cursive text-3xl text-blueprint-cyan md:text-5xl">origem</span>
          <h2 className="font-headline text-4xl uppercase tracking-tight text-white md:text-6xl">A ciência do padrão</h2>
        </div>
        <p className="mt-7 max-w-md text-sm leading-relaxed text-dark-subtext md:text-base">
          Uma avaliação não verbal para observar como a inteligência encontra ordem quando a resposta ainda não existe.
        </p>
        <RadarScanner className="mt-10 hidden opacity-80 sm:block" />
      </div>

      <div className="relative border-l border-dashed border-blueprint-cyan/50 pl-7 md:pl-12">
        <article className="relative pb-12">
          <span className="absolute -left-[calc(1.75rem+5px)] top-1 h-3 w-3 rounded-full border-2 border-blueprint-cyan bg-dark-bg shadow-[0_0_14px_rgba(0,163,255,.65)] md:-left-[calc(3rem+5px)]" />
          <p className="font-mono text-xs tracking-[.2em] text-blueprint-cyan">1936 — JOHN C. RAVEN</p>
          <h3 className="mt-3 text-xl font-bold text-white">O nascimento das matrizes progressivas</h3>
          <p className="mt-4 text-sm leading-relaxed text-dark-subtext">
            John C. Raven criou as Matrizes Progressivas como uma medida mais pura do <strong className="text-neutral-200">Fator g</strong> de Charles Spearman: inteligência geral observada através de relações visuais, sem depender de linguagem, letramento ou repertório cultural.
          </p>
        </article>
        <article className="relative">
          <span className="absolute -left-[calc(1.75rem+5px)] top-1 h-3 w-3 rounded-full border-2 border-blueprint-cyan bg-dark-bg shadow-[0_0_14px_rgba(0,163,255,.65)] md:-left-[calc(3rem+5px)]" />
          <p className="font-mono text-xs tracking-[.2em] text-blueprint-cyan">G<sub>f</sub> — INTELIGÊNCIA FLUIDA</p>
          <h3 className="mt-3 text-xl font-bold text-white">Resolver o que nunca vimos</h3>
          <p className="mt-4 text-sm leading-relaxed text-dark-subtext">
            A inteligência fluida é a capacidade de resolver problemas inéditos, discernir analogias e identificar regras geométricas sob pressão. Diferencia-se da inteligência cristalizada (G<sub>c</sub>), que depende de conhecimento e experiências acumuladas.
          </p>
        </article>
      </div>
    </div>
  </section>
);

export default SectionHistory;
