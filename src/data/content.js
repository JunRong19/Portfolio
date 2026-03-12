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
 * @property {string} [image]
 * @property {string} [imageAlt]
 * @property {string[]} stack
 * @property {string[]} impactBullets
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
  headline: "Hello!",
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
    summary: "Objective placeholder: define the core delivery goal and measurable success metric.",
    image: "/images/temp.jpg",
    imageAlt: "Project detail visual for Project Placeholder One.",
    stack: ["C#", "Unity", "Tooling"],
    impactBullets: [
      "Constraints placeholder: list technical and timeline constraints.",
      "Approach placeholder: summarize the implementation strategy.",
      "Outcome placeholder: capture impact and performance result.",
    ],
  },
  {
    id: "project-2",
    title: "Project Placeholder Two",
    role: "Technical Lead",
    period: "8 months",
    summary: "Objective placeholder: define the architecture and coordination target.",
    stack: ["C++", "Architecture", "AI"],
    impactBullets: [
      "Constraints placeholder: specify risks and production limits.",
      "Approach placeholder: note system design and team alignment.",
      "Outcome placeholder: summarize stability and delivery gain.",
    ],
  },
  {
    id: "project-3",
    title: "Project Placeholder Three",
    role: "Graphics Programmer",
    period: "4 months",
    summary: "Objective placeholder: state rendering and interaction target.",
    stack: ["Rendering", "UI/UX", "Optimization"],
    impactBullets: [
      "Constraints placeholder: mention hardware/performance boundaries.",
      "Approach placeholder: describe pipeline and UX implementation.",
      "Outcome placeholder: highlight optimization and visual quality effect.",
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
