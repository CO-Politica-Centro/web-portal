"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import {
  MOTION,
  variantExit,
  variantFrom,
  type RevealMode,
  type RevealVariant,
} from "@/components/motion/tokens";

gsap.registerPlugin(ScrollTrigger, useGSAP);

let refreshBound = false;

function bindScrollTriggerRefresh() {
  if (refreshBound || typeof window === "undefined") return;
  refreshBound = true;
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh, { once: true });
  void document.fonts?.ready.then(refresh);
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  /** Kept for `once` tweens only. */
  delay?: number;
  once?: boolean;
  /** `enter` (default): scrub in and stay. `through`: scrub in → out (single target). */
  mode?: RevealMode;
  amount?: number;
  stagger?: string;
  as?: "div" | "section";
};

function resolveTargets(
  root: HTMLElement,
  stagger: string | undefined,
): HTMLElement[] {
  const heads = gsap.utils.toArray<HTMLElement>(
    root.querySelectorAll("[data-reveal-head]"),
  );
  if (stagger) {
    const items = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(stagger),
    );
    const merged = [...heads, ...items];
    if (merged.length > 0) return merged;
  } else if (heads.length > 0) {
    return heads;
  }

  const content = root.querySelector<HTMLElement>("[data-reveal-content]");
  return content ? [content] : [];
}

function hiddenVars(variant: RevealVariant, amount: number) {
  const base = {
    ...variantFrom(variant, amount),
    autoAlpha: 0,
    transformOrigin: "50% 50%",
  };
  if (variant === "fade") return base;
  return { ...base, scale: MOTION.scaleFrom };
}

function shownVars(variant: RevealVariant) {
  if (variant === "fade") {
    return { x: 0, y: 0, autoAlpha: 1 };
  }
  return { x: 0, y: 0, scale: 1, autoAlpha: 1 };
}

function exitVars(variant: RevealVariant, amount: number) {
  const base = {
    ...variantExit(variant, amount),
    autoAlpha: 0,
  };
  if (variant === "fade") return base;
  return { ...base, scale: MOTION.scaleFrom };
}

function scrubEnterElement(
  el: HTMLElement,
  hidden: gsap.TweenVars,
  shown: gsap.TweenVars,
) {
  gsap.fromTo(el, hidden, {
    ...shown,
    ease: "none",
    immediateRender: false,
    scrollTrigger: {
      trigger: el,
      start: MOTION.enterStart,
      end: MOTION.enterEnd,
      scrub: MOTION.scrub,
      invalidateOnRefresh: true,
    },
  });
}

function scrubThroughElement(
  el: HTMLElement,
  hidden: gsap.TweenVars,
  shown: gsap.TweenVars,
  exit: gsap.TweenVars,
) {
  const enterDur = MOTION.scrubEnter;
  const exitDur = MOTION.scrubExit;
  const exitAt = 1 - exitDur;

  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: MOTION.throughStart,
        end: MOTION.throughEnd,
        scrub: MOTION.scrub,
        invalidateOnRefresh: true,
      },
    })
    .fromTo(el, hidden, { ...shown, duration: enterDur }, 0)
    .to(el, { ...exit, duration: exitDur }, exitAt);
}

export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  once = false,
  mode = "enter",
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

      bindScrollTriggerRefresh();

      if (reduced) {
        root.classList.remove("is-pending");
        return;
      }

      const targets = resolveTargets(root, stagger);
      if (targets.length === 0) {
        root.classList.remove("is-pending");
        return;
      }

      const hidden = hiddenVars(variant, amount);
      const shown = shownVars(variant);
      const exit = exitVars(variant, amount);
      const perElement = targets.length > 1;

      gsap.set(targets, hidden);
      root.classList.remove("is-pending");

      if (once) {
        for (const el of targets) {
          const show = () =>
            gsap.to(el, {
              ...shown,
              duration: MOTION.duration,
              ease: MOTION.ease,
              delay,
              overwrite: "auto",
            });

          const st = ScrollTrigger.create({
            trigger: el,
            start: MOTION.enterStart,
            once: true,
            onEnter: show,
            invalidateOnRefresh: true,
          });

          if (st.isActive) show();
        }
        return;
      }

      // Multi-target: each element owns its ScrollTrigger (no shared section scrub).
      // through + multi → enter-per-item (avoid mid-section mass exit).
      if (perElement) {
        for (const el of targets) {
          scrubEnterElement(el, hidden, shown);
        }
        return;
      }

      const [only] = targets;

      if (mode === "through") {
        scrubThroughElement(only, hidden, shown, exit);
        return;
      }

      scrubEnterElement(only, hidden, shown);
    },
    {
      scope: ref,
      dependencies: [reduced, stagger, variant, delay, once, amount, mode],
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
