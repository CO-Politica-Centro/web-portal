import { site } from "@/content/site";

export function HomeAbout() {
  return (
    <section
      id="quienes-somos"
      aria-labelledby="about-heading"
      className="section-space border-foreground/10 scroll-mt-28 border-t"
    >
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Quiénes somos</p>
          <h2 id="about-heading" className="section-title mt-4">
            Un centro con brújula
          </h2>
        </div>
        <div className="space-y-5">
          {site.about.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-muted max-w-prose text-lg leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
          <aside
            className="border-accent/40 bg-surface max-w-prose rounded-md border-l-4 px-4 py-3 text-sm leading-relaxed"
            role="note"
          >
            <p className="font-semibold">Nota importante</p>
            <p className="text-muted mt-1">{site.disclaimer}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
