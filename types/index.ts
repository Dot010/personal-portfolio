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
