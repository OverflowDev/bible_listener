 "use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_PATH = "/books/genesis/1";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const last = window.localStorage.getItem("lastReadingPath");
    router.replace(last || DEFAULT_PATH);
  }, [router]);

  return null;
}
