import type { PortfolioContent } from "@/types/portfolio";

// Keep personal copy and links here so the page layout remains reusable.
export const portfolio: PortfolioContent = {
  name: "Areeb Imran",
  initials: "AI",
  eyebrow: "Software engineer",
  headline: "I turn complex ideas into clear, useful software.",
  introduction:
    "I build thoughtful digital products across full-stack development and machine learning. I care about simple interfaces, dependable systems, and solving the right problem.",
  githubUrl: "https://github.com/areebimran2",
  navItems: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
  ],
  skills: ["TypeScript", "React", "Next.js", "Python", "Machine learning"],
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
    },
    {
      name: "Scrum Team Manager",
      description:
        "An AI-assisted workspace designed to make Agile planning and team coordination more direct and efficient.",
      href: "https://github.com/areebimran2/scrum-team-manager",
      technologies: ["Python", "JavaScript", "AI"],
    },
    {
      name: "HurriNet",
      description:
        "A temporal transformer model for forecasting hurricane factors from statistical data and reanalysis maps.",
      href: "https://github.com/areebimran2/HurriNet",
      technologies: ["Deep learning", "Transformers", "Jupyter"],
    },
    {
      name: "EasyChef",
      description:
        "A recipe-sharing application that makes it easy to publish, discover, and organize home cooking ideas.",
      href: "https://github.com/areebimran2/EasyChef",
      technologies: ["JavaScript", "Python", "CSS"],
    },
  ],
};
