import { ArrowUpRightIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Project } from "@/types/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.name}, opens on GitHub`}
      className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
    >
      <Card className="relative h-full overflow-hidden p-6 transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-primary/35 group-hover:shadow-[0_20px_55px_rgb(0_0_0/0.4)] sm:p-7">
        <div className="mb-12 flex items-start justify-between">
          <span className="font-mono text-xs text-muted-foreground">
            0{index + 1}
          </span>
          <span className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRightIcon className="size-4" />
          </span>
        </div>

        <CardHeader>
          <h3 className="text-xl font-semibold tracking-[-0.025em] text-foreground">
            {project.name}
          </h3>
        </CardHeader>
        <CardContent className="mt-3 p-0">
          <p className="leading-6">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <Badge key={technology} className="bg-background">
                {technology}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
