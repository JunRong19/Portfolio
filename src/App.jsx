import { useState } from "react";
import { contacts, experiences, hero, navItems, projects, skillGroups } from "./data/content";
import { useMobileNav } from "./hooks/useMobileNav";
import { useReveal } from "./hooks/useReveal";
import { useTheme } from "./hooks/useTheme";
import "./styles.css";

function asset(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}

function App() {
  const { theme, toggleTheme } = useTheme("dark");
  const { isOpen, closeMenu, toggleMenu } = useMobileNav();
  const [expandedProject, setExpandedProject] = useState(projects[0]?.id ?? "");

  useReveal();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="atmosphere" aria-hidden="true" />

      <header className="site-header">
        <div className="brand-wrap">
          <span className="brand-dot" aria-hidden="true" />
          <div>
            <p className="brand-text">Tan Jun Rong</p>
            <p className="brand-sub">Software Developer</p>
          </div>
        </div>

        <div className="header-controls">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isOpen}
            aria-controls="site-nav"
            onClick={toggleMenu}
          >
            Menu
          </button>
        </div>

        <nav id="site-nav" className={`site-nav ${isOpen ? "is-open" : ""}`} aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="main-content">
        <section id="hero" className="section hero" data-reveal>
          <div className="hero-grid">
            <div className="hero-content">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1>{hero.headline}</h1>
              <p className="hero-copy">{hero.subheadline}</p>
              <div className="cta-row">
                {hero.ctas.map((cta) => (
                  <a key={cta.label} className={`btn ${cta.primary ? "primary" : ""}`} href={cta.href}>
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="hero-portrait-wrap" aria-label="Portrait placeholder">
              <img src={asset(hero.portrait)} alt="Portrait placeholder" className="hero-portrait" />
            </div>
          </div>
        </section>

        <section id="about" className="section" data-reveal>
          <p className="section-kicker">About</p>
          <h2>Get to the point</h2>
          <p>I build software systems that help teams ship faster and with fewer quality gaps.</p>
        </section>

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
          <h2>Snapshot first, details on demand</h2>
          <div className="projects-grid">
            {projects.map((project) => {
              const expanded = expandedProject === project.id;

              return (
                <article key={project.id} className="project-card">
                  <img src={asset(project.coverImage)} alt={`${project.title} cover placeholder`} className="project-cover" />

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

                  <button
                    type="button"
                    className="project-toggle"
                    aria-expanded={expanded}
                    aria-controls={`${project.id}-details`}
                    onClick={() => setExpandedProject(expanded ? "" : project.id)}
                  >
                    {expanded ? "Hide details" : "View details"}
                  </button>

                  <div id={`${project.id}-details`} className="project-details" hidden={!expanded}>
                    <ul className="simple-list">
                      {project.impactBullets.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <div className="gallery-grid">
                      {project.galleryImages.map((img, index) => (
                        <img key={img} src={asset(img)} alt={`${project.title} placeholder ${index + 1}`} className="gallery-item" />
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="skills" className="section" data-reveal>
          <p className="section-kicker">Skills</p>
          <h2>Core capabilities</h2>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article key={group.id} className="skill-group">
                <h3>{group.title}</h3>
                <div className="chip-list">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section" data-reveal>
          <p className="section-kicker">Contact</p>
          <h2>Let&apos;s talk</h2>
          <div className="contact-grid">
            {contacts.map((item) => (
              <a key={item.id} className="contact-card" href={item.href}>
                <h3>{item.label}</h3>
                <p className="meta">{item.value}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
