import type { Project } from "@/types";

const screenshot = (url: string) =>
  `https://api.microlink.io?url=${url}&screenshot=true&meta=false&embed=screenshot.url`;


export const projects: Project[] = [
  {
    group: "selected",
    num: "01",
    category: "Full-Stack",
    title: "SelfCheckApp",
    description:
      "A self-ordering experience for restaurants: customers browse the menu, build an order and pay from their own phone.",
    summary: "Next.js · Prisma · Stripe",
    kind: "Full-Stack web app",
    stack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Prisma ORM" },
      { name: "PostgreSQL" },
      { name: "Stripe" },
    ],
    image: screenshot("https://self-check-app.vercel.app/tigela"),
    live: "https://self-check-app.vercel.app/tigela",
    github: "https://github.com/Dot010/SelfCheckApp",
      role: "Solo — design & full-stack",
    status: "Live",
    highlights: [
      "Stripe Checkout with an idempotent webhook (Pix, card, boleto)",
      "Kitchen board, TV pickup screen and kiosk mode",
      "Unit + end-to-end tests running on GitHub Actions",
    ],
  },
  {
    group: "selected",
    num: "02",
    category: "Frontend",
    title: "Beam-scene",
    description:
      "A coffee platform with interactive product displays and smooth cart operations.",
    summary: "React · Redux Toolkit",
    kind: "front-end",
    stack: [{ name: "React" }, { name: "TypeScript" }, { name: "Redux Toolkit" }, { name: "Styled Components" }],
    image: screenshot("https://bean-scene-coffee-ten.vercel.app/"),
    live: "https://bean-scene-coffee-ten.vercel.app/",
    github: "https://github.com/Dot010/beam-scene",
    role: "Solo — front-end",
    status: "Live",
    highlights: ["Product filtering", "Cart state with Redux Toolkit", "Themed with Styled Components"],
  },
  {
    group: "selected",
    num: "03",
    category: "Frontend",
    title: "Disney+ Clone",
    description:
      "A responsive clone of the Disney+ landing page, built to practise mobile-first layout and build tooling.",
    summary: "Sass · Gulp",
    kind: "Landing page study",
    stack: [{ name: "HTML5" }, { name: "CSS3" }, { name: "Sass" }, { name: "JavaScript" }, { name: "Gulp" }],
    image: screenshot("https://clone-disney-plus-tau-two.vercel.app/"),
    live: "https://clone-disney-plus-tau-two.vercel.app/",
    github: "https://github.com/Dot010/CloneDisneyPlus",
    role: "Solo — front-end",
    status: "Live",
    highlights: ["Mobile-first layout", "Modular Sass styles", "Gulp build automation"],
  },
  {
    group: "lab",
    num: "L-01",
    category: "Full-Stack",
    title: "PsyCare",
    description:
      "Mental health platform with emotional journals, habit tracking and appointments.",
    summary: "Next.js · TypeScript · Shadcn UI · Context API",
    kind: "Full-Stack web app",
    stack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn UI" },
      { name: "Context API" },
    ],
    image: screenshot("https://psycare-seven.vercel.app/dashboard/home/"),
    live: "https://psycare-seven.vercel.app",
    github: "https://github.com/Dot010/Psycare",
    role: "Solo — design & front-end",
    status: "In development",
    highlights: ["Emotional journal", "Habit tracking", "Appointments"],
    tag: "in development",
  },
  
];

export const selectedWork = projects.filter((p) => p.group === "selected");
export const labProjects = projects.filter((p) => p.group === "lab");
export const junkyard = projects.filter((p) => p.group === "junk");
