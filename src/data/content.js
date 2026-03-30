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
 * @property {{type: "image" | "video", src: string, alt?: string}[]} [gallery]
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
  eyebrow: "Software Engineer",
  headline: "Hello,I'm",
  subheadline: "I'm a final-year computer science student, graduating in 2026.",
  ctas: [
    { label: "Resume", href: "./Tan Jun Rong_Resume_Light.pdf", primary: true, newTab: true },
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
      { label: "JavaScript", icon: "/images/javascript.svg" },
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
    role: "Software Engineer Internship",
    period: "2025 - 2026",
    logo: "/images/Razer-logo.png",
    logoAlt: "Razer logo",
    impactBullets: [
      "Developed and maintained automated test cases for Razer peripherals, achieving 95% test coverage.",
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
      "Achieved 5-star ratings across 30+ completed client projects.",
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
    title: "Keep It Brief!",
    role: "Tools Programmer",
    period: "8 months",
    summary: "Keep It Brief! is a 3D hack n' slash game developed in Litterbox engine.",
    repo: "https://github.com/kkenboi/CoolerCatParty",
    image: "/images/KIB.png",
    gallery: [
      { type: "video", src: "/videos/KeepItBrief_Trailer.mp4" },
    ],
    stack: ["Custom Engine", "C++", "ImGui"],
    impactBullets: [
      "Built a custom engine editor using ImGui and C++, allowing developers to easily modify game variables, assets and scene elements with ease.",
      "Developed memory tracking and performance tools to identify bottlenecks and improve stability.",
      "Integrated ImGuizmo into the game engine to enable game object manipulation, streamlining level design and prototyping.",
    ],
  },
  {
    id: "project-2",
    title: "RicoShaman",
    role: "Technical Lead",
    period: "4 months",
    summary: "RicoShaman is a 2D physic puzzle game developed in Anarchy Engine.",
    repo: "https://github.com/JunRong19/Anarchy-Engine",
    image: "/images/Ricoshaman.png",
    imageAlt: "Project detail visual for RicoShaman.",
    gallery: [
      { type: "video", src: "/videos/RicoshamanTrailer.mp4" },
    ],
    stack: ["Custom Engine", "C++", "OpenGL"],
    impactBullets: [
      "Spearheaded the project’s technical architecture, ensuring scalable and maintainable systems across gameplay, AI, and graphics.",
      "Built a custom engine editor with ImGui and contributed to the rendering system using C++ and OpenGL.",
      "Collaborated with artists, designers and programmers to align technical requirements and maintain project progress.",
    ],
  },
  {
    id: "project-3",
    title: "MomoTown",
    role: "Graphics Programmer / 2D Artist",
    period: "4 months",
    summary: "MomoTown is a casual 2D isometric city-builder game developed in Alpha Engine.",
    repo: "https://github.com/JarrettAng/Momotaro",
    image: "/images/Momotown.jpg",
    imageAlt: "Project detail visual for MomoTown.",
    gallery: [
      { type: "video", src: "/videos/Momotown_Trailer.mp4" },
    ],
    stack: ["Custom Engine", "C++", "Game Art"],
    impactBullets: [
      "Developed the rendering pipeline for 2D sprites, backgrounds and effects, streamlining asset integration and optimizing performance.",
      "Created sprites, backgrounds and visual assets while maintaining the game’s art style and thematic consistency.",
      "Designed a responsive input systems for UI navigation and player interactions.",
    ],
  },  
  {
    id: "project-4",
    title: "MouseHunt IAP2Gold",
    role: "Solo Developer",
    period: "1 Week",
    summary: "MouseHunt IAP2Gold is a Chrome extension that calculates the gold value of MouseHunt IAPs using live marketplace buy orders.",
    image: "/images/IAP2Gold.png",
    imageAlt: "Project detail visual for MouseHunt IAP2Gold.",
    repo: "https://github.com/JunRong19/MouseHunt-IAP2Gold",
    gallery: [
      { type: "image", src: "/images/IAP2Gold_SS.png", alt: "MouseHunt IAP2Gold screenshot." },
    ],
    stack: ["Chrome Extension", "JavaScript", "Web Scraping"],
    impactBullets: [
      "Web scraped MouseHunt IAPs and live marketplace buy orders to find the most cost-effective IAPs for purchase.",
      "Deployed and maintained the extension on the Chrome Web Store, handling packaging and updates.",
      "Utilized API calls to fetch real-time data, ensuring accurate and up-to-date calculations.",
    ],
  },
];

/** @type {ContactItem[]} */
export const quickContacts = [
  { id: "resume", label: "Resume", value: "Resume", href: "./Tan Jun Rong_Resume_Light.pdf" },
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

