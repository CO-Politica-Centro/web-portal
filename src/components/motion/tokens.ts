export const MOTION = {
  duration: 1.05,
  hideDuration: 0.85,
  introDuration: 1.1,
  introStagger: 0.12,
  stagger: 0.12,
  ease: "power3.out",
  hideEase: "power2.in",
  revealStart: "top 85%",
  // Leave while some of the block is still on screen (not already off-canvas).
  revealEnd: "bottom 38%",
  amount: 88,
  introAmount: 96,
  scaleFrom: 0.88,
} as const;

export type RevealVariant = "up" | "down" | "left" | "right" | "fade";

export type VariantFromVars = {
  x?: number;
  y?: number;
};

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
