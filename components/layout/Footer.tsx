import { site } from "@/data/site";

import ReplayIntro from "./ReplayIntro";

const colophon = [
  { label: "Colophon", value: "Set in Unbounded + JetBrains Mono" },
  { label: "Built with", value: "Next.js · GSAP · Lenis" },
  { label: "Hosted on", value: "Vercel" },
];

const Footer = () => {
  return (
    <footer className="mt-4 border-t border-white/10 pt-4">
      <div className="wrap">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-6 gap-y-5 border-t border-white/15 py-9">
        {colophon.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className="label">{item.label}</span>
            <b className="text-[13px] font-medium">{item.value}</b>
          </div>
        ))}
        <div className="flex flex-col gap-1">
          <span className="label">Secret</span>
          <b className="text-[13px] font-medium">
            Type{" "}
            {["g", "s", "a", "p"].map((key) => (
              <kbd key={key} className="mr-1 rounded border border-b-2 border-white/15 px-1.5 text-[11px]">
                {key}
              </kbd>
            ))}
          </b>
        </div>
      </div>
      </div>
      <div className="wrap flex flex-wrap items-center justify-between gap-4 pt-7 pb-[calc(96px+env(safe-area-inset-bottom,0px))] text-xs text-white/60">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <ReplayIntro />
        <a href="#home" className="transition-colors hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
