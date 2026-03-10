import { useEffect, useRef, useState } from "react";
import { contacts, cursorTrailConfig, experiences, hero, navItems, projects } from "./data/content";
import { useCursorTrail } from "./hooks/useCursorTrail";
import { useReveal } from "./hooks/useReveal";
import { useTheme } from "./hooks/useTheme";
import "./styles.css";

function App() {
  const { theme, toggleTheme } = useTheme("dark");
  const initialProjectId = projects[0]?.id ?? "";
  const [expandedProject, setExpandedProject] = useState("");
  const [leftPanelMode, setLeftPanelMode] = useState("profile");
  const [activeProjectId, setActiveProjectId] = useState(initialProjectId);
  const [faceProjectMap, setFaceProjectMap] = useState(() => [
    initialProjectId,
    initialProjectId,
    initialProjectId,
    initialProjectId,
  ]);
  const [cubeAngle, setCubeAngle] = useState(0);
  const [cubePhase, setCubePhase] = useState("idle");
  const [pendingProjectId, setPendingProjectId] = useState("");
  const trailLayerRef = useRef(null);
  const cubeTimerRef = useRef([]);
  const cubeBusyRef = useRef(false);
  const CUBE_TRANSITION_MS = 520;
  const CUBE_SWITCH_SWAP_MS = Math.round(CUBE_TRANSITION_MS * 0.5);
  const SNAP_TICK_MS = 34;
  const getFaceIndexFromAngle = (angle) => ((Math.round((-angle) / 90) % 4) + 4) % 4;
  const visibleFaceIndex = getFaceIndexFromAngle(cubeAngle);
  const mobileVisibleFaceIndex = leftPanelMode === "profile" ? 0 : visibleFaceIndex;
  const getProjectById = (projectId) => projects.find((project) => project.id === projectId) ?? projects[0];
  const frontDetailProject = getProjectById(faceProjectMap[0]);
  const showProfileFront = leftPanelMode === "profile" || cubePhase === "rotating" || cubePhase === "returning";

  const clearCubeTimer = () => {
    if (!cubeTimerRef.current.length) {
      return;
    }
    cubeTimerRef.current.forEach((timerId) => window.clearTimeout(timerId));
    cubeTimerRef.current = [];
  };

  const queueCubeTimer = (fn, delay) => {
    const timerId = window.setTimeout(fn, delay);
    cubeTimerRef.current.push(timerId);
  };

  const rotateToProject = (projectId) => {
    if (!projectId || cubeBusyRef.current) {
      return;
    }
    cubeBusyRef.current = true;

    if (leftPanelMode !== "projectDetail") {
      clearCubeTimer();
      setPendingProjectId("");
      setActiveProjectId(projectId);
      setExpandedProject(projectId);
      setLeftPanelMode("projectDetail");
      setCubePhase("rotating");
      setFaceProjectMap((previous) => {
        const next = [...previous];
        next[1] = projectId;
        return next;
      });
      setCubeAngle((previous) => Math.round(previous / 360) * 360 - 90);
      queueCubeTimer(() => {
        cubeBusyRef.current = false;
        setCubePhase("idle");
      }, CUBE_TRANSITION_MS);
      return;
    }

    if (projectId === activeProjectId) {
      setExpandedProject(projectId);
      return;
    }

    clearCubeTimer();
    setExpandedProject(projectId);
    setPendingProjectId(projectId);
    setCubePhase("switching");
    setCubeAngle((previous) => {
      const targetAngle = previous - 90;
      const targetFaceIndex = getFaceIndexFromAngle(targetAngle);
      setFaceProjectMap((faceMap) => {
        const next = [...faceMap];
        next[targetFaceIndex] = projectId;
        return next;
      });
      return targetAngle;
    });
    queueCubeTimer(() => {
      setActiveProjectId(projectId);
      setPendingProjectId("");
    }, CUBE_SWITCH_SWAP_MS);
    queueCubeTimer(() => {
      setFaceProjectMap((previous) => {
        const next = [...previous];
        next[1] = projectId;
        return next;
      });
      setCubePhase("snap");
      setCubeAngle(-90);
    }, CUBE_TRANSITION_MS);
    queueCubeTimer(() => {
      cubeBusyRef.current = false;
      setCubePhase("idle");
    }, CUBE_TRANSITION_MS + SNAP_TICK_MS);
  };

  const resetCube = () => {
    if (cubeBusyRef.current || leftPanelMode !== "projectDetail") {
      return;
    }
    cubeBusyRef.current = true;
    clearCubeTimer();
    setPendingProjectId("");
    setCubePhase("returning");
    setCubeAngle(0);
    queueCubeTimer(() => {
      setLeftPanelMode("profile");
      setExpandedProject("");
      setCubePhase("snap");
    }, CUBE_TRANSITION_MS);
    queueCubeTimer(() => {
      cubeBusyRef.current = false;
      setCubePhase("idle");
    }, CUBE_TRANSITION_MS + SNAP_TICK_MS);
  };

  useReveal();
  useCursorTrail(trailLayerRef, cursorTrailConfig);
  useEffect(() => () => {
    clearCubeTimer();
    cubeBusyRef.current = false;
  }, []);

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
            className={`cube-scene ${leftPanelMode === "projectDetail" ? "is-rotated" : ""} phase-${cubePhase}`}
            style={{ "--cube-angle": `${cubeAngle}deg` }}
            data-pending={pendingProjectId ? "true" : "false"}
          >
            <div
              className="cube-face cube-front"
              data-visible={visibleFaceIndex === 0 ? "true" : "false"}
              data-mobile-visible={mobileVisibleFaceIndex === 0 ? "true" : "false"}
            >
              {showProfileFront ? (
                <>
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
                </>
              ) : (
                <>
                  <p className="eyebrow">Project Detail</p>
                  <h2 className="panel-title">{frontDetailProject.title}</h2>
                  <p className="meta">
                    {frontDetailProject.role} / {frontDetailProject.period}
                  </p>
                  <p className="hero-copy">{frontDetailProject.summary}</p>
                  <div className="tag-row">
                    {frontDetailProject.stack.map((tag) => (
                      <span className="tag" key={`front-${tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ul className="simple-list compact">
                    {frontDetailProject.impactBullets.slice(0, 3).map((point) => (
                      <li key={`front-${point}`}>{point}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="project-toggle left-back"
                    onClick={resetCube}
                  >
                    Back
                  </button>
                </>
              )}
            </div>

            {[1, 2, 3].map((faceIndex) => {
              const faceProject = getProjectById(faceProjectMap[faceIndex]);
              const faceClass = faceIndex === 1 ? "cube-right" : faceIndex === 2 ? "cube-back" : "cube-left";
              return (
                <div
                  className={`cube-face ${faceClass}`}
                  key={faceClass}
                  data-visible={visibleFaceIndex === faceIndex ? "true" : "false"}
                  data-mobile-visible={mobileVisibleFaceIndex === faceIndex ? "true" : "false"}
                  aria-live={visibleFaceIndex === faceIndex ? "polite" : "off"}
                >
                  <p className="eyebrow">Project Detail</p>
                  <h2 className="panel-title">{faceProject.title}</h2>
                  <p className="meta">
                    {faceProject.role} / {faceProject.period}
                  </p>
                  <p className="hero-copy">{faceProject.summary}</p>
                  <div className="tag-row">
                    {faceProject.stack.map((tag) => (
                      <span className="tag" key={`${faceClass}-${tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ul className="simple-list compact">
                    {faceProject.impactBullets.slice(0, 3).map((point) => (
                      <li key={`${faceClass}-${point}`}>{point}</li>
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
              );
            })}
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
