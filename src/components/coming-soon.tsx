type ComingSoonProps = {
  title: string;
  description: string;
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-brand-green text-sm font-semibold tracking-[0.18em] uppercase">
        Próximamente
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="text-muted mt-4 max-w-xl text-lg">{description}</p>
    </div>
  );
}
