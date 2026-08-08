import {
  colombiaDepartmentPaths,
  type ColombiaDepartmentPath,
} from "@/components/home/colombia-department-paths";

export type RegionLink = {
  label: string;
  href?: string;
  description?: string;
};

export function normalizeRegionLabel(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/&/g, "y")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function linksForDepartment(
  department: ColombiaDepartmentPath,
  groups: RegionLink[],
): RegionLink[] {
  if (department.id === "bogota") {
    return groups.filter((group) =>
      normalizeRegionLabel(group.label).startsWith("bogota"),
    );
  }

  const target = normalizeRegionLabel(department.name);
  return groups.filter((group) => {
    const label = normalizeRegionLabel(group.label);
    if (label.startsWith("bogota") || label === "internacional") return false;
    return label === target;
  });
}

export function findDepartment(id: string) {
  return colombiaDepartmentPaths.find((department) => department.id === id);
}

export function requestGroupMailto(email: string, regionLabel: string) {
  const subject = `Solicitud de grupo WhatsApp — ${regionLabel}`;
  const body = `Hola,\n\nQuisiera solicitar o reactivar el grupo de WhatsApp de ${regionLabel}.\n\nGracias.`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
