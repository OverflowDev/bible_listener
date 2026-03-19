"use client";

import { create } from "zustand";

export type PlayScope = "chapter" | "verse";

export type QueueItem = {
  id: string;
  label: string;
  reference: string;
  scope: PlayScope;
  // One of these should be present:
  // - audioUrl: for real audio playback (e.g. api.bible chapter mp3)
  // - text: for speech-synthesis fallback (scripture read aloud)
  audioUrl?: string;
  text?: string;
};

type AudioState = {
  queue: QueueItem[];
  currentIndex: number;
  isPlaying: boolean;
  loop: boolean;
  lastError?: string;
};

type AudioActions = {
  setQueue: (items: QueueItem[], startIndex?: number) => void;
  play: () => void;
  pause: () => void;
  toggleLoop: () => void;
  next: () => void;
  previous: () => void;
  setError: (msg?: string) => void;
};

export const useAudioStore = create<AudioState & AudioActions>((set, get) => ({
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  loop: false,
  lastError: undefined,

  setQueue: (items, startIndex = 0) =>
    set({
      queue: items,
      currentIndex: startIndex,
      isPlaying: items.length > 0,
      lastError: undefined,
    }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  toggleLoop: () => set((s) => ({ loop: !s.loop })),
  setError: (msg) => set({ lastError: msg }),

  next: () => {
    const { queue, currentIndex, loop } = get();
    if (!queue.length) return;
    if (currentIndex + 1 < queue.length) {
      set({ currentIndex: currentIndex + 1, isPlaying: true, lastError: undefined });
    } else if (loop) {
      set({ currentIndex: 0, isPlaying: true, lastError: undefined });
    } else {
      set({ isPlaying: false });
    }
  },

  previous: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1, isPlaying: true, lastError: undefined });
    }
  },
}));

