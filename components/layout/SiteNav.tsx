"use client";

import { useCallback, useState } from "react";

import Dock from "./Dock";
import Menu from "./Menu";

/** Bottom dock plus the full-screen menu it opens. */
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <Dock menuOpen={open} onMenu={() => setOpen(true)} />
      <Menu open={open} onClose={close} />
    </>
  );
}
