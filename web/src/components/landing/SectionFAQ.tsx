import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const questions = [
  { question: 'O teste tem validade diagnóstica médica?', answer: 'Não. O Cognirav é uma triagem psicométrica de referência para uso pessoal e acadêmico. Não substitui avaliação clínica, diagnóstico ou acompanhamento realizado por profissional habilitado.' },
  { question: 'Quanto tempo dura a avaliação?', answer: 'O limite é de 30 minutos para 30 matrizes. Você pode concluir antes; o tempo de resolução faz parte da telemetria da experiência.' },
  { question: 'Preciso falar algum idioma específico?', answer: 'Não. As matrizes são 100% não verbais. Apenas a interface, as instruções e o relatório são apresentados em português.' },
];

export const SectionFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-dark-border/60 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[.3em] text-blueprint-cyan">[ FAQ / PROTOCOLO ]</p>
        <h2 className="mt-4 font-headline text-4xl uppercase tracking-tight text-white md:text-6xl">Perguntas frequentes</h2>
        <div className="mt-10 border-t border-dark-border">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="border-b border-dark-border">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-semibold text-neutral-200 transition-colors hover:text-blueprint-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-cyan"
                >
                  {item.question}
                  <ChevronDown className={`h-4 w-4 shrink-0 text-blueprint-cyan transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {isOpen && <p className="max-w-2xl pb-5 pr-8 text-sm leading-relaxed text-dark-subtext" data-testid="faq-answer">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionFAQ;
