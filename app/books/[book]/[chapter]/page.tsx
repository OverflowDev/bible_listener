import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookBySlug } from "../../../data/books";
import { fetchChapterBySlug } from "../../../lib/bibleApi";
import { ChapterClient } from "./ChapterClient";

type Params = Promise<{
  book: string;
  chapter: string;
}>;

export default async function ChapterPage({ params }: { params: Params }) {
  const { book: bookSlug, chapter } = await params;
  const book = getBookBySlug(bookSlug);
  const chapterNumber = Number(chapter);

  if (
    !book ||
    !Number.isInteger(chapterNumber) ||
    chapterNumber < 1 ||
    chapterNumber > book.chapters
  ) {
    notFound();
  }

  const chapterData = await fetchChapterBySlug(book.slug, chapterNumber);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {book.testament} Testament
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
            {book.name} {chapterNumber}
          </h1>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
            {chapterData.translation_name} • {chapterData.reference}
          </p>
        </div>

        <Link
          href={`/books/${book.slug}`}
          className="rounded-full border border-black/10 px-4 py-2 text-xs font-medium text-black hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
        >
          All chapters
        </Link>
      </div>

      <ChapterClient
        bookName={book.name}
        bookSlug={book.slug}
        chapterNumber={chapterNumber}
        verses={chapterData.verses}
        translationName={chapterData.translation_name}
        chapterAudioUrl={null}
      />
    </div>
  );
}

