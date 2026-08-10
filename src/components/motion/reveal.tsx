"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import {
  MOTION,
  variantFrom,
  type RevealVariant,
} from "@/components/motion/tokens";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  once?: boolean;
  amount?: number;
  stagger?: string;
  as?: "div" | "section";
};

export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  once = false,
  amount = MOTION.amount,
  stagger,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || reduced) return;

      const targets = stagger ? root.querySelectorAll(stagger) : [root];
      if (stagger && targets.length === 0) return;

      const fromVars = {
        ...variantFrom(variant, amount),
        autoAlpha: 0,
      };

      // immediateRender: false avoids hiding content before ScrollTrigger decides.
      // clearProps only with once — clearing after toggle would break reverse.
      gsap.fromTo(targets, fromVars, {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: MOTION.duration,
        ease: MOTION.ease,
        delay,
        stagger: stagger ? MOTION.stagger : 0,
        immediateRender: false,
        ...(once ? { clearProps: "transform,opacity,visibility" } : {}),
        scrollTrigger: {
          trigger: root,
          start: MOTION.revealStart,
          ...(once
            ? { once: true }
            : { toggleActions: "play reverse play reverse" }),
        },
      });
    },
    {
      scope: ref,
      dependencies: [reduced, stagger, variant, delay, once, amount],
    },
  );

  if (Tag === "section") {
    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className={cn(className)}
      >
        {children}
      </section>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
