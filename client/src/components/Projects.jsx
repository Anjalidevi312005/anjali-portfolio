import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';
import { getProjects } from '../api.js';
import { fallbackProjects } from '../data/content.js';

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    getProjects()
      .then((data) => {
        if (Array.isArray(data) && data.length) setProjects(data);
      })
      .catch(() => {/* keep fallback */});
  }, []);

  return (
    <section className="section" id="projects" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Projects</span>
          <h2 className="section-title">Things I’ve Built</h2>
          <p className="section-sub">
            From production platforms to AI experiments — here’s some work I’m proud of.
          </p>
        </Reveal>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <Reveal
              className={`project-card ${p.featured ? 'featured' : ''}`}
              key={p.slug || p.title}
              delay={i * 0.06}
            >
              <div className="project-head">
                <div>
                  <div className="project-title">{p.title}</div>
                  <div className="project-tagline">{p.tagline}</div>
                </div>
                {p.featured && <span className="featured-flag">★ Featured · Live</span>}
              </div>

              <p className="project-desc">{p.description}</p>

              {p.highlights?.length > 0 && (
                <ul className="project-highlights">
                  {p.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              )}

              <div className="project-tech">
                {p.tech?.map((t) => (
                  <span className="tech-tag" key={t}>{t}</span>
                ))}
              </div>

              <div className="project-links">
                {p.liveUrl && (
                  <a className="project-link" href={p.liveUrl} target="_blank" rel="noreferrer">
                    🌐 Live Demo →
                  </a>
                )}
                {p.repoUrl && (
                  <a className="project-link muted" href={p.repoUrl} target="_blank" rel="noreferrer">
                    ⟨ ⟩ Code →
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
