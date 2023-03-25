import { Router } from "express";
import blogController from "../controllers/blogController";
import multer from "multer";
import fs from "fs";

const router = Router();

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

            const slug = `${category}/${slugTitle}/${date}`;

            // create the directory if it doesn't exist
            fs.mkdirSync(`temp/${slug}`, { recursive: true });

            cb(null, `temp/${slug}`);
        },
        filename: (req, file, cb) => {
            // if the file is the index image, rename it to index_image
            if (file.fieldname === "index") {
                // get the file extension
                const ext = file.originalname.split(".").pop();
                cb(null, `index_image.${ext}`);
            } else {
                cb(null, file.originalname);
            }
        },
    }),
});

router.get("/", blogController.getPosts);
router.post(
    "/",
    temp_upload.fields([
        {
            name: "index",
            maxCount: 1,
        },
        {
            name: "images[]",
            maxCount: 9999,
        },
    ]),
    blogController.createPost
);
router.put(
    "/:id",
    temp_upload.fields([
        {
            name: "index",
            maxCount: 1,
        },
        {
            name: "images[]",
            maxCount: 9999,
        },
    ]),
    blogController.editPost
);
router.post("/publish/:id", blogController.publishPost);
router.post("/deactivate/:id", blogController.deactivePost);
router.delete("/:id", blogController.deletePost);

export default router;