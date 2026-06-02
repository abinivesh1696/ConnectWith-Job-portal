import express from 'express';
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from '../controllers/companyController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.post('/', protect, authorizeRoles('recruiter'), createCompany);
router.put('/:id', protect, authorizeRoles('recruiter'), updateCompany);
router.delete('/:id', protect, authorizeRoles('recruiter'), deleteCompany);

export default router;
