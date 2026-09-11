import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { QuestionCategory } from '../../types/index';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../../types/index';

interface BadgeProps {
  category: QuestionCategory;
  className?: string;
}

const CATEGORY_COLORS: Record<QuestionCategory, string> = {
  numeric:    'bg-blueprint-cyan/10 text-blueprint-cyan border-blueprint-cyan/40',
  logic:      'bg-blueprint-cyan/10 text-blueprint-cyan border-blueprint-cyan/40',
  spatial:    'bg-blueprint-cyan/10 text-blueprint-cyan border-blueprint-cyan/40',
  structural: 'bg-blueprint-cyan/10 text-blueprint-cyan border-blueprint-cyan/40',
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
