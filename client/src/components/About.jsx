import Reveal from './Reveal.jsx';
import { profile, stats, education } from '../data/content.js';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">About Me</span>
          <h2 className="section-title">Get to know me</h2>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-text">
            <p>{profile.summary}</p>
            <p>
              I’m currently a <strong>Backend Developer at Casheco</strong>, where I work on a live
              electronics resale platform — building REST APIs, business logic and keeping production
              systems healthy. Earlier, as an intern at <strong>Stoxilla</strong>, I shipped a payment
              gateway &amp; wallet system used by 1,000+ people.
            </p>
            <p>
              I’m based in <strong>{profile.location}</strong> and I’m always excited to learn,
              collaborate and build things that matter.
            </p>

            <div className="edu-block">
              <h3>🎓 Education</h3>
              {education.map((e) => (
                <div className="edu-item" key={e.school}>
                  <div>
                    <div className="school">{e.school}</div>
                    <div className="detail">{e.detail}</div>
                  </div>
                  <div className="meta">
                    <div className="score">{e.score}</div>
                    <div className="period">{e.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="stats-grid" delay={0.15}>
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
