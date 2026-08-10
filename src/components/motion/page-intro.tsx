"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { MOTION } from "@/components/motion/tokens";

gsap.registerPlugin(useGSAP);

type PageIntroProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: string;
  delay?: number;
};

export function PageIntro({
  children,
  className,
  stagger = "[data-intro]",
  delay = 0,
}: PageIntroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      if (reduced) {
        root.classList.add("motion-intro-ready");
        return;
      }

      const matches = root.querySelectorAll(stagger);
      const targets = matches.length > 0 ? matches : [root];

      gsap.fromTo(
        targets,
        { y: MOTION.introAmount, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: MOTION.introDuration,
          ease: MOTION.ease,
          delay,
          stagger: matches.length > 0 ? MOTION.introStagger : 0,
          onComplete: () => {
            root.classList.add("motion-intro-ready");
            gsap.set(targets, { clearProps: "transform,opacity,visibility" });
          },
        },
      );
    },
    { scope: ref, dependencies: [reduced, stagger, delay] },
  );

  return (
    <div ref={ref} className={cn("motion-intro", className)}>
      {children}
    </div>
  );
}
