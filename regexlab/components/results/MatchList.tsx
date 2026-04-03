'use client';
import React from 'react';
import { RegexMatch } from '../../types';
import { cn } from '../../lib/utils';

interface MatchListProps {
  matches: RegexMatch[];
  onSelect: (index: number) => void;
}

export function MatchList({ matches, onSelect }: MatchListProps) {
  if (matches.length === 0) {
    return (
      <div className="flex items-center justify-center p-4">
        <span className="text-muted italic text-sm">No matches found</span>
      </div>
    );
  }

  const MAX_DISPLAY = 100;
  const displayedMatches = matches.slice(0, MAX_DISPLAY);

  return (
    <div className="flex flex-col gap-2 w-full max-h-[200px] overflow-y-auto">
      <div className="flex flex-wrap gap-1.5 p-1">
        {displayedMatches.map((m, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className="match-a px-2 py-0.5 rounded text-xs font-mono text-text hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent transition-opacity whitespace-pre truncate max-w-full"
            title={m.value}
          >
            {m.value || '<empty>'}
          </button>
        ))}
        {matches.length > MAX_DISPLAY && (
          <span className="text-xs text-muted font-mono flex items-center px-2">
            + {matches.length - MAX_DISPLAY} more
          </span>
        )}
      </div>
    </div>
  );
}
