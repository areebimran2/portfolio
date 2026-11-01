export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type Experience = {
  role: string;
  organization: string;
  period: string;
  summary: string;
  skills: string[];
};

export type ProjectIconName =
  | "ship"
  | "kanban"
  | "hurricane"
  | "chef-hat"
  | "route"
  | "activity"
  | "globe"
  | "chart";

export type Project = {
  name: string;
  description: string;
  href?: string;
  technologies: string[];
  icon: ProjectIconName;
  placeholder?: boolean;
};

export type PortfolioContent = {
  name: string;
  initials: string;
  eyebrow: string;
  headline: string;
  introduction: string;
  githubUrl: string;
  navItems: NavItem[];
  skills: string[];
  experience: Experience[];
  projects: Project[];
};
