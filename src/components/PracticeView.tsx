"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { gongyoData, getAllPracticeLineIds } from "@/data/gongyo";
import LineRow from "./LineRow";
import AudioPlayer from "./AudioPlayer";
import type { WordPosition } from "./AudioPlayer";
import Teleprompter from "./Teleprompter";
import SpeedMenu, { getSpeedLabel } from "./SpeedMenu";
import InspirationView from "./InspirationView";

type Tab = "practice" | "inspiration";

export default function PracticeView() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentTab, setCurrentTab] = useState<Tab>("practice");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playTrigger, setPlayTrigger] = useState(0);
  const [loopActive, setLoopActive] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [playingLineId, setPlayingLineId] = useState<string | null>(null);
  const [wordPosition, setWordPosition] = useState<WordPosition | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore saved speed from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("gongyoSpeed");
    if (saved) {
      setPlaybackSpeed(parseFloat(saved));
    }
  }, []);

  // Auto-scroll to playing line
  useEffect(() => {
    if (playingLineId) {
      const el = document.getElementById(`row-${playingLineId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [playingLineId]);

  const toggleLine = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
    if (isPlaying) {
      setIsPlaying(false);
      setPlayTrigger(0);
    }
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      setPlayTrigger(0);
    } else {
      // Need at least audio ready or we do text-only
      const ordered =
        selectedIds.size > 0
          ? getAllPracticeLineIds().filter((id) => selectedIds.has(id))
          : getAllPracticeLineIds();
      if (ordered.length === 0) return;
      setIsPlaying(true);
      setPlayTrigger((prev) => prev + 1);
    }
  }, [isPlaying, selectedIds]);

  const handlePlaybackEnd = useCallback(() => {
    setIsPlaying(false);
    setPlayTrigger(0);
    setPlayingLineId(null);
    setWordPosition(null);
  }, []);

  const handleWordPositionChange = useCallback((pos: WordPosition | null) => {
    setWordPosition(pos);
  }, []);

  const handleSpeedSelect = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
    localStorage.setItem("gongyoSpeed", String(speed));
    setSpeedMenuOpen(false);
  }, []);

  const selCount = selectedIds.size;
  const instructionText =
    selCount === 0
      ? "Tap lines to select them for looped practice"
      : selCount === 1
      ? "1 line selected -- will loop on repeat"
      : `${selCount} lines selected -- will loop in sequence`;

  return (
    <div className="flex flex-col h-[100dvh] max-w-[500px] mx-auto bg-paper relative">
      {/* HEADER */}
      <div className="px-5 pt-[calc(env(safe-area-inset-top,0px)+16px)] bg-paper z-10 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-serif text-[22px] font-light text-ink tracking-wide">
            Nam Myoho <span className="text-gold italic">Gongyo</span>
          </h1>
          <button className="bg-transparent border-none cursor-pointer p-1.5 text-ink-muted text-xl rounded-lg active:bg-paper-deep transition-colors">
            &#9784;
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-paper-deep -mx-5 px-5">
          <button
            className={`flex-1 bg-transparent border-none py-3 px-2 font-sans text-[13px] font-medium tracking-[0.06em] uppercase cursor-pointer border-b-2 -mb-px transition-all ${
              currentTab === "practice"
                ? "text-gold border-b-gold"
                : "text-ink-muted border-b-transparent"
            }`}
            onClick={() => setCurrentTab("practice")}
          >
            Practice
          </button>
          <button
            className={`flex-1 bg-transparent border-none py-3 px-2 font-sans text-[13px] font-medium tracking-[0.06em] uppercase cursor-pointer border-b-2 -mb-px transition-all ${
              currentTab === "inspiration"
                ? "text-gold border-b-gold"
                : "text-ink-muted border-b-transparent"
            }`}
            onClick={() => setCurrentTab("inspiration")}
          >
            Daily Inspiration
          </button>
        </div>
      </div>

      {/* PRACTICE TAB */}
      {currentTab === "practice" && (
        <>
          {/* Audio notice */}
          {!audioReady && (
            <div className="bg-gold-pale border border-gold-light rounded-xl px-4 py-3 mx-5 mt-3 text-[13px] text-gold font-medium text-center leading-relaxed">
              Loading audio... Tap lines to select them for practice.
            </div>
          )}

          {/* Controls */}
          <div className="px-5 py-3 bg-paper border-b border-paper-deep flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <button
                onClick={togglePlay}
                className={`flex items-center justify-center border-none rounded-lg cursor-pointer font-sans font-medium transition-all active:scale-[0.96] px-[18px] h-10 text-[13px] gap-1.5 flex-1 text-white ${
                  isPlaying ? "bg-lotus" : "bg-gold hover:bg-gold-light"
                }`}
              >
                <span>{isPlaying ? "\u23F9" : "\u25B6"}</span>
                <span>
                  {isPlaying
                    ? "Stop"
                    : selCount > 0
                    ? "Play Selected"
                    : "Play All"}
                </span>
              </button>

              <button
                onClick={clearSelection}
                className="flex items-center justify-center border-none rounded-lg cursor-pointer transition-all active:scale-[0.96] w-10 h-10 text-base flex-shrink-0 bg-paper-warm text-ink-soft hover:bg-paper-deep"
                title="Clear selection"
              >
                &#10005;
              </button>

              <button
                onClick={() => setSpeedMenuOpen(true)}
                className="flex items-center justify-center border-none rounded-lg cursor-pointer transition-all active:scale-[0.96] px-3 h-10 text-xs font-semibold tracking-[0.02em] flex-shrink-0 bg-paper-warm text-ink-soft hover:bg-paper-deep"
              >
                {getSpeedLabel(playbackSpeed)}
              </button>

              <button
                onClick={() => setLoopActive(!loopActive)}
                className={`flex items-center justify-center border-none rounded-lg cursor-pointer transition-all active:scale-[0.96] w-10 h-10 text-base flex-shrink-0 ${
                  loopActive
                    ? "bg-gold-pale text-gold"
                    : "bg-paper-warm text-ink-soft hover:bg-paper-deep"
                }`}
                title="Loop all selected"
              >
                &#10227;
              </button>
            </div>

            <div className="mt-2 text-[11px] text-ink-muted tracking-[0.02em] min-h-[16px]">
              {instructionText}
            </div>
          </div>

          {/* Teleprompter */}
          <Teleprompter
            currentLineId={playingLineId}
            wordPosition={wordPosition}
            isVisible={isPlaying}
          />

          {/* Scroll area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overscroll-contain py-2 pb-5 scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {gongyoData.sections.map((section) => (
              <div key={section.id}>
                {/* Chapter header */}
                <div className="px-5 pt-5 pb-2 flex items-center gap-3">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-paper-deep" />
                  <span className="font-sans text-[10px] font-medium tracking-[0.12em] uppercase text-gold whitespace-nowrap">
                    {section.label}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-paper-deep" />
                </div>

                {/* Lines */}
                {section.lines.map((line) => (
                  <LineRow
                    key={line.id}
                    line={line}
                    isSelected={selectedIds.has(line.id)}
                    isPlaying={playingLineId === line.id}
                    wordPosition={
                      playingLineId === line.id ? wordPosition : null
                    }
                    onToggle={toggleLine}
                  />
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* INSPIRATION TAB */}
      {currentTab === "inspiration" && <InspirationView />}

      {/* AUDIO ENGINE (invisible) */}
      <AudioPlayer
        selectedIds={selectedIds}
        isPlaying={isPlaying}
        loopActive={loopActive}
        playbackSpeed={playbackSpeed}
        onPlayingLineChange={setPlayingLineId}
        onWordPositionChange={handleWordPositionChange}
        onPlaybackEnd={handlePlaybackEnd}
        onAudioReady={setAudioReady}
        playTrigger={playTrigger}
      />

      {/* SPEED MENU */}
      <SpeedMenu
        isOpen={speedMenuOpen}
        currentSpeed={playbackSpeed}
        onSelect={handleSpeedSelect}
        onClose={() => setSpeedMenuOpen(false)}
      />
    </div>
  );
}
