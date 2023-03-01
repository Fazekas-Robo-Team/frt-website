import { Request, Response } from "express";
import Post from "../models/blog";
import fs from "fs";
import dotenv from "dotenv";
import User from "../models/user";
import { buildFrontend } from "../app";
import { logger } from "../app";
dotenv.config();

class BlogController {
    public async getPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await Post.findAll();
            res.json({ success: true, data: posts });
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to get posts :(" });
        }
    }

    public async getPost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const post = await Post.findOne({ where: { id } });
            res.json({ success: true, data: post });
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to get post :(" });
        }
    }

    public async createPost(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, content, category } = req.body;

            // modify the title to be slug friendly
            const slugTitle = title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");

            // generate slug with category/title combo
            const slug = `${category}_${slugTitle}`;

            const post = await Post.create({
                title: title,
                description: description,
                content: content,
                slug: slug,
                category: category,
                userId: req.userId,
            });

            res.json({ success: true, data: post });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Failed to create post :(" });
        }
    }

    public async publishPost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const post = await Post.findOne({ where: { id } });

            if (post) {
                const { title, description, content, category, slug } = post;

                const date = new Date().toISOString().slice(0, 10);
                const user = await User.findOne({ where: { id: req.userId } });

                const md_content = `---
title: ${title}
description: ${description}
date: ${date}
author: ${user?.fullname}
category: ${category}
---\n\n${content}`;

                // make sure the slug directory exists
                fs.mkdirSync(`../frt-frontend/posts/${slug}`, { recursive: true });

                // create .md file in ../frt-frontend/posts/slug directory with content
                fs.writeFile(`../frt-frontend/posts/${slug}/index.md`, md_content, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });

                // copy index_image from uploads/posts_temp/slug to ../frt-frontend/posts/slug
                // find out the extension of the image

                const image = fs.readdirSync(`uploads/posts_temp/${slug}`);
                const image_extension = image[0].split(".")[1];

                fs.copyFile(
                    `uploads/posts_temp/${slug}/index_image.${image_extension}`,
                    `../frt-frontend/posts/${slug}/index_image.${image_extension}`,
                    (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    }
                );

                // build the frontend
                buildFrontend();
                
                post.published = true;
                post.save();
                res.status(200).json({ success: true });
            } else {
                res.status(404).json({ success: false, message: "Post not found :(" });
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Failed to publish post :(" });
        }
    }

    public async deactivePost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const post = await Post.findOne({ where: { id } });

            if (post) {
                post.published = false;
                post.save();

                // delete the post from the frontend
                fs.rmdirSync(`../frt-frontend/posts/${post.slug}`, { recursive: true });

                res.status(200).json({ success: true });
            } else {
                res.status(404).json({ success: false, message: "Post not found :(" });
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Failed to deactive post :(" });
        }
    }

    public async editPost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const post = await Post.findOne({ where: { id } });

            if (post) {
                const { title, description, content, category } = req.body;

                // modify the title to be slug friendly
                const slugTitle = title
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .replace(/[^\w-]+/g, "");

                // generate slug with category/title combo
                const slug = `${category}_${slugTitle}`;

                post.title = title;
                post.description = description;
                post.content = content;
                post.slug = slug;
                post.category = category;
                post.save();

                // delete the post from the frontend
                this.deactivePost(req, res);

                res.status(200).json({ success: true });
            } else {
                res.status(404).json({ success: false, message: "Post not found :(" });
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Failed to edit post :(" });
        }
    }
}

export default new BlogController();
