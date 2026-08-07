import { site } from "@/content/site";
import { LeadershipDualPortrait } from "@/components/home/leadership-dual-portrait";

export function HomeLeadership() {
  const { leadership } = site;

  return (
    <section
      aria-labelledby="leadership-heading"
      className="section-space border-foreground/10 border-t"
    >
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <LeadershipDualPortrait size="compact" className="lg:mx-0" />
        <div className="space-y-5">
          <div>
            <p className="eyebrow">Liderazgo</p>
            <h2 id="leadership-heading" className="section-title mt-4">
              {leadership.name}
            </h2>
            <p className="text-brand-green mt-3 font-semibold">
              {leadership.role}
            </p>
            <p className="text-muted mt-1 text-sm">{leadership.location}</p>
          </div>
          <p className="text-muted max-w-prose text-lg leading-relaxed">
            {leadership.bio}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {leadership.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
