import { describe, expect, it } from "vitest";
import { isNavActive, normalizePathname } from "./nav";

describe("normalizePathname", () => {
  it("keeps root", () => {
    expect(normalizePathname("/")).toBe("/");
  });

  it("strips trailing slashes", () => {
    expect(normalizePathname("/propuestas/")).toBe("/propuestas");
  });
});

describe("isNavActive", () => {
  it("matches home only exactly", () => {
    expect(isNavActive("/", "/")).toBe(true);
    expect(isNavActive("/propuestas", "/")).toBe(false);
  });

  it("matches path and nested prefixes", () => {
    expect(isNavActive("/propuestas", "/propuestas")).toBe(true);
    expect(isNavActive("/propuestas/", "/propuestas")).toBe(true);
    expect(isNavActive("/propuestas/foo", "/propuestas")).toBe(true);
  });
});
