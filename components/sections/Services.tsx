"use client";

import { useRef } from "react";

import SectionHead from "@/components/common/SectionHead";
import { services } from "@/data/services";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const Services = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const track = root.current?.querySelector<HTMLElement>(".services-track");
      const pin = root.current?.querySelector<HTMLElement>(".services-pin");
      if (!track || !pin) return;

      // Wide screens: the section pins and the cards slide sideways as you scroll.
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "center center",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.from(".services-num", {
          yPercent: 40,
          ease: "none",
          scrollTrigger: { trigger: pin, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Narrow screens: cards stack and rise in one after another.
      mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".services-card", {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: track, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" data-fig="Fig. 01 — Services" className="overflow-hidden py-[clamp(80px,12vw,140px)]">
      <div className="wrap">
        <SectionHead title="What I do" fig="Fig. 01 — Services" />
        <p className="label -mt-6 mb-10 hidden min-[900px]:block">Keep scrolling: the cards slide sideways →</p>
      </div>

      <div className="services-pin">
        <ul className="services-track flex flex-col gap-6 px-[clamp(16px,3vw,24px)] min-[900px]:w-max min-[900px]:flex-row min-[900px]:pl-[max(24px,calc((100vw-1200px)/2+24px))]">
          {services.map((service) => (
            <li
              key={service.num}
              className={cn(
                "services-card flex min-h-[340px] w-full flex-col gap-5 rounded-2xl p-9 min-[900px]:w-[420px]",
                service.highlight ? "bg-accent text-primary" : "bg-surface",
              )}
            >
              <span
                className={cn(
                  "services-num font-display text-7xl font-extrabold leading-none text-transparent",
                  service.highlight
                    ? "[-webkit-text-stroke:1px_var(--color-primary)]"
                    : "[-webkit-text-stroke:1px_rgb(255_255_255/0.65)]",
                )}
              >
                {String(service.num).padStart(2, "0")}
              </span>
              <h3 className="mt-auto text-2xl font-bold leading-tight">{service.title}</h3>
              <p className={cn("text-sm", service.highlight ? "text-primary/75" : "text-white/60")}>
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
