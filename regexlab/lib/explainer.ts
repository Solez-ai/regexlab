import { RegexToken, TokenType } from '../types';

export function parsePattern(pattern: string): RegexToken[] {
  const tokens: RegexToken[] = [];
  let i = 0;

  while (i < pattern.length) {
    const char = pattern[i];

    // Escape sequences
    if (char === '\\') {
      if (i + 1 < pattern.length) {
        const nextChar = pattern[i + 1];
        let type: TokenType = 'escape';
        let title = 'Escaped Character';
        let description = `Matches the literal character '${nextChar}'.`;

        if (/[dDwWsS]/.test(nextChar)) {
          type = 'class';
          title = 'Character Class';
          if (nextChar === 'd') description = 'Matches any digit (0-9).';
          if (nextChar === 'D') description = 'Matches any non-digit.';
          if (nextChar === 'w') description = 'Matches any word character (alphanumeric & underscore).';
          if (nextChar === 'W') description = 'Matches any non-word character.';
          if (nextChar === 's') description = 'Matches any whitespace character.';
          if (nextChar === 'S') description = 'Matches any non-whitespace character.';
        } else if (/[bB]/.test(nextChar)) {
          type = 'anchor';
          title = 'Word Boundary';
          if (nextChar === 'b') description = 'Matches a word boundary position.';
          if (nextChar === 'B') description = 'Matches a non-word boundary position.';
        } else if (/[ntr0]/.test(nextChar)) {
          title = 'Control Character';
          if (nextChar === 'n') description = 'Matches a newline character.';
          if (nextChar === 't') description = 'Matches a tab character.';
          if (nextChar === 'r') description = 'Matches a carriage return.';
          if (nextChar === '0') description = 'Matches a NULL character.';
        }

        tokens.push({
          raw: `\\${nextChar}`,
          type,
          title,
          description,
        });
        i += 2;
        continue;
      }
    }

    // Anchors
    if (char === '^' || char === '$') {
      tokens.push({
        raw: char,
        type: 'anchor',
        title: char === '^' ? 'Start of String' : 'End of String',
        description: char === '^' ? 'Matches the beginning of the string.' : 'Matches the end of the string.',
      });
      i++;
      continue;
    }

    // Special "any"
    if (char === '.') {
      tokens.push({
        raw: char,
        type: 'special',
        title: 'Any Character',
        description: 'Matches any character except line breaks.',
      });
      i++;
      continue;
    }

    // Alternation
    if (char === '|') {
      tokens.push({
        raw: char,
        type: 'special',
        title: 'Alternation',
        description: 'Matches either the pattern before or after the pipe (OR).',
      });
      i++;
      continue;
    }

    // Quantifiers
    if (char === '*' || char === '+' || char === '?') {
      let raw = char;
      let title = 'Quantifier';
      let description = '';

      if (char === '*') description = 'Matches 0 or more of the preceding token.';
      if (char === '+') description = 'Matches 1 or more of the preceding token.';
      if (char === '?') description = 'Matches 0 or 1 of the preceding token (optional).';

      // Check lazy variant
      if (i + 1 < pattern.length && pattern[i + 1] === '?') {
        raw += '?';
        description += ' (Lazy: matches as few characters as possible)';
        i++;
      }

      tokens.push({ raw, type: 'quantifier', title, description });
      i++;
      continue;
    }

    // Range quantifiers
    if (char === '{') {
      const closeIdx = pattern.indexOf('}', i);
      if (closeIdx !== -1) {
        const raw = pattern.slice(i, closeIdx + 1);
        tokens.push({
          raw,
          type: 'quantifier',
          title: 'Range Quantifier',
          description: `Matches the preceding token exactly or within the specified range ${raw}.`,
        });
        i = closeIdx + 1;
        continue;
      }
    }

    // Character classes
    if (char === '[') {
      let closeIdx = i + 1;
      let found = false;
      while (closeIdx < pattern.length) {
        if (pattern[closeIdx] === ']' && pattern[closeIdx - 1] !== '\\') {
          found = true;
          break;
        }
        closeIdx++;
      }
      
      if (found) {
        const raw = pattern.slice(i, closeIdx + 1);
        const negated = raw.startsWith('[^');
        tokens.push({
          raw,
          type: 'class',
          title: negated ? 'Negated Character Set' : 'Character Set',
          description: negated 
            ? 'Matches any character NOT present in the list.' 
            : 'Matches any character present in the list.',
        });
        i = closeIdx + 1;
        continue;
      }
    }

    // Groups & Lookarounds
    if (char === '(') {
      let raw = '(';
      let type: TokenType = 'group';
      let title = 'Capture Group';
      let description = 'Starts a capture group.';

      if (pattern.startsWith('(?:', i)) {
        raw = '(?:';
        title = 'Non-capturing Group';
        description = 'Starts a non-capturing group.';
      } else if (pattern.startsWith('(?<=', i)) {
        raw = '(?<=';
        type = 'lookahead';
        title = 'Positive Lookbehind';
        description = 'Starts a positive lookbehind.';
      } else if (pattern.startsWith('(?<!', i)) {
        raw = '(?<!';
        type = 'lookahead';
        title = 'Negative Lookbehind';
        description = 'Starts a negative lookbehind.';
      } else if (pattern.startsWith('(?=', i)) {
        raw = '(?=';
        type = 'lookahead';
        title = 'Positive Lookahead';
        description = 'Starts a positive lookahead.';
      } else if (pattern.startsWith('(?!', i)) {
        raw = '(?!';
        type = 'lookahead';
        title = 'Negative Lookahead';
        description = 'Starts a negative lookahead.';
      } else if (pattern.startsWith('(?<', i)) {
        // extract name
        const endName = pattern.indexOf('>', i);
        if (endName !== -1) {
          raw = pattern.slice(i, endName + 1);
          title = 'Named Capture Group';
          description = `Starts a named capture group '${raw.slice(3, -1)}'.`;
        }
      }

      tokens.push({ raw, type, title, description });
      i += raw.length;
      continue;
    }

    if (char === ')') {
      tokens.push({
        raw: char,
        type: 'group',
        title: 'End Group',
        description: 'Ends a group or lookaround.',
      });
      i++;
      continue;
    }

    // Literals
    tokens.push({
      raw: char,
      type: 'literal',
      title: 'Literal',
      description: `Matches the exact character '${char}'.`,
    });
    i++;
  }

  return tokens;
}
