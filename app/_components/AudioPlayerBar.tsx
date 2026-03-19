"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useAudioStore } from "../state/audioStore";
import { Howl } from "howler";

export function AudioPlayerBar() {
  const {
    queue,
    currentIndex,
    isPlaying,
    loop,
    lastError,
    play,
    pause,
    next,
    previous,
    toggleLoop,
    setError,
  } = useAudioStore();

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const howlRef = useRef<Howl | null>(null);
  const [progress, setProgress] = useState<{ pos: number; dur: number }>({
    pos: 0,
    dur: 0,
  });

  const currentItem = queue[currentIndex];

  const stopAll = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    howlRef.current?.stop();
    howlRef.current?.unload();
    howlRef.current = null;
    setProgress({ pos: 0, dur: 0 });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    stopAll();
    setError(undefined);

    if (!currentItem || !isPlaying) return;

    // Prefer real audio URLs when available (best-quality, share/download-ready).
    if (currentItem.audioUrl) {
      const h = new Howl({
        src: [currentItem.audioUrl],
        html5: true,
        preload: true,
        onend: () => next(),
        onloaderror: (_, err) => {
          setError(`Audio failed to load (${err}). Falling back to read-aloud.`);
          // fallback to speech if we have text
          if (currentItem.text) {
            const u = new SpeechSynthesisUtterance(currentItem.text);
            utteranceRef.current = u;
            u.onend = () => next();
            window.speechSynthesis.speak(u);
          } else {
            next();
          }
        },
        onplayerror: () => {
          setError("Audio failed to play. Try again.");
        },
      });
      howlRef.current = h;
      h.play();
      const tick = window.setInterval(() => {
        const dur = h.duration() || 0;
        const pos = (h.seek() as number) || 0;
        setProgress({ pos, dur });
      }, 400);
      return () => {
        window.clearInterval(tick);
        stopAll();
      };
    }

    if (currentItem.text) {
      const playSpeech = () => {
        const u = new SpeechSynthesisUtterance(currentItem.text as string);
        utteranceRef.current = u;
        u.onend = () => {
          // For TTS, Loop = repeat this verse/chapter; otherwise move in queue
          if (loop) {
            stopAll();
            playSpeech();
          } else {
            next();
          }
        };
        window.speechSynthesis.speak(u);
      };

      playSpeech();
      return () => stopAll();
    }

    setError("Nothing to play for this item.");
    next();
    return () => stopAll();
  }, [currentItem, isPlaying, next, setError]);

  const handlePlayPause = () => {
    if (!currentItem) return;
    if (isPlaying) {
      pause();
      stopAll();
    } else {
      play();
    }
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-40">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-2xl border-[3px] border-black bg-white px-4 py-3 shadow-[8px_8px_0_0_#111]">
        <div className="min-w-0">
          <div className="truncate text-sm font-black text-black">
            {currentItem ? currentItem.label : "Player ready"}
          </div>
          <div className="truncate text-xs text-zinc-700">
            {currentItem
              ? currentItem.reference
              : "Pick a book/chapter to start listening."}
          </div>
          {currentItem && progress.dur > 0 && (
            <div className="mt-1 text-[0.65rem] text-zinc-600">
              {Math.floor(progress.pos)}/{Math.floor(progress.dur)}s
            </div>
          )}
          {lastError && (
            <div className="mt-1 inline-flex rounded-md border-[2px] border-black bg-[#fffbeb] px-2 py-0.5 text-[0.7rem] font-semibold text-amber-800">
              {lastError}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previous}
            disabled={!currentItem}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-[2px] border-black bg-white text-xs font-black shadow-[3px_3px_0_0_#111] transition-all disabled:opacity-40 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#111]"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={handlePlayPause}
            disabled={!currentItem}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-[2px] border-black bg-[#5b3cff] text-sm font-black text-white shadow-[4px_4px_0_0_#111] transition-all disabled:opacity-40 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#111]"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!currentItem}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-[2px] border-black bg-white text-xs font-black shadow-[3px_3px_0_0_#111] transition-all disabled:opacity-40 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#111]"
          >
            ▶
          </button>
          <button
            type="button"
            onClick={toggleLoop}
            className={`h-9 px-4 text-xs font-semibold rounded-xl border-[2px] ${
              loop
                ? "border-black bg-[#ffd447] text-black shadow-[3px_3px_0_0_#111]"
                : "border-black bg-white text-black shadow-[3px_3px_0_0_#111]"
            }`}
          >
            Loop
          </button>
          <Link
            href="/books"
            className="shrink-0 rounded-xl border-[2px] border-black bg-white px-4 py-2 text-xs font-semibold text-black shadow-[3px_3px_0_0_#111] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#111]"
          >
            Books
          </Link>
        </div>
      </div>
    </div>
  );
}

