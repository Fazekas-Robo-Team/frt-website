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
            const user = await User.findByPk(req.userId);
            if (user) {
                const { username, email, password, description, fullname } = req.body;

                if (username) user.username = username;
                if (email) user.email = email;
                if (password) user.password = await bcrypt.hash(password, 10);
                if (description) user.description = description;
                if (fullname) user.fullname = fullname;

                await user.save();

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

    public async getSelfData(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findByPk(req.userId);
            res.json({ success: true, data: user });
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to get user :(" });
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            // get only name, roles and description of the user
            const users = await User.findAll({ attributes: ['id', 'username', 'fullname', 'description', 'roles'] });

            // sort them with this order: Coach, Senior Műhelytag, Műhelytag, Junior Műhelytag, Alumni
            users.sort((a, b) => {
                if (a.roles.includes('Coach')) return -1;
                if (b.roles.includes('Coach')) return 1;
                if (a.roles.includes('Senior Műhelytag')) return -1;
                if (b.roles.includes('Senior Műhelytag')) return 1;
                if (a.roles.includes('Műhelytag')) return -1;
                if (b.roles.includes('Műhelytag')) return 1;
                if (a.roles.includes('Junior Műhelytag')) return -1;
                if (b.roles.includes('Junior Műhelytag')) return 1;
                if (a.roles.includes('Alumni')) return -1;
                if (b.roles.includes('Alumni')) return 1;
                return 0;
            });
            
            res.json({ success: true, data: users });
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to get users :(" });
        }
    }
    
}

export default new UserController();