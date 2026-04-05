"use client";

import { gongyoData, getAllPracticeLineIds } from "@/data/gongyo";

interface TeleprompterProps {
  currentLineId: string | null;
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
  isVisible,
}: TeleprompterProps) {
  if (!isVisible || !currentLineId) return null;

  const allIds = getAllPracticeLineIds();
  const currentIndex = allIds.indexOf(currentLineId);
  if (currentIndex === -1) return null;

  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId =
    currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  return (
    <div className="bg-white border-b border-paper-deep px-5 py-3 flex-shrink-0 z-10">
      {/* Previous line */}
      <div className="font-serif text-[15px] text-ink opacity-40 leading-relaxed min-h-[20px]">
        {prevId ? lineTextById[prevId] : ""}
      </div>

      {/* Current line */}
      <div className="font-serif text-[22px] text-ink font-medium leading-relaxed my-1">
        {lineTextById[currentLineId]}
      </div>

      {/* Next line */}
      <div className="font-serif text-[15px] text-ink opacity-50 leading-relaxed min-h-[20px]">
        {nextId ? lineTextById[nextId] : ""}
      </div>
    </div>
  );
}
