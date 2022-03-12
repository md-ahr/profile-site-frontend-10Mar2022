import { Request, Response, RequestHandler } from 'express';
import  asyncHandler from 'express-async-handler';
import User from '../models/User';
import generateToken from '../config/generateToken';

export const userSignup: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { name, email, password, profilePic, bio, phone, age, userDesignation, userExperience, userLocation, experiences, skills } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: 0, message: 'Please enter all the required fields!'});
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ success: 0, message: 'User already exists!'});
    }
    const user = await User.create({ name, email, password, profilePic, bio, phone, age, userDesignation, userExperience, userLocation, experiences, skills });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            bio: user.bio,
            phone: user.phone,
            age: user.age,
            userDesignation: user.userDesignation,
            userExperience: user.userExperience,
            userLocation: user.userLocation,
            experiences: user.experiences,
            skills: user.skills,
            token: generateToken(user._id)
        });
    } else {
        return res.status(500).json({ success: 0, message: 'Failed to create the user!'});
    }
});

export const userLogin: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const user: any = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            bio: user.bio,
            phone: user.phone,
            age: user.age,
            userDesignation: user.userDesignation,
            userExperience: user.userExperience,
            userLocation: user.userLocation,
            experiences: user.experiences,
            skills: user.skills,
            token: generateToken(user._id)
        });
    } else {
        return res.status(401).json({ success: 0, message: 'Invalid email or password!'});
    }
});

export const getUserData: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => 
{   const user = await User.findById({ _id: req.params.id }).select('-password');
    if (user) {
        res.status(200).json({ success: 1, user });
    } else {
        return res.status(500).json({ success: 0, message: 'Profile Update failed!'});
    }
});

export const userInfoUpdate: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => 
{   const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (user) {
        res.status(200).json({ message: 'Profile Updated successfully!' });
    } else {
        return res.status(500).json({ success: 0, message: 'Profile Update failed!'});
    }
});

export const userProfile: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    res.status(200).json({ message: 'Profile access successfully!' });
});
