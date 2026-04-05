"use client";

import { GongyoLine } from "@/data/gongyo";

interface LineRowProps {
  line: GongyoLine;
  isSelected: boolean;
  isPlaying: boolean;
  onToggle: (id: string) => void;
}

export default function LineRow({
  line,
  isSelected,
  isPlaying,
  onToggle,
}: LineRowProps) {
  if (line.type === "title") {
    return (
      <div className="py-1.5 px-5 text-center">
        <span className="font-serif text-xl font-semibold text-ink tracking-wide">
          {line.romaji}
        </span>
      </div>
    );
  }

  const baseClasses = "flex items-center py-0.5 cursor-pointer transition-colors relative active:bg-paper-warm";
  const indentClass = line.indent ? "indent" : "";

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
        <span
          className={`font-serif text-[19px] leading-relaxed tracking-[0.01em] ${
            isPlaying
              ? "text-lotus italic"
              : "text-ink"
          }`}
        >
          {line.romaji}
        </span>
      </div>
    </div>
  );
}
