'use client';
import React, { useState } from 'react';
import { RegexResult, SavedPattern } from '../../types';
import { Explainer } from '../sidebar/Explainer';
import { SavedPatterns } from '../sidebar/SavedPatterns';
import { ExportPanel } from '../sidebar/ExportPanel';
import { CheatSheet } from '../sidebar/CheatSheet';

interface SidebarProps {
  pattern: string;
  flags: string;
  isValid: boolean;
  result: RegexResult;
  testString: string;
  savedPatterns: SavedPattern[];
  onLoadPattern: (pattern: string, flags: string) => void;
  onSavePattern: (pattern: SavedPattern) => void;
  onDeletePattern: (id: string) => void;
}

export function Sidebar({
  pattern,
  flags,
  isValid,
  result,
  testString,
  savedPatterns,
  onLoadPattern,
  onSavePattern,
  onDeletePattern,
}: SidebarProps) {
  // Mobile accordion states
  const [openSection, setOpenSection] = useState<string | null>('explainer');

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const SectionWrapper = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const isOpen = openSection === id;
    return (
      <div className="md:contents flex flex-col gap-2">
        <button
          className="md:hidden flex items-center justify-between w-full bg-bg2 border border-border2 p-3 rounded-lg text-sm font-bold text-text focus:outline-none focus:ring-2 focus:ring-accent"
          onClick={() => toggleSection(id)}
        >
          {title}
          <span className="text-accent text-lg">{isOpen ? '−' : '+'}</span>
        </button>
        <div className={`md:block ${isOpen ? 'block' : 'hidden'} px-2 md:px-0 pb-4 md:pb-0`}>
          {children}
        </div>
        <hr className="md:hidden border-border" />
      </div>
    );
  };

  return (
    <aside className="w-full h-full flex flex-col gap-6 overflow-y-auto pr-2 md:pr-4 pb-12 custom-scrollbar">
      <SectionWrapper id="explainer" title="Regex Explainer">
        <Explainer pattern={pattern} isValid={isValid} />
      </SectionWrapper>
      
      <div className="hidden md:block w-full h-[1px] bg-border2" />
      
      <SectionWrapper id="saved" title="Saved Patterns">
        <SavedPatterns
          patterns={savedPatterns}
          currentPattern={pattern}
          currentFlags={flags}
          onLoad={onLoadPattern}
          onSave={onSavePattern}
          onDelete={onDeletePattern}
        />
      </SectionWrapper>
      
      <div className="hidden md:block w-full h-[1px] bg-border2" />
      
      <SectionWrapper id="export" title="Export & Copy">
        <ExportPanel
          result={result}
          pattern={pattern}
          flags={flags}
          testString={testString}
          disabled={!isValid || result.matches.length === 0}
        />
      </SectionWrapper>
      
      <div className="hidden md:block w-full h-[1px] bg-border2" />
      
      <SectionWrapper id="cheatsheet" title="Cheat Sheet">
        <CheatSheet />
      </SectionWrapper>
    </aside>
  );
}
