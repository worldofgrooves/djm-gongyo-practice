#!/usr/bin/env node
/**
 * Map Whisper word-level timestamps to correct kanji + romaji pairs.
 *
 * Whisper transcribed the chanting as hallucinated Japanese kanji -- the text
 * is wrong, but the TIMING of each detected word is accurate. We use Whisper's
 * timing boundaries as anchors and pair them with the correct kanji and romaji
 * for each line of the Lotus Sutra.
 *
 * For each line:
 *   1. Collect Whisper timing slots that fall within the line's time range
 *   2. Pair correct kanji characters with romaji words
 *   3. Assign Whisper timing directly when slot count matches word count
 *   4. When counts differ, distribute proportionally using Whisper boundaries
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
  for (let i = 0; i < (seg.words || []).length; i++) {
    const w = seg.words[i];
    let end = w.end;
    if (end <= w.start) {
      const next = seg.words[i + 1];
      end = next ? next.start : w.start + 0.2;
    }
    allWhisperWords.push({ start: w.start, end });
  }
}

console.log(`Total Whisper timing slots: ${allWhisperWords.length}`);

// ─── Define lines with CORRECT kanji and romaji ───
// Each entry: { id, kanji: "char char char", romaji: "word word word" }
// Kanji and romaji must have the same word count -- one kanji group per romaji word.

const lines = [
  // Hoben-pon titles (not in Whisper -- use synthetic timing)
  { id: "h0", kanji: "妙 法 蓮 華 經", romaji: "Myo ho ren ge kyo.", title: true },
  { id: "h1", kanji: "方便品 第 二", romaji: "Hoben-pon. Dai ni.", title: true },

  // Hoben-pon body
  { id: "h2", kanji: "爾時 世尊 從 三昧 安詳", romaji: "Niji seson. Ju sanmai. Anjo" },
  { id: "h3", kanji: "而 起 告 舍利弗 諸", romaji: "ni ki. Go shari-hotsu. Sho-" },
  { id: "h4", kanji: "佛 智慧 甚深 無量 其", romaji: "but chi-e. Jinjin muryo. Go" },
  { id: "h5", kanji: "智慧 門 難解 難入 一切", romaji: "chi-e mon. Nange nannyu. Issai" },
  { id: "h6", kanji: "聲聞 辟支佛 所", romaji: "shomon. Hyaku-shi-butsu. Sho" },
  { id: "h7", kanji: "不 能 知 所以 者 何 佛", romaji: "fu no chi. Sho-i sha ga. Butsu" },
  { id: "h8", kanji: "曾 親近 百 千 萬 億", romaji: "zo shingon. Hyaku sen man noku." },
  { id: "h9", kanji: "無數 諸 佛 盡 行", romaji: "Mushu sho butsu. Jin gyo" },
  { id: "h10", kanji: "諸佛 無量 道法 勇猛", romaji: "sho-butsu. Muryo doho. Yumyo" },
  { id: "h11", kanji: "精進 名稱 普 聞 成就", romaji: "shojin. Myosho fu mon. Joju" },
  { id: "h12", kanji: "甚深 未曾有 法 隨宜 所 説", romaji: "jinjin. Mi-zo-u ho. Zui gi sho" },
  { id: "h13", kanji: "説 意趣 難解 舍利弗", romaji: "setsu. Ishu nange. Shari-hotsu." },
  { id: "h14", kanji: "吾 從 成佛 已來 種種 因緣", romaji: "Go ju jo-butsu irai. Shuju innen." },
  { id: "h15", kanji: "種種 譬喩 廣 演 言教 無", romaji: "Shuju hiyu. Ko en gonkyo. Mu" },
  { id: "h16", kanji: "數 方便 引導 衆生 令 離", romaji: "shu hoben. Indo shujo. Ryo ri" },
  { id: "h17", kanji: "諸 著 所以 者 何 如來", romaji: "sho jaku. Sho-i sha ga. Nyorai" },
  { id: "h18", kanji: "方便 知見 波羅蜜 皆", romaji: "hoben. Chi-ken hara-mitsu. Kai" },
  { id: "h19", kanji: "已 具足 舍利弗 如來", romaji: "i gu-soku. Shari-hotsu. Nyorai" },
  { id: "h20", kanji: "知見 廣大 深遠 無量", romaji: "chi-ken. Kodai jinnon. Muryo" },
  { id: "h21", kanji: "無礙 力 無所畏 禪定", romaji: "muge. Riki. Mu-sho-i. Zenjo." },
  { id: "h22", kanji: "解脱 三昧 深 入 無際", romaji: "Gedas. Sanmai. Jin nyu musai." },
  { id: "h23", kanji: "成就 一切 未曾有 法 舍利", romaji: "Joju issai. Mi-zo-u ho. Shari-" },
  { id: "h24", kanji: "弗 如來 能 種種 分", romaji: "hotsu. Nyorai no. Shuju fun-" },
  { id: "h25", kanji: "別 巧 説 諸 法 言", romaji: "betsu. Gyo ses sho ho. Gon-" },
  { id: "h26", kanji: "辭 柔軟 悦可 衆心 舍利", romaji: "ji nyunan. Ekka shushin. Shari-" },
  { id: "h27", kanji: "弗 取 要 言 之 無量", romaji: "hotsu. Shu yo gon shi. Muryo" },
  { id: "h28", kanji: "無邊 未曾有 法 佛 悉", romaji: "muhen. Mi-zo-u ho. Bus shitsu" },
  { id: "h29", kanji: "成就 止 舍利弗 不 須 復", romaji: "joju. Shi shari-hotsu. Fu shu bu" },
  { id: "h30", kanji: "説 所以 者 何 佛 所", romaji: "setsu. Sho-i sha ga. Bus sho" },
  { id: "h31", kanji: "成就 第 一 希有 難解 之", romaji: "joju. Dai ichi ke-u. Nange shi" },
  { id: "h32", kanji: "法 唯 佛 與 佛 乃 能", romaji: "ho. Yui butsu yo butsu. Nai no" },
  { id: "h33", kanji: "究盡 諸法 實相", romaji: "kujin. Shoho jisso." },

  // Ten Factors (first recitation)
  { id: "h34", kanji: "所謂 諸法 如 是 相", romaji: "Sho-i shoho. Nyo ze so." },
  { id: "h35", kanji: "如 是 性 如 是 體", romaji: "Nyo ze sho. Nyo ze tai." },
  { id: "h36", kanji: "如 是 力 如 是 作", romaji: "Nyo ze riki. Nyo ze sa." },
  { id: "h37", kanji: "如 是 因 如 是 緣", romaji: "Nyo ze in. Nyo ze en." },
  { id: "h38", kanji: "如 是 果 如 是 報", romaji: "Nyo ze ka. Nyo ze ho." },
  { id: "h39", kanji: "如 是 本末 究竟 等", romaji: "Nyo ze honmak kukyo to." },

  // Ten Factors (second recitation)
  { id: "h40", kanji: "所謂 諸法 如 是 相", romaji: "Sho-i shoho. Nyo ze so." },
  { id: "h41", kanji: "如 是 性 如 是 體", romaji: "Nyo ze sho. Nyo ze tai." },
  { id: "h42", kanji: "如 是 力 如 是 作", romaji: "Nyo ze riki. Nyo ze sa." },
  { id: "h43", kanji: "如 是 因 如 是 縁", romaji: "Nyo ze in. Nyo ze en." },
  { id: "h44", kanji: "如 是 果 如 是 報", romaji: "Nyo ze ka. Nyo ze ho." },
  { id: "h45", kanji: "如 是 本末 究竟 等", romaji: "Nyo ze honmak kukyo to." },

  // Juryo-hon titles (not in Whisper -- use synthetic timing)
  { id: "j0", kanji: "妙 法 蓮 華 經", romaji: "Myo ho ren ge kyo.", title: true },
  { id: "j1", kanji: "如來 壽量品 第 十六", romaji: "Nyorai ju-ryo-hon. Dai ju-roku.", title: true },

  // Jigage
  { id: "j2", kanji: "自 我 得 佛 來", romaji: "Ji ga toku bur rai." },
  { id: "j3", kanji: "所 經 諸 劫數", romaji: "Sho kyo sho kosshu." },
  { id: "j4", kanji: "無量 百 千 萬", romaji: "Muryo hyaku sen man." },
  { id: "j5", kanji: "億 載 阿僧祇", romaji: "Oku sai asogi." },
  { id: "j6", kanji: "常 説法 教化", romaji: "Jo seppo kyoke." },
  { id: "j7", kanji: "無數 億 衆生", romaji: "Mushu oku shujo." },
  { id: "j8", kanji: "令 入 於 佛道", romaji: "Ryo nyu o butsu-do." },
  { id: "j9", kanji: "爾來 無量 劫", romaji: "Nirai muryo ko." },
  { id: "j10", kanji: "爲 度 衆生 故", romaji: "I do shujo ko." },
  { id: "j11", kanji: "方便 現 涅槃", romaji: "Hoben gen nehan." },
  { id: "j12", kanji: "而 實 不 滅度", romaji: "Ni jitsu fu metsu-do." },
  { id: "j13", kanji: "常 住 此 説法", romaji: "Jo ju shi seppo." },
  { id: "j14", kanji: "我 常 住 於 此", romaji: "Ga jo ju o shi." },
  { id: "j15", kanji: "以 諸 神通力", romaji: "I sho jin-zu-riki." },
  { id: "j16", kanji: "令 顛倒 衆生", romaji: "Ryo tendo shujo." },
  { id: "j17", kanji: "雖 近 而 不 見", romaji: "Sui gon ni fu ken." },
  { id: "j18", kanji: "衆 見 我 滅度", romaji: "Shu ken ga metsu-do." },
  { id: "j19", kanji: "廣 供養 舍利", romaji: "Ko kuyo shari." },
  { id: "j20", kanji: "咸 皆 懷 戀慕", romaji: "Gen kai e renbo." },
  { id: "j21", kanji: "而 生 渇仰 心", romaji: "Ni sho katsu-go shin." },
  { id: "j22", kanji: "衆生 既 信伏", romaji: "Shujo ki shin-buku." },
  { id: "j23", kanji: "質直 意 柔軟", romaji: "Shichi-jiki i nyunan." },
  { id: "j24", kanji: "一心 欲 見 佛", romaji: "Isshin yok ken butsu." },
  { id: "j25", kanji: "不 自 惜 身命", romaji: "Fu ji shaku shinmyo." },
  { id: "j26", kanji: "時 我 及 衆僧", romaji: "Ji ga gyu shuso." },
  { id: "j27", kanji: "倶 出 靈鷲山", romaji: "Ku shutsu ryojusen." },
  { id: "j28", kanji: "我 時 語 衆生", romaji: "Ga ji go shujo." },
  { id: "j29", kanji: "常 在 此 不滅", romaji: "Jo zai shi fu-metsu." },
  { id: "j30", kanji: "以 方便力 故", romaji: "I ho-ben-rik ko." },
  { id: "j31", kanji: "現 有 滅 不滅", romaji: "Gen u metsu fu-metsu." },
  { id: "j32", kanji: "餘國 有 衆生", romaji: "Yo-koku u shujo." },
  { id: "j33", kanji: "恭敬 信樂 者", romaji: "Kugyo shingyo sha." },
  { id: "j34", kanji: "我 復 於 彼 中", romaji: "Ga bu o hi chu." },
  { id: "j35", kanji: "爲 説 無上 法", romaji: "I setsu mujo ho." },
  { id: "j36", kanji: "汝等 不 聞 此", romaji: "Nyoto fu mon shi." },
  { id: "j37", kanji: "但 謂 我 滅度", romaji: "Tan ni ga metsu-do." },
  { id: "j38", kanji: "我 見 諸 衆生", romaji: "Ga ken sho shujo." },
  { id: "j39", kanji: "没在 於 苦海", romaji: "Motsu-zai o kukai." },
  { id: "j40", kanji: "故 不 爲 現 身", romaji: "Ko fu i gen shin." },
  { id: "j41", kanji: "令 其 生 渇仰", romaji: "Ryo go sho katsu-go." },
  { id: "j42", kanji: "因 其 心 戀慕", romaji: "In go shin renbo." },
  { id: "j43", kanji: "乃 出 爲 説法", romaji: "Nai shutsu i seppo." },
  { id: "j44", kanji: "神通力 如 是", romaji: "Jin-zu-riki nyo ze." },
  { id: "j45", kanji: "於 阿僧祇 劫", romaji: "O asogi ko." },
  { id: "j46", kanji: "常 在 靈鷲山", romaji: "Jo zai ryojusen." },
  { id: "j47", kanji: "及 餘 諸 住處", romaji: "Gyu yo sho jusho." },
  { id: "j48", kanji: "衆生 見 劫 盡", romaji: "Shujo ken ko jin." },
  { id: "j49", kanji: "大 火 所 燒 時", romaji: "Dai ka sho sho ji." },
  { id: "j50", kanji: "我 此 土 安隱", romaji: "Ga shi do annon." },
  { id: "j51", kanji: "天人 常 充滿", romaji: "Tennin jo juman." },
  { id: "j52", kanji: "園林 諸 堂閣", romaji: "Onrin sho do-kaku." },
  { id: "j53", kanji: "種種 寶 莊嚴", romaji: "Shuju ho shogon." },
  { id: "j54", kanji: "寶樹 多 華果", romaji: "Hoju ta keka." },
  { id: "j55", kanji: "衆生 所 遊樂", romaji: "Shujo sho yu-raku." },
  { id: "j56", kanji: "諸天 擊 天鼓", romaji: "Shoten gyaku tenku." },
  { id: "j57", kanji: "常 作 衆 伎樂", romaji: "Jo sas shu gi-gaku." },
  { id: "j58", kanji: "雨 曼陀羅 華", romaji: "U mandara ke." },
  { id: "j59", kanji: "散 佛 及 大衆", romaji: "San butsu gyu daishu." },
  { id: "j60", kanji: "我 淨土 不 毀", romaji: "Ga jodo fu ki." },
  { id: "j61", kanji: "而 衆 見 燒 盡", romaji: "Ni shu ken sho jin." },
  { id: "j62", kanji: "憂怖 諸 苦惱", romaji: "Ufu sho kuno." },
  { id: "j63", kanji: "如 是 悉 充滿", romaji: "Nyo ze shitsu juman." },
  { id: "j64", kanji: "是 諸 罪 衆生", romaji: "Ze sho zai shujo." },
  { id: "j65", kanji: "以 惡業 因緣", romaji: "I aku-go innen." },
  { id: "j66", kanji: "過 阿僧祇 劫", romaji: "Ka asogi ko." },
  { id: "j67", kanji: "不 聞 三寶 名", romaji: "Fu mon sanbo myo." },
  { id: "j68", kanji: "諸 有 修 功德", romaji: "Sho u shu ku-doku." },
  { id: "j69", kanji: "柔和 質直 者", romaji: "Nyuwa shichi-jiki sha." },
  { id: "j70", kanji: "則皆 見 我身", romaji: "Sokkai ken gashin." },
  { id: "j71", kanji: "在 此 而 説法", romaji: "Zai shi ni seppo." },
  { id: "j72", kanji: "或時 爲 此 衆", romaji: "Waku-ji i shi shu." },
  { id: "j73", kanji: "説 佛壽 無量", romaji: "Setsu butsu-ju muryo." },
  { id: "j74", kanji: "久 乃 見 佛者", romaji: "Ku nai ken bussha." },
  { id: "j75", kanji: "爲 説 佛 難 値", romaji: "I setsu butsu nan chi." },
  { id: "j76", kanji: "我 智力 如 是", romaji: "Ga chi-riki nyo ze." },
  { id: "j77", kanji: "慧光 照 無量", romaji: "Eko sho muryo." },
  { id: "j78", kanji: "壽命 無數 劫", romaji: "Jumyo mushu ko." },
  { id: "j79", kanji: "久 修業 所 得", romaji: "Ku shugo sho toku." },
  { id: "j80", kanji: "汝等 有 智 者", romaji: "Nyoto u chi sha." },
  { id: "j81", kanji: "勿 於 此 生 疑", romaji: "Mot to shi sho gi." },
  { id: "j82", kanji: "當 斷 令 永 盡", romaji: "To dan ryo yo jin." },
  { id: "j83", kanji: "佛語 實 不虛", romaji: "Butsu-go jip puko." },
  { id: "j84", kanji: "如 醫 善 方便", romaji: "Nyo i zen hoben." },
  { id: "j85", kanji: "爲 治 於 子 故", romaji: "I ji o shi ko." },
  { id: "j86", kanji: "實 在 而 言 死", romaji: "Jitsu zai ni gon shi." },
  { id: "j87", kanji: "無 能 説 虚妄", romaji: "Mu no sek komo." },
  { id: "j88", kanji: "我 亦 爲 世 父", romaji: "Ga yaku i se bu." },
  { id: "j89", kanji: "救 諸 苦患 者", romaji: "Ku sho kugen sha." },
  { id: "j90", kanji: "爲 凡夫 顛倒", romaji: "I bonbu tendo." },
  { id: "j91", kanji: "實 在 而 言 滅", romaji: "Jitsu zai ni gon metsu." },
  { id: "j92", kanji: "以 常見 我 故", romaji: "I joken ga ko." },
  { id: "j93", kanji: "而 生 憍恣 心", romaji: "Ni sho kyoshi shin." },
  { id: "j94", kanji: "放逸 著 五欲", romaji: "Ho-itsu jaku go-yoku." },
  { id: "j95", kanji: "墮 於 惡道 中", romaji: "Da o aku-do chu." },
  { id: "j96", kanji: "我 常 知 衆生", romaji: "Ga jo chi shujo." },
  { id: "j97", kanji: "行 道 不 行 道", romaji: "Gyo do fu gyo do." },
  { id: "j98", kanji: "隨 應 所 可 度", romaji: "Zui o sho ka do." },
  { id: "j99", kanji: "爲 説 種種 法", romaji: "I ses shuju ho." },
  { id: "j100", kanji: "每 自 作 是 念", romaji: "Mai ji sa ze nen." },
  { id: "j101", kanji: "以 何 令 衆生", romaji: "I ga ryo shujo." },
  { id: "j102", kanji: "得 入 無上 道", romaji: "Toku nyu mu-jo do." },
  { id: "j103", kanji: "速 成就 佛身", romaji: "Soku joju busshin." },
];

// ─── Helpers ───
function isMultiSyllable(word) {
  const matches = word.match(/[aeiouy]+/gi);
  return matches ? matches.length >= 2 : false;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

// ─── Get Whisper timing slots for a time range ───
function getWhisperSlots(startTime, endTime) {
  return allWhisperWords.filter(w => w.start >= startTime - 0.3 && w.start < endTime + 0.3);
}

// ─── Map words using Whisper timing ───
function mapLineWords(line, lineStart, lineEnd) {
  const kanjiWords = line.kanji.split(/\s+/);
  const romajiWords = line.romaji.split(/\s+/);
  const wordCount = romajiWords.length;

  if (kanjiWords.length !== wordCount) {
    console.warn(`WARNING: ${line.id} kanji count (${kanjiWords.length}) != romaji count (${wordCount})`);
  }

  // Get Whisper timing slots for this line
  const slots = getWhisperSlots(lineStart, lineEnd);

  const result = [];

  if (slots.length === 0) {
    // No Whisper data (titles) -- distribute evenly
    const dur = lineEnd - lineStart;
    for (let i = 0; i < wordCount; i++) {
      const wStart = lineStart + (i / wordCount) * dur;
      const wEnd = lineStart + ((i + 1) / wordCount) * dur;
      result.push({
        kanji: kanjiWords[Math.min(i, kanjiWords.length - 1)],
        romaji: romajiWords[i],
        start: round2(wStart),
        end: round2(wEnd),
        multiSyllable: isMultiSyllable(romajiWords[i]),
      });
    }
  } else if (slots.length === wordCount) {
    // Perfect match -- use Whisper timing directly
    for (let i = 0; i < wordCount; i++) {
      result.push({
        kanji: kanjiWords[Math.min(i, kanjiWords.length - 1)],
        romaji: romajiWords[i],
        start: round2(slots[i].start),
        end: round2(slots[i].end),
        multiSyllable: isMultiSyllable(romajiWords[i]),
      });
    }
  } else if (slots.length > wordCount) {
    // More Whisper slots than romaji words -- group consecutive slots
    // Distribute extra slots proportionally (by romaji char weight)
    const charWeights = romajiWords.map(w => w.replace(/[.]/g, '').length);
    const totalChars = charWeights.reduce((a, b) => a + b, 0);

    let slotIdx = 0;
    for (let i = 0; i < wordCount; i++) {
      const weight = charWeights[i] / totalChars;
      let slotsForWord;
      if (i === wordCount - 1) {
        slotsForWord = slots.length - slotIdx;
      } else {
        slotsForWord = Math.max(1, Math.round(weight * slots.length));
        if (slotIdx + slotsForWord > slots.length) {
          slotsForWord = slots.length - slotIdx;
        }
      }

      const wordSlots = slots.slice(slotIdx, slotIdx + slotsForWord);
      slotIdx += slotsForWord;

      if (wordSlots.length > 0) {
        result.push({
          kanji: kanjiWords[Math.min(i, kanjiWords.length - 1)],
          romaji: romajiWords[i],
          start: round2(wordSlots[0].start),
          end: round2(wordSlots[wordSlots.length - 1].end),
          multiSyllable: isMultiSyllable(romajiWords[i]),
        });
      }
    }
  } else {
    // Fewer Whisper slots than romaji words -- split slots
    // Distribute romaji words across available slots
    const dur = lineEnd - lineStart;
    const charWeights = romajiWords.map(w => w.replace(/[.]/g, '').length);
    const totalChars = charWeights.reduce((a, b) => a + b, 0);

    let cur = slots.length > 0 ? slots[0].start : lineStart;
    const finalEnd = slots.length > 0 ? slots[slots.length - 1].end : lineEnd;
    const totalDur = finalEnd - cur;

    for (let i = 0; i < wordCount; i++) {
      const weight = charWeights[i] / totalChars;
      const wDur = totalDur * weight;
      const wEnd = i === wordCount - 1 ? finalEnd : cur + wDur;

      result.push({
        kanji: kanjiWords[Math.min(i, kanjiWords.length - 1)],
        romaji: romajiWords[i],
        start: round2(cur),
        end: round2(wEnd),
        multiSyllable: isMultiSyllable(romajiWords[i]),
      });
      cur = wEnd;
    }
  }

  return result;
}

// ─── Read existing line timestamps ───
// We'll use them as the time ranges for each line
const tsContent = readFileSync(resolve(projectRoot, 'src/data/timestamps.ts'), 'utf-8');
const lineTimestamps = {};
const tsRegex = /\{ id: "([^"]+)", start: ([\d.]+), end: ([\d.]+) \}/g;
let match;
while ((match = tsRegex.exec(tsContent)) !== null) {
  lineTimestamps[match[1]] = { start: parseFloat(match[2]), end: parseFloat(match[3]) };
}

console.log(`Loaded ${Object.keys(lineTimestamps).length} line timestamps`);

// ─── Process all lines ───
const allWordTimestamps = {};
let totalWords = 0;
let totalMulti = 0;
let perfectMatches = 0;
let moreSlots = 0;
let fewerSlots = 0;

for (const line of lines) {
  const lt = lineTimestamps[line.id];
  if (!lt) {
    console.warn(`No timestamp for ${line.id}`);
    continue;
  }

  const words = mapLineWords(line, lt.start, lt.end);
  allWordTimestamps[line.id] = words;

  totalWords += words.length;
  totalMulti += words.filter(w => w.multiSyllable).length;

  // Stats
  const slots = getWhisperSlots(lt.start, lt.end);
  const romajiCount = line.romaji.split(/\s+/).length;
  if (slots.length === romajiCount) perfectMatches++;
  else if (slots.length > romajiCount) moreSlots++;
  else fewerSlots++;
}

console.log(`\nProcessed ${lines.length} lines, ${totalWords} words, ${totalMulti} multi-syllable`);
console.log(`Timing match stats: ${perfectMatches} perfect, ${moreSlots} more slots, ${fewerSlots} fewer slots`);

// ─── Write word-timestamps.ts ───
const lineOrder = (id) => {
  const prefix = id[0] === 'h' ? 0 : 1000;
  return prefix + parseInt(id.slice(1));
};

let tsOutput = `// Word-level timestamps for gongyo lines (gongyo-solo.mp3)
// Correct kanji paired with romaji, timed from Whisper word-level analysis
// Each word has both kanji and romaji with precise start/end from audio

export interface KanjiWord {
  kanji: string;
  romaji: string;
  start: number;
  end: number;
  multiSyllable: boolean;
}

export type WordTimestampMap = Record<string, KanjiWord[]>;

export const wordTimestamps: WordTimestampMap = {\n`;

const orderedIds = Object.keys(allWordTimestamps).sort((a, b) => lineOrder(a) - lineOrder(b));

for (const id of orderedIds) {
  const words = allWordTimestamps[id];
  tsOutput += `  "${id}": [\n`;
  for (const w of words) {
    tsOutput += `    { kanji: "${w.kanji}", romaji: "${w.romaji}", start: ${w.start}, end: ${w.end}, multiSyllable: ${w.multiSyllable} },\n`;
  }
  tsOutput += `  ],\n`;
}

tsOutput += `};\n`;

writeFileSync(resolve(projectRoot, 'src/data/word-timestamps.ts'), tsOutput);
console.log('\nWrote src/data/word-timestamps.ts');

// ─── Print samples ───
console.log('\n--- Sample: Hoben titles + first 3 body lines ---');
for (const id of ['h0', 'h1', 'h2', 'h3', 'h4']) {
  const wt = allWordTimestamps[id];
  const lt = lineTimestamps[id];
  console.log(`\n${id} (${lt.start}s - ${lt.end}s):`);
  for (const w of wt) {
    console.log(`  ${w.kanji.padEnd(6)} ${w.romaji.padEnd(15)} ${w.start.toFixed(2)} - ${w.end.toFixed(2)} ${w.multiSyllable ? '(multi)' : ''}`);
  }
}

console.log('\n--- Sample: Juryo first 5 body lines ---');
for (const id of ['j2', 'j3', 'j4', 'j5', 'j6']) {
  const wt = allWordTimestamps[id];
  const lt = lineTimestamps[id];
  console.log(`\n${id} (${lt.start}s - ${lt.end}s):`);
  for (const w of wt) {
    console.log(`  ${w.kanji.padEnd(6)} ${w.romaji.padEnd(15)} ${w.start.toFixed(2)} - ${w.end.toFixed(2)} ${w.multiSyllable ? '(multi)' : ''}`);
  }
}
