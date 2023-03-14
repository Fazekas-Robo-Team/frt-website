import { Request, Response } from 'express';
import session from 'express-session';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET!;

class UserController {
    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByPk(req.params.id);
            res.json({ success: true, data: user });
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to get user :(" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.update(req.body);
                res.json({ success: true, data: user });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to update user :(" });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.destroy();
                res.json({ success: true, data: user });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to delete user :(" });
        }
    }
    
}

export default new UserController();