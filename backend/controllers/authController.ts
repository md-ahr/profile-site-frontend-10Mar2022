import { Request, Response, RequestHandler } from 'express';
import  asyncHandler from 'express-async-handler';
import User from '../models/User';
import generateToken from '../config/generateToken';

export const userSignup: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, profilePic, bio, phone, age, userDesignation, userExperience, userLocation, experiences, skills } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please enter all the required fields');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
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
        res.status(400);
        throw new Error('Failed to create the user');
    }
});

export const userLogin: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
