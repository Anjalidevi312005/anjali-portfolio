import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import apiRoutes from './routes/api.js';
import { seedDatabase } from './seed.js';

const app = express();
const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/anjali_portfolio';
// CLIENT_ORIGIN may be a single URL or a comma-separated list of allowed origins.
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const allowedOrigins = CLIENT_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean);

// Behind a hosting proxy (Render/Railway/etc.) — needed for correct client IPs & rate limiting.
app.set('trust proxy', 1);

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin/non-browser requests (no origin) and any whitelisted origin.
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

// Connect to MongoDB, then start the server.
async function start() {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('✓ MongoDB connected');
    await seedDatabase();
  } catch (err) {
    // The API still boots and serves seed-data fallbacks without a DB.
    console.warn('⚠ MongoDB not connected:', err.message);
    console.warn('  → API will serve fallback data; contact form will be disabled until DB is up.');
  }

  app.listen(PORT, () => {
    console.log(`✓ Server listening on http://localhost:${PORT}`);
  });
}

start();
