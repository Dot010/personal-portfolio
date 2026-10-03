// Lets the hero wait for the loader before playing its intro.
const EVENT = "intro:done";

export const markIntroDone = () => {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(EVENT));
};

/** Runs `callback` once the loader has finished (right away if it already has). Returns a cleanup. */
export const onIntroDone = (callback: () => void) => {
  if (document.documentElement.dataset.intro === "done") {
    callback();
    return () => {};
  }
  window.addEventListener(EVENT, callback, { once: true });
  return () => window.removeEventListener(EVENT, callback);
};
