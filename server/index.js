import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDb } from './db.js';
import applicationsRouter from './routes/applications.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'jobtracker-api' });
});

app.use('/api/applications', applicationsRouter);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`JobTracker API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });