import type { IconType } from "react-icons";

export type Project = {
  /** Which section lists the project. */
  group: "selected" | "lab" | "junk";
  num: string;
  category: string;
  title: string;
  description: string;
  stack: { name: string }[];
  image: string;
  live: string;
  github?: string;
  /** Who did what, e.g. "Solo — front-end". */
  role: string;
  status: "Live" | "In development";
  /** Short bullet points shown in the case file. */
  highlights: string[];
  /** Short bracketed tag for lab and junkyard cards, e.g. "study". */
  tag?: string;
  /** One-liner for junkyard cards. */
  note?: string;
};

export type Service = {
  title: string;
  description: string;
  num: number;
  /** Shown in the accent colour. */
  highlight?: boolean;
};

export type InfoField = {
  fieldName: string;
  fieldValue: string;
};

export type Stat = {
  num: number;
  text: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

export type NavLink = {
  name: string;
  id: string;
};

export type EducationItem = {
  period: string;
  course: string;
  institution: string;
  /** Still studying there: shows a "Now" badge. */
  current?: boolean;
};

export type Goal = {
  goal: string;
  status: "In progress" | "Planned" | "Done";
};

export type RecordItem = {
  title: string;
  detail: string;
  state: "Shipped" | "Now" | "Next";
};

export type StackLevel = {
  level: "Daily" | "Working" | "Familiar";
  items: { name: string; highlight?: boolean }[];
};
