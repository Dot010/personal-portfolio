"use client";

import { replayIntro } from "@/lib/intro";

export default function ReplayIntro() {
  return (
    <button
      type="button"
      onClick={replayIntro}
      className="border-b border-accent pb-0.5 text-xs text-white"
    >
      Replay intro
    </button>
  );
}
