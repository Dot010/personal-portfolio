"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();

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
            <Link href="/" className="text-4xl font-semibold">
              Jonathan<span className="text-accent">.</span>
            </Link>
          </SheetClose>
        </div>

        <nav className="flex flex-col justify-center items-center gap-8">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.path}>
              <Link
                href={link.path}
                className={cn(
                  "text-xl capitalize hover:text-accent transition-all",
                  link.path === pathname && "text-accent border-b-2 border-accent",
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
