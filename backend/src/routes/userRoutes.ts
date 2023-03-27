import { Router } from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/all', UserController.getAll);

router.use(authMiddleware);

router.get('/', UserController.getSelfData);
router.get('/:id', UserController.getById);
router.put('/', UserController.update);
router.delete('/:id', UserController.delete);

export default router;
