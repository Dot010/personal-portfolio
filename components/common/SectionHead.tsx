"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { scramble } from "@/lib/scramble";

type SectionHeadProps = {
  title: string;
  /** Editorial label, e.g. "Fig. 01 — Services". Rendered as "[ … ]". */
  fig: string;
  className?: string;
};

/** Section title that rises line by line from a mask, with a label that scrambles in. */
export default function SectionHead({ title, fig, className = "" }: SectionHeadProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = root.current?.querySelector("h2");
        const label = root.current?.querySelector<HTMLElement>("[data-fig]");
        if (!heading || !label) return;

        const split = SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1,
              ease: "expo.out",
              stagger: 0.08,
              scrollTrigger: { trigger: heading, start: "top 85%", once: true },
            }),
        });
        const trigger = ScrollTrigger.create({
          trigger: label,
          start: "top 90%",
          once: true,
          onEnter: () => scramble(label),
        });
        return () => {
          trigger.kill();
          split.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 ${className}`}>
      <h2 className="font-display text-[clamp(34px,5vw,64px)] font-bold uppercase leading-[1.02] tracking-[-0.02em]">
        {title}
      </h2>
      <span data-fig className="label tabular-nums">
        [ {fig} ]
      </span>
    </div>
  );
}
