import { Request, Response } from "express";
import Post from "../models/blog";
import fs from "fs";
import dotenv from "dotenv";
import User from "../models/user";
import { buildFrontend } from "../app";
import { logger } from "../app";
import path from "path";
import sharp from "sharp";
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

            // send title, user fullname, date, id and state, then sort by date
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

            // sort by id reversed
            postsData.sort((a: any, b: any) => a.id - b.id);

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
                        id: post.id,
                        title: post.title,
                        description: post.description,
                        content: post.content,
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

            const post = await Post.create({
                title: title,
                description: description,
                content: content,
                slug: slug,
                category: category,
                userId: req.userId,
            });

            // find the image tags in the markdown content and replace the names with their index
            // the format of the image tag is ![alt](img name)
            const regex = /!\[.*\]\(.*\)/g;
            const image_tags = content.match(regex);

            let new_content = content;

            // if there are image tags, replace the names with their index
            if (image_tags) {
                let replace_content = new_content;
                for (let i = 0; i < image_tags.length; i++) {
                    const tag = image_tags[i];

                    // get the name of the image without the extension
                    const name = tag.match(/\(.*\)/g)?.[0].slice(1, -1).split(".")[0];

                    // replace the img with {post id}/{original name}.webp

                    const new_tag = tag.replace(/\(.*\)/g, `(${post.id}/${name}.webp)`);

                    replace_content = replace_content.replace(tag, new_tag);
                }

                // replace the content with the new content
                new_content = replace_content;
            }

            post.content = new_content;

            await post.save();

            // get buffer from req files with the name index
            // @ts-ignore
            const index = req.files?.index[0].buffer;

            // create the folder if it doesn't exist
            if (!fs.existsSync(`temp/${post.id}`)) {
                fs.mkdirSync(`temp/${post.id}`);
            }

            await sharp(index).resize(800, 600).webp().toFile(`temp/${post.id}/index.webp`);

            // get buffer from req files with the name images[]
            // @ts-ignore
            const images = req.files["images[]"];

            if (images) {
                // loop through the images and save them
                for (let i = 0; i < images.length; i++) {
                    const image_name = images[i].originalname;

                    // get the name without the extension
                    const name = image_name.split(".")[0];

                    const image = images[i].buffer;
                    await sharp(image).resize(1600, 1200).webp().toFile(`temp/${post.id}/${name}.webp`);
                }
            }
            
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
                const { title } = post;

                // copy the temp/slug to the public/slug
                const tempPath = path.join(__dirname, `../../temp/${id}`);

                // create the public folder if it doesn't exist
                fs.mkdirSync(path.join(__dirname, "../../public"), { recursive: true });
                
                // create the public/slug folder if it doesn't exist
                fs.mkdirSync(path.join(__dirname, `../../public/${id}`), { recursive: true });

                // copy every image from temp/slug to public/slug
                fs.readdirSync(tempPath).forEach((file) => {
                    fs.copyFile(tempPath + "/" + file, path.join(__dirname, `../../public/${id}/${file}`), (err) => {
                        if (err) throw err;
                    });
                });

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

    public async unpublishPost(id: number, userId: number): Promise<void> {
        try {
            const post = await Post.findOne({ where: { id } });

            if (post) {
                // delete the public/slug folder
                const publicPath = path.join(__dirname, `../../public/${post.slug}`);

                fs.rmdirSync(publicPath, { recursive: true });

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
