"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={cn(
            "capitalize font-medium hover:text-accent transition-all",
            link.path === pathname && "text-accent border-b-2 border-accent",
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
