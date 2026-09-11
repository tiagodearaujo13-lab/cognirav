import React from 'react';

const testimonials = [
  { percentile: 'P98.4', iq: 'QI 133', time: '18m 42s', quote: 'A interface parece um instrumento de laboratório. O resultado confirmou uma hipótese que eu vinha investigando sobre meu raciocínio visual.', profile: 'Engenheiro de Sistemas', hash: '0x7f8...a12' },
  { percentile: 'P99.1', iq: 'QI 136', time: '16m 09s', quote: 'O formato não verbal torna a experiência muito mais honesta. Sem vocabulário ou cultura no caminho, sobra o padrão.', profile: 'Candidata Mensa', hash: '0xa42...e90' },
  { percentile: 'P94.7', iq: 'QI 124', time: '21m 15s', quote: 'Utilizo matrizes como parte da investigação neuropsicológica. A leitura de percentil é objetiva, clara e tecnicamente bem apresentada.', profile: 'Pesquisadora de Neurociência', hash: '0xc11...b67' },
];

export const SectionTestimonials: React.FC = () => (
  <section id="relatorios" className="px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.3em] text-blueprint-cyan">[ REGISTROS ANONIMIZADOS ]</p>
          <h2 className="mt-4 font-headline text-4xl uppercase tracking-tight text-white md:text-6xl">Relatórios concluídos</h2>
        </div>
        <p className="font-mono text-xs text-dark-subtext">SIGNATURE / VERIFIED</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.hash} className="border border-dark-border bg-dark-card p-5 transition-colors hover:border-blueprint-cyan/60" data-testid="testimonial-card">
            <header className="flex items-start justify-between gap-3 border-b border-dark-border pb-4 font-mono text-[10px]">
              <div>
                <span className="inline-flex border border-blueprint-cyan/50 px-2 py-1 text-blueprint-cyan">RESULTADO VERIFICADO</span>
                <p className="mt-3 text-white">{item.percentile} — {item.iq}</p>
              </div>
              <span className="text-dark-subtext">{item.time}</span>
            </header>
            <blockquote className="py-7 text-base italic leading-relaxed text-neutral-300">“{item.quote}”</blockquote>
            <footer className="flex items-end justify-between border-t border-dark-border pt-4 text-xs">
              <span className="text-white">{item.profile}</span>
              <code className="text-blueprint-cyan">{item.hash}</code>
            </footer>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default SectionTestimonials;
