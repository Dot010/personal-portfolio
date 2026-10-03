import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import type { NavLink, SocialLink } from "@/types";

export const site = {
  name: "Jonathan Carvalho",
  role: "Software Developer",
  email: "jonathan2500@outlook.pt",
  cv: "/assets/JonathanVianaEN.pdf",
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Dot010", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jonathan-viana-b23b81186/", icon: FaLinkedin },
  { label: "Instagram", href: "https://www.instagram.com/_jxnathan0/", icon: FaInstagram },
];

export const navLinks: NavLink[] = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "resume", path: "/resume" },
  { name: "work", path: "/work" },
  { name: "contact", path: "/contact" },
];
