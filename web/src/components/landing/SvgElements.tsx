import React from 'react';

export const RadarScanner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative aspect-square w-full max-w-[280px] ${className}`} aria-hidden="true">
    <svg viewBox="0 0 280 280" className="h-full w-full overflow-visible">
      <g fill="none" stroke="#00A3FF" strokeOpacity=".28">
        <circle cx="140" cy="140" r="128" />
        <circle cx="140" cy="140" r="92" />
        <circle cx="140" cy="140" r="54" />
        <path d="M12 140h256M140 12v256M49 49l182 182M231 49 49 231" />
      </g>
      <g className="origin-center animate-spin" style={{ transformOrigin: '140px 140px', animationDuration: '12s' }}>
        <path d="M140 140 140 12A128 128 0 0 1 248 76Z" fill="#00A3FF" fillOpacity=".08" />
        <path d="M140 140V12" stroke="#00A3FF" strokeOpacity=".75" />
      </g>
      <g fill="#00A3FF">
        <circle cx="83" cy="92" r="3" className="animate-pulse" />
        <circle cx="202" cy="112" r="3" className="animate-pulse [animation-delay:500ms]" />
        <circle cx="164" cy="208" r="3" className="animate-pulse [animation-delay:1000ms]" />
      </g>
      <circle cx="140" cy="140" r="4" fill="#00A3FF" />
    </svg>
    <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-blueprint-cyan" />
    <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-blueprint-cyan" />
  </div>
);

export const MatrixWireframeGrid: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 600 260" preserveAspectRatio="none" className={`h-full w-full ${className}`} aria-hidden="true">
    <g fill="none" stroke="#00A3FF" strokeOpacity=".2" strokeWidth="1">
      {Array.from({ length: 13 }, (_, index) => {
        const x = index * 50;
        return <path key={`v-${x}`} d={`M${x} 0 300 ${260 / 2} ${600 - x} 260`} />;
      })}
      {Array.from({ length: 7 }, (_, index) => {
        const y = index * 43.3;
        return <path key={`h-${y}`} d={`M${300 - y * 1.15} ${y}h${y * 2.3}`} />;
      })}
    </g>
    <g fill="#00A3FF" fillOpacity=".35" className="animate-pulse">
      {Array.from({ length: 12 }, (_, index) => (
        <circle key={index} cx={50 + (index % 6) * 100} cy={50 + Math.floor(index / 6) * 130} r="2" />
      ))}
    </g>
  </svg>
);

export const CornerBrackets: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
    <i className="absolute left-0 top-0 h-5 w-5 border-l border-t border-blueprint-cyan" />
    <i className="absolute right-0 top-0 h-5 w-5 border-r border-t border-blueprint-cyan" />
    <i className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-blueprint-cyan" />
    <i className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-blueprint-cyan" />
  </div>
);
