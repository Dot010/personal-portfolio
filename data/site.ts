import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import type { NavLink, SocialLink } from "@/types";

export const site = {
  name: "Jonathan Carvalho",
  firstName: "Jonathan",
  lastName: "Carvalho",
  role: "Software Developer",
  email: "jonathan2500@outlook.pt",
  cv: "/assets/JonathanVianaEN.pdf",
  location: "UTC−3 / Remote 30.9°S",
  timeZone: "America/Sao_Paulo",
  availability: "Available for freelance",
  intro: "Full-stack developer in progress. I build responsive interfaces and the back-end behind them.",
  highlight: "No templates, just code I understand.",
  mainStack: ["Next.js", "TypeScript", "Python"],
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Dot010", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jonathan-viana-b23b81186/", icon: FaLinkedin },
  { label: "Instagram", href: "https://www.instagram.com/_jxnathan0/", icon: FaInstagram },
];

export const navLinks: NavLink[] = [
  { name: "home", id: "home" },
  { name: "services", id: "services" },
  { name: "work", id: "work" },
  { name: "lab", id: "lab" },
  { name: "dossier", id: "dossier" },
  { name: "play", id: "break" },
  { name: "contact", id: "contact" },
];
