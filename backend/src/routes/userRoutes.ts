import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.get('/', UserController.getSelfData);
router.get('/:id', UserController.getById);
router.put('/', UserController.update);
router.delete('/:id', UserController.delete);

export default router;
