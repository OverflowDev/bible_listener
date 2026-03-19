export type Testament = "Old" | "New";

export type Book = {
  slug: string;
  name: string;
  apiName: string;
  testament: Testament;
  chapters: number;
};

// Minimal dataset for navigation (audio/text APIs can map to these slugs later).
export const BOOKS: Book[] = [
  { slug: "genesis", name: "Genesis", apiName: "Genesis", testament: "Old", chapters: 50 },
  { slug: "exodus", name: "Exodus", apiName: "Exodus", testament: "Old", chapters: 40 },
  { slug: "leviticus", name: "Leviticus", apiName: "Leviticus", testament: "Old", chapters: 27 },
  { slug: "numbers", name: "Numbers", apiName: "Numbers", testament: "Old", chapters: 36 },
  { slug: "deuteronomy", name: "Deuteronomy", apiName: "Deuteronomy", testament: "Old", chapters: 34 },
  { slug: "joshua", name: "Joshua", apiName: "Joshua", testament: "Old", chapters: 24 },
  { slug: "judges", name: "Judges", apiName: "Judges", testament: "Old", chapters: 21 },
  { slug: "ruth", name: "Ruth", apiName: "Ruth", testament: "Old", chapters: 4 },
  { slug: "1-samuel", name: "1 Samuel", apiName: "1 Samuel", testament: "Old", chapters: 31 },
  { slug: "2-samuel", name: "2 Samuel", apiName: "2 Samuel", testament: "Old", chapters: 24 },
  { slug: "1-kings", name: "1 Kings", apiName: "1 Kings", testament: "Old", chapters: 22 },
  { slug: "2-kings", name: "2 Kings", apiName: "2 Kings", testament: "Old", chapters: 25 },
  { slug: "1-chronicles", name: "1 Chronicles", apiName: "1 Chronicles", testament: "Old", chapters: 29 },
  { slug: "2-chronicles", name: "2 Chronicles", apiName: "2 Chronicles", testament: "Old", chapters: 36 },
  { slug: "ezra", name: "Ezra", apiName: "Ezra", testament: "Old", chapters: 10 },
  { slug: "nehemiah", name: "Nehemiah", apiName: "Nehemiah", testament: "Old", chapters: 13 },
  { slug: "esther", name: "Esther", apiName: "Esther", testament: "Old", chapters: 10 },
  { slug: "job", name: "Job", apiName: "Job", testament: "Old", chapters: 42 },
  { slug: "psalms", name: "Psalms", apiName: "Psalms", testament: "Old", chapters: 150 },
  { slug: "proverbs", name: "Proverbs", apiName: "Proverbs", testament: "Old", chapters: 31 },
  { slug: "ecclesiastes", name: "Ecclesiastes", apiName: "Ecclesiastes", testament: "Old", chapters: 12 },
  { slug: "song-of-solomon", name: "Song of Solomon", apiName: "Song of Solomon", testament: "Old", chapters: 8 },
  { slug: "isaiah", name: "Isaiah", apiName: "Isaiah", testament: "Old", chapters: 66 },
  { slug: "jeremiah", name: "Jeremiah", apiName: "Jeremiah", testament: "Old", chapters: 52 },
  { slug: "lamentations", name: "Lamentations", apiName: "Lamentations", testament: "Old", chapters: 5 },
  { slug: "ezekiel", name: "Ezekiel", apiName: "Ezekiel", testament: "Old", chapters: 48 },
  { slug: "daniel", name: "Daniel", apiName: "Daniel", testament: "Old", chapters: 12 },
  { slug: "hosea", name: "Hosea", apiName: "Hosea", testament: "Old", chapters: 14 },
  { slug: "joel", name: "Joel", apiName: "Joel", testament: "Old", chapters: 3 },
  { slug: "amos", name: "Amos", apiName: "Amos", testament: "Old", chapters: 9 },
  { slug: "obadiah", name: "Obadiah", apiName: "Obadiah", testament: "Old", chapters: 1 },
  { slug: "jonah", name: "Jonah", apiName: "Jonah", testament: "Old", chapters: 4 },
  { slug: "micah", name: "Micah", apiName: "Micah", testament: "Old", chapters: 7 },
  { slug: "nahum", name: "Nahum", apiName: "Nahum", testament: "Old", chapters: 3 },
  { slug: "habakkuk", name: "Habakkuk", apiName: "Habakkuk", testament: "Old", chapters: 3 },
  { slug: "zephaniah", name: "Zephaniah", apiName: "Zephaniah", testament: "Old", chapters: 3 },
  { slug: "haggai", name: "Haggai", apiName: "Haggai", testament: "Old", chapters: 2 },
  { slug: "zechariah", name: "Zechariah", apiName: "Zechariah", testament: "Old", chapters: 14 },
  { slug: "malachi", name: "Malachi", apiName: "Malachi", testament: "Old", chapters: 4 },

  { slug: "matthew", name: "Matthew", apiName: "Matthew", testament: "New", chapters: 28 },
  { slug: "mark", name: "Mark", apiName: "Mark", testament: "New", chapters: 16 },
  { slug: "luke", name: "Luke", apiName: "Luke", testament: "New", chapters: 24 },
  { slug: "john", name: "John", apiName: "John", testament: "New", chapters: 21 },
  { slug: "acts", name: "Acts", apiName: "Acts", testament: "New", chapters: 28 },
  { slug: "romans", name: "Romans", apiName: "Romans", testament: "New", chapters: 16 },
  { slug: "1-corinthians", name: "1 Corinthians", apiName: "1 Corinthians", testament: "New", chapters: 16 },
  { slug: "2-corinthians", name: "2 Corinthians", apiName: "2 Corinthians", testament: "New", chapters: 13 },
  { slug: "galatians", name: "Galatians", apiName: "Galatians", testament: "New", chapters: 6 },
  { slug: "ephesians", name: "Ephesians", apiName: "Ephesians", testament: "New", chapters: 6 },
  { slug: "philippians", name: "Philippians", apiName: "Philippians", testament: "New", chapters: 4 },
  { slug: "colossians", name: "Colossians", apiName: "Colossians", testament: "New", chapters: 4 },
  { slug: "1-thessalonians", name: "1 Thessalonians", apiName: "1 Thessalonians", testament: "New", chapters: 5 },
  { slug: "2-thessalonians", name: "2 Thessalonians", apiName: "2 Thessalonians", testament: "New", chapters: 3 },
  { slug: "1-timothy", name: "1 Timothy", apiName: "1 Timothy", testament: "New", chapters: 6 },
  { slug: "2-timothy", name: "2 Timothy", apiName: "2 Timothy", testament: "New", chapters: 4 },
  { slug: "titus", name: "Titus", apiName: "Titus", testament: "New", chapters: 3 },
  { slug: "philemon", name: "Philemon", apiName: "Philemon", testament: "New", chapters: 1 },
  { slug: "hebrews", name: "Hebrews", apiName: "Hebrews", testament: "New", chapters: 13 },
  { slug: "james", name: "James", apiName: "James", testament: "New", chapters: 5 },
  { slug: "1-peter", name: "1 Peter", apiName: "1 Peter", testament: "New", chapters: 5 },
  { slug: "2-peter", name: "2 Peter", apiName: "2 Peter", testament: "New", chapters: 3 },
  { slug: "1-john", name: "1 John", apiName: "1 John", testament: "New", chapters: 5 },
  { slug: "2-john", name: "2 John", apiName: "2 John", testament: "New", chapters: 1 },
  { slug: "3-john", name: "3 John", apiName: "3 John", testament: "New", chapters: 1 },
  { slug: "jude", name: "Jude", apiName: "Jude", testament: "New", chapters: 1 },
  { slug: "revelation", name: "Revelation", apiName: "Revelation", testament: "New", chapters: 22 },
];

export function getBookBySlug(slug: string) {
  return BOOKS.find((b) => b.slug === slug);
}

