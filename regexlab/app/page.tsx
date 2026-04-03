'use client';
import React, { useState, useEffect } from 'react';
import { TopBar } from '../components/layout/TopBar';
import { Sidebar } from '../components/layout/Sidebar';
import { RegexInput } from '../components/regex/RegexInput';
import { ErrorBanner } from '../components/regex/ErrorBanner';
import { TestTextarea } from '../components/testing/TestTextarea';
import { MatchHighlighter } from '../components/testing/MatchHighlighter';
import { MatchList } from '../components/results/MatchList';
import { GroupsPanel } from '../components/results/GroupsPanel';
import { StatsBar } from '../components/results/StatsBar';
import { useRegex } from '../hooks/useRegex';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { SEED_PATTERNS } from '../lib/patterns';
import { SavedPattern } from '../types';

const INITIAL_TEST_STRING = `Welcome to RegexLab!

Here are some sample emails to test:
- contact@regexlab.com
- support.team-1@regexlab.co.uk
- invalid@email@domain.com

You can also drop a text file here to test large inputs.
`;

export default function Home() {
  const [pattern, setPattern] = useState('\\b[\\w.+-]+@[\\w-]+\\.[\\w.]+\\b');
  const [flags, setFlags] = useState('gi');
  const [testString, setTestString] = useState(INITIAL_TEST_STRING);

  const [savedPatterns, setSavedPatterns] = useLocalStorage<SavedPattern[]>(
    'regexlab:patterns',
    SEED_PATTERNS
  );

  const result = useRegex(pattern, flags, testString);

  // Auto-scroll to selected match
  const handleMatchSelect = (index: number) => {
    // In a real app we might want to highlight the match in the MatchHighlighter,
    // but here we just scroll the highlighter container if needed.
  };

  useKeyboardShortcuts({
    onFocusInput: () => {
      document.getElementById('regex-pattern-input')?.focus();
    },
    onCopyMatches: async () => {
      const text = result.matches.map((m) => m.value).join('\n');
      if (text) {
        try {
          await navigator.clipboard.writeText(text);
        } catch (e) {
          console.error(e);
        }
      }
    },
    onSavePattern: () => {
      // In a more complex app, this would open the save pattern form directly.
      // Here we rely on the button in the Sidebar to do so, but we can trigger it.
      document.querySelector<HTMLButtonElement>('[title="Ctrl+S to save"]')?.click();
    },
    onClear: () => {
      setPattern('');
      setTestString('');
    },
    onEscape: () => {
      // Close tooltips or modals if any
    },
  });

  return (
    <div className="flex flex-col h-screen bg-bg text-text overflow-hidden">
      <TopBar />
      
      <main className="flex-1 mt-14 pt-6 px-4 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 overflow-hidden">
        
        {/* Left Column: Testing Panels */}
        <div className="flex flex-col h-full overflow-y-auto pb-12 gap-6 custom-scrollbar pr-2">
          
          <section className="flex flex-col gap-2">
            <RegexInput
              pattern={pattern}
              onChange={setPattern}
              flags={flags}
              onFlagsChange={setFlags}
              isValid={result.isValid}
            />
            <ErrorBanner error={result.error} />
          </section>

          <section className="flex flex-col gap-4 flex-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted">Test String</h2>
            <TestTextarea
              value={testString}
              onChange={setTestString}
              matchCount={result.matches.length}
            />
            
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted mt-2">Match Highlight</h2>
            <MatchHighlighter
              testString={testString}
              matches={result.matches}
              onMatchClick={handleMatchSelect}
            />
          </section>

          <section className="flex flex-col gap-4 mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted border-b border-border2 pb-2">Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-bold text-muted">Matches</h3>
                <MatchList matches={result.matches} onSelect={handleMatchSelect} />
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-bold text-muted">Capture Groups</h3>
                <GroupsPanel matches={result.matches} pattern={pattern} />
              </div>
            </div>
            
            <StatsBar
              result={result}
              patternLength={pattern.length}
              testStringLength={testString.length}
            />
          </section>

        </div>

        {/* Right Column: Sidebar */}
        <div className="h-full overflow-hidden hidden lg:block border-l border-border pl-8">
          <Sidebar
            pattern={pattern}
            flags={flags}
            isValid={result.isValid}
            result={result}
            testString={testString}
            savedPatterns={savedPatterns}
            onLoadPattern={(p, f) => {
              setPattern(p);
              setFlags(f);
            }}
            onSavePattern={(p) => setSavedPatterns([p, ...savedPatterns])}
            onDeletePattern={(id) =>
              setSavedPatterns(savedPatterns.filter((x) => x.id !== id))
            }
          />
        </div>

        {/* Mobile Sidebar (Accordion style) */}
        <div className="lg:hidden w-full border-t border-border pt-6 mb-12">
          <Sidebar
            pattern={pattern}
            flags={flags}
            isValid={result.isValid}
            result={result}
            testString={testString}
            savedPatterns={savedPatterns}
            onLoadPattern={(p, f) => {
              setPattern(p);
              setFlags(f);
            }}
            onSavePattern={(p) => setSavedPatterns([p, ...savedPatterns])}
            onDeletePattern={(id) =>
              setSavedPatterns(savedPatterns.filter((x) => x.id !== id))
            }
          />
        </div>

      </main>
    </div>
  );
}
