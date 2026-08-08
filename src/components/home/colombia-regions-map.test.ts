import { describe, expect, it } from "vitest";
import {
  findDepartment,
  linksForDepartment,
} from "@/components/home/colombia-region-links";
import { colombiaDepartmentPaths } from "@/components/home/colombia-department-paths";
import { site } from "@/content/site";

describe("mapa de grupos regionales", () => {
  it("cubre los 32 departamentos más Bogotá y San Andrés", () => {
    expect(colombiaDepartmentPaths).toHaveLength(33);
    expect(findDepartment("bogota")?.name).toBe("Bogotá");
    expect(findDepartment("san-andres")?.inset).toBe(true);
  });

  it("resuelve WhatsApp para departamentos y Bogotá I/II", () => {
    const { groups } = site.whatsappNetwork;
    const antioquia = findDepartment("antioquia");
    const valle = findDepartment("valle-del-cauca");
    const sanAndres = findDepartment("san-andres");
    const bogota = findDepartment("bogota");

    expect(antioquia && linksForDepartment(antioquia, groups)).toHaveLength(1);
    expect(valle && linksForDepartment(valle, groups)).toHaveLength(1);
    expect(sanAndres && linksForDepartment(sanAndres, groups)).toHaveLength(1);
    expect(
      bogota && linksForDepartment(bogota, groups)?.map((item) => item.label),
    ).toEqual(["Bogotá I", "Bogotá II"]);
  });
});
