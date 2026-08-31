import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  value: number; // 0 a 100 ou 0 a max
  max?: number;
  className?: string;
  animate?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  className,
  animate = true,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div
      className={twMerge("w-full bg-brand-800 rounded-full h-2.5 overflow-hidden", className)}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={clsx(
          "bg-gradient-to-r from-accent-indigo to-accent-violet h-full rounded-full",
          {
            "transition-all duration-300 ease-out": animate,
          }
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
export default ProgressBar;
