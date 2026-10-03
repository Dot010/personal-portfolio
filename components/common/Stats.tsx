"use client";

import { useRef } from "react";

import { stats } from "@/data/stats";
import { gsap, useGSAP } from "@/lib/gsap";

const Stats = () => {
  const root = useRef<HTMLDivElement>(null);

  // Count each number up from zero the first time the row scrolls into view.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const counter = { value: 0 };
          gsap.to(counter, {
            value: end,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: root.current, start: "top 90%", once: true },
            onStart: () => {
              el.textContent = "0";
            },
            onUpdate: () => {
              el.textContent = String(Math.round(counter.value));
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="wrap">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 border-b border-white/15 py-10">
        {stats.map((item) => (
          <li key={item.text} className="flex items-center gap-3.5">
            <b data-count={item.num} className="min-w-[1ch] font-display text-[56px] font-extrabold tabular-nums">
              {item.num}
            </b>
            <span className="max-w-[14ch] text-[13px] leading-snug text-white/65">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
