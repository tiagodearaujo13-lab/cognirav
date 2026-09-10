import React from 'react';
import { clsx } from 'clsx';

// Forcing import tailwind-merge safely
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled ?? isLoading}
      className={twMerge(
        clsx(
          // Estilos base comuns e focáveis (WCAG)
          "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 select-none",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 focus-visible:ring-accent-indigo focus-visible:outline-none",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          {
            // Variante primária (Índigo/Violeta elétrico)
            "bg-accent-indigo text-white hover:bg-accent-indigo-light active:scale-[0.98]": variant === 'primary',
            // Variante secundária (Fundo escuro suave)
            "bg-brand-800 text-slate-200 hover:bg-brand-700 hover:text-white border border-brand-700": variant === 'secondary',
            // Variante fantasma
            "bg-transparent text-slate-300 hover:bg-brand-900 hover:text-white": variant === 'ghost',
            // Variante perigo / alerta
            "bg-red-950 text-red-200 border border-red-800 hover:bg-red-900": variant === 'danger',
          }
        ),
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>A processar...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
