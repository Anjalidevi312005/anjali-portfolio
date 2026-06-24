import { Router } from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import { projects as seedProjects, skills as seedSkills } from '../data/seedData.js';
import { sendContactNotification } from '../services/email.js';

const router = Router();

// True when Mongoose has an active connection.
const dbReady = () => mongoose.connection.readyState === 1;

// Basic email sanity check.
const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// GET /api/projects — featured first, then newest.
router.get('/projects', async (_req, res) => {
  try {
    if (dbReady()) {
      const docs = await Project.find().sort({ featured: -1, year: -1 }).lean();
      if (docs.length) return res.json(docs);
    }
  } catch (err) {
    console.error('projects read failed, using seed fallback:', err.message);
  }
  // Fallback: serve seed data so the site never looks empty.
  const sorted = [...seedProjects].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year
  );
  res.json(sorted);
});

// GET /api/skills — grouped by category, in display order.
router.get('/skills', async (_req, res) => {
  try {
    if (dbReady()) {
      const docs = await Skill.find().sort({ order: 1 }).lean();
      if (docs.length) return res.json(docs);
    }
  } catch (err) {
    console.error('skills read failed, using seed fallback:', err.message);
  }
  res.json([...seedSkills].sort((a, b) => a.order - b.order));
});

// POST /api/contact — save a visitor message.
router.post('/contact', async (req, res) => {
  const { name, email, subject, message, website } = req.body || {};

  // Honeypot: real users never see/fill `website`. If it's set, it's a bot —
  // pretend success so the bot doesn't retry, but discard the message.
  if (website && String(website).trim()) {
    return res.status(201).json({ ok: true, message: 'Thanks! Your message has been received.' });
  }

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: 'Please enter your name.' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!message || String(message).trim().length < 5) {
    return res.status(400).json({ error: 'Please write a slightly longer message.' });
  }

  if (!dbReady()) {
    return res.status(503).json({
      error: 'Message service is temporarily unavailable. Please email me directly.'
    });
  }

  try {
    await Message.create({ name, email, subject, message });
    // Fire-and-forget email notification — never block or fail the response on it.
    sendContactNotification({ name, email, subject, message })
      .catch((e) => console.error('email notify failed:', e.message));
    res.status(201).json({ ok: true, message: 'Thanks! Your message has been received.' });
  } catch (err) {
    console.error('contact save failed:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

// Health check. Reports only connection status — no internal error details
// are exposed publicly (avoids leaking DB host/auth info).
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', db: dbReady() ? 'connected' : 'disconnected' });
});

export default router;
