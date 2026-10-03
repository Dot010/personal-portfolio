"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import type { Project } from "@/types";

type CursorPreviewProps = {
  projects: Project[];
  /** Index of the hovered project, or null when the pointer is outside the list. */
  active: number | null;
};

/**
 * Floating screenshot that trails the cursor over the project list.
 * Each new project is revealed with a bottom-up clip. Desktop pointers only.
 */
export default function CursorPreview({ projects, active }: CursorPreviewProps) {
  const box = useRef<HTMLDivElement>(null);
  const shots = useRef<(HTMLDivElement | null)[]>([]);

  // Follow the pointer with a soft lag.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (min-width: 861px) and (prefers-reduced-motion: no-preference)");
    if (!fine.matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX + 40);
      yTo(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Show / hide the box and swap the screenshot.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (active === null) {
      gsap.to(el, { scale: 0, autoAlpha: 0, duration: 0.4, ease: "power3.in", overwrite: true });
      return;
    }
    gsap.to(el, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "expo.out", overwrite: true });
    shots.current.forEach((shot, i) => gsap.set(shot, { zIndex: i === active ? 2 : 1 }));
    gsap.fromTo(
      shots.current[active],
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 0.6, ease: "expo.out" },
    );
  }, [active]);

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[16/10] w-[360px] scale-0 overflow-hidden rounded-xl bg-surface-deep opacity-0 shadow-[0_30px_60px_rgba(0,0,0,0.45)] [@media(hover:hover)_and_(min-width:861px)]:block"
    >
      {projects.map((project, i) => (
        <div
          key={project.title}
          ref={(node) => {
            shots.current[i] = node;
          }}
          className="absolute inset-0 [clip-path:inset(100%_0_0_0)]"
        >
          <Image src={project.image} alt="" fill sizes="360px" className="object-cover object-top" />
        </div>
      ))}
    </div>
  );
}
