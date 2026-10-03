"use client";

import { useRef, useState } from "react";

import { site } from "@/data/site";

const Contact = () => {
  const emailRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);

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
    <section id="contact" className="overflow-hidden py-[clamp(80px,12vw,140px)]">
      <div className="wrap">
        <span className="label">[ Fig. 08 — Contact ]</span>
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
      </div>
    </section>
  );
};

export default Contact;
