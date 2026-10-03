import Link from "next/link";

import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 py-6 xl:py-8 text-white bg-background/85 backdrop-blur">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/#home" className="text-4xl font-semibold">
          Jonathan<span className="text-accent">.</span>
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Button asChild>
            <Link href="/#contact">Hire me</Link>
          </Button>
        </div>

        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
