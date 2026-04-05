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
      {/* Previous line -- paired kanji-romaji columns */}
      <div className="font-sans text-ink opacity-40 leading-relaxed min-h-[20px]">
        {prevId && prevWords ? (
          <div className="flex flex-wrap items-end gap-x-1.5">
            {prevWords.map((w, i) => (
              <span key={i} className="inline-flex flex-col items-center">
                <span className="text-[11px] opacity-50 tracking-wider">{w.kanji}</span>
                <span className="text-[15px]">{w.romaji}</span>
              </span>
            ))}
          </div>
        ) : prevId ? (
          <div className="text-[15px]">{lineTextById[prevId]}</div>
        ) : null}
      </div>

      {/* Current line -- paired kanji-romaji columns with karaoke highlighting */}
      <div className="font-sans my-1">
        {lineWords ? (
          <div className="flex flex-wrap items-end gap-x-2">
            {lineWords.map((w, i) => {
              let kanjiCls: string;
              if (i === currentWordIdx) {
                kanjiCls = "kanji-word-current";
              } else if (i < currentWordIdx) {
                kanjiCls = w.multiSyllable ? "kanji-word-passed-multi" : "kanji-word-passed";
              } else {
                kanjiCls = "";
              }

              let romajiCls: string;
              if (i === currentWordIdx) {
                romajiCls = "tp-word-current";
              } else if (i < currentWordIdx) {
                romajiCls = w.multiSyllable ? "tp-word-passed-multi" : "tp-word-passed";
              } else {
                romajiCls = "tp-word-upcoming";
              }

              return (
                <span key={i} className="inline-flex flex-col items-center">
                  <span className={`text-[13px] text-ink/35 ${kanjiCls}`}>{w.kanji}</span>
                  <span className={`text-[22px] leading-relaxed ${romajiCls}`}>{w.romaji}</span>
                </span>
              );
            })}
          </div>
        ) : (
          <span className="text-[22px] text-ink font-medium">
            {lineTextById[currentLineId]}
          </span>
        )}
      </div>

      {/* Next line -- paired kanji-romaji columns */}
      <div className="font-sans text-ink opacity-50 leading-relaxed min-h-[20px]">
        {nextId && nextWords ? (
          <div className="flex flex-wrap items-end gap-x-1.5">
            {nextWords.map((w, i) => (
              <span key={i} className="inline-flex flex-col items-center">
                <span className="text-[11px] opacity-50 tracking-wider">{w.kanji}</span>
                <span className="text-[15px]">{w.romaji}</span>
              </span>
            ))}
          </div>
        ) : nextId ? (
          <div className="text-[15px]">{lineTextById[nextId]}</div>
        ) : null}
      </div>
    </div>
  );
}
