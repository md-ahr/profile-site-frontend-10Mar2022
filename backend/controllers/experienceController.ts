import { Request, Response, RequestHandler } from 'express';
import  asyncHandler from 'express-async-handler';
import User from '../models/User';
import Experience from '../models/Experience';

export const addExperience: RequestHandler = asyncHandler(async (req: any, res: Response): Promise<any> => {
    let experience;
    const { companyName, designation, startDate, endDate, location, userId } = req.body;
    if (!companyName || !designation || !startDate || !location || !userId) {
        return res.status(400).json({ success: 0, message: 'Please enter all the required fields!'});
    }
    if (req.files && req.files.length > 0) {
        const { filename } = req.files[0];
        experience = await Experience.create({ companyName, designation, startDate, endDate, location, companyLogo: filename, userId });
    } else {
        experience = await Experience.create({ companyName, designation, startDate, endDate, location, userId });
    }
    if (experience) {
        const user = await User.findById(userId);
        if (user) {
            user.experiences = user.experiences.concat(experience._id);
           await user.save();
        }
        res.status(201).json({
            success: 1,
            message: 'Experice added successfully!',
            user
        });
    } else {
        return res.status(500).json({ success: 0, message: 'Failed to add experiece!'});
    }
});

export const getAllExperience: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const experiences = await Experience.find().sort({ 'createdAt': -1 });
    if (experiences) {
        res.status(200).json({ success: 1, experiences });
    } else {
        return res.status(404).json({ success: 0, message: 'Experince lsit not found!' });
    }
});

export const getSingleExperience: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
        res.status(200).json({ success: 1, experience });
    } else {
        return res.status(404).json({ success: 0, message: `No user found with this id - ${req.params.id}` });
    }
});

export const updateExperience: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { companyName, designation, startDate, endDate, location, userId } = req.body;
    if (!companyName || !designation || !startDate || !endDate || !location || !userId) {
        return res.status(400).json({ success: 0, message: 'Please enter all the required fields!'});
    }
    const experience = await Experience.findByIdAndUpdate({ _id: req.params.id }, { companyName, designation, startDate, endDate, location, userId }, { new: true });
    if (experience) {
        res.status(200).json({
            success: 1,
            message: 'Experice Updated successfully!'
        });
    } else {
        return res.status(500).json({ success: 0, message: 'Failed to add experiece!'});
    }
});

export const deleteExperience: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (experience) {
        res.status(200).json({ success: 1, message: 'Experice deleted successfully!' });
    } else {
        return res.status(404).json({ success: 0, message: `No user found with this id - ${req.params.id}` });
    }
});

