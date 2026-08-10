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
      if (!root) return;

      if (reduced) {
        root.classList.remove("is-pending");
        return;
      }

      const content = root.querySelector<HTMLElement>("[data-reveal-content]");
      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>(root.querySelectorAll(stagger))
        : content
          ? [content]
          : [];

      if (targets.length === 0) {
        root.classList.remove("is-pending");
        return;
      }

      const hidden = {
        ...variantFrom(variant, amount),
        autoAlpha: 0,
      };

      // Keep trigger (root) layout-stable; only animate inner targets.
      gsap.set(targets, hidden);
      root.classList.remove("is-pending");

      const show = () =>
        gsap.to(targets, {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: MOTION.duration,
          ease: MOTION.ease,
          delay,
          stagger: stagger ? MOTION.stagger : 0,
          overwrite: "auto",
        });

      const hide = () =>
        gsap.to(targets, {
          ...hidden,
          duration: MOTION.duration * 0.85,
          ease: MOTION.ease,
          stagger: stagger ? MOTION.stagger * 0.5 : 0,
          overwrite: "auto",
        });

      const st = ScrollTrigger.create({
        trigger: root,
        start: MOTION.revealStart,
        end: MOTION.revealEnd,
        onEnter: show,
        onEnterBack: show,
        ...(once
          ? { once: true }
          : {
              onLeave: hide,
              onLeaveBack: hide,
            }),
        invalidateOnRefresh: true,
      });

      // If already inside the active range on mount, fire enter once.
      if (st.isActive) show();
    },
    {
      scope: ref,
      dependencies: [reduced, stagger, variant, delay, once, amount],
    },
  );

  const inner = <div data-reveal-content>{children}</div>;
  const classes = cn("motion-reveal is-pending", className);

  if (Tag === "section") {
    return (
      <section ref={ref as React.RefObject<HTMLElement>} className={classes}>
        {inner}
      </section>
    );
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={classes}>
      {inner}
    </div>
  );
}
