import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: { type: String, default: '' },
    description: { type: String, default: '' },
    tech: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    liveUrl: { type: String, default: '' },
    repoUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    year: { type: Number }
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
