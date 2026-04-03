import { useEffect } from 'react';
import { isMac } from '../lib/utils';

interface Shortcuts {
  onFocusInput: () => void;
  onCopyMatches: () => void;
  onSavePattern: () => void;
  onClear: () => void;
  onEscape: () => void;
}

export function useKeyboardShortcuts(actions: Shortcuts) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const modifier = isMac() ? e.metaKey : e.ctrlKey;

      if (e.key === 'Escape') {
        actions.onEscape();
        return;
      }

      if (!modifier) return;

      if (e.key.toLowerCase() === 'k') {
        e.preventDefault();
        actions.onFocusInput();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        actions.onCopyMatches();
      } else if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        actions.onSavePattern();
      } else if (e.key.toLowerCase() === 'c' && e.shiftKey) {
        e.preventDefault();
        actions.onClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions]);
}
