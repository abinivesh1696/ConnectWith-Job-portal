import express from 'express';
import { applyToJob, getUserApplications, getJobApplicants } from '../controllers/applicationController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/jobs/:id/apply', protect, authorizeRoles('jobseeker'), applyToJob);
router.get('/users/:id/applications', protect, getUserApplications);
router.get('/jobs/:id/applicants', protect, authorizeRoles('recruiter'), getJobApplicants);

export default router;
