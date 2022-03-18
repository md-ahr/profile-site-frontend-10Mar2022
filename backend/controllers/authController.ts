import { Request, Response, RequestHandler } from 'express';
import  asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import cloudinary  from 'cloudinary';
import User from '../models/User';
import generateToken from '../config/generateToken';

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

export const userSignup: RequestHandler = asyncHandler(async (req: any, res: Response): Promise<any> => {
    let { name, email, password, bio, phone, age, userDesignation, userExperience, userLocation, skills } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: 0, message: 'Please enter all the required fields!'});
    }
    const userExists = await User.findOne({ email });
    password = await bcrypt.hash(password, 12);
    if (userExists) {
        return res.status(400).json({ success: 0, message: 'User already exists!'});
    }
    const user = await User.create({ name, email, password, bio, phone, age, userDesignation, userExperience, userLocation, skills });
    if (user) {
        res.status(201).json({
            success: 1,
            message: 'User account created successfully!',
            token: generateToken(user._id),
            user
        });
    } else {
        return res.status(500).json({ success: 0, message: 'Failed to create the user!'});
    }
});

export const userLogin: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const user: any = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            success: 1,
            message: 'User logged in successfully!',
            token: generateToken(user._id),
            user
        });
    } else {
        return res.status(401).json({ success: 0, message: 'Invalid email or password!'});
    }
});

export const getUserData: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const user = await User.findOne({ _id: req.params.id }).populate('experiences');
    if (user) {
        res.status(200).json({ success: 1, user });
    } else {
        return res.status(404).json({ success: 0, message: `No user found with this id - ${req.params.id}` });
    }
});

export const userInfoUpdate: RequestHandler = asyncHandler(async (req: Request | any, res: Response): Promise<any> => {
    let user;
    const { id } = req.params;
    const { age, userExperience, phone, userLocation, userDesignation, bio, skills } = req.body;
    if (req.files && req.files.length > 0) {
        cloudinary.v2.uploader.upload(req.files[0].path, { overwrite: true }, async function(error: any, image: any) {
            user = await User.findByIdAndUpdate({ _id: id }, { age, userExperience, phone, userLocation, userDesignation, bio, skills, profilePic: image.url }, { new: true });
            if (user) {
                res.status(200).json({ message: 'Profile Updated successfully!', user });
            } else {
                return res.status(404).json({ success: 0, message: `No user found with this id - ${req.params.id}`});
            }
        });
    } else {
        user = await User.findByIdAndUpdate({ _id: req.params.id }, { age, userExperience, phone, userLocation, userDesignation, bio, skills}, { new: true });
        if (user) {
            res.status(200).json({ message: 'Profile Updated successfully!', user });
        } else {
            return res.status(404).json({ success: 0, message: `No user found with this id - ${req.params.id}`});
        }
    }
});
