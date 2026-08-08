export type VolunteerCategoryId =
  "tech" | "diseno" | "legal" | "comunicacion" | "territorio" | "otro";

export type ProjectStatus = "recruiting" | "urgent" | "completed";

export type VolunteerProject = {
  id: string;
  category: VolunteerCategoryId;
  title: string;
  description: string;
  skills: string[];
  hoursLabel: string;
  slotsFilled: number;
  slotsTotal: number;
  status: ProjectStatus;
};

export type TalentProfile = {
  id: string;
  displayName: string;
  headline: string;
  categories: VolunteerCategoryId[];
  skills: string[];
  availability: string;
  bio: string;
};

export type CategoryFilter = "all" | VolunteerCategoryId;

export const VOLUNTEER_CATEGORIES: {
  id: CategoryFilter;
  label: string;
}[] = [
  { id: "all", label: "Todos" },
  { id: "tech", label: "Tech / Datos" },
  { id: "diseno", label: "Diseño" },
  { id: "legal", label: "Legal / Economía" },
  { id: "comunicacion", label: "Comunicación" },
  { id: "territorio", label: "Territorio" },
  { id: "otro", label: "Otro" },
];

export const CATEGORY_LABELS: Record<VolunteerCategoryId, string> = {
  tech: "Desarrollo",
  diseno: "Diseño",
  legal: "Legal",
  comunicacion: "Comunicación",
  territorio: "Territorio",
  otro: "Otro",
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  recruiting: "En reclutamiento",
  urgent: "Urgente",
  completed: "Completado",
};

export function filterProjects(
  projects: VolunteerProject[],
  category: CategoryFilter,
): VolunteerProject[] {
  if (category === "all") return projects;
  return projects.filter((project) => project.category === category);
}

export function filterTalents(
  talents: TalentProfile[],
  category: CategoryFilter,
): TalentProfile[] {
  if (category === "all") return talents;
  return talents.filter((talent) => talent.categories.includes(category));
}

export function projectProgress(project: VolunteerProject): number {
  if (project.slotsTotal <= 0) return 0;
  return Math.min(
    100,
    Math.round((project.slotsFilled / project.slotsTotal) * 100),
  );
}
