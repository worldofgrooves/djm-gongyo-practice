"use client";

import { memo } from "react";
import { GongyoLine } from "@/data/gongyo";
import { wordTimestamps } from "@/data/word-timestamps";
import type { WordPosition } from "./AudioPlayer";

interface LineRowProps {
  line: GongyoLine;
  isSelected: boolean;
  isPlaying: boolean;
  wordPosition: WordPosition | null;
  onToggle: (id: string) => void;
}

function LineRowInner({
  line,
  isSelected,
  isPlaying,
  wordPosition,
  onToggle,
}: LineRowProps) {
  if (line.type === "title") {
    // Title lines: kanji above romaji, centered, paired per word
    const titleWords = wordTimestamps[line.id];
    return (
      <div className="py-1.5 px-5 text-center">
        {titleWords ? (
          <div className="flex flex-wrap justify-center gap-x-3">
            {titleWords.map((w, i) => (
              <span key={i} className="inline-flex flex-col items-center">
                <span className="font-sans text-[11px] text-ink/35 tracking-wider">
                  {w.kanji}
                </span>
                <span className="font-sans text-xl font-semibold text-ink tracking-wide">
                  {w.romaji}
                </span>
              </span>
            ))}
          </div>
        ) : (
          <span className="font-sans text-xl font-semibold text-ink tracking-wide">
            {line.romaji}
          </span>
        )}
      </div>
    );
  }

  const baseClasses = "flex items-center py-0.5 cursor-pointer transition-colors relative active:bg-paper-warm";
  const indentClass = line.indent ? "indent" : "";

  // Get word data for this line
  const lineWords = wordTimestamps[line.id];
  const isThisLineActive = isPlaying && wordPosition && wordPosition.lineId === line.id;
  const currentWordIdx = isThisLineActive ? wordPosition.wordIndex : -1;

  return (
    <div
      id={`row-${line.id}`}
      className={`${baseClasses} ${indentClass}`}
      onClick={() => onToggle(line.id)}
    >
      {/* Pulsing dot for playing state */}
      <div
        className={`w-1.5 h-1.5 rounded-full bg-lotus ml-3 mr-3 flex-shrink-0 ${
          isPlaying ? "animate-pulse-dot" : "opacity-0"
        }`}
      />

      <div
        className={`flex-1 py-2.5 border-b border-paper-warm transition-all ${
          line.indent ? "pl-9" : "pl-5"
        } pr-5 ${
          isPlaying
            ? "bg-playing-bg border-l-[3px] border-l-lotus rounded-r-md"
            : isSelected
            ? "bg-selected-bg border-l-[3px] border-l-selected-border rounded-r-md"
            : ""
        }`}
      >
        {isThisLineActive && lineWords ? (
          /* Active/playing line: kanji-romaji paired columns with karaoke highlighting */
          <div className="font-sans leading-relaxed tracking-[0.01em]">
            <div className="flex flex-wrap items-end gap-x-2">
              {lineWords.map((w, i) => {
                let kanjiCls: string;
                if (i === currentWordIdx) {
                  kanjiCls = "kanji-word-current";
                } else if (i < currentWordIdx) {
                  kanjiCls = w.multiSyllable ? "kanji-word-passed-multi" : "kanji-word-passed";
                } else {
                  kanjiCls = (w.multiSyllable && i === currentWordIdx + 1)
                    ? "kanji-word-upcoming-multi"
                    : "";
                }

                let romajiCls: string;
                if (i === currentWordIdx) {
                  romajiCls = "word-current";
                } else if (i < currentWordIdx) {
                  romajiCls = w.multiSyllable ? "word-passed-multi" : "word-passed";
                } else {
                  romajiCls = (w.multiSyllable && i === currentWordIdx + 1)
                    ? "word-upcoming-multi"
                    : "word-upcoming";
                }

                return (
                  <span key={i} className="inline-flex flex-col items-center">
                    <span className={`text-[0.7em] text-ink/35 ${kanjiCls} relative inline-block`}>
                      {i === currentWordIdx && (
                        <span className="karaoke-dot" />
                      )}
                      {w.kanji}
                    </span>
                    <span className={`gongyo-text ${romajiCls}`}>
                      {w.romaji}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        ) : lineWords ? (
          /* Static line with word data: kanji-romaji paired columns */
          <div className="font-sans leading-relaxed tracking-[0.01em]">
            <div className="flex flex-wrap items-end gap-x-2">
              {lineWords.map((w, i) => (
                <span key={i} className="inline-flex flex-col items-center">
                  <span className="text-[0.7em] text-ink/35">{w.kanji}</span>
                  <span className={`gongyo-text ${isPlaying ? "text-lotus italic" : "text-ink"}`}>
                    {w.romaji}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <span
            className={`font-sans gongyo-text leading-relaxed tracking-[0.01em] ${
              isPlaying
                ? "text-lotus italic"
                : "text-ink"
            }`}
          >
            {line.romaji}
          </span>
        )}
      </div>
    </div>
  );
}

const LineRow = memo(LineRowInner, (prev, next) => {
  return (
    prev.isSelected === next.isSelected &&
    prev.isPlaying === next.isPlaying &&
    prev.line.id === next.line.id &&
    prev.wordPosition?.wordIndex === next.wordPosition?.wordIndex &&
    prev.wordPosition?.lineId === next.wordPosition?.lineId
  );
});

LineRow.displayName = "LineRow";
export default LineRow;
