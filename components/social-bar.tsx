import type { ComponentType, SVGProps } from "react";

import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import type { SocialIconName, SocialLink } from "@/types/portfolio";

const socialIcons: Record<
  SocialIconName,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
};

type SocialBarProps = {
  links: SocialLink[];
};

const itemClassName =
  "flex h-10 w-full items-center justify-center rounded-xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

export function SocialBar({ links }: SocialBarProps) {
  return (
    <nav aria-label="Social links" className="w-full max-w-xs">
      <ul className="grid h-[3.875rem] grid-cols-3 items-center rounded-2xl border border-border bg-card/80 shadow-[0_14px_36px_rgb(0_0_0/0.28)] backdrop-blur-sm">
        {links.map((link, index) => {
          const Icon = socialIcons[link.icon];

          return (
            <li
              key={link.label}
              className="relative flex h-full min-w-0 items-center justify-center p-2.5"
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-0 h-8 w-px -translate-y-1/2 bg-border/70"
                />
              ) : null}
              {link.href ? (
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={link.label}
                  title={link.label}
                  className={cn(
                    itemClassName,
                    "text-muted-foreground hover:bg-accent hover:text-primary",
                  )}
                >
                  <Icon className="size-5" />
                </a>
              ) : (
                <span
                  aria-label={`${link.label} link not configured`}
                  aria-disabled="true"
                  title={`Add your ${link.label} URL in app/content.ts`}
                  className={cn(
                    itemClassName,
                    "cursor-not-allowed text-muted-foreground/65",
                  )}
                >
                  <Icon className="size-5" />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
