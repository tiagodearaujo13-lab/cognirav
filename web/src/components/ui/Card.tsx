import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-dark-card border border-dark-border rounded-xl p-6 transition-all duration-300",
          {
            "hover:border-blueprint-cyan/60 hover:shadow-lg hover:shadow-blueprint-cyan/5": hoverEffect,
          }
        ),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
export default Card;
