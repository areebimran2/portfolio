"use client";

import type { MouseEvent } from "react";
import { FaGithub as GithubIcon } from "react-icons/fa6";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/portfolio";

type SiteHeaderProps = {
  name: string;
  navItems: NavItem[];
  githubUrl: string;
};

// Scroll to the target section without writing the hash to the URL. Modified
// clicks (new tab, etc.) and missing targets fall back to native anchor nav.
function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView();
}

export function SiteHeader({ name, navItems, githubUrl }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto grid h-14 max-w-4xl grid-cols-[2.25rem_minmax(0,1fr)_2.25rem] items-center rounded-2xl border border-border/80 bg-background/85 px-3 shadow-[0_12px_40px_rgb(0_0_0/0.38)] backdrop-blur-xl sm:px-4">
        <span aria-hidden="true" className="size-9" />

        <nav
          aria-label="Primary navigation"
          className="min-w-0 justify-self-center"
        >
          <ul className="flex items-center gap-0 sm:gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="inline-flex h-9 items-center justify-center rounded-lg px-2 text-xs font-medium whitespace-nowrap text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-3 sm:text-sm"
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} on GitHub`}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "size-9 rounded-xl",
          )}
        >
          <GithubIcon className="size-4" />
        </a>
      </div>
    </header>
  );
}
