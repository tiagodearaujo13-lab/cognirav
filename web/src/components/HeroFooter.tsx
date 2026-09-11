import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';

const pills = ['MATRIZES DE RAVEN', 'RACIOCÍNIO FLUIDO', 'PADRÕES VISUAIS', 'SCORE NORMATIZADO'];

interface HeroFooterProps {
  onStart: () => void;
  isLoading?: boolean;
}

export const HeroFooter: React.FC<HeroFooterProps> = ({ onStart, isLoading = false }) => (
  <section id="metodologia" className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-20 pt-8 lg:grid-cols-12 lg:pt-12">
    <div className="grid grid-cols-2 gap-3 lg:col-span-5" aria-label="Características da avaliação">
      {pills.map((pill) => (
        <span
          key={pill}
          className="rounded-full border border-dark-border bg-dark-surface/80 px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-[.12em] text-neutral-300 transition-all hover:border-neutral-400 hover:bg-dark-card sm:px-5 sm:text-[11px] sm:tracking-wider"
        >
          {pill}
        </span>
      ))}
    </div>
    <div id="avaliacao" className="lg:col-span-7 lg:pl-10">
      <p className="mb-6 max-w-xl text-sm leading-relaxed text-dark-subtext md:text-base">
        Com base na teoria de inteligência fluida de Cattell-Horn-Carroll e nas matrizes progressivas clássicas, o Cognirav avalia capacidade indutiva, reconhecimento de analogias e velocidade perceptual através de 30 desafios visuais calibrados.
      </p>
      <Button
        type="button"
        onClick={onStart}
        isLoading={isLoading}
        className="w-full rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[.2em] text-black shadow-lg transition-all hover:bg-neutral-200 hover:shadow-cyan-500/20 sm:w-auto"
        aria-label="Iniciar teste psicométrico"
      >
        INICIAR TESTE
        <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  </section>
);

export default HeroFooter;
