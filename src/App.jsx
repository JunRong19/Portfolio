import { useEffect, useRef, useState } from "react";
import { contacts, cursorTrailConfig, experiences, hero, navItems, projects } from "./data/content";
import { useCursorTrail } from "./hooks/useCursorTrail";
import { useReveal } from "./hooks/useReveal";
import { useTheme } from "./hooks/useTheme";
import "./styles.css";

function App() {
  const { theme, toggleTheme } = useTheme("dark");
  const [expandedProject, setExpandedProject] = useState(projects[0]?.id ?? "");
  const [leftPanelMode, setLeftPanelMode] = useState("profile");
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id ?? "");
  const [cubeAngle, setCubeAngle] = useState(0);
  const trailLayerRef = useRef(null);
  const cubeTimerRef = useRef(null);
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0];

  const clearCubeTimer = () => {
    if (!cubeTimerRef.current) {
      return;
    }
    window.clearTimeout(cubeTimerRef.current);
    cubeTimerRef.current = null;
  };

  const rotateToProject = (projectId) => {
    if (!projectId) {
      return;
    }

    if (leftPanelMode !== "projectDetail") {
      clearCubeTimer();
      setActiveProjectId(projectId);
      setExpandedProject(projectId);
      setLeftPanelMode("projectDetail");
      setCubeAngle(-90);
      return;
    }

    if (projectId === activeProjectId) {
      setExpandedProject(projectId);
      return;
    }

    clearCubeTimer();
    setExpandedProject(projectId);
    setCubeAngle((previous) => previous - 360);
    cubeTimerRef.current = window.setTimeout(() => {
      setActiveProjectId(projectId);
    }, 320);
  };

  const resetCube = () => {
    clearCubeTimer();
    setLeftPanelMode("profile");
    setExpandedProject("");
    setCubeAngle(0);
  };

  useReveal();
  useCursorTrail(trailLayerRef, cursorTrailConfig);
  useEffect(() => () => clearCubeTimer(), []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="atmosphere" aria-hidden="true" />
      <div ref={trailLayerRef} className="cursor-trail-layer" aria-hidden="true" />

      <header className="site-header">
        <p className="brand-line">Tan Jun Rong / Software Developer</p>
        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <span className="theme-icon" aria-hidden="true" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </header>

      <main id="main-content" className="layout-grid">
        <aside id="hero" className="left-rail">
          <div
            className={`cube-scene ${leftPanelMode === "projectDetail" ? "is-rotated" : ""}`}
            style={{ "--cube-angle": `${cubeAngle}deg` }}
          >
            <div className="cube-face cube-front">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1>{hero.headline}</h1>
              <p className="hero-copy">{hero.subheadline}</p>

              <div className="cta-row">
                {hero.ctas.map((cta) => (
                  <a key={cta.label} className={`text-link ${cta.primary ? "strong" : ""}`} href={cta.href}>
                    {cta.label}
                  </a>
                ))}
              </div>

              <div className="quick-links" aria-label="Quick contact links">
                {contacts.map((item) => (
                  <a key={item.id} className="quick-link" href={item.href}>
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="cube-face cube-side" aria-live="polite">
              <p className="eyebrow">Project Detail</p>
              <h2 className="panel-title">{activeProject.title}</h2>
              <p className="meta">
                {activeProject.role} / {activeProject.period}
              </p>
              <p className="hero-copy">{activeProject.summary}</p>
              <div className="tag-row">
                {activeProject.stack.map((tag) => (
                  <span className="tag" key={`left-${tag}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <ul className="simple-list compact">
                {activeProject.impactBullets.slice(0, 3).map((point) => (
                  <li key={`left-${point}`}>{point}</li>
                ))}
              </ul>
              <button
                type="button"
                className="project-toggle left-back"
                onClick={resetCube}
              >
                Back
              </button>
            </div>
          </div>
        </aside>

        <div className="right-flow">
          <section id="experience" className="section" data-reveal>
            <p className="section-kicker">Experience</p>
            <h2>Recent roles and outcomes</h2>
            <div className="timeline">
              {experiences.map((item) => (
                <article key={item.id} className="timeline-item">
                  <div className="timeline-top">
                    <div>
                      <h3 className="timeline-role">{item.role}</h3>
                      <p className="timeline-company">{item.company}</p>
                    </div>
                    <span className="timeline-period">{item.period}</span>
                  </div>
                  <ul className="simple-list">
                    {item.impactBullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="projects" className="section" data-reveal>
            <p className="section-kicker">Projects</p>
            <h2>Selected technical work</h2>
            <div className="projects-grid">
              {projects.map((project) => {
                const expanded = expandedProject === project.id;

                return (
                  <article key={project.id} className="project-item">
                    <div className="project-head">
                      <div>
                        <h3>{project.title}</h3>
                        <p className="meta">{project.role}</p>
                      </div>
                      <span className="timeline-period">{project.period}</span>
                    </div>

                    <p>{project.summary}</p>

                    <div className="tag-row">
                      {project.stack.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-placeholder" aria-hidden="true">
                      Project Visual Placeholder
                    </div>

                    <button
                      type="button"
                      className="project-toggle"
                      aria-expanded={expanded}
                      onClick={() => {
                        if (expanded) {
                          resetCube();
                          return;
                        }
                        rotateToProject(project.id);
                      }}
                    >
                      {expanded ? "Hide details" : "View details"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="contact" className="section" data-reveal>
            <p className="section-kicker">Contact</p>
            <h2>Open to opportunities</h2>
            <div className="contact-list">
              {contacts.map((item) => (
                <a key={item.id} className="contact-row" href={item.href}>
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
