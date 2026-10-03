import type { EducationItem, Goal, InfoField, RecordItem } from "@/types";

export const aboutText =
  "Full-stack developer studying at EBAC, focused on Python for the back-end and JavaScript and React for the front-end. I learn by shipping practical projects and putting them online.";

export const facts: InfoField[] = [
  { fieldName: "Name", fieldValue: "Jonathan Carvalho" },
  { fieldName: "Email", fieldValue: "jonathan2500@outlook.pt" },
  { fieldName: "Freelance", fieldValue: "Available" },
  { fieldName: "Languages", fieldValue: "Portuguese, English, Spanish" },
];

export const education: EducationItem[] = [
  {
    period: "2024 —",
    course: "Dev Full Stack Python",
    institution: "EBAC — Escola Britânica de Artes e Tecnologia",
    current: true,
  },
  {
    period: "2021 —",
    course: "Administração",
    institution: "Universidade Federal do Pampa",
    current: true,
  },
  {
    period: "2014 — 2017",
    course: "Informática para Internet",
    institution: "IFSUL — Instituto Federal Sul-rio-grandense",
  },
];

export const goals: Goal[] = [
  { goal: "Master front & back-end", status: "In progress" },
  { goal: "First full-stack job", status: "Planned" },
  { goal: "Contribute to open source", status: "Planned" },
  { goal: "Work remotely, internationally", status: "Planned" },
];

export const record: RecordItem[] = [
  { title: "5 projects live", detail: "Deployed on Vercel", state: "Shipped" },
  { title: "Dev Full Stack Python", detail: "EBAC — certificate in progress", state: "Now" },
  { title: "First open-source PR", detail: "Goal for 2026", state: "Next" },
];
