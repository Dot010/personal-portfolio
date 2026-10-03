import type { Project } from "@/types";

const screenshot = (url: string) =>
  `https://api.microlink.io?url=${url}&screenshot=true&meta=false&embed=screenshot.url`;

/**
 * Every project on the site. `group` decides the section:
 * "selected" → Selected work, "lab" → The lab, "junk" → Junkyard.
 */
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
    image: screenshot("https://self-check-app.vercel.app/fsw-donalds"),
    live: "https://self-check-app.vercel.app/fsw-donalds",
    github: "https://github.com/Dot010/SelfCheckApp",
    role: "Solo — design & full-stack",
    status: "Live",
    highlights: ["Ordering flow built end to end", "Payments with Stripe", "Data modelled with Prisma + PostgreSQL"],
  },
  {
    group: "selected",
    num: "02",
    category: "Frontend",
    title: "Apex Sports",
    description:
      "A sports e-commerce focused on interactive product displays, filtering and smooth cart operations.",
    summary: "React · Redux Toolkit",
    kind: "E-commerce front-end",
    stack: [{ name: "React" }, { name: "TypeScript" }, { name: "Redux Toolkit" }, { name: "Styled Components" }],
    image: screenshot("https://apex-sports-seven.vercel.app/"),
    live: "https://apex-sports-seven.vercel.app/",
    github: "https://github.com/Dot010/Apex-Sports",
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
  {
    group: "junk",
    num: "JY-01",
    category: "Frontend",
    title: "Countdown",
    description:
      "Pomodoro timer to manage focus and tasks interactively.",
    summary: "React · TypeScript · Redux Toolkit · Styled Components",
    kind: "Study project",
    stack: [{ name: "React" }, { name: "TypeScript" }, { name: "Redux Toolkit" }, { name: "Styled Components" }],
    image: screenshot("https://countdown-rockseat.vercel.app/"),
    live: "https://countdown-rockseat.vercel.app/",
    role: "Solo — front-end",
    status: "Live",
    highlights: ["Pomodoro focus cycles", "Task list", "State managed with Redux Toolkit"],
    tag: "study",
    note: "A pomodoro timer from a course. It still counts; I just moved on.",
  },
];

export const selectedWork = projects.filter((p) => p.group === "selected");
export const labProjects = projects.filter((p) => p.group === "lab");
export const junkyard = projects.filter((p) => p.group === "junk");
