import { getBookBySlug } from "../data/books";

const BASE_URL =
  process.env.NEXT_PUBLIC_BIBLE_TEXT_API_BASE || "https://bible-api.com";

export type BibleApiVerse = {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
};

export type BibleApiChapterResponse = {
  reference: string;
  verses: BibleApiVerse[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
};

export async function fetchChapterBySlug(bookSlug: string, chapter: number) {
  const book = getBookBySlug(bookSlug);
  if (!book) {
    throw new Error(`Unknown book slug: ${bookSlug}`);
  }

  const ref = encodeURIComponent(`${book.apiName} ${chapter}`);
  const url = `${BASE_URL}/${ref}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch chapter: ${res.status}`);
  }

  const data = (await res.json()) as BibleApiChapterResponse;
  return data;
}

