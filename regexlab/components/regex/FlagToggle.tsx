'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '../ui/Tooltip';
import { cn } from '../../lib/utils';

interface FlagToggleProps {
  flags: string;
  onChange: (flags: string) => void;
}

const FLAGS = [
  { char: 'g', title: 'Global', desc: 'Match all occurrences' },
  { char: 'i', title: 'Case Insensitive', desc: 'Ignore case differences' },
  { char: 'm', title: 'Multiline', desc: '^ and $ match start/end of line' },
  { char: 's', title: 'DotAll', desc: '. matches newlines' },
  { char: 'u', title: 'Unicode', desc: 'Treat pattern as a sequence of Unicode code points' },
  { char: 'd', title: 'Indices', desc: 'Generate indices for substring matches' },
];

export function FlagToggle({ flags, onChange }: FlagToggleProps) {
  const toggleFlag = (char: string) => {
    if (flags.includes(char)) {
      onChange(flags.replace(char, ''));
    } else {
      onChange(flags + char);
    }
  };

  return (
    <div className="flex flex-row items-center gap-1.5">
      {FLAGS.map((f) => {
        const active = flags.includes(f.char);
        return (
          <Tooltip
            key={f.char}
            content={
              <div className="flex flex-col">
                <span className="font-bold">{f.title}</span>
                <span className="text-muted">{f.desc}</span>
              </div>
            }
          >
            <motion.button
              type="button"
              onClick={() => toggleFlag(f.char)}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-accent',
                active
                  ? 'bg-accent text-white font-bold'
                  : 'bg-bg3 text-muted hover:text-text hover:bg-border'
              )}
              aria-label={`Toggle ${f.title} flag`}
            >
              {f.char}
            </motion.button>
          </Tooltip>
        );
      })}
    </div>
  );
}
