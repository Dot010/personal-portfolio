"use client";

import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((link) => link.id);

const MobileNav = () => {
  const active = useActiveSection(sectionIds);

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center" aria-label="Open menu">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
        </VisuallyHidden>

        <div className="mt-32 mb-40 text-center text-2xl">
          <SheetClose asChild>
            <Link href="/#home" className="text-4xl font-semibold">
              Jonathan<span className="text-accent">.</span>
            </Link>
          </SheetClose>
        </div>

        <nav className="flex flex-col justify-center items-center gap-8">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.id}>
              <Link
                href={`/#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "text-xl capitalize hover:text-accent transition-all",
                  active === link.id && "text-accent border-b-2 border-accent",
                )}
              >
                {link.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
