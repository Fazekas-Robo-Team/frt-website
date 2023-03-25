import { Request, Response } from "express";
import Post from "../models/blog";
import fs from "fs";
import dotenv from "dotenv";
import User from "../models/user";
import { buildFrontend } from "../app";
import { logger } from "../app";
dotenv.config();

class BlogController {
    constructor() {
        this.getPosts = this.getPosts.bind(this);
        this.getPost = this.getPost.bind(this);
        this.createPost = this.createPost.bind(this);
        this.publishPost = this.publishPost.bind(this);
        this.unpublishPost = this.unpublishPost.bind(this);
        this.deactivePost = this.deactivePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }
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

    public async getPublicPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await Post.findAll({ where: { published: true } });

            // send title, user fullname, date and id
            const postsData = await Promise.all(
                posts.map(async (post) => {
                    // get the user fullname
                    const user = await User.findOne({ where: { id: post.userId } });

                    // format the date in yyyy-mm-dd format
                    const date = new Date(post.createdAt).toISOString().slice(0, 10);

                    return {
                        title: post.title,
                        author: user?.fullname,
                        date: date,
                        slug: post.slug,
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

            const slug = `${date}/${category}/${slugTitle}`;

            let index_image: string | undefined;

            if ("index" in req.files!) {
                index_image = req.files!["index"][0].filename;
            } else {
                res.status(500).json({ success: false, message: "No index image :(" });
                return;
            }

            const post = await Post.create({
                title: title,
                description: description,
                content: content,
                slug: slug,
                category: category,
                userId: req.userId,
                index_image: index_image,
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

                const user = await User.findOne({ where: { id: req.userId } });

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

    public async unpublishPost(id: number, userId: number, rebuild: boolean = true): Promise<void> {
        try {
            const post = await Post.findOne({ where: { id } });

            if (post) {
                // delete the post from the frontend
                fs.rmdirSync(`../frt-frontend/posts/${post.slug}`, { recursive: true });

                // delete the post image from the frontend
                fs.rmdirSync(`../frt-frontend/static/blog_images/${post.slug}`, { recursive: true });

                // build the frontend
                if (rebuild) {
                    await buildFrontend();
                }

                post.published = false;
                await post.save();

                const user = await User.findOne({ where: { id: userId } });

                logger.info(`${user?.fullname} deactived post ${post.title}`);
            }
        } catch (error) {
            logger.error(error);
        }
    }

    public async deactivePost(req: Request, res: Response): Promise<void> {
        try {
            await this.unpublishPost(parseInt(req.params.id), req.userId!);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to deactive post :(" });
        }
    }

    public async editPost(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, content, category } = req.body;

            const { id } = req.params;

            const post = await Post.findOne({ where: { id } });

            const user = await User.findOne({ where: { id: req.userId } });

            if (post) {
                if (post.published) {
                    res.status(400).json({ success: false, message: "You can't edit a published post!" });
                    return;
                }

                post.description = description;
                post.content = content;

                post.save();

                logger.info(`${user?.username} edited post ${title}!`);

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
                    await this.unpublishPost(parseInt(req.params.id), req.userId!);
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
