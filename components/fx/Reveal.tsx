"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "section" | "ul";
  id?: string;
  className?: string;
  /** CSS selector for children to animate one after another instead of the whole block. */
  stagger?: string;
  /** Starting vertical offset in px. */
  y?: number;
};

/** Fades and lifts its content in when it scrolls into view. Skipped for reduced motion. */
export default function Reveal({ children, as = "div", id, className, stagger, y = 40 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? el.querySelectorAll(stagger) : el;
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
