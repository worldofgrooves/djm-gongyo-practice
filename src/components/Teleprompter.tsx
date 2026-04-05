"use client";

import { gongyoData, getAllPracticeLineIds } from "@/data/gongyo";
import { wordTimestamps } from "@/data/word-timestamps";
import type { WordPosition } from "./AudioPlayer";

interface TeleprompterProps {
  currentLineId: string | null;
  wordPosition: WordPosition | null;
  isVisible: boolean;
}

// Build a flat lookup for line text by ID
const lineTextById: Record<string, string> = {};
gongyoData.sections.forEach((s) => {
  s.lines.forEach((l) => {
    lineTextById[l.id] = l.romaji;
  });
});

export default function Teleprompter({
  currentLineId,
  wordPosition,
  isVisible,
}: TeleprompterProps) {
  if (!isVisible || !currentLineId) return null;

  const allIds = getAllPracticeLineIds();
  const currentIndex = allIds.indexOf(currentLineId);
  if (currentIndex === -1) return null;

  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId =
    currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  // Word-level rendering for current line
  const lineWords = wordTimestamps[currentLineId];
  const currentWordIdx =
    wordPosition && wordPosition.lineId === currentLineId
      ? wordPosition.wordIndex
      : -1;

  // Kanji text for prev/next lines
  const prevWords = prevId ? wordTimestamps[prevId] : null;
  const nextWords = nextId ? wordTimestamps[nextId] : null;

  return (
    <div className="bg-white border-b border-paper-deep px-5 py-3 flex-shrink-0 z-10">
      {/* Previous line */}
      <div className="font-sans text-ink opacity-40 leading-relaxed min-h-[20px]">
        {prevId && prevWords ? (
          <div>
            <div className="text-[15px] tracking-wider">{prevWords.map((w) => w.kanji).join(" ")}</div>
            <div className="text-[11px] opacity-70">{lineTextById[prevId]}</div>
          </div>
        ) : prevId ? (
          <div className="text-[15px]">{lineTextById[prevId]}</div>
        ) : null}
      </div>

      {/* Current line -- kanji with karaoke + romaji below */}
      <div className="font-sans my-1">
        {lineWords ? (
          <div>
            <div className="text-[22px] leading-relaxed flex flex-wrap gap-x-1.5">
              {lineWords.map((w, i) => {
                let cls: string;
                if (i === currentWordIdx) {
                  cls = "tp-word-current";
                } else if (i < currentWordIdx) {
                  cls = w.multiSyllable ? "tp-word-passed-multi" : "tp-word-passed";
                } else {
                  cls = "tp-word-upcoming";
                }
                return (
                  <span key={i} className={cls}>
                    {w.kanji}
                  </span>
                );
              })}
            </div>
            <div className="text-[13px] text-ink/40 mt-0.5 flex flex-wrap gap-x-1">
              {lineWords.map((w, i) => {
                let cls: string;
                if (i === currentWordIdx) {
                  cls = "text-ink/70 font-medium";
                } else if (i < currentWordIdx) {
                  cls = "text-ink/35";
                } else {
                  cls = "text-ink/25";
                }
                return (
                  <span key={i} className={cls}>
                    {w.romaji}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <span className="text-[22px] text-ink font-medium">
            {lineTextById[currentLineId]}
          </span>
        )}
      </div>

      {/* Next line */}
      <div className="font-sans text-ink opacity-50 leading-relaxed min-h-[20px]">
        {nextId && nextWords ? (
          <div>
            <div className="text-[15px] tracking-wider">{nextWords.map((w) => w.kanji).join(" ")}</div>
            <div className="text-[11px] opacity-70">{lineTextById[nextId]}</div>
          </div>
        ) : nextId ? (
          <div className="text-[15px]">{lineTextById[nextId]}</div>
        ) : null}
      </div>
    </div>
  );
}
