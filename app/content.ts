import type { PortfolioContent } from "@/types/portfolio";

export const portfolio: PortfolioContent = {
  name: "Areeb Imran",
  portrait: "/profile.png",
  focusStatements: [
    "Building thoughtful full-stack products",
    "Exploring practical machine learning",
    "Turning complex problems into clear systems",
  ],
  githubUrl: "https://github.com/areebimran2",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/areebimran2",
      icon: "github",
    },
    { label: "LinkedIn",
      href: "https://www.linkedin.com/in/areeb-imran-16a493237/",
      icon: "linkedin" },
    { label: "Email",
      href: "mailto:areeb.imran@alumni.utoronto.ca",
      icon: "email" },
  ],
  navItems: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
  ],
  // Example roles for layout testing; replace these with your verified résumé.
  experience: [
    {
      role: "Software Engineering Intern",
      organization: "Northstar Labs",
      location: "Toronto, ON",
      period: "May 2025 — Aug 2025",
      details: [
        "Shipped customer-facing dashboard features with TypeScript, React, and Node.js, working from product requirements through review and release.",
        "Designed REST endpoints and PostgreSQL queries for operational workflows, with validation and clear error handling at API boundaries.",
        "Added integration tests and CI checks that caught regressions before deployment and made pull-request reviews more predictable.",
      ],
      skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    },
    {
      role: "Full-Stack Developer",
      organization: "Campus Technology Studio",
      location: "Mississauga, ON",
      period: "Sep 2024 — Apr 2025",
      details: [
        "Built a responsive scheduling platform for student organizations using Next.js, Tailwind CSS, and a Python API.",
        "Created reusable interface components and documented common patterns so teammates could deliver consistent screens faster.",
        "Worked directly with users to simplify booking and approval flows, then translated feedback into focused iterations.",
      ],
      skills: ["Next.js", "Python", "Tailwind CSS", "UX"],
    },
    {
      role: "Machine Learning Research Assistant",
      organization: "Applied Intelligence Lab",
      location: "Toronto, ON",
      period: "Jan 2024 — Aug 2024",
      details: [
        "Prepared reproducible data pipelines for time-series experiments, including cleaning, feature generation, and dataset versioning.",
        "Trained and evaluated transformer-based forecasting models in PyTorch, comparing results against established baselines.",
        "Tracked experiments and summarized findings for weekly reviews, making model trade-offs clear to technical collaborators.",
      ],
      skills: ["Python", "PyTorch", "Transformers", "Data pipelines"],
    },
  ],
  projects: [
    {
      name: "Path-Planning Research",
      description:
        "A research project exploring random sampling methods for path planning in mobile robotics.",
      href: "https://github.com/areebimran2/PathPlanningProject",
      technologies: ["Python", "Algorithms", "Robotics"],
      icon: "ship",
    },
    {
      name: "Scrum Team Manager",
      description:
        "An AI-assisted workspace designed to make Agile planning and team coordination more direct and efficient.",
      href: "https://github.com/areebimran2/scrum-team-manager",
      technologies: ["Python", "JavaScript", "AI"],
      icon: "kanban",
    },
    {
      name: "HurriNet",
      description:
        "A temporal transformer model for forecasting hurricane factors from statistical data and reanalysis maps.",
      href: "https://github.com/areebimran2/HurriNet",
      technologies: ["Deep learning", "Transformers", "Jupyter"],
      icon: "hurricane",
    },
    {
      name: "EasyChef",
      description:
        "A recipe-sharing application that makes it easy to publish, discover, and organize home cooking ideas.",
      href: "https://github.com/areebimran2/EasyChef",
      technologies: ["JavaScript", "Python", "CSS"],
      icon: "chef-hat",
    },
    {
      name: "RouteLab",
      description:
        "A route-planning concept for comparing paths, travel time, and constraints on an interactive map.",
      technologies: ["TypeScript", "Maps", "Concept"],
      icon: "route",
      placeholder: true,
    },
    {
      name: "Pulseboard",
      description:
        "A real-time service health dashboard concept focused on fast incident detection and clear system status.",
      technologies: ["React", "WebSockets", "Concept"],
      icon: "activity",
      placeholder: true,
    },
    {
      name: "Atlas Notes",
      description:
        "A searchable knowledge workspace concept for connecting notes, sources, and related ideas.",
      technologies: ["Next.js", "Search", "Concept"],
      icon: "globe",
      placeholder: true,
    },
    {
      name: "Ledgerly",
      description:
        "A personal finance dashboard concept for making spending patterns and monthly goals easier to understand.",
      technologies: ["Data visualization", "Concept"],
      icon: "chart",
      placeholder: true,
    },
  ],
};
