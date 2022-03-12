import { RequestHandler, Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User';

interface AuthRequest extends Request {
    user?: any;
}

export const protect: RequestHandler = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    let token: string;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            // if (!token) {
            //     res.status(401);
            //     throw new Error('Not authorized, no token');
            // }
            const decode: any = jwt.verify(token, process.env.JWT_SECRET as Secret);
            req.user = await User.findById(decode.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
});
