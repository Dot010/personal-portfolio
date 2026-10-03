import type { IconType } from "react-icons";

export type Project = {
  num: string;
  category: string;
  title: string;
  description: string;
  stack: { name: string }[];
  image: string;
  live: string;
  github?: string;
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

export type About = {
  title: string;
  description: string;
  info: InfoField[];
};

export type Education = {
  title: string;
  description: string;
  items: {
    institution: string;
    course: string;
    duration: string;
  }[];
};

export type Goals = {
  title: string;
  description: string;
  items: {
    goal: string;
    deadline: string;
    status: string;
  }[];
};

export type Skills = {
  title: string;
  description: string;
  skillList: {
    icon: IconType;
    name: string;
  }[];
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
