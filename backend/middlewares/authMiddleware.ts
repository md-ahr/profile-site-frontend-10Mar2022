import { RequestHandler, Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User';

interface AuthRequest extends Request {
    user?: any;
}

const protect: RequestHandler = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    let token: string;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decode: any = jwt.verify(token, process.env.JWT_SECRET as Secret);
            req.user = await User.findById(decode.id).select('-password');
            next();
        } catch (error) {
            return res.status(401).json({ success: 0, message: 'User not authorized!' });
        }
    } else {
        return res.status(401).json({ success: 0, message: 'Unauthorized user, no token found!' });
    }
});

export default protect;
