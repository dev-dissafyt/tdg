import React from 'react';

export function FilamentHeading({
  children,
  as: Component = 'h2',
  className = '',
}: {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}) {
  return (
    <Component
      className={`relative font-black tracking-tight select-none ${className}`}
      style={{
        textShadow:
          '0 1px 0 #2563EB, 0 2px 0 #1D4ED8, 0 3px 0 #1E40AF, 0 4px 10px rgba(0,0,0,0.2)',
      }}
    >
      <span className="relative z-10 text-obsidian bg-clip-text">
        {children}
      </span>
      {/* Micro-ridge stratum line beneath text */}
      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-electric-cobalt via-cyan-400 to-transparent opacity-80" />
    </Component>
  );
}

export function FilamentButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-xl text-white transition-all select-none cursor-pointer ${className}`}
      style={{
        background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0,0,0,0.4), 0 4px 0 #020617, 0 8px 16px rgba(37,99,235,0.25)',
      }}
    >
      {/* Simulated 3D printer layer lines texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none rounded-xl"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #38BDF8, #38BDF8 1px, transparent 1px, transparent 4px)',
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
