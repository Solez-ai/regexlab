'use client';
import React from 'react';
import { cn } from '../../lib/utils';

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed, onPressedChange, ...props }, ref) => {
    return (
      <button
        type="button"
        ref={ref}
        aria-pressed={pressed}
        onClick={() => onPressedChange?.(!pressed)}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 h-9 px-3',
          pressed
            ? 'bg-accent text-white'
            : 'bg-transparent text-muted hover:bg-bg3 hover:text-text',
          className
        )}
        {...props}
      />
    );
  }
);
Toggle.displayName = 'Toggle';
