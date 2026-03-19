import Link from "next/link";
import { getBookBySlug } from "../../data/books";
import { notFound } from "next/navigation";

export default function BookPage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  // Next 16 app router params are async in some templates
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  return (
    <BookPageInner params={params} />
  );
}

async function BookPageInner({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const { book } = await params;
  const b = getBookBySlug(book);
  if (!b) notFound();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-black">
            {b.name}
          </h1>
          <p className="mt-1 text-sm text-zinc-800">
            {b.testament} Testament • {b.chapters} chapters
          </p>
        </div>

        <Link
          href={`/books/${b.slug}/1`}
          className="rounded-xl border-[2px] border-black bg-[#5b3cff] px-5 py-2.5 text-sm font-black text-white shadow-[4px_4px_0_0_#111] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#111]"
        >
          Start at chapter 1
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {Array.from({ length: b.chapters }, (_, idx) => idx + 1).map((n) => (
          <Link
            key={n}
            href={`/books/${b.slug}/${n}`}
            className="flex items-center justify-center rounded-xl border-[2px] border-black bg-white py-2 text-sm font-semibold text-black shadow-[3px_3px_0_0_#111] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#111]"
          >
            {n}
          </Link>
        ))}
      </div>
    </div>
  );
}

