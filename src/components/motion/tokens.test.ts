import { describe, expect, it } from "vitest";
import { MOTION, variantExit, variantFrom } from "@/components/motion/tokens";

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
});

describe("variantExit", () => {
  it("continues with scroll-down direction for up", () => {
    expect(variantExit("up", MOTION.amount)).toEqual({ y: -MOTION.amount });
  });
});

describe("MOTION tokens", () => {
  it("exposes enter/through scrub settings", () => {
    expect(MOTION.introDuration).toBeGreaterThan(MOTION.duration);
    expect(MOTION.introAmount).toBeGreaterThan(MOTION.amount);
    expect(MOTION.scrub).toBeGreaterThan(0);
    expect(MOTION.scrub).toBeLessThanOrEqual(0.5);
    expect(MOTION.scrubEnter + MOTION.scrubExit).toBeLessThan(1);
    expect(MOTION.scaleFrom).toBeLessThan(1);
  });
});
