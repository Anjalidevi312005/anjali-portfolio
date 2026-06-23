import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import apiRoutes from './routes/api.js';
import { seedDatabase } from './seed.js';
import { dbState } from './dbState.js';

const app = express();
const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/anjali_portfolio';
// CORS: only the deployed frontend + local dev may call the API.
// CLIENT_ORIGIN env (comma-separated) overrides these defaults if set.
const DEFAULT_ORIGINS = ['https://anjali-portfolio-sandy.vercel.app', 'http://localhost:5173'];
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean)
  : DEFAULT_ORIGINS;

// Behind a hosting proxy (Render/Railway/etc.) — needed for correct client IPs & rate limiting.
app.set('trust proxy', 1);

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin(origin, cb) {
      // Allow no-origin (curl / same-origin / server-to-server) and whitelisted origins only.
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`Origin ${origin} not allowed by CORS`));
    }
  })
);
app.use(express.json());

// Limit contact submissions to curb spam.
app.use(
  '/api/contact',
  rateLimit({ windowMs: 10 * 60 * 1000, max: 15, standardHeaders: true, legacyHeaders: false })
);

app.use('/api', apiRoutes);

app.get('/', (_req, res) => {
  res.send('Anjali Devi — Portfolio API is running. Try /api/health');
});

// Try to connect to MongoDB, retrying in the background so the server
// recovers automatically once the URI / network access is fixed —
// no manual redeploy needed.
async function connectWithRetry() {
  dbState.attempts += 1;
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 });
    dbState.lastError = null;
    console.log('✓ MongoDB connected');
    await seedDatabase();
  } catch (err) {
    dbState.lastError = err.message;
    console.warn(`⚠ MongoDB not connected (attempt ${dbState.attempts}):`, err.message);
    console.warn('  → Serving fallback data; retrying in 15s…');
    setTimeout(connectWithRetry, 15000);
  }
}

// Start the HTTP server immediately; DB connects (and retries) in the background.
function start() {
  connectWithRetry();
  app.listen(PORT, () => {
    console.log(`✓ Server listening on http://localhost:${PORT}`);
  });
}

start();
