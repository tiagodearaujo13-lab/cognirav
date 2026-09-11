import React from 'react';

export const Footer: React.FC = () => (
  <footer className="border-t border-blueprint-cyan/30 bg-dark-bg px-6 py-10">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 h-px w-full bg-gradient-to-r from-blueprint-cyan/70 via-blueprint-cyan/10 to-transparent" />
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <a href="#top" className="text-lg font-bold tracking-tight text-white">cognirav<span className="text-blueprint-cyan">™</span></a>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-dark-subtext">Instrumento de exploração psicométrica para uso pessoal e acadêmico. Não constitui diagnóstico médico ou avaliação clínica.</p>
        </div>
        <div className="flex flex-col gap-3 text-xs text-dark-subtext md:items-end">
          <div className="flex gap-5"><a href="#privacidade" className="hover:text-white">Política de privacidade</a><a href="#termos" className="hover:text-white">Termos de uso</a></div>
          <span>© {new Date().getFullYear()} Cognirav / research studio</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
