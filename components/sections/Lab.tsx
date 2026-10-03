import SectionHead from "@/components/common/SectionHead";
import Reveal from "@/components/fx/Reveal";
import { labProjects } from "@/data/projects";

const Lab = () => {
  return (
    <section id="lab" data-fig="Fig. 03 — Lab" className="py-[clamp(80px,12vw,140px)]">
      <div className="wrap">
        <SectionHead title="The lab" fig="Fig. 03 — Work in progress" />

        <Reveal stagger=":scope > *" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
          {labProjects.map((project) => (
            <a
              key={project.title}
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-3 rounded-2xl bg-surface p-8 transition-transform duration-400 hover:-translate-y-1.5"
            >
              <span className="text-xs text-accent">[{project.tag}]</span>
              <strong className="font-display text-2xl">{project.title}</strong>
              <p className="text-sm text-white/65">{project.description}</p>
              <small className="text-xs text-white/45">{project.summary}</small>
            </a>
          ))}

          <a
            href="#contact"
            className="flex flex-col justify-center gap-3 rounded-2xl border border-dashed border-white/25 p-8 transition-colors hover:border-accent"
          >
            <span className="text-xs text-white/60">[next]</span>
            <strong className="font-display text-2xl text-white/60">Your next project</strong>
            <small className="text-xs text-white/50">Got an idea? Let&apos;s build it.</small>
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Lab;
