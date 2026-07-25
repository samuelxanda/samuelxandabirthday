export const SITE = {
  name: "Samuel",
  /** Speaks to the visitor first */
  headline: "It's Samuel's birthday",
  subhead:
    "Leave him a private note — a birthday wish, honest advice, something he could change, or a truth you wish he knew. Only he will read it.",
  thankYouTitle: "Note received",
  thankYou:
    "Thank you — that means more than you know. Your note is private; only Samuel can read it. Come back to leave another, or share this page with someone who knows him.",
  year: new Date().getFullYear(),
  shareText:
    "I just left Samuel a private birthday note — come say something too:",
} as const;

/** Design tokens — warm, confident, celebratory */
export const PALETTE = {
  ink: "#211824",
  ivory: "#FFF8EE",
  coral: "#FF5D7D",
  marigold: "#FFC857",
  sky: "#62B6FF",
  mint: "#55D6A5",
  lilac: "#B8A1FF",
  muted: "#7A5A84",
} as const;

export type BirthdayNote = {
  id: string;
  authorName: string | null;
  /** Kept for older notes; new notes always store "note". */
  category: string;
  /** Kept for older notes; new notes always store null. */
  knowMe: string | null;
  message: string;
  createdAt: string;
};

/**
 * Scroll chapter — not an About page.
 * `kind` shows as a small label above each line. Edit freely.
 */
export const STORY_BEATS = [
  {
    id: "human",
    kind: "How I build",
    text: "Builds things that feel human, not just functional.",
  },
  {
    id: "clarity",
    kind: "How I build",
    text: "Obsessed with clarity — if it's confusing, it's not done.",
  },
  {
    id: "faith-plans",
    kind: "What I hold onto",
    text: "\u201cCommit to the Lord whatever you do, and he will establish your plans.\u201d — Proverbs 16:3",
  },
  {
    id: "faith-strength",
    kind: "What I hold onto",
    text: "\u201cI can do all things through Christ who strengthens me.\u201d — Philippians 4:13",
  },
  {
    id: "faith-morning",
    kind: "What I hold onto",
    text: "Mercies are new every morning — so is every version of me.",
  },
  {
    id: "real-slow",
    kind: "Real life",
    text: "Progress is quieter than people think. Most days it just looks like showing up.",
  },
  {
    id: "real-people",
    kind: "Real life",
    text: "The people who check in on you matter more than the milestones you post.",
  },
  {
    id: "real-hard",
    kind: "Real life",
    text: "Hard seasons taught me more than easy wins ever did — I just didn't enjoy the lesson.",
  },
  {
    id: "growth-1percent",
    kind: "Getting better",
    text: "One percent better beats one day perfect. Small reps, stacked stubbornly.",
  },
  {
    id: "growth-discipline",
    kind: "Getting better",
    text: "Discipline is choosing future-me over present-me, again and again.",
  },
  {
    id: "growth-compare",
    kind: "Getting better",
    text: "Quietly competitive with yesterday's version of himself — nobody else.",
  },
] as const;
