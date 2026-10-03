"use client";

import { useRef, useState } from "react";

import ContactForm from "@/components/contact/ContactForm";
import { site } from "@/data/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scramble } from "@/lib/scramble";

const Contact = () => {
  const root = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);

  // The big headline drifts sideways with the scroll; the label scrambles in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".contact-huge",
          { xPercent: 12 },
          {
            xPercent: -28,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        const label = root.current?.querySelector<HTMLElement>("[data-fig]");
        if (label) {
          ScrollTrigger.create({ trigger: label, start: "top 90%", once: true, onEnter: () => scramble(label) });
        }
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked: select the address so it can be copied by hand.
      const range = document.createRange();
      if (emailRef.current) range.selectNodeContents(emailRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <section ref={root} id="contact" className="overflow-hidden py-[clamp(80px,12vw,140px)]">
      <div className="wrap">
        <span data-fig className="label">[ Fig. 08 — Contact ]</span>
      </div>

      <h2
        aria-label="Let's work together"
        className="contact-huge my-6 mb-10 whitespace-nowrap font-display text-[clamp(56px,13vw,200px)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em]"
      >
        Let&apos;s <span className="text-transparent [-webkit-text-stroke:2px_#fff]">work</span> together
        <span className="text-accent">.</span>
      </h2>

      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-center gap-3.5">
          <span
            ref={emailRef}
            className="break-all border-b-2 border-accent pb-1 text-[clamp(17px,2.4vw,28px)]"
          >
            {site.email}
          </span>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded-full border border-white/30 px-4 py-2 text-[13px]"
          >
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
