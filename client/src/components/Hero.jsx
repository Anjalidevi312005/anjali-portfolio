import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/content.js';
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, MailIcon } from './icons.jsx';

const ROLES = ['Software Engineer', 'Backend Developer', 'MERN Stack Dev', 'Problem Solver'];

// Lightweight typewriter effect for the role line.
function useTypewriter(words, speed = 90, pause = 1400) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setI((p) => p + 1);
    } else {
      t = setTimeout(() => {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <header className="hero" id="home">
      <div className="container hero-grid">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span className="hero-greet" variants={item}>
            👋 Hello, I’m
          </motion.span>

          <motion.h1 variants={item}>
            Anjali <span className="grad">Devi</span>
          </motion.h1>

          <motion.div className="hero-role" variants={item}>
            <span className="typed">{typed}</span>
          </motion.div>

          <motion.p className="hero-desc" variants={item}>
            {profile.tagline} I love turning complex problems into clean, reliable APIs and
            shipping real products that serve real users.
          </motion.p>

          <motion.div className="hero-actions" variants={item}>
            <a className="btn btn-primary" href="#projects">
              View My Work →
            </a>
            <a className="btn btn-ghost" href="/Anjali_Devi_Resume.pdf" target="_blank" rel="noreferrer">
              ⬇ Download Resume
            </a>
          </motion.div>

          <motion.div className="hero-socials" variants={item}>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub"><GitHubIcon /></a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href={profile.socials.leetcode} target="_blank" rel="noreferrer" title="LeetCode" aria-label="LeetCode"><LeetCodeIcon /></a>
            <a href={`mailto:${profile.email}`} title="Email" aria-label="Email"><MailIcon /></a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-photo-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="hero-photo-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="hero-photo"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src="/anjali.jpg" alt="Anjali Devi" />
          </motion.div>

          <motion.div
            className="hero-badge b1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <span className="dot" /> Open to opportunities
          </motion.div>
          <motion.div
            className="hero-badge b2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            <span className="big">8.85</span> CGPA
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
