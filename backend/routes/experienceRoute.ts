import { Router } from 'express';
import { addExperience, getAllExperience } from '../controllers/experienceController';
import protect from '../middlewares/authMiddleware';

const router: Router = Router();

router.post('/', protect, addExperience);
router.get('/', protect, getAllExperience);

export default router;