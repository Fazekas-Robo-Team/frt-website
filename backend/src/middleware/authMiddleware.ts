import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET!;

interface TokenPayload {
  userId: number;
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authToken = req.cookies.token;

  if (!authToken) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(authToken, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalid' });
    }

    const { userId } = decoded as TokenPayload;

    req.userId = userId;

    return next();
  });
}

export default authMiddleware;
