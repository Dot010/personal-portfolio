"use client";

import Image from "next/image";
import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

const Photo = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".photo-frame", { autoAlpha: 0, duration: 0.6, delay: 0.2, ease: "power2.out" });
        gsap.from(".photo-image", { autoAlpha: 0, duration: 0.6, delay: 0.5, ease: "power2.inOut" });

        gsap.set(".photo-ring", { strokeDasharray: "24 10 0 0", transformOrigin: "50% 50%" });
        gsap.to(".photo-ring", {
          keyframes: [
            { strokeDasharray: "15 120 25 25", rotation: 120 },
            { strokeDasharray: "16 25 92 72", rotation: 240 },
            { strokeDasharray: "4 250 22 22", rotation: 360 },
          ],
          duration: 20,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="w-full h-full relative">
      <div className="photo-frame">
        <div className="photo-image absolute w-74.5 aspect-square xl:w-120 mix-blend-lighten rounded-full overflow-hidden">
          <Image
            src="/assets/CvPhoto.png"
            priority
            fill
            sizes="(min-width: 1280px) 480px, 300px"
            alt="Portrait of Jonathan Carvalho"
            className="object-cover brightness-85"
            style={{ objectPosition: "30% 0%", transform: "translateY(-10%)" }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.85) 70%, #1a1a1a 100%)",
            }}
          />
        </div>

        <svg
          className="w-75 xl:w-126.5 h-75 xl:h-126.5"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            className="photo-ring"
            cx="253"
            cy="253"
            r="250"
            stroke="#009ddd"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Photo;
