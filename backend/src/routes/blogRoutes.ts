import { Router } from 'express';
import blogController from '../controllers/blogController';
import multer from 'multer';
import fs from 'fs';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { title, category } = req.body;

        // modify the title to be slug friendly
        const slugTitle = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        // generate slug with category/title combo
        const slug = `${category}_${slugTitle}`;

        // create the directory if it doesn't exist
        fs.mkdirSync(`../frt-frontend/posts/${slug}`, { recursive: true });

        cb(null, `../frt-frontend/posts/${slug}`);
    },
    filename: (req, file, cb) => {
        // get the file extension
        const ext = file.originalname.split('.').pop();
        cb(null, `index_image.${ext}`);
    }
});

const upload = multer({ storage });

const router = Router();

router.get('/', blogController.getPosts);
router.get('/:id', blogController.getPost);
router.post('/', upload.single('index'), blogController.createPost);

export default router;
