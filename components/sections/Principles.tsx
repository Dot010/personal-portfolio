import SectionHead from "@/components/common/SectionHead";
import Reveal from "@/components/fx/Reveal";
import { principles } from "@/data/principles";

const Principles = () => {
  return (
    <section id="principles" data-fig="Fig. 06 — Principles" className="py-[clamp(80px,12vw,140px)]">
      <div className="wrap">
        <SectionHead title="How I work" fig="Fig. 06 — Principles" />

        <Reveal
          as="ul"
          stagger=":scope > li"
          className="grid grid-cols-1 border-t border-white/15 md:grid-cols-3"
        >
          {principles.map((item, i) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 py-9 max-md:border-t max-md:border-white/15 max-md:first:border-t-0 md:pr-7 md:[&+li]:border-l md:[&+li]:border-white/15 md:[&+li]:pl-7"
            >
              <span className="text-[13px] text-accent">/{String(i + 1).padStart(2, "0")}</span>
              <strong className="font-display text-[26px]">{item.title}</strong>
              <p className="text-sm text-white/65">{item.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Principles;
