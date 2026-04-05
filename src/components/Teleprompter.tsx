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

  return (
    <div className="bg-white border-b border-paper-deep px-5 py-3 flex-shrink-0 z-10">
      {/* Previous line */}
      <div className="font-serif text-[15px] text-ink opacity-40 leading-relaxed min-h-[20px]">
        {prevId ? lineTextById[prevId] : ""}
      </div>

      {/* Current line -- word-level */}
      <div className="font-serif text-[22px] leading-relaxed my-1">
        {lineWords ? (
          lineWords.map((w, i) => {
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
                {w.word}
                {i < lineWords.length - 1 ? " " : ""}
              </span>
            );
          })
        ) : (
          <span className="text-ink font-medium">
            {lineTextById[currentLineId]}
          </span>
        )}
      </div>

      {/* Next line */}
      <div className="font-serif text-[15px] text-ink opacity-50 leading-relaxed min-h-[20px]">
        {nextId ? lineTextById[nextId] : ""}
      </div>
    </div>
  );
}
