"use client";

import { useId, useMemo, useState, type KeyboardEvent } from "react";
import {
  COLOMBIA_MAP_VIEWBOX,
  colombiaDepartmentPaths,
  type ColombiaDepartmentPath,
} from "@/components/home/colombia-department-paths";
import {
  findDepartment,
  linksForDepartment,
  requestGroupMailto,
  type RegionLink,
} from "@/components/home/colombia-region-links";
import { ExternalLink } from "@/components/layout/external-link";
import { cn } from "@/lib/utils";

type ColombiaRegionsMapProps = {
  groups: RegionLink[];
  beaconsHref: string;
  email: string;
  international?: RegionLink;
};

type PanelState =
  | { kind: "empty" }
  | { kind: "region"; department: ColombiaDepartmentPath; links: RegionLink[] }
  | { kind: "international"; link: RegionLink };

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide uppercase",
        active
          ? "bg-brand-green/15 text-brand-green"
          : "bg-foreground/8 text-muted",
      )}
    >
      {active ? "Activo" : "Por solicitar"}
    </span>
  );
}

export function ColombiaRegionsMap({
  groups,
  beaconsHref,
  email,
  international,
}: ColombiaRegionsMapProps) {
  const mapLabelId = useId();
  const panelId = useId();
  const selectId = useId();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showInternational, setShowInternational] = useState(false);

  const selectedDepartment = useMemo(
    () => (selectedId ? findDepartment(selectedId) : null) ?? null,
    [selectedId],
  );

  const panel: PanelState = useMemo(() => {
    if (showInternational && international) {
      return { kind: "international", link: international };
    }
    if (!selectedDepartment) return { kind: "empty" };
    return {
      kind: "region",
      department: selectedDepartment,
      links: linksForDepartment(selectedDepartment, groups),
    };
  }, [groups, international, selectedDepartment, showInternational]);

  function selectDepartment(id: string) {
    setShowInternational(false);
    setSelectedId(id);
  }

  function selectInternational() {
    setSelectedId(null);
    setShowInternational(true);
  }

  function onPathKeyDown(event: KeyboardEvent<SVGPathElement>, id: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectDepartment(id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label htmlFor={selectId} className="sr-only">
          Buscar departamento
        </label>
        <select
          id={selectId}
          className="border-foreground/15 bg-surface focus-visible:border-brand-green w-full max-w-md rounded-md border px-3 py-2.5 text-sm"
          value={showInternational ? "internacional" : (selectedId ?? "")}
          onChange={(event) => {
            const value = event.target.value;
            if (!value) {
              setSelectedId(null);
              setShowInternational(false);
              return;
            }
            if (value === "internacional") {
              selectInternational();
              return;
            }
            selectDepartment(value);
          }}
        >
          <option value="">Elige un departamento…</option>
          {colombiaDepartmentPaths.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
          {international ? (
            <option value="internacional">Diáspora / Internacional</option>
          ) : null}
        </select>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="bg-surface border-foreground/10 relative overflow-hidden rounded-xl border p-3 sm:p-4">
            <p id={mapLabelId} className="sr-only">
              Mapa interactivo de departamentos de Colombia. Selecciona un
              departamento para ver el grupo de WhatsApp.
            </p>
            <svg
              viewBox={COLOMBIA_MAP_VIEWBOX}
              role="group"
              aria-labelledby={mapLabelId}
              aria-controls={panelId}
              className="text-muted mx-auto h-auto w-full max-w-lg"
            >
              {colombiaDepartmentPaths.map((department) => {
                const selected =
                  !showInternational && selectedId === department.id;
                return (
                  <path
                    key={department.id}
                    d={department.d}
                    tabIndex={0}
                    role="button"
                    aria-label={department.name}
                    aria-pressed={selected}
                    onClick={() => selectDepartment(department.id)}
                    onKeyDown={(event) => onPathKeyDown(event, department.id)}
                    className={cn(
                      "stroke-foreground/25 cursor-pointer transition-[fill,stroke,filter] duration-150 outline-none",
                      "fill-foreground/[0.06] hover:fill-brand-green/35",
                      "focus-visible:stroke-brand-green focus-visible:stroke-[2.5]",
                      selected &&
                        "fill-brand-green/55 stroke-brand-green stroke-[1.75]",
                      department.inset && "stroke-foreground/40",
                    )}
                  />
                );
              })}
              <rect
                x="8"
                y="16"
                width="104"
                height="88"
                rx="6"
                className="stroke-foreground/25 fill-none stroke-[1.5]"
                aria-hidden="true"
              />
              <text
                x="60"
                y="108"
                textAnchor="middle"
                fill="currentColor"
                fontSize="11"
                aria-hidden="true"
              >
                San Andrés
              </text>
            </svg>
          </div>

          {international ? (
            <button
              type="button"
              onClick={selectInternational}
              aria-pressed={showInternational}
              className={cn(
                "border-foreground/10 bg-surface hover:border-brand-green/50 w-full cursor-pointer rounded-xl border px-5 py-4 text-left transition-colors",
                showInternational && "border-brand-green/60 bg-brand-green/10",
              )}
            >
              <p className="font-display text-lg font-semibold">
                Diáspora / Internacional
              </p>
              <p className="text-muted mt-1 text-sm leading-relaxed">
                Grupo de WhatsApp para quienes siguen el movimiento desde fuera
                de Colombia.
              </p>
            </button>
          ) : null}
        </div>

        <aside
          id={panelId}
          aria-live="polite"
          className="bg-surface border-foreground/10 min-h-56 rounded-xl border p-6"
        >
          {panel.kind === "empty" ? (
            <div className="space-y-4">
              <p className="eyebrow">Grupos regionales</p>
              <h4 className="font-display text-2xl font-semibold">
                Elige un departamento en el mapa
              </h4>
              <p className="text-muted text-sm leading-relaxed">
                Al seleccionar una región verás si el grupo está activo y cómo
                unirte. El directorio completo también está en Beacons.
              </p>
              <ExternalLink
                href={beaconsHref}
                className="text-brand-green inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
              >
                Abrir Beacons
              </ExternalLink>
            </div>
          ) : null}

          {panel.kind === "international" ? (
            <RegionDetail
              title={panel.link.label}
              description={
                panel.link.description ??
                "Grupo de WhatsApp para la diáspora del movimiento."
              }
              links={[panel.link]}
              email={email}
            />
          ) : null}

          {panel.kind === "region" ? (
            <RegionDetail
              title={panel.department.name}
              description={
                panel.department.id === "bogota"
                  ? "Bogotá tiene dos grupos regionales. Únete al que prefieras."
                  : `Grupo regional de WhatsApp de ${panel.department.name}.`
              }
              links={
                panel.links.length > 0
                  ? panel.links
                  : [{ label: panel.department.name }]
              }
              email={email}
            />
          ) : null}
        </aside>
      </div>
    </div>
  );
}

function RegionDetail({
  title,
  description,
  links,
  email,
}: {
  title: string;
  description: string;
  links: RegionLink[];
  email: string;
}) {
  const hasAnyLink = links.some((link) => Boolean(link.href));

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge active={hasAnyLink} />
        </div>
        <h4 className="font-display text-2xl font-semibold">{title}</h4>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </div>

      <ul className="mt-auto space-y-3">
        {links.map((link) => {
          if (link.href) {
            return (
              <li key={link.label}>
                <ExternalLink href={link.href} className="btn-primary w-full">
                  {links.length > 1
                    ? `Unirse a ${link.label}`
                    : "Unirse al WhatsApp"}
                </ExternalLink>
              </li>
            );
          }

          return (
            <li key={link.label}>
              <ExternalLink
                href={requestGroupMailto(email, link.label)}
                announceNewTab={false}
                className="btn-secondary w-full"
              >
                Solicitar grupo
              </ExternalLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
