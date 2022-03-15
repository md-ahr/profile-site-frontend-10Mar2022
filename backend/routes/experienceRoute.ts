import { Router } from 'express';
import { addExperience, getAllExperience, getSingleExperience, updateExperience, deleteExperience } from '../controllers/experienceController';
import protect from '../middlewares/authMiddleware';
import imageUpload from '../middlewares/imageUpload';

const router: Router = Router();

router.post('/', protect, imageUpload, addExperience);
router.get('/', protect, getAllExperience);
router.get('/:id', protect, getSingleExperience);
router.patch('/:id', protect, imageUpload, updateExperience);
router.delete('/:id', protect, deleteExperience);

export default router;