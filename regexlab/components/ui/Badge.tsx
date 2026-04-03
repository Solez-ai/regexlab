import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'muted' | 'accent' | 'success' | 'error' | 'warning';
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        {
          'bg-bg3 border-border text-text': variant === 'default',
          'bg-transparent border-border text-muted': variant === 'muted',
          'bg-accent/10 border-accent/20 text-accent-light': variant === 'accent',
          'bg-success/10 border-success/20 text-success': variant === 'success',
          'bg-error/10 border-error/20 text-error': variant === 'error',
          'bg-yellow-500/10 border-yellow-500/20 text-yellow-500': variant === 'warning',
        },
        className
      )}
      {...props}
    />
  );
}
