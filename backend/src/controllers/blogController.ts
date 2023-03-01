import { Request, Response } from 'express';
import Post from '../models/blog';
import fs from 'fs';
import dotenv from 'dotenv';
import User from '../models/user';
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

    public async createPost (req: Request, res: Response): Promise<void> {
        try {
            const { title, description, content, category } = req.body;

            // upload image
            const image = req.file;

            // modify the title to be slug friendly
            const slugTitle = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            // generate slug with category/title combo
            const slug = `${category}_${slugTitle}`;

            console.log(image);

            const post = await Post.create({
                title: title,
                description: description,
                content: content,
                slug: slug,
                category: category,
                userId: req.userId,
            });

            // generate the md file content

            // date format: yyyy-mm-dd
            // find the name of the user

            const date = new Date().toISOString().slice(0, 10);
            const user = await User.findOne({ where: { id: req.userId } });

            const md_content = `---
title: ${title}
description: ${description}
date: ${date}
author: ${user?.fullname}
category: ${category}
image: ${image?.filename}
---\n\n${content}`;

            // create .md file in ../frt-frontend/posts/slug directory with content
            fs.writeFile(`../frt-frontend/posts/${slug}/index.md`, md_content, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });


            res.json({ success: true, data: post });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Failed to create post :(" });
        }
    }
}

export default new BlogController();