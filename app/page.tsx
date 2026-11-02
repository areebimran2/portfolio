import { ExperienceItem } from "@/components/experience-item";
import { FocusSignal } from "@/components/focus-signal";
import { ProfilePortrait } from "@/components/profile-portrait";
import { ProjectsCarousel } from "@/components/projects-carousel";
import { SectionHeading } from "@/components/section-heading";
import { SectionScroller } from "@/components/section-scroller";
import { SiteHeader } from "@/components/site-header";
import { SocialBar } from "@/components/social-bar";

import { portfolio } from "./content";

// Each section fills the viewport and is one stop for SectionScroller.
const fullScreenSection =
  "flex min-h-svh flex-col justify-center pt-28 pb-16 sm:pb-20";

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <SectionScroller />
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
          data-scroll-section
          className={fullScreenSection}
        >
          <div className="intro-reveal mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <ProfilePortrait src={portfolio.portrait} name={portfolio.name} />

            <div className="mt-8">
              <p className="text-[1.75rem] leading-none font-semibold tracking-[-0.025em] text-foreground sm:text-4xl">
                Hello, I&apos;m
              </p>
              <h1
                id="intro-heading"
                className="mt-3 text-[clamp(3.5rem,10vw,6.5rem)] leading-none font-bold tracking-[-0.055em] text-primary"
              >
                {portfolio.name}
              </h1>
            </div>

            <FocusSignal statements={portfolio.focusStatements} />

            <div className="mt-7 flex w-full justify-center">
              <SocialBar links={portfolio.socialLinks} />
            </div>
          </div>
        </section>

        <section
          id="experience"
          aria-labelledby="experience-heading"
          data-scroll-section
          className={fullScreenSection}
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

        <section
          id="projects"
          aria-labelledby="projects-heading"
          data-scroll-section
          className={fullScreenSection}
        >
          <ProjectsCarousel projects={portfolio.projects} />
        </section>
      </main>
    </div>
  );
}
