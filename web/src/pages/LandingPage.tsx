import React from 'react';
import { Navbar } from '../components/Navbar';
import { HeroVisual } from '../components/HeroVisual';
import { HeroFooter } from '../components/HeroFooter';
import { useQuiz } from '../hooks/useQuiz';

export const LandingPage: React.FC = () => {
  const { startQuiz, status } = useQuiz();

  const handleStart = () => {
    void startQuiz();
  };

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-dark-bg">
      <Navbar />
      <section className="relative" aria-label="Apresentação Cognirav">
        <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-blueprint-cyan/5 blur-3xl" aria-hidden="true" />
        <HeroVisual />
      </section>
      <HeroFooter onStart={handleStart} isLoading={status === 'submitting'} />
      <section id="sobre" className="mx-auto max-w-7xl border-t border-dark-border/60 px-6 py-6 text-[10px] uppercase tracking-[.2em] text-dark-subtext">
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <span>© {new Date().getFullYear()} Cognirav</span>
          <span>Fluid intelligence / calibrated assessment</span>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
