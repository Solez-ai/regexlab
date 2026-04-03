'use client';
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';

interface TestTextareaProps {
  value: string;
  onChange: (val: string) => void;
  matchCount: number;
}

export function TestTextarea({ value, onChange, matchCount }: TestTextareaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      // Enforce max-height manually if we want it to scroll after a point, 
      // but standard approach is let it grow to max-height defined in CSS.
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [value]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          onChange(ev.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-lg border bg-bg2 transition-colors',
        isDragging ? 'border-accent border-dashed bg-accent/5' : 'border-border'
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="w-full bg-transparent font-mono text-[13px] leading-relaxed text-text resize-none focus:outline-none p-4 min-h-[150px] overflow-hidden whitespace-pre-wrap break-words"
        aria-label="Test string"
        placeholder="Type or drop a text file here to test..."
      />
      <div className="absolute bottom-2 right-2 flex flex-row items-center gap-2 pointer-events-none">
        {value.length > 50000 && (
          <Badge variant="warning">Large input — debounce active</Badge>
        )}
        <span className="text-xs text-muted font-mono bg-bg2/80 px-1.5 rounded">
          {value.length.toLocaleString()} chars
        </span>
      </div>
    </div>
  );
}
