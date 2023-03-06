import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.get('/:id', UserController.getById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;
