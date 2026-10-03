"use client";

import Link from "next/link";

import { navLinks } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((link) => link.id);

const Nav = () => {
  const active = useActiveSection(sectionIds);

  return (
    <nav className="flex gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.id}
          href={`/#${link.id}`}
          aria-current={active === link.id ? "true" : undefined}
          className={cn(
            "capitalize font-medium hover:text-accent transition-all",
            active === link.id && "text-accent border-b-2 border-accent",
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
