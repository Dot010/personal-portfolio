"use client";

import { useEffect, useRef } from "react";

import { navLinks, site, socials } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { gsap } from "@/lib/gsap";
import { getLenis, scrollToSection } from "@/lib/lenis";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((link) => link.id);

type MenuProps = {
  open: boolean;
  onClose: () => void;
};

/** Full-screen index. Opens with a curtain from the bottom; section names rise one by one. */
export default function Menu({ open, onClose }: MenuProps) {
  const root = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const pending = useRef<string | null>(null);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      getLenis()?.stop();
      gsap.set(el, { visibility: "visible" });
      if (reduce) {
        gsap.set(el, { clipPath: "inset(0% 0 0 0)" });
      } else {
        gsap.fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "expo.inOut" });
        gsap.fromTo(
          el.querySelectorAll(".menu-word"),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.04, delay: 0.35 },
        );
      }
      const id = window.setTimeout(() => closeButton.current?.focus(), reduce ? 0 : 400);
      return () => window.clearTimeout(id);
    }

    if (el.style.visibility !== "visible") return;
    const finish = () => {
      gsap.set(el, { visibility: "hidden", clipPath: "inset(100% 0 0 0)" });
      getLenis()?.start();
      const target = pending.current ? document.getElementById(pending.current) : null;
      pending.current = null;
      if (target) {
        scrollToSection(target);
        history.pushState(null, "", `#${target.id}`);
      } else {
        lastFocus.current?.focus({ preventScroll: true });
      }
    };
    if (reduce) finish();
    else gsap.to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut", onComplete: finish });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={root}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site index"
      data-lenis-prevent
      className="invisible fixed inset-0 z-70 flex flex-col justify-between overflow-auto bg-background pt-[calc(24px+env(safe-area-inset-top,0px))] pb-[calc(28px+env(safe-area-inset-bottom,0px))] [clip-path:inset(100%_0_0_0)]"
    >
      <div className="wrap flex items-center justify-between gap-3">
        <span className="label">[ Index ]</span>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/15 bg-surface px-4 py-2.5 text-[13px]"
        >
          ✕ Close
        </button>
      </div>

      <nav aria-label="Sections" className="wrap flex flex-col py-6">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            data-menu-link
            onClick={(e) => {
              e.preventDefault();
              pending.current = link.id;
              onClose();
            }}
            aria-current={active === link.id ? "true" : undefined}
            className="group flex items-baseline gap-4.5 overflow-hidden border-b border-white/10 py-1.5"
          >
            <b className={cn("w-[2.4ch] shrink-0 text-[13px] font-normal", active === link.id ? "text-accent" : "text-white/60")}>
              {link.num}
            </b>
            <span
              className={cn(
                "menu-word inline-block font-display text-[clamp(30px,6.5vw,72px)] font-extrabold uppercase leading-[1.05] tracking-[-0.03em] transition-[color,transform] duration-500 group-hover:translate-x-4 group-hover:text-accent group-focus-visible:text-accent",
                active === link.id && "text-transparent [-webkit-text-stroke:1px_#fff]",
              )}
            >
              {link.name}
            </span>
          </a>
        ))}
      </nav>

      <div className="wrap label flex flex-wrap items-center justify-between gap-3">
        <span>{site.email}</span>
        <span className="flex gap-4">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              {social.label}
            </a>
          ))}
        </span>
      </div>
    </div>
  );
}
