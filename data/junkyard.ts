import { junkyard as junkProjects } from "@/data/projects";

/** Generated thumbnails, so the junkyard needs no screenshots. */
export const junkArt = {
  stripes: "repeating-linear-gradient(90deg,#3a2a1a 0 18px,#ffcc33 18px 20px),#3a2a1a",
  dots: "radial-gradient(circle at 30% 40%,#009ddd 0 18%,transparent 19%),radial-gradient(circle at 70% 65%,#e14d2a 0 12%,transparent 13%),#1a1f2e",
  checks: "linear-gradient(135deg,#232329 25%,#2f2f38 25% 50%,#232329 50% 75%,#2f2f38 75%) 0 0/28px 28px",
  cone: "conic-gradient(from 30deg,#14532d,#22c55e,#14532d)",
  rings: "repeating-radial-gradient(circle at 50% 120%,#1c1c22 0 10px,#2a2a33 10px 12px)",
  cross:
    "linear-gradient(#232329 0 0) 50% 50%/60% 2px no-repeat,linear-gradient(#232329 0 0) 50% 50%/2px 60% no-repeat,#16161a",
} as const;

export type JunkItem = {
  code: string;
  tag: string;
  title: string;
  note: string;
  art: keyof typeof junkArt;
  href?: string;
  /** Not filled in yet: shown dimmed. Replace with a real experiment. */
  placeholder?: boolean;
};

const fromProjects: JunkItem[] = junkProjects.map((p) => ({
  code: p.num,
  tag: p.tag ?? "study",
  title: p.title,
  note: p.note ?? "",
  art: "stripes",
  href: p.live,
}));

const placeholder = (n: number, tag: string, art: keyof typeof junkArt): JunkItem => ({
  code: `JY-0${n}`,
  tag,
  title: "[Your experiment]",
  note: "[One line on why it died.]",
  art,
  placeholder: true,
});

/** Countdown plus five slots to fill with your own experiments (edit or delete them). */
export const junkItems: JunkItem[] = [
  ...fromProjects,
  placeholder(2, "sketch", "dots"),
  placeholder(3, "dead demo", "checks"),
  placeholder(4, "sketch", "cone"),
  placeholder(5, "study", "rings"),
  placeholder(6, "dead demo", "cross"),
];
