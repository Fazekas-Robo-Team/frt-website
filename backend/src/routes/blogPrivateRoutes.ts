import { Router } from "express";
import blogController from "../controllers/blogController";
import multer from "multer";
import fs from "fs";

const router = Router();

const temp_upload = multer({storage: multer.memoryStorage()});


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