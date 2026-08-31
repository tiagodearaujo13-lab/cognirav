import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { QuestionCategory } from '../../types/index';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../../types/index';

interface BadgeProps {
  category: QuestionCategory;
  className?: string;
}

const CATEGORY_COLORS: Record<QuestionCategory, string> = {
  numeric:    'bg-blue-950 text-blue-300 border-blue-800',
  logic:      'bg-violet-950 text-violet-300 border-violet-800',
  spatial:    'bg-emerald-950 text-emerald-300 border-emerald-800',
  structural: 'bg-amber-950 text-amber-300 border-amber-800',
};

export const Badge: React.FC<BadgeProps> = ({ category, className }) => {
  return (
    <span
      className={twMerge(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        CATEGORY_COLORS[category],
        className
      )}
    >
      <span aria-hidden="true" className="font-mono">{CATEGORY_ICONS[category]}</span>
      {CATEGORY_LABELS[category]}
    </span>
  );
};
export default Badge;
