"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { getLenis } from "@/lib/lenis";

/** Counts 00 → 100, then lifts like a curtain and hands over to the hero intro. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(root.current, { display: "none" });
        markIntroDone();
        return;
      }

      window.scrollTo(0, 0);
      requestAnimationFrame(() => getLenis()?.stop());
      const progress = { value: 0 };

      gsap
        .timeline({ onComplete: () => getLenis()?.start() })
        .to(progress, {
          value: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            const v = Math.round(progress.value);
            if (count.current) count.current.textContent = String(v).padStart(2, "0");
            if (bar.current) bar.current.style.width = `${v}%`;
          },
        })
        .to(root.current, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "+=0.1")
        .add(markIntroDone, "-=0.45")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="site-loader fixed inset-0 z-[100] flex flex-col justify-between bg-accent px-[clamp(16px,3vw,24px)] pt-[calc(24px+env(safe-area-inset-top,0px))] pb-[calc(24px+env(safe-area-inset-bottom,0px))] text-primary motion-reduce:hidden"
    >
      <noscript>
        <style>{".site-loader{display:none!important}"}</style>
      </noscript>
      <div className="flex justify-between text-xs font-bold uppercase tracking-[0.14em]">
        <span>Jonathan.</span>
        <span>Loading portfolio</span>
      </div>
      <div>
        <span
          ref={count}
          className="block font-display text-[clamp(88px,22vw,280px)] font-extrabold leading-[0.8] tracking-[-0.05em] tabular-nums"
        >
          00
        </span>
        <div className="mt-5 h-0.5 bg-primary/20">
          <i ref={bar} className="block h-full w-0 bg-primary" />
        </div>
      </div>
    </div>
  );
}
