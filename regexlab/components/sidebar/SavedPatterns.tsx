'use client';
import React, { useState } from 'react';
import { RegexResult, SavedPattern } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { generateId } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Save, Play } from 'lucide-react';

interface SavedPatternsProps {
  patterns: SavedPattern[];
  currentPattern: string;
  currentFlags: string;
  onLoad: (pattern: string, flags: string) => void;
  onSave: (pattern: SavedPattern) => void;
  onDelete: (id: string) => void;
}

export function SavedPatterns({
  patterns,
  currentPattern,
  currentFlags,
  onLoad,
  onSave,
  onDelete,
}: SavedPatternsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [loadedId, setLoadedId] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    onSave({
      id: generateId(),
      label,
      description,
      pattern: currentPattern,
      flags: currentFlags,
      createdAt: Date.now(),
      lastUsed: Date.now(),
    });

    setLabel('');
    setDescription('');
    setIsSaving(false);
  };

  const handleLoad = (p: SavedPattern) => {
    setLoadedId(p.id);
    onLoad(p.pattern, p.flags);
    setTimeout(() => setLoadedId(null), 300);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-sm font-bold text-text">Saved Patterns</h3>
        <Button
          size="sm"
          variant={isSaving ? 'ghost' : 'secondary'}
          onClick={() => setIsSaving(!isSaving)}
          title="Ctrl+S to save"
        >
          {isSaving ? 'Cancel' : <Save className="h-4 w-4 mr-1" />}
          {!isSaving && 'Save Current'}
        </Button>
      </div>

      <AnimatePresence>
        {isSaving && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSave}
            className="flex flex-col gap-2 bg-bg3 p-3 rounded-lg border border-border2"
          >
            <input
              type="text"
              placeholder="Label (e.g. Email)"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="bg-bg border border-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-bg border border-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Button type="submit" size="sm" className="w-full mt-1">
              Save Pattern
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
        <AnimatePresence>
          {patterns.map((p) => (
            <motion.div
              key={p.id}
              layout
              exit={{ opacity: 0, x: -20, height: 0 }}
              className="group relative flex flex-col gap-1 p-3 rounded-lg border border-border2 bg-bg2 hover:border-accent/50 transition-colors"
            >
              {loadedId === p.id && (
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-accent rounded-lg pointer-events-none"
                />
              )}
              
              <div className="flex flex-row items-center justify-between z-10">
                <span className="font-bold text-text text-sm">{p.label}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleLoad(p)}
                    className="h-6 w-6"
                    title="Load Pattern"
                  >
                    <Play className="h-3 w-3 text-success" />
                  </Button>
                  <Button
                    size="icon"
                    variant="danger"
                    onClick={() => {
                      if (confirm('Delete this pattern?')) onDelete(p.id);
                    }}
                    className="h-6 w-6"
                    title="Delete Pattern"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-1 z-10 overflow-hidden">
                <code className="text-xs font-mono text-muted truncate max-w-[200px]">
                  /{p.pattern}/
                </code>
                <Badge variant="muted" className="text-[10px] px-1 py-0 border-0 bg-bg3">
                  {p.flags}
                </Badge>
              </div>
              
              {p.description && (
                <p className="text-xs text-muted/80 truncate mt-1 z-10">
                  {p.description}
                </p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {patterns.length === 0 && (
          <div className="text-sm text-muted italic text-center p-4">
            No saved patterns.
          </div>
        )}
      </div>
    </div>
  );
}
