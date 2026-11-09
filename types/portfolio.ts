export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type Experience = {
  role: string;
  organization: string;
  location: string;
  period: string;
  details: string[];
  skills: string[];
};

export type ProjectIconName =
  | "kanban"
  | "hurricane"
  | "chef-hat"
  | "route"
  | "activity"
  | "globe"
  | "chart"
  | "transaction";

export type Project = {
  name: string;
  description: string;
  href?: string;
  technologies: string[];
  icon: ProjectIconName;
  placeholder?: boolean;
};

export type SocialIconName = "github" | "linkedin" | "email";

export type SocialLink = {
  label: string;
  href?: string;
  icon: SocialIconName;
};

export type PortfolioContent = {
  name: string;
  portrait: string;
  focusStatements: string[];
  githubUrl: string;
  socialLinks: SocialLink[];
  navItems: NavItem[];
  experience: Experience[];
  projects: Project[];
};
