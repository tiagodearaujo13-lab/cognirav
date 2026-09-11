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
      className={twMerge("w-full bg-dark-surface rounded-full h-1.5 overflow-hidden", className)}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={clsx(
          "bg-blueprint-cyan h-full rounded-full shadow-[0_0_12px_rgba(0,163,255,.45)]",
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
