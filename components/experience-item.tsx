import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/types/portfolio";

type ExperienceItemProps = {
  experience: Experience;
  index: number;
};

export function ExperienceItem({ experience, index }: ExperienceItemProps) {
  return (
    <article className="group grid gap-5 border-t border-border py-8 first:pt-0 md:grid-cols-[11rem_1fr]">
      <div className="flex items-start justify-between md:block">
        <span className="font-mono text-xs text-muted-foreground">
          0{index + 1}
        </span>
        <p className="mt-0 font-mono text-xs text-muted-foreground md:mt-3">
          {experience.period}
        </p>
      </div>

      <div>
        <div className="mb-3">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">
            {experience.role}
          </h3>
          <p className="mt-1 text-sm font-medium text-primary">
            {experience.organization}
          </p>
        </div>
        <p className="max-w-2xl text-[0.95rem] leading-7 text-muted-foreground">
          {experience.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {experience.skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
