export const MOTION = {
  duration: 1.05,
  hideDuration: 0.85,
  introDuration: 1.1,
  introStagger: 0.12,
  stagger: 0.1,
  ease: "power3.out",
  hideEase: "power2.in",
  /** Smooth lag for scroll-linked reveals (seconds of catch-up). */
  scrub: 0.4,
  /** Enter-only: short scrub so items are fully opaque while still low in the viewport. */
  enterStart: "top 92%",
  enterEnd: "top 75%",
  /** Through: full travel enter → hold → exit while scrolling the block. */
  throughStart: "top 92%",
  throughEnd: "bottom 12%",
  scrubEnter: 0.32,
  scrubExit: 0.28,
  amount: 72,
  introAmount: 80,
  scaleFrom: 0.9,
} as const;

export type RevealVariant = "up" | "down" | "left" | "right" | "fade";
export type RevealMode = "enter" | "through";

export type VariantFromVars = {
  x?: number;
  y?: number;
};

/** Hidden state for entering from off-screen. */
export function variantFrom(
  variant: RevealVariant,
  amount: number,
): VariantFromVars {
  switch (variant) {
    case "up":
      return { y: amount };
    case "down":
      return { y: -amount };
    case "left":
      return { x: -amount };
    case "right":
      return { x: amount };
    case "fade":
      return {};
  }
}

/** Exit state continuing with scroll-down direction (not rubber-band reverse). */
export function variantExit(
  variant: RevealVariant,
  amount: number,
): VariantFromVars {
  switch (variant) {
    case "up":
      return { y: -amount };
    case "down":
      return { y: amount };
    case "left":
      return { x: -amount };
    case "right":
      return { x: amount };
    case "fade":
      return {};
  }
}
