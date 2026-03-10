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
 * @typedef {Object} SkillGroup
 * @property {string} id
 * @property {string} title
 * @property {string[]} items
 */

/**
 * @typedef {Object} ContactItem
 * @property {string} id
 * @property {string} label
 * @property {string} value
 * @property {string} href
 */

export const THEME_KEY = "portfolio-theme";

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Software Developer",
  headline: "Engineering that ships.",
  subheadline: "Game tech, QA automation, and tooling. Clear outcomes. Minimal noise.",
  portrait: "placeholders/portrait.svg",
  ctas: [
    { label: "Download Resume", href: "./Tan_Jun_Rong_Resume_Software_GH.pdf", primary: true },
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
      "Built internal QA workflow automation for hardware validation.",
      "Reduced repetitive test execution effort with scripting and tooling.",
      "Partnered cross-functionally to improve test reliability and reporting.",
    ],
  },
  {
    id: "exp-2",
    company: "Company Placeholder",
    role: "Game QA Analyst",
    period: "2023 - 2025",
    impactBullets: [
      "Delivered reproducible bug reports with impact-based prioritization.",
      "Validated gameplay and performance issues across multiple builds.",
      "Maintained quality feedback loops with development teams.",
    ],
  },
  {
    id: "exp-3",
    company: "Company Placeholder",
    role: "Game Programmer Intern",
    period: "2019 - 2020",
    impactBullets: [
      "Implemented production-ready gameplay features in Unity.",
      "Supported release readiness for Android and iOS builds.",
      "Contributed to iterative sprint delivery under tight timelines.",
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
    summary: "Built editor tools and diagnostics to accelerate content iteration.",
    stack: ["C#", "Unity", "Tooling"],
    impactBullets: [
      "Created internal utility interfaces for faster designer workflows.",
      "Introduced profiling checkpoints for performance tracking.",
      "Improved team throughput by reducing manual setup work.",
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
    summary: "Owned architecture and coordination across gameplay and systems.",
    stack: ["C++", "Architecture", "AI"],
    impactBullets: [
      "Defined maintainable technical direction for core systems.",
      "Unblocked high-risk implementation issues during production.",
      "Aligned engineering decisions with design and art requirements.",
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
    summary: "Implemented rendering and UI systems for a production prototype.",
    stack: ["Rendering", "UI/UX", "Optimization"],
    impactBullets: [
      "Delivered rendering improvements for lower memory overhead.",
      "Implemented responsive interaction patterns for player UX.",
      "Maintained visual consistency across changing team constraints.",
    ],
    coverImage: "placeholders/project-cover.svg",
    galleryImages: [
      "placeholders/project-gallery-1.svg",
      "placeholders/project-gallery-2.svg",
      "placeholders/project-gallery-3.svg",
    ],
  },
];

/** @type {SkillGroup[]} */
export const skillGroups = [
  { id: "languages", title: "Languages", items: ["C#", "C/C++", "Python"] },
  { id: "engines", title: "Engines & Tools", items: ["Unity", "Git", "Jenkins"] },
  { id: "qa", title: "QA & DevOps", items: ["Robot Framework", "Automation", "CI Workflows"] },
  { id: "focus", title: "Delivery Focus", items: ["Tooling", "Performance", "Cross-team Execution"] },
];

/** @type {ContactItem[]} */
export const contacts = [
  { id: "email", label: "Email", value: "your-email@domain.com", href: "mailto:your-email@domain.com" },
  { id: "phone", label: "Phone", value: "+65 0000 0000", href: "tel:+6500000000" },
  { id: "github", label: "GitHub", value: "github.com/your-handle", href: "https://github.com" },
  { id: "linkedin", label: "LinkedIn", value: "linkedin.com/in/your-handle", href: "https://linkedin.com" },
];
