import express from 'express';
import { login, logout, register } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

const authRouter = router;
export default authRouter;
