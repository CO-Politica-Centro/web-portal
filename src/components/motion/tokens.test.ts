import { describe, expect, it } from "vitest";
import { MOTION, variantFrom } from "@/components/motion/tokens";

describe("variantFrom", () => {
  it("maps directional variants to offsets", () => {
    expect(variantFrom("up", MOTION.amount)).toEqual({ y: MOTION.amount });
    expect(variantFrom("down", MOTION.amount)).toEqual({ y: -MOTION.amount });
    expect(variantFrom("left", MOTION.amount)).toEqual({ x: -MOTION.amount });
    expect(variantFrom("right", MOTION.amount)).toEqual({ x: MOTION.amount });
  });

  it("returns empty vars for fade", () => {
    expect(variantFrom("fade", MOTION.amount)).toEqual({});
  });

  it("exposes intro timing tokens", () => {
    expect(MOTION.introDuration).toBeGreaterThan(MOTION.duration);
    expect(MOTION.introStagger).toBeGreaterThanOrEqual(MOTION.stagger);
    expect(MOTION.introAmount).toBeGreaterThan(MOTION.amount);
    expect(MOTION.hideDuration).toBeLessThan(MOTION.duration);
    expect(MOTION.scaleFrom).toBeLessThan(1);
  });
});
