"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

const SECRET = "gsap";

/** Type "gsap" anywhere on the page: a burst of sparks and a little wobble on the headings. */
export default function EasterEgg() {
  const toast = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let typed = "";

    const party = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        for (let i = 0; i < 46; i++) {
          const spark = document.createElement("span");
          spark.textContent = i % 3 ? "✦" : "+";
          spark.setAttribute("aria-hidden", "true");
          spark.className = "pointer-events-none fixed left-0 top-0 z-[90] text-[22px] text-accent";
          document.body.appendChild(spark);
          const angle = Math.random() * Math.PI * 2;
          const distance = 160 + Math.random() * Math.min(window.innerWidth, window.innerHeight) * 0.5;
          gsap.set(spark, { x: cx, y: cy, scale: 0.4 + Math.random(), rotation: Math.random() * 180 });
          gsap.to(spark, {
            x: cx + Math.cos(angle) * distance,
            y: cy + Math.sin(angle) * distance + 120,
            rotation: `+=${Math.random() * 540 - 270}`,
            opacity: 0,
            duration: 1.4 + Math.random() * 0.6,
            ease: "power3.out",
            onComplete: () => spark.remove(),
          });
        }
        gsap.fromTo("h1, h2", { skewX: -12 }, { skewX: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
      }
      gsap
        .timeline()
        .to(toast.current, { autoAlpha: 1, y: -10, duration: 0.4 })
        .to(toast.current, { autoAlpha: 0, y: 0, duration: 0.4, delay: 2.2 });
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable], [role='application']")) return;
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-SECRET.length);
      if (typed === SECRET) {
        typed = "";
        party();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={toast}
      role="status"
      className="pointer-events-none invisible fixed bottom-[calc(70px+env(safe-area-inset-bottom,0px))] inset-x-0 z-[91] mx-auto w-max whitespace-nowrap rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-primary opacity-0"
    >
      You found it. Every animation here is GSAP.
    </div>
  );
}
