/**
 * @typedef {"dark" | "light"} ThemeMode
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} role
 * @property {string} period
 * @property {string} summary
 * @property {string[]} stack
 * @property {string[]} impactBullets
 * @property {string} coverImage
 * @property {string[]} galleryImages
 */

/**
 * @typedef {Object} ExperienceItem
 * @property {string} id
 * @property {string} company
 * @property {string} role
 * @property {string} period
 * @property {string[]} impactBullets
 */

/**
 * @typedef {Object} ContactItem
 * @property {string} id
 * @property {string} label
 * @property {string} value
 * @property {string} href
 */

/**
 * @typedef {Object} CursorTrailConfig
 * @property {number} maxDots
 * @property {number} dotLifeMs
 * @property {number} spawnIntervalMs
 * @property {[number, number]} dotSizeRange
 */

export const THEME_KEY = "portfolio-theme";

export const navItems = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Software Developer",
  headline: "Built to ship.",
  subheadline: "I build game tech, QA automation, and internal tools with measurable delivery impact.",
  ctas: [
    { label: "Resume", href: "./Tan_Jun_Rong_Resume_Software_GH.pdf", primary: true },
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};

/** @type {ExperienceItem[]} */
export const experiences = [
  {
    id: "exp-1",
    company: "Company Placeholder",
    role: "Software Engineer Intern",
    period: "2025 - Present",
    impactBullets: [
      "Built QA workflow automation for hardware validation.",
      "Reduced manual test effort with internal scripts.",
      "Improved reliability and reporting across test runs.",
    ],
  },
  {
    id: "exp-2",
    company: "Company Placeholder",
    role: "Game QA Analyst",
    period: "2023 - 2025",
    impactBullets: [
      "Delivered reproducible bug reports with priority context.",
      "Validated gameplay and performance across releases.",
      "Maintained rapid feedback loops with development teams.",
    ],
  },
  {
    id: "exp-3",
    company: "Company Placeholder",
    role: "Game Programmer Intern",
    period: "2019 - 2020",
    impactBullets: [
      "Implemented production features in Unity.",
      "Supported Android and iOS release readiness.",
      "Contributed to iterative sprint delivery.",
    ],
  },
];

/** @type {Project[]} */
export const projects = [
  {
    id: "project-1",
    title: "Project Placeholder One",
    role: "Tools Programmer",
    period: "8 months",
    summary: "Built editor tooling and diagnostics for faster iteration.",
    stack: ["C#", "Unity", "Tooling"],
    impactBullets: [
      "Built utility interfaces to speed designer workflows.",
      "Added profiling checkpoints for bottleneck detection.",
      "Reduced setup friction for repeated test cycles.",
    ],
    coverImage: "placeholders/project-cover.svg",
    galleryImages: [
      "placeholders/project-gallery-1.svg",
      "placeholders/project-gallery-2.svg",
      "placeholders/project-gallery-3.svg",
    ],
  },
  {
    id: "project-2",
    title: "Project Placeholder Two",
    role: "Technical Lead",
    period: "8 months",
    summary: "Owned architecture and cross-discipline delivery alignment.",
    stack: ["C++", "Architecture", "AI"],
    impactBullets: [
      "Defined maintainable technical direction for core systems.",
      "Resolved production blockers in high-risk areas.",
      "Aligned engineering decisions with design constraints.",
    ],
    coverImage: "placeholders/project-cover.svg",
    galleryImages: [
      "placeholders/project-gallery-1.svg",
      "placeholders/project-gallery-2.svg",
      "placeholders/project-gallery-3.svg",
    ],
  },
  {
    id: "project-3",
    title: "Project Placeholder Three",
    role: "Graphics Programmer",
    period: "4 months",
    summary: "Implemented rendering and interaction systems for prototype delivery.",
    stack: ["Rendering", "UI/UX", "Optimization"],
    impactBullets: [
      "Reduced memory overhead in rendering workflows.",
      "Implemented responsive interaction flows for players.",
      "Maintained visual consistency under production changes.",
    ],
    coverImage: "placeholders/project-cover.svg",
    galleryImages: [
      "placeholders/project-gallery-1.svg",
      "placeholders/project-gallery-2.svg",
      "placeholders/project-gallery-3.svg",
    ],
  },
];

/** @type {ContactItem[]} */
export const contacts = [
  { id: "email", label: "Email", value: "your-email@domain.com", href: "mailto:your-email@domain.com" },
  { id: "phone", label: "Phone", value: "+65 0000 0000", href: "tel:+6500000000" },
  { id: "github", label: "GitHub", value: "github.com/your-handle", href: "https://github.com" },
  { id: "linkedin", label: "LinkedIn", value: "linkedin.com/in/your-handle", href: "https://linkedin.com" },
];

/** @type {CursorTrailConfig} */
export const cursorTrailConfig = {
  maxDots: 26,
  dotLifeMs: 520,
  spawnIntervalMs: 20,
  dotSizeRange: [2, 7],
};
