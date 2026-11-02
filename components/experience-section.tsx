import { ExperienceItem } from "@/components/experience-item";
import type { Experience } from "@/types/portfolio";

type ExperienceSectionProps = {
  experiences: Experience[];
};

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8 text-center sm:mb-10">
        <h2
          id="experience-heading"
          className="text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl"
        >
          Where I&apos;ve contributed.
        </h2>
      </div>

      <div className="grid gap-3">
        {experiences.map((experience) => (
          <ExperienceItem
            key={`${experience.organization}-${experience.role}`}
            experience={experience}
          />
        ))}
      </div>
    </div>
  );
}
