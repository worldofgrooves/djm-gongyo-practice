"use client";

import { useEffect, useRef, useCallback } from "react";
import { gongyoTimestamps, timestampById } from "@/data/timestamps";
import { getAllPracticeLineIds } from "@/data/gongyo";

interface AudioPlayerProps {
  selectedIds: Set<string>;
  isPlaying: boolean;
  loopActive: boolean;
  playbackSpeed: number;
  onPlayingLineChange: (lineId: string | null) => void;
  onPlaybackEnd: () => void;
  onAudioReady: (ready: boolean) => void;
  playTrigger: number; // increment to start, set to 0 to stop
}

export default function AudioPlayer({
  selectedIds,
  isPlaying,
  loopActive,
  playbackSpeed,
  onPlayingLineChange,
  onPlaybackEnd,
  onAudioReady,
  playTrigger,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const syncRef = useRef<number | null>(null);
  const loopStartRef = useRef<number | null>(null);
  const loopEndRef = useRef<number | null>(null);
  const lastLineRef = useRef<string | null>(null);
  const loopActiveRef = useRef(loopActive);
  const selectedIdsRef = useRef(selectedIds);

  // Keep refs in sync
  useEffect(() => {
    loopActiveRef.current = loopActive;
  }, [loopActive]);

  useEffect(() => {
    selectedIdsRef.current = selectedIds;
  }, [selectedIds]);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio("/gongyo.mp3");
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

  // Update playback speed
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

      if (activeTs && activeTs.id !== lastLineRef.current) {
        const ordered = getOrderedLines();
        if (ordered.includes(activeTs.id)) {
          lastLineRef.current = activeTs.id;
          onPlayingLineChange(activeTs.id);
        }
      }

      syncRef.current = requestAnimationFrame(tick);
    };

    syncRef.current = requestAnimationFrame(tick);
  }, [onPlayingLineChange, onPlaybackEnd, getOrderedLines]);

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
      onPlayingLineChange(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playTrigger, isPlaying]);

  return null; // Audio is imperatively managed, no visual output
}
