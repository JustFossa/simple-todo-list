import todo from './todo';
import {Router} from 'express';

const router = Router();

router.use('/todo', todo);

export default router;