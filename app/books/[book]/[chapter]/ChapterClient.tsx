"use client";

import { useEffect, useMemo } from "react";
import type { BibleApiVerse } from "../../../lib/bibleApi";
import { useAudioStore } from "../../../state/audioStore";

type Props = {
  bookName: string;
  bookSlug: string;
  chapterNumber: number;
  verses: BibleApiVerse[];
  translationName: string;
  chapterAudioUrl?: string | null;
};

export function ChapterClient({
  bookName,
  bookSlug,
  chapterNumber,
  verses,
  translationName,
  chapterAudioUrl,
}: Props) {
  const { setQueue, setError } = useAudioStore();

  const chapterText = useMemo(
    () => verses.map((v) => `${v.verse}. ${v.text.trim()}`).join(" "),
    [verses],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = `/books/${bookSlug}/${chapterNumber}`;
    window.localStorage.setItem("lastReadingPath", path);
  }, [bookSlug, chapterNumber]);

  const playChapter = () => {
    if (chapterAudioUrl) {
      setQueue([
        {
          id: `${bookSlug}-${chapterNumber}-chapter-audio`,
          label: `${bookName} ${chapterNumber}`,
          reference: `${bookName} ${chapterNumber} • ${translationName}`,
          scope: "chapter",
          audioUrl: chapterAudioUrl,
          text: chapterText, // fallback
        },
      ]);
      return;
    }
    setQueue([
      {
        id: `${bookSlug}-${chapterNumber}-chapter-tts`,
        label: `${bookName} ${chapterNumber}`,
        reference: `${bookName} ${chapterNumber} • ${translationName}`,
        scope: "chapter",
        text: chapterText,
      },
    ]);
  };

  const playVerse = (verseNumber: number) => {
    const v = verses.find((x) => x.verse === verseNumber);
    if (!v) return;
    setQueue([
      {
        id: `${bookSlug}-${chapterNumber}-${verseNumber}`,
        label: `${bookName} ${chapterNumber}:${verseNumber}`,
        reference: `${bookName} ${chapterNumber}:${verseNumber} • ${translationName}`,
        scope: "verse",
        text: v.text.trim(),
      },
    ]);
  };

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={playChapter}
          className="rounded-xl border-[2px] border-black bg-[#5b3cff] px-4 py-2 text-xs font-black text-white shadow-[4px_4px_0_0_#111] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#111]"
        >
          Play chapter
        </button>
      </div>

      <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-700">
        Tap a verse button to listen
      </p>

      <div className="mt-3 space-y-2 rounded-2xl border-[3px] border-black bg-[#fffdf4] p-5 text-sm leading-7 text-zinc-900 shadow-[6px_6px_0_0_#111]">
        {verses.map((v) => (
          <div
            key={v.verse}
            className="group flex items-start gap-3 rounded-xl border-[2px] border-black bg-white px-3 py-2 shadow-[3px_3px_0_0_#111] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#111]"
          >
            <button
              type="button"
              onClick={() => playVerse(v.verse)}
              className="mt-1 flex h-8 w-10 shrink-0 items-center justify-center gap-1 rounded-lg border-[2px] border-black bg-[#ffd447] text-[0.65rem] font-black text-black shadow-[2px_2px_0_0_#111] transition-all group-hover:translate-y-0.5 group-hover:shadow-none"
              aria-label={`Play verse ${v.verse}`}
            >
              <span className="text-[0.6rem]">▶</span>
              <span>{v.verse}</span>
            </button>
            <div className="flex-1">
              <p className="text-sm leading-7">{v.text.trim()}</p>
              {v.verse === 1 && (
                <span className="mt-1 block text-[0.65rem] text-zinc-600">
                  Hint: tap the yellow button to hear this verse.
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

