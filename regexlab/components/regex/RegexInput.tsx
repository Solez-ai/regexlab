'use client';
import React from 'react';
import { cn } from '../../lib/utils';
import { FlagToggle } from './FlagToggle';

interface RegexInputProps {
  pattern: string;
  onChange: (pattern: string) => void;
  isValid: boolean;
  flags: string;
  onFlagsChange: (flags: string) => void;
}

export function RegexInput({
  pattern,
  onChange,
  isValid,
  flags,
  onFlagsChange,
}: RegexInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          'flex flex-row items-center rounded-xl border bg-bg2 px-4 py-3 transition-shadow duration-150',
          isValid
            ? 'border-border focus-within:ring-2 focus-within:ring-accent focus-within:border-accent shadow-[0_0_0_3px_rgba(124,106,255,0.13)]'
            : 'border-error/50 focus-within:ring-2 focus-within:ring-error shadow-[0_0_0_3px_rgba(248,113,113,0.13)]'
        )}
      >
        <span className="text-muted font-mono text-xl select-none mr-2">/</span>
        <input
          id="regex-pattern-input"
          type="text"
          value={pattern}
          onChange={(e) => onChange(e.target.value)}
          className="flex-grow bg-transparent font-mono text-lg text-text focus:outline-none w-full min-w-0"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          aria-label="Regular expression pattern"
        />
        <span className="text-muted font-mono text-xl select-none ml-2">/</span>
        <span className="text-accent font-mono text-lg select-none mr-4">
          {flags}
        </span>
        <div className="hidden sm:block border-l border-border pl-4">
          <FlagToggle flags={flags} onChange={onFlagsChange} />
        </div>
      </div>
      <div className="sm:hidden flex justify-end">
        <FlagToggle flags={flags} onChange={onFlagsChange} />
      </div>
    </div>
  );
}
