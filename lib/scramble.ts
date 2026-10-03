import { gsap } from "@/lib/gsap";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

/** Types the element's text in from random glyphs, like a terminal. Returns the tween. */
export function scramble(el: HTMLElement, duration = 0.9) {
  const final = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = final;
  const state = { p: 0 };

  return gsap.to(state, {
    p: 1,
    duration,
    ease: "none",
    onUpdate: () => {
      const shown = Math.floor(final.length * state.p);
      let out = "";
      for (let i = 0; i < final.length; i++) {
        const ch = final[i];
        out += i < shown || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = final;
    },
  });
}
