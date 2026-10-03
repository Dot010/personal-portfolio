"use client";

import { useEffect, useState } from "react";

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
