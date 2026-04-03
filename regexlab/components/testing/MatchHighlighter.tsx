'use client';
import React, { useMemo } from 'react';
import { RegexMatch } from '../../types';
import { Tooltip } from '../ui/Tooltip';
import { cn } from '../../lib/utils';

interface MatchHighlighterProps {
  testString: string;
  matches: RegexMatch[];
  onMatchClick: (index: number) => void;
}

export function MatchHighlighter({
  testString,
  matches,
  onMatchClick,
}: MatchHighlighterProps) {
  const segments = useMemo(() => {
    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    
    matches.forEach((m, matchIdx) => {
      // Unmatched segment before the match
      if (m.index > lastIndex) {
        result.push(
          <span key={`unmatched-${lastIndex}`}>
            {testString.slice(lastIndex, m.index)}
          </span>
        );
      }

      // The matched segment
      const isA = matchIdx % 2 === 0;

      result.push(
        <Tooltip
          key={`match-${m.index}`}
          content={
            <div className="flex flex-col gap-1 font-mono">
              <span className="font-bold border-b border-border2 pb-1">
                Match #{matchIdx + 1}
              </span>
              <span className="text-muted">Index: {m.index} - {m.index + m.length}</span>
              {m.captures.length > 0 && (
                <div className="flex flex-col mt-1">
                  <span className="text-[10px] text-muted uppercase tracking-wider">Captures:</span>
                  {m.captures.map((cap, i) => (
                    <span key={i} className="ml-2">
                      <span className="text-accent">{i + 1}:</span> {cap ?? '—'}
                    </span>
                  ))}
                </div>
              )}
            </div>
          }
        >
          <mark
              onClick={() => onMatchClick(matchIdx)}
              className={cn(
                'cursor-pointer text-text rounded-sm animate-in fade-in duration-150',
                isA ? 'match-a' : 'match-b'
              )}
            role="button"
            tabIndex={0}
          >
            {m.value || <span className="inline-block w-1 bg-accent/50 h-3 align-middle" />}
          </mark>
        </Tooltip>
      );

      lastIndex = m.index + m.length;
    });

    // Remaining string
    if (lastIndex < testString.length) {
      result.push(
        <span key={`unmatched-${lastIndex}`}>
          {testString.slice(lastIndex)}
        </span>
      );
    }

    return result;
  }, [testString, matches, onMatchClick]);

  return (
    <div
      className="w-full bg-bg2 rounded-lg border border-border p-4 font-mono text-[13px] leading-relaxed text-text whitespace-pre-wrap break-words overflow-hidden min-h-[150px]"
      role="region"
      aria-label="Match highlights"
      aria-live="polite"
    >
      {segments.length === 0 && testString.length === 0 ? (
        <span className="text-muted italic">Type to test pattern...</span>
      ) : (
        segments
      )}
    </div>
  );
}
