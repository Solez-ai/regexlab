'use client';
import React from 'react';
import { RegexResult } from '../../types';
import { Badge } from '../ui/Badge';

interface StatsBarProps {
  result: RegexResult;
  patternLength: number;
  testStringLength: number;
}

export function StatsBar({
  result,
  patternLength,
  testStringLength,
}: StatsBarProps) {
  const matchCount = result.matches.length;
  const evalTime = result.evalTime.toFixed(1);
  const totalCaptures = result.matches.reduce(
    (acc, m) => acc + m.captures.length,
    0
  );

  return (
    <div className="flex flex-row items-center gap-4 border-t border-border bg-bg pt-2 pb-1 text-[11px] font-mono text-muted uppercase tracking-wider overflow-x-auto">
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span>Matches:</span>
        <Badge variant={matchCount > 0 ? 'success' : 'muted'}>
          {matchCount}
        </Badge>
      </div>
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span>Groups:</span>
        <span className="text-text">{totalCaptures}</span>
      </div>
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span>Time:</span>
        <span className={Number(evalTime) > 50 ? 'text-warning' : 'text-text'}>
          {evalTime}ms
        </span>
      </div>
      <div className="flex items-center gap-1.5 whitespace-nowrap ml-auto">
        <span>Pattern length:</span>
        <span className="text-text">{patternLength}</span>
      </div>
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span>Text length:</span>
        <span className="text-text">{testStringLength.toLocaleString()}</span>
      </div>
    </div>
  );
}
