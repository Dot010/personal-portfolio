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
  href: string;
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
    icon: import("react-icons").IconType;
    name: string;
  }[];
};

export type Stat = {
  num: number;
  text: string;
};
