"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ParallaxLiteProps = {
  children: React.ReactNode;
  factor?: number;
  className?: string;
};

export function ParallaxLite({
  children,
  factor = 0.12,
  className,
}: ParallaxLiteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      gsap.to(el, {
        yPercent: factor * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [reduced, factor] },
  );

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
