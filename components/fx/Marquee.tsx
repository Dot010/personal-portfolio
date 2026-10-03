"use client";

import { Fragment, useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Infinite band of words. Speeds up with scroll velocity and flips with scroll direction. */
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to(track.current, { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
        let direction = 1;
        const trigger = ScrollTrigger.create({
          onUpdate: (self) => {
            direction = self.direction;
            const boost = Math.min(Math.abs(self.getVelocity()) / 300, 6);
            gsap.to(loop, { timeScale: direction * (1 + boost), duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: direction, duration: 1, delay: 0.2 });
          },
        });
        return () => trigger.kill();
      });
      return () => mm.revert();
    },
    { scope: track },
  );

  const group = (
    <div className="flex gap-12 pr-12 font-display text-[clamp(22px,3.2vw,40px)] font-bold uppercase whitespace-nowrap">
      {items.map((item, i) => (
        <Fragment key={item}>
          <span className={i % 2 === 0 ? "text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.7)]" : ""}>
            {item}
          </span>
          <i className="not-italic text-accent">✦</i>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div aria-label={label} className="overflow-hidden border-y border-white/15 bg-surface-deep py-5">
      <div ref={track} aria-hidden="true" className="flex w-max">
        {group}
        {group}
      </div>
    </div>
  );
}
