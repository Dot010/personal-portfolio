"use client";

import { useRef } from "react";

import SectionHead from "@/components/common/SectionHead";
import Reveal from "@/components/fx/Reveal";
import { aboutText, education, facts, goals, record } from "@/data/dossier";
import { arsenal } from "@/data/stack";
import { cn } from "@/lib/utils";

const levelColor = { Daily: "text-accent", Working: "text-white/75", Familiar: "text-white/55" } as const;
const recordBadge = {
  Shipped: "border-accent text-accent",
  Now: "border-accent bg-accent text-primary",
  Next: "border-white/15 text-white/60",
} as const;

const Dossier = () => {
  const root = useRef<HTMLElement>(null);

  return (
    <section ref={root} id="dossier" className="py-[clamp(80px,12vw,140px)]">
      <div className="wrap">
        <SectionHead title="Dossier" fig="Fig. 05 — About" />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-16">
          {/* Left: who, arsenal, record */}
          <div className="min-w-0">
            <p className="dossier-about mb-9 text-[clamp(19px,2.2vw,24px)] leading-relaxed">{aboutText}</p>

            <dl className="grid grid-cols-[110px_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-sm">
              {facts.map((fact) => (
                <div key={fact.fieldName} className="contents">
                  <dt className="text-white/60">{fact.fieldName}</dt>
                  <dd className={cn("break-words", fact.fieldValue === "Available" && "text-accent")}>
                    {fact.fieldValue}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="label mt-11 mb-4">Arsenal</p>
            <Reveal stagger=":scope > div" y={20} className="flex flex-col gap-3.5">
              {arsenal.map((group) => (
                <div key={group.level} className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-3">
                  <span className={cn("text-xs tracking-[0.08em]", levelColor[group.level])}>[{group.level}]</span>
                  <ul className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className={cn(
                          "rounded-full border px-3 py-1 text-[13px]",
                          item.highlight ? "border-accent text-accent" : "border-white/20",
                        )}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>

            <p className="label mt-11 mb-4">Record</p>
            <Reveal as="ul" stagger=":scope > li" y={20} className="grid gap-2.5">
              {record.map((item) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 rounded-xl border border-white/15 px-4 py-3.5"
                >
                  <b className="font-display text-sm font-bold uppercase tracking-[0.02em]">{item.title}</b>
                  <i
                    className={cn(
                      "row-span-2 self-center rounded-full border px-2.5 py-1 text-[11px] not-italic uppercase tracking-[0.1em]",
                      recordBadge[item.state],
                    )}
                  >
                    {item.state}
                  </i>
                  <small className="text-xs text-white/60">{item.detail}</small>
                </li>
              ))}
            </Reveal>
          </div>

          {/* Right: education timeline and goals */}
          <div className="min-w-0">
            <p className="label mb-5">Education</p>
            <div className="relative">
              <span aria-hidden="true" className="absolute top-1.5 bottom-1.5 left-0 w-0.5 bg-white/15" />
              <span
                aria-hidden="true"
                className="dossier-line absolute top-1.5 bottom-1.5 left-0 z-[1] w-0.5 origin-top bg-accent"
              />
              <ol className="flex flex-col gap-7.5 pl-8">
                {education.map((item) => (
                  <li key={item.course} className="dossier-step is-lit group relative flex flex-col gap-0.5">
                    <span
                      aria-hidden="true"
                      className="absolute top-[7px] -left-[37px] z-[2] size-3 rounded-full border-2 border-accent bg-background transition-colors duration-400 group-[.is-lit]:bg-accent"
                    />
                    <span className="text-[13px] text-accent">
                      {item.period}
                      {item.current ? (
                        <span className="ml-2 inline-block rounded-full bg-accent px-2 align-[2px] text-[10px] uppercase tracking-[0.12em] text-primary">
                          Now
                        </span>
                      ) : null}
                    </span>
                    <span className="text-lg font-bold">{item.course}</span>
                    <span className="text-[13px] text-white/60">{item.institution}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="label mt-11 mb-4">Goals — 2026</p>
            <ul className="text-sm">
              {goals.map((item) => (
                <li key={item.goal} className="flex justify-between gap-4 border-b border-white/10 py-3">
                  <span>{item.goal}</span>
                  <span className={cn("whitespace-nowrap", item.status === "In progress" ? "text-accent" : "text-white/60")}>
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dossier;
