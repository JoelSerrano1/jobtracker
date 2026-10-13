import { Router } from 'express';
import { Application, STATUSES } from '../models/Application.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const { status } = _req.query;
    const filter = status && STATUSES.includes(status) ? { status } : {};
    const items = await Application.find(filter).sort({ appliedAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Application.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Application not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const item = await Application.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const item = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Application not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const item = await Application.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Application not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;