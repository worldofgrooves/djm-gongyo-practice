"use client";

import { useEffect, useRef, useCallback } from "react";
import { gongyoTimestamps, timestampById } from "@/data/timestamps";
import { getAllPracticeLineIds } from "@/data/gongyo";
import { wordTimestamps } from "@/data/word-timestamps";

export interface WordPosition {
  lineId: string;
  wordIndex: number;
}

interface AudioPlayerProps {
  selectedIds: Set<string>;
  isPlaying: boolean;
  loopActive: boolean;
  playbackSpeed: number;
  onPlayingLineChange: (lineId: string | null) => void;
  onWordPositionChange: (pos: WordPosition | null) => void;
  onPlaybackEnd: () => void;
  onAudioReady: (ready: boolean) => void;
  playTrigger: number;
}

export default function AudioPlayer({
  selectedIds,
  isPlaying,
  loopActive,
  playbackSpeed,
  onPlayingLineChange,
  onWordPositionChange,
  onPlaybackEnd,
  onAudioReady,
  playTrigger,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const syncRef = useRef<number | null>(null);
  const loopStartRef = useRef<number | null>(null);
  const loopEndRef = useRef<number | null>(null);
  const lastLineRef = useRef<string | null>(null);
  const lastWordIdxRef = useRef<number>(-1);
  const loopActiveRef = useRef(loopActive);
  const selectedIdsRef = useRef(selectedIds);

  useEffect(() => {
    loopActiveRef.current = loopActive;
  }, [loopActive]);

  useEffect(() => {
    selectedIdsRef.current = selectedIds;
  }, [selectedIds]);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio("/gongyo-solo.mp3");
    audio.preload = "auto";
    audioRef.current = audio;

    const handleCanPlay = () => onAudioReady(true);
    const handleError = () => onAudioReady(false);

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
      if (syncRef.current) cancelAnimationFrame(syncRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const getOrderedLines = useCallback(() => {
    const all = getAllPracticeLineIds();
    if (selectedIdsRef.current.size === 0) return all;
    return all.filter((id) => selectedIdsRef.current.has(id));
  }, []);

  const startSync = useCallback(() => {
    const tick = () => {
      const audio = audioRef.current;
      if (!audio || audio.paused) {
        syncRef.current = requestAnimationFrame(tick);
        return;
      }

      const currentTime = audio.currentTime;

      // Loop check
      if (loopEndRef.current && currentTime >= loopEndRef.current) {
        if (loopActiveRef.current && loopStartRef.current !== null) {
          audio.currentTime = loopStartRef.current;
          lastLineRef.current = null;
          lastWordIdxRef.current = -1;
          syncRef.current = requestAnimationFrame(tick);
          return;
        } else {
          onPlaybackEnd();
          return;
        }
      }

      // Find current line
      const activeTs = gongyoTimestamps.find(
        (t) => currentTime >= t.start && currentTime < t.end
      );

      if (activeTs) {
        const ordered = getOrderedLines();
        if (ordered.includes(activeTs.id)) {
          // Line changed?
          if (activeTs.id !== lastLineRef.current) {
            lastLineRef.current = activeTs.id;
            lastWordIdxRef.current = -1;
            onPlayingLineChange(activeTs.id);
          }

          // Word-level tracking -- direct Whisper timestamps, no offset needed
          const lineWords = wordTimestamps[activeTs.id];
          if (lineWords) {
            const wordTime = currentTime;
            let wordIdx = -1;
            for (let i = 0; i < lineWords.length; i++) {
              if (wordTime >= lineWords[i].start && wordTime < lineWords[i].end) {
                wordIdx = i;
                break;
              }
            }
            // If between words, check if we're past the last matched
            if (wordIdx === -1) {
              for (let i = lineWords.length - 1; i >= 0; i--) {
                if (wordTime >= lineWords[i].start) {
                  wordIdx = i;
                  break;
                }
              }
            }

            if (wordIdx !== lastWordIdxRef.current) {
              lastWordIdxRef.current = wordIdx;
              onWordPositionChange({
                lineId: activeTs.id,
                wordIndex: wordIdx,
              });
            }
          }
        }
      }

      syncRef.current = requestAnimationFrame(tick);
    };

    syncRef.current = requestAnimationFrame(tick);
  }, [onPlayingLineChange, onWordPositionChange, onPlaybackEnd, getOrderedLines]);

  // Handle play/stop trigger
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playTrigger > 0 && isPlaying) {
      const ordered = getOrderedLines();
      if (ordered.length === 0) return;

      const firstTs = timestampById[ordered[0]];
      const lastTs = timestampById[ordered[ordered.length - 1]];

      if (firstTs) {
        loopStartRef.current = firstTs.start;
        loopEndRef.current = lastTs ? lastTs.end : null;
        audio.currentTime = firstTs.start;
        audio.playbackRate = playbackSpeed;
        audio.play().catch(console.error);
        lastLineRef.current = null;
        lastWordIdxRef.current = -1;
        startSync();
      }
    } else if (!isPlaying) {
      audio.pause();
      if (syncRef.current) {
        cancelAnimationFrame(syncRef.current);
        syncRef.current = null;
      }
      loopStartRef.current = null;
      loopEndRef.current = null;
      lastLineRef.current = null;
      lastWordIdxRef.current = -1;
      onPlayingLineChange(null);
      onWordPositionChange(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playTrigger, isPlaying]);

  return null;
}
