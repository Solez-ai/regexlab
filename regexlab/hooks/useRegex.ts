import { useState, useEffect, useRef, useMemo } from 'react';
import { RegexResult } from '../types';
import { useDebounce } from './useDebounce';

export function useRegex(
  pattern: string,
  flags: string,
  testString: string
): RegexResult {
  const [result, setResult] = useState<RegexResult>({
    matches: [],
    error: null,
    evalTime: 0,
    isValid: true,
  });

  const workerRef = useRef<Worker | null>(null);
  
  // Debounce testString to prevent extreme stuttering on large texts
  const delay = testString.length > 50000 ? 300 : 50;
  const debouncedTestString = useDebounce(testString, delay);

  useEffect(() => {
    if (!pattern) {
      setResult({ matches: [], error: null, evalTime: 0, isValid: true });
      return;
    }

    if (workerRef.current) {
      workerRef.current.terminate();
    }

    const worker = new Worker('/regex-worker.js');
    workerRef.current = worker;

    let timeoutId: ReturnType<typeof setTimeout>;

    worker.onmessage = (e: MessageEvent) => {
      clearTimeout(timeoutId);
      setResult(e.data);
    };

    worker.postMessage({
      type: 'evaluate',
      pattern,
      flags,
      testString: debouncedTestString,
    });

    timeoutId = setTimeout(() => {
      worker.terminate();
      workerRef.current = null;
      setResult({
        matches: [],
        error: 'Pattern timeout — possible catastrophic backtracking',
        evalTime: 2000,
        isValid: false,
      });
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      worker.terminate();
    };
  }, [pattern, flags, debouncedTestString]);

  return result;
}
