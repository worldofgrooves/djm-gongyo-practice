// Generate word-level timestamps from existing line-level timestamps
// and gongyo text data. Distributes word timing proportionally by
// character length within each line's time window.
//
// This is a synthetic approximation. For true word-level accuracy,
// run through OpenAI Whisper with word_timestamps=True.

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

// Parse the gongyo data to extract line id -> romaji text
const gongyoSource = readFileSync(
  resolve(projectRoot, "src/data/gongyo.ts"),
  "utf8"
);

// Parse the timestamps data
const tsSource = readFileSync(
  resolve(projectRoot, "src/data/timestamps.ts"),
  "utf8"
);

// Extract line objects: { id, romaji } from gongyo.ts
const lineRegex = /\{\s*id:\s*"([^"]+)",\s*romaji:\s*"([^"]+)"/g;
const lines = [];
let m;
while ((m = lineRegex.exec(gongyoSource)) !== null) {
  lines.push({ id: m[1], romaji: m[2] });
}

// Extract timestamps: { id, start, end } from timestamps.ts
const tsRegex =
  /\{\s*id:\s*"([^"]+)",\s*start:\s*([\d.]+),\s*end:\s*([\d.]+)\s*\}/g;
const timestamps = {};
while ((m = tsRegex.exec(tsSource)) !== null) {
  timestamps[m[1]] = { start: parseFloat(m[2]), end: parseFloat(m[3]) };
}

// Syllable detection: count vowel groups
function countSyllables(word) {
  const matches = word.match(/[aeiouy]+/gi);
  return matches ? matches.length : 1;
}

// Generate word-level timestamps for each line
const wordTimestamps = {};

for (const line of lines) {
  const ts = timestamps[line.id];
  if (!ts) continue;

  // Split romaji into words (removing trailing periods)
  const rawWords = line.romaji.split(/\s+/).filter((w) => w.length > 0);

  if (rawWords.length === 0) continue;

  // Calculate total character weight (proportional timing)
  const cleanWords = rawWords.map((w) => w.replace(/[.,-]/g, ""));
  const totalChars = cleanWords.reduce((sum, w) => sum + Math.max(w.length, 1), 0);
  const duration = ts.end - ts.start;

  // Distribute time proportionally
  let cursor = ts.start;
  const words = [];

  for (let i = 0; i < rawWords.length; i++) {
    const charWeight = Math.max(cleanWords[i].length, 1);
    const wordDuration = (charWeight / totalChars) * duration;
    const wordStart = Math.round(cursor * 100) / 100;
    const wordEnd = Math.round((cursor + wordDuration) * 100) / 100;
    const syllables = countSyllables(cleanWords[i]);

    words.push({
      word: rawWords[i],
      start: wordStart,
      end: wordEnd,
      multiSyllable: syllables >= 2,
    });

    cursor += wordDuration;
  }

  wordTimestamps[line.id] = words;
}

// Generate TypeScript output
let output = `// Word-level timestamps for gongyo lines
// Generated from line-level timestamps with proportional word distribution
// For true word-level accuracy, regenerate via OpenAI Whisper with word_timestamps=True

export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
  multiSyllable: boolean;
}

export type WordTimestampMap = Record<string, WordTimestamp[]>;

export const wordTimestamps: WordTimestampMap = {\n`;

const ids = Object.keys(wordTimestamps);
for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  const words = wordTimestamps[id];
  output += `  "${id}": [\n`;
  for (let j = 0; j < words.length; j++) {
    const w = words[j];
    output += `    { word: "${w.word}", start: ${w.start}, end: ${w.end}, multiSyllable: ${w.multiSyllable} }`;
    if (j < words.length - 1) output += ",";
    output += "\n";
  }
  output += `  ]`;
  if (i < ids.length - 1) output += ",";
  output += "\n";
}

output += `};\n`;

writeFileSync(resolve(projectRoot, "src/data/word-timestamps.ts"), output);

console.log(`Generated word timestamps for ${ids.length} lines`);
console.log(
  `Total words: ${Object.values(wordTimestamps).reduce(
    (sum, ws) => sum + ws.length,
    0
  )}`
);
console.log(
  `Multi-syllable words: ${Object.values(wordTimestamps)
    .flat()
    .filter((w) => w.multiSyllable).length}`
);
