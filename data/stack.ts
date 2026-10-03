import type { StackLevel } from "@/types";


export const marqueeStack = ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "Redux", "Python", "Three.js"];


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
    items: [{ name: "JavaScript" }, { name: "GSAP" }, { name: "Redux Toolkit" }, { name: "REST APIs" }, { name: "Styled Components" }, { name: "Git" }],
  },
  {
    level: "Familiar",
    items: [{ name: "Python" }, { name: "Testing Library" }, { name: "Cypress" }, { name: "Jest" }, { name: "Prisma" }, { name: "Sass" }, { name: "Vue" }, { name: "Figma" }],
  },
  {
    level: "Learning",
    items: [{ name: "Three.js" }, { name: "SQL" }],
  },
];

export const snakeFoods = arsenal.flatMap((group) => group.items.map((item) => item.name));