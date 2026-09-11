import React from 'react';

const navItems = [
  { label: 'AVALIAÇÃO', href: '#avaliacao' },
  { label: 'METODOLOGIA', href: '#metodologia' },
  { label: 'SOBRE', href: '#sobre' },
];

const FacetedMark: React.FC = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="mark-green" x1="4" y1="4" x2="31" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B7F34A" />
        <stop offset="1" stopColor="#22C55E" />
      </linearGradient>
      <linearGradient id="mark-pink" x1="20" y1="6" x2="36" y2="25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="1" stopColor="#D946EF" />
      </linearGradient>
    </defs>
    <path d="M19 3 34 11.5v15L19 35 4 26.5v-15L19 3Z" fill="#20252A" stroke="#596169" />
    <path d="m19 3 9 5.1v9.6l-9 5.1-9-5.1V8.1L19 3Z" fill="url(#mark-green)" />
    <path d="m19 22.8 9-5.1v-9.6l6 3.4v15L19 35V22.8Z" fill="url(#mark-pink)" />
    <path d="m10 17.7 9 5.1V35L4 26.5v-15l6 3.4v2.8Z" fill="#FACC15" opacity=".9" />
    <path d="M19 3v19.8M10 8.1l9 5.2 9-5.2" stroke="#fff" strokeOpacity=".25" />
  </svg>
);

export const Navbar: React.FC = () => (
  <header className="relative z-30 border-b border-dark-border/60">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:py-8">
      <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Cognirav, voltar ao início">
        <FacetedMark />
        <span className="max-w-[170px] text-xs font-medium leading-tight tracking-tight text-neutral-300 sm:max-w-none sm:text-sm">
          cognirav psychometric studio™
        </span>
      </a>
      <nav aria-label="Navegação principal" className="hidden items-center gap-7 md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 transition-colors hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <nav aria-label="Navegação compacta" className="flex gap-3 md:hidden">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="text-[10px] font-bold tracking-widest text-neutral-400 hover:text-white">
            {item.label.slice(0, 3)}
          </a>
        ))}
      </nav>
    </div>
  </header>
);

export default Navbar;
