'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ErrorBannerProps {
  error: string | null;
}

export function ErrorBanner({ error }: ErrorBannerProps) {
  const shouldReduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className="flex flex-row items-center gap-3 rounded-lg bg-error/10 border border-error/20 px-4 py-3 mt-4"
        >
          <AlertTriangle className="h-5 w-5 text-error flex-shrink-0" />
          <span className="text-error font-mono text-sm break-all">
            {error}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
