import { Request, Response, RequestHandler } from 'express';
import  asyncHandler from 'express-async-handler';
import Experience from '../models/Experience';

export const addExperience: RequestHandler = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { companyName, designation, startDate, endDate, location, userId } = req.body;
    if (!companyName || !designation || !startDate || !endDate || !location || !userId) {
        return res.status(400).json({ success: 0, message: 'Please enter all the required fields!'});
    }
    const experience = await Experience.create({ companyName, designation, startDate, endDate, location, userId });
    if (experience) {
        res.status(201).json({
            success: 1,
            message: 'Experice added successfully!'
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
