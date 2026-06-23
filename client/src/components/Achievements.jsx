import Reveal from './Reveal.jsx';
import { achievements } from '../data/content.js';

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Achievements</span>
          <h2 className="section-title">Milestones &amp; Recognition</h2>
        </Reveal>

        <div className="achv-grid">
          {achievements.map((a, i) => (
            <Reveal className="achv-card" key={i} delay={i * 0.1}>
              <div className="achv-icon">{a.icon}</div>
              <p>{a.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
