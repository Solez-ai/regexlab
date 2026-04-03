self.onmessage = function (e) {
  if (e.data.type !== 'evaluate') return;
  
  const { pattern, flags, testString } = e.data;
  
  try {
    // Ensure 'g' flag is present to match all occurrences using matchAll
    const activeFlags = flags.includes('g') ? flags : flags + 'g';
    const regex = new RegExp(pattern, activeFlags);
    
    const start = performance.now();
    const raw = [...testString.matchAll(regex)];
    const evalTime = performance.now() - start;
    
    const matches = raw.map((m) => ({
      value: m[0],
      index: m.index,
      length: m[0].length,
      groups: m.groups ?? {},
      captures: [...m].slice(1),
    }));
    
    self.postMessage({
      type: 'result',
      matches,
      evalTime,
      isValid: true,
      error: null,
    });
  } catch (err) {
    self.postMessage({
      type: 'result',
      matches: [],
      evalTime: 0,
      isValid: false,
      error: err.message,
    });
  }
};
