import type { LucideIcon } from "lucide-react";
import type { IconType} from "react-icons";
import {
  Activity as ActivityIcon,
  ArrowUpRight as ArrowUpRightIcon,
  ChartNoAxesCombined as ChartIcon,
  ChefHat as ChefHatIcon,
  Columns3 as KanbanIcon,
  Globe2 as GlobeIcon,
  Route as RouteIcon,
} from "lucide-react";

import {
  PiHurricane as HurricaneIcon,
} from "react-icons/pi";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Project, ProjectIconName } from "@/types/portfolio";

type ProjectCardProps = {
  project: Project;
};

const projectIcons: Record<ProjectIconName, LucideIcon | IconType> = {
  kanban: KanbanIcon,
  hurricane: HurricaneIcon,
  "chef-hat": ChefHatIcon,
  route: RouteIcon,
  activity: ActivityIcon,
  globe: GlobeIcon,
  chart: ChartIcon,
};

const wrapperClassName =
  "group flex h-full w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4";

function ProjectCardBody({ project }: ProjectCardProps) {
  const Icon = projectIcons[project.icon];

  return (
    <Card className="relative flex min-h-[21.5rem] w-full flex-col overflow-hidden p-6 transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-primary/35 group-hover:shadow-[0_20px_55px_rgb(0_0_0/0.4)] sm:min-h-[15.5rem] sm:p-5">
      <div className="mb-7 flex items-start justify-between sm:mb-5">
        <span
          data-project-icon
          className="flex size-12 items-center justify-center rounded-xl border border-primary/50 bg-primary/15 text-[#a7c9fb] shadow-[0_0_24px_rgb(113_151_208/0.16),inset_0_1px_0_rgb(255_255_255/0.08)] transition-[background-color,border-color,box-shadow] group-hover:border-primary/80 group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_rgb(113_151_208/0.25),inset_0_1px_0_rgb(255_255_255/0.1)]"
        >
          <Icon className="size-6 stroke-[2.1]" />
        </span>

        {project.href ? (
          <span className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRightIcon className="size-4" />
          </span>
        ) : (
          <Badge className="border-primary/25 bg-primary/10 text-primary">
            Concept
          </Badge>
        )}
      </div>

      <CardHeader>
        <h3 className="text-xl font-semibold tracking-[-0.025em] text-foreground sm:text-lg">
          {project.name}
        </h3>
      </CardHeader>
      <CardContent className="mt-3 flex flex-1 flex-col sm:mt-2">
        <p className="leading-6 sm:text-[0.8125rem] sm:leading-5">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-6 sm:gap-1.5 sm:pt-4">
          {project.technologies.map((technology) => (
            <Badge key={technology} className="bg-background sm:px-2 sm:py-0.5">
              {technology}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.name}, opens on GitHub`}
        className={wrapperClassName}
      >
        <ProjectCardBody project={project} />
      </a>
    );
  }

  return (
    <div
      aria-label={`${project.name}, concept placeholder`}
      className={wrapperClassName}
    >
      <ProjectCardBody project={project} />
    </div>
  );
}
