"use client";

import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

/*
 * WebGL lens over the hero name.
 * Once `active`, the name is redrawn into a texture and rendered through a shader:
 * a magnifying bulge under the pointer (or finger), a ripple on tap, and a slight
 * colour split on the edges. The DOM text stays in place for layout and screen readers.
 */

const VERTEX = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

const FRAGMENT = `
precision highp float;
uniform sampler2D t; uniform vec2 res; uniform vec2 m; uniform float k; uniform float rad;
uniform vec2 rp; uniform float rt; uniform float ra; uniform float dpr;
vec4 tx(vec2 q){ vec2 uv=q/res; if(uv.x<0.||uv.y<0.||uv.x>1.||uv.y>1.) return vec4(0.); return texture2D(t,uv); }
void main(){
  vec2 p=gl_FragCoord.xy; vec2 d=p-m; float dist=length(d);
  float f=k*smoothstep(rad,0.,dist);
  vec2 sp=m+d*(1.-.42*f);
  vec2 rd=p-rp; float rl=length(rd); float front=rt*900.*dpr;
  float w=sin(rl*.045/dpr-rt*16.)*exp(-rt*2.4)*smoothstep(front+60.*dpr,front-160.*dpr,rl)*ra;
  sp+=normalize(rd+1e-4)*w*16.*dpr;
  vec2 dir=normalize(d+1e-4)*(f*7.+abs(w)*5.)*dpr;
  vec4 c=tx(sp); vec4 r=tx(sp+dir); vec4 b=tx(sp-dir);
  float a=max(c.a,max(r.a,b.a));
  vec3 col=vec3(r.r,c.g,b.b);
  col+=vec3(0.,.62,.87)*max(b.a-c.a,0.)*.9;
  gl_FragColor=vec4(col,a);
}`;

type Glyph = { ch: string; kind: "solid" | "outline" | "dot"; fs: number; x: number; top: number; h: number };

export default function HeroLens({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const h1 = cv?.parentElement;
    const section = h1?.closest("section");
    if (!active || !cv || !h1 || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = cv.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = Object.fromEntries(
      ["t", "res", "m", "k", "rad", "rp", "rt", "ra", "dpr"].map((n) => [n, gl.getUniformLocation(program, n)]),
    );

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const tex2d = document.createElement("canvas");
    const ctx = tex2d.getContext("2d")!;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || "#009ddd";
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const hidden = h1.querySelectorAll<HTMLElement>(".hero-first, .hero-last");

    let W = 0;
    let H = 0;
    let glyphs: Glyph[] = [];
    let solidBox = { x: 0, w: 0 };
    let fill = 0;
    const st = { k: 0, mx: -9999, my: -9999, rx: -9999, ry: -9999, rt: 9, ra: 0 };
    const mxTo = gsap.quickTo(st, "mx", { duration: 0.35, ease: "power3" });
    const myTo = gsap.quickTo(st, "my", { duration: 0.35, ease: "power3" });

    const textNodes = (el: Element | null) => {
      const out: Text[] = [];
      if (!el) return out;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        if (node.textContent?.trim()) out.push(node);
      }
      return out;
    };

    const measure = () => {
      const cr = cv.getBoundingClientRect();
      const scale = cr.width / cv.offsetWidth || 1;
      W = Math.round(cv.offsetWidth * dpr);
      H = Math.round(cv.offsetHeight * dpr);
      cv.width = tex2d.width = W;
      cv.height = tex2d.height = H;
      glyphs = [];
      const add = (node: Text, kind: Glyph["kind"]) => {
        const range = document.createRange();
        const fs = Number.parseFloat(getComputedStyle(node.parentElement!).fontSize);
        const text = node.textContent ?? "";
        for (let i = 0; i < text.length; i++) {
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const r = range.getBoundingClientRect();
          glyphs.push({
            ch: text[i].toUpperCase(),
            kind,
            fs,
            x: (r.left - cr.left) / scale,
            top: (r.top - cr.top) / scale,
            h: r.height / scale,
          });
        }
      };
      textNodes(h1.querySelector(".hero-first")).forEach((n) => add(n, "solid"));
      textNodes(h1.querySelector(".hero-outline")).forEach((n) => add(n, "outline"));
      textNodes(h1.querySelector(".hero-dot")).forEach((n) => add(n, "dot"));
      const sr = h1.querySelector(".hero-solid")?.getBoundingClientRect();
      if (sr) solidBox = { x: (sr.left - cr.left) / scale, w: sr.width / scale };
      gl.viewport(0, 0, W, H);
    };

    const drawGlyph = (g: Glyph, stroke: boolean) => {
      ctx.font = `800 ${g.fs * dpr}px ${getComputedStyle(h1).fontFamily}`;
      const m = ctx.measureText(g.ch);
      const asc = m.fontBoundingBoxAscent || g.fs * dpr * 0.95;
      const desc = m.fontBoundingBoxDescent || g.fs * dpr * 0.25;
      const y = g.top * dpr + (g.h * dpr - (asc + desc)) / 2 + asc;
      if (stroke) ctx.strokeText(g.ch, g.x * dpr, y);
      else ctx.fillText(g.ch, g.x * dpr, y);
    };

    const render = (force: boolean) => {
      st.rt += gsap.ticker.deltaRatio() / 60;
      if (!force && st.k < 0.002 && st.rt > 2) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1i(U.t, 0);
      gl.uniform2f(U.res, W, H);
      gl.uniform2f(U.m, st.mx * dpr, H - st.my * dpr);
      gl.uniform1f(U.k, st.k);
      gl.uniform1f(U.rad, Math.min(W, H) * 0.55);
      gl.uniform2f(U.rp, st.rx * dpr, H - st.ry * dpr);
      gl.uniform1f(U.rt, st.rt);
      gl.uniform1f(U.ra, st.ra);
      gl.uniform1f(U.dpr, dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const redraw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
      ctx.lineWidth = 2 * dpr;
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#fff";
      for (const g of glyphs) {
        ctx.fillStyle = g.kind === "dot" ? accent : "#fff";
        drawGlyph(g, g.kind === "outline");
      }
      if (fill > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, (solidBox.x + solidBox.w * fill) * dpr, H);
        ctx.clip();
        ctx.fillStyle = "#fff";
        for (const g of glyphs) if (g.kind === "outline") drawGlyph(g, false);
        ctx.restore();
      }
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex2d);
      render(true);
    };

    const local = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      const s = r.width / cv.offsetWidth || 1;
      return { x: (e.clientX - r.left) / s, y: (e.clientY - r.top) / s };
    };
    const onMove = (e: PointerEvent) => {
      const q = local(e);
      if (st.mx < -9000) {
        st.mx = q.x;
        st.my = q.y;
      }
      mxTo(q.x);
      myTo(q.y);
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") gsap.to(st, { k: 1, duration: 0.6, ease: "power3.out" });
    };
    const onLeave = () => gsap.to(st, { k: 0, duration: 0.8, ease: "power3.out" });
    const onDown = (e: PointerEvent) => {
      const q = local(e);
      st.mx = q.x;
      st.my = q.y;
      mxTo(q.x);
      myTo(q.y);
      st.rx = q.x;
      st.ry = q.y;
      st.rt = 0;
      st.ra = 1;
      if (e.pointerType !== "mouse") gsap.to(st, { k: 1, duration: 0.35, ease: "power3.out" });
      else gsap.fromTo(st, { k: 1.6 }, { k: 1, duration: 0.7, ease: "elastic.out(1,0.4)" });
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") gsap.to(st, { k: 0, duration: 0.9, ease: "power3.out" });
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        hidden.forEach((el) => (el.style.visibility = ""));
        measure();
        hidden.forEach((el) => (el.style.visibility = "hidden"));
        redraw();
      }, 150);
    };

    const tick = () => render(false);
    let fillTrigger: ScrollTrigger | null = null;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      measure();
      fillTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "60% top",
        onUpdate: (self) => {
          fill = self.progress;
          redraw();
        },
      });
      fill = fillTrigger.progress;
      hidden.forEach((el) => (el.style.visibility = "hidden"));
      redraw();
      gsap.fromTo(cv, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      // A gentle ripple from the middle hints that the name is interactive.
      st.rx = cv.offsetWidth * 0.5;
      st.ry = cv.offsetHeight * 0.5;
      st.rt = 0;
      st.ra = 0.6;
      gsap.ticker.add(tick);
    });

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerenter", onEnter);
    section.addEventListener("pointerleave", onLeave);
    section.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onLeave, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      fillTrigger?.kill();
      gsap.killTweensOf(st);
      window.clearTimeout(resizeTimer);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerenter", onEnter);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onLeave);
      window.removeEventListener("resize", onResize);
      hidden.forEach((el) => (el.style.visibility = ""));
      cv.style.opacity = "0";
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute -left-10 -top-10 block h-[calc(100%+80px)] w-[calc(100%+80px)] opacity-0"
    />
  );
}
