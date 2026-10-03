import type { Service } from "@/types";

export const services: Service[] = [
  {
    num: 1,
    title: "Web Development",
    description: "Modern web applications with React, Next.js and TypeScript.",
  },
  {
    num: 2,
    title: "Responsive & Modern Styling",
    description: "Fluid, mobile-first layouts with CSS3, Sass, Tailwind and CSS-in-JS.",
  },
  {
    num: 3,
    title: "API & State Management",
    description: "Connecting apps to REST APIs and managing state with Redux and Context.",
    highlight: true,
  },
  {
    num: 4,
    title: "Version Control & Workflow",
    description: "Project structure, automated builds and a clean Git history on GitHub.",
  },
];
