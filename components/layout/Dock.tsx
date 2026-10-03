"use client";

import { useRef, useState } from "react";

import { useMagnetic } from "@/hooks/useMagnetic";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

type DockProps = {
  menuOpen: boolean;
  onMenu: () => void;
};

/**
 * Floating bar at the bottom of the screen: home, current figure + page progress,
 * the menu button and "Hire me". Replaces the old top header so the hero stands alone.
 */
export default function Dock({ menuOpen, onMenu }: DockProps) {
  const root = useRef<HTMLDivElement>(null);
  const number = useRef<HTMLElement>(null);
  const bar = useRef<HTMLElement>(null);
  const hire = useRef<HTMLAnchorElement>(null);
  const [fig, setFig] = useState("Fig. 00 — Blank sheet");

  useMagnetic(hire);

  useGSAP(
    () => {
      // Page progress: 000–100 and a thin line along the bottom edge.
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (number.current) number.current.textContent = String(Math.round(self.progress * 100)).padStart(3, "0");
          gsap.set(bar.current, { scaleX: self.progress });
        },
      });

      // Current section label.
      gsap.utils.toArray<HTMLElement>("[data-fig]").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) setFig(section.dataset.fig ?? "");
          },
        });
      });

      // Slide in once the intro has played.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(root.current, { y: 90, autoAlpha: 0 });
        return onIntroDone(() => gsap.to(root.current, { y: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out" }));
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="fixed inset-x-0 bottom-[calc(16px+env(safe-area-inset-bottom,0px))] z-60 mx-auto flex w-fit max-w-[calc(100vw-32px)] items-center gap-1.5 overflow-hidden rounded-full border border-white/15 bg-surface-deep/85 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
    >
      <a
        href="#home"
        aria-label="Back to top"
        className="grid size-11 shrink-0 place-items-center rounded-full bg-surface font-display text-lg font-extrabold"
      >
        J<span className="text-accent">.</span>
      </a>

      <span aria-hidden="true" className="flex min-w-0 items-center gap-2.5 px-3 text-[11px] uppercase tracking-[0.12em] text-white/60">
        <span className="hidden truncate sm:inline">{fig}</span>
        <b ref={number} className="font-medium text-accent tabular-nums">
          000
        </b>
      </span>

      <button
        type="button"
        onClick={onMenu}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        className="flex h-11 shrink-0 items-center gap-2.5 rounded-full border border-white/15 px-4 text-[13px] sm:px-5"
      >
        <span aria-hidden="true" className="flex flex-col gap-1">
          <i className="block h-[1.5px] w-3.5 bg-current" />
          <i className="block h-[1.5px] w-3.5 bg-current" />
        </span>
        Menu
      </button>

      <a
        ref={hire}
        href="#contact"
        className="flex h-11 shrink-0 items-center rounded-full bg-accent px-5 text-sm font-bold text-primary"
      >
        Hire me
      </a>

      <span aria-hidden="true" className="absolute inset-x-5 bottom-0 h-0.5 bg-white/10">
        <i ref={bar} className="block h-full origin-left scale-x-0 bg-accent" />
      </span>
    </div>
  );
}
