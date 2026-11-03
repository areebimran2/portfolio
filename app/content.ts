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
      role: "Software Developer",
      organization: "Apex Modular Construction",
      location: "Remote",
      period: "Jul — Sep 2026",
      details: [
        "Developed production-grade features for a startup PropTech company using TypeScript and React.",
        "Implemented an interactive 3D model viewer and realtime customizer for prefabricated home models using Three.js.",
        "Refined the frontend UI/UX to simplify navigation and create a polished, professional visual interface.",
      ],
      skills: ["Next.js", "TypeScript", "React", "Three.js"],
    },
    {
      role: "Backend Developer",
      organization: "Unforgettable Travel Company",
      location: "Remote",
      period: "Oct 2025 — Mar 2026",
      details: [
        "Designed and implemented an API, following standard RESTful practices, that is part of a system aiming to" +
        "streamline and automate the process of assigning cabins to passengers on a cruise ship.",
        "Translated an existing PostgreSQL schema into maintainable Django models and database migrations.",
        "Implemented a Two-Factor (SMS or TOTP) authentication flow to maintain sensitive activity.",
        "Induced sophisticated and robust security precautions within the authentication framework to thwart malicious" +
        "actors. Such precautions include using unique dynamic identifiers to mitigate enumeration attacks, and the use" +
        "of HttpOnly cookies for potential XSS attacks."
      ],
      skills: ["Python", "RESTful API", "PostgreSQL", "Django"],
    },
  ],
  projects: [
    {
      name: "Path-Planning Research",
      description:
        "A research project exploring random sampling methods for path planning in mobile robotics.",
      href: "https://github.com/areebimran2/PathPlanningProject",
      technologies: ["Python", "Algorithms", "Robotics"],
      icon: "route",
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
      name: "Transaction Search",
      description:
        "A focused search interface for retrieving and reviewing transaction records through filters and organized results.",
      href: "https://github.com/areebimran2/transaction-search",
      technologies: ["Next.js", "HTML"],
      icon: "route",
    },
    // {
    //   name: "Pulseboard",
    //   description:
    //     "A real-time service health dashboard concept focused on fast incident detection and clear system status.",
    //   technologies: ["React", "WebSockets", "Concept"],
    //   icon: "activity",
    //   placeholder: true,
    // },
    // {
    //   name: "Atlas Notes",
    //   description:
    //     "A searchable knowledge workspace concept for connecting notes, sources, and related ideas.",
    //   technologies: ["Next.js", "Search", "Concept"],
    //   icon: "globe",
    //   placeholder: true,
    // },
    // {
    //   name: "Ledgerly",
    //   description:
    //     "A personal finance dashboard concept for making spending patterns and monthly goals easier to understand.",
    //   technologies: ["Data visualization", "Concept"],
    //   icon: "chart",
    //   placeholder: true,
    // },
  ],
};
