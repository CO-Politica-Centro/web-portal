export const MOTION = {
  duration: 0.65,
  introDuration: 0.7,
  stagger: 0.06,
  ease: "power2.out",
  revealStart: "top 85%",
  revealEnd: "bottom 12%",
  amount: 28,
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
