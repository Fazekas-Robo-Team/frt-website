import { Router } from 'express';
import UserController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import multer from 'multer';
import fs from 'fs';
import User from '../models/user';

const router = Router();

const pfp_upload = multer({storage: multer.memoryStorage()});

router.get('/all', UserController.getAll);

router.use(authMiddleware);

router.get('/', UserController.getSelfData);
router.get('/:id', UserController.getById);
router.put('/', UserController.update);
router.delete('/:id', UserController.delete);
router.post('/pfp', pfp_upload.single("pfp"), UserController.updatePfp);

export default router;
