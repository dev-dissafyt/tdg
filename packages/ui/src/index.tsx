'use client';

import React, { useState, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ----------------------------------------------------
// BUTTON
// ----------------------------------------------------
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'electric' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary:
        'bg-obsidian text-white hover:bg-obsidian-800 active:translate-y-0.5 shadow-tactile hover:shadow-tactile-hover focus:ring-obsidian',
      secondary:
        'bg-porcelain text-obsidian border border-porcelain-border hover:bg-white active:translate-y-0.5 shadow-sm focus:ring-obsidian',
      outline:
        'border-2 border-obsidian text-obsidian bg-transparent hover:bg-obsidian hover:text-white active:translate-y-0.5 focus:ring-obsidian',
      electric:
        'bg-electric-cobalt text-white hover:bg-blue-700 active:translate-y-0.5 shadow-glow-blue focus:ring-electric-blue',
      ghost:
        'bg-transparent text-obsidian hover:bg-porcelain-muted focus:ring-obsidian',
      danger:
        'bg-red-600 text-white hover:bg-red-700 active:translate-y-0.5 focus:ring-red-600',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// ----------------------------------------------------
// BADGE
// ----------------------------------------------------
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'electric' | 'amber' | 'emerald' | 'danger' | 'purple' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-porcelain-muted text-obsidian-700 border border-porcelain-border',
    electric: 'bg-blue-50 text-electric-cobalt border border-blue-200',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
    outline: 'border border-obsidian-300 text-obsidian-800 bg-transparent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide uppercase font-mono',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ----------------------------------------------------
// CARD
// ----------------------------------------------------
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border border-porcelain-border bg-white text-obsidian shadow-sm transition-shadow duration-200',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('font-semibold text-lg leading-none tracking-tight text-obsidian', className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-obsidian-500', className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center p-6 pt-0 border-t border-porcelain-border mt-auto', className)} {...props} />;
}

// ----------------------------------------------------
// INPUT & TEXTAREA
// ----------------------------------------------------
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border border-porcelain-border bg-white px-3.5 py-2 text-sm text-obsidian placeholder:text-obsidian-400 focus:outline-none focus:border-obsidian focus:ring-1 focus:ring-obsidian transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[90px] w-full rounded-lg border border-porcelain-border bg-white px-3.5 py-2.5 text-sm text-obsidian placeholder:text-obsidian-400 focus:outline-none focus:border-obsidian focus:ring-1 focus:ring-obsidian transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

// ----------------------------------------------------
// MODAL / DIALOG
// ----------------------------------------------------
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export function Modal({ isOpen, onClose, title, description, children, maxWidth = 'lg' }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-obsidian/75 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative z-10 w-full rounded-2xl bg-white p-6 shadow-2xl border border-porcelain-border animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto',
          maxWidths[maxWidth]
        )}
      >
        <div className="flex items-start justify-between pb-3 border-b border-porcelain-border mb-4">
          <div>
            {title && <h2 className="text-xl font-bold tracking-tight text-obsidian">{title}</h2>}
            {description && <p className="text-sm text-obsidian-500 mt-1">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-obsidian-400 hover:bg-porcelain-muted hover:text-obsidian transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// DRAWER (Mobile Bottom Sheet)
// ----------------------------------------------------
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="fixed inset-0 bg-obsidian/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative z-10 w-full rounded-t-2xl bg-white p-6 shadow-2xl border-t border-porcelain-border max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        <div className="mx-auto w-12 h-1.5 bg-obsidian-300 rounded-full mb-4" />
        <div className="flex items-center justify-between pb-3 border-b border-porcelain-border mb-4">
          {title && <h3 className="text-lg font-bold text-obsidian">{title}</h3>}
          <button onClick={onClose} className="text-sm font-medium text-obsidian-500 hover:text-obsidian">
            Done
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TABS
// ----------------------------------------------------
export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
}: {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex space-x-1 border-b border-porcelain-border overflow-x-auto no-scrollbar', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors duration-150',
              isActive
                ? 'border-obsidian text-obsidian font-semibold'
                : 'border-transparent text-obsidian-500 hover:text-obsidian hover:border-obsidian-300'
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  'ml-2 px-1.5 py-0.5 rounded-full text-xs font-mono',
                  isActive ? 'bg-obsidian text-white' : 'bg-porcelain-muted text-obsidian-600'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ----------------------------------------------------
// STAT COUNTER
// ----------------------------------------------------
export function StatCounter({
  value,
  prefix = '',
  suffix = '',
  label,
  subtext,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subtext?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col">
      <div className="text-3xl lg:text-4xl font-black text-obsidian tracking-tight font-mono">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm font-semibold text-obsidian uppercase tracking-wider mt-1">{label}</div>
      {subtext && <div className="text-xs text-obsidian-500 mt-0.5">{subtext}</div>}
    </div>
  );
}

// ----------------------------------------------------
// AVATAR
// ----------------------------------------------------
export function Avatar({
  src,
  name,
  className,
}: {
  src?: string;
  name: string;
  className?: string;
}) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-porcelain-muted border border-porcelain-border text-obsidian font-semibold text-xs',
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
