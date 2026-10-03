import { FaCss3, FaFigma, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

import type { About, Education, Goals, Skills } from "@/types";

export const about: About = {
  title: "About me",
  description:
    "I am a beginner Full Stack developer, currently studying at EBAC, focused on Python for back-end development and JavaScript/React for front-end. I am building practical projects to strengthen my skills and gain hands-on experience.",
  info: [
    { fieldName: "Name", fieldValue: "Jonathan Carvalho" },
    { fieldName: "E-mail", fieldValue: "jonathan2500@outlook.pt" },
    { fieldName: "Freelance", fieldValue: "Available" },
    { fieldName: "Languages", fieldValue: "Portuguese, English, Spanish" },
  ],
};

export const education: Education = {
  title: "My Education",
  description:
    "I am a beginner Full Stack developer, currently studying at EBAC, focused on Python for back-end development and JavaScript/React for front-end. I am building practical projects to strengthen my skills and gain hands-on experience.",
  items: [
    {
      institution: "EBAC - Escola Britânica de Artes e Tecnologia",
      course: "Dev Full Stack Python",
      duration: "2024 - Present",
    },
    {
      institution: "IFSUL - Instituto Federal de Educação, Ciência e Tecnologia.",
      course: "Informática para Internet",
      duration: "2014 - 2017",
    },
    {
      institution: "Universidade Federal do Pampa",
      course: "Administração",
      duration: "2021 - Present",
    },
  ],
};

export const goals: Goals = {
  title: "My Goals",
  description: "My short and long terms goals as a developer.",
  items: [
    { goal: "Get my first job as a Full Stack developer.", deadline: "2026", status: "Planned" },
    { goal: "Master my skills in Front and Back-End.", deadline: "2026", status: "In Progress" },
    { goal: "Contribute to an open source project.", deadline: "2026", status: "Planned" },
    { goal: "Work remotely for an international company.", deadline: "2026", status: "Planned" },
  ],
};

export const skills: Skills = {
  title: "My Skills",
  description:
    "Here are some of my skills that I have acquired in the past and that I am currently learning to improve.",
  skillList: [
    { icon: FaHtml5, name: "html 5" },
    { icon: FaCss3, name: "css 3" },
    { icon: FaJs, name: "javascript" },
    { icon: FaReact, name: "react.js" },
    { icon: SiTailwindcss, name: "tailwind.css" },
    { icon: FaNodeJs, name: "node.js" },
    { icon: FaFigma, name: "figma" },
  ],
};
