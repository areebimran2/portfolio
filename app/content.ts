import type { PortfolioContent } from "@/types/portfolio";

// Keep personal copy and links here so the page layout remains reusable.
export const portfolio: PortfolioContent = {
  name: "Areeb Imran",
  initials: "AI",
  portrait: "/profile.jpg",
  focusStatements: [
    "Building thoughtful full-stack products",
    "Exploring practical machine learning",
    "Turning complex problems into clear systems",
  ],
  githubUrl: "https://github.com/areebimran2",
  // Add `href` once your public LinkedIn URL and preferred email are ready.
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/areebimran2",
      icon: "github",
    },
    { label: "LinkedIn", icon: "linkedin" },
    { label: "Email", icon: "email" },
  ],
  navItems: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
  ],
  experience: [
    {
      role: "Software Engineer",
      organization: "CSC301 Capstone · University of Toronto",
      period: "2025 — 2026",
      summary:
        "Built an AI-assisted Scrum management platform with a team, focusing on practical workflows for planning, tracking, and delivering software.",
      skills: ["Python", "JavaScript", "Product engineering"],
    },
    {
      role: "Machine Learning Engineer",
      organization: "CSC413 Project · University of Toronto",
      period: "2026",
      summary:
        "Developed HurriNet, a transformer architecture that combines statistical and regional image data to predict hurricane factors over time.",
      skills: ["Deep learning", "Transformers", "Data modelling"],
    },
  ],
  projects: [
    {
      name: "CS-CAS",
      description:
        "A cruise administration platform for managing ships, cabin maps, routes, sailings, pricing, reservations, and reporting.",
      href: "https://github.com/areebimran2/CS-CAS",
      technologies: ["Python", "Web platform"],
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
