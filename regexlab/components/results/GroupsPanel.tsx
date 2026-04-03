'use client';
import React from 'react';
import { RegexMatch } from '../../types';
import { Badge } from '../ui/Badge';

interface GroupsPanelProps {
  matches: RegexMatch[];
  pattern: string;
}

export function GroupsPanel({ matches, pattern }: GroupsPanelProps) {
  // Simple check if pattern has capture groups
  if (!pattern.includes('(')) return null;
  if (matches.length === 0) return null;

  // Check if any match has captures or named groups
  const hasCaptures = matches.some(
    (m) => m.captures.length > 0 || Object.keys(m.groups).length > 0
  );

  if (!hasCaptures) return null;

  return (
    <div className="flex flex-col w-full border border-border2 rounded-lg overflow-hidden bg-bg2">
      <div className="grid grid-cols-4 bg-bg3 text-xs font-bold text-muted p-2 border-b border-border2 tracking-wider uppercase">
        <div>Match #</div>
        <div>Group</div>
        <div>Name</div>
        <div>Value</div>
      </div>
      <div className="flex flex-col max-h-[300px] overflow-y-auto">
        {matches.map((m, mIdx) => {
          const rows: React.ReactNode[] = [];
          
          // Named groups
          const groupNames = Object.keys(m.groups);
          groupNames.forEach((name, gIdx) => {
            rows.push(
              <div
                key={`named-${mIdx}-${name}`}
                className="grid grid-cols-4 text-xs font-mono text-text p-2 border-b border-border2/50 last:border-0 hover:bg-bg3 transition-colors"
              >
                <div className="text-muted">{mIdx + 1}</div>
                <div className="text-muted">—</div>
                <div>
                  <Badge variant="accent">{name}</Badge>
                </div>
                <div className="truncate" title={m.groups[name]}>
                  {m.groups[name] ?? <span className="text-muted">—</span>}
                </div>
              </div>
            );
          });

          // Indexed captures
          m.captures.forEach((cap, cIdx) => {
            rows.push(
              <div
                key={`cap-${mIdx}-${cIdx}`}
                className="grid grid-cols-4 text-xs font-mono text-text p-2 border-b border-border2/50 last:border-0 hover:bg-bg3 transition-colors"
              >
                <div className="text-muted">{mIdx + 1}</div>
                <div className="text-accent">{cIdx + 1}</div>
                <div className="text-muted">—</div>
                <div className="truncate" title={cap}>
                  {cap ?? <span className="text-muted">—</span>}
                </div>
              </div>
            );
          });

          return rows;
        })}
      </div>
    </div>
  );
}
