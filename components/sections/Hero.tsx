"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiDownload } from "react-icons/fi";

import HeroLens from "@/components/fx/HeroLens";
import { site, socials } from "@/data/site";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { scramble } from "@/lib/scramble";

const Hero = () => {
  const root = useRef<HTMLElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const [lensReady, setLensReady] = useState(false);

  // Local time in the meta row, refreshed every 30 seconds.
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: site.timeZone });
    const tick = () => {
      if (clock.current) clock.current.textContent = format.format(new Date());
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  // Intro: grid lines draw down, the first name rises letter by letter, the rest fades in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".hero-first", { type: "chars" });
        const tl = gsap.timeline({ paused: true, onComplete: () => setLensReady(true) });
        tl.from(".hero-grid span", { scaleY: 0, duration: 1.2, ease: "expo.out", stagger: 0.08 })
          .from(split.chars, { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.04 }, "<")
          .from(".hero-last", { xPercent: -6, autoAlpha: 0, duration: 1, ease: "expo.out" }, "<0.25")
          .from(".hero-meta > *", { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" }, "<0.1")
          .add(() => {
            const fig = root.current?.querySelector<HTMLElement>(".hero-fig");
            if (fig) scramble(fig);
          }, "<")
          .from(".hero-foot > *, .hero-bottom", { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, "<0.2");
        const stop = onIntroDone(() => tl.play());
        return () => {
          stop();
          split.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // On scroll: the outlined last name fills in, then the hero sinks back as you leave it.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hero-solid", {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: true },
        });
        gsap.to(".hero-inner", {
          scale: 0.94,
          autoAlpha: 0.25,
          filter: "blur(3px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "45% top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="home" data-fig="Fig. 00 — Blank sheet" className="relative overflow-x-clip pt-10 pb-14">
      {/* Faint 4-column grid behind the hero */}
      <div aria-hidden="true" className="hero-grid wrap pointer-events-none absolute inset-0">
        <div className="grid h-full grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="origin-top border-l border-white/5 last:border-r" />
          ))}
        </div>
      </div>

      <div className="hero-inner wrap relative origin-top">
        <div className="hero-meta label grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-6 gap-y-2.5 border-b border-white/15 pb-4">
          <span className="hero-fig">[ Fig. 00 — Blank sheet ]</span>
          <span>{site.role}</span>
          <span>
            {site.location} · <span ref={clock} className="tabular-nums">--:--</span>
          </span>
          <span className="flex items-center gap-2.5 text-white">
            <i className="size-2 rounded-full bg-accent motion-safe:animate-ping-soft" />
            {site.availability}
          </span>
        </div>

        <h1
          aria-label={site.name}
          className="hero-name relative mt-16 font-display text-[clamp(46px,10.5vw,148px)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]"
        >
          <span aria-hidden="true" className="hero-first block overflow-hidden pb-[0.04em]">
            {site.firstName}
          </span>
          <span aria-hidden="true" className="hero-last relative block pl-[12%] sm:pl-[25%]">
            <span className="hero-outline text-transparent [-webkit-text-stroke:2px_#fff]">{site.lastName}</span>
            <span className="hero-dot text-accent">.</span>
            <span className="hero-solid absolute left-0 top-0 pl-[12%] text-white [clip-path:inset(0_100%_0_0)] sm:pl-[25%]">
              {site.lastName}
            </span>
          </span>
          <HeroLens active={lensReady} />
        </h1>

        <div className="hero-foot mt-18 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-end gap-x-6 gap-y-8">
          <div className="label leading-loose">
            {site.mainStack.map((tech) => (
              <span key={tech} className="block">
                {tech}
              </span>
            ))}
          </div>

          <div>
            <p className="mb-6 max-w-[46ch] text-white/80">
              {site.intro} <em className="not-italic text-accent">{site.highlight}</em>
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-primary"
              >
                Contact <FiArrowUpRight className="text-base" />
              </a>
              <a
                href={site.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm"
              >
                Download CV <FiDownload className="text-base" />
              </a>
            </div>
          </div>

          <ul className="flex flex-wrap gap-3 text-[13px] sm:flex-col sm:items-end">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition-colors hover:text-accent"
                >
                  {social.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-bottom label mt-16 flex justify-between gap-4">
          <span className="flex items-center gap-3">
            <FiArrowDown className="motion-safe:animate-nudge" />
            Scroll to explore
          </span>
          <span>Portfolio — {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
