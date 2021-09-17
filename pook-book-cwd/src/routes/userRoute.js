import { Router } from 'express';
import { GetListUser, Login, RegisterNewAccount } from '../controllers/user';

const router = Router();

router.get('/',GetListUser)
router.post('/register',RegisterNewAccount)
router.post('/login',Login)


export default router;