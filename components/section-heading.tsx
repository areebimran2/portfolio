type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-10 grid gap-3 md:grid-cols-[11rem_1fr] md:items-baseline">
      <p className="font-mono text-xs font-medium tracking-[0.16em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
