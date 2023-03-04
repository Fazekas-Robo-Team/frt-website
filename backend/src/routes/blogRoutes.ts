import { Router } from "express";
import blogController from "../controllers/blogController";
import multer from "multer";
import fs from "fs";

const blog_upload = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
        destination: (req, file, cb) => {
            const { title, category } = req.body;

            // modify the title to be slug friendly
            const slugTitle = title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");

            // generate slug with category/title/date (yyyy_mm_dd) combo
            let date = new Date().toISOString().slice(0, 10);

            // replace the dashes with underscores
            date = date.replace(/-/g, "_");

            const slug = `${category}_${slugTitle}_${date}`;

            // create the directory if it doesn't exist
            fs.mkdirSync(`uploads/posts_temp/${slug}`, { recursive: true });

            cb(null, `uploads/posts_temp/${slug}`);
        }
    }),
});

const temp_upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const { title, category } = req.body;

            // modify the title to be slug friendly
            const slugTitle = title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");

            // generate slug with category/title/date combo
            let date = new Date().toISOString().slice(0, 10);
            
            // replace the dashes with underscores
            date = date.replace(/-/g, "_");

            const slug = `${category}_${slugTitle}_${date}`;

            // create the directory if it doesn't exist
            fs.mkdirSync(`uploads/posts_temp/${slug}`, { recursive: true });

            cb(null, `uploads/posts_temp/${slug}`);
        },
        filename: (req, file, cb) => {
            // get the file extension
            const ext = file.originalname.split(".").pop();
            cb(null, `index_image.${ext}`);
        },
    }),
});

const router = Router();

router.get("/", blogController.getPosts);
router.get("/:id", blogController.getPost);
router.post("/", temp_upload.single("index"), blogController.createPost);
router.post("/", blog_upload.array("post-images"), temp_upload.single("index"), blogController.createPost);
router.post("/publish/:id", blogController.publishPost);
router.post("/deactivate/:id", blogController.deactivePost);
router.delete("/:id", blogController.deletePost);

export default router;
