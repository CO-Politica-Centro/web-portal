"use client";

import {
  CATEGORY_LABELS,
  type TalentProfile,
} from "@/features/voluntariado/types";

type TalentCardProps = {
  talent: TalentProfile;
};

export function TalentCard({ talent }: TalentCardProps) {
  return (
    <article className="border-foreground/10 bg-surface flex h-full flex-col rounded-xl border p-5 shadow-[0_8px_24px_rgb(0_0_0_/0.04)]">
      <p className="text-muted text-sm font-semibold tracking-wide uppercase">
        Perfil voluntario
      </p>
      <h3 className="mt-2 text-xl font-semibold">{talent.displayName}</h3>
      <p className="text-brand-green mt-1 text-sm font-semibold">
        {talent.headline}
      </p>
      <p className="text-muted mt-3 flex-1 text-base leading-relaxed">
        {talent.bio}
      </p>
      <p className="text-muted mt-3 text-sm">
        Disponibilidad: {talent.availability}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {talent.categories.map((category) => (
          <li
            key={category}
            className="border-foreground/10 rounded-md border px-2.5 py-1 text-xs font-semibold"
          >
            {CATEGORY_LABELS[category]}
          </li>
        ))}
        {talent.skills.map((skill) => (
          <li
            key={skill}
            className="bg-foreground/5 rounded-md px-2.5 py-1 text-xs font-semibold"
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}
