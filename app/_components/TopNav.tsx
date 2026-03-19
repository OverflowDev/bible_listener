import Link from "next/link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b-[3px] border-black bg-[#fffbeb]">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg font-black tracking-tight text-black"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border-[2px] border-black bg-[#ffd447] text-xs shadow-[3px_3px_0_0_#111]">
            BL
          </span>
          <span className="uppercase tracking-[0.2em] text-xs text-black/70">
            Bible Listener
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-xs font-semibold">
          <Link
            href="/books"
            className="rounded-full border-[2px] border-black bg-white px-4 py-1.5 text-black shadow-[3px_3px_0_0_#111] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#111]"
          >
            Books
          </Link>
        </nav>
      </div>
    </header>
  );
}

