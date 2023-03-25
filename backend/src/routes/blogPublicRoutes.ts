import { Router } from "express";
import blogController from "../controllers/blogController";
import multer from "multer";
import fs from "fs";
import { logger } from "../app";

const router = Router();

//@ts-ignore
router.use((error, req, res, next) => {
    console.log("problematic file", error);
});

router.get("/", blogController.getPublicPosts);
router.get("/:id", blogController.getPost);

export default router;
