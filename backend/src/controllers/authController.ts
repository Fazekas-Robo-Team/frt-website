import { Request, Response } from 'express';
import session from 'express-session';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { logger } from '../app';
dotenv.config();

const secret = process.env.JWT_SECRET!;

class AuthController {
    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                roles: ['Műhelytag'],
            });
            res.json({ success: true, data: user });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ success: false, message: "Failed to register user :(" });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            if (!user) {
                res.status(401).json({ success: false, error: "Incorrect email or password" });
                return;
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                res.status(401).json({ success: false, error: "Incorrect email or password" });
                return;
            }

            const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1d' });

            const cookieOptions = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: false,
            };
            
            res.cookie('token', token, cookieOptions);
            res.json({ success: true});
        } catch (error) {
            res.status(500).json({ success: false, error: "Failed to login user :(" });
        }
    }
}

export default new AuthController();