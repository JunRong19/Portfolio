/**
 * @typedef {"dark" | "light"} ThemeMode
 */

/**
 * @typedef {Object} LinkItem
 * @property {string} label
 * @property {string} href
 * @property {boolean} [primary]
 * @property {boolean} [newTab]
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
 * @property {string} [logo]
 * @property {string} [logoAlt]
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
  subheadline: "I build software, tools and games, specializing in C#, C++, and Python.",
  ctas: [
    { label: "Resume", href: "./Tan_Jun_Rong_Resume_Software_GH.pdf", primary: true, newTab: true },
    { label: "GitHub", href: "https://github.com/JunRong19", newTab: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tan-jun-rong/", newTab: true },
    { label: "Email", href: "mailto:tan.jun.rong@gmail.com", newTab: false },
  ],
};

export const education = [
  {
    id: "edu-1",
    school: "Singapore Institute of Technology - Digipen",
    period: "2022 - 2026",
    program: "BSc in Computer Science in Interactive Media and Game Development",
    cgpa: "CGPA: 4.02 / 5.00",
  },
  {
    id: "edu-2",
    school: "Temasek Polytechnic",
    period: "2017 - 2020",
    program: "Diploma in Game Design and Development",
    cgpa: "CGPA: 3.76 / 4.00",
  },
];

export const expertise = [
  {
    id: "exp-languages",
    title: "Languages",
    items: [
      { label: "C", icon: "/images/c.svg" },
      { label: "C++", icon: "/images/cpp.svg" },
      { label: "C#", icon: "/images/csharp.svg" },
      // { label: "JavaScript", icon: "/images/js.svg" },
      { label: "Python", icon: "/images/python.svg" },
    ],
  },
  {
    id: "exp-devops",
    title: "DevOps",
    items: [
      { label: "Selenium", icon: "/images/selenium.svg" },
      { label: "Jenkins", icon: "/images/jenkins.svg" },
      { label: "Robot Framework", icon: "/images/robotframework.svg" },
    ],
  },
  {
    id: "exp-software",
    title: "Software",
    items: [
      { label: "Unity", icon: "/images/unity.svg" },
      { label: "Blender", icon: "/images/blender.svg" },
    ],
  },
];

/** @type {ExperienceItem[]} */
export const experiences = [
  {
    id: "exp-1",
    company: "Razer Inc.",
    role: "Software Engineer",
    period: "2025 - Present",
    logo: "/images/Razer-logo.png",
    logoAlt: "Razer logo",
    impactBullets: [
      "Developed and maintained automated test cases for Razer peripherals, achieving 90% test coverage.",
      "Built a physical testing rig supporting end-to-end automation, reducing manual testing time by 60%.",
      "Created 4 internal automation tools to automate tasks and improve team workflow efficiency.",
    ],
  },
  {
    id: "exp-2",
    company: "Fiverr",
    role: "Game QA Analyst",
    period: "2023 - 2025",
    logo: "/images/Fiverr-Logo.png",
    logoAlt: "Fiverr logo",
    impactBullets: [
      "Achieved 100% 5-star ratings across 30+ completed client projects.",
      "Delivered tailored QA solutions for clients globally.",
      "Analyzed and documented cross-platform game issues.",
    ],
  },
  {
    id: "exp-3",
    company: "The Kettle Gourmet",
    role: "Game Programmer / 3D Artist",
    period: "2019 - 2020",
    logo: "/images/TKG-Logo.png",
    logoAlt: "TKG logo",
    impactBullets: [
      "Developed 3 mobile applications across Android and iOS platforms.",
      "Optimized performance by 70% and ensured cross-device compatibility.",
      "Participated in weekly sprint meetings to align development with business goals and user feedback.",
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
export const quickContacts = [
  { id: "resume", label: "Resume", value: "Resume", href: "./Tan_Jun_Rong_Resume_Software_GH.pdf" },
  { id: "github", label: "GitHub", value: "github.com/JunRong19", href: "https://github.com/JunRong19" },
  { id: "email", label: "Email", value: "Tanjunrong321@gmail.com", href: "mailto:Tanjunrong321@gmail.com" },
  { id: "linkedin", label: "LinkedIn", value: "linkedin.com/in/tan-jun-rong/", href: "https://www.linkedin.com/in/tan-jun-rong/" },
];

/** @type {ContactItem[]} */
export const contacts = [
  { id: "email", label: "Email", value: "Tanjunrong321@gmail.com", href: "mailto:Tanjunrong321@gmail.com" },
  { id: "linkedin", label: "LinkedIn", value: "linkedin.com/in/tan-jun-rong/", href: "https://www.linkedin.com/in/tan-jun-rong/" },
];

/** @type {CursorTrailConfig} */
export const cursorTrailConfig = {
  maxDots: 26,
  dotLifeMs: 520,
  spawnIntervalMs: 20,
  dotSizeRange: [2, 7],
};

