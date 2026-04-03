'use client';
import React, { useMemo } from 'react';
import { parsePattern } from '../../lib/explainer';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/Badge';

interface ExplainerProps {
  pattern: string;
  isValid: boolean;
}

export function Explainer({ pattern, isValid }: ExplainerProps) {
  const tokens = useMemo(() => {
    if (!isValid || !pattern) return [];
    return parsePattern(pattern);
  }, [pattern, isValid]);

  if (!pattern) {
    return (
      <div className="flex flex-col gap-2 p-4 text-center border border-dashed border-border2 rounded-lg">
        <span className="text-muted text-sm italic">
          Start typing a pattern to see it explained here.
        </span>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="flex flex-col gap-2 p-4 text-center bg-error/5 border border-error/20 rounded-lg">
        <span className="text-error text-sm">
          Pattern is invalid. Explainer disabled.
        </span>
      </div>
    );
  }

  const isLarge = tokens.length > 100;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-text flex justify-between items-center">
        <span>Regex Explainer</span>
        <Badge variant="muted" className="text-[10px]">
          {tokens.length} tokens
        </Badge>
      </h3>
      
      {isLarge && (
        <div className="text-xs text-warning bg-yellow-500/10 p-2 rounded">
          Large pattern detected. Showing summary only to prevent UI lag.
        </div>
      )}

      <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
        <AnimatePresence>
          {tokens.slice(0, isLarge ? 20 : undefined).map((token, i) => (
            <motion.div
              key={`${i}-${token.raw}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: Math.min(i * 0.02, 0.2) }}
              className="flex flex-col gap-1 p-2 rounded-md border border-border2 bg-bg2 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <code className="px-1.5 py-0.5 bg-accent/20 text-accent-light rounded text-sm font-mono whitespace-pre break-all">
                  {token.raw}
                </code>
                <Badge variant="muted" className="text-[10px] capitalize">
                  {token.type}
                </Badge>
              </div>
              <span className="text-xs text-text mt-1">{token.description}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLarge && tokens.length > 20 && (
          <div className="text-center p-2 text-muted text-xs">
            + {tokens.length - 20} more tokens hidden.
          </div>
        )}
      </div>
    </div>
  );
}
