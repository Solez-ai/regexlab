'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const CHEAT_DATA = [
  {
    title: 'Anchors',
    items: [
      { token: '^', desc: 'Start of string/line' },
      { token: '$', desc: 'End of string/line' },
      { token: '\\b', desc: 'Word boundary' },
      { token: '\\B', desc: 'Non-word boundary' },
    ],
  },
  {
    title: 'Quantifiers',
    items: [
      { token: '*', desc: '0 or more' },
      { token: '+', desc: '1 or more' },
      { token: '?', desc: '0 or 1' },
      { token: '{n}', desc: 'Exactly n' },
      { token: '{n,m}', desc: 'Between n and m' },
      { token: '*?', desc: '0 or more (lazy)' },
    ],
  },
  {
    title: 'Character Classes',
    items: [
      { token: '\\d', desc: 'Digit [0-9]' },
      { token: '\\D', desc: 'Non-digit' },
      { token: '\\w', desc: 'Word char [a-zA-Z0-9_]' },
      { token: '\\W', desc: 'Non-word char' },
      { token: '\\s', desc: 'Whitespace' },
      { token: '\\S', desc: 'Non-whitespace' },
      { token: '.', desc: 'Any char (except newline)' },
      { token: '[abc]', desc: 'a, b, or c' },
      { token: '[^abc]', desc: 'Not a, b, or c' },
      { token: '[a-z]', desc: 'Range a to z' },
    ],
  },
  {
    title: 'Groups & Lookaround',
    items: [
      { token: '(abc)', desc: 'Capture group' },
      { token: '(?:abc)', desc: 'Non-capturing group' },
      { token: '(?<name>abc)', desc: 'Named capture group' },
      { token: '(?=abc)', desc: 'Positive lookahead' },
      { token: '(?!abc)', desc: 'Negative lookahead' },
      { token: '(?<=abc)', desc: 'Positive lookbehind' },
      { token: '(?<!abc)', desc: 'Negative lookbehind' },
    ],
  },
];

export function CheatSheet() {
  const [open, setOpen] = useState(false);

  const appendToInput = (token: string) => {
    const input = document.getElementById(
      'regex-pattern-input'
    ) as HTMLInputElement | null;
    if (input) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;
      
      const newValue = input.value + token;
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(input, newValue);
      }
      
      const event = new Event('input', { bubbles: true });
      input.dispatchEvent(event);
      input.focus();
    }
  };

  return (
    <div className="flex flex-col border border-border2 rounded-lg bg-bg2 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-row items-center justify-between p-3 hover:bg-bg3 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
      >
        <h3 className="text-sm font-bold text-text">Cheat Sheet</h3>
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-3 border-t border-border2">
              {CHEAT_DATA.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-muted uppercase tracking-wider">
                    {section.title}
                  </span>
                  <div className="grid grid-cols-1 gap-1">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-row items-center justify-between text-xs group cursor-pointer hover:bg-bg3 p-1 rounded transition-colors"
                        onClick={() => appendToInput(item.token)}
                      >
                        <code className="text-accent font-mono px-1 bg-accent/10 rounded">
                          {item.token}
                        </code>
                        <span className="text-muted group-hover:text-text transition-colors">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
