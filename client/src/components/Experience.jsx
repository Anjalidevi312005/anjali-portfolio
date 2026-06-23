import Reveal from './Reveal.jsx';
import { experience } from '../data/content.js';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Experience</span>
          <h2 className="section-title">Where I’ve Worked</h2>
        </Reveal>

        <div className="timeline">
          {experience.map((exp, i) => (
            <Reveal className={`exp-item ${exp.current ? 'current' : ''}`} key={exp.company} delay={i * 0.1}>
              <div className="exp-card">
                <div className="exp-top">
                  <div>
                    <span className="exp-role">{exp.role}</span>
                    {exp.current && <span className="exp-badge">Current</span>}
                    <div className="exp-company">{exp.company}</div>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <ul className="exp-points">
                  {exp.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
