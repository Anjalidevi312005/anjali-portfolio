import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';
import { getSkills } from '../api.js';
import { fallbackSkills } from '../data/content.js';

export default function Skills() {
  const [skills, setSkills] = useState(fallbackSkills);

  useEffect(() => {
    getSkills()
      .then((data) => {
        if (Array.isArray(data) && data.length) setSkills(data);
      })
      .catch(() => {/* keep fallback */});
  }, []);

  return (
    <section className="section" id="skills" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Skills</span>
          <h2 className="section-title">My Tech Toolbox</h2>
          <p className="section-sub">Technologies and tools I use to bring ideas to life.</p>
        </Reveal>

        <div className="skills-grid">
          {skills.map((group, i) => (
            <Reveal className="skill-card" key={group.category} delay={i * 0.08}>
              <h3>{group.category}</h3>
              <div className="chips">
                {group.items.map((item) => (
                  <span className="chip" key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
