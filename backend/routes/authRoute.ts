import { Router } from 'express';
import { userSignup, userLogin, getUserData, userInfoUpdate } from '../controllers/authController';
import protect from '../middlewares/authMiddleware';
import imageUpload from '../middlewares/imageUpload';

const router: Router = Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/user/:id', protect, getUserData);
router.patch('/user/:id', protect, imageUpload, userInfoUpdate);

export default router;
