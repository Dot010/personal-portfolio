import type { StackLevel } from "@/types";

/** Technologies shown in the scrolling band under the hero. */
export const marqueeStack = ["Next.js", "React", "TypeScript", "Tailwind", "Python", "Node.js", "Redux", "Figma"];

/** Technologies grouped by how often they are used. Adjust the levels to match reality. */
export const arsenal: StackLevel[] = [
  {
    level: "Daily",
    items: [
      { name: "React", highlight: true },
      { name: "Next.js", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "Tailwind", highlight: true },
    ],
  },
  {
    level: "Working",
    items: [{ name: "Python" }, { name: "JavaScript" }, { name: "Redux" }, { name: "Prisma" }, { name: "Git" }],
  },
  {
    level: "Familiar",
    items: [{ name: "Node.js" }, { name: "PostgreSQL" }, { name: "Sass" }, { name: "Figma" }],
  },
];
