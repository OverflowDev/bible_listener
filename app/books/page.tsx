import Link from "next/link";
import { BOOKS } from "../data/books";

export default function BooksPage() {
  const oldTestament = BOOKS.filter((b) => b.testament === "Old");
  const newTestament = BOOKS.filter((b) => b.testament === "New");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-black tracking-tight text-black">
        Books of the Bible
      </h1>
      <p className="mt-2 text-sm text-zinc-800">
        Pick a book to jump into chapters. Old and New Testament are split for
        quick access.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border-[3px] border-black bg-[#fffdf4] p-4 shadow-[6px_6px_0_0_#111]">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-700">
            Old Testament
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {oldTestament.map((b) => (
              <Link
                key={b.slug}
                href={`/books/${b.slug}`}
                className="flex items-center justify-between rounded-xl border-[2px] border-black bg-white px-3 py-2 text-sm font-semibold text-black shadow-[3px_3px_0_0_#111] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#111]"
              >
                <span>{b.name}</span>
                <span className="text-[0.7rem] text-zinc-700">
                  {b.chapters} ch.
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border-[3px] border-black bg-[#f2f7ff] p-4 shadow-[6px_6px_0_0_#111]">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-700">
            New Testament
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {newTestament.map((b) => (
              <Link
                key={b.slug}
                href={`/books/${b.slug}`}
                className="flex items-center justify-between rounded-xl border-[2px] border-black bg-white px-3 py-2 text-sm font-semibold text-black shadow-[3px_3px_0_0_#111] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#111]"
              >
                <span>{b.name}</span>
                <span className="text-[0.7rem] text-zinc-700">
                  {b.chapters} ch.
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

