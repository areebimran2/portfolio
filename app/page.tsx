import { ArrowDownIcon, GithubIcon } from "@/components/icons";
import { ExperienceItem } from "@/components/experience-item";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { portfolio } from "./content";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <SiteHeader
        initials={portfolio.initials}
        name={portfolio.name}
        navItems={portfolio.navItems}
        githubUrl={portfolio.githubUrl}
      />

      <main className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <section
          id="about"
          aria-labelledby="intro-heading"
          className="relative flex min-h-[92vh] items-center pt-28 pb-20"
        >
          <div className="intro-reveal max-w-3xl">
            <p className="mb-6 flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.16em] text-primary uppercase">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-20" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {portfolio.eyebrow}
            </p>

            <h1
              id="intro-heading"
              className="text-[clamp(3.25rem,10vw,6.75rem)] leading-[0.92] font-semibold tracking-[-0.07em] text-foreground"
            >
              Hi, I&apos;m{" "}
              <span className="text-primary">
                {portfolio.name.split(" ")[0]}.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-[1.45] font-medium tracking-[-0.02em] text-foreground sm:text-2xl">
              {portfolio.headline}
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {portfolio.introduction}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className={buttonVariants({
                  size: "default",
                  className: "group",
                })}
              >
                View my work
                <ArrowDownIcon className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href={portfolio.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "outline" })}
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </div>

            <div className="mt-12 flex max-w-2xl flex-wrap gap-2" aria-label="Core skills">
              {portfolio.skills.map((skill) => (
                <Badge key={skill} className="bg-background/70">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        <section
          id="experience"
          aria-labelledby="experience-heading"
          className="scroll-mt-24 py-24 sm:py-32"
        >
          <div id="experience-heading">
            <SectionHeading
              eyebrow="Experience"
              title="Learning by building things that have to work."
            />
          </div>

          <div>
            {portfolio.experience.map((experience, index) => (
              <ExperienceItem
                key={`${experience.organization}-${experience.role}`}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </section>

        <Separator />

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="scroll-mt-24 py-24 sm:py-32"
        >
          <div id="projects-heading">
            <SectionHeading
              eyebrow="Selected work"
              title="A few projects I&apos;ve enjoyed bringing to life."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {portfolio.projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
