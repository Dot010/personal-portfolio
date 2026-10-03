import type { Service } from "@/types";

export const services: Service[] = [
  {
    num: 1,
    title: "Web Development",
    description: "Developing modern web applications using React, TypeScript, and Styled Components.",
  },
  {
    num: 2,
    title: "Responsive & Modern Styling",
    description: "Creating fluid, mobile-first layouts with CSS3, SASS, and modern CSS-in-JS libraries.",
  },
  {
    num: 3,
    title: "API & State Management",
    description: "Connecting React applications to REST APIs (Ajax) and managing state with Redux.",
    highlight: true,
  },
  {
    num: 4,
    title: "Version Control & Workflow",
    description: "Structuring project architectures, automating builds, and managing code with Git & GitHub.",
  },
];
