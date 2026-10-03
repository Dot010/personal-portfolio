"use client";

import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import SectionHead from "@/components/common/SectionHead";
import Reveal from "@/components/fx/Reveal";
import CaseDialog from "@/components/work/CaseDialog";
import CursorPreview from "@/components/work/CursorPreview";
import { selectedWork as projects } from "@/data/projects";

const Work = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState(0);
  const [caseOpen, setCaseOpen] = useState(false);

  const openCase = (index: number) => {
    setSelected(index);
    setCaseOpen(true);
  };

  return (
    <section id="work" data-fig="Fig. 02 — Work" className="py-[clamp(80px,12vw,140px)]">
      <div className="wrap">
        <SectionHead title="Selected work" fig="Fig. 02 — Work" />
        <p className="-mt-7 mb-9 text-[13px] text-white/60">Hover a row to preview the work. Click to open the case file.</p>

        <div onPointerLeave={() => setHovered(null)}>
          <Reveal as="ul" stagger=":scope > li" y={30} className="border-t border-white/15">
            {projects.map((project, i) => (
              <li key={project.title} onPointerEnter={() => setHovered(i)}>
                <button
                  type="button"
                  onClick={() => openCase(i)}
                  className="group grid w-full grid-cols-[36px_minmax(0,1fr)_24px] items-center gap-5 border-b border-white/15 px-2 py-7 text-left transition-[padding,background-color] duration-500 ease-out hover:bg-white/[0.025] hover:pl-7 focus-visible:pl-7 sm:grid-cols-[48px_minmax(0,1fr)_auto_28px]"
                >
                  <span className="text-[13px] text-white/45 transition-colors group-hover:text-accent">{project.num}</span>
                  <span className="font-display text-[clamp(24px,3.6vw,44px)] font-bold leading-tight transition-colors group-hover:text-accent">
                    {project.title}
                  </span>
                  <span className="hidden text-right text-[13px] text-white/60 sm:block">
                    {project.category}
                    <small className="block text-[11px] text-white/40">{project.summary}</small>
                  </span>
                  <FiArrowUpRight className="text-[22px] text-white/45 transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-accent" />
                </button>
              </li>
            ))}
          </Reveal>
        </div>
      </div>

      <CursorPreview projects={projects} active={caseOpen ? null : hovered} />
      <CaseDialog project={projects[selected]} open={caseOpen} onOpenChange={setCaseOpen} />
    </section>
  );
};

export default Work;
