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
    // Title lines: show kanji above romaji, centered
    const titleWords = wordTimestamps[line.id];
    return (
      <div className="py-1.5 px-5 text-center">
        {titleWords && (
          <div className="font-sans text-sm text-ink/60 tracking-[0.3em] mb-0.5">
            {titleWords.map((w) => w.kanji).join(" ")}
          </div>
        )}
        <span className="font-sans text-xl font-semibold text-ink tracking-wide">
          {line.romaji}
        </span>
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
          <div className="font-sans leading-relaxed tracking-[0.01em]">
            {/* Kanji row -- primary karaoke anchor */}
            <div className="gongyo-text flex flex-wrap gap-x-1">
              {lineWords.map((w, i) => {
                let cls: string;
                if (i === currentWordIdx) {
                  cls = "word-current";
                } else if (i < currentWordIdx) {
                  cls = w.multiSyllable ? "word-passed-multi" : "word-passed";
                } else {
                  cls = (w.multiSyllable && i === currentWordIdx + 1)
                    ? "word-upcoming-multi"
                    : "word-upcoming";
                }

                return (
                  <span key={i} className={`${cls} relative inline-block`}>
                    {i === currentWordIdx && (
                      <span className="karaoke-dot" />
                    )}
                    {w.kanji}
                  </span>
                );
              })}
            </div>
            {/* Romaji row -- follows kanji highlighting */}
            <div className="text-[13px] text-ink/50 mt-0.5 flex flex-wrap gap-x-1">
              {lineWords.map((w, i) => {
                let cls: string;
                if (i === currentWordIdx) {
                  cls = "text-ink/80 font-medium";
                } else if (i < currentWordIdx) {
                  cls = "text-ink/40";
                } else {
                  cls = "text-ink/30";
                }
                return (
                  <span key={i} className={cls}>
                    {w.romaji}
                  </span>
                );
              })}
            </div>
          </div>
        ) : lineWords ? (
          <div className="font-sans leading-relaxed tracking-[0.01em]">
            {/* Static kanji + romaji (not playing) */}
            <div className={`gongyo-text ${isPlaying ? "text-lotus italic" : "text-ink"}`}>
              {lineWords.map((w) => w.kanji).join(" ")}
            </div>
            <div className="text-[13px] text-ink/40 mt-0.5">
              {line.romaji}
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
