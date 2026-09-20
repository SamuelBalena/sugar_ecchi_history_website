function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i += 1) {
    const curr = [i];
    for (let j = 1; j <= n; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        curr[j] = Math.min((curr[j - 1] ?? 0) + 1, (prev[j] ?? 0) + 1, (prev[j - 1] ?? 0) + cost);
    }
    prev = curr;
  }
  return prev[n] ?? 0;
}

/** 0 = no match, higher = better. Tolerates typos in EN and JA. */
export function fuzzyScore(haystack: string, needle: string): number {
  const h = haystack.toLowerCase().trim();
  const q = needle.toLowerCase().trim();
  if (!q) return 1;
  if (!h) return 0;
  if (h === q) return 100;
  if (h.startsWith(q)) return 80;
  if (h.includes(q)) return 60;

  let best = 0;
  for (const word of h.split(/[\s/,、・]+/)) {
    if (!word) continue;
    if (word.startsWith(q)) best = Math.max(best, 70);
    const dist = levenshtein(word, q);
    const tolerance = q.length <= 4 ? 1 : q.length <= 7 ? 2 : 3;
    if (dist <= tolerance) {
      best = Math.max(best, 50 - dist * 8);
    }
  }
  return best;
}

export function bestScore(fields: string[], needle: string): number {
  return fields.reduce((max, field) => Math.max(max, fuzzyScore(field, needle)), 0);
}
