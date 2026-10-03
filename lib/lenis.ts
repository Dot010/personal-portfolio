import type Lenis from "lenis";

// The active Lenis instance, so overlays (dialogs, menus) can pause smooth scrolling.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

/** Glides to a section using its layout position, so reveal transforms don't shift the target. */
export const scrollToSection = (target: HTMLElement) => {
  let top = 0;
  for (let node: HTMLElement | null = target; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  if (instance) instance.scrollTo(top - margin, { duration: 1.2, force: true });
  else window.scrollTo({ top: top - margin, behavior: "smooth" });
};
