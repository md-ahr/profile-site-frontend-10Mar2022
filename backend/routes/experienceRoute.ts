import { Router } from 'express';
import { addExperience, getAllExperience, getSingleExperience, updateExperience, deleteExperience } from '../controllers/experienceController';
import protect from '../middlewares/authMiddleware';

const router: Router = Router();

router.post('/', protect, addExperience);
router.get('/', protect, getAllExperience);
router.get('/:id', protect, getSingleExperience);
router.patch('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

export default router;