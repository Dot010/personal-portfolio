import type Lenis from "lenis";

// The active Lenis instance, so overlays (dialogs, menus) can pause smooth scrolling.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
