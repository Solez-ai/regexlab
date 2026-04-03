'use client';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Moon, Sun, Terminal } from 'lucide-react';
import { Button } from '../ui/Button';

export function TopBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-bg border-b border-border z-50 px-4 flex flex-row items-center justify-between">
      <div className="flex items-center gap-2">
        <Terminal className="h-5 w-5 text-accent" />
        <a
          href="/"
          className="text-text font-mono text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          title="Reset to defaults"
        >
          <span className="text-accent">/</span>regex<span className="text-accent">/</span>lab
        </a>
        <a 
          href="/docs" 
          className="ml-4 text-sm text-muted hover:text-text transition-colors"
        >
          Docs
        </a>
      </div>

      <div className="hidden md:flex flex-row items-center gap-4 text-xs font-mono text-muted">
        <div className="flex items-center gap-1.5">
          <kbd className="bg-bg2 border border-border2 px-1.5 py-0.5 rounded shadow-sm text-text">Ctrl+K</kbd>
          <span>Focus</span>
        </div>
        <div className="flex items-center gap-1.5">
          <kbd className="bg-bg2 border border-border2 px-1.5 py-0.5 rounded shadow-sm text-text">Ctrl+Enter</kbd>
          <span>Copy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <kbd className="bg-bg2 border border-border2 px-1.5 py-0.5 rounded shadow-sm text-text">Ctrl+S</kbd>
          <span>Save</span>
        </div>
      </div>

      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="h-8 w-8"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </header>
  );
}
