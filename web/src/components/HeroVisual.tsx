import React from 'react';

const letterTextures = [
  'linear-gradient(135deg, #d9f99d 0%, #22c55e 42%, #172554 100%)',
  'radial-gradient(circle at 70% 25%, #facc15 0 12%, transparent 13%), linear-gradient(135deg, #ec4899, #7c3aed 55%, #0ea5e9)',
  'repeating-linear-gradient(135deg, #00a3ff 0 3px, #102b3e 3px 10px), linear-gradient(90deg, #0e7490, #a7f3d0)',
  'linear-gradient(115deg, #f97316 0 20%, #ef4444 20% 38%, #8b5cf6 38% 65%, #06b6d4 65%)',
  'linear-gradient(135deg, transparent 20%, #38bdf8 21% 24%, transparent 25% 43%, #e2e8f0 44% 46%, transparent 47%), #233047',
  'radial-gradient(circle at 50% 45%, #e5e7eb 0 9%, #94a3b8 10% 17%, #475569 18% 25%, transparent 26%), linear-gradient(145deg, #0f172a, #64748b)',
  'linear-gradient(120deg, #f0abfc, #22d3ee 38%, #a3e635 67%, #fb7185)',
  'repeating-radial-gradient(circle at 30% 50%, #a7f3d0 0 2px, #0891b2 3px 5px, #1e1b4b 6px 10px)',
];

const letters = 'COGNIRAV'.split('');

export const HeroVisual: React.FC = () => (
  <div className="relative mx-auto w-full max-w-[1500px] px-3 sm:px-6" aria-labelledby="hero-title">
    <div className="pointer-events-none absolute inset-x-3 top-1/2 h-[72%] -translate-y-1/2 border border-blueprint-cyan/40 sm:inset-x-6" aria-hidden="true">
      <span className="absolute -left-px top-1/2 h-px w-10 bg-blueprint-cyan/60" />
      <span className="absolute -right-px top-1/2 h-px w-10 bg-blueprint-cyan/60" />
      <span className="absolute left-1/2 -top-px h-8 w-px bg-blueprint-cyan/60" />
      <span className="absolute bottom-0 left-1/2 h-8 w-px bg-blueprint-cyan/60" />
      <span className="absolute left-3 top-3 text-[9px] tracking-[0.35em] text-blueprint-cyan/70">FIG. 01 / COGNITIVE FIELD</span>
      <span className="absolute bottom-3 right-3 text-[9px] tracking-[0.35em] text-blueprint-cyan/70">SCALE 1:01</span>
    </div>

    <div className="relative flex flex-col items-center py-12 sm:py-16 md:py-24">
      <p className="relative z-20 -mb-4 -rotate-6 self-start pl-[8%] font-cursive text-3xl leading-none text-white sm:-mb-8 sm:pl-[15%] sm:text-5xl">
        psychometric
      </p>
      <h1 id="hero-title" className="sr-only">Cognirav, psychometric intelligence</h1>
      <div className="relative flex w-full justify-center overflow-hidden" aria-label="COGNIRAV">
        <div className="flex select-none whitespace-nowrap font-headline text-[16.5vw] leading-[.82] tracking-[-.07em] text-transparent sm:text-[15vw] md:text-[13.5vw]">
          {letters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              data-testid="hero-letter-main"
              aria-hidden="true"
              className="relative inline-block bg-clip-text bg-center bg-no-repeat"
              style={{ backgroundImage: letterTextures[index], backgroundSize: 'cover' }}
            >
              {letter}
              <span className="pointer-events-none absolute inset-0 text-transparent [-webkit-text-stroke:1px_#00A3FF]" aria-hidden="true">
                {letter}
              </span>
            </span>
          ))}
        </div>
        <span className="sr-only">COGNIRAV</span>
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">
          <g fill="none" stroke="#00A3FF" strokeOpacity=".42" strokeWidth="1">
            <path d="M0 25h1200M0 235h1200M55 0v260M1145 0v260" />
            <path strokeDasharray="4 8" d="M0 130h1200M150 0v260M1050 0v260" />
          </g>
        </svg>
      </div>
      <p className="relative z-20 -mt-2 flex w-full items-center justify-end gap-2 pr-[8%] font-cursive text-4xl leading-none text-white sm:-mt-7 sm:pr-[15%] sm:text-6xl">
        intelligence
        <span className="relative inline-block h-5 w-12 rotate-[-12deg]" aria-hidden="true">
          <svg viewBox="0 0 60 24" className="h-full w-full stroke-accent-sketch" fill="none" strokeWidth="2.5">
            <path d="M2 16c13-12 27-14 45-6M16 21c10-7 25-11 40-8M44 3l10 7-12 7" />
          </svg>
        </span>
      </p>
    </div>
  </div>
);

export default HeroVisual;
