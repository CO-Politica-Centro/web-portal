export const MOTION = {
  duration: 0.7,
  introDuration: 0.85,
  introStagger: 0.1,
  stagger: 0.07,
  ease: "power2.out",
  revealStart: "top 88%",
  revealEnd: "bottom 12%",
  amount: 40,
  introAmount: 48,
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
