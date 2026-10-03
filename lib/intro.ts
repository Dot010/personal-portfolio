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

const REPLAY = "intro:replay";

/** Plays the loader and hero intro again (footer "Replay intro"). */
export const replayIntro = () => {
  delete document.documentElement.dataset.intro;
  window.dispatchEvent(new Event(REPLAY));
};

export const onIntroReplay = (callback: () => void) => {
  window.addEventListener(REPLAY, callback);
  return () => window.removeEventListener(REPLAY, callback);
};
