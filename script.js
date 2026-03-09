const profileLinks = [
  { label: "Download Resume", url: "./Tan_Jun_Rong_Resume_Software_GH.pdf", primary: true },
  { label: "GitHub", url: null, fallbackLabel: "Add GitHub URL" },
  { label: "LinkedIn", url: null, fallbackLabel: "Add LinkedIn URL" },
];

const experience = [
  {
    id: "razer",
    title: "Razer Inc.",
    period: "May 2025 - Present",
    role: "Software Engineer Intern",
    summary:
      "Building QA automation systems and internal tooling for hardware testing workflows.",
    stack: ["Python", "Robot Framework", "Jenkins", "3D Printing", "Electrical Prototyping"],
    highlights: [
      "Built a physical test rig using electrical components and 3D-printed parts to support mouse QA automation.",
      "Wrote and maintained automated test cases using Robot Framework and Python, and deployed runs via Jenkins.",
      "Developed internal tooling that automated repetitive tasks and improved team workflow speed by [METRIC TODO].",
    ],
  },
  {
    id: "fiverr",
    title: "Fiverr",
    period: "2023 - 2025",
    role: "Freelance Game QA Analyst",
    summary:
      "Delivered client-facing QA analysis with reproducible bug reports and actionable recommendations.",
    stack: ["Manual QA", "Issue Reproduction", "Performance Analysis", "Client Communication"],
    highlights: [
      "Collaborated with global clients to deliver tailored test passes aligned to project scope and deadlines.",
      "Analyzed and documented bugs, glitches, and performance issues with clear reproduction steps.",
      "Maintained a consistent 5-star rating across delivered orders.",
    ],
  },
  {
    id: "kettle",
    title: "The Kettle Gourmet",
    period: "2019 - 2020",
    role: "Game Programmer and 3D Modeller Intern",
    summary: "Shipped mobile applications on Android and iOS through iterative agile delivery.",
    stack: ["Unity", "C#", "3D Modelling", "Agile"],
    highlights: [
      "Developed and published mobile applications on Android and iOS stores.",
      "Applied sprint planning and iterative delivery to meet milestone deadlines.",
    ],
  },
];

const projects = [
  {
    id: "keep-it-brief",
    title: "Keep It Brief",
    period: "8 Months | 2024 - 2025",
    role: "Tools Programmer",
    summary: "Built editor tools and performance instrumentation to unblock content and optimization workflows.",
    stack: ["C#", "Unity Editor", "Profiling", "Tooling"],
    highlights: [
      "Created editor UI components that enabled artists and designers to adjust gameplay parameters and assets quickly.",
      "Integrated memory tracking and performance visualization tools to expose bottlenecks and guide optimization.",
      "Improved team productivity by streamlining asset integration and testing workflows by [METRIC TODO].",
    ],
    links: [
      { label: "Trailer", url: null },
      { label: "Code Sample", url: null },
    ],
  },
  {
    id: "ricoshaman",
    title: "Ricoshaman",
    period: "8 Months | 2023 - 2024",
    role: "Technical Lead",
    summary: "Led technical architecture and cross-discipline implementation for gameplay, AI, and graphics systems.",
    stack: ["C++", "Game Architecture", "AI Systems", "Rendering"],
    highlights: [
      "Defined maintainable architecture and engineering best practices across core game systems.",
      "Resolved complex production blockers quickly to protect schedule continuity.",
      "Aligned engineering, art, and design decisions through active technical communication.",
    ],
    links: [{ label: "Game Trailer", url: null }],
  },
  {
    id: "momotown",
    title: "Momotown",
    period: "4 Months | 2023",
    role: "Graphic Programmer and 2D Artist",
    summary: "Implemented rendering and UX systems while taking ownership of 2D production assets.",
    stack: ["2D Rendering", "UI/UX", "Gameplay Input", "Art Pipeline"],
    highlights: [
      "Built a streamlined 2D rendering pipeline to reduce load time and memory usage by [METRIC TODO].",
      "Stepped into 2D art production after a team transition and maintained visual consistency.",
      "Implemented responsive control schemes that improved menu and in-game interactions.",
    ],
    links: [{ label: "Game Trailer", url: null }],
  },
];

const skillGroups = [
  {
    name: "Languages",
    items: [
      { label: "C#", note: "Primary language for gameplay and tooling work." },
      { label: "C/C++", note: "Used in systems and graphics-heavy coursework/projects." },
      { label: "Python", note: "Automation scripts and QA framework integration." },
    ],
  },
  {
    name: "DevOps and QA",
    items: [
      { label: "Robot Framework", note: "Automated test case authoring and maintenance." },
      { label: "Jenkins", note: "Test execution and CI integration for QA workflows." },
      { label: "GitHub", note: "Source control and portfolio/project collaboration." },
    ],
  },
  {
    name: "Software and Engines",
    items: [
      { label: "Unity", note: "Gameplay systems, editor tooling, and mobile deployment." },
      { label: "Game Editors", note: "Custom in-editor interfaces for designers/artists." },
      { label: "3D Modelling", note: "Production support for prototypes and visual assets." },
    ],
  },
  {
    name: "Engineering Focus",
    items: [
      { label: "Tooling", note: "Build tools that speed iteration and reduce manual work." },
      { label: "Performance", note: "Profiling, bottleneck analysis, and optimization guidance." },
      { label: "Cross-team Delivery", note: "Align design/art/engineering constraints to ship on time." },
    ],
  },
];

const contactLinks = [
  { label: "Email", value: "tanjunrong321@gmail.com", url: "mailto:tanjunrong321@gmail.com" },
  { label: "Phone", value: "+65 9012 3414", url: "tel:+6590123414" },
  { label: "GitHub", value: "Add your GitHub profile URL", url: null },
  { label: "LinkedIn", value: "Add your LinkedIn URL", url: null },
  { label: "Fiverr", value: "Add your Fiverr profile URL", url: null },
];

function createExternalLink(href, label, className = "link-chip") {
  if (!href) {
    const disabled = document.createElement("span");
    disabled.className = `${className} disabled`;
    disabled.textContent = `${label} (Coming Soon)`;
    return disabled;
  }

  const a = document.createElement("a");
  a.className = className;
  a.href = href;
  a.textContent = label;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
}

function renderPrimaryLinks() {
  const root = document.querySelector("#primary-links");
  profileLinks.forEach((link) => {
    const element = createExternalLink(link.url, link.url ? link.label : link.fallbackLabel, link.primary ? "btn primary" : "btn");
    root.append(element);
  });
}

function renderExperience() {
  const root = document.querySelector("#experience-timeline");
  experience.forEach((item) => {
    const article = document.createElement("article");
    article.className = "timeline-item reveal";
    article.innerHTML = `
      <div class="timeline-top">
        <div>
          <h3 class="timeline-role">${item.role}</h3>
          <p><strong>${item.title}</strong></p>
        </div>
        <span class="timeline-period">${item.period}</span>
      </div>
      <p>${item.summary}</p>
      <ul class="simple-list">
        ${item.highlights.map((point) => `<li>${point}</li>`).join("")}
      </ul>
      <div class="tag-row">
        ${item.stack.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    `;
    root.append(article);
  });
}

function renderProjects() {
  const root = document.querySelector("#projects-grid");
  projects.forEach((project, index) => {
    const article = document.createElement("article");
    article.className = "project-card reveal";
    const panelId = `project-panel-${project.id}`;
    article.innerHTML = `
      <div class="project-head">
        <div>
          <h3>${project.title}</h3>
          <p class="meta">${project.role}</p>
        </div>
        <span class="timeline-period">${project.period}</span>
      </div>
      <p>${project.summary}</p>
      <div class="tag-row">
        ${project.stack.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <button
        class="project-toggle"
        type="button"
        aria-expanded="${index === 0 ? "true" : "false"}"
        aria-controls="${panelId}"
      >
        ${index === 0 ? "Hide Case Study" : "View Case Study"}
      </button>
      <div class="project-details" id="${panelId}" ${index === 0 ? "" : "hidden"}>
        <h4>What I built</h4>
        <ul class="simple-list">
          ${project.highlights.map((point) => `<li>${point}</li>`).join("")}
        </ul>
        <div class="link-row">
          ${project.links
            .map((link) =>
              link.url
                ? `<a class="link-chip" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
                : `<span class="link-chip disabled">${link.label} (Coming Soon)</span>`
            )
            .join("")}
        </div>
      </div>
    `;
    root.append(article);
  });
}

function bindProjectToggles() {
  document.querySelectorAll(".project-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isExpanded));
      button.textContent = isExpanded ? "View Case Study" : "Hide Case Study";
      panel.hidden = isExpanded;
    });
  });
}

function renderSkills() {
  const root = document.querySelector("#skills-groups");
  skillGroups.forEach((group) => {
    const container = document.createElement("article");
    container.className = "skill-group";
    container.innerHTML = `
      <h3>${group.name}</h3>
      <div class="chip-list">
        ${group.items
          .map(
            (item) =>
              `<span class="chip" tabindex="0" data-note="${item.note}">${item.label}</span>`
          )
          .join("")}
      </div>
    `;
    root.append(container);
  });
}

function renderContacts() {
  const root = document.querySelector("#contact-links");
  contactLinks.forEach((item) => {
    if (!item.url) {
      const card = document.createElement("div");
      card.className = "contact-card";
      card.innerHTML = `<h3>${item.label}</h3><p class="meta">${item.value}</p>`;
      root.append(card);
      return;
    }

    const a = document.createElement("a");
    a.className = "contact-card";
    a.href = item.url;
    a.innerHTML = `<h3>${item.label}</h3><p class="meta">${item.value}</p>`;
    if (item.url.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    root.append(a);
  });
}

function bindNavHighlight() {
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.setAttribute("aria-current", link.getAttribute("href") === id ? "true" : "false");
        });
      });
    },
    { rootMargin: "-45% 0px -40% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => observer.observe(section));
}

function bindRevealAnimation() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -10% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

renderPrimaryLinks();
renderExperience();
renderProjects();
renderSkills();
renderContacts();
bindProjectToggles();
bindNavHighlight();
bindRevealAnimation();
