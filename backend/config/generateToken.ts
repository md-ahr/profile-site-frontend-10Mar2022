import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
}

export default generateToken;