import { Router } from 'express';
import { userLogin, userSignup } from '../controllers/authController';

const router: Router = Router();

router.post('/login', userLogin);
router.post('/signup', userSignup);

export default router;
