import Image from "next/image";

import SectionHead from "@/components/common/SectionHead";
import Reveal from "@/components/fx/Reveal";
import { junkyard } from "@/data/projects";

const Junkyard = () => {
  return (
    <section id="junk" data-fig="Fig. 04 — Junkyard" className="py-[clamp(80px,12vw,140px)]">
      <div className="wrap">
        <SectionHead title="Junkyard" fig="Fig. 04 — Dead demos & sketches" />
        <p className="-mt-7 mb-9 text-[13px] text-white/60">
          Study projects, abandoned ideas and experiments. Hover to bring them back to life.
        </p>

        <Reveal stagger=":scope > *" className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-4.5">
          {junkyard.map((item) => (
            <a
              key={item.title}
              href={item.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl bg-surface"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={`Screenshot of ${item.title}`}
                  fill
                  sizes="(min-width: 1024px) 280px, 100vw"
                  className="origin-bottom object-cover object-top brightness-80 contrast-90 grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.04] group-hover:filter-none group-focus-visible:filter-none"
                />
              </div>
              <div className="flex flex-col gap-1.5 px-4.5 pt-4 pb-5">
                <div className="flex justify-between gap-2.5 text-[11px] tracking-[0.12em] text-white/60">
                  <span>{item.num}</span>
                  <em className="not-italic text-accent">[{item.tag}]</em>
                </div>
                <strong className="font-display text-lg">{item.title}</strong>
                <p className="text-[13px] text-white/60">{item.note}</p>
              </div>
            </a>
          ))}
        </Reveal>

        <p className="label mt-7 text-center">[ end of junk ]</p>
      </div>
    </section>
  );
};

export default Junkyard;
