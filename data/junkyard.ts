/** Generated thumbnails, so the junkyard needs no screenshots. */
export const junkArt = {
  stripes: "repeating-linear-gradient(90deg,#3a2a1a 0 18px,#ffcc33 18px 20px),#3a2a1a",
  dots: "radial-gradient(circle at 30% 40%,#009ddd 0 18%,transparent 19%),radial-gradient(circle at 70% 65%,#e14d2a 0 12%,transparent 13%),#1a1f2e",
  checks: "linear-gradient(135deg,#232329 25%,#2f2f38 25% 50%,#232329 50% 75%,#2f2f38 75%) 0 0/28px 28px",
  cone: "conic-gradient(from 30deg,#14532d,#22c55e,#14532d)",
  rings: "repeating-radial-gradient(circle at 50% 120%,#1c1c22 0 10px,#2a2a33 10px 12px)",
  cross:
    "linear-gradient(#232329 0 0) 50% 50%/60% 2px no-repeat,linear-gradient(#232329 0 0) 50% 50%/2px 60% no-repeat,#16161a",
  waves: "repeating-linear-gradient(45deg,#1e1b4b 0 12px,#312e81 12px 24px)",
  grid: "linear-gradient(#e14d2a33 1px,transparent 1px) 0 0/20px 20px,linear-gradient(90deg,#e14d2a33 1px,transparent 1px) 0 0/20px 20px,#1c1c22",
} as const;

export type JunkItem = {
  code: string;
  tag: string;
  title: string;
  note: string;
  art: keyof typeof junkArt;
  href?: string;
  /** Not filled in yet: shown dimmed. */
  placeholder?: boolean;
};

const repo = (folder: string) => `https://github.com/Dot010/Junkyard/tree/main/${folder}`;


export const junkItems: JunkItem[] = [
  { code: "JY-01", tag: "sketch", title: "Birthday Timer", note: "Counted down to one day, hit zero, and has been resting ever since.", art: "stripes", href: "https://dot010-birthday-timer.vercel.app" },
  { code: "JY-02", tag: "dead demo", title: "Apex Sports", note: "Still takes orders. Nobody's shipping them.", art: "dots", href: "https://apex-sports-seven.vercel.app/" },
  { code: "JY-03", tag: "study", title: "To-do List", note: "The first app everyone builds. Mine never got its last task checked off.", art: "checks", href: repo("to-do-list") },
  { code: "JY-04", tag: "study", title: "Landing Page", note: "A GIF background, a lo-fi soundtrack and zero components. Pure vibes.", art: "cone", href: "https://dot010-landing-page.vercel.app/" },
  { code: "JY-05", tag: "study", title: "Vue Calculator", note: "Added two plus two, decided Vue wasn't for me, went back to React.", art: "rings", href: "https://dot010-vue-calculator.vercel.app" },
  { code: "JY-06", tag: "study", title: "Bootstrap", note: "Twelve columns of homework. Tailwind showed up and took its seat.", art: "cross", href: repo("bootstrap") },
  { code: "JY-07", tag: "study", title: "AJAX", note: "Shipping quotes with jQuery masks. Fetch made it a museum piece.", art: "waves", href: repo("ajax") },
  { code: "JY-08", tag: "study", title: "EBAC Games", note: "Five games and a Redux cart. Learned the store, never opened the shop.", art: "grid", href: "https://dot010-ebac-games.vercel.app" },
];