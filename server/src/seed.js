// Seeds MongoDB with project & skill data from seedData.js.
// Safe to run repeatedly: it upserts by unique key, so it never duplicates.
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import { projects, skills } from './data/seedData.js';

export async function seedDatabase() {
  try {
    await Promise.all(
      projects.map((p) =>
        Project.updateOne({ slug: p.slug }, { $set: p }, { upsert: true })
      )
    );
    await Promise.all(
      skills.map((s) =>
        Skill.updateOne({ category: s.category }, { $set: s }, { upsert: true })
      )
    );
    console.log(`✓ Seeded ${projects.length} projects & ${skills.length} skill groups`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  }
}
