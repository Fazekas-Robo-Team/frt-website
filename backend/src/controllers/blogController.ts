import { Request, Response } from 'express';
import Post from '../models/blog';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import dotenv from 'dotenv';
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
            const { title, description, content, tags, category, date } = req.body;

            // upload image
            const image = req.file;

            // generate slug with /year/month/day/title format
            const slug = `${date.split('T')[0].split('-').join('/')}/${title.split(' ').join('-')}`;

            console.log(image);

            const post = await Post.create({
                title,
                description,
                content,
                tags,
                category,
                date,
                slug,
                userId: req.userId,
            });

            res.json({ success: true, data: post });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Failed to create post :(" });
        }
    }
}

export default new BlogController();