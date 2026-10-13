import 'dotenv/config';
import { connectDb, default as MONGO_URI } from './db.js';
import { Application } from './models/Application.js';

const samples = [
  {
    company: 'MVST',
    role: 'Full Stack Developer (Junior)',
    url: 'https://mvst.factorialhr.com/job_posting/full-stack-developer-junior-292930',
    status: 'applied',
    appliedAt: new Date('2026-10-13'),
    notes: 'Hybrid Barcelona. Factorial form.',
  },
  {
    company: 'Example Studio',
    role: 'React Developer',
    url: '',
    status: 'looking',
    appliedAt: new Date('2026-10-01'),
    notes: 'Sample row — replace or delete.',
  },
];

async function seed() {
  await connectDb();
  console.log(`Seeding into ${MONGO_URI}`);
  const { deletedCount } = await Application.deleteMany({});
  const created = await Application.insertMany(samples);
  console.log(`Cleared ${deletedCount} document(s). Created ${created.length} sample application(s).`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});