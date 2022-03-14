import { Router } from 'express';
import { userLogin, userSignup, getUserData, userInfoUpdate } from '../controllers/authController';
import protect from '../middlewares/authMiddleware';
import imageUpload from '../middlewares/imageUpload';

const router: Router = Router();

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.get('/user/:id', protect, getUserData);
router.patch('/user/:id', protect, imageUpload, userInfoUpdate);

export default router;
