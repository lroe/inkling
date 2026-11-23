import raw from "./data/words.json";

export type ScriptWord = {text: string; start: number; end: number};

export const WORDS = raw.words as ScriptWord[];
export const AUDIO_DURATION = raw.duration as number;
export const FPS = 30;

/** Match the python aligner's canonical token form. */
const clean = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/%/g, "percent")
    .replace(/[^a-z0-9]/g, "");

const phraseTokens = (phrase: string): string[] =>
  phrase
    .trim()
    .split(/[\s\-/]+/)
    .map(clean)
    .filter(Boolean);

const NORM = WORDS.map((w) => clean(w.text));

export const findPhrase = (phrase: string, occurrence = 0): number => {
  const target = phraseTokens(phrase);
  if (target.length === 0) return -1;
  let seen = 0;
  for (let i = 0; i <= NORM.length - target.length; i++) {
    let ok = true;
    for (let j = 0; j < target.length; j++) {
      if (NORM[i + j] !== target[j]) {
        ok = false;
        break;
      }
    }
    if (ok) {
      if (seen === occurrence) return i;
      seen++;
      i += target.length - 1;
    }
  }
  return -1;
};

/** Start time (seconds) of a phrase in the narration. */
export const at = (phrase: string, occurrence = 0): number => {
  const idx = findPhrase(phrase, occurrence);
  if (idx >= 0) return WORDS[idx].start;
  const target = phraseTokens(phrase);
  for (let i = 0; i < NORM.length; i++) {
    if (target.length && NORM[i] === target[0]) {
      // eslint-disable-next-line no-console
      console.warn(`Phrase not found exactly: "${phrase}" — using first word at ${WORDS[i].start}`);
      return WORDS[i].start;
    }
  }
  // eslint-disable-next-line no-console
  console.warn(`Phrase not found: "${phrase}" — using 0`);
  return 0;
};

export const wordsOf = (phrase: string, occurrence = 0): ScriptWord[] => {
  const idx = findPhrase(phrase, occurrence);
  if (idx < 0) return [];
  const target = phrase.split(/\s+/).filter(Boolean);
  return WORDS.slice(idx, idx + target.length);
};

export const endOf = (phrase: string, occurrence = 0): number => {
  const idx = findPhrase(phrase, occurrence);
  if (idx < 0) return at(phrase, occurrence);
  const target = phraseTokens(phrase);
  const last = WORDS[idx + target.length - 1];
  return last ? last.end : WORDS[idx].start;
};

/** Time of a single word, in context (first match at or after `from`). */
export const wordAt = (word: string, from = 0, occurrence = 0): number => {
  let seen = 0;
  const w = clean(word);
  for (let i = 0; i < WORDS.length; i++) {
    if (WORDS[i].start < from) continue;
    if (NORM[i] === w) {
      if (seen === occurrence) return WORDS[i].start;
      seen++;
    }
  }
  return at(word, occurrence);
};

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export const smoothstep = (p: number) => {
  const x = clamp(p, 0, 1);
  return x * x * (3 - 2 * x);
};
export const easeOut = (p: number) => 1 - Math.pow(1 - clamp(p, 0, 1), 3);
export const easeInOut = (p: number) => {
  const x = clamp(p, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
export const prog = (t: number, start: number, dur: number) => clamp((t - start) / Math.max(0.001, dur), 0, 1);
