import express from 'express';
import {
  createJob,
  listJobs,
  getJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', listJobs);
router.get('/:id', getJob);
router.post('/', protect, authorizeRoles('recruiter'), createJob);
router.put('/:id', protect, authorizeRoles('recruiter'), updateJob);
router.delete('/:id', protect, authorizeRoles('recruiter'), deleteJob);

export default router;
