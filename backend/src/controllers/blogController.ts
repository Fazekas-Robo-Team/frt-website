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

            // send title, user fullname, date and id
            const postsData = await Promise.all(
                posts.map(async (post) => {
                    // get the user fullname
                    const user = await User.findOne({ where: { id: post.userId } });

                    // format the date in yyyy-mm-dd format
                    const date = new Date(post.createdAt).toISOString().slice(0, 10);

                    // state: published or draft, if published and index is true, then it's a featured post
                    let state = "draft";
                    if (post.published) {
                        state = "published";
                        if (post.index) {
                            state = "published (featured)";
                        }
                    }

                    return {
                        title: post.title,
                        author: user?.fullname,
                        date: date,
                        id: post.id,
                        state: state,
                    };
                })
            );

            res.json({ success: true, data: postsData });
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

            // generate slug with category/title/date combo
            let date = new Date().toISOString().slice(0, 10);

            // replace the dashes with underscores
            date = date.replace(/-/g, "_");
            
            const slug = `${category}_${slugTitle}_${date}`;

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

                // find out the extension of the image

                const image = fs.readdirSync(`uploads/posts_temp/${slug}`);
                const image_extension = image[0].split(".")[1];

                const md_content = `---
title: ${title}
description: ${description}
date: "${date}"
author: ${user?.fullname}
category: ${category}
index_image: index_image.${image_extension}
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

                // copy index_image from uploads/posts_temp/slug to ../frt-frontend/static/blog_images/slug

                // make sure the slug directory exists
                fs.mkdirSync(`../frt-frontend/static/blog_images/${slug}`, { recursive: true });

                fs.copyFile(`uploads/posts_temp/${slug}/index_image.${image_extension}`, `../frt-frontend/static/blog_images/${slug}/index_image.${image_extension}`, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });

                // copy the rest of the images from uploads/posts_temp/slug to ../frt-frontend/posts/slug
                const images = fs.readdirSync(`uploads/posts_temp/${slug}`);

                images.forEach((image) => {
                    if (image !== `index_image.${image_extension}`) {
                        fs.copyFile(`uploads/posts_temp/${slug}/${image}`, `../frt-frontend/posts/${slug}/${image}`, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    }
                });

                // build the frontend
                await buildFrontend();

                post.published = true;
                await post.save();

                logger.info(`${user?.fullname} published post ${title}!`);
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
                // delete the post from the frontend
                fs.rmdirSync(`../frt-frontend/posts/${post.slug}`, { recursive: true });

                // delete the post image from the frontend
                fs.rmdirSync(`../frt-frontend/static/blog_images/${post.slug}`, { recursive: true });

                // build the frontend
                await buildFrontend();

                post.published = false;
                await post.save();

                const user = await User.findOne({ where: { id: req.userId } });

                logger.info(`${user?.fullname} deactived post ${post.title}`)

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

                res.status(200).json({ success: true });
            } else {
                res.status(404).json({ success: false, message: "Post not found :(" });
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Failed to edit post :(" });
        }
    }

    public async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const post = await Post.findOne({ where: { id } });

            if (post) {
                // delete the post from the frontend
                if (post.published) {
                    this.deactivePost(req, res);
                }

                // delete the post from the database
                await post.destroy();

                res.status(200).json({ success: true });
            } else {
                res.status(404).json({ success: false, message: "Post not found :(" });
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Failed to delete post :(" });
        }
    }
}

export default new BlogController();
