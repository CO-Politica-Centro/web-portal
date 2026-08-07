"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: string;
};

export function Reveal({ children, className, stagger }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || reduced) return;

      const targets = stagger ? root.querySelectorAll(stagger) : [root];

      gsap.from(targets, {
        y: 32,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: stagger ? 0.06 : 0,
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [reduced, stagger] },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
