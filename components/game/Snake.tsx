"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";

const COLS = 24;
const ROWS = 16;
const START_STEP = 130;
const MIN_STEP = 65;
const BEST_KEY = "snake-best";

type Cell = { x: number; y: number };
type Food = Cell & { name: string };
type Status = "idle" | "running" | "paused" | "over";
type Direction = "up" | "down" | "left" | "right";

const DIRS: Record<Direction, Cell> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const KEYS: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

/** Snake that eats technologies. Arrow keys / WASD, Space to start or pause, swipe on phones. */
export default function Snake({ foods }: { foods: string[] }) {
  const board = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const game = useRef({
    snake: [] as Cell[],
    dir: DIRS.right,
    next: DIRS.right,
    food: { x: 0, y: 0, name: "" } as Food,
    step: START_STEP,
    acc: 0,
    last: 0,
    cell: 20,
    dpr: 1,
  });
  const statusRef = useRef<Status>("idle");
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [eaten, setEaten] = useState<string[]>([]);

  const setGameStatus = (next: Status) => {
    statusRef.current = next;
    setStatus(next);
  };

  // ---------- drawing ----------
  const draw = useCallback(() => {
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    const g = game.current;
    if (!cv || !ctx || g.snake.length === 0) return;

    const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || "#009ddd";
    const { cell, dpr } = g;
    const ox = (cv.width - cell * COLS) / 2;
    const oy = (cv.height - cell * ROWS) / 2;
    const rect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
    };

    ctx.clearRect(0, 0, cv.width, cv.height);

    ctx.fillStyle = "rgba(255,255,255,.07)";
    for (let x = 0; x < COLS; x++)
      for (let y = 0; y < ROWS; y++)
        ctx.fillRect(ox + x * cell + cell / 2 - dpr, oy + y * cell + cell / 2 - dpr, 2 * dpr, 2 * dpr);

    // food + its label
    const fx = ox + g.food.x * cell;
    const fy = oy + g.food.y * cell;
    ctx.fillStyle = "#fff";
    rect(fx + cell * 0.18, fy + cell * 0.18, cell * 0.64, cell * 0.64, cell * 0.18);
    const nearRight = g.food.x > COLS - 6;
    ctx.font = `500 ${Math.max(10 * dpr, cell * 0.5)}px ${getComputedStyle(cv).fontFamily}`;
    ctx.textAlign = nearRight ? "right" : "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255,255,255,.75)";
    ctx.fillText(g.food.name, nearRight ? fx - cell * 0.2 : fx + cell * 1.1, fy + cell / 2);

    // body fades towards the tail, head is white
    g.snake.forEach((s, i) => {
      ctx.globalAlpha = 0.35 + 0.65 * (1 - i / (g.snake.length + 4));
      ctx.fillStyle = i === 0 ? "#fff" : accent;
      const pad = i === 0 ? cell * 0.06 : cell * 0.12;
      rect(ox + s.x * cell + pad, oy + s.y * cell + pad, cell - pad * 2, cell - pad * 2, cell * 0.22);
    });
    ctx.globalAlpha = 1;

    // eyes
    const h = g.snake[0];
    const ex = ox + h.x * cell + cell / 2;
    const ey = oy + h.y * cell + cell / 2;
    ctx.fillStyle = "#00002b";
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(
        ex + g.dir.x * cell * 0.18 + g.dir.y * side * cell * 0.18,
        ey + g.dir.y * cell * 0.18 + g.dir.x * side * cell * 0.18,
        cell * 0.07,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
  }, []);

  // ---------- game state ----------
  const placeFood = useCallback(() => {
    const g = game.current;
    const free: Cell[] = [];
    for (let x = 0; x < COLS; x++)
      for (let y = 0; y < ROWS; y++) if (!g.snake.some((s) => s.x === x && s.y === y)) free.push({ x, y });
    const spot = free[(Math.random() * free.length) | 0];
    g.food = { ...spot, name: foods[(Math.random() * foods.length) | 0] };
  }, [foods]);

  const reset = useCallback(() => {
    const g = game.current;
    g.snake = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
    ];
    g.dir = DIRS.right;
    g.next = DIRS.right;
    g.step = START_STEP;
    setScore(0);
    setEaten([]);
    placeFood();
  }, [placeFood]);

  const gameOver = useCallback(
    (finalScore: number) => {
      setGameStatus("over");
      setBest((prev) => {
        if (finalScore <= prev) return prev;
        try {
          localStorage.setItem(BEST_KEY, String(finalScore));
        } catch {
          /* storage unavailable: keep the best score for this visit only */
        }
        return finalScore;
      });
      gsap.fromTo(board.current, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
    },
    [],
  );

  const tick = useCallback(() => {
    const g = game.current;
    g.dir = g.next;
    const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };
    const hitWall = head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS;
    if (hitWall || g.snake.some((s) => s.x === head.x && s.y === head.y)) {
      gameOver((g.snake.length - 3) * 10);
      return;
    }
    g.snake.unshift(head);
    if (head.x === g.food.x && head.y === g.food.y) {
      const name = g.food.name;
      setScore((g.snake.length - 3) * 10);
      setEaten((list) => (list.includes(name) ? list : [...list, name]));
      gsap.fromTo(board.current, { scale: 1.015 }, { scale: 1, duration: 0.3, ease: "power2.out" });
      g.step = Math.max(MIN_STEP, g.step - 3);
      placeFood();
    } else {
      g.snake.pop();
    }
    draw();
  }, [draw, gameOver, placeFood]);

  const loop = useCallback(
    (time: number) => {
      if (statusRef.current !== "running") return;
      const g = game.current;
      g.acc += Math.min(time - g.last, 100);
      g.last = time;
      while (g.acc >= g.step && statusRef.current === "running") {
        g.acc -= g.step;
        tick();
      }
      requestAnimationFrame(loop);
    },
    [tick],
  );

  const start = useCallback(() => {
    if (statusRef.current === "over" || statusRef.current === "idle") reset();
    setGameStatus("running");
    const g = game.current;
    g.acc = 0;
    g.last = performance.now();
    board.current?.focus({ preventScroll: true });
    requestAnimationFrame(loop);
  }, [loop, reset]);

  const pause = () => setGameStatus("paused");

  const turn = useCallback(
    (name: Direction) => {
      if (statusRef.current !== "running") start();
      const d = DIRS[name];
      const g = game.current;
      if (d.x === -g.dir.x && d.y === -g.dir.y) return;
      g.next = d;
    },
    [start],
  );

  // ---------- setup: size, best score, resize ----------
  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem(BEST_KEY) ?? 0));
    } catch {
      /* storage unavailable */
    }
    const size = () => {
      const cv = canvas.current;
      const el = board.current;
      if (!cv || !el) return;
      const g = game.current;
      g.dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(el.clientWidth * g.dpr);
      cv.height = Math.round(el.clientHeight * g.dpr);
      g.cell = Math.min(cv.width / COLS, cv.height / ROWS);
      draw();
    };
    reset();
    size();
    document.fonts?.ready.then(draw);
    window.addEventListener("resize", size);
    return () => {
      window.removeEventListener("resize", size);
      statusRef.current = "idle";
    };
  }, [draw, reset]);

  // ---------- input ----------
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (statusRef.current === "running") pause();
      else start();
      return;
    }
    const dir = KEYS[e.key] ?? KEYS[e.key.toLowerCase()];
    if (dir) {
      e.preventDefault();
      turn(dir);
    }
  };

  const swipe = useRef({ x: 0, y: 0 });
  const onTouchStart = (e: React.TouchEvent) => {
    swipe.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - swipe.current.x;
    const dy = t.clientY - swipe.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    turn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up");
  };

  // Stop the page from scrolling while swiping during a game.
  useEffect(() => {
    const el = board.current;
    if (!el) return;
    const block = (e: TouchEvent) => {
      if (statusRef.current === "running") e.preventDefault();
    };
    el.addEventListener("touchmove", block, { passive: false });
    return () => el.removeEventListener("touchmove", block);
  }, []);

  const message =
    status === "idle"
      ? { title: "Snake", text: "Press Space or tap to start" }
      : status === "paused"
        ? { title: "Paused", text: "Press Space or tap to resume" }
        : status === "over"
          ? { title: "Game over", text: `Score ${score} · ${eaten.length} technologies eaten · tap to retry` }
          : null;

  return (
    <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div
        ref={board}
        tabIndex={0}
        role="application"
        aria-label="Snake game. Arrow keys or WASD to move, Space to start or pause."
        onKeyDown={onKeyDown}
        onClick={() => statusRef.current !== "running" && start()}
        onBlur={() => statusRef.current === "running" && pause()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative aspect-[3/2] max-w-full overflow-hidden rounded-2xl border border-white/15 bg-surface-deep outline-none focus-visible:border-accent"
      >
        <canvas ref={canvas} className="block size-full touch-none" />
        {message && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-deep/80 p-5 text-center">
            <strong className="font-display text-[clamp(24px,4vw,40px)] uppercase">{message.title}</strong>
            <span className="text-[13px] text-white/60">{message.text}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Score", score],
            ["Best", best],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-0.5 rounded-xl border border-white/15 px-4 py-3.5">
              <span className="label">{label}</span>
              <b className="font-display text-[32px] tabular-nums">{value}</b>
            </div>
          ))}
        </div>

        <div>
          <p className="label mb-2.5">Eaten so far</p>
          <div className="flex min-h-[34px] flex-wrap gap-2">
            {eaten.length === 0 ? (
              <em className="text-xs not-italic text-white/60">Nothing yet.</em>
            ) : (
              eaten.map((name) => (
                <span key={name} className="rounded-full border border-accent px-2.5 py-1 text-xs text-accent">
                  {name}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="grid w-max grid-cols-3 grid-rows-2 gap-2" aria-label="Direction controls">
          {(
            [
              ["up", "↑", "col-start-2"],
              ["left", "←", "col-start-1 row-start-2"],
              ["down", "↓", "col-start-2 row-start-2"],
              ["right", "→", "col-start-3 row-start-2"],
            ] as const
          ).map(([dir, arrow, pos]) => (
            <button
              key={dir}
              type="button"
              aria-label={dir}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => turn(dir)}
              className={`${pos} size-[52px] touch-manipulation rounded-xl border border-white/15 bg-surface text-lg font-bold active:bg-accent active:text-primary`}
            >
              {arrow}
            </button>
          ))}
        </div>

        <p className="text-xs leading-loose text-white/60">
          Arrows or WASD to move · Space to start / pause · swipe on phone
        </p>
      </div>
    </div>
  );
}
