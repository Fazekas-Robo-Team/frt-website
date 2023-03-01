import { Router } from 'express';
import blogController from '../controllers/blogController';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `posts/${req.body.title}`);
    },
    filename: (req, file, cb) => {
        cb(null, "index");
    }
});

const upload = multer({ storage });

const router = Router();

router.get('/', blogController.getPosts);
router.get('/:id', blogController.getPost);
router.post('/', upload.single('index'), blogController.createPost);

export default router;
