import { Router } from 'express';
import { login } from '../controladores/authControles';

const router = Router();

router.post('/', login);

export default router;
