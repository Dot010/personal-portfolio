import SectionHead from "@/components/common/SectionHead";
import Reveal from "@/components/fx/Reveal";
import { junkArt, junkItems, type JunkItem } from "@/data/junkyard";
import { cn } from "@/lib/utils";

const Card = ({ item }: { item: JunkItem }) => (
  <>
    <div
      aria-hidden="true"
      style={{ background: junkArt[item.art] }}
      className="aspect-[16/10] origin-bottom brightness-80 contrast-90 grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.04] group-hover:filter-none group-focus-visible:filter-none"
    />
    <div className="flex flex-col gap-1.5 px-4.5 pt-4 pb-5">
      <div className="flex justify-between gap-2.5 text-[11px] tracking-[0.12em] text-white/60">
        <span>{item.code}</span>
        <em className="not-italic text-accent">[{item.tag}]</em>
      </div>
      <strong className={cn("font-display text-lg", item.placeholder && "text-white/45")}>{item.title}</strong>
      <p className={cn("text-[13px]", item.placeholder ? "text-white/45" : "text-white/60")}>{item.note}</p>
    </div>
  </>
);

const Junkyard = () => {
  return (
    <section id="junk" data-fig="Fig. 04 — Junkyard" className="py-[clamp(80px,12vw,140px)]">
      <div className="wrap">
        <SectionHead title="Junkyard" fig="Fig. 04 — Dead demos & sketches" />
        <p className="-mt-7 mb-9 text-[13px] text-white/60">
          Study projects, abandoned ideas and experiments. Hover to bring them back to life.
        </p>

        <Reveal stagger=":scope > *" className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-4.5">
          {junkItems.map((item) =>
            item.href ? (
              <a
                key={item.code}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-[14px] bg-surface"
              >
                <Card item={item} />
              </a>
            ) : (
              <div key={item.code} className="group flex flex-col overflow-hidden rounded-[14px] bg-surface">
                <Card item={item} />
              </div>
            ),
          )}
        </Reveal>

        <p className="label mt-7 text-center">[ end of junk ]</p>
      </div>
    </section>
  );
};

export default Junkyard;
