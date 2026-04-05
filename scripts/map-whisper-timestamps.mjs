#!/usr/bin/env node
/**
 * Map Whisper word-level timestamps from gongyo-solo.json to romaji lines.
 *
 * Audio structure of gongyo-solo.mp3 (402.9s):
 *   0.0 - 5.5s    : silence
 *   5.5 - 9.6s    : opening chant "Myo ho ren ge kyo" (h0)
 *   9.8 - 28.0s   : "Hoben-pon Dai ni" + opening recitation (h1)
 *   28.3 - 29.8s  : transition
 *   30.0 - 137.6s : Hoben body -- Whisper transcribed (h2-h45)
 *   137.6 - 164.9s: daimoku (not tracked)
 *   164.9 - 167.6s: "Myo ho ren ge kyo" (j0) + title (j1)
 *   167.7 - 398.6s: Juryo body -- Whisper transcribed (j2-j103)
 *   398.6 - 402.9s: trailing silence
 *
 * Strategy:
 *   1. Title timestamps placed from audio silence analysis
 *   2. Body timestamps from Whisper word boundaries (proportional mapping)
 *   3. Word-level timing uses Whisper boundaries; romaji words distributed by char weight
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// ─── Load Whisper JSON ───
const whisperData = JSON.parse(
  readFileSync(resolve(projectRoot, '../gongyo-practice/gongyo-solo.json'), 'utf-8')
);

// Flatten all Whisper words, fixing zero-duration entries
const allWhisperWords = [];
for (const seg of whisperData.segments) {
  for (let wi = 0; wi < (seg.words || []).length; wi++) {
    const w = seg.words[wi];
    let end = w.end;
    // Fix zero-duration words: extend to start of next word or +0.2s
    if (end <= w.start) {
      const nextWord = seg.words[wi + 1];
      end = nextWord ? nextWord.start : w.start + 0.2;
    }
    allWhisperWords.push({ word: w.word, start: w.start, end });
  }
}

console.log(`Total Whisper words: ${allWhisperWords.length} (zero-duration words fixed)`);

// ─── Define romaji lines ───
const hobenTitles = [
  { id: "h0", text: "Myo ho ren ge kyo." },
  { id: "h1", text: "Hoben-pon. Dai ni." },
];

const hobenBody = [
  { id: "h2", text: "Niji seson. Ju sanmai. Anjo" },
  { id: "h3", text: "ni ki. Go shari-hotsu. Sho-" },
  { id: "h4", text: "but chi-e. Jinjin muryo. Go" },
  { id: "h5", text: "chi-e mon. Nange nannyu. Issai" },
  { id: "h6", text: "shomon. Hyaku-shi-butsu. Sho" },
  { id: "h7", text: "fu no chi. Sho-i sha ga. Butsu" },
  { id: "h8", text: "zo shingon. Hyaku sen man noku." },
  { id: "h9", text: "Mushu sho butsu. Jin gyo" },
  { id: "h10", text: "sho-butsu. Muryo doho. Yumyo" },
  { id: "h11", text: "shojin. Myosho fu mon. Joju" },
  { id: "h12", text: "jinjin. Mi-zo-u ho. Zui gi sho" },
  { id: "h13", text: "setsu. Ishu nange. Shari-hotsu." },
  { id: "h14", text: "Go ju jo-butsu irai. Shuju innen." },
  { id: "h15", text: "Shuju hiyu. Ko en gonkyo. Mu" },
  { id: "h16", text: "shu hoben. Indo shujo. Ryo ri" },
  { id: "h17", text: "sho jaku. Sho-i sha ga. Nyorai" },
  { id: "h18", text: "hoben. Chi-ken hara-mitsu. Kai" },
  { id: "h19", text: "i gu-soku. Shari-hotsu. Nyorai" },
  { id: "h20", text: "chi-ken. Kodai jinnon. Muryo" },
  { id: "h21", text: "muge. Riki. Mu-sho-i. Zenjo." },
  { id: "h22", text: "Gedas. Sanmai. Jin nyu musai." },
  { id: "h23", text: "Joju issai. Mi-zo-u ho. Shari-" },
  { id: "h24", text: "hotsu. Nyorai no. Shuju fun-" },
  { id: "h25", text: "betsu. Gyo ses sho ho. Gon-" },
  { id: "h26", text: "ji nyunan. Ekka shushin. Shari-" },
  { id: "h27", text: "hotsu. Shu yo gon shi. Muryo" },
  { id: "h28", text: "muhen. Mi-zo-u ho. Bus shitsu" },
  { id: "h29", text: "joju. Shi shari-hotsu. Fu shu bu" },
  { id: "h30", text: "setsu. Sho-i sha ga. Bus sho" },
  { id: "h31", text: "joju. Dai ichi ke-u. Nange shi" },
  { id: "h32", text: "ho. Yui butsu yo butsu. Nai no" },
  { id: "h33", text: "kujin. Shoho jisso." },
  { id: "h34", text: "Sho-i shoho. Nyo ze so." },
  { id: "h35", text: "Nyo ze sho. Nyo ze tai." },
  { id: "h36", text: "Nyo ze riki. Nyo ze sa." },
  { id: "h37", text: "Nyo ze in. Nyo ze en." },
  { id: "h38", text: "Nyo ze ka. Nyo ze ho." },
  { id: "h39", text: "Nyo ze honmak kukyo to." },
  { id: "h40", text: "Sho-i shoho. Nyo ze so." },
  { id: "h41", text: "Nyo ze sho. Nyo ze tai." },
  { id: "h42", text: "Nyo ze riki. Nyo ze sa." },
  { id: "h43", text: "Nyo ze in. Nyo ze en." },
  { id: "h44", text: "Nyo ze ka. Nyo ze ho." },
  { id: "h45", text: "Nyo ze honmak kukyo to." },
];

const juryoTitles = [
  { id: "j0", text: "Myo ho ren ge kyo." },
  { id: "j1", text: "Nyorai ju-ryo-hon. Dai ju-roku." },
];

const juryoBody = [
  { id: "j2", text: "Ji ga toku bur rai." },
  { id: "j3", text: "Sho kyo sho kosshu." },
  { id: "j4", text: "Muryo hyaku sen man." },
  { id: "j5", text: "Oku sai asogi." },
  { id: "j6", text: "Jo seppo kyoke." },
  { id: "j7", text: "Mushu oku shujo." },
  { id: "j8", text: "Ryo nyu o butsu-do." },
  { id: "j9", text: "Nirai muryo ko." },
  { id: "j10", text: "I do shujo ko." },
  { id: "j11", text: "Hoben gen nehan." },
  { id: "j12", text: "Ni jitsu fu metsu-do." },
  { id: "j13", text: "Jo ju shi seppo." },
  { id: "j14", text: "Ga jo ju o shi." },
  { id: "j15", text: "I sho jin-zu-riki." },
  { id: "j16", text: "Ryo tendo shujo." },
  { id: "j17", text: "Sui gon ni fu ken." },
  { id: "j18", text: "Shu ken ga metsu-do." },
  { id: "j19", text: "Ko kuyo shari." },
  { id: "j20", text: "Gen kai e renbo." },
  { id: "j21", text: "Ni sho katsu-go shin." },
  { id: "j22", text: "Shujo ki shin-buku." },
  { id: "j23", text: "Shichi-jiki i nyunan." },
  { id: "j24", text: "Isshin yok ken butsu." },
  { id: "j25", text: "Fu ji shaku shinmyo." },
  { id: "j26", text: "Ji ga gyu shuso." },
  { id: "j27", text: "Ku shutsu ryojusen." },
  { id: "j28", text: "Ga ji go shujo." },
  { id: "j29", text: "Jo zai shi fu-metsu." },
  { id: "j30", text: "I ho-ben-rik ko." },
  { id: "j31", text: "Gen u metsu fu-metsu." },
  { id: "j32", text: "Yo-koku u shujo." },
  { id: "j33", text: "Kugyo shingyo sha." },
  { id: "j34", text: "Ga bu o hi chu." },
  { id: "j35", text: "I setsu mujo ho." },
  { id: "j36", text: "Nyoto fu mon shi." },
  { id: "j37", text: "Tan ni ga metsu-do." },
  { id: "j38", text: "Ga ken sho shujo." },
  { id: "j39", text: "Motsu-zai o kukai." },
  { id: "j40", text: "Ko fu i gen shin." },
  { id: "j41", text: "Ryo go sho katsu-go." },
  { id: "j42", text: "In go shin renbo." },
  { id: "j43", text: "Nai shutsu i seppo." },
  { id: "j44", text: "Jin-zu-riki nyo ze." },
  { id: "j45", text: "O asogi ko." },
  { id: "j46", text: "Jo zai ryojusen." },
  { id: "j47", text: "Gyu yo sho jusho." },
  { id: "j48", text: "Shujo ken ko jin." },
  { id: "j49", text: "Dai ka sho sho ji." },
  { id: "j50", text: "Ga shi do annon." },
  { id: "j51", text: "Tennin jo juman." },
  { id: "j52", text: "Onrin sho do-kaku." },
  { id: "j53", text: "Shuju ho shogon." },
  { id: "j54", text: "Hoju ta keka." },
  { id: "j55", text: "Shujo sho yu-raku." },
  { id: "j56", text: "Shoten gyaku tenku." },
  { id: "j57", text: "Jo sas shu gi-gaku." },
  { id: "j58", text: "U mandara ke." },
  { id: "j59", text: "San butsu gyu daishu." },
  { id: "j60", text: "Ga jodo fu ki." },
  { id: "j61", text: "Ni shu ken sho jin." },
  { id: "j62", text: "Ufu sho kuno." },
  { id: "j63", text: "Nyo ze shitsu juman." },
  { id: "j64", text: "Ze sho zai shujo." },
  { id: "j65", text: "I aku-go innen." },
  { id: "j66", text: "Ka asogi ko." },
  { id: "j67", text: "Fu mon sanbo myo." },
  { id: "j68", text: "Sho u shu ku-doku." },
  { id: "j69", text: "Nyuwa shichi-jiki sha." },
  { id: "j70", text: "Sokkai ken gashin." },
  { id: "j71", text: "Zai shi ni seppo." },
  { id: "j72", text: "Waku-ji i shi shu." },
  { id: "j73", text: "Setsu butsu-ju muryo." },
  { id: "j74", text: "Ku nai ken bussha." },
  { id: "j75", text: "I setsu butsu nan chi." },
  { id: "j76", text: "Ga chi-riki nyo ze." },
  { id: "j77", text: "Eko sho muryo." },
  { id: "j78", text: "Jumyo mushu ko." },
  { id: "j79", text: "Ku shugo sho toku." },
  { id: "j80", text: "Nyoto u chi sha." },
  { id: "j81", text: "Mot to shi sho gi." },
  { id: "j82", text: "To dan ryo yo jin." },
  { id: "j83", text: "Butsu-go jip puko." },
  { id: "j84", text: "Nyo i zen hoben." },
  { id: "j85", text: "I ji o shi ko." },
  { id: "j86", text: "Jitsu zai ni gon shi." },
  { id: "j87", text: "Mu no sek komo." },
  { id: "j88", text: "Ga yaku i se bu." },
  { id: "j89", text: "Ku sho kugen sha." },
  { id: "j90", text: "I bonbu tendo." },
  { id: "j91", text: "Jitsu zai ni gon metsu." },
  { id: "j92", text: "I joken ga ko." },
  { id: "j93", text: "Ni sho kyoshi shin." },
  { id: "j94", text: "Ho-itsu jaku go-yoku." },
  { id: "j95", text: "Da o aku-do chu." },
  { id: "j96", text: "Ga jo chi shujo." },
  { id: "j97", text: "Gyo do fu gyo do." },
  { id: "j98", text: "Zui o sho ka do." },
  { id: "j99", text: "I ses shuju ho." },
  { id: "j100", text: "Mai ji sa ze nen." },
  { id: "j101", text: "I ga ryo shujo." },
  { id: "j102", text: "Toku nyu mu-jo do." },
  { id: "j103", text: "Soku joju busshin." },
];

// ─── Split Whisper words by gap ───
// The gap between Hoben body and Juryo body is daimoku chanting.
// Whisper skips it. We detect by the largest time gap between consecutive words.
const GAP_THRESHOLD = 10;
let gapStart = 0, gapEnd = 0;
for (let i = 1; i < allWhisperWords.length; i++) {
  const gap = allWhisperWords[i].start - allWhisperWords[i - 1].end;
  if (gap > GAP_THRESHOLD) {
    gapStart = allWhisperWords[i - 1].end;
    gapEnd = allWhisperWords[i].start;
    break;
  }
}
console.log(`Whisper gap (daimoku): ${gapStart.toFixed(2)}s - ${gapEnd.toFixed(2)}s`);

const hobenWhisperWords = allWhisperWords.filter(w => w.end <= gapStart + 1);
const juryoWhisperWords = allWhisperWords.filter(w => w.start >= gapEnd - 1);

console.log(`Hoben Whisper words: ${hobenWhisperWords.length}`);
console.log(`Juryo Whisper words: ${juryoWhisperWords.length}`);

// ─── Helpers ───
function isMultiSyllable(word) {
  const matches = word.match(/[aeiouy]+/gi);
  return matches ? matches.length >= 2 : false;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function distributeWords(romajiWords, lineStart, lineEnd) {
  const charWeights = romajiWords.map(w => w.replace(/[.]/g, '').length);
  const totalChars = charWeights.reduce((a, b) => a + b, 0);
  const duration = lineEnd - lineStart;
  const timings = [];
  let cur = lineStart;

  for (let i = 0; i < romajiWords.length; i++) {
    const weight = charWeights[i] / totalChars;
    const wordDur = duration * weight;
    const wordEnd = i === romajiWords.length - 1 ? lineEnd : cur + wordDur;

    timings.push({
      word: romajiWords[i],
      start: round2(cur),
      end: round2(wordEnd),
      multiSyllable: isMultiSyllable(romajiWords[i]),
    });
    cur = wordEnd;
  }
  return timings;
}

/**
 * Map romaji lines to Whisper word timing using proportional distribution.
 */
function mapLinesToWhisperWords(romajiLines, whisperWords) {
  const lineCharCounts = romajiLines.map(l => l.text.replace(/[.\s]/g, '').length);
  const totalChars = lineCharCounts.reduce((a, b) => a + b, 0);
  const totalWW = whisperWords.length;
  const results = {};
  const lineTimestamps = [];
  let whisperIdx = 0;

  for (let li = 0; li < romajiLines.length; li++) {
    const line = romajiLines[li];
    const romajiWords = line.text.split(/\s+/);
    const lineWeight = lineCharCounts[li] / totalChars;

    let wwCount;
    if (li === romajiLines.length - 1) {
      wwCount = totalWW - whisperIdx;
    } else {
      wwCount = Math.max(1, Math.round(lineWeight * totalWW));
      if (whisperIdx + wwCount > totalWW) {
        wwCount = totalWW - whisperIdx;
      }
    }

    const lineWW = whisperWords.slice(whisperIdx, whisperIdx + wwCount);
    whisperIdx += wwCount;

    if (lineWW.length === 0) {
      const lastEnd = lineTimestamps.length > 0
        ? lineTimestamps[lineTimestamps.length - 1].end
        : whisperWords[0]?.start || 0;
      lineTimestamps.push({ id: line.id, start: round2(lastEnd), end: round2(lastEnd + 0.5) });
      results[line.id] = distributeWords(romajiWords, lastEnd, lastEnd + 0.5);
      continue;
    }

    const lineStart = lineWW[0].start;
    const lineEnd = lineWW[lineWW.length - 1].end;

    lineTimestamps.push({ id: line.id, start: round2(lineStart), end: round2(lineEnd) });
    results[line.id] = distributeWords(romajiWords, lineStart, lineEnd);
  }

  return { wordTimestamps: results, lineTimestamps };
}

// ─── Process body sections ───
console.log('\n--- Hoben body ---');
const hobenResult = mapLinesToWhisperWords(hobenBody, hobenWhisperWords);
console.log(`Mapped ${Object.keys(hobenResult.wordTimestamps).length} lines`);

console.log('\n--- Juryo body ---');
const juryoResult = mapLinesToWhisperWords(juryoBody, juryoWhisperWords);
console.log(`Mapped ${Object.keys(juryoResult.wordTimestamps).length} lines`);

// ─── Title timestamps from audio analysis ───
// Audio silence detection shows:
//   5.5s: chanting begins
//   9.6s: brief pause (boundary between h0 and h1)
//   ~28.0s: pause before body starts at 30s
// Juryo:
//   164.9s: pause in daimoku pattern -> title chant begins
//   167.6s: pause -> body begins at ~167.7s

const titleWordTimestamps = {};
const titleLineTimestamps = [];

// h0: "Myo ho ren ge kyo." -- 5.5s to 9.6s
{
  const words = hobenTitles[0].text.split(/\s+/);
  titleLineTimestamps.push({ id: "h0", start: 5.5, end: 9.6 });
  titleWordTimestamps["h0"] = distributeWords(words, 5.5, 9.6);
}

// h1: "Hoben-pon. Dai ni." -- 9.8s to 16.0s
// (The slow title recitation; the ~16s-28s range is likely opening daimoku)
{
  const words = hobenTitles[1].text.split(/\s+/);
  titleLineTimestamps.push({ id: "h1", start: 9.8, end: 16.0 });
  titleWordTimestamps["h1"] = distributeWords(words, 9.8, 16.0);
}

// j0: "Myo ho ren ge kyo." -- 163.5s to 165.1s
{
  const words = juryoTitles[0].text.split(/\s+/);
  titleLineTimestamps.push({ id: "j0", start: 163.5, end: 165.1 });
  titleWordTimestamps["j0"] = distributeWords(words, 163.5, 165.1);
}

// j1: "Nyorai ju-ryo-hon. Dai ju-roku." -- 165.1s to 167.6s
{
  const words = juryoTitles[1].text.split(/\s+/);
  titleLineTimestamps.push({ id: "j1", start: 165.1, end: 167.6 });
  titleWordTimestamps["j1"] = distributeWords(words, 165.1, 167.6);
}

// ─── Combine everything ───
const allWordTimestamps = {
  ...titleWordTimestamps,
  ...hobenResult.wordTimestamps,
  ...juryoResult.wordTimestamps,
};

const allLineTimestamps = [
  ...titleLineTimestamps.filter(t => t.id.startsWith('h')),
  ...hobenResult.lineTimestamps,
  ...titleLineTimestamps.filter(t => t.id.startsWith('j')),
  ...juryoResult.lineTimestamps,
];

const lineOrder = (id) => {
  const prefix = id[0] === 'h' ? 0 : 1000;
  return prefix + parseInt(id.slice(1));
};
allLineTimestamps.sort((a, b) => lineOrder(a.id) - lineOrder(b.id));

// ─── Stats ───
let totalWords = 0;
let multiSyllableCount = 0;
for (const [, words] of Object.entries(allWordTimestamps)) {
  totalWords += words.length;
  multiSyllableCount += words.filter(w => w.multiSyllable).length;
}

console.log(`\nTotal lines: ${allLineTimestamps.length}`);
console.log(`Total words: ${totalWords}`);
console.log(`Multi-syllable words: ${multiSyllableCount}`);

// ─── Write word-timestamps.ts ───
let tsOutput = `// Word-level timestamps for gongyo lines (gongyo-solo.mp3)
// Title timestamps from audio silence detection
// Body timestamps from Whisper word-level analysis
// Romaji words distributed proportionally by character weight within each line

export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
  multiSyllable: boolean;
}

export type WordTimestampMap = Record<string, WordTimestamp[]>;

export const wordTimestamps: WordTimestampMap = {\n`;

const orderedIds = Object.keys(allWordTimestamps).sort((a, b) => lineOrder(a) - lineOrder(b));

for (const id of orderedIds) {
  const words = allWordTimestamps[id];
  tsOutput += `  "${id}": [\n`;
  for (const w of words) {
    tsOutput += `    { word: "${w.word}", start: ${w.start}, end: ${w.end}, multiSyllable: ${w.multiSyllable} },\n`;
  }
  tsOutput += `  ],\n`;
}

tsOutput += `};\n`;

writeFileSync(resolve(projectRoot, 'src/data/word-timestamps.ts'), tsOutput);
console.log('\nWrote src/data/word-timestamps.ts');

// ─── Write timestamps.ts ───
let tsTimestamps = `export interface LineTimestamp {
  id: string;
  start: number;
  end: number;
}

export const gongyoTimestamps: LineTimestamp[] = [\n`;

for (const lt of allLineTimestamps) {
  tsTimestamps += `  { id: "${lt.id}", start: ${lt.start}, end: ${lt.end} },\n`;
}

tsTimestamps += `];

// Build lookup map
export const timestampById: Record<string, LineTimestamp> = {};
gongyoTimestamps.forEach((t) => {
  timestampById[t.id] = t;
});
`;

writeFileSync(resolve(projectRoot, 'src/data/timestamps.ts'), tsTimestamps);
console.log('Wrote src/data/timestamps.ts');

// ─── Print samples for verification ───
console.log('\n--- Titles ---');
for (const id of ['h0', 'h1', 'j0', 'j1']) {
  const lt = allLineTimestamps.find(t => t.id === id);
  const wt = allWordTimestamps[id];
  console.log(`\n${id}: ${lt.start}s - ${lt.end}s`);
  for (const w of wt) {
    console.log(`  ${w.word.padEnd(15)} ${w.start.toFixed(2)} - ${w.end.toFixed(2)} ${w.multiSyllable ? '(multi)' : ''}`);
  }
}

console.log('\n--- First body lines ---');
for (const id of ['h2', 'h3', 'j2', 'j3']) {
  const lt = allLineTimestamps.find(t => t.id === id);
  const wt = allWordTimestamps[id];
  console.log(`\n${id}: ${lt.start}s - ${lt.end}s`);
  for (const w of wt) {
    console.log(`  ${w.word.padEnd(15)} ${w.start.toFixed(2)} - ${w.end.toFixed(2)} ${w.multiSyllable ? '(multi)' : ''}`);
  }
}
