import { profile } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="brand">Anjali<span style={{ color: 'var(--accent)' }}>.</span></div>
          <p>© {new Date().getFullYear()} Anjali Devi · All rights reserved.</p>
        </div>
        <div className="footer-socials">
          <a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.socials.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}
