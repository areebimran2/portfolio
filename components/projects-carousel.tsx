"use client";

import * as React from "react";

import { ProjectCard } from "@/components/project-card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

const DESKTOP_PROJECTS_PER_PAGE = 4;
const MOBILE_PROJECTS_PER_PAGE = 1;
const MOBILE_QUERY = "(max-width: 639px)";

type ProjectsCarouselProps = {
  projects: Project[];
};

function chunkProjects(projects: Project[], size: number) {
  return Array.from(
    { length: Math.ceil(projects.length / size) },
    (_, index) => projects.slice(index * size, (index + 1) * size),
  );
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [projectsPerPage, setProjectsPerPage] = React.useState(
    DESKTOP_PROJECTS_PER_PAGE,
  );

  const pages = React.useMemo(
    () => chunkProjects(projects, projectsPerPage),
    [projects, projectsPerPage],
  );

  React.useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const updatePageSize = () =>
      setProjectsPerPage(
        media.matches ? MOBILE_PROJECTS_PER_PAGE : DESKTOP_PROJECTS_PER_PAGE,
      );

    updatePageSize();
    media.addEventListener("change", updatePageSize);
    return () => media.removeEventListener("change", updatePageSize);
  }, []);

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrent(api.selectedScrollSnap());
      setCount(api.scrollSnapList().length);
    };

    update();
    api.on("select", update).on("reInit", update);
    return () => {
      api.off("select", update).off("reInit", update);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    api.reInit();
    api.scrollTo(0, true);
  }, [api, projectsPerPage]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: false, slidesToScroll: 1 }}
      aria-labelledby="projects-heading"
    >
      <div className="mb-8 flex items-end justify-between gap-6 sm:mb-8">
        <h2
          id="projects-heading"
          className="max-w-xl text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl"
        >
          A few projects I&apos;ve enjoyed bringing to life.
        </h2>

        <div className="flex shrink-0 items-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>

      <CarouselContent>
        {pages.map((page, pageIndex) => (
          <CarouselItem
            key={page.map((project) => project.name).join("-")}
            aria-label={`Project page ${pageIndex + 1} of ${pages.length}`}
            className="flex"
          >
            <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
              {page.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-1.5">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to project page ${index + 1}`}
              aria-current={index === current ? "true" : undefined}
              className="group flex h-5 w-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-300",
                  index === current
                    ? "w-5 bg-primary"
                    : "w-1.5 bg-border group-hover:bg-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>
        <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
          {count > 0 ? String(current + 1).padStart(2, "0") : "00"}
          <span className="mx-1.5 text-border">/</span>
          {String(count).padStart(2, "0")}
        </p>
      </div>
    </Carousel>
  );
}
