'use client';
import React, { useState } from 'react';
import { RegexResult } from '../../types';
import { exportAsJSON, exportAsCSV } from '../../lib/exporter';
import { Button } from '../ui/Button';
import { Download, Copy, Check } from 'lucide-react';

interface ExportPanelProps {
  result: RegexResult;
  pattern: string;
  flags: string;
  testString: string;
  disabled: boolean;
}

export function ExportPanel({
  result,
  pattern,
  flags,
  testString,
  disabled,
}: ExportPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleExportJSON = () => {
    const json = exportAsJSON(result, pattern, flags, testString);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `regexlab-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const csv = exportAsCSV(result);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `regexlab-export-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    const text = result.matches.map((m) => m.value).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-text">Export & Copy</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={disabled || result.matches.length === 0}
          onClick={handleExportJSON}
          className="w-full text-xs"
        >
          <Download className="h-3 w-3 mr-2" />
          JSON
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={disabled || result.matches.length === 0}
          onClick={handleExportCSV}
          className="w-full text-xs"
        >
          <Download className="h-3 w-3 mr-2" />
          CSV
        </Button>
        <Button
          variant="primary"
          size="sm"
          disabled={disabled || result.matches.length === 0}
          onClick={handleCopy}
          className="w-full col-span-2 text-xs"
          title="Ctrl+Enter to copy"
        >
          {copied ? (
            <Check className="h-3 w-3 mr-2" />
          ) : (
            <Copy className="h-3 w-3 mr-2" />
          )}
          {copied ? 'Copied!' : 'Copy Matches (Ctrl+Enter)'}
        </Button>
      </div>
    </div>
  );
}
