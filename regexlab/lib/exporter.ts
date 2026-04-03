import { RegexResult } from '../types';

export function exportAsJSON(
  result: RegexResult,
  pattern: string,
  flags: string,
  testString: string
): string {
  return JSON.stringify(
    {
      pattern: { source: pattern, flags },
      testString,
      matches: result.matches,
    },
    null,
    2
  );
}

export function exportAsCSV(result: RegexResult): string {
  const escape = (v: string) =>
    /[,"\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
  const headers = ['match_index', 'value', 'start', 'end', 'length'];
  const rows = result.matches.map((m, i) =>
    [i, escape(m.value), m.index, m.index + m.length, m.length].join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}
