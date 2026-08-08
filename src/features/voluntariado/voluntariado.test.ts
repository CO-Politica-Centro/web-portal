import { describe, expect, it } from "vitest";
import {
  filterProjects,
  filterTalents,
  projectProgress,
} from "@/features/voluntariado/types";
import { SEED_PROJECTS, SEED_TALENTS } from "@/features/voluntariado/seed";

describe("voluntariado filters", () => {
  it("filtra proyectos por categoría", () => {
    const tech = filterProjects(SEED_PROJECTS, "tech");
    expect(tech.length).toBeGreaterThan(0);
    expect(tech.every((p) => p.category === "tech")).toBe(true);
  });

  it("filtra talentos por categoría", () => {
    const legal = filterTalents(SEED_TALENTS, "legal");
    expect(legal).toHaveLength(1);
    expect(legal[0]?.displayName).toBe("Laura V.");
  });

  it("calcula progreso de cupos", () => {
    expect(
      projectProgress({
        id: "x",
        category: "tech",
        title: "t",
        description: "d",
        skills: [],
        hoursLabel: "1h",
        slotsFilled: 2,
        slotsTotal: 4,
        status: "recruiting",
      }),
    ).toBe(50);
  });
});
