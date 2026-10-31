import { GithubIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/portfolio";

type SiteHeaderProps = {
  initials: string;
  name: string;
  navItems: NavItem[];
  githubUrl: string;
};

export function SiteHeader({
  initials,
  name,
  navItems,
  githubUrl,
}: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between rounded-2xl border border-border/80 bg-background/85 px-3 shadow-[0_12px_40px_rgb(0_0_0/0.38)] backdrop-blur-xl sm:px-4">
        <a
          href="#about"
          aria-label={`${name}, back to introduction`}
          className="flex size-9 items-center justify-center rounded-xl bg-primary font-mono text-xs font-semibold tracking-wider text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {initials}
        </a>

        <nav aria-label="Primary navigation" className="hidden sm:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                  href={item.href}
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
