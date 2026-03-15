import { useEffect, useRef, useState } from "react";
import { contacts, cursorTrailConfig, education, expertise, experiences, hero, navItems, projects, quickContacts } from "./data/content";
import { useCursorTrail } from "./hooks/useCursorTrail";
import { useReveal } from "./hooks/useReveal";
import { useTheme } from "./hooks/useTheme";
import "./styles.css";

function App() {
  const BASE_CUBE_SHELL_HEIGHT = 500;
  const DETAIL_HEIGHT_DELTA = 96;
  const CUBE_VIEWPORT_GUTTER = 16;
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
  const [showSettleFeedback, setShowSettleFeedback] = useState(false);
  const trailLayerRef = useRef(null);
  const leftColumnRef = useRef(null);
  const leftRailRef = useRef(null);
  const cubeStageRef = useRef(null);
  const cubeShellRef = useRef(null);
  const profileProbeRef = useRef(null);
  const detailProbeRefs = useRef({});
  const cubeTimerRef = useRef([]);
  const settleFeedbackTimerRef = useRef(null);
  const cubeBusyRef = useRef(false);
  const queuedResetRef = useRef(false);
  const [cubeDepth, setCubeDepth] = useState(260);
  const [profileShellHeight, setProfileShellHeight] = useState(BASE_CUBE_SHELL_HEIGHT);
  const [detailShellHeight, setDetailShellHeight] = useState(BASE_CUBE_SHELL_HEIGHT + DETAIL_HEIGHT_DELTA);
  const [maxCubeViewportHeight, setMaxCubeViewportHeight] = useState(null);
  const CUBE_TRANSITION_MS = 520;
  const SNAP_TICK_MS = 34;
  const SETTLE_FEEDBACK_MS = 620;
  const getFaceIndexFromAngle = (angle) => ((Math.round((-angle) / 90) % 4) + 4) % 4;
  const visibleFaceIndex = getFaceIndexFromAngle(cubeAngle);
  const mobileVisibleFaceIndex = leftPanelMode === "profile" ? 0 : visibleFaceIndex;
  const getProjectById = (projectId) => projects.find((project) => project.id === projectId) ?? projects[0];
  const resolvePublicAsset = (assetPath) => {
    if (!assetPath) {
      return "";
    }
    if (/^(?:[a-z]+:)?\/\//i.test(assetPath)) {
      return assetPath;
    }

    const normalizedPath = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
    return `${import.meta.env.BASE_URL}${normalizedPath}`;
  };
  const frontDetailProject = getProjectById(faceProjectMap[0]);
  const showProfileFront = leftPanelMode === "profile" || cubePhase === "rotating";
  const isCubeInteractive = cubePhase === "idle";
  const isExpandedHeight = cubePhase !== "returning" && leftPanelMode === "projectDetail";
  const shouldReserveExpandedBottom = leftPanelMode === "projectDetail";
  const desiredCubeHeight = isExpandedHeight ? detailShellHeight : profileShellHeight;
  const collapsedRenderedHeight = profileShellHeight;
  const expandedRenderedHeight = isExpandedHeight && maxCubeViewportHeight != null
    ? Math.min(desiredCubeHeight, maxCubeViewportHeight)
    : desiredCubeHeight;
  const expandedBottomReserve = shouldReserveExpandedBottom
    ? Math.max(0, detailShellHeight - profileShellHeight + CUBE_VIEWPORT_GUTTER)
    : 0;
  const cubeContentScale = 1;
  const cubeStageStyle = {
    "--cube-anchor-height": `${collapsedRenderedHeight}px`,
  };
  const cubeShellStyle = {
    "--cube-shell-height": `${expandedRenderedHeight}px`,
    "--cube-transition-ms": `${CUBE_TRANSITION_MS}ms`,
  };
  const cubeSpacerStyle = {
    "--cube-bottom-reserve": `${expandedBottomReserve}px`,
    "--cube-transition-ms": `${CUBE_TRANSITION_MS}ms`,
  };
  const cubeSceneStyle = {
    "--cube-angle": `${cubeAngle}deg`,
    "--cube-depth": `${cubeDepth}px`,
    "--cube-content-scale": `${cubeContentScale}`,
    "--cube-shell-height": `${expandedRenderedHeight}px`,
    "--cube-settle-ms": `${SETTLE_FEEDBACK_MS}ms`,
    "--cube-transition-ms": `${CUBE_TRANSITION_MS}ms`,
  };

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

  const clearSettleFeedback = () => {
    if (settleFeedbackTimerRef.current) {
      window.clearTimeout(settleFeedbackTimerRef.current);
      settleFeedbackTimerRef.current = null;
    }
    setShowSettleFeedback(false);
  };

  const triggerSettleFeedback = () => {
    if (settleFeedbackTimerRef.current) {
      window.clearTimeout(settleFeedbackTimerRef.current);
    }

    setShowSettleFeedback(true);
    settleFeedbackTimerRef.current = window.setTimeout(() => {
      settleFeedbackTimerRef.current = null;
      setShowSettleFeedback(false);
    }, SETTLE_FEEDBACK_MS);
  };

  const rotateToProject = (projectId) => {
    if (!projectId || cubeBusyRef.current || !isCubeInteractive) {
      return;
    }
    queuedResetRef.current = false;
    clearSettleFeedback();

    if (leftPanelMode !== "projectDetail") {
      cubeBusyRef.current = true;
      clearCubeTimer();
      setPendingProjectId(projectId);
      setActiveProjectId(projectId);
      setExpandedProject(projectId);
      setLeftPanelMode("projectDetail");
      setCubePhase("rotating");
      setFaceProjectMap((previous) => {
        const next = [...previous];
        next[3] = projectId;
        return next;
      });
      setCubeAngle(90);
      queueCubeTimer(() => {
        setFaceProjectMap((previous) => {
          const next = [...previous];
          next[0] = projectId;
          next[3] = projectId;
          return next;
        });
        setPendingProjectId("");
        setCubePhase("snap");
        setCubeAngle(0);
      }, CUBE_TRANSITION_MS);
      queueCubeTimer(() => {
        cubeBusyRef.current = false;
        setCubePhase("idle");
        triggerSettleFeedback();
      }, CUBE_TRANSITION_MS + SNAP_TICK_MS);
      return;
    }

    if (projectId === activeProjectId) {
      setExpandedProject(projectId);
      return;
    }

    cubeBusyRef.current = true;
    clearCubeTimer();
    setExpandedProject(projectId);
    setPendingProjectId(projectId);
    setCubePhase("switching");
    setFaceProjectMap((previous) => {
      const next = [...previous];
      next[3] = projectId;
      return next;
    });
    setCubeAngle(90);
    queueCubeTimer(() => {
      setActiveProjectId(projectId);
      setPendingProjectId("");
      setFaceProjectMap((previous) => {
        const next = [...previous];
        next[0] = projectId;
        next[3] = projectId;
        return next;
      });
      setCubePhase("snap");
      setCubeAngle(0);
    }, CUBE_TRANSITION_MS);
    queueCubeTimer(() => {
      cubeBusyRef.current = false;
      setCubePhase("idle");
      triggerSettleFeedback();
    }, CUBE_TRANSITION_MS + SNAP_TICK_MS);
  };

  const runResetCube = () => {
    cubeBusyRef.current = true;
    clearCubeTimer();
    clearSettleFeedback();
    setPendingProjectId("");
    setCubePhase("returning");
    setCubeAngle(-90);
    queueCubeTimer(() => {
      setLeftPanelMode("profile");
      setExpandedProject("");
      setCubePhase("snap");
      setCubeAngle(0);
    }, CUBE_TRANSITION_MS);
    queueCubeTimer(() => {
      cubeBusyRef.current = false;
      setCubePhase("idle");
      triggerSettleFeedback();
    }, CUBE_TRANSITION_MS + SNAP_TICK_MS);
  };

  const resetCube = () => {
    if (leftPanelMode !== "projectDetail") {
      return;
    }

    if (cubeBusyRef.current || !isCubeInteractive) {
      queuedResetRef.current = true;
      return;
    }

    queuedResetRef.current = false;
    runResetCube();
  };

  const renderFaceContent = (className, children) => (
    <div className="cube-face-scale">
      <div className={`cube-face-inner ${className}`}>
        {children}
      </div>
    </div>
  );

  const renderProfileFace = (keyPrefix) => renderFaceContent("cube-face-profile", (
    <>
      {/* <p className="eyebrow">{hero.eyebrow}</p> */}
      <div className="hero-header">
                <h1 className="headline">
          <span className="headline-line">Hello, I&apos;m</span>
          <span className="headline-sub">
            JUN RONG
            <span className="wave-emoji" aria-hidden="true">{"\u{1F44B}"}</span>
          </span>
        </h1>
        {/* <img
          className="hero-face"
          src={resolvePublicAsset("/images/Face.png")}
          alt="Portrait"
        /> */}
      </div>

      <p className="hero-copy">{hero.subheadline}</p>

      <div className="hero-contacts" aria-label="Contact links">
        {quickContacts.map((item, index) => (
          <span key={`${keyPrefix}-${item.id}`} className="hero-contact-item">
            <a
              className={`contact-row ${item.id === "resume" ? "is-resume" : ""}`}
              href={item.href}
              target={item.id === "email" ? undefined : "_blank"}
              rel={item.id === "email" ? undefined : "noreferrer"}
            >
              <span>{item.label}</span>
            </a>
            {index < quickContacts.length - 1 ? (
              <span className="hero-contact-sep" aria-hidden="true">|</span>
            ) : null}
          </span>
        ))}
      </div>


      <p className="section-kicker education-kicker">Education</p>
      <div className="education-list" aria-label="Education">
        {education.map((item) => (
          <div key={item.id} className="education-item">
            <div className="education-head">
              <span className="education-school">{item.school}</span>
              <span className="education-period">{item.period}</span>
            </div>
            <p className="education-program">{item.program}</p>
            {/* <p className="education-score">{item.cgpa}</p> */}
          </div>
        ))}
      </div>

      <p className="section-kicker expertise-kicker">Expertise</p>
      <div className="expertise-list" aria-label="Expertise">
        {expertise.map((group) => (
          <div key={group.id} className="expertise-group">
            <div className="expertise-title">{group.title}</div>
              <div className="expertise-tags">
                {group.items.map((item) => (
                  <span
                    key={`${group.id}-${item.label}`}
                    className="expertise-tag"
                  >
                    <img
                      className="expertise-icon"
                      src={resolvePublicAsset(item.icon)}
                      alt={`${item.label} logo`}
                      loading="lazy"
                    />
                  </span>
                ))}
              </div>
            </div>
        ))}
      </div>



      <p className="hero-itch">
        Looking for more? Check out my game projects <a className="hero-itch-link" href="https://kyahiax.itch.io/" target="_blank" rel="noreferrer">here</a>!
      </p>

    </>
  ));

  const renderProjectFace = (project, keyPrefix) => renderFaceContent("cube-face-detail", (
    <>
      <p className="eyebrow">Project Detail</p>
      <h2 className="panel-title">{project.title}</h2>
      <p className="meta">
        {project.role} / {project.period}
      </p>
      <p className="hero-copy">{project.summary}</p>
      {project.image ? (
        <figure className="project-detail-media">
          <img
            className="project-detail-image"
            src={resolvePublicAsset(project.image)}
            alt={project.imageAlt ?? `${project.title} preview`}
          />
        </figure>
      ) : null}
      <div className="tag-row">
        {project.stack.map((tag) => (
          <span className="tag" key={`${keyPrefix}-${tag}`}>
            {tag}
          </span>
        ))}
      </div>
      <ul className="simple-list compact">
        {project.impactBullets.slice(0, 3).map((point) => (
          <li key={`${keyPrefix}-${point}`}>{point}</li>
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
  ));

  useReveal();
  useCursorTrail(trailLayerRef, cursorTrailConfig);

  const emphasizeNumbers = (text) => {
    const tokenRegex = /(\d+(?:\.\d+)?(?:%|\+)?)(?!-star)/g;
    const isNumberToken = /^\d+(?:\.\d+)?(?:%|\+)?$/;
    return text.split(tokenRegex).map((part, index) => (
      isNumberToken.test(part)
        ? <span className="stat" key={`${text}-${index}`}>{part}</span>
        : part
    ));
  };

  useEffect(() => {
    const profileNode = profileProbeRef.current;
    const detailNodes = projects
      .map((project) => detailProbeRefs.current[project.id])
      .filter(Boolean);

    if (!profileNode || !detailNodes.length || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const updateMeasuredHeights = () => {
      const nextProfileHeight = Math.max(
        BASE_CUBE_SHELL_HEIGHT,
        Math.ceil(profileNode.getBoundingClientRect().height),
      );
      const maxDetailHeight = detailNodes.reduce((largestHeight, node) => (
        Math.max(largestHeight, Math.ceil(node.getBoundingClientRect().height))
      ), 0);
      const nextDetailHeight = Math.max(
        nextProfileHeight + DETAIL_HEIGHT_DELTA,
        maxDetailHeight,
      );

      setProfileShellHeight((previous) => (previous === nextProfileHeight ? previous : nextProfileHeight));
      setDetailShellHeight((previous) => (previous === nextDetailHeight ? previous : nextDetailHeight));
    };

    updateMeasuredHeights();

    const observer = new ResizeObserver(() => {
      updateMeasuredHeights();
    });

    observer.observe(profileNode);
    detailNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = cubeShellRef.current;
    if (!node || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const updateCubeDepth = (width) => {
      if (!width) {
        return;
      }
      setCubeDepth(Math.round(width));
    };

    updateCubeDepth(node.clientWidth);

    const observer = new ResizeObserver((entries) => {
      const nextWidth = entries[0]?.contentRect?.width ?? node.clientWidth;
      updateCubeDepth(nextWidth);
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const railNode = leftRailRef.current;
    if (!railNode || typeof window === "undefined") {
      return undefined;
    }

    const updateViewportCap = () => {
      const railStyles = window.getComputedStyle(railNode);
      const railTop = Number.parseFloat(railStyles.top) || 0;
      const nextMaxHeight = Math.max(
        1,
        Math.floor(window.innerHeight - railTop - CUBE_VIEWPORT_GUTTER),
      );

      setMaxCubeViewportHeight((previous) => (
        previous === nextMaxHeight ? previous : nextMaxHeight
      ));
    };

    updateViewportCap();
    window.addEventListener("resize", updateViewportCap);

    return () => window.removeEventListener("resize", updateViewportCap);
  }, []);

  // Intentionally no viewport cap: the left box should not resize while scrolling.

  useEffect(() => {
    if (cubePhase !== "idle" || leftPanelMode !== "projectDetail" || cubeBusyRef.current || !queuedResetRef.current) {
      return;
    }

    queuedResetRef.current = false;
    runResetCube();
  }, [cubePhase, leftPanelMode]);

  useEffect(() => () => {
    clearCubeTimer();
    if (settleFeedbackTimerRef.current) {
      window.clearTimeout(settleFeedbackTimerRef.current);
      settleFeedbackTimerRef.current = null;
    }
    cubeBusyRef.current = false;
    queuedResetRef.current = false;
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
        {/* <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav> */}
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
        <div ref={leftColumnRef} className="left-column">
          <aside ref={leftRailRef} id="hero" className="left-rail">
            <div
              ref={cubeStageRef}
              className="cube-stage"
              style={cubeStageStyle}
            >
              <div
                ref={cubeShellRef}
                className={`cube-shell phase-${cubePhase}`}
                style={cubeShellStyle}
              >
                <div
                  className={`cube-scene ${leftPanelMode === "projectDetail" ? "is-rotated" : ""} phase-${cubePhase}`}
                  style={cubeSceneStyle}
                  data-pending={pendingProjectId ? "true" : "false"}
                >
                  <div
                    className="cube-face cube-front"
                    data-visible={visibleFaceIndex === 0 ? "true" : "false"}
                    data-mobile-visible={mobileVisibleFaceIndex === 0 ? "true" : "false"}
                  >
                    {showSettleFeedback && cubePhase === "idle" ? (
                      <div className="cube-face-feedback" aria-hidden="true">
                        <span className="cube-face-feedback-branch cube-face-feedback-branch-top-right" />
                        <span className="cube-face-feedback-branch cube-face-feedback-branch-left-bottom" />
                      </div>
                    ) : null}
                    {showProfileFront ? renderProfileFace("front-profile") : renderProjectFace(frontDetailProject, "front-detail")}
                  </div>

                  {[1, 2, 3].map((faceIndex) => {
                    const faceProject = getProjectById(faceProjectMap[faceIndex]);
                    const faceClass = faceIndex === 1 ? "cube-right" : faceIndex === 2 ? "cube-back" : "cube-left";
                    const showProfileFace = faceIndex === 1 && cubePhase === "returning";
                    return (
                      <div
                        className={`cube-face ${faceClass}`}
                        key={faceClass}
                        data-visible={visibleFaceIndex === faceIndex ? "true" : "false"}
                        data-mobile-visible={mobileVisibleFaceIndex === faceIndex ? "true" : "false"}
                        aria-live={visibleFaceIndex === faceIndex ? "polite" : "off"}
                      >
                        {showProfileFace ? renderProfileFace(`${faceClass}-profile`) : renderProjectFace(faceProject, `${faceClass}-detail`)}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="cube-measurements" aria-hidden="true">
                <div ref={profileProbeRef} className="cube-measure-probe cube-measure-probe-profile">
                  {renderProfileFace("measure-profile")}
                </div>
                {projects.map((project) => (
                  <div
                    key={`measure-${project.id}`}
                    ref={(node) => {
                      if (node) {
                        detailProbeRefs.current[project.id] = node;
                        return;
                      }
                      delete detailProbeRefs.current[project.id];
                    }}
                    className="cube-measure-probe cube-measure-probe-detail"
                  >
                    {renderProjectFace(project, `measure-${project.id}`)}
                  </div>
                ))}
              </div>
            </div>
          </aside>
          <div className="cube-stage-spacer" style={cubeSpacerStyle} aria-hidden="true" />
        </div>

        <div className="right-flow">
          

          <section id="projects" className="section">
            <p className="section-kicker">Featured Projects</p>
            {/* <h2>Selected technical work</h2> */}
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

                    {/* <div className="project-placeholder" aria-hidden="true">
                      Project Visual Placeholder
                    </div> */}

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

          <section id="experience" className="section" data-reveal>
            <p className="section-kicker">Experience</p>
            {/* <h2>Recent roles and outcomes</h2> */}
            <div className="timeline">
              {experiences.map((item) => (
                <article key={item.id} className="timeline-item">
                  <div className="timeline-top">
                    <div className="timeline-copy">
                      <h3 className="timeline-role">{item.role}</h3>
                      <p className="timeline-company">{item.company}</p>
                    </div>
                    <div className="timeline-meta">
                      <span className="timeline-period">{item.period}</span>
                      {item.logo ? (
                        <div className="timeline-logo-wrap">
                          <img
                            className="timeline-logo"
                            src={resolvePublicAsset(item.logo)}
                            alt={item.logoAlt ?? `${item.company} logo`}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <ul className="simple-list">
                    {item.impactBullets.map((point) => (
                      <li key={point}>{emphasizeNumbers(point)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="section" data-reveal>
            <p className="section-kicker">Open To Opportunities</p>
            {/* <h2>Open to opportunities</h2> */}
            <div className="contact-list">
              {contacts.map((item) => (
                <div key={item.id} className="contact-row">
                  <span>{item.label}</span>
                  <a
                    className="contact-link"
                    href={item.href}
                    target={item.id === "email" ? undefined : "_blank"}
                    rel={item.id === "email" ? undefined : "noreferrer"}
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;

