"use client";

import { useState, type FormEvent } from "react";

import { site } from "@/data/site";

const field =
  "min-w-0 rounded-lg border border-white/12 bg-background px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-accent";

/**
 * Contact form. For now it opens the visitor's email app with the message filled in;
 * a server-side send will replace this later.
 */
export default function ContactForm() {
  const [note, setNote] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setNote("Fill in your name, email and message.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setNote("Your email app should open with the message ready to send.");
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5 rounded-2xl bg-surface p-[clamp(20px,4vw,36px)]"
    >
      <label htmlFor="contact-name" className="flex flex-col gap-2 text-[13px] text-white/70">
        Name
        <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Your name" className={field} />
      </label>
      <label htmlFor="contact-email" className="flex flex-col gap-2 text-[13px] text-white/70">
        Email
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@email.com"
          className={field}
        />
      </label>
      <label htmlFor="contact-message" className="col-span-full flex flex-col gap-2 text-[13px] text-white/70">
        Message
        <textarea
          id="contact-message"
          name="message"
          required
          placeholder="Tell me about your project"
          className={`${field} min-h-[140px] resize-y`}
        />
      </label>
      <div className="col-span-full flex flex-wrap items-center gap-5">
        <button type="submit" className="rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-primary">
          Send message
        </button>
        <p role="status" className="min-h-[1.2em] text-[13px] text-accent">
          {note}
        </p>
      </div>
    </form>
  );
}
