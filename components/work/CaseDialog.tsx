"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import { useEffect } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";

import { getLenis } from "@/lib/lenis";
import type { Project } from "@/types";

type CaseDialogProps = {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** Case file for a project: slides up from the bottom with details, screenshot and links. */
export default function CaseDialog({ project, open, onOpenChange }: CaseDialogProps) {
  // Pause smooth scrolling while the dialog is open so the page behind stays put.
  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#0a0a0e]/70 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          data-lenis-prevent
          className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[min(88vh,860px)] w-full max-w-[1100px] overflow-auto overscroll-contain rounded-t-3xl border border-b-0 border-white/15 bg-background p-[clamp(20px,4vw,40px)] pb-[calc(clamp(20px,4vw,40px)+env(safe-area-inset-bottom,0px))] outline-none duration-500 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom"
        >
          <>
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="label">[ Case {project.num} ]</span>
                <Dialog.Close className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-surface px-4 py-2.5 text-[13px]">
                  <FiX /> Close
                </Dialog.Close>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="min-w-0">
                  <Dialog.Title className="mb-4 font-display text-[clamp(30px,5vw,56px)] font-extrabold leading-none tracking-[-0.02em]">
                    {project.title}
                  </Dialog.Title>
                  <Dialog.Description className="mb-5 text-white/80">{project.description}</Dialog.Description>

                  <dl className="mb-6 grid grid-cols-[90px_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-sm">
                    <dt className="text-white/60">Role</dt>
                    <dd>{project.role}</dd>
                    <dt className="text-white/60">Type</dt>
                    <dd>{project.kind}</dd>
                    <dt className="text-white/60">Stack</dt>
                    <dd>{project.stack.map((s) => s.name).join(", ")}</dd>
                    <dt className="text-white/60">Status</dt>
                    <dd className={project.status === "Live" ? "text-accent" : ""}>{project.status}</dd>
                  </dl>

                  <ul className="mb-7 flex flex-col gap-2 text-sm">
                    {project.highlights.map((item) => (
                      <li key={item}>
                        <span className="text-accent">→ </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-primary"
                    >
                      Live project <FiArrowUpRight />
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm"
                      >
                        Source on GitHub <FiArrowUpRight />
                      </a>
                    )}
                  </div>
                </div>

                <div className="relative aspect-[16/10] min-w-0 overflow-hidden rounded-xl bg-surface-deep">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    sizes="(min-width: 768px) 520px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
          </>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
