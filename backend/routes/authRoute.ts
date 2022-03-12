import { Router } from 'express';
import { userLogin, userSignup, getUserData, userInfoUpdate, userProfile } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router: Router = Router();

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.get('/user/:id', getUserData);
router.put('/user/:id', userInfoUpdate);
router.get('/profile/:user', userProfile);

export default router;
