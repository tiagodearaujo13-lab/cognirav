import React from 'react';
import { Navbar } from '../components/Navbar';
import { HeroVisual } from '../components/HeroVisual';
import { HeroFooter } from '../components/HeroFooter';
import { SectionHistory } from '../components/landing/SectionHistory';
import { SectionApplications } from '../components/landing/SectionApplications';
import { SectionFeatures } from '../components/landing/SectionFeatures';
import { SectionTestimonials } from '../components/landing/SectionTestimonials';
import { SectionFAQ } from '../components/landing/SectionFAQ';
import { Footer } from '../components/Footer';
import { useQuiz } from '../hooks/useQuiz';

export const LandingPage: React.FC = () => {
  const { startQuiz, status } = useQuiz();
  const handleStart = () => { void startQuiz(); };

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-dark-bg">
      <Navbar />
      <section className="relative" aria-label="Apresentação Cognirav">
        <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-blueprint-cyan/5 blur-3xl" aria-hidden="true" />
        <HeroVisual />
      </section>
      <HeroFooter onStart={handleStart} isLoading={status === 'submitting'} />
      <SectionHistory />
      <SectionApplications />
      <SectionFeatures />
      <SectionTestimonials />
      <SectionFAQ />
      <Footer />
    </main>
  );
};

export default LandingPage;
