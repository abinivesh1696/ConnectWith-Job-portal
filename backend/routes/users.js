import express from 'express';
import { getUserById, updateUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);

export default router;
